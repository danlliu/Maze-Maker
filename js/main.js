const TILE_SIZE = 12;
let canvas = document.getElementById("maze");
let ctx = canvas.getContext("2d");
let width_input = document.getElementById("width");
let height_input = document.getElementById("height");
let seed_input = document.getElementById("seed");
let maze_info = document.getElementById("maze_info");

function makeMaze() {
    let width = width_input.value, height = height_input.value;
    ctx.canvas.width = (2 * width + 1) * TILE_SIZE;
    ctx.canvas.height = (2 * height + 1) * TILE_SIZE;
    for (let x = 0; x < 2 * width + 1; ++x) {
        for (let y = 0; y < 2 * height + 1; ++y) {
            if (x % 2 === 1 && y % 2 === 1) continue;
            if (x == 1 && y == 0) ctx.fillStyle = "#00FF00";
            if (x == 2 * width - 1 && y == 2 * height) ctx.fillStyle = "#FF0000";
            ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            ctx.fillStyle = "#000000";
        }
    }
    let visited = Array(width);
    for (let x = 0; x < width; ++x) {
        visited[x] = Array(height);
        for (let y = 0; y < height; ++y) visited[x][y] = false;
    }
    let num_visited = 1;
    let currentX = Math.floor(Math.random() * width);
    let currentY = Math.floor(Math.random() * height);
    console.log(currentX);
    console.log(currentY);
    visited[currentX][currentY] = true;
    while (num_visited !== width * height) {
        
        console.log(num_visited);
        // Randomly choose an adjacent cell
        let oldX = currentX, oldY = currentY;
        let valid = false;
        do {
            let direction = Math.floor(Math.random() * 4);
            switch (direction) {
                case 0:
                    // North
                    if (currentX != 0) {
                        valid = true;
                        --currentX;
                    }
                    break;
                case 1:
                    // East
                    if (currentY != height - 1) {
                        valid = true;
                        ++currentY;
                    }
                    break;
                case 2:
                    // South
                    if (currentX != width - 1) {
                        valid = true;
                        ++currentX;
                    }
                    break;
                case 3:
                    // West
                    if (currentY != 0) {
                        valid = true;
                        --currentY;
                    }
                    break;
                default:
                    valid = false;
                    break;
            }
        } while (!valid);
        if (!visited[currentX][currentY]) {
            visited[currentX][currentY] = true;
            ++num_visited;
            ctx.clearRect(((2 * oldX + 1) + (2 * currentX + 1)) / 2 * TILE_SIZE, ((2 * oldY + 1) + (2 * currentY + 1)) / 2 * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        }
    }
}