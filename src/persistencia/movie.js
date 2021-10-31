import { Generos, Movies, Characters } from '../db/db';

class Movie {

    async get() {

         let movies = await Movies.findAll({ 
            include: {
                model: Generos,
                as: "genero",
                attributes: ['nombre']
            },
            attributes: ['imagen', 'titulo', 'date']
        });
         
        return movies;
    }
    
    async getByName(name) {
        const movies = await Movies.findAll({ where : {titulo : name}})
        
        return movies;
    }

    async getByIdGenero(idGenero) {
        const movies = await Movies.findAll({ where : {generoId : idGenero}})
        
        return movies;
    } 

    async add(body) {

        const newMovie = await Movies.create(body);

        return newMovie;
    }

    async put(id, data) {
        const newMovie = await Movies.update(data, { 
            where: {id: id}
        });

        return newMovie;
    }

    async delete(id) {
        const movie = await Movies.destroy({
            where: {id: id}
        });

        return movie;
    } 
}

export const moviePersistencia = new Movie();