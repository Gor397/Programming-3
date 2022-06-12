let matrix = [];

let side = 30;
let grassArr = [];
let grassEaterArr = [];
let fireArr = [];
let waterArr = [];

function setup() {
    function createMatrix(x, y, q1, q2, q3, q4) {
        for (let i = 0; i < y; i++) {
            let temp = [];
            for (let k = 0; k < x; k++) {
                let a = round(random([1, 0, 1, 0, 1, 0, 2, 0, 3, 0, 0, 1, 4, 0]))
                if (a == 1 && q1 == 0) {
                    a = 0;
                }
                else if (a == 2 && q2 == 0) {
                    a = 0;
                }
                else if (a == 3 && q3 == 0) {
                    a = 0;
                }
                else if (a == 4 && q4 == 0) {
                    a = 0;
                }

                if (a == 1) {
                    q1--;
                }
                else if (a == 2) {
                    q2--;
                }
                else if (a == 3) {
                    q3--;
                }
                else if (a == 4) {
                    q4--;
                }
                temp.push(a)
            }
            matrix.push(temp)
        }
    }

    createMatrix(30, 30, 140, 15, 10, 7)
    frameRate(5);
    createCanvas(matrix[0].length * side, (matrix.length - 1) * side);
    background('#acacac');

    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                grassArr.push(new Grass(x, y));
            }
            else if (matrix[y][x] == 2) {
                grassEaterArr.push(new GrassEater(x, y));
            }
            else if (matrix[y][x] == 3) {
                fireArr.push(new Fire(x, y));
            }
            else if (matrix[y][x] == 4) {
                waterArr.push(new Water(x, y));
            }
        }
    }
}


function draw() {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                textSize(side);
                text('🌵', side * x, side * y);
            }
            else if (matrix[y][x] == 0) {
                fill("#f5c242")
            }
            else if (matrix[y][x] == 2) {
                textSize(side);
                text('🐫', side * x, side * y)
            }
            else if (matrix[y][x] == 3) {
                textSize(side);
                text('🔥', side * x, side * y)
            }
            else if (matrix[y][x] == 4) {
                textSize(side);
                text('🌊', side * x, side * y)
            }
            else if (matrix[y][x] == 5) {
                textSize(side);
                text('🏜', side * x, side * y)
            }
            rect(x * side, y * side, side, side);
        }
    }

    for (let x in grassArr) {
        grassArr[x].mul();
    }

    for (let x in grassEaterArr) {
        grassEaterArr[x].eat();
    }

    for (let x in fireArr) {
        fireArr[x].mul();
    }

    for (let x in waterArr) {
        waterArr[x].mul();
    }

    let end = 0;
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 4) {
                end++;
            }
        }
    }
}

