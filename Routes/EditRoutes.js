const router = require('express').Router();

const { AttendeeProfileUpdate } = require('../Controllers/ProfileEditControllers/AttendeeProfileUpdate');
const { OrganizerProfileUpdate } = require('../Controllers/ProfileEditControllers/OrganizerProfileUpdate');

router.put('/user/update', AttendeeProfileUpdate);
router.put('/org/update', OrganizerProfileUpdate);

module.exports = router;