const express = require('express');
const router = express.Router();
const apptsCtrl = require('../controllers/appts');
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.get('/', apptsCtrl.index);
router.get('/new', apptsCtrl.new);
router.get('/:id', apptsCtrl.showAppt);
router.get('/:id/edit', apptsCtrl.editAppt);

router.post('/', apptsCtrl.create);
router.post('/:id', apptsCtrl.update);
router.get('/:id/delete', apptsCtrl.delete);

module.exports = router;
