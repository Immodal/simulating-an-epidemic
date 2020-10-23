let qtree;
let justInserted = false

function setup() {
  createCanvas(500, 500)

  qtree = new Quadtree(0, 0, width, height, 10)
}

function draw() {
  background(0) 

  if(mouseIsPressed) {
    if (!justInserted) {
      qtree.insert(createVector(mouseX, mouseY))
      justInserted = true
    }
    
  } else justInserted = false

  qtree.draw()
}