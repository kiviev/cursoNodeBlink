
const KoaRouter = require('koa-router');
const logger = require('logger.js')
const UserService = require('services/user.service');
const router = new KoaRouter({
    prefix: '/api/v1/user'
});

class UserRouter{


    static async getUsers(ctx) {
        // ctx.body = 'GET getUsers';
        logger.info('[ROUTER] Get Users');
        let roles;
        if(ctx.request.query.role){
            roles = ctx.request.query.role.split(',');
        }
        ctx.body = await UserService.getUsers(roles);
    }


    static async getUserById(ctx) {
        // ctx.body = 'GET UsersById';
        logger.info('[ROUTER] Obtaining user with id ' + ctx.params.id);
        ctx.body = await UserService.getUserById(ctx.params.id);
    }
    
    static async createUser(ctx) {
        // ctx.body = 'POST createUser';
        logger.info('[ROUTER] Createing user with body ' + ctx.request.body);
        ctx.body = await UserService.createUser(ctx.request.body);
        
    }
    
    static async updateUser(ctx) {
        // ctx.body = 'PUT updateUser';
        logger.info('[ROUTER] updating user with id ' + ctx.params.id);
        ctx.body = await UserService.updateUserById(ctx.params.id);
        
    }
    static async deleteUsers(ctx) {
        ctx.body = 'DELETE deleteUsers';
        logger.info('[ROUTER] deleting user with id ' + ctx.params.id);
        ctx.body = await UserService.deleteUserById(ctx.params.id);

    }
  

}



router.get('/', UserRouter.getUsers)
router.get('/:id', UserRouter.getUserById)
router.post('/', UserRouter.createUser)
router.put('/:id', UserRouter.updateUser)
router.delete('/:id', UserRouter.deleteUsers)


module.exports = router;