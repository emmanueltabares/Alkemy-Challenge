import { moviePersistencia } from '../persistencia/movie'

class Movie {

     async getMovie (req, res) {

        const { title } = req.query;
        const { idGenero } = req.query;

        let movies = [];

        if(title) movies = await moviePersistencia.getByName(String(title))
        else if (idGenero) movies = await moviePersistencia.getByIdGenero(Number(idGenero))
        else movies = await moviePersistencia.get()

         if(!movies.length) {
            return res.json({
                msg: "No existen peliculas"
            })
        } 

        res.json({
            msg: "Estas son las peliculas",
            data: movies
        })
    } 

    async addMovie(req, res) {
        const { body } = req

        const newMovie = await moviePersistencia.add(body)
        res.json({
            msg: "Se ha agregado la pelicula/serie correctamente",
            data: newMovie,
        })
    }

    async putMovie(req, res) {
        const { id } = req.params;
        const body  = req.body;

        const newMovie = await moviePersistencia.put(Number(id), body)

        res.json({
            msg: "La película/serie se ha actualizado correctamente",
            data: newMovie,
        })
    }

    async deleteMovie(req, res) {
        const { id } = req.params;

        const movie = await moviePersistencia.delete(Number(id))

        res.json({
            msg: "La película/serie se ha eliminado",
            data: movie,
        })
    } 
}

export const movieController = new Movie();