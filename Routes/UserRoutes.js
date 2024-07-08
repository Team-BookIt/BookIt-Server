const router = require('express').Router();

const { GetOrganizerProfile } = require('../Controllers/ProfileControllers/Users/GetOrganizerProfile');
const { GetUserProfile } = require('../Controllers/ProfileControllers/Users/GetUserProfile');

router.get('/org/:orgId', GetOrganizerProfile);
router.get('/:userId', GetUserProfile);

module.exports = router;