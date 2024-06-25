const router = require('express').Router();

const { AttendeeSignUp } = require('../Controllers/AuthControllers/AttendeeSignup');
const { AttendeeLogin } = require('../Controllers/AuthControllers/AttendeeLogin');
const { OrganizerSignUp } = require('../Controllers/AuthControllers/OrganizerSignUp');
const { OrganizerLogin } = require('../Controllers/AuthControllers/OrganizerLogin');

router.post('/user/signup', AttendeeSignUp);
router.post('/user/login', AttendeeLogin);
router.post('/org/signup', OrganizerSignUp);
router.post('/org/login', OrganizerLogin);

module.exports = router;