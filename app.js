const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')

const authRouter = require('./routes/authRoutes')
const adminProductRoute = require('./routes/adminProductRoute')
const cartRoute = require('./routes/cartRoutes')
const productRoute = require('./routes/productRoutes')
const purchaseRoute = require('./routes/purchaseRoute')
const reviewRoute = require('./routes/reviewRoutes')

const app = express()

dotenv.config({path:'./config.env'})



mongoose.connect(process.env.DATABASE)

const con = mongoose.connection

con.on('open',()=>{
    console.log('connected...')
})

app.use(express.json()); 
app.use(cors());

app.use('/user', authRouter);
app.use('/user/cart', cartRoute);
app.use('/user/product', productRoute);
app.use('/user/purchase',purchaseRoute)
app.use('/user/review',reviewRoute)
app.use('/admin/product', adminProductRoute);

const PORT = process.env.PORT || 9000
console.log(PORT)

app.listen(PORT,()=>{
    console.log("Server started")
})