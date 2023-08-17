const jwt = require("jsonwebtoken");
const JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET;

class AuthMiddleware {
    verifyToken(req, res, next) {
        // const token = req.body.token || req.query.token || req.headers["authorization"] ;
        const token = req.cookies.jwt_token;
        if (!token) {
            return res.status(403).json({ message: "A token is required for authentication" });
        }

        try {
            // token = token.replace(/^Bearer\s/, "");
            const decoded = jwt.verify(token, JWT_TOKEN_SECRET);
            req.user = decoded;
        }
        catch (err) {
            return res.status(401).json({ message: "Invalid token" });
        }

        return next();
    }


    // verifySocketToken(socket, next) {
    //     const token = socket.handshake.auth?.token;
    //     try {
    //         const decoded = jwt.verify(token, JWT_TOKEN_SECRET);
    //         socket.user = decoded;
    //     } catch (error) {
    //         const socketError = new Error("Not authorized. Invalid token");
    //         return next(socketError)
    //     }
    //     next();
    // }
}


module.exports = new AuthMiddleware();