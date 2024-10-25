const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

function upload() {
  const mongodbUrl = process.env.MONGO;

  const storage = new GridFsStorage({
    url: mongodbUrl,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        const fileInfo = {
          filename: file.originalname,
          bucketName: process.env.BUCKET_NAME,
          metadata: {
            mimetype: file.mimetype
          }
        };
        resolve(fileInfo);
      });
    },
  });

  return multer({ storage });
}

module.exports = { upload };
