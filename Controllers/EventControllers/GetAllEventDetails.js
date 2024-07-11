const { getAllEvents } = require("../../SQL/EventQueries/GetAllEvents");

module.exports.GetAllEvents = async(req, res) => {
    try {
        const allEvents = await getAllEvents();

        if(!allEvents.length) {
            console.log("Oops! Seems we don't have any events for you");
            res.send({ message : "Oops! Seems we don't have any events for you"});
            return;
        }

        console.log("All events:", allEvents);

        res.status(200)
           .send({
                message : "All events obtained successfully",
                events : allEvents,
                eventCount : allEvents.length
           });

    } catch (error) {
        console.error("Error: ", error);
        res.status(500)
           .send({ message : "Internal server error"});
        throw error;
    }
}