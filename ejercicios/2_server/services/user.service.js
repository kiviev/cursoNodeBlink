const logger = require('logger');
const NotFoundError = require('errors/not-found.error')
let users = [
    {
        id: 1,
        name: 'Paco',
        email: 'kiviev@gmail.com',
        role: 'ADMIN'
    },
    {
        id: 2,
        name: 'Maria',
        email: 'maria@gmail.com',
        role: 'USER'
    },
    {
        id: 3,
        name: 'Luis',
        email: 'luis@gmail.com',
        role: 'ADMIN'
    },
    {
        id: 4,
        name: 'Raquel',
        email: 'raquel@gmail.com',
        role: 'USER'
    },
];


class UserService{

    static async getUsers(role = ['USER' , 'ADMIN']){
        return users.filter(user => role.includes(user.role) );
    }

    static async getUserById(id){
       const user =  users.find(user => user.id === parseInt(id));
       console.log(user);
       
        if(!user){
            throw new NotFoundError('User not found');
        }
        return user;
    }

    static async createUser(user){
        user.id = user.length++;
        users.push(user);
        return user
    }

    static async updateUserById(id,body){
        let userModified = null;
        for (let i = 0, length = users.length; i < length; i++) {
            if(users[i].id === id){
                users[i] = {
                    ...users[i],
                    ...body
                }
                userModified = users[i];
            }
            
        }
        if(!userModified){
            throw new NotFoundError('User not found')
        }
        return userModified;
    }

    static async deleteUser(id){
        const user = UserService.getUsersByID(id);
        users = users.filter(user=> user.id !== id);
        return users;
    }




}


module.exports = UserService;