require('dotenv').config()
const Koa = require('koa');
const koaLogger = require('koa-logger');
const logger = require('logger.js');
const bodyParser = require('koa-bodyparser');
const userRouter = require('./routes/api/v1/user.router');


const app = new Koa();

app.use(koaLogger());
app.use(bodyParser())
// middleware para chequear que no hay errores y si los hay logearlos y no sacar información
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (error) {
        logger.error(error);
        if(error.statusCode){
            ctx.throw(error.statusCode ,error.message)
        }
        ctx.throw(500, 'Internal server error')
    }

})

app.use(async (ctx,next) =>{
    const start = Date.now();
    await next();
    const total = Date.now() - start;
    ctx.set('X-Response-Time', total + 'ms');
    // console.log('holita2');
    
})

app.use(userRouter.middleware());


// registrar middlewares
// app.use(async (ctx, next) => {
//     ctx.body = 'holita';
//     logger.info('request', ctx.request.query)
//     if (ctx.request.path === '/error') {
//         ctx.throw(500, 'Esto es un error');
//     }
//     if (ctx.request.path === '/redirect') {
//         ctx.assert(ctx.request.query.url, 400, 'Url is Required');
//         ctx.redirect(ctx.request.query.url);
//         return;
//     }

// })



app.listen(process.env.PORT ,(err) => {
    if (err){
        console.log(err);      
    }
    console.log('Listening in http://localhost:' + process.env.PORT);
} );