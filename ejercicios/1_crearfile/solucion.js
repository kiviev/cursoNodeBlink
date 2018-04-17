console.log('Empieza ejecucion');
// vamos a usar una libreria para que fs sea con promesas
/*
- createFile
- removeFile
- createDir
- removeDir
*/
const fs = require('fs-extra');
const path = require('path');
const args = require('minimist')(process.argv.slice(2),
    {
        string: ['path', 'contents'],
        boolean: ['createfile', 'removefile', 'createdir', 'removedir'],
        default: {
            path: './',
            contents: ''
        },
        alias: {
            path: 'p',
            createfile: 'cf',
            removefile: 'rm',
            createdir: 'cd',
            removedir: 'rmd',
            contents: 'c'
        }
    }
);

async function rmDirRecursive(dir){
    const statInfo = await fs.stat(dir);
    if(!statInfo){
        console.log('Path no existe');        
        return
    }
    if(statInfo.isDirectory()){
        const names = await fs.readdir(dir);
        if(names && names.length > 0){
            // for (let i = 0 , length = names.length; i < length; i++) {
            //     // const element = array[i];
            //     await rmDirRecursive(path.join(dir,names[i]));
                
            // }
            const promisesRmDir = names.map(async (names) => await rmDirRecursive(path.join(dir,name)))
            await Promise.all(promisesRmDir);
        }
    }else{
        console.log('es un archivo');
        await fs.unlink(dir);
    }
}

async function checkExist(namefile){
   await fs.exists(namefile)
   if(file){
       console.log('el fichero existe' + file);
       await fs.unlink(path.join( __dirname + namefile));
       
   }else{
       console.log('file no existe');
       
   }
}
















































