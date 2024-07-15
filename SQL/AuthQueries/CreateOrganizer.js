const pool = require('../../Config/db');
const bcrypt = require('bcrypt');

const createOrganizer = async(organizer) => {
    try {
        const hashedPassword = await bcrypt.hash(organizer.password, 12);
        let query = `INSERT INTO organizer(name, email, password) VALUES ($1, $2, $3)`;
        const values = [organizer.name, organizer.email, hashedPassword];
        const newOrganizer = await pool.query(query, values);

        console.log("Organizer created successfully", newOrganizer.rows[0]);

        query = `SELECT * FROM organizer WHERE email = $1`
        organizerDetails = await pool.query(query, [organizer.email]);

        return organizerDetails.rows;
    } catch(error) {
        console.error(error);
        throw error;
    }
}

module.exports = { createOrganizer };