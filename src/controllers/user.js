import bcrypt from 'bcryptjs';
import { userPersistencia } from '../persistencia/users';
import moment from 'moment';
import jwt from 'jwt-simple';

class User {
    async register(req, res) {
    
        req.body.password = bcrypt.hashSync(req.body.password, 10)
        try {
            const user = await userPersistencia.add(req.body)

            res.json({ 
                msg: 'Registro exitoso!',
                user: user.username,
                email: user.email
            })

        } catch (error) {
            console.log(error)
        }   
    }

    async login(req, res){

        const { email } = req.body;
        const { password } = req.body;

        try {
            const user = await userPersistencia.get(email);
            if(user) {
                const comparePass = bcrypt.compareSync(password, user.password);
                if(comparePass) {
                    res.json({ success: createToken(user)})
                } else {
                res.json({ error: "Usuario y/o contraseña incorrectos"})
                }
            } else {
                res.json({ error: "Usuario y/o contraseña incorrectos"})
            }
        } catch (error) {
            console.log(error)
        }
    }
}

const createToken = (user) => {
    const payload = {
        userId: user.id,
        createdAt: moment().format(),
        expiredAt: moment.duration(10, 'minutes'),
    }

    return jwt.encode(payload, 'secretToken')
}

export const userController = new User();