const { findByAttribute } = require("../../../SQL/AuthQueries/FindExistingEntity");
const { getOrganizerProfile } = require("../../../SQL/UserSideQueries/GetOrganizerProfile");

module.exports.GetOrganizerProfile = async(req, res) => {
    try {
        const organizerId = req.params.orgId;

        const existingOrganizer = await findByAttribute('organizer', 'id', organizerId);

        if(!existingOrganizer.length) {
            console.log("Organizer not found");
            res.send({ message : "Organizer not found. Please try again"});
            return;
        }

        const organizerProfile = await getOrganizerProfile(organizerId);

        console.log("Organizer profile : ", organizerProfile);

        res.status(200)
           .send({
                message : "Organizer profile returned successfully",
                organizerProfile : organizerProfile
           });

    } catch (error) {
        console.error("Error handling request: ", error);
        res.status(500)
           .send({ message : "Internal server error"});
        throw error;
    }
}