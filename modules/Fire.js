var LiveForm = require("./LiveForm");
var random = require("./random");

module.exports = class Fire extends LiveForm {
    constructor(x, y) {
        super(x, y)
        this.energy = 10;
        super.directions;
    }

    mul() {
        let newCell1 = random(this.chooseCell(1));
        let newCell2 = random(this.chooseCell(2));
        let newCell3 = this.chooseCell(4);
        if (newCell3) {
            for (let i in newCell3) {
                let x = newCell3[i][0];
                let y = newCell3[i][1];
                if (matrix[y][x] == 4) {
                    this.die();
                }
            }
        }
        if (newCell1) {
            let x = newCell1[0];
            let y = newCell1[1];
            if (x >= 0 && y >= 0 && y < matrix.length && x < matrix[0].length) {
                if (matrix[y][x] == 1) {
                    for (let z = 0; z < grassArr.length; z++) {
                        if (grassArr[z].x == x && grassArr[z].y == y) {
                            grassArr.splice(z, 1);
                            break;
                        }
                    }
                }
                fireArr.push(new Fire(x, y))
                matrix[y][x] = 3;
            }
            this.energy++;
        }
        else if (newCell2) {
            let x = newCell2[0];
            let y = newCell2[1];
            if (x >= 0 && y >= 0 && y < matrix.length && x < matrix[0].length) {
                if (matrix[y][x] == 2) {
                    for (let z = 0; z < grassEaterArr.length; z++) {
                        if (grassEaterArr[z].x == x && grassEaterArr[z].y == y) {
                            grassEaterArr.splice(z, 1);
                            break;
                        }
                    }
                }
            }
            fireArr.push(new Fire(x, y))
            matrix[y][x] = 3;
            this.energy++;
        }
        else {
            this.energy--;
            if (this.energy == 0) {
                this.die()
            }
        }
    }

    die() {
        for (let i = 0; i < fireArr.length; i++) {
            if (fireArr[i].x == this.x && fireArr[i].y == this.y) {
                fireArr.splice(i, 1);
                matrix[this.y][this.x] = 0;
                break;
            }
        }
    }
}