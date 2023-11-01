class ImageP3 {
    constructor(rowNumber = 400, colNumber = 400, intensity = 15){
        this.magicNumber = 'P3';
        this.extension = 'ppm';
        this.rowNumber = rowNumber;
        this.colNumber = colNumber;
        this.intensity = intensity;
        this.matrix = [];
    }

    autofill(){
        this.matrix = [];
        const colNumberCalculated = this.colNumber * 3;
        for(let i = 0; i < this.rowNumber; i++){
            this.matrix[i] = [];
            for (let j = 0; j < colNumberCalculated; j++){
                const randomNumber = Math.floor(Math.random() * (15 - 0 + 1) + 0);
                this.matrix[i][j] = randomNumber;
            }
        }
    }

    /**
     * Altera os valores RGB para que seja a média deles
     */
    applyAverage(){
        const newMatrix = [];
        for (let i = 0; i < this.matrix.length; i++) {
            newMatrix.push([]);
            for (let j = 0; j < this.matrix[i].length; j += 3) {
                const newPixel = Math.round((this.matrix[i][j], this.matrix[i][j + 1], this.matrix[i][j + 2]) / 3);
                newMatrix[i].push(newPixel, newPixel, newPixel);
            }
        }
        this.matrix = newMatrix;
    }

    separateRedMinimum(){
        const newMatrix = [];
        for (let i = 0; i < this.matrix.length; i++) {
            newMatrix.push([]);
            for (let j = 0; j < this.matrix[i].length; j += 3) {
                newMatrix[i].push(this.matrix[i][j], 0, 0);
            }
        }
        this.matrix = newMatrix;
    }

    separateGreenMinimum(){
        const newMatrix = [];
        for (let i = 0; i < this.matrix.length; i++) {
            newMatrix.push([]);
            for (let j = 0; j < this.matrix[i].length; j += 3) {
                newMatrix[i].push(0, this.matrix[i][j + 1], 0);
            }
        }
        this.matrix = newMatrix;
    }

    separateBlueMinimum(){
        const newMatrix = [];
        for (let i = 0; i < this.matrix.length; i++) {
            newMatrix.push([]);
            for (let j = 0; j < this.matrix[i].length; j += 3) {
                newMatrix[i].push(0, 0, this.matrix[i][j + 2]);
            }
        }
        this.matrix = newMatrix;
    }

    separateRedMaximum(){
        const newMatrix = [];
        for (let i = 0; i < this.matrix.length; i++) {
            newMatrix.push([]);
            for (let j = 0; j < this.matrix[i].length; j += 3) {
                newMatrix[i].push(this.matrix[i][j], this.intensity, this.intensity);
            }
        }
        this.matrix = newMatrix;
    }

    separateGreenMaximum(){
        const newMatrix = [];
        for (let i = 0; i < this.matrix.length; i++) {
            newMatrix.push([]);
            for (let j = 0; j < this.matrix[i].length; j += 3) {
                newMatrix[i].push(this.intensity, this.matrix[i][j + 1], this.intensity);
            }
        }
        this.matrix = newMatrix;
    }

    separateBlueMaximum(){
        const newMatrix = [];
        for (let i = 0; i < this.matrix.length; i++) {
            newMatrix.push([]);
            for (let j = 0; j < this.matrix[i].length; j += 3) {
                newMatrix[i].push(this.intensity, this.intensity, this.matrix[i][j + 2]);
            }
        }
        this.matrix = newMatrix;
    }

    /**
     * Rotaciona a imagem em 180 graus
     */
    rotate180(){
        const newMatrix = [];
        for (let i = this.matrix.length - 1; i > 0; i--) {
            newMatrix.push([]);
            for (let j = 0; j < this.matrix[i].length; j++){
                newMatrix[newMatrix.length - 1][j] = this.matrix[i][j];
            }
        }
        this.matrix = newMatrix;
    }

    /**
     * Rotaciona a imagem em 90 graus
     */
    rotate90(){
        const numRows = this.matrix.length;
        const numCols = this.matrix[0].length;

        const newMatrix = new Array(numCols).fill(0).map(() => new Array(numRows).fill(0));

        for (let i = 0; i < numRows; i++) {
            newMatrix.push([]);
            for (let j = 0; j < numCols; j++) {
                newMatrix[j][numRows - 1 - i] = this.matrix[i][j];
            }
        }
        this.matrix = newMatrix;
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
        let occurrencesR = {};
        let occurrencesG = {};
        let occurrencesB = {};
        for (let i = 0; i < this.matrix.length; i++) {
            for (let j = 0; j < this.matrix[i].length; j += 3) {
                occurrencesR[this.matrix[i][j]] = (occurrencesR[this.matrix[i][j]] ?? 0) + 1
                occurrencesG[this.matrix[i][j + 1]] = (occurrencesG[this.matrix[i][j + 1]] ?? 0) + 1
                occurrencesB[this.matrix[i][j + 2]] = (occurrencesB[this.matrix[i][j + 2]] ?? 0) + 1
            }
        }

        let content = 'Valor do pixel R;Periodicidade R;\n';
        for (let value in occurrencesR){
            content += `${value};${occurrencesR[value]}\n`;
        }
        content += 'Valor do Pixel G; Periodicidade G;\n'
        for (let value in occurrencesG){
            content += `${value};${occurrencesG[value]}\n`;
        }
        content += 'Valor do Pixel B; Periodicidade B;\n'
        for (let value in occurrencesB){
            content += `${value};${occurrencesB[value]}\n`;
        }
        return content;
    }
}

module.exports = ImageP3;