const { Router } = require('express')

const { upload } = require('../../utils/upload')

const router = Router()


router.post('/test_product',
[
    upload().single("file")
]
,(req, res) => {

    console.log(req.file)
    res.send({
        file: req.file
    })

    
})

module.exports = router