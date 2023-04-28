import { check } from "express-validator";

export const signUpStudent = [
  check("fullName").notEmpty().withMessage("Name is required"),
  check("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Valid email is required"),
  check("education")
    .notEmpty().withMessage("Education is required"),
  check("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];


export const signUpCompany = [
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email address."),
    check("name")
      .trim()
      .isLength({ min: 2 })
      .withMessage("Please enter the company name."),
    check("password")
      .trim()
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long."),
    check("address")
      .trim()
      .notEmpty()
      .withMessage("Please enter the company's address."),
    check("description")
      .trim()
      .notEmpty()
      .withMessage("Please enter a description for the company."),
    check("rfc")
      .trim()
      .notEmpty()
      .withMessage("Please enter the company's RFC."),
  ];