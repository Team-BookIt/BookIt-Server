const { findByAttribute } = require("../../../SQL/AuthQueries/FindExistingEntity");
const { getUserProfile } = require("../../../SQL/UserSideQueries/GetUserProfile");

module.exports.GetUserProfile = async(req, res) => {
    try {
        
        const userId = parseInt(req.params.userId);
        console.log(userId);
        const existingUser = await findByAttribute('guest', 'id', userId);

        if(!existingUser.length) {
            console.log("User not found");
            console.log(existingUser);
            res.send({ message: "No user found"});
            return;
        }

        const userProfile = await getUserProfile(userId);

        console.log("User profile obtained: ", userProfile);

        res.status(200)
           .send({
                message : "User Profile obtained successfully",
                userProfile : userProfile
           });

    } catch (error) {
        console.error("Error handling request: ", error);
        res.status(500)
           .send({ message : "Internal server error" });
        throw error;
    }
}