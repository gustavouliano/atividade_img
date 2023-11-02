const gm = require('gm');
const FileManagement = require('./FileManagement');
const ImageP2 = require('./ImageP2');
const ImageP3 = require('./ImageP3');

class RestructureImage {
    
    readP2(fileName){
        const oFile = new FileManagement();
        const fileText = oFile.read(fileName, 'pgm');
        let magicNumber = '';
        let row = 0;
        let column = 0;
        let intensity = 0;
        let matrix = [];
        let count = 0;
        fileText.split(/\r?\n/).forEach((lineContent, index) => {
            if (!lineContent) {
                return;
            }
            switch(index){
                case 0:
                    magicNumber = lineContent;
                    break;
                case 1:
                    column = lineContent.split(' ')[0];
                    row = lineContent.split(' ')[1];
                    break;
                case 2:
                    intensity = lineContent;
                    break;
                default:
                    count++;
                    let arrayContent = lineContent.split(' ');
                    // Caso esteja estruturada em matriz
                    if (arrayContent.length > 1){
                        matrix.push(arrayContent);
                    }
                    else{
                        if (index == 3){
                            matrix.push([]);
                        }
                        if (count >= column) {
                            matrix[matrix.length - 1].push(Number(lineContent));
                            if (matrix.length == row){
                                return;
                            }
                            matrix[matrix.length] = []
                            count = 0;
                        }
                        else{
                            matrix[matrix.length - 1].push(Number(lineContent));
                        }
                    }
                    break;
            }
        });
        const oImageP2 = new ImageP2();
        oImageP2.colNumber = column;
        oImageP2.rowNumber = row;
        oImageP2.matrix = matrix;
        oImageP2.intensity = intensity;
        return oImageP2;
    }

    readP3(fileName){
        const oFile = new FileManagement();
        const fileText = oFile.read(fileName, 'ppm');
        let [magicNumber, row, column, intensity] = ['', 0, 0, 0];
        const pixelList = [];
        let count = -1;
        fileText.split(/\r?\n/).forEach((lineContent) => {
            // Caso a linha seja vazia ou comentário é ignorada
            if (!lineContent || lineContent.startsWith('#')){
                return;
            }
            count++;
            switch(count){
                case 0:
                    magicNumber = lineContent.trim();
                    break;
                case 1:
                    const [cols, rows] = lineContent.split(' ');
                    column = parseInt(cols);
                    row = parseInt(rows);
                    break;
                case 2:
                    intensity = lineContent;
                    break;
                default:
                    const pixels = lineContent.split(' ').map(content => parseInt(content)).filter(content => !isNaN(content));
                    pixelList.push(...pixels);
                    break;
            }
        });
        const matrix = [];
        for (let i = 0; i < row; i++) {
            matrix.push(pixelList.slice(i * column * 3, (i + 1) * column * 3));
        }
        const oImageP3 = new ImageP3(row, column, intensity);
        oImageP3.matrix = matrix;
        return oImageP3;
    }

    /**
     * @param {ImageP2} oImageP2 
     * @param {Number} vezesMenor 
     */
    reduceP2(oImageP2, vezesMenor){
        const newColumn = oImageP2.colNumber / vezesMenor; 
        const newRow = oImageP2.rowNumber / vezesMenor;

        const newMatrix = [];

        for(let i = 0; i < newRow; i++) {
            newMatrix.push([]);
            for(let j = 0; j < newColumn; j++) {
                newMatrix[i].push(oImageP2.matrix[i * vezesMenor][j * vezesMenor]);
            }
        }
        const newImage = new ImageP2(newRow, newColumn, oImageP2.intensity);
        newImage.matrix = newMatrix;
        return newImage;
    }

    /**
     * @param {ImageP2} oImageP2
     * @param {Number} rowNumber
     * @param {Number} colNumber
     */
    resizeP2(oImageP2, colNumber, rowNumber){
        const stepRow = oImageP2.rowNumber / rowNumber;
        const stepCol = oImageP2.colNumber / colNumber;
        const newMatrix = [];

        for(var i = 0; i < oImageP2.rowNumber; i += stepRow) {
            newMatrix.push([]);
            for(var j = 0; j < oImageP2.colNumber; j += stepCol) {
                if (newMatrix[newMatrix.length - 1].length >= colNumber){
                    break;
                }
                try{
                    newMatrix[newMatrix.length - 1].push(oImageP2.matrix[Math.floor(i)][Math.floor(j)]);
                }catch(err){
                    console.log(err);
                    return;
                }
            }
        }
        const newImage = new ImageP2(rowNumber, colNumber, oImageP2.intensity);
        newImage.matrix = newMatrix;
        return newImage;
    }

    /**
     * Converte imagem de uma intensidade para nova intensidade
     * @param {ImageP2} oImageP2 
     * @param {Number} maxScale 
     * @param {Number} newMaxScale 
     */
    bitsConverterP2(oImageP2, maxScale, newMaxScale){
        const newMatrix = [...oImageP2.matrix];
        for(let i = 0; i < newMatrix.length; i++){
            for(let j = 0; j < newMatrix[i].length; j++){
                newMatrix[i][j] = Math.round((newMatrix[i][j] * newMaxScale) / maxScale);
            }
        }
        const newImage = new ImageP2(oImageP2.rowNumber, oImageP2.colNumber, oImageP2.intensity);
        newImage.matrix = newMatrix;
        newImage.intensity = newMaxScale;
        return newImage;
    }

    /**
     * Altera intensidade de brilho
     * @param {ImageP2} oImage 
     * @param {Number} value - Exemplo: 1.2 (aumenta 20% de brilho)
     */
    amplifyBrightness(oImage, value){
        oImage.matrix;
        for (let i = 0; i < oImage.matrix.length; i++) {
            for (let j = 0; j < oImage.matrix[i].length; j++){
                oImage.matrix[i][j] = Math.round(oImage.matrix[i][j] * value);
            }
        }
    }

    equalize(filename, newFilename){
        gm(`./../temp/img/${filename}`)
        .equalize()
        .write(`./../temp/img/${newFilename}`, (err) => {
            if (err){
                console.log(err)
            }
            else{
                console.log(`Gerada imagem ${newFilename} com equalização`);
            }
        })
    }

    realce(oImage){
        const matrix = oImage.matrix;
        let xMax = matrix[0][0];
        let xMin = matrix[0][0];
      
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] > xMax) {
                    xMax = matrix[i][j];
                }
                if (matrix[i][j] < xMin) {
                    xMin = matrix[i][j];
                }
            }
        }

        let valA = 255/(xMax - xMin);
        let valB = -valA * xMin;

        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                matrix[i][j] = (valA * matrix[i][j]) + valB;
            }
        }
    }

}

module.exports = RestructureImage;