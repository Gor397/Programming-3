weath = "winter"

var Grass = require("./modules/Grass.js");
var GrassEater = require("./modules/GrassEater.js");
var Fire = require("./modules/Fire.js");
var Water = require("./modules/Water.js");
let random = require('./modules/random');

let fs = require('fs');

grassArr = [];
grassEaterArr = [];
fireArr = [];
waterArr = []
matrix = [];



function matrixGenerator(matrixSize, grass, grassEater, water, fire) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < grassEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }
    for (let i = 0; i < water; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
    for (let i = 0; i < fire; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 5;
    }
}
matrixGenerator(20, 35, 25, 5, 20);

function weather() {
    if (weath == "winter") {
        weath = "spring"
    }
    else if (weath == "spring") {
        weath = "summer"
    }
    else if (weath == "summer") {
        weath = "autumn"
    }
    else if (weath == "autumn") {
        weath = "winter"
    }
    io.sockets.emit('weather', weath)
}
setInterval(weather, 5000);


var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(8080);


function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);
            } else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
            } else if (matrix[y][x] == 5) {
                var fire = new Fire(x, y);
                fireArr.push(fire);
            } else if (matrix[y][x] == 4) {
                var water = new Water(x, y);
                waterArr.push(water);
            }
        }
    }
}

function game() {
    if (grassArr[0] !== undefined) {
        if (weath != 'autumn') {
            for (var i in grassArr) {
                grassArr[i].mul();
            }
        }

    }

    if (fireArr[0] !== undefined) {
        for (var i in fireArr) {
            fireArr[i].mul();
        }

    }

    if (waterArr[0] !== undefined) {
        for (var i in waterArr) {
            waterArr[i].mul();
        }

    }

    if (grassEaterArr[0] !== undefined) {
        for (var i in grassEaterArr) {
            grassEaterArr[i].eat();
        }
    }

    let sendData = {
        matrix: matrix,
        grassCounter: grassArr.length,
        grassEaterCounter: grassEaterArr.length,
        fireCounter: fireArr.length,
        waterCounter: waterArr.length
    }

    io.sockets.emit("data", sendData);
}

setInterval(game, 1000)

function kill() {
    grassArr = [];
    grassEaterArr = [];
    fireArr = [];
    waterArr = [];
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0;
        }
    }
}
io.on('connection', function (socket) {
    creatingObjects();
    socket.on("kill", kill);
});

var statistics = {};

setInterval(function () {
    statistics.grass = grassArr.length;
    statistics.grassEater = grassEaterArr.length;
    fs.writeFile("statistics.json", JSON.stringify(statistics), function () {
    })
}, 1000)
