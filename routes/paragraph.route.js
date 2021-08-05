const express = require('express');
const router = express.Router();
const path = require('path');
const paragraphController = require('../controllers/paragraph.controller');

const multer = require('multer');
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

let upload = multer({ storage: storage })

let cpUpload = upload.fields([{ name: 'paragraph', maxCount: 1 }, { name: 'selections', maxCount: 1 }]);
router.post('/upload', cpUpload, paragraphController.UploadTextFile);

router.get('/preview', paragraphController.UploadTextReading);

router.post('/submit', paragraphController.Submit);

router.get('/', paragraphController.GetAllParagraph);

router.get('/:id', paragraphController.GetOneParagraph);

router.delete('/:id', paragraphController.DeleteOneParagraph);

router.patch('/:id', paragraphController.UpdateOneParagraph);


module.exports = router;