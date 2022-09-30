import { io } from 'socket.io-client';

// Return instance socket attached to chat namespace
export const useSocketGame = () => {
  return useState('socketGame', () => {
    return io('http://localhost:3000/game', {
      withCredentials: true
    });
  });
}