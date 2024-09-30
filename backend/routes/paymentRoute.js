import express from 'express';
import {
    createPaymentIntent,
    confirmPayment,
    completePayment,
    listPayments,
    getPaymentDetails,
    createPayment,
    getPayments,
    getPaymentById,
    updatePayment,
    deletePayment
} from '../controllers/paymentController.js';

const router = express.Router();

// Route to create a new payment intent
router.post('/create-intent', createPaymentIntent);

// Route to handle Stripe webhook for payment confirmation
router.post('/webhook', express.raw({ type: 'application/json' }), confirmPayment);

// Route to complete a payment and link it to an order
router.post('/complete', completePayment);

// Route to list all payments
router.get('/list', listPayments);

// Route to get payment details by ID
router.get('/:id', getPaymentDetails);

// Route to create a payment record
router.post('/', createPayment);

// Route to get all payments (alternative to /list)
router.get('/', getPayments);

// Route to get a payment by ID (alternative to /:id)
router.get('/id/:id', getPaymentById);

// Route to update a payment by ID
router.put('/:id', updatePayment);

// Route to delete a payment by ID
router.delete('/:id', deletePayment);

export default router;
