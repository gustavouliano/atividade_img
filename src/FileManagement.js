const fs = require('fs');
const csv = require('csv-stringify');
const ImageP1 = require('./ImageP1');
const ImageP2 = require('./ImageP2');
const ImageP3 = require('./ImageP3');

class FileManagement {
    
    constructor(){}

    /**
     * @param {ImageP1|ImageP2|ImageP3} objImage 
     * @param {string} fileName 
     */
    create(objImage, fileName = 'teste'){
        const oWriteSteam = fs.createWriteStream(__dirname + '/../temp/img/' + fileName + '.' + objImage.extension);
        const sContent = objImage.getNewContent();
        oWriteSteam.write(sContent);
        oWriteSteam.end();
        console.log(`Arquivo ${fileName}.${objImage.extension} criado/escrito com sucesso.`);
    }

    read(filename, extension){
        try{
            let data = fs.readFileSync(__dirname + '/../temp/img/' + filename + '.' + extension, 'utf-8');
            return data;
        } catch(err){
            console.log(err);
        }
    }

    createCsv(filename = 'teste', content){
        try {
            fs.writeFileSync(`./../temp/csv/${filename}.csv`, content)
            console.log(`Csv ${filename} criado com sucesso.`);
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = FileManagement