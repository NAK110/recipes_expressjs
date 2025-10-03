import express from 'express';
import errorHandler from './middleware/errorHandler.js';
import dotenv from 'dotenv';
import router from './routes/recipeRouter.js';
import connectDB from './config/testDB.js';
dotenv.config();

// connectDB();
const app = express();

const port = process.env.PORT || 3001;

app.use(express.json());
app.use('/api', router);

app.use(errorHandler)
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
