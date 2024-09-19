import bcrypt from "bcryptjs";
import { createAccessToken } from "../middlewares/createToken";
import { connection } from '../config'

export const register = async (req, res) => {
    try {

        const { username, email, password } = req.body;

        console.log(req.body)

        connection.query(
            "SELECT * FROM users WHERE email = ?",
            [email],
            async (error, results) => {
                if (error) {
                    return res.status(500).json({ message: error.message });
                }

                if (results.length > 0) {
                    return res.status(400).json({
                        message: "The email is already in use",
                    });
                }

                const passwordHash = await bcrypt.hash(password, 10);

                connection.query(
                    "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)",
                    [username, email, passwordHash],
                    async (err, result) => {
                        if (err) {
                            return res.status(500).json({ message: err.message });
                        }

                        const token = await createAccessToken({
                            id: result.insertId,
                        });

                        res.cookie("token", token, {
                            httpOnly: process.env.NODE_ENV !== "development",
                            secure: true,
                            sameSite: "none",
                        });

                        res.json({
                            id: result.insertId,
                            username,
                            email,
                        });
                    }
                );
            }
        );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};