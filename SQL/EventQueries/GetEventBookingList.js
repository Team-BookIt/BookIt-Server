const pool = require("../../Config/db");

module.exports.getEventBookingList = async(eventId) => {
    try {
        const query = `SELECT 
                        guest.first_name, 
                        guest.last_name, 
                        guest.email, 
                        event.id
                    FROM 
                        guest
                    JOIN
                        booking
                    ON 
                        booking.guest_id = guest.id
                    JOIN 
                        event
                    ON 
                        booking.event_id = event.id 
                    WHERE
                        event.id = $1
                    GROUP BY 
                        guest.first_name, 
                        guest.last_name, 
                        guest.email, 
                        event.id;`;

        const bookingList = await pool.query(query, [eventId]);

        console.log("Booking List : ", bookingList.rows);

        return bookingList.rows;

    } catch (error) {
        console.error("Error running sql query: ", error);
        throw error;
    }
}