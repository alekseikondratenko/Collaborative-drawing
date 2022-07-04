var socket

function setup() {
  createCanvas(600, 400)
  background(51)
}

// Socket client side (opening the connection)
socket = socket.io.connect('http://localhost:3000')

function draw() {
  noStroke()
  fill(255)
  ellipse(mouseX, mouseY, 36, 36)
}