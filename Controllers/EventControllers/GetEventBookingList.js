const { findByAttribute } = require("../../SQL/AuthQueries/FindExistingEntity");
const { getEventBookingList } = require("../../SQL/EventQueries/GetEventBookingList");

module.exports.GetEventBookingList = async(req, res) => {
    try {
        const eventId = req.params.eventId;

        const existingEvent = await findByAttribute('event', 'id', eventId);

        if(!existingEvent.length) {
            console.log("Event not found");
            res.send({ message : "Event not found" });
            return;
        }

        const bookingList = await getEventBookingList(eventId);

        console.log("Booking List: ", bookingList);

        res.status(200)
           .send({
                message : "Booking list returned successfully",
                bookingList : bookingList
        });
        
    } catch (error) {
        console.error("Error handling request: ", error);
        res.status(500)
           .send({ message : "Internal server error"});
        throw error;
    }
}