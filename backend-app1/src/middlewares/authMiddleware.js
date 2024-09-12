import jwt from 'jsonwebtoken';
import { TOKEN_SECRET }  from "../config";

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['Authorization'];
    const token = authHeader && authHeader.split('')[1];

    if (token == null) {
        console.log('Token no encontrado en el encabezado Authorization');
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            console.error('Error al verificar el token:', err);
            return res.sendStatus(403);
        }
        req.userId = user.id;

        next();
    });
};

