import mongoose from 'mongoose';

const { Schema } = mongoose;

const paymentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',  
    required: true,
  },
  lawyerId: {
    type: Schema.Types.ObjectId,
    ref: 'Lawyer',  
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed', 'Failed'],
    default: 'Pending',
  },
   
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
