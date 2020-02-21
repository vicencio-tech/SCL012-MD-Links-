
const path = require('path');
const MarkdownIt = require('markdown-it'), markdownIt = new MarkdownIt();
const isURL = require('is-url');
const fs = require('fs');
const fetch = require('node-fetch');
const fileHound = require('filehound');


const mdlinks = (path,option)=>{
  return new Promise((resolve,reject)=>{
    const resultArgument = validationOptions(option);
    const pathAbsolute = convertInAbsolute(path);
    isFileOrDirectory(pathAbsolute,resultArgument);
    //resolve(devolucion);
  });
}

//validar ruta 
const isFileOrDirectory = (path,resultArgument) => {
  fs.lstat(path, (err, stats) => {
    if (err) {
      console.log(err)
    } else if (stats.isDirectory()) { 
      //console.log("estoy en el directorio");
       goToDirectory(path);
    } else {
       //console.log('ir al archivo')
       lookMdFile(path);
       return readNewFile(path,resultArgument);
      
    }
  });
};

// Imprime en terminal los archivos que concuerden con la extensión .md
const goToDirectory = (path) => {
  return new Promise((resolve, reject) => {
    fileHound.create()
      .discard("node_modules")
      .paths(path)
      .ext(".md")
      .find()
      .then(res => (res.forEach(file => {
        if (file.length != 0) {
          console.log("Se ha encontrado un archivo .md en: " + file);
          resolve(readMdFile(file));
        }
      })))
      .catch(err => {
        reject(new Error("Esto no es un archivo .md file. Intente con otro archivo" + "\n"));
      })
  })
};

const lookMdFile = (file) => {
  let extFile = path.extname(file);
      if (extFile !== ".md") {
        console.log("Esto no es un archivo .md file. Intente con otro archivo" + "\n");
      }
  };  


//validar los argumentos que ingresa el usuario
//option[3] es el primer parametro --validate
//option[4] es el segundo parametro --stats
function validationOptions(option){ 
  let behaviour = '';
  if (option[3]!= undefined || option[4]!= undefined){
    if (option[3] === '--validate' && option[4] === '--stats'){
        behaviour = 'case 1'
        return behaviour
    }
  }

  //si solo ingresa --validate
  if (option[3] != undefined){
    if (option[3] === '--validate'){
        behaviour = 'case 2'
        return behaviour
    }else{

 // si solo ingresa --stats
      if (option[3] === '--stats'){
        behaviour = 'case 3'
        return behaviour
    }
    }
  }

  //cuando no ingresa ningun argumento
  if (option[3] === undefined || option[4] === undefined){
        behaviour = 'case 4'
        return behaviour
  }
}

//funcion que lee el archivo
function readNewFile (pathFile,resultArgument) {

  //crear arreglo
  let arrObjLinks = []; 

  fs.readFile(pathFile, function(error, content){
    if (error){
      console.log('Ocurrió un error al leer archivo');
    }else {
      const markdownFile = markdownIt.render(content.toString()); // libreria que convierte archivo en HTML
      const line = markdownFile.split('\n'); // separa el archivo en lineas independientes
      
      if (resultArgument === 'case 1'){ //validate y stats
        generateStatsComplete(line,'complete'); //funcion que genera stats: total, unique y broken
      }

      if (resultArgument === 'case 2'){ // validate
        arrObjLinks.push(validateLink(line,pathFile)); //funcion que valida cada link y si redirecciona a una URL devuelve OK    
      }

      if (resultArgument === 'case 3'){ //stats
        generateStatsComplete(line,'parcial');// genera estadisticas: total, unique
     }

      if (resultArgument === 'case 4'){ //sin options
        validateLine(line,pathFile);// solo valida las lineas y las muestra
   }
  }
  })
  setTimeout(()=>{
    //console.log('voy a devolver ::' + arrObjLinks);
    return arrObjLinks;
  },3000);
  

};

function generateStatsComplete (line, opcion) {
  let totalLink = 0
  let totalLinkOk = 0;
  let unique = 0
  let broken = 0

   line.forEach(element => { // por cada linea analiza si tiene un <a href
    if (element.includes('http')){
      totalLink +=1;
      const cleanLink = element.substring(element.indexOf('http'), element.indexOf('">')); 
      
      if (isURL(cleanLink)){ // valida si el link es una url    
          fetch(cleanLink).then(function(response) {
            totalLinkOk +=1;
           
           }).catch(function(err){
             broken +=1;
             
           });
      }
    }
  });
  setTimeout(()=>{
    if(opcion === 'complete'){
      console.log('Total: ' + totalLink);
      console.log('Link Correct: ' + totalLinkOk);
      console.log('Broken: ' + broken);

    }else if('parcial'){
      console.log('Total: ' + totalLink);
    }
  },3000);
}

function validateLink(line,pathFile){
  //crear arreglo
  let result = [];
  //crear objeto
  let resultObject = new Object();
  line.forEach(element => { // por cada linea analiza si tiene un <a href
    
    if (element.includes('http')){
      
      const cleanLink = element.substring(element.indexOf('http'), element.indexOf('">')); 
      const text = element.substring(element.indexOf('">')+2, element.indexOf('</'));
      if (isURL(cleanLink)){ // valida si el link es una url
        // con fetch
        fetch(cleanLink)
        .then(function(response) {
          console.log(pathFile + ' ' + cleanLink + ' ' + text  + ' ' + response.status + ' ' + 'OK');
          resultObject.path = pathFile;
          resultObject.link = cleanLink;
          resultObject.text = text;
         // console.log('dshds' + resultObject.text);
          result.push(resultObject); 
        }).catch(function(err){
          console.log(pathFile + ' ' + cleanLink + ' ' + text  + ' '  + ' '+ 'BAD');
        });
      }
    }
  });

  setTimeout(()=>{
    //console.log('deberia mostrarlos ' + result[0]);
    return result;
  },2000);

}


function validateLine(line,pathFile){
  line.forEach(element => { 
    
    if (element.includes('http') ){
      
      const cleanLink = element.substring(element.indexOf('http'), element.indexOf('">')); 
      const text = element.substring(element.indexOf('">')+2, element.indexOf('</'));
      if (isURL(cleanLink)){ 
              console.log(pathFile + ' ' + cleanLink + ' ' + text);
      }
    }
  });
}

// path.resolve() retorna un string
function convertInAbsolute (root) {
  const boleanRoot = pathAbsolute(root);
  let rootAbsolute;
  if (boleanRoot === true) {
    rootAbsolute = root;
  } else {
    rootAbsolute = path.resolve(root);
  }
  return rootAbsolute;
};

function pathAbsolute(root) {
  const isAbsolute = path.isAbsolute(root); 
  return isAbsolute;
};


module.exports = {
  mdlinks
}