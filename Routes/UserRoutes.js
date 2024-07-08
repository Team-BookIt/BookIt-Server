const router = require('express').Router();

const { GetOrganizerProfile } = require('../Controllers/ProfileControllers/Users/GetOrganizerProfile');

router.get('/org/:orgId', GetOrganizerProfile);

module.exports = router;