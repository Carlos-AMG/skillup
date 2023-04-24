import { signUpStudent,signUpCompany } from "../validators/authValidators.js";
export const userTypeValidation = async (req, res, next) => {
    const userType = req.params.userType;
  
    if (userType === "students") {
      await Promise.all(signUpStudent.map((middleware) => new Promise((resolve) => middleware(req, res, resolve))));
    } else if (userType === "companies") {
      await Promise.all(signUpCompany.map((middleware) => new Promise((resolve) => middleware(req, res, resolve))));
    } else {
      return res.status(400).json({ message: "Invalid user type" });
    }
  
    next();
  };
  