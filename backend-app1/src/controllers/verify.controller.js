import jwt from 'jsonwebtoken';
import {connection, TOKEN_SECRET} from "../config";

export const verifyToken = async (req, res) => {
    const { token } = req.cookies;
    if (!token) return res.send(false);

    jwt.verify(token, TOKEN_SECRET, (error, user) => {
        if (error) return res.sendStatus(401);

        connection.query('SELECT * FROM users WHERE id = ?', [user.id], (error, results) => {
            if (error || results.length === 0) return res.sendStatus(401);

            const userFound = results[0];

            return res.json({
                id: userFound.id,
                username: userFound.username,
                email: userFound.email,
            });
        });
    });
};
