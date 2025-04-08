/*eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe(
  'pk_test_51RBGu04NVVBwBNqfcXMoixufSDiUNeRJB5hNEIXMbenDiA86sB9MhpmyOkxr5cQPOiHCaIKPv8wIKEQxGfTnL0SP006xYObEDQ'
);

export const bookTour = async tourId => {
  try {
    // Get session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    // create checkoutform + chage credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    showAlert('error', err);
  }
};
