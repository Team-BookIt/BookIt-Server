const bcrypt = require('bcrypt');

const verifyPassword = async(password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
}