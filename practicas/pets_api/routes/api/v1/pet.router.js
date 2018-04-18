
const KoaRouter = require('koa-router');
const logger = require('logger.js')
const PetService = require('services/pet.service');
const router = new KoaRouter({
    prefix: '/api/v1/pet'
});

class petRouter {


    static async getPets(ctx) {
        // ctx.body = 'GET getPets';
        logger.info('[ROUTER] Get pets');
        let roles;
        if (ctx.request.query.role) {
            roles = ctx.request.query.role.split(',');
        }
        ctx.body = await PetService.getPets(roles);
    }


    static async getPetById(ctx) {
        // ctx.body = 'GET petsById';
        logger.info('[ROUTER] Obtaining pet with id ' + ctx.params.id);
        ctx.body = await PetService.getPetById(ctx.params.id);
    }

    static async createPet(ctx) {
        // ctx.body = 'POST createPet';
        logger.info('[ROUTER] Createing pet with body ' + ctx.request.body);
        ctx.body = await PetService.createPet(ctx.request.body);

    }

    static async updatePet(ctx) {
        // ctx.body = 'PUT updatePet';
        logger.info('[ROUTER] updating pet with id ' + ctx.params.id);
        ctx.body = await PetService.updatePetById(ctx.params.id,ctx.request.body);

    }
    static async deletePet(ctx) {
        ctx.body = 'DELETE deletePet';
        logger.info('[ROUTER] deleting pet with id ' + ctx.params.id);
        ctx.body = await PetService.deletepetById(ctx.params.id);

    }


}



router.get('/', petRouter.getPets)
router.get('/:id', petRouter.getPetById)
router.post('/', petRouter.createPet)
router.put('/:id', petRouter.updatePet)
router.delete('/:id', petRouter.deletePet)


module.exports = router;