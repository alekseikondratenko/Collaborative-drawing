
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
io.sockets.on('connection', newConnection) // Activates a function when a connection is established

// Responding to the event initiated by socket.emit on the client side
function newConnection(socket){
    console.log('new connection' +socket.id)

    function mouseMsg(data) {
        socket.broadcast.emit('mouse', data) // Send the ' mouse' message to all the clients except the original one
        // io.sockets.emit('mouse', data) // send the message also back to the original client
        console.log(data)
    }

    // Receiving data
    socket.on('mouse', mouseMsg) //If recieved a message 'mouse' from the client, trigger mouseMsg


}