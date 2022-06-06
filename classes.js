class Grass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiplay = 0;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        var found = [];
        for (let i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && y >= 0 && y < matrix.length && x < matrix[0].length + 1) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    mul() {
        let newCell = random(this.chooseCell(0))
        if (newCell && this.multiplay >= 5) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 1;
            grassArr.push(new Grass(x, y));
            this.multiplay = 0;
        }

        this.multiplay++;
    }
}


class GrassEater extends Grass {
    constructor(x, y) {
        super(x, y)
        this.energy = 8;
        this.directions = [];
    }

    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    eat() {
        let newCell = random(this.chooseCell(1));
        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
            matrix[y][x] = 2;
            for (let i = 0; i < grassArr.length; i++) {
                if (grassArr[i].x == x && grassArr[i].y == y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            this.energy++;
        }
        else {
            this.move()
        }
        if (this.energy > 12) {
            this.mul();
        }
    }

    move() {
        let newCell = random(this.chooseCell(0));
        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
            matrix[y][x] = 2;
            this.energy--;
        }

        if (this.energy == 0) {
            this.die()
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (let i = 0; i < grassEaterArr.length; i++) {
            if (grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y) {
                grassEaterArr.splice(i, 1);
                break;
            }
        }
    }

    mul() {
        let newCell = random(this.chooseCell(0));
        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 2;
            grassEaterArr.push(new GrassEater(x, y));
        }
    }
}

class Fire extends Grass {
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
        matrix[this.y][this.x] = 0;
        for (let i = 0; i < fireArr.length; i++) {
            if (fireArr[i].x == this.x && fireArr[i].y == this.y) {
                fireArr.splice(i, 1);
                break;
            }
        }
    }
}

class Water extends Grass {
    constructor(x, y) {
        super(x, y);
        this.mulInterval = 0;
        super.directions;
    }

    mul() {
        if (this.mulInterval > 5) {
            let newCell = random(this.chooseCell(0));
            if (newCell) {
                let x = newCell[0];
                let y = newCell[1];
                matrix[y][x] = 4;
                waterArr.push(new Water(x, y));
            }
            this.mulInterval = 0;
        }
        else {
            this.mulInterval++;
        }
    }
}
