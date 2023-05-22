import { check,validationResult } from "express-validator";

export const signUpStudent = [
  check("fullName")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3, max: 20 }).withMessage('Name must be between 3 and 20 characters long')
    .matches(/^(?![ .]+$)[a-zA-Z .]*$/)
    .withMessage("That isn't a name"),
  check("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Valid email is required"),
  check("education")
    .notEmpty().withMessage("Education is required"),
  check("password")
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()\-_=+{}[\]|;:'",.<>/?\\]{6,}$/)
    .withMessage('Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character'),

    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log("validators")
        req.flash('errors', errors.array());
        req.flash('formData', req.body);
        console.log(req.body)
        return res.redirect('/students/signup');
      }
      next();
    },
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

      (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          req.flash('errors', errors.array());
          req.flash('formData', req.body);
          console.log(req.body)
          return res.redirect('/companies/signup');
        }
        next();
      },
  ];

  export const jobValidator = [
    check('title').notEmpty().withMessage('Title is required.'),
    check('description').notEmpty().withMessage('Description is required.'),
    check('skills').notEmpty().withMessage('Skills are required.'),
    check('salary').notEmpty().withMessage('Salary is required.'),
    check('hoursPerWeek').notEmpty().withMessage('Hours Per Week are required.'),

  
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        req.flash('errors', errors.array());
        req.flash('formData', req.body);
        console.log(req.body)
        return res.redirect('/companies/offers');
      }
      next();
    },
  ];

  export const courseValidator = [
    check('title').notEmpty().withMessage('Title is required.'),
    check('startDate').notEmpty().withMessage('A Start Day is required.'),
    check('endDate').notEmpty().withMessage('An End Day is required.'),
    check('description').notEmpty().withMessage('Description is required.'),
    check('prerequisites').notEmpty().withMessage('Prerequisites are required.'),

  
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        req.flash('errors', errors.array());
        //req.flash('formData', req.body);
        console.log(req.body)
        return res.redirect('/companies/offers');
      }
      next();
    },
  ];


  
  export const jobEditValidator = [
    check('title').notEmpty().withMessage('Title is required.'),
    check('description').notEmpty().withMessage('Description is required.'),
    check('skills').notEmpty().withMessage('Skills are required.'),
    check('salary').notEmpty().withMessage('Salary is required.'),
    check('hoursPerWeek').notEmpty().withMessage('Hours Per Week are required.'),

  
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        req.flash('errors', errors.array());
        req.flash('formData', {...req.body,id:req.params.id});

        return res.redirect(`/companies/edit-offer/job/${req.params.id}`);
      }
      next();
    },
  ];

  export const courseEditValidator = [
    check('title').notEmpty().withMessage('Title is required.'),
    check('startDate').notEmpty().withMessage('A Start Day is required.'),
    check('endDate').notEmpty().withMessage('An End Day is required.'),
    check('description').notEmpty().withMessage('Description is required.'),
    check('prerequisites').notEmpty().withMessage('Prerequisites are required.'),

  
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        req.flash('errors', errors.array());
        //req.flash('formData', req.body);

        req.flash('formData', {...req.body,id:req.params.id});

        return res.redirect(`/companies/edit-offer/course/${req.params.id}`);
      }
      next();
    },
  ];

export const updateStudentProfileValidator=[
  check("fullName")
    .isLength({ min: 3, max: 20 }).withMessage('Name must be between 3 and 20 characters long')
    .withMessage('Name is required'),
  check("education")
    .notEmpty().withMessage("Education is required"),

]