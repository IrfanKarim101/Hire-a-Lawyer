import mongoose from 'mongoose';

const { Schema } = mongoose;

const lawyerSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  cell: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  education: {
    type: String,
    required: true,
  },
  practiceArea: {
    type: String,
    required: true,
  },
  expertise: {
    type: String,
    default: true,
  },
  isLawyer: {
    type: Boolean,
    default: true,
  },
  reviews: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      text: String,
      rating: {
        type: Number,
        min: 1,
        max: 5,
      },
    },
  ],
}, { timestamps: true });

const lawyerModel = mongoose.model('lawyer', lawyerSchema);
export default lawyerModel;
