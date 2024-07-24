import lawyerModel from '../models/lawyerModel.js';
import createError from '../utils/error.js';
import bcrypt from 'bcrypt';

class LawyerController {
  static registerLawyer = async (req, res, next) => {
    try {
      const { firstName, lastName, email, password, confirmPassword, cell, address, education, practiceArea, expertise } = req.body;

      if (password !== confirmPassword) {
        return res.status(400).json({ success: false, message: "Passwords do not match" });
      }

      const existingLawyer = await lawyerModel.findOne({ email });
      if (existingLawyer) {
        return res.status(400).json({ success: false, message: "The lawyer is already exist" });
      }

      const saltRounds = 10;
      const hashPassword = await bcrypt.hash(password, saltRounds);

      const newLawyer = new lawyerModel({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashPassword,
        cell: cell,
        address: address,
        education: education,
        practiceArea: practiceArea,
        expertise:expertise,
      });

      await newLawyer.save();
      res.status(200).json({ success: true, message: "Lawyer has been created" });

    } catch (err) {
      next(err);
    }
  }

  // get======================

  static getAllLawyers = async (req, res, next) => {
    try {
      console.log('all Data')
      // const query = address ? { address: { $regex: new RegExp(address, 'i') } } : {};
      // const result = await lawyerModel.find(query, { password: 0, isLawyer: 0 });
      const result = await lawyerModel.find()
  
      if (!result || result.length === 0) {
        return res.send("Sorry, no lawyer is available.");
      }
  
      res.status(200).json(result);
    } catch (err) {
      console.error('Error in getAllLawyers:', err); // Log errors
      next(createError(500, 'Internal Server Error'));
    }
  };
  


  // search ===================
  static searchLawyersByAddress = async (req, res, next) => {
    try {
      const { data  } = req.body.params;
      console.log(data)

      if (!address) {
        return res.status(400).json({ success: false, message: 'Address parameter is missing' });
      }

      const result = await lawyerModel.find({ address: new RegExp(address, 'i') }, { password: 0, isLawyer: 0 });

      if (result.length === 0) {
        return res.status(404).json({ success: false, message: 'No lawyers found with the provided address' });
      }

      res.status(200).json(result);
    } catch (err) {
      next(createError(500, 'Internal Server Error'));
    }
  }

  //update ===============

  static updateDoc = async (req , res , next ) =>
  {

    try
    {
           const id = req.params.id.trim();
           const update= req.body;

           await lawyerModel.findByIdAndUpdate(id , update);
           req.status(200).json(result);

    }catch(error)
    {
      next(err);
    }
  }
}

export default LawyerController;
