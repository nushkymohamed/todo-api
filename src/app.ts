// src/app.ts
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import todoRoutes from './routes/todo';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/todo-db', {

});

app.use('/', todoRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
