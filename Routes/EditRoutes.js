const router = require('express').Router();

const { AttendeeInterestUpdate } = require('../Controllers/ProfileEditControllers/AttendeeInterestUpdate');
const { AttendeeProfileUpdate } = require('../Controllers/ProfileEditControllers/AttendeeProfileUpdate');
const { OrganizerProfileUpdate } = require('../Controllers/ProfileEditControllers/OrganizerProfileUpdate');

router.put('/user/update', AttendeeProfileUpdate);
router.put('/org/update', OrganizerProfileUpdate);
router.post('/user/interests', AttendeeInterestUpdate);

module.exports = router;