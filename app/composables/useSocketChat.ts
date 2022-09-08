import { io } from 'socket.io-client';

// Return instance socket attached to chat namespace
export const useSocketChat = () => {
  return useState('socket', () => {
    return io('http://localhost:3000/chat', {
      withCredentials: true
    });
  })
}