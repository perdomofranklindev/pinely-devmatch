// ALIVE = 1 = WHITE
// DEAD = 0 = BLACK

export class Matrix extends Array {

    constructor(rows: number, cols: number, fillValue = 0) {
        super();

        for (let i = 0; i < rows; i++) {
            this.push(new Array(cols).fill(fillValue));
        }
    }

    has(x: number, y: number) {
        return this[x] !== undefined && this[x][y] !== undefined;
    }

    get(x: number, y: number) {
        if (this.has(x, y)) {
            return this[x][y];
        }

        return 0;
    }

    set(x: number, y: number, value: number) {
        if (this.has(x, y)) {
            this[x][y] = value;
        }
    }

    getNeighbors(x: number, y: number) {
        let count = 0;

        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) continue;

                count += this.get(x + i, y + j);
            }
        }

        return count;
    }
}

export class GameOfLife {
    state: Matrix;
    nextState: Matrix;

    constructor() {
        this.state = new Matrix(3, 3);

        this.state.set(0, 1, 1);
        this.state.set(1, 1, 1);
        this.state.set(2, 1, 1);

        this.nextState = new Matrix(3, 3);
    }


    evolve() {
        this.nextState = new Matrix(this.state.length, this.state[0].length);

        for (let i = 0; i < this.state.length; i++) {
            for (let j = 0; j < this.state[i].length; j++) {
                const neighbors = this.state.getNeighbors(i, j);
                const cell = this.state.get(i, j);

                if (cell === 1 && neighbors < 2) {
                    this.nextState.set(i, j, 0);
                    continue;
                }

                if (cell === 1 && (neighbors === 2 || neighbors === 3)) {
                    this.nextState.set(i, j, 1);
                    continue;
                }

                if (cell === 1 && neighbors > 3) {
                    this.nextState.set(i, j, 0);
                    continue;
                }

                if (cell === 0 && neighbors === 3) {
                    this.nextState.set(i, j, 1);
                    continue;
                }
            }
        }

        this.state = this.nextState;
    }

    toString() {
        return this.state.map(row => row.join('')).join('');
    }
}