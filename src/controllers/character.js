import { characterPersistencia } from '../persistencia/character'

class Character {

    async getCharacters (req, res) {

        const { name, age  } = req.query

        let characters;

        if(name) characters = await characterPersistencia.getByName(String(name))
        else if (age) characters = await characterPersistencia.getByAge(String(age))
        else characters = await characterPersistencia.getAll()

        if(!characters.length) {
            return res.json({
                msg: "No existen personajes"
            })
        }

        res.json({
            msg: "Estos son los personajes",
            data: characters
        })
    }

    async addCharacter(req, res) {
        const { body } = req

        const newCharacter = await characterPersistencia.add(body)
        console.log(newCharacter)
        res.json({
            msg: "Se ha agregado el personaje correctamente",
            data: newCharacter,
        })
    }

    async putCharacter(req, res) {
        const { id } = req.params;
        const body  = req.body;

        const newCharacter = await characterPersistencia.put(Number(id), body)

        res.json({
            msg: "El personaje se ha actualizado correctamente",
            data: newCharacter,
        })
    }

    async deleteCharacter(req, res) {
        const { id } = req.params;

        const character = await characterPersistencia.delete(Number(id))

        res.json({
            msg: "El personaje se ha eliminado",
            data: character,
        })
    }
}

export const characterController = new Character();