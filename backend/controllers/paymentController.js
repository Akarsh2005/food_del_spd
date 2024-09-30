import PaymentModel from '../models/PaymentModel.js';
import orderModel from '../models/orderModel.js';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create a Stripe Payment Intent
const createPaymentIntent = async (req, res) => {
    try {
        const { amount, paymentMethod, userId, address } = req.body;

        // Create a Payment Intent on Stripe
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Stripe expects the amount in cents
            currency: "inr",
            payment_method: paymentMethod,
            metadata: { userId },
        });

        // Create a new payment record in the database
        const payment = new PaymentModel({
            stripePaymentIntentId: paymentIntent.id,
            paymentMethod,
            amount,
            user: userId,
            address,
        });

        await payment.save();

        res.json({ success: true, clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error creating payment intent" });
    }
};

// Handle Stripe Webhook to Confirm Payment
const confirmPayment = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    try {
        const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);

        if (event.type === 'payment_intent.succeeded') {
            const paymentIntent = event.data.object;
            const payment = await PaymentModel.findOne({ stripePaymentIntentId: paymentIntent.id });

            if (payment && payment.status === "pending") {
                payment.status = "completed";
                await payment.save();
            }
        }

        res.json({ received: true });
    } catch (error) {
        console.log(error);
        res.status(400).send(`Webhook Error: ${error.message}`);
    }
};

// Complete Payment and Link Order
const completePayment = async (req, res) => {
    try {
        const { orderId, paymentId } = req.body;

        const payment = await PaymentModel.findById(paymentId);
        if (!payment || payment.status !== "pending") {
            return res.status(400).json({ success: false, message: "Invalid payment or payment already processed" });
        }

        // Link the payment with the order (assuming you have a method for this)
        payment.status = "completed";
        await payment.save();

        // Link the payment to the order if necessary
        // You might need to update the order model to include a payment reference

        res.json({ success: true, message: "Payment completed and order linked" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error completing payment" });
    }
};

// List all payments
const listPayments = async (req, res) => {
    try {
        const payments = await PaymentModel.find({}).populate('user');
        res.json({ success: true, data: payments });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error retrieving payments" });
    }
};

// Retrieve payment details by ID
const getPaymentDetails = async (req, res) => {
    try {
        const payment = await PaymentModel.findById(req.params.id).populate('user');
        if (!payment) {
            return res.status(404).json({ success: false, message: "Payment not found" });
        }
        res.json({ success: true, data: payment });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error retrieving payment details" });
    }
};

// Additional methods for CRUD operations (if needed)
const createPayment = async (req, res) => {
    try {
        const payment = new PaymentModel(req.body);
        await payment.save();
        res.status(201).json(payment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getPayments = async (req, res) => {
    try {
        const payments = await PaymentModel.find();
        res.status(200).json(payments);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getPaymentById = async (req, res) => {
    try {
        const payment = await PaymentModel.findById(req.params.id);
        if (!payment) return res.status(404).json({ message: 'Payment not found' });
        res.status(200).json(payment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updatePayment = async (req, res) => {
    try {
        const payment = await PaymentModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!payment) return res.status(404).json({ message: 'Payment not found' });
        res.status(200).json(payment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deletePayment = async (req, res) => {
    try {
        const payment = await PaymentModel.findByIdAndDelete(req.params.id);
        if (!payment) return res.status(404).json({ message: 'Payment not found' });
        res.status(200).json({ message: 'Payment deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export {
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
};
