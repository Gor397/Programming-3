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