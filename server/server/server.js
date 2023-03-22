const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 4200;

const http = require('http');
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000", "http://localhost:3002"],
        methods: ["GET", "POST"]
    }
});

require('dotenv').config();



app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// const uri = process.env.MONGODB_URI;
// mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
// const connection = mongoose.connection;
// connection.once('open', () => {
//   console.log('MongoDB database connection established successfully');
// });

app.get('/', (req, res) => {
    res.send('Hello World!');
})

let AB1_riders = [];


io.on('connection', (socket) => {
    console.log('a user connected');
    console.log(socket.id);
    console.log(io.engine.clientsCount);
    console.log(socket.request.headers.origin);

    socket.on('SH-CO', (data) => {
        console.log(data);
        socket.broadcast.emit('all-loc', data)
    })

    // socket.emit("private message", {
    //     content,
    //     to: this.selectedUser.userID,
    //   });

    // socket.on('t')

    socket.on('req-ride', ({ content, to }) => {        
        socket.to(to).emit("private message", {
            content,
            from: socket.id,
          });
    })

    if (socket.request.headers.origin == "http://localhost:3001"){

        socket.on('route-added', (data) =>{
            AB1_riders.push(data)
            console.log(AB1_riders);
        })

        socket.on('disconnect', () =>{
            AB1_riders = AB1_riders.filter(r => r.id !== socket.id)
        })



        
    }


    
    
});





app.post('/', function requestHandler(req, res) {
    console.log(req.body);
    res.end('Hello, World!');
});

server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});