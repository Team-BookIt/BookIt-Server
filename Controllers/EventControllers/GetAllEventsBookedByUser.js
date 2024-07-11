const { getAllEventsBookedByUser } = require("../../SQL/EventQueries/GetAllBookedEvents");

module.exports.GetAllEventsBookedByUser = async(req, res) => {
    try {
        const userId = parseInt(req.params.userId);

        const bookedEvents = await getAllEventsBookedByUser(userId);

        if(!bookedEvents.length) {
            console.log("User has no booked events");
            res.send({ 
                message : "Seems like you haven't booked any events",
                bookedEvents : bookedEvents
            });
        }

        console.log("Booked events: ", bookedEvents);

        res.status(200)
           .send({
                message : "Booked events obtained succcessfully",
                bookedEvents : bookedEvents
           });

    } catch (error) {
        console.error("Error handling request: ", error);
        res.status(500)
           .send({ message : "Internal server error"});
        throw error;
    }
}