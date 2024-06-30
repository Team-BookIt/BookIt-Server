const router = require('express').Router();

const { EventCreation } = require('../Controllers/EventControllers/EventCreation');
const { EventRegistration } = require('../Controllers/EventControllers/EventRegistration');

router.post('/create', EventCreation);
router.post('/register', EventRegistration);

module.exports = router;