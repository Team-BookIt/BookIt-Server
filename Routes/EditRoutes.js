const router = require('express').Router();

const { AttendeeProfileUpdate } = require('../Controllers/ProfileEditControllers/AttendeeProfileUpdate');

router.put('/user/update', AttendeeProfileUpdate);

module.exports = router;