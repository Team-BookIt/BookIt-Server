const jwt = require('jsonwebtoken');

module.exports.generateToken = (userId) => {
    const jwtSecretKey = process.env.JWT_SECRET;
    const encryptionData = {
        time : Date(),
        userId : userId
    }

    const token = jwt.sign(encryptionData, jwtSecretKey);

    return token;
}

module.exports.authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if(!token) return res.status(401).json({ message: "Access denied"});

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) return res.status(403).json({ message: "Invalid token"});
        req.user = user;
        next();
    });
}