const pool = require("../../Config/db");

module.exports.cancelBooking = async(guestId, eventId) => {
    try {

        let query = `DELETE FROM 
                        booking
                    WHERE 
                        guest_id = $1 AND event_id = $2
                    RETURNING
                        $3 AS confirmation;`;
        
        const successMessage = 'Booking deleted successfully';

        const confirmationMessage = await pool.query(query, [guestId, eventId, successMessage]);

        console.log("Confirmation Message: ", confirmationMessage.rows[0].confirmation);

        if(confirmationMessage.rows[0].confirmation == successMessage) { return true; }; 

        return false;

    } catch (error) {
        console.error("Error running SQL query: ", error);
        throw error;
    }
} 