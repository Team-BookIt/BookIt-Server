const router = require('express').Router();

const { GetOrganizerProfile } = require('../Controllers/ProfileControllers/Users/GetOrganizerProfile');

router.get('/:orgId', GetOrganizerProfile);

module.exports = router;