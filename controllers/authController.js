const User = require('../models/Users')
const jwt = require('jsonwebtoken')
const { promisify } = require('util')

const handleErrors = (err) => {
    console.log(err.message, err.code)
}
const maxAgeInSeconds = 1*24*60*60;

const createToken = (id) => {
  return jwt.sign({ id }, 'i am arun', {
    expiresIn: maxAgeInSeconds,
  });
};

module.exports.signup_post = async (req, res) => {
    try {
        const user = await User.create(req.body);
        const token = createToken(user._id)
        res.status(201).json({
            token,
            user
        });
    } catch (err) {
        handleErrors(err);
        res.status(400).json({ error: 'User not created', message: err.message });
    }
};


module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password)
        const token = createToken(user._id)
        res.status(200).json({
            token,
            user
        });
    } catch (err) {
        res.status(400).json({ error: err.message,status:400 }); 
    }
}





module.exports.protect = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized - Token missing' });
  }
  const token = authHeader.split(' ')[1]; 
  try {
    const decoded = await promisify(jwt.verify)(token,'i am arun')
    const currentUser = await User.findById(decoded.id)
    if (Date.now() >= decoded.exp * 1000) {
      return res.status(401).json({ error: 'Unauthorized - Token has expired' });
    }
    req.user = currentUser;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Unauthorized - Token has expired' });
    }
    res.status(401).json({ error: 'Unauthorized - Token is invalid' });
  }
};

module.exports.restrict = (allowedRoles) => {
    return (req, res, next) => {
      const userRole = req.user.role; 
  
      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({ error: 'Forbidden - Insufficient role permissions' });
      }
      next();
    };
  };