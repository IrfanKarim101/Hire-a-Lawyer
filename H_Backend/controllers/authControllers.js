import userModel from "../models/userModel.js";
import lawyerModel from "../models/lawyerModel.js";
import createError from "../utils/error.js";
import bcrypt from "bcrypt";

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const foundLawyer = await lawyerModel.findOne({ email });

    if (!foundLawyer) {
      const foundUser = await userModel.findOne({ email });

      if (!foundUser) {
        return next(createError(404, "User not found"));
      }

      const passwordMatch = await bcrypt.compare(password, foundUser.password);

      if (passwordMatch) {
        const { password, ...otherDetails } = foundUser;
        return res
          .status(200)
          .json({
            success: true,
            message: "Authentication successful",
            userType: "user",
            userDocument: otherDetails,
          });
      } else {
        return res
          .status(401)
          .json({ success: false, message: "Authentication failed" });
      }
    }

    const passwordMatch = await bcrypt.compare(password, foundLawyer.password);

    if (passwordMatch && foundLawyer.isLawyer) {
      const { password, ...otherDetails } = foundLawyer;
      return res
        .status(200)
        .json({
          success: true,
          
          message: "Authentication successful",
          userType: "lawyer",
          userDocument: otherDetails,
        });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Authentication failed" });
    }
  } catch (err) {
    next(err);
  }
};

export default login;
