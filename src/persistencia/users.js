import { ModelUsers } from '../db/db'; 

class User {

    async add(data) {

        const user = await ModelUsers.create(data)

        return user;
    }

    async get(email) {
        const user = await ModelUsers.findOne({ where : { email : email } });

        return user;
    }
}

export const userPersistencia = new User();