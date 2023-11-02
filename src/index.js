const ImageP1 = require('./ImageP1');
const ImageP2 = require('./ImageP2');
const ImageP3 = require('./ImageP3');
const FileManagement = require('./FileManagement');
const RestructureImage = require('./RestructureImage');
const Conversor = require('./Conversor');

const oFile = new FileManagement();
const oConversor = new Conversor();
const oRestructureImage = new RestructureImage();

atividade10();
// atividade11();
// atividade12();
// atividade13();

function atividade13(){
    let oImageA = oRestructureImage.readP3('com');
    let oImageB = oRestructureImage.readP3('sem');
    oRestructureImage.imageAddition(oImageA, oImageB);
}

function atividade12(){
    let oImageP3 = oRestructureImage.readP3('EntradaRGB');
    oImageP3.rotate180();
    oFile.create(oImageP3, 'EntradaRGB180graus');
    oImageP3 = oRestructureImage.readP3('EntradaRGB');
    oImageP3.rotate90();
    oFile.create(oImageP3, 'EntradaRGB90graus');
}

function atividade11(){
    oRestructureImage.equalize('Fig0316(1)(top_left).tif', 'Fig1Equalized.tif');
    oRestructureImage.equalize('Fig0316(2)(2nd_from_top).tif', 'Fig2Equalized.tif');
    oRestructureImage.equalize('Fig0316(3)(third_from_top).tif', 'Fig3Equalized.tif');
    oRestructureImage.equalize('Fig0316(4)(bottom_left).tif', 'Fig4Equalized.tif');
}

function atividade10(){
    const oImageP2 = oRestructureImage.readP2('EntradaEscalaCinza');
    const oImageP3 = oRestructureImage.readP3('EntradaRGB')
    oRestructureImage.realce(oImageP2);
    oRestructureImage.realce(oImageP3);
    oFile.create(oImageP2, 'EntradaEscalaCinza-Realce');
    oFile.create(oImageP3, 'EntradaRGB-Realce');
}

function atividade09(){
    // let oImageP2 = oRestructureImage.readP2('EntradaEscalaCinza');
    // oFile.createCsv('q09a', oImageP2.getContentCsv());
    let oImageP3 = oRestructureImage.readP3('EntradaRGB');
    oFile.createCsv('q09b', oImageP3.getContentCsv());
}


function atividade08(){
    const oImageP3 = oRestructureImage.readP3('Fig4');
    // oImageP3.separateRedMinimum();
    // oFile.create(oImageP3, 'Fig4ResultadoImgA1');
    // oImageP3.separateGreenMinimum();
    // oFile.create(oImageP3, 'Fig4ResultadoImgA2');
    // oImageP3.separateBlueMinimum();
    // oFile.create(oImageP3, 'Fig4ResultadoImgA3');
    
    // oImageP3.separateRedMaximum();
    // oFile.create(oImageP3, 'Fig4ResultadoImgB1');
    // oImageP3.separateGreenMaximum();
    // oFile.create(oImageP3, 'Fig4ResultadoImgB2');
    oImageP3.separateBlueMaximum();
    oFile.create(oImageP3, 'Fig4ResultadoImgB3');
}

function atividade07(){
    const oImageP3 = oRestructureImage.readP3('Fig4');
    const oImageP2 = oConversor.convertP3toP2(oImageP3);
    oFile.create(oImageP2, 'Fig4ResultadoA');
    oImageP3.applyAverage();
    oFile.create(oImageP3, 'Fig4ResultadoB');
}

function atividade06(){
    const oImageP2 = oRestructureImage.readP2('EntradaEscalaCinza');
    const oImageP1 = oConversor.convertP2toP1(oImageP2);
    oFile.create(oImageP1, 'Atividade6a');
    oConversor.applyNegativeP1(oImageP1);
    oFile.create(oImageP1, 'Atividade6c');
}

function atividade05(){
    const oImageP2 = oRestructureImage.readP2('TesteConversor8bits');
    const oImageP2Converted = oRestructureImage.bitsConverterP2(oImageP2, 255, 31);
    oRestructureImage.amplifyBrightness(oImageP2Converted, 1.2);
    oFile.create(oImageP2Converted, 'TesteConversorBrilho');
}

function atividade04(){
    const oImageP2 = oRestructureImage.readP2('TesteConversor8bits');
    const oImageP2Converted = oRestructureImage.bitsConverterP2(oImageP2, 255, 31);
    oFile.create(oImageP2Converted, 'TesteConversor5bits');
}

function atividade03() {
    const oImageP2 = oRestructureImage.readP2('EntradaEscalaCinza');
    oFile.create(oRestructureImage.resizeP2(oImageP2, 80, 80), 'EntradaEscalaCinza10xMenor');
    oFile.create(oRestructureImage.resizeP2(oImageP2, 480, 320), 'EntradaEscalaCinza480x320');
    oFile.create(oRestructureImage.resizeP2(oImageP2, 1280, 720), 'EntradaEscalaCinzaHD');
    oFile.create(oRestructureImage.resizeP2(oImageP2, 1920, 1080), 'EntradaEscalaCinzaFullHD');
    oFile.create(oRestructureImage.resizeP2(oImageP2, 3840, 2160), 'EntradaEscalaCinza4k');
    oFile.create(oRestructureImage.resizeP2(oImageP2, 7680, 4320), 'EntradaEscalaCinza8k');
}

function generateFiles(){
    const oImageP1 = new ImageP1(400, 400);
    oImageP1.autofill();
    const oImageP2 = new ImageP2(400, 400);
    oImageP2.autofill();
    const oImageP3 = new ImageP3(400, 400);
    oImageP3.autofill();
    const oImageP3pt2 = new ImageP3(1000, 1000);
    oImageP3pt2.autofill();
    oFile.create(oImageP1);
    oFile.create(oImageP2);
    oFile.create(oImageP3);
    oFile.create(oImageP3pt2, 'teste_ppm_1000');
}