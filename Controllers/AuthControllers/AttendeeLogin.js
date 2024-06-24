const { findUserByAttribute } = require('../../SQL/AuthQueries/FindExistingUser');
const { verifyPassword } = require('../../Util/VerifyPassword');
const { generateToken } = require('../../Util/Auth');

module.exports.AttendeeLogin = async(req, res) => {
    try {
        const { email, password } = req.body;

        const user = await findUserByAttribute("email", email);

        if(user.length == 0) {
            res.status(204)
                .send({ message : "No exisiting email found"});
        } else {
            console.log(user[0].password);
            const isValidPassword = await verifyPassword(password, user[0].password);

            if(isValidPassword) {
                console.log(isValidPassword);
                const token = generateToken(user.id);

                console.log("User login successful: ", user);

                res.status(200)
                    .send({
                        message : "User login successful",
                        token : token,
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