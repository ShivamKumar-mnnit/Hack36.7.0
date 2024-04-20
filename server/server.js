import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connect from './database/conn.js';
import router from './router/route.js';
import notesRouter from './router/feedbackroutes.js'; // Import notesRouter using ES module syntax
import { createServer } from 'http'; // Import createServer from 'http' module for HTTP server
import { Server } from  "socket.io";

const app = express();
const httpServer = createServer(app); // Create HTTP server

/** middlewares */
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by'); // less hackers know about our stack

const port = 8080;

/** HTTP GET Request */
app.get('/', (req, res) => {
    res.status(201).json("Hello world");
});

/** api routes */
app.use('/api', router);
app.use('/api/notes', notesRouter); // Use imported notesRouter

/** start server only when we have valid connection */
connect().then(() => {
    try {
        httpServer.listen(port, () => { // Use httpServer to listen instead of app
            console.log(`HTTP Server connected to http://localhost:${port}`);
        })
    } catch (error) {
        console.log('Cannot connect to the HTTP server')
    }
}).catch(error => {
    console.log("Invalid database connection...!");
})

const io = new Server(httpServer, { // Pass httpServer to Socket.IO Server constructor
  cors: true,
});

const nameToSocketIdMap = new Map();
const socketidToNameMap = new Map();

io.on("connection", (socket) => {
  console.log(`Socket Connected`, socket.id);
  socket.on("room:join", (data) => {
    const { name, room } = data;
    nameToSocketIdMap.set(name, socket.id);
    socketidToNameMap.set(socket.id, name);
    io.to(room).emit("user:joined", { name, id: socket.id });
    socket.join(room);
    io.to(socket.id).emit("room:join", data);
  });

  socket.on("user:call", ({ to, offer }) => {
    io.to(to).emit("incomming:call", { from: socket.id, offer });
  });

  socket.on("call:accepted", ({ to, ans }) => {
    io.to(to).emit("call:accepted", { from: socket.id, ans });
  });

  socket.on("peer:nego:needed", ({ to, offer }) => {
    console.log("peer:nego:needed", offer);
    io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
  });

  socket.on("peer:nego:done", ({ to, ans }) => {
    console.log("peer:nego:done", ans);
    io.to(to).emit("peer:nego:final", { from: socket.id, ans });
  });
});
