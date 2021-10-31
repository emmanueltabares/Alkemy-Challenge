import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('AQX1ZP09fn', 'AQX1ZP09fn', 'B0vNlSpqNL', {
    host: 'remotemysql.com',
    dialect: 'mysql' 
});

const Users = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
            notEmpty: true
        }
    },
    password: {
        type: DataTypes.STRING(150),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, { timestamps: false });

export const Characters = sequelize.define('characters', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    imagen: DataTypes.STRING,
    nombre: DataTypes.STRING,
    edad: DataTypes.INTEGER,
    peso: DataTypes.INTEGER,
    historia: DataTypes.STRING
  }, { timestamps: false });

 export const Movies = sequelize.define('movies', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    imagen: DataTypes.STRING,
    titulo: DataTypes.STRING,
    date: DataTypes.DATE,
    calificacion: {
        type: DataTypes.INTEGER,
        validate: { min: 1, max: 5 },
    }
  }, { timestamps: false });

 export const Generos = sequelize.define('genero', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    imagen: DataTypes.STRING,
    nombre: DataTypes.STRING,
}, { timestamps: false });

/* const CharactersMovies = sequelize.define('characters_movies', {
    MoviesId: {
        type: DataTypes.INTEGER,
        references: {
          model: Movies, // 'Movies' would also work
          key: 'id'
        }
      },
      CharactersId: {
        type: DataTypes.INTEGER,
        references: {
          model: Characters, // 'Actors' would also work
          key: 'id'
        }
      }
}, { timestamps: false });
 */
Characters.belongsToMany(Movies, { through: 'Characters_movies'});
Movies.belongsToMany(Characters, { through: 'Characters_movies'});

Generos.hasMany(Movies)
Movies.belongsTo(Generos)

sequelize.sync({ force: false })
.then(() => {
    console.log('Tablas creadas')
}).catch((error) => {
    console.log(`Se ha producido un error al intentar crear las tablas: ${error}`)
})