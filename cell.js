class Cell {
  constructor(i, j, size) {
    this.i = i
    this.j = j
    this.x = i * size
    this.y = j * size
    this.size = size
    this.bee = false
    this.revealed = false
    this.neighborCount = 0
  }

  show() {
    stroke(0)
    noFill()
    rect(this.x, this.y, this.size, this.size)

    const halfSize = this.size * 0.5
    if (this.revealed) {
      let theText
      if (this.bee) {
        textAlign(CENTER)
        fill(0)
        theText = '🐝'
      } else {
        fill(200)
        rect(this.x, this.y, this.size, this.size)
        theText = this.neighborCount > 0 ? this.neighborCount : ''
      }

      textAlign(CENTER)
      fill(0)
      text(theText, this.x + halfSize, this.y + this.size - 6)
    }
  }

  contains(x, y) {
    return (
      x > this.x &&
      x < this.x + this.size &&
      y > this.y &&
      y < this.y + this.size
    )
  }

  reveal() {
    this.revealed = true
    if (this.neighborCount === 0) {
      this.floodFill()
    }
  }

  countBees() {
    if (this.bee) {
      this.neighborCount = -1
    }

    let total = 0
    for (let xoff = -1; xoff <= 1; xoff++) {
      for (let yoff = -1; yoff <= 1; yoff++) {
        const i = this.i + xoff
        const j = this.j + yoff

        if (i > -1 && i < rows && j > -1 && j < columns) {
          let neighbor = grid[i][j]
          if (neighbor.bee) {
            total++
          }
        }
      }
    }

    this.neighborCount = total
  }

  floodFill() {
    for (let xoff = -1; xoff <= 1; xoff++) {
      for (let yoff = -1; yoff <= 1; yoff++) {
        const i = this.i + xoff
        const j = this.j + yoff

        if (i > -1 && i < rows && j > -1 && j < columns) {
          let neighbor = grid[i][j]
          if (!neighbor.bee && !neighbor.revealed) {
            neighbor.reveal()
          }
        }
      }
    }
  }
}
