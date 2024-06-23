const bcrypt = require('bcrypt');
const { findUserByAttribute } = require('../../SQL/AuthQueries/FindExistingUser');
const { createUser } = require('../../SQL/AuthQueries/CreateUser');

module.exports.AttendeeSignUp = async(req, res) => {
    try{
        const { first_name, last_name, email, password } = req.body;

        // Search for exisiting users with the same email
        const existingUser = await findUserByAttribute("email", email);
        
        if(existingUser.length > 0) {
            res.json({
                message : "A user with this email already exists"
            })
        } else {
            
            // Hash the password before storing it in the database
            const hashedPassword = await bcrypt.hash(password, 12);

            // New user object to be stored in the database
            const newUser = {
                first_name: first_name,
                last_name: last_name,
                email: email,
                password : hashedPassword
            };

            const response = await createUser(newUser);

            res.json({
                message : 'User created successfully',
                user : response
            })

        }
    } catch(error) {
        console.log(error);
        res.json({
            message : "Internal Server error"
        })
    }
}