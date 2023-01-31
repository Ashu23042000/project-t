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

    io.on("connection", (socket) => {
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


        // webrtc----------------

        socket.on("offer", ({ from, to, offer }) => {
            io.to(to).emit("offer", { from, to, offer });
        });


        socket.on("answer", ({ from, to, answer }) => {
            io.to(to).emit("answer", { from, to, answer });
        });


        socket.on("candidate", ({ from, to, candidate }) => {
            io.to(to).emit("candidate", { from, to, candidate });
        });

        socket.on("endCall", (to) => {
            io.to(to).emit("endCall");
        });


    });

};


module.exports = {
    registerSocketServer
};