function make2DArray(columns, rows) {
  const array = new Array(rows)
  for (let i = 0; i < rows; i++) {
    array[i] = new Array(columns)
  }
  return array
}

var grid, rows, columns

const WIDTH = 400,
  HEIGHT = 400,
  RECT_SIZE = 20,
  TOTAL_BEES = 50

// P5.js setup function
function setup() {
  createCanvas(WIDTH, HEIGHT)

  columns = Math.floor(WIDTH / RECT_SIZE)
  rows = Math.floor(HEIGHT / RECT_SIZE)

  grid = make2DArray(columns, rows)

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      grid[i][j] = new Cell(i, j, RECT_SIZE)
    }
  }

  const options = []
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      options.push([i, j])
    }
  }

  for (let n = 0; n < TOTAL_BEES; n++) {
    const index = Math.floor(Math.random() * options.length)
    const [i, j] = options[index]
    options.splice(index, 1)
    grid[i][j].bee = true
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      grid[i][j].countBees()
    }
  }
}

function gameOver() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      grid[i][j].revealed = true
    }
  }
}

// P5.js mouse pressed event
function mousePressed() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const cell = grid[i][j]
      if (cell.contains(mouseX, mouseY)) {
        cell.reveal()
        if (cell.bee) {
          gameOver()
        }
        break
      }
    }
  }
}

// P5.js draw function
function draw() {
  background(255)
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      grid[i][j].show()
    }
  }
}
