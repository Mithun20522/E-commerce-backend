import express from 'express';
import router from './routes/user.route.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT;

mongoose
    .connect(process.env.MONGO_DB_URL)
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.log('Error while connecting MongoDB',error));

app.use('/api',router);

app.listen(PORT, () => {
    console.log(`server is running on PORT: ${PORT}`);
})