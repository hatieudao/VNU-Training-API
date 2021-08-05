const express = require('express');
const router = express.Router();

const audioController = require('../controllers/audio.controller');

router.get('/:id', audioController.getAudio);

module.exports = router;