const { pool } = require('../../Config/db');

const findUserByAttribute = async (attributeName, attributeValue) => {
    try {
        console.log(attributeName, attributeValue);
        const query = `SELECT * FROM guest WHERE ${attributeName} = $1`;
        const result = await pool.query(query, [attributeValue]);
        return result.rows.length === 0 ? [] : result.rows;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


module.exports = { findUserByAttribute };