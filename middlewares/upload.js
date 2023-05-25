import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'profileImage') {
      cb(null, 'uploads/profile_images/');
    } else if (file.fieldname === 'cv') {
      cb(null, 'uploads/cvs/');
    } else {
      cb(new Error('Invalid fieldname'), false);
    }
  },
  filename: (req, file, cb) => {
    if (file.fieldname === 'profileImage') {
      cb(null, `${req.body.studentId}.${file.mimetype.split('/')[1]}`);
    } else if (file.fieldname === 'cv') {
      cb(null, `${req.body.studentId}.pdf`);
    } else {
      cb(new Error('Invalid fieldname'), false);
    }
  },
});

const upload = multer({ storage });

export { upload };
