const http = require('http');


const server = http.createServer((request,response) => {
    console.log('request !!');
    // response.write('<html><head></head><body><h2> holita</h2></body></html>');

    response.setHeader('Content-Type' , 'application/json');

    response.write('{"hola":"adios"}')
    response.end()
});


server.listen(3000 , '0.0.0.0' , (err) =>{
        if(err) {
            console.log(err);
            return;
        }
    } 

);











