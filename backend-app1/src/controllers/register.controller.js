import { connection } from '../config';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    try {
        const { username, email, password_hash } = req.body;
        connection.query(
            'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
            [username, email, password_hash],

            (err, results) => {
                if (err) {
                    return res.status(500).send({ error: err.message });
                }
                res.status(201).json({ id: results.insertId, username, email })
            }
        );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




