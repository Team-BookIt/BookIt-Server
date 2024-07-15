const pool = require('../../Config/db');
//const {verifyAttendance} = require('../EventQueries/VerifyAttendance')

module.exports.addEventReview = async(guestID, eventID, rating, content) => {
    try{        
        let query = `INSERT INTO review (guest_id, event_id, rating, content)
                    VALUES($1, $2, $3, $4)
                    RETURNING *;
                    `;
            
        const values = [guestID, eventID, rating, content];

        const response = await pool.query(query, values);

        console.log("Response: ", response.rows);

        return response.rows[0];
    }
    catch(error){
        console.error(error)
        throw error;
    }
}