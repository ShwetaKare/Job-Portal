import mongoose from "mongoose";

// Payment Model
const paymentSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Courses",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["Credit Card", "Debit Card"],
      required: true,
    },
    cardNumber: String,
    cardHolderName: String,
    expiryMonth: Number,
    expiryYear: Number,
    cvv: String,
    status: {
      type: String,
      enum: ["Pending", "Completed", "Failed"],
      default: "Pending",
    },
    transactionId: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  

export const Payment = mongoose.model('Payment', paymentSchema);


