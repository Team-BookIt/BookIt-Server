const pool = require('../../Config/db');

module.exports.getAllEvents = async() => {
    try {
        const query = `SELECT 
                        event.id AS event_id, 
                        event.title, 
                        event.image,
                        event.event_timestamp, 
                        event.price,
                        event.bio, 
                        event.venue, 
                        event.event_limit,
                        organizer.id AS org_id,
                        organizer.name AS organizer_name,
                        organizer.logo AS organizer_logo,
                        ARRAY_AGG(categories.tags) AS event_tags
                    FROM 
                        event
                    LEFT JOIN 
                        organizer
                    ON 
                        event.org_id = organizer.id
                    LEFT JOIN
                        categories
                    ON 
                        categories.event_id = event.id
                    GROUP BY 
                        event.id, event.title, event.image,
                        event.event_timestamp, event.price,
                        event.bio, event.venue, event.event_limit,
                        organizer.id,
                        organizer.name,
                        organizer.logo;`;
    
        const allEventsData = await pool.query(query);
    
        console.log("Events data: ", allEventsData.rows);

        return allEventsData.rows;

    } catch (error) {
        console.error("Error: ", error);
        throw error;
    }
}