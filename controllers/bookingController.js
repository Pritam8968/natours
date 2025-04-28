const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Tour = require('../models/tourModel');
const User = require('../models/userModel');
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
    // success_url: `${req.protocol}://${req.get('host')}?tour=${tour.id}&user=${
    //   req.user.id
    // }&price=${tour.price}`,
    success_url: `${req.protocol}://${req.get('host')}/my-tours`,
    cancel_url: `${req.protocol}://${req.get('host')}/tours/${tour.slug}/`,
    customer_email: req.user.email,
    client_reference_id: req.params.tourId,
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `${tour.name} Tour`,
            description: tour.summary,
            images: [
              `${req.protocol}://${req.get('host')}/img/tours/${
                tour.imageCover
              }`
            ]
          },
          unit_amount: tour.price * 100
        },
        quantity: 1
      }
    ]
  });

  res.status(200).json({ status: 'success', session });
});

/*const createBookingCheckout = catchAsync(async (req, res, next) => {
  // This is temporary, not secure: anyone can make bookings without paying
  const { tour, user, price } = req.query;
  if (!tour || !user || !price) return next();
  await Booking.create({ tour, user, price });
  res.redirect(req.originalUrl.split('?')[0]);
});*/

const createBooking = factory.createOne(Booking);
const getAllBooking = factory.getAll(Booking);
const getBooking = factory.getOne(Booking);
const updateBooking = factory.updateOne(Booking);
const deleteBooking = factory.deleteOne(Booking);

const createBookingCheckout = async session => {
  try {
    const tour = session.client_reference_id;
    const user = (await User.findOne({ email: session.customer_email })).id;
    const price = session.amount_total / 100; // Use `amount_total` for total price
    await Booking.create({ tour, user, price });
  } catch (error) {
    console.error('Error creating booking:', error);
  }
};

const webhookCheckout = async (req, res, next) => {
  const signature = req.headers['stripe-signature'];
  let event;

  try {
    // Log raw body for debugging
    console.log('Raw body:', req.body.toString());

    // Construct the event using the raw body
    event = stripe.webhooks.constructEvent(
      req.body, // Ensure raw body is passed here
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    // Log the constructed event
    console.log('Constructed event:', event);
  } catch (error) {
    console.error('Webhook signature verification failed:', error.message);
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    try {
      const session = event.data.object;
      console.log('Checkout session:', session); // Debugging log
      await createBookingCheckout(session); // Await the async function
    } catch (error) {
      console.error('Error handling checkout session:', error);
      return res.status(500).send('Internal Server Error');
    }
  }

  res.status(200).json({ received: true });
};

module.exports = {
  getCheckoutSession,
  // createBookingCheckout,
  createBooking,
  getAllBooking,
  getBooking,
  updateBooking,
  deleteBooking,
  webhookCheckout
};
