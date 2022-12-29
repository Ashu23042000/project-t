const authMiddleware = require("./middlewares/auth-middleware");
const newConnectionHandler = require("./socketHandlers/newConnectionHandler");
const disconnectHandler = require("./socketHandlers/disconnectHandler");
const serverStore = require("./serverStore");



const registerSocketServer = (server) => {
    const io = require("socket.io")(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    // io.use((socket, next) => {
    //     authMiddleware.verifySocketToken(socket, next);
    // });

    io.on("connection", (socket) => {
        console.log(`${socket.id} connected......`);


        socket.on("new_user", (data) => {
            serverStore.addNewConnectedUser(socket.id, data);
            io.emit("connected_users", serverStore.getConnectedUsers());
        });

        socket.on("call_request", ({ from, to, name }) => {
            io.to(to).emit("call_request", { from, to, name });
        });


        socket.on("call_reply", ({ from, to, ans }) => {
            io.to(to).emit("call_reply", { from, to, ans });
        })

        socket.on("disconnect", () => {
            serverStore.removeConnectedUser(socket.id);
            io.emit("connected_users", serverStore.getConnectedUsers());
        });
    });

};


module.exports = {
    registerSocketServer
};