const userModel = require("../models/user-model");
const bcrypt = require("bcryptjs");

class Userservice {
    async findUser(filter) {
        const user = await userModel.findOne(filter);
        return user;
    }

    async createUser(data) {
        return await userModel.create(data);
    }

    async hashPassword(password) {
        const hashPass = await bcrypt.hash(password, 8);
        return hashPass;
    }

    async comparePassword(password, hashPassword) {
        const result = await bcrypt.compare(password, hashPassword);
        return result;
    }
}

module.exports = new Userservice();