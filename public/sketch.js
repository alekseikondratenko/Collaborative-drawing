var socket

function setup() {
  createCanvas(200, 200)
}

// Socket client side (opening the connection)
socket = io.connect('http://localhost:3000')

function draw() {
  background(51)
  ellipse(mouseX, mouseY, 60, 60)
}