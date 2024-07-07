const pool = require('../../Config/db');

module.exports.getExistingBooking = async(userID, eventID) => {
    try {
        const query = `SELECT 
                            * 
                       FROM 
                            booking
                       WHERE
                            event_id = $1 AND guest_id = $2`;
    
        const response = await pool.query(query, [eventID, userID]);
    
        console.log(response.rows);
        
        return response.rows;

    } catch (error) {
        console.error("Error in SQL query: ", error);
        throw error;
    }
}