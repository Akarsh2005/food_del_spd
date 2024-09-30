// models/paymentModel.js

import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    orderId: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, default: 'Pending' },
    paymentDate: { type: Date, default: Date.now },
    paymentMethod: { type: String, required: true },
});

const PaymentModel = mongoose.model('Payment', paymentSchema);

export default PaymentModel;
