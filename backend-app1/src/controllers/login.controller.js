import { connection } from '../config';
import jwt from 'jsonwebtoken';
import { createAccessToken } from '../middlewares/authMiddleware';

export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        connection.query(
            'SELECT * FROM users WHERE username = ?',
            [username],
            (error, results) => {
                if (error) {
                    return res.status(500).json({ error: error.message });
                }

                if (results.length === 0) {
                    return res.status(404).json({ message: 'User not found' });
                }

                const user = results[0];

                if (password === user.password_hash) {
                    res.status(200).json({ message: 'Login successful', user });
                } else {
                    res.status(401).json({ message: 'Invalid credentials' });
                }
            }
        );
        const token = await createAccessToken({
            username: username.username,
            password: username.password,
        });
        res.json({
            accessToken: token,
        })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};