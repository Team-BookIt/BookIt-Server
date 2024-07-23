const { findByAttribute } = require("../../SQL/AuthQueries/FindExistingEntity");
const { cancelBooking } = require("../../SQL/EventQueries/CancelBooking");

module.exports.CancelBooking = async(req, res) => {
    try {
        const { guestId, eventId } = req.body.bookingDetails;

        const existingGuest = await findByAttribute('guest', 'id', guestId);

        if(!existingGuest.length) {
            console.log("Guest not found");
            res.send({ message : "Guest not found" });
            return;
        }

        const existingEvent = await findByAttribute('event', 'id', eventId);

        if(!existingEvent.length) {
            console.log("Event not found");
            res.send({ message : "Event not found" });
            return;
        }

        const successfulBookingDeletion = await cancelBooking(guestId, eventId);

        const response = successfulBookingDeletion ? {
            message : "Event booking cancelled successfully",
            success : true
        } 
        :
        { message : "Error cancelling event booking" };

        res.send({ response });

    } catch (error) {
        console.error("Error handling request: ", error);

        res.status(500)
           .send({
                message : "Internal server error",
                error : error
           });

        throw error;
    }
}