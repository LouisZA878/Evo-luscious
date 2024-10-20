const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

function upload() {
  const mongodbUrl = process.env.MONGO;

  const storage = new GridFsStorage({
    url: mongodbUrl,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        const fileInfo = {
          filename: file.originalname.replace(/\s+/g, '_').replace(/\.(png|jpe?g|gif|bmp|svg)$/i, '') + "_" + new Date().getTime(),
          bucketName: process.env.BUCKET_NAME,
        };
        resolve(fileInfo);
      });
    },
  });

  const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];
    
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(new Error('Invalid file type, only images are allowed.'), false);
    }
    cb(null, true);
  };

  return multer({ storage, fileFilter });
}

module.exports = { upload };
