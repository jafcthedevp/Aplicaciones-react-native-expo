import bcrypt from 'bcryptjs'
import { connection } from '../config'
import { createAccessToken} from "../middlewares/createToken";

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        connection.query('SELECT * FROM users WHERE username = ?', [username], async (error, results) => {
            if (error) {
                return res.status(500).json({ message: error.message });
            }

            if (results.length === 0) {
                return res.status(400).json({ message: ["The username does not exist"] });
            }

            const userFound = results[0];

            const isMatch = await bcrypt.compare(password, userFound.password_hash);
            if (!isMatch) {
                return res.status(400).json({ message: ["The password is incorrect"] });
            }

            const token = await createAccessToken({
                id: userFound.id,
                username: userFound.username,
            });

            res.cookie("token", token, {
                httpOnly: process.env.NODE_ENV !== "development",
                secure: true,
                sameSite: "none",
            });

            res.json({
                id: userFound.id,
                username: userFound.username,
                email: userFound.email,
            });
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
