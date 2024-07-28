const { findByAttribute } = require('../../SQL/AuthQueries/FindExistingEntity');
const { verifyPassword } = require('../../Util/VerifyPassword');
const { generateToken } = require('../../Util/Auth');

module.exports.OrganizerLogin = async(req, res) => {
    try {
        const { email, password } = req.body;

        let organizer = await findByAttribute("organizer", "email", email);

        if(!organizer.length) {
            console.log("No existing email found");
            res.send({ 
                message : "No exisiting email found",
                success : false
            });
            return;
        }

        const isValidPassword = await verifyPassword(password, organizer[0].password);

        console.log(isValidPassword);
        
        if(!isValidPassword) {
            res.status(401)
                .send({ 
                    message : "Incorrect password",
                    success : false
                });
            return;
        }

        const token = generateToken(organizer.id);

        console.log(organizer[0])

        console.log("Organizer login successful: ", organizer);

        res.status(200)
            .send({
                message : "Organizer login successful",
                token : token,
                organizer : organizer[0],
                role : "Organizer",
                success : true
            })

    } catch(error) {
        console.error(error);
        res.status(500)
            .send({ 
                message : "Internal server error",
                success : false
            });
        throw error;
    }
}