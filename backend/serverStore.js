class ServerStore {
    connectedUsers = new Map();

    addNewConnectedUser = (socketId, user) => {
        this.connectedUsers.set(socketId, user);
    };

    removeConnectedUser = (socketId) => {
        if (this.connectedUsers.has(socketId)) {
            this.connectedUsers.delete(socketId);
        }
    };

    getConnectedUsers() {
        return Array.from(this.connectedUsers);
    };
}








module.exports = new ServerStore();