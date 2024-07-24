import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import err from './utils/error.js'
import user from './routes/user.js';
import lawyer from './routes/lawyer.js'
import authentication from './routes/authentication.js'
import stripe from 'stripe';
import payment from './routes/payment.js'
import cors from 'cors'


 
const app = express();
dotenv.config();

const port = process.env.PORT || '800'

// DB Connection
const connect = async () => {
    try {
     await mongoose.connect(process.env.db2)
    console.log('MongoDB has connected successfully')
    } catch (error) {
                console.error("Failed to connect to MongoDB")
    }
}


//========================
app.use(express.json())
app.use(cors())
// Error Handling Middleware========================

// const err= express.createError();
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong";
    
    res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    });
});
 
// Routes===============
app.use('/user', user);
app.use('/lawyer', lawyer)
app.use('/payments', payment);
app.use('/auth', authentication)
 
// Start the server================
app.listen(port, () => {
    
    connect();
    console.log(`Server is running at http://localhost:${port}`);
 });
