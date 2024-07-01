const { findByAttribute } = require("../../SQL/AuthQueries/FindExistingEntity");
const { editProfile } = require("../../SQL/ProfileEditQueries/EditProfile");

module.exports.EventDetailsEdit = async(req, res) => {
    try {
        const { details, id } = req.body;
        const existingEvent = await findByAttribute('event', 'id', id);

        if(!existingEvent.length) {
            console.log("No event found");
            res.send({ message : "No event found"});
            return;
        }

        const successfulEdit = await editProfile('event', details, id);

        console.log("Event details edited successfully: ", successfulEdit);

        res.status(200)
           .send({
                message : 'Event details updated successfully',
                event : successfulEdit
           });
           
    } catch(error) {
        console.error(error)
        res.status(500)
            .send({ message : 'Internal server error' });
        throw error;
    }
}