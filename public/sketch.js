var socket

function setup() {
  createCanvas(600, 400)
  background(51)

  socket = io.connect('http://localhost:3000')
  socket.on('mouse', newDrawing)
}

// Socket client side (opening the connection)

function newDrawing(data) {
  noStroke()
  fill(255, 0, 100)
  ellipse(data.x, data.y, 36, 36)
}

function mouseDragged() {
  console.log(mouseX + ',' + mouseY)

  var data = { // Data for the message
    x: mouseX,
    y: mouseY
  }
  socket.emit('mouse', data) // Message itself

  noStroke()
  fill(255)
  ellipse(mouseX, mouseY, 36, 36)

}

//let a = mouseX
//let b = mouseY
// Creating a message


// function draw() {
  
// }