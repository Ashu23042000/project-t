const jwt = require("jsonwebtoken");
const JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET;


class TokenService {
    generateTokens(payload) {
        const token = jwt.sign(payload, JWT_TOKEN_SECRET);
        return token;
    }

    async storeToken(token, userId) {
        await tokenModel.create({ token, userId });
    }

    async verifyToken(token) {
        const decode = jwt.verify(token, JWT_TOKEN_SECRET);
        return decode;
    }

    async updateToken(token, userId) {
        await tokenModel.updateOne({ userId }, { token });
    }
}

module.exports = new TokenService();