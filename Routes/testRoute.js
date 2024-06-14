const router = require('express').Router();
const sql = require('../Config/db');

const returnData = async(req, res) => {
    const data = await sql`
        SELECT *
        FROM guest;
    `
    console.log(data);
    res.send(data);
}

router.get('/data', returnData);

module.exports = router;