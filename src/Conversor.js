const ImageP1 = require("./ImageP1");
const ImageP2 = require("./ImageP2");
const ImageP3 = require("./ImageP3");

class Conversor {

    /**
     * Transforma uma imagem P1 em P2 com base no valor limiar
     * @param {ImageP2} oImageP2 
     */
    convertP2toP1(oImageP2) {
        const factor = Math.ceil(oImageP2.intensity / 2);
        const oImageP1 = new ImageP1(oImageP2.rowNumber, oImageP2.colNumber);
        const newMatrix = [...oImageP2.matrix];
        for (let i = 0; i < newMatrix.length; i++) {
            for (let j = 0; j < newMatrix[i].length; j++) {
                newMatrix[i][j] = newMatrix[i][j] > factor ? 1 : 0; 
            }
        }
        oImageP1.matrix = newMatrix;
        return oImageP1;
    }

    applyNegativeP1(oImageP1) {
        const newMatrix = [...oImageP1.matrix];
        for (let i = 0; i < newMatrix.length; i++) {
            for (let j = 0; j < newMatrix[i].length; j++) {
                newMatrix[i][j] = newMatrix[i][j] == 0 ? 1 : 0;
            }
        }
        oImageP1.matrix = newMatrix;
    }

    /**
     * Converte P3 para P2 através da média entre os valores RGB
     * @param {ImageP3} oImageP3 
     */
    convertP3toP2(oImageP3){
        const matrix = oImageP3.matrix;
        const newMatrix = [];
        for (let i = 0; i < matrix.length; i++) {
            newMatrix.push([]);
            for (let j = 0; j < matrix[i].length; j += 3) {
                const newPixel = Math.round((matrix[i][j], matrix[i][j + 1], matrix[i][j + 2]) / 3);
                newMatrix[i].push(newPixel);
            }
        }
        const oImageP2 = new ImageP2(oImageP3.rowNumber, oImageP3.colNumber, oImageP3.intensity);
        oImageP2.matrix = newMatrix;
        return oImageP2;
    }

}

module.exports = Conversor;