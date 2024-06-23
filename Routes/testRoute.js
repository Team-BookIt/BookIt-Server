const router = require('express').Router();
const sql = require('../Config/db');
const { AttendeeSignUp } = require('../Controllers/AuthControllers/UserAuth');

const returnData = async(req, res) => {
    const data = await sql`
        SELECT *
        FROM guest;
    `

    // if(error) {
    //     console.log(error);
    // } 

    console.log(data);
    res.send(data);
}

const addData = async (req, res) => {
    const { first_name, last_name, email } = req.body;
    try {
        const response = await sql `INSERT INTO guest ("first_name", "last_name", "email") values(${first_name}, ${last_name}, ${email})`;
        console.log(response);
        res.send("response");
    } catch(error) {
        console.log(error);
        res.status(500)
            .send(error);
    }
}
router.get('/data', returnData);
router.post('/insert', addData);
router.post('/signup', AttendeeSignUp);

module.exports = router;