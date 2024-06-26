const { findByAttribute } = require('../../SQL/AuthQueries/FindExistingEntity');
const { verifyPassword } = require('../../Util/VerifyPassword');
const { generateToken } = require('../../Util/Auth');

module.exports.OrganizerLogin = async(req, res) => {
    try {
        const { email, password } = req.body;

        const organizer = await findByAttribute("organizer", "email", email);

        if(organizer.length == 0) {
            console.log("No existing email found");
            res.send({ message : "No exisiting email found"})
        } else {
            const isValidPassword = await verifyPassword(password, organizer[0].password);

            if(isValidPassword) {
                console.log(isValidPassword);
                const token = generateToken(organizer.id);

                console.log("Organizer login successful: ", organizer);

                res.status(200)
                    .send({
                        message : "Organizer login successful",
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