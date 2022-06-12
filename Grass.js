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
