const express = require('express');
const socketio = require('socket.io');

const app = express();

const port = process.env.PORT || 3000;

const server = app.listen(port);

const io = socketio(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

io.on('connection', socket => {
    socket.on('newComment', (data)=>{
        console.log('entró');
        socket.emit('recibido', data);
    })
})