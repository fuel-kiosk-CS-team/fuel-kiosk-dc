'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export const FuelFlowContext = createContext();

export function FuelFlowProvider({ children }) {
    const [socket, setSocket] = useState();
    const [timeoutID, setTimeoutID] = useState(null);

    useEffect(() => {
        // const socketInstance = io("http://localhost:3005");  for different server websocket url
        const socketInstance = io(`http://localhost:4097`);

        setSocket(socketInstance);

        return () => {
            socketInstance.disconnect();
        };
    }, []);

    return (
        <FuelFlowContext.Provider value={{ socket: [socket, setSocket], timeoutID: [timeoutID, setTimeoutID] }}>
          {children}
        </FuelFlowContext.Provider>
      );
}

//export { SocketContext, SocketProvider }

/*export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
      throw new Error('useSocket must be used within a SocketProvider');
    }
    return context.socket;
  };*/