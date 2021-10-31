import { Characters } from '../db/db'
import { Movies } from '../db/db';

class Character {

    async getAll(query) {

         let characters;

        if(query) {
            if (query === String) characters = await Characters.findAll({ 
                attributes: ['nombre', 'imagen'],
                include: [ Movies ],
                where : {nombre : query}
            })
            else if (query === Number) characters = await Characters.findAll({ 
                attributes: ['nombre', 'imagen'],
                where: {edad : query}
            })
        }
        else characters = await Characters.findAll({ attributes: ['nombre', 'imagen'], include: [ Movies ] })
         
        return characters;
    }


    async getByName(name) {

        const characters = await Characters.findAll({ where : {nombre : name}})
        
        return characters;
    }

    async getByAge(age) {

        const characters = await Characters.findAll({ where : {edad : age}})
        
        return characters;
    }

    async add(character) {
        const newCharacter = await Characters.create(character)

        return newCharacter;
    }

    async put(id, data) {
        const newCharacter = await Characters.update(data, { 
            where: {id: id}
        });

        return newCharacter;
    }

    async delete(id) {
        
        const character = await Characters.destroy({
            where: {id: id}
        });

        return character;
    }
}

export const characterPersistencia = new Character();

