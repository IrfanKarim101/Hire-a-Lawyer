import { v4 as uuidv4 } from 'uuid';
import PaymentModel from '../models/paymentModel.js';
import UserModel from '../models/userModel.js';
import createError from '../utils/error.js';
import dotenv from 'dotenv';

dotenv.config();

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
// const stripeInstance = stripe(stripeSecretKey);

class PaymentController {
  static async createPayment(req, res, next) {
    // ... (existing code for createPayment)
  }

  // static async checkout(req, res) {
  //   const { token, data, id } = req.body;
  //   try {
  //     const customer = await stripeInstance.customers.create({
  //       email: token.email,
  //       source: token.id
  //     });

  //     const key = uuid();
  //     const charge = await stripeInstance.charges.create({
  //       amount: data.price * 100,
  //       currency: 'usd',
  //       customer: customer.id,
  //       receipt_email: token.email,
  //       description: `Hired a lawyer for ${data.service}`,
  //       key: key,
  //     });

  //     const user = await UserModel.findOne({ _id: id });

  //     user.hiredLawyer = {
  //       lawyerId: data.lawyerId,
  //       service: data.service,
  //       paymentId: charge.id,  
  //     };

  //     const savedUser = await user.save();

  //     // Create a new payment document
  //     const payment = new PaymentModel({
  //       userId: id,
  //       lawyerId: data.lawyerId,
  //       amount: data.price,
  //       status: 'Completed',  
  //     });

      
  //     const result = await payment.save();

  //     res.status(200).json({ success: true, message: 'Payment and lawyer hiring successful', user: savedUser, payment: result });
  //   } catch (error) {
  //     console.error('Error in checkout:', error);
  //     res.status(400).json({ success: false, error: 'Payment Failed' });
  //   }
  // }

  static checkout=async(req,res)=>{  
    const {token,data,id}=req.body
    try {
      const customer=await stripe.customers.create({
        email:token.email,
        source:token.id
      })
      const key=uuidv4()
      const charge = await stripeSecretKey.charges.create({
        amount: data.price * 100,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: `Purchased the ${data.name}`,
        key: key, 
      });
      // const user=await User.findOne({_id:id})
      // user.paidCourse=data._id
      // const save= await  user.save()
      res.status(200).send(charge)
    } catch (error) {
     res.status(400).json({ error: 'Payment Failed' });    }
  }
}

export default PaymentController;
