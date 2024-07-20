const { findByAttribute } = require('../../SQL/AuthQueries/FindExistingEntity');
const { createUser } = require('../../SQL/AuthQueries/CreateUser');
const { generateToken }  = require('../../Util/Auth');

module.exports.AttendeeSignUp = async(req, res) => {
    try{
        const { first_name, last_name, email, password } = req.body;

        // Search for exisiting users with the same email
        const existingUser = await findByAttribute("guest", "email", email);
        
        if(existingUser.length > 0) {
            res.json({
                message : "A user with this email already exists"
            })
        } else {

            // New user object to be stored in the database
            const newUser = {
                first_name: first_name,
                last_name: last_name,
                email: email,
                password : password
            };

            const user = await createUser(newUser);
        
            const token = generateToken(user.id);

            res.json({
                message : 'User created successfully',
                token : token,
                user : user,
                role : "Attendee"
            })

        }
    } catch(error) {
        console.log(error);
        res.send({
            message : "Internal Server error"
        })
    }
}