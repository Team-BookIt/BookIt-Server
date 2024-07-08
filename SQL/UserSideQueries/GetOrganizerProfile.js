const pool = require('../../Config/db');

module.exports.getOrganizerProfile = async(organizerId) => {
    try {
        let query = `SELECT 
                        organizer.name, 
                        organizer.bio,
                        organizer.contact, 
                        organizer.email, 
                        organizer.location, 
                        organizer.logo, 
                        organizer.website
                        FROM 
                        organizer
                        WHERE organizer.id = $1;`;
        
        const organizerDetails = await pool.query(query, [organizerId]);

        console.log("Organizer Details: ", organizerDetails.rows);

        query = `SELECT
                    event.title,
                    event.bio,
                    event.venue,
                    event.price,
                    event.image,
                    event.event_timestamp,
                    event.event_limit,
                    organizer.name,
                    organizer.logo
                    FROM event
                    JOIN organizer
                    ON event.org_id = organizer.id
                    WHERE organizer.id = $1
                    GROUP BY 
                    event.title,
                    event.bio,
                    event.venue,
                    event.price,
                    event.image,
                    event.event_timestamp,
                    event.event_limit,
                    organizer.name,
                    organizer.logo;`;
        
        const organizerEventDetails = await pool.query(query, [organizerId]);

        console.log("Organizer event details: ", organizerEventDetails.rows);

        const organizerProfile =  {
            organizerDetails: organizerDetails.rows,
            organizerEventDetails: organizerEventDetails.rows
        };

        return organizerProfile;
        
    } catch (error) {
        console.error("Error running query: ", error);
        throw error;
    }
}