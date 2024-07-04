const router = require('express').Router();

const { EventCreation } = require('../Controllers/EventControllers/EventCreation');
const { EventDetailsEdit } = require('../Controllers/EventControllers/EventDetailEditing');
const { EventRegistration } = require('../Controllers/EventControllers/EventRegistration');
const { GetAllEvents } = require('../Controllers/EventControllers/GetAllEventDetails');
const { GetEvent } = require('../Controllers/EventControllers/GetEvent');

router.post('/create', EventCreation);
router.post('/register', EventRegistration);
router.put('/update', EventDetailsEdit);
router.get('/:id', GetEvent);
router.get('/', GetAllEvents);

module.exports = router;