const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');
const Booking = require('../models/bookingModel');
const factory = require('./handlerFactory');

const getCheckoutSession = catchAsync(async (req, res, next) => {
  // find the tour
  const tour = await Tour.findById(req.params.tourId);

  // create a checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card', 'amazon_pay'],
    mode: 'payment',
    success_url: `${req.protocol}://${req.get('host')}?tour=${tour.id}&user=${
      req.user.id
    }&price=${tour.price}`,
    cancel_url: `${req.protocol}://${req.get('host')}/tours/${tour.slug}/`,
    customer_email: req.user.email,
    client_reference_id: req.params.tourId,
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `${tour.name} Tour`,
            description: tour.summary
          },
          unit_amount: tour.price * 100
        },
        quantity: 1
      }
    ]
  });

  res.status(200).json({ status: 'success', session });
});

const createBookingCheckout = catchAsync(async (req, res, next) => {
  // This is temporary, not secure: anyone can make bookings without paying
  const { tour, user, price } = req.query;
  if (!tour || !user || !price) return next();
  await Booking.create({ tour, user, price });
  res.redirect(req.originalUrl.split('?')[0]);
});

const createBooking = factory.createOne(Booking);
const getAllBooking = factory.getAll(Booking);
const getBooking = factory.getOne(Booking);
const updateBooking = factory.updateOne(Booking);
const deleteBooking = factory.deleteOne(Booking);

module.exports = {
  getCheckoutSession,
  createBookingCheckout,
  createBooking,
  getAllBooking,
  getBooking,
  updateBooking,
  deleteBooking
};
