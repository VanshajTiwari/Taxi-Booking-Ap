const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const fetch = require('node-fetch');
// import fetch from 'node-fetch';

const app = express();
const port = 4200;

const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST"],
  },
});

require("dotenv").config();

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

app.get("/", (req, res) => {
  res.send("Hello World!");
});

let AB1_riders = [];


// Path
const path_api_key = '82e5684088624adeb9f4ec857fd98c71';
    
const path = async (toLongitute, toLangitute, fromLongitute, fromLangitute) => {
  const response = await fetch(`https://api.geoapify.com/v1/routing?waypoints=${toLangitute},${toLongitute}|${fromLangitute},${fromLongitute}&mode=drive&apiKey=${path_api_key}`);
  const data = await response.json();  
  return data;
}   

// path(77.593968, 27.602082, 77.59536, 27.605919)
//   .then(data => console.log(data))
//   .catch (err => console.log(err));


  
io.on("connection", (socket) => {
  // console.log("a user connected");
  console.log(socket.id);
  console.log(io.engine.clientsCount);
  // console.log(socket.request.headers.origin);

  // socket.on("SH-CO", (data) => {
  //   console.log(data);
  //   socket.broadcast.emit("all-loc", data);
  // });

  // socket.emit("private message", {
  //     content,
  //     to: this.selectedUser.userID,
  //   });

  

  socket.on("user-dest-select", (data) => {
    // console.log(data);
    if (data.route.values == 'AB1'){
      // socket.broadcast.emit("show-drivers", data);
      path(data.startMap.coordinates[0], data.startMap.coordinates[1], data.destiMap.coordinates[0], data.destiMap.coordinates[1])
  .then(data2 => {
    // console.log(data2)
    socket.emit("draw-route", {for:data.id, data2 })
  })
  // .catch (err => console.log(err));

      socket.emit("show-drivers", {
            AB1_riders,
            to: data.id,
          });
    }
  });

  socket.on("driver-select", data => {
    console.log("driver-select");
    console.log(data.id);
    console.log(data.to);
    socket.broadcast.emit("driver-select-to", data)
  })

  // socket.on("req-ride", ({ content, to }) => {
  //   socket.to(to).emit("private message", {
  //     content,
  //     from: socket.id,
  //   });
  // });

  if (socket.request.headers.origin == "http://localhost:3001") {
    socket.on("route-added", (data) => {
      AB1_riders.push(data);
      // console.log(AB1_riders);
    });

    socket.on("disconnect", () => {
      AB1_riders = AB1_riders.filter((r) => r.id !== socket.id);
    });

    socket.on("accepted-user", data => {
      socket.emit("user-accepted", data);
    })
  }
});

app.post("/", function requestHandler(req, res) {
  console.log(req.body);
  res.end("Hello, World!");
});

server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

