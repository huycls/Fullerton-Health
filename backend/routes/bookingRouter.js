import express from "express";
import expressAsyncHandler from 'express-async-handler';
import Booking from "../models/bookingModel.js";
import User from '../models/userModel.js';
import { isAuth } from '../utils.js';
import data from '../data.js';

const bookingRouter = express.Router();

bookingRouter.get(
    '/',
    expressAsyncHandler(async (req, res) =>{
        const service = req.query.service || '';
        const location = req.query.location || '';
        const date = req.query.date || '';
        const status = req.query.status || '';
        const customer = req.query.customer || '';
        const createdBy = req.query.createdBy || '';

        const serviceFilter = service ? { service } : {};
        const locationFilter = location ? { location } : {};
        const dateFilter = date ? { date } : {};
        const statusFilter = status ? { status } : {};
        const customerFilter = customer ? { customer } : {};
        const createdByFilter = createdBy ? { createdBy } : {};

        const booking = await Booking.find({
            ...serviceFilter,
            ...locationFilter,
            ...dateFilter,
            ...statusFilter,
            ...customerFilter,
            ...createdByFilter,
        })
        res.send({booking});
    })
);

bookingRouter.get(
    '/:id',
    expressAsyncHandler(async (req, res) => {
      const book = await Booking.findById(req.params.id);
      if (book) {
        res.send(book);
      } else {
        res.status(404).send({ message: 'Not Found ' });
      }
    })
);

bookingRouter.post(
    '/',
    isAuth,
    expressAsyncHandler(async (req, res) => {
      const book = new Booking({
        service: 'Health Talk',
        // customer: req.user.username,
        createdBy: req.user._id,
        location: 'Singapore',
        status: 'Pending Review',
        date: ['']
      });
      const createdBooking = await book.save();
      res.send({ message: 'Booking Created', book: createdBooking });
    })
);

bookingRouter.put(
    '/:id',
    isAuth,
    expressAsyncHandler(async (req, res) => {
      const bookId = req.params.id;
      const book = await Booking.findById(bookId);
      if (book) {
        book.createdBy = req.body.createdBy;
        book.service = req.body.service;
        book.location = req.body.location;
        book.date = req.body.date;
        book.status = req.body.status;
        const updatedBooking = await book.save();
        res.send({ message: 'Booking Updated', book: updatedBooking });
      } else {
        res.status(404).send({ message: 'Not Found' });
      }
    })
);

bookingRouter.delete(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const book = await Booking.findById(req.params.id);
    if (book) {
      const deleteBooking = await book.remove();
      res.send({ message: 'Booking Deleted', book: deleteBooking });
    } else {
      res.status(404).send({ message: 'Not Found' });
    }
  })
);


export default bookingRouter;