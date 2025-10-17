import express from 'express';
import errorHandler from './middleware/errorHandler.js';
import dotenv from 'dotenv';
import authRouter from './routes/authRouter.js';
import userRoute from './routes/userRouter.js';
import cors from 'cors';
import recipeRouter from './routes/recipeRouter.js';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
dotenv.config();

// connectDB();
const app = express();

const port = process.env.PORT || 3000;

const corsOptions = {
    origin: [
        'http://localhost:5173',
        process.env.CLIENT_URL
    ],
}

app.use(cors(corsOptions))

app.use(express.json());
app.use(helmet())

// General rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: {
        error: 'Too many requests from this IP, please try again later.'
    }
})
app.use(limiter)

// Specific rate limiting for auth routes
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 auth attempts per 15 minutes
    message: {
        error: 'Too many authentication attempts, please try again later.'
    }
});

app.use('/api/recipes', recipeRouter);
app.use('/api/auth', authLimiter, authRouter);
app.use('/api/users', userRoute);

app.use(errorHandler)
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

