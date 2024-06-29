const { createEvent } = require('../../SQL/EventQueries/CreateEvent');
const { findByAttribute } = require('../../SQL/AuthQueries/FindExistingEntity');

module.exports.EventCreation = async(req, res) => {
    try {
        const { eventDetails, organizerID } = req.body;

        const existingOrganizer = await findByAttribute("organizer", "id", organizerID);

        if(!existingOrganizer.length) {
            console.log("Organizer not found", organizerID);
            res.send({ message : "No organizer found"});
            return;
        }

        console.log(eventDetails);

        const successfulEventCreation = await createEvent(eventDetails, organizerID);

        console.log("Event creation successful", successfulEventCreation);

        res.status(200)
           .send({
                message : "Event created Successfully",
                event : successfulEventCreation
           });

    } catch(error) {
        console.error(error)
        res.status(500)
            .send({ message : 'Internal server error' });
        throw error;
    }
}