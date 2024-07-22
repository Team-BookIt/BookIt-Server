const pool = require('../../Config/db');

module.exports.getOrganizerProfile = async(organizerId) => {
    try {
        let query = `SELECT
                        organizer.id AS org_id, 
                        organizer.name, 
                        organizer.bio,
                        organizer.contact, 
                        organizer.email, 
                        organizer.location, 
                        organizer.logo, 
                        organizer.website
                    FROM 
                        organizer
                    WHERE 
                        organizer.id = $1;`;
        
        const organizerDetails = await pool.query(query, [organizerId]);

        console.log("Organizer Details: ", organizerDetails.rows);

        query = `SELECT
                    event.id AS event_id,
                    event.title,
                    event.bio,
                    event.venue,
                    event.price,
                    event.image,
                    event.event_timestamp,
                    event.event_limit,
                    organizer.name,
                    organizer.logo
                FROM 
                    event
                    
                JOIN 
                    organizer
                ON 
                    event.org_id = organizer.id
                WHERE 
                    organizer.id = $1
                GROUP BY 
                    event.id,
                    event.title,
                    event.bio,
                    event.venue,
                    event.price,
                    event.image,
                    event.event_timestamp,
                    event.event_limit,
                    organizer.name,
                    organizer.logo;`;
        
        console.log(query);
        const organizerEventDetails = await pool.query(query, [organizerId]);

        console.log("Organizer event details: ", organizerEventDetails.rows);

        query = `SELECT 
                    COUNT(event.id) AS events_organized
                FROM 
                    event 
                JOIN 
                    organizer
                ON  
                    event.org_id = organizer.id
                WHERE 
                    organizer.id = $1
                GROUP BY 
                    organizer.id;`

        const numberOfEventsOrganized = await pool.query(query, [organizerId]);

        console.log("Number of events organized: ", numberOfEventsOrganized.rows);

        query = `SELECT 
                AVG(
                        review.rating
                    ) AS average_rating,
                    organizer.name
                FROM 
                    review
                JOIN
                    event
                ON 
                    event.id = review.event_id
                JOIN  
                    organizer
                ON 
                    organizer.id = event.org_id
                WHERE 
                    organizer.id = $1
                GROUP BY 
                    organizer.name;`;

        const averageRating = await pool.query(query, [organizerId]);

        console.log("Average rating: ", averageRating.rows);

        const organizerProfile =  {
            organizerDetails: organizerDetails.rows[0],
            organizerEventDetails: organizerEventDetails.rows,
            numberOfEvents : numberOfEventsOrganized.rows.length ? (numberOfEventsOrganized.rows[0].events_organized) : 0,
            averageRating : averageRating.rows.length ? (averageRating.rows[0].average_rating) : 0
        };

        return organizerProfile;
        
    } catch (error) {
        console.error("Error running query: ", error);
        throw error;
    }
}