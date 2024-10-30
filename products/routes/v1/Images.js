const { Router } = require('express');
const mongoose = require('mongoose');
const { Transform } = require("stream");

const {
    imageID,
    validationResult,
    matchedData
} = require('../../components/Validator');

let bucket;
mongoose.connection.on("connected", () => {
    bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: process.env.BUCKET_NAME,
    });
});

const router = Router();

router.get('/images', [
    imageID().isImageIDValid(),
], async (req, res) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        return res.status(400).send({ errors: result.array() });
    }

    const { imageID } = matchedData(req);
    try {
        const cursor = bucket.find({ _id: new mongoose.Types.ObjectId(imageID) })
        const files = await cursor.toArray();

        const filesData = await Promise.all(
          files.map((file) => {
            return new Promise((resolve, _reject) => {
              bucket.openDownloadStream(file._id).pipe(
                (() => {
                  const chunks = [];
                  return new Transform({
                    // transform method will
                    transform(chunk, encoding, done) {
                      chunks.push(chunk);
                      done();
                    },
                    flush(done) {
                      const fbuf = Buffer.concat(chunks);
                      const fileBase64String = fbuf.toString("base64");
                      resolve(fileBase64String);
                      done();
                    },
                  });
                })()
              );
            });
          })
        );
        res.status(200).json({
            picture: filesData,
            mime: files[0].metadata.mimetype
            
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: { error } });
    }
});

module.exports = router;
// const { Router } = require('express');
// const mongoose = require('mongoose');
// const {
//     imageID,
//     validationResult,
//     matchedData
// } = require('../../components/Validator');

// let bucket;
// mongoose.connection.on("connected", () => {
//     bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
//         bucketName: process.env.BUCKET_NAME,
//     });
// });

// const router = Router();

// router.get('/images', [
//     imageID().isImageIDValid(),
// ], async (req, res) => {
//     const result = validationResult(req);

//     if (!result.isEmpty()) {
//         return res.status(400).send({ errors: result.array() });
//     }

//     const { imageID } = matchedData(req);
//     try {
//         const file = await bucket.find({ _id: new mongoose.Types.ObjectId(imageID) }).toArray();

//         if (!file || file.length === 0) {
//             return res.status(404).json({ msg: "File not found" });
//         }

//         res.set("Content-Type", file[0].contentType);
//         // res.set("Content-Disposition", `attachment; filename="${file[0].filename}"`);

//         const downloadStream = bucket.openDownloadStream(new mongoose.Types.ObjectId(imageID));
        
//         downloadStream.pipe(res).on('error', (error) => {
//             console.error(error);
//             res.status(500).json({ msg: "Error downloading file" });
//         });

//     } catch (error) {
//         console.log(error);
//         res.status(400).json({ msg: { error } });
//     }
// });

// module.exports = router;
