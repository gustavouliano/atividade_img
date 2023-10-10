class ImageP1 {
    constructor(rowNumber = 400, colNumber = 400){
        this.magicNumber = 'P1';
        this.extension = 'pbm';
        this.rowNumber = rowNumber;
        this.colNumber = colNumber;
        this.matrix = [];
    }

    autofill(){
        this.matrix = [];
        for(let i = 0; i < this.rowNumber; i++){
            this.matrix[i] = [];
            for (let j = 0; j < this.colNumber; j++){
                const randomNumber = Math.round(Math.random());
                this.matrix[i][j] = randomNumber;
            }
        }
    }

    getNewContent(){
        let content = this.magicNumber + '\n'
        + this.colNumber + ' ' + this.rowNumber + '\n'
        + this.matrix.reduce(function(accum, value){
            accum += '' + value.join(' ');
            return accum + '\n';
        }, '');
        return content;
    }
}

module.exports = ImageP1;