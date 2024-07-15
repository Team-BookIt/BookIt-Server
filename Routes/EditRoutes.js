const router = require('express').Router();

const { AttendeeInterestUpdate } = require('../Controllers/ProfileControllers/AttendeeInterestUpdate');
const { AttendeeProfileUpdate } = require('../Controllers/ProfileControllers/AttendeeProfileUpdate');
const { OrganizerProfileUpdate } = require('../Controllers/ProfileControllers/OrganizerProfileUpdate');

router.put('/user/update', AttendeeProfileUpdate);
router.put('/org/update', OrganizerProfileUpdate);
router.post('/user/interests', AttendeeInterestUpdate);

module.exports = router;