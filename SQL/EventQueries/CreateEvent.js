const { pool } = require('../../Config/db');

module.exports.createEvent = async(eventDetails, organizerID) => {
    try {
        const coreDetails = Object.keys(eventDetails.coreEventDetails).map((key) => {
            return `${key}`
        }).join(',');
        
        const extraDetails = Object.keys(eventDetails.additionalEventDetails).map((key) => {
            return `${key}`
        }).join(',');
        
        const coreDetailPlaceholders = Object.keys(eventDetails.coreEventDetails).map((key, index) => {
            return `${index + 2}`;
        });
        
        const extraDetailPlaceholders = Object.keys(eventDetails.additionalEventDetails).map((key, index) => {
            return `${index + Object.keys(eventDetails.coreEventDetails).length + 2}`;
        });

        const placeholders = [...coreDetailPlaceholders, ...extraDetailPlaceholders].join(',$');
        
        const values = [organizerID, ...Object.values(eventDetails.coreEventDetails), ...Object.values(eventDetails.additionalEventDetails)];

        const query = `INSERT INTO event (org_id, ${coreDetails}, ${extraDetails})
                       VALUES ($1, $${placeholders})
                       RETURNING *`;

        const response = await pool.query(query, values);

        console.log(response.rows[0]);

        return response.rows[0];
    } catch (error) {
        console.error(error);
        throw error;
    }
}