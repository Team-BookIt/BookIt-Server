const { pool } = require('../../Config/db');

module.exports.getEventById = async(eventID) => {
    try {
        let query = `SELECT 
                        event.title, event.image, 
                        event.bio, event.venue, event.price, 
                        event.event_timestamp, event.event_limit, 
                        organizer.name AS organizer_name, 
                        organizer.logo AS organizer_logo
                    FROM 
                        event 
                    FULL JOIN 
                        organizer 
                    ON 
                        event.org_id = organizer.id 
                    WHERE 
                        event.id = $1;`;
    
        const eventData = await pool.query(query, [eventID]);
    
        console.log(eventData.rows[0]);
    
        query = `SELECT 
                    tags 
                FROM 
                    categories 
                WHERE 
                    categories.event_id = $1`;
    
        const eventCategoryInfo = await pool.query(query, [eventID]);
    
        console.log(eventCategoryInfo.rows);
    
        let eventCategories = [];
        
        eventCategoryInfo.rows.map(category => {
            eventCategories.push(category.tags);
        });
    
        const event = {
            eventData : eventData.rows[0],
            eventCategories : eventCategories
        };
    
        return event;
        
    } catch (error) {
        console.error("Error: ", error);
        throw error;
    }
}