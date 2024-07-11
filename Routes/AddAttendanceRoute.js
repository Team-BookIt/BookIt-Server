const router = require ('express').Router();

const {AddAttendance} = require('../Controllers/AttendenceController/addAtendance')


router.post('/add', AddAttendance);

module.exports =router;