console.log('Empieza ejecucion');
// vamos a usar una libreria para que fs sea con promesas
/*
- createFile
- removeFile
- createDir
- removeDir
*/
const fs = require('fs-extra');
const pa = require('path');
const args = require('minimist')(process.argv.slice(2),
{
  string : ['path','contents'],
  boolean : ['createfile','removefile','createdir' , 'removedir'],
  default : {
    path : './',
    contents: ''
  },
  alias : {
    path : 'p',
    createfile : 'cf',
    removefile : 'rm',
    createdir : 'cd',
    removedir : 'rmd',
    contents : 'c'
  }
}
);


// console.log(args);


async function createFile(namefile, contents, path) {

  if(path != './'){
    createDir(path).then(()=>{
       fs.writeFile(path + namefile, contents);
    })
  }
  await fs.writeFile(path + namefile, contents);
  console.log('ok');

}

async function createDir(nameDir) {

  let namedirsplit1 = nameDir.split('/');
  let newd = '';
  for (let item of namedirsplit1) {
    if (item == '.' || item == '..') 
    {
      newd = item + '/';
      continue
    }
      newd += item + '/';
    await fs.mkdir(newd , (e) => {
      
      if (e) {
  
        console.log(e.message);
        
        if (e.code === 'ENOENT'){
          console.log('no existe');
          createDir(newd)
  
        } else if (e.code === 'EEXIST'){
          console.log(e.path +' Existe');
          
  
        } else{
          console.log('Otro error' +  e.message);
  
        }
        
  
      }else{
        // createDir(newdir)
        console.log(newd + ' created');
      }
    } );


  }
  


}

async function removefile(path) {
  await fs.unlink(path, (e) => {
    if (e) {
      console.log(e);
      // throw e;
    }

    console.log( path + ' was deleted');
  });
}
async function removeDir(path){
  await fs.rmdir(path,(e)=>{
    if(e){
      console.log(e);
      if (e.code == 'ENOTEMPTY'){ // el directorio no está vacio
        fs.readdir(e.path, (err, files) => {
          files.forEach(file => {
            console.log(e.path);
            
            fs.stat(e.path + '/' +  file , (err, stat) => {
              if(err){
                console.log(err);
                return;                
              }
              console.log('dentro: ' + e.path + file );
              
              if (stat.isDirectory()){
                console.log('es directorio: ' + e.path + file );
                
                removeDir(e.path + file  );
              }else{
                console.log('es archivo: ');
                
                removefile(e.path + '/' + file);
              }
              
              // stat.isDirectory()
            });
            console.log(file);
            
            // if (file.isDirectory()){
            //   removeDir(file);
            // }else removefile(file);
          });
        })
      }
      // throw e;      
    }
  } );
}
// removefile('./hola/holita/vecinito/holita.txt');
removeDir('./hola/holita/vecinito/');
// createFile("holita.txt" , "venimos de camino sssrf ", './hola/holita/vecinito/')
// createDir('./juan/luis/holita/vecinito/nos/vemos/otra/vez');
// createDir('./juan/luis/holita/vecinito/nos/vemos/otra/vez');





// main().then(()=>{
//   console.log('END');
// }, (err) => {
//   console.log(err);
// })


// fs.mkdirSync('data');


// fs.mkdir('data2' , () => {
//   console.log('created');
// });
