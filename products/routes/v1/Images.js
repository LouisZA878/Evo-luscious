const { Router } = require('express');
const mongoose = require('mongoose');

const {
    imageID,
    validationResult,
    matchedData
} = require('../../components/Validator');
const Publish = require('../../components/Publish')
const { TOPIC_NAME, API_V, LOGS_KEY_INFO, LOGS_PAR_INFO, LOGS_KEY_ERROR, LOGS_PAR_ERROR } = process.env


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
        const message = {
            key: LOGS_KEY_ERROR,
            value: `Message: Express input failure - Route: ${API_V}/images`,
            partition: LOGS_PAR_ERROR
        }

        Publish(TOPIC_NAME, message)
        return res.status(400).send({ errors: result.array() });
    }

    const { imageID } = matchedData(req);
    try {
      const file = await bucket
        .find({ _id: new mongoose.Types.ObjectId(imageID) })
        .toArray();

      // set the headers
      res.set("Content-Type", file[0].contentType);

      // create a stream to read from the bucket
      const downloadStream = bucket.openDownloadStream(
        new mongoose.Types.ObjectId(imageID)
      );

      // pipe the stream to the response
      downloadStream.pipe(res);
        const message = {
          key: LOGS_KEY_INFO,
          value: `Message: Image fetched successfully - Route: ${API_V}/images`,
          partition: LOGS_PAR_INFO
      }
  
      Publish(TOPIC_NAME, message)


    } catch (error) {
      const message = {
        key: LOGS_KEY_ERROR,
        value: `Message: Image fetched unsuccefully - Route: ${API_V}/images`,
        partition: LOGS_PAR_ERROR
    }

    Publish(TOPIC_NAME, message)
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
