const { findByAttribute } = require('../../SQL/AuthQueries/FindExistingEntity');
const { createOrganizer } = require('../../SQL/AuthQueries/CreateOrganizer');
const { generateToken }  = require('../../Util/Auth');

module.exports.OrganizerSignUp = async(req, res) => {
    try {
        const { email, name, password } = req.body;

        let existingOrganizer = await findByAttribute("organizer", "email", email);

        console.log(existingOrganizer);
        if(existingOrganizer.length > 0) {
            res.json({
                message : "A user with this email already exists"
            })
            return
        }
        
        existingOrganizer = await findByAttribute("organizer", "name", name);
        console.log(existingOrganizer);

        if(existingOrganizer.length > 0) {
            res.json({
                message : "An organizer with this name already exists"
            })
            return
        }

        if(existingOrganizer.length == 0) {

            let newOrganizer = {
                name : name,
                email : email,
                password : password
            };

            newOrganizer = await createOrganizer(newOrganizer);

            const token = generateToken(newOrganizer.id);

            res.json({
                message : 'Organizer registered successfully',
                token : token,
                organizer : newOrganizer,
                role : "Organizer"
            })
        }


    } catch(error) {
        console.error(error);
        res.status(500)
            .send({
                message : 'Internal Server Error'
            })
        throw error;
    }
}