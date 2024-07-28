const router = require('express').Router();
const upload = require('../Config/multer-config');

const { UploadImage } = require('../Controllers/TestUploadFeature');

router.get('/', (req, res) => {
    res.send("Welcome to the BOOKIT! Server...that's it 🙂");
})

router.post('/upload', upload.single('image'), UploadImage);

module.exports = router;