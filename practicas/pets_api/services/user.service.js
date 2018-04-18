const logger = require('logger');
const NotFoundError = require('errors/not-found.error')
let users = require('data/users');


class UserService {

    static async getUsers(role = ['USER', 'ADMIN']) {
        return users.filter(user => role.includes(user.role));
    }

    static async getUserById(id) {
        const user = users.find(user => user.id === parseInt(id));
        console.log(user);

        if (!user) {
            throw new NotFoundError('User not found');
        }
        return user;
    }

    static async createUser(user) {
        
        user.id = users.length +1;
        console.log(user);
        users.push(user);
        return user;
    }

    static async updateUserById(id, body) {
        let userModified = null;
        let length = users.length;
        for (let i = 0; i < length; i++) {
            if (users[i].id === parseInt(id)) {
                
                users[i] = {
                    ...users[i],
                    ...body
                }
                userModified = users[i];
            }

        }
        if (!userModified) {
            throw new NotFoundError('User not found')
        }
        console.log(userModified);
        
        return userModified;
    }

    static async deleteUserById(id) {
        // TODO establecer control por si no existe
        // let user = UserService.getUserById(id);
        users = users.filter(user => user.id !== parseInt(id));
        return users;
    }




}


module.exports = UserService;