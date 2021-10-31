import jwt from 'jwt-simple';
import moment from 'moment';

export const checkToken = (req, res, next) => {

    let { userId } = req
    const token = req.headers['user-token'];
    
    if (!token) {
        return res.json({ error: "Necesitas incluir tu token en headers"});
    } 

    let payload = {};

    try {
        payload = jwt.decode(token, 'secretToken');
    } catch (error) {
        return res.json({ error: "El token es incorrecto"});
    }

    if(payload.expiredAt < moment().unix())
        return res.json({ error: "El token ha expirado"});

    userId = payload.userId;

    next()
}