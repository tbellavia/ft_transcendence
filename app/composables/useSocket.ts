import { io } from 'socket.io-client';

// Return instance socket attached to chat namespace
export const useSocket = () => {
  return useState('socket', () => {
    return io('http://localhost:3000', {
      withCredentials: true
    });
  });
}