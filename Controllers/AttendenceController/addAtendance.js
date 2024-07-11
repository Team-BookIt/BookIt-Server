const { findByAttribute } = require('../../SQL/AuthQueries/FindExistingEntity');
const { addAttendance }   = require('../../SQL/AttendanceQueries/AddAttendance');

module.exports.AddAttendance = async (req, res) =>{
    try {
        const {userID, eventID} = req.body;

        const existingUser = await findByAttribute('guest', 'id', userID);

        if(!existingUser.length) {
            console.log("Error: No existing user found");
            res.send({ message : "No user found"});
            return;
        }

        const existingEvent = await findByAttribute('event', 'id', eventID);

        if(!existingEvent.length) {
            console.log("Error: No existing event found");
            res.send({ message : "No event found"});
            return;
        }
        const successfullyAddedAttendance = await addAttendance(userID, eventID);

        console.log("Successfully added attendee ", successfullyAddedAttendance);

        res.status(200)
           .send({ 
                message : 'attendee added successfully',
                attendanceRecord : successfullyAddedAttendance
            });

    } catch (error) {
  
        console.error(error);
        res.status(500)
            .send({ message : 'Internal server error' });
    }
}