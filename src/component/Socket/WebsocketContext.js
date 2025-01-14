import { createContext } from 'react';
import { io, Socket } from 'socket.io-client';

export const socket = io('http://localhost:8081');
export const WebsocketContext = createContext(socket);
export const WebsocketProvider = WebsocketContext.Provider;
