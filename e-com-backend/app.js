require('express-async-errors');
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const userRouter = require('./routers/userRouter');
const categoryRouter = require('./routers/categoryRouter');
const error = require('./middlewares/error');
const productRouter = require('./routers/productRouter');
const cartRouter = require('./routers/cartRouter');
const profileRouter = require('./routers/profileRouter');

app.use(express.json());//convert to json format
app.use(cors());

if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'));
}
app.use('/api/user', userRouter);
app.use('/api/category', categoryRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/profile', profileRouter);
//using middleware for promise return type error handling
//use it after router function 
app.use(error);

module.exports = app;