import { io } from "socket.io-client";
const token = localStorage.getItem("token") || null;

let instance = null;

class Socket {
    constructor() {
        if (!instance) {
            this.socket = io("http://localhost:5000", { auth: { token } });
            instance = this;
            return instance;
        }
    }
};



export default Socket;