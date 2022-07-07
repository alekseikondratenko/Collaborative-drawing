//import * as THREE from 'three'
// Import express
//import express from 'express'
var express = require('express')

const path = require('path')

// Establish the local server
var app = express()

var server = app.listen(3000)

app.use(express.static('public'))
app.use('/build/', express.static(path.join(__dirname, 'node_modules/three/build')));
app.use('/jsm/', express.static(path.join(__dirname, 'node_modules/three/examples/jsm')))


console.log("My socket server is running")

// Socket server side
var socket = require('socket.io')

var io = socket(server)

// Event. To handle a socket created on the client's side
io.sockets.on('connection', (socket)=>{
    console.log('new connection' +socket.id)

    socket.on('New Box', (newbox)=>{
        // When recieve 'New Box' message from the client, log the message and send 'Draw new box' message to the client
        console.log('New cube appeared')
        socket.broadcast.emit('Draw new box', newbox)
        

    })

    //Receiving data1
    socket.on('Get positions', (data)=>{ //If recieved a message 'Get positions' from the client, trigger the function below
        socket.broadcast.emit('Redraw figure', data) // Send the ' Redraw figure' message to all the clients except the original one
        // io.sockets.emit('mouse', data) // send the message also back to the original client
        console.log(data)
    }) 

    socket.on('Transformed cube', (dataControls)=>{ //If recieved a message 'Get positions' from the client, trigger the function below
        socket.broadcast.emit('Update cube', dataControls) // Send the ' Redraw figure' message to all the clients except the original one
        // io.sockets.emit('mouse', data) // send the message also back to the original client
        console.log(dataControls)
    }) 

}) // Activates a function when a connection is established

// Responding to the event initiated by socket.emit on the client side
