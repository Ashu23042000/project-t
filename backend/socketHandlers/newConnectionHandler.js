const serverStore = require("../serverStore");

const newConnectionHandler = (socket) => {
    serverStore.addNewConnectedUser({
        socketId: socket.id,
        user: {
            id: socket.user.id,
            name: socket.user.name,
            level: socket.user.level,
            profession: socket.user.profession,
            reportCount: socket.user.reportCount
        }
    });
};


module.exports = newConnectionHandler;