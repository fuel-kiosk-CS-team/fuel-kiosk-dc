'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

// Create context for managing fuel flow socket connection
export const FuelFlowContext = createContext();

// Provider component for fuel flow monitoring
export function FuelFlowProvider({ children }) {
    // State for socket connection and monitoring timeout
    const [socket, setSocket] = useState();
    const [timeoutID, setTimeoutID] = useState(null);

    // Initialize socket connection on mount
    useEffect(() => {
        // const socketInstance = io("http://localhost:3005");  for different server websocket url
        const socketInstance = io(`http://localhost:4097`);
        setSocket(socketInstance);

        // Cleanup socket on unmount
        return () => {
            socketInstance.disconnect();
        };
    }, []);

    // Provide socket and timeout state to children
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