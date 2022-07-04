
// Import express
var express = require('express')

//import express from 'express' 

var app = express()

// const http = require('http');
// const server = http.createServer(app);

var server = app.listen(3000)

app.use(express.static('public'))

// app.get('/public/', function(req, res){
//     res.send("Hello from the root application URL");
// });

console.log("My socket server is running")

// Socket server side
var socket = require('socket.io')

var io = socket(server)

// Event
io.sockets.on('connection', newConnection)

function newConnection(socket){
    console.log('new connection' +socket.id)

    function mouseMsg(data) {
        socket.broadcast.emit('mouse', data)
        // io.sockets.emit('mouse', data) // send the message also back to the client
        console.log(data)
    }
    socket.on('mouse', mouseMsg) //If there is a message 'mouse', trigger mouseMsg

    

}