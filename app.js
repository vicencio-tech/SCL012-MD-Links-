const mdl = require('./index.js');
const pathFile = process.argv[2]; // para capturar la ruta del archivo md 
const option = process.argv;


mdl.mdlinks(pathFile,option).then((resultado)=>{
  console.log('resultado excelente ' + resultado);
});

