const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const app = express();
const http = require('http');
require('dotenv').config();
 const stripe = require('stripe')(process.env.STRIPE_SECRET);
 const server = http.createServer(app);
const {Server} = require('socket.io');
const io = new Server(server, {
  cors: 'http://localhost:3001',
  methods: ['GET', 'POST', 'PATCH', "DELETE"]
})
const User = require("./models/userSchema")
const userRoutes = require("./routes/userRoutes")

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/users',userRoutes)

try{
  mongoose.connect(process.env.mongo_url)
console.log("mongodb connected")
}catch(err){
 console.log(err)
 process.exit(1)
}

server.listen(8080, ()=> {
  console.log('server running at port', 8080)
})

app.set('socketio', io);