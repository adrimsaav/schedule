const express = require('express');
const router = express.Router();
const scheduleCtrl = require('../controllers/schedule');
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.delete('/:id', scheduleCtrl.delete);

module.exports = router;