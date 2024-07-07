const pool = require('../../Config/db');
const { findByAttribute } = require('../../SQL/AuthQueries/FindExistingEntity');

module.exports.addEventCategories = async(eventID, eventCategories) => {

    try {
        const existingEvent = await findByAttribute('event', 'id', eventID);
    
        if(!existingEvent.length) {
            console.log("No existing event found");
            return;
        }
        
        const placeholder = eventCategories.map((_, index) => `($1, $${index + 2})`).join(', ');

        const values = [eventID, ...eventCategories];

        const query = `INSERT INTO categories (event_id, tags)
                       VALUES ${placeholder}
                       RETURNING *`;

        const response =  await pool.query(query, values);

        return response.rows;

    } catch(error) {
        console.error("Error inserting Event Categories: ", error)
        throw error;
    }

}