
// Import express
var express = require('express')

// Establish the local server
var app = express()

var server = app.listen(3000)

app.use(express.static('public'))


console.log("My socket server is running")

// Socket server side
var socket = require('socket.io')

var io = socket(server)

// Event. To handle a socket created on the client's side
io.sockets.on('connection', newConnection)

// Responding to the event initiated by socket.emit on the client side
function newConnection(socket){
    console.log('new connection' +socket.id)

    function mouseMsg(data) {
        socket.broadcast.emit('mouse', data) // Send the message to all the devices
        // io.sockets.emit('mouse', data) // send the message also back to the client
        console.log(data)
    }

    // Receiving data
    socket.on('mouse', mouseMsg) //If there is a message 'mouse', trigger mouseMsg

    

}