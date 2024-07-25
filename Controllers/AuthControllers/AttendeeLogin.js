const { findByAttribute } = require('../../SQL/AuthQueries/FindExistingEntity');
const { verifyPassword } = require('../../Util/VerifyPassword');
const { generateToken } = require('../../Util/Auth');

module.exports.AttendeeLogin = async(req, res) => {
    try {
        const { email, password } = req.body;

        const user = await findByAttribute("guest", "email", email);

        if(user.length == 0) {
            res.status(204)
                .send({ 
                    message : "No exisiting email found",
                    success : false
                });
        } else {
            const isValidPassword = await verifyPassword(password, user[0].password);

            if(isValidPassword) {
                console.log(isValidPassword);
                const token = generateToken(user.id);

                console.log("User login successful: ", user);

                res.status(200)
                    .send({
                        message : "User login successful",
                        token : token,
                        user : user[0],
                        role : "Attendee",
                        success : true
                    })
            } else {
                res.status(401)
                    .send({ message : "Incorrect password"});
            }
        }
    } catch(error) {
        console.error(error);
        res.status(500)
            .send({ message : "Internal server error" });
        throw error;
    }
}