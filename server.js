import express from 'express';
import errorHandler from './middleware/errorHandler.js';
import dotenv from 'dotenv';
import router from './routes/recipeRouter.js';
import authRouter from './routes/authRouter.js';
import userRoute from './routes/userRouter.js';
import cors from 'cors';
dotenv.config();

// connectDB();
const app = express();

const port = process.env.PORT || 3001;

const corsOptions = {
    origin: ['http://localhost:5173']
}

app.use(cors(corsOptions))

app.use(express.json());
app.use('/api', router);
app.use('/api/auth', authRouter);
app.use('/api/user', userRoute);

app.use(errorHandler)
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

