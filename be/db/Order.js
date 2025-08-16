import mongoose from "mongoose";

export const OrderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    default:"abc123" 
  },
   reading: {
    type: String,
    default:0 
  },
   billImageURL: {
    type: String,
    default:"" 
  },
  roomNumber: {
    type: Number,
    default: 0
  },
  totalAmount: {
    type: Number,
    default: 0.0
  },
    failureReason: {
    type: String,
    default: null
  },
  
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentMethod: String,
  orderDate: {
    type: Date,
    default: Date.now
  },
  
});