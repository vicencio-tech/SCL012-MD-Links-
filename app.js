const mdl = require('./index.js');
const fs = require('fs');
const pathFile = process.argv[2]; // para capturar la ruta del archivo md 
const option = process.argv;
const stats = process.argv[4];

mdl.mdlinks(pathFile,option).then((resultado)=>{
  console.log(resultado);
});

