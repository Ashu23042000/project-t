import React, { createContext } from "react";
import { io } from "socket.io-client";


const SocketContext = createContext();

const token = localStorage.getItem("token") || null;

console.log(token);

const ContextProvider = ({ children }) => {
    // const socket = io("http://localhost:5000", { auth: { token } });
    const socket = io("http://localhost:5000");

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

export { ContextProvider, SocketContext };