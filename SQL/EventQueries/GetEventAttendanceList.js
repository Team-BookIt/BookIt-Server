const pool = require("../../Config/db");

module.exports.getEventAttendanceList = async(eventId) => {
    try {
        const query = `SELECT 
                        guest.first_name, guest.last_name, guest.email, attendance.created_at AS timestamp
                    FROM 
                        guest
                    JOIN
                        attendance
                    ON 
                        attendance.guest_id = guest.id
                    JOIN 
                        event
                    ON 
                        attendance.event_id = event.id 
                    WHERE
                        event.id = $1
                    GROUP BY 
                        guest.first_name, guest.last_name, guest.email, timestamp;`;

        const attendanceList = await pool.query(query, [eventId]);

        console.log("Attendance List : ", attendanceList.rows);

        return attendanceList.rows;

    } catch (error) {
        console.error("Error running sql query: ", error);
        throw error;
    }
}