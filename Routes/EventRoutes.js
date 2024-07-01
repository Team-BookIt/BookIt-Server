const router = require('express').Router();

const { EventCreation } = require('../Controllers/EventControllers/EventCreation');
const { EventDetailsEdit } = require('../Controllers/EventControllers/EventDetailEditing');
const { EventRegistration } = require('../Controllers/EventControllers/EventRegistration');

router.post('/create', EventCreation);
router.post('/register', EventRegistration);
router.put('/update', EventDetailsEdit);

module.exports = router;