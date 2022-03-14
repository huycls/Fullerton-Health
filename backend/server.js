import express from 'express';
import data from './data.js';
import userRouter from './routes/userRouter.js';
import bookingRouter from './routes/bookingRouter.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// mongoose.connect('mongodb+srv://huyhoangcls:huynguyen289970@cluster0.hn9iu.mongodb.net/test', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
// });

// const URI = process.env.MONGODB_URL;

mongoose.connect("mongodb+srv://huyhoangcls:huynguyen289970@cluster0.hn9iu.mongodb.net/test",
    err => {
        if(err) throw err;
        console.log('connected to MongoDB')
    });

app.use('/api/users', userRouter);
app.use('/api/booking', bookingRouter);

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
  });

app.listen(5000, () => {
    console.log('Serve at http://localhost:5000')
});