const router = require('express').Router();

const { EventCreation } = require('../Controllers/EventControllers/EventCreation');

router.post('/create', EventCreation);

module.exports = router;