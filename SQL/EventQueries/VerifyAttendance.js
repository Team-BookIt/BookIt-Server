const pool = require('../../Config/db');

module.exports.VerifyAttendance = async(userID, eventID) => {
    try{
        let query = `SELECT
                        guest_id,
                        event_id
                    FROM
                        attendance
                    WHERE
                        guest_id = $1 AND event_id = $2;`;

        const values = [userID, eventID];

        const response = await pool.query(query, values);

        console.log(response.rows);
        
        return response.rows[0];
                
    } 
    catch(error){
     console.error("Error", error);
     throw error;
    }
}