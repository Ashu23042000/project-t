import React, { createContext, useMemo } from "react";
import { io } from "socket.io-client";


const SocketContext = createContext();

const ContextProvider = ({ children }) => {

    const socket = useMemo(() => {
        return io("http://localhost:5000");
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

export { ContextProvider, SocketContext };