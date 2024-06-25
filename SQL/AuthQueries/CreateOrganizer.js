const { pool } = require('../../Config/db');
const bcrypt = require('bcrypt');

const createOrganizer = async(organizer) => {
    try {
        const hashedPassword = await bcrypt.hash(organizer.password, 12);
        let query = `INSERT INTO organizer(name, email, password) VALUES ($1, $2, $3) RETURNING (name, email, password)`
        const values = [organizer.name, organizer.email, hashedPassword];
        const newOrganizer = await pool.query(query, values);

        console.log("Organizer created successfully", newOrganizer.rows[0]);

        return newOrganizer.rows[0];
    } catch(error) {
        console.error(error);
        throw error;
    }
}

module.exports = { createOrganizer };