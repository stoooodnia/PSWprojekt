import express from 'express';
import http from 'http';
import { Server } from 'socket.io';


const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile('/Users/karolstudniarek/Desktop/REPOZYTORIA/psw-repo/PSWprojekt/backend/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
//
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
//
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg)});
//
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

});

server.listen(3000, () => {
  console.log('listetning on *:3000');
});