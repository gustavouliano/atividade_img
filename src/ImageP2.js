class ImageP2 {
    constructor(rowNumber = 400, colNumber = 400, intensity = 15){
        this.magicNumber = 'P2';
        this.extension = 'pgm';
        this.intensity = intensity;
        this.rowNumber = rowNumber;
        this.colNumber = colNumber;
        this.matrix = [];
    }

    autofill(){
        this.matrix = [];
        for(let i = 0; i < this.rowNumber; i++){
            this.matrix[i] = [];
            for (let j = 0; j < this.colNumber; j++){
                const randomNumber = Math.floor(Math.random() * (15 - 0 + 1) + 0);
                this.matrix[i][j] = randomNumber;
            }
        }
    }

    getNewContent(){
        let sContent = this.magicNumber + '\n'
        + this.colNumber + ' ' + this.rowNumber + '\n'
        + this.intensity + '\n'
        + this.matrix.reduce(function(accum, value){
            accum += '' + value.join(' ');
            return accum + '\n';
        }, '');
        return sContent;
    }

    getContentCsv(){
        let occurrences = {};
        for(let i = 0; i < this.matrix.length; i++){
            for (let j = 0; j < this.matrix[i].length; j++){
                occurrences[this.matrix[i][j]] = (occurrences[this.matrix[i][j]] ?? 0) + 1
            }
        }
        let content = 'Valor do pixel;Periodicidade\n';
        for (let value in occurrences){
            content += `${value};${occurrences[value]}\n`;
        }
        return content;
    }
}

module.exports = ImageP2;