const logger = require('logger');
const NotFoundError = require('errors/not-found.error')
let pets = require('data/pets');
const ErrorMessage = JSON.parse('{"ERROR": "Not found"}');

class PetService {

    static async getPets(type = ['dog', 'cat', 'bird']) {
        let pets1 = pets.filter(pet => type.includes(pet.type));
        if(pets1.length){
            return pets1;
        }
        throw new NotFoundError('pet not found');
    }

    static async getPetById(id) {
        const pet = pets.find(pet => pet.id === parseInt(id));
        console.log(pet);

        if (!pet) {
            throw new NotFoundError('pet not found');
        }
        return pet;
    }

    static async createPet(pet) {
        pet.id = pets.length +1;
        pets.push(pet);
        return pets
    }

    static async updatePetById(id, body) {
        let petModified = null;
        for (let i = 0, length = pets.length; i < length; i++) {
            if (pets[i].id === parseInt(id)) {
                pets[i] = {
                    ...pets[i],
                    ...body
                }
                petModified = pets[i];
            }

        }
        if (!petModified) {
            throw new NotFoundError('pet not found')
        }
        return petModified;
    }

    static async deletePetById(id) {
        // TODO establecer control por si no existe
        // const pet = PetService.getPetById(id);
        pets = pets.filter(pet => pet.id !== parseInt(id));
        return pets;
    }


}


module.exports = PetService;