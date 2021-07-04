import io from 'socket.io-client';

const socket = io(process.env.REACT_APP_SOCKET_API_URL, {
    reconnectionAttempts: 5
});

export default socket;