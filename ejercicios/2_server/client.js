const rp =  require('request-promise');


async function doRequest(){
    const response = await rp({
        method : 'GET',
        url : 'http://localhost:3000',
        resolveWithFullResponse : false
    })

    console.log(response);
    


}

doRequest()