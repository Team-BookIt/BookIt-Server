const { pool } = require('../../Config/db');

const findByAttribute = async (tableName, attributeName, attributeValue) => {
    try {
        const query = `SELECT * FROM ${tableName} WHERE ${attributeName} = $1`;
        const values = [attributeValue]
        const result = await pool.query(query, values);
        return result.rows;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


module.exports = { findByAttribute };