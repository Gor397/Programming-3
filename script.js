var socket = io();

function setup() {
    var weath = 'winter';

    var side = 30;

    var matrix = [];

    let grassCountElement = document.getElementById('grassCount');
    let grassEaterCountElement = document.getElementById('grassEaterCount');
    let fireCountElement = document.getElementById('fireCount');
    let waterCountElement = document.getElementById('waterCount');


    socket.on("data", drawCreatures);
    socket.on("weather", function (data) {
        weath = data;
    })
    function drawCreatures(data) {
        matrix = data.matrix;
        grassCountElement.innerText = data.grassCounter;
        grassEaterCountElement.innerText = data.grassEaterCounter;
        fireCountElement.innerText = data.fireCounter;
        waterCountElement.innerHTML = data.waterCounter;
        createCanvas(matrix[0].length * side, matrix.length * side)
        background('#acacac');

        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == 1) {
                    if (weath == "spring") {
                        fill("green")
                    }
                    else if (weath == "summer") {
                        fill("black");
                    }
                    else if (weath == "winter") {
                        fill("white")
                    }
                    else if (weath == "autumn") {
                        fill("#c79e53")
                    }
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 2) {
                    fill("orange");
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 0) {
                    fill('#acacac');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 4) {
                    fill('blue');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 5) {
                    fill('red');
                    rect(j * side, i * side, side, side);
                }
            }
        }
    }
}

function kill() {
    socket.emit("kill", kill)
}