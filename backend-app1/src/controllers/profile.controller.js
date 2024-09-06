import { connection } from '../config';

export const getUserProfile = async (req, res) => {

    const userId = req.userId;

    try {
        connection.query(
            'SELECT id, username, email FROM users WHERE id = ?',
            [userId],
            (err, results) => {
                if (err) {
                    return res.status(500).json({ error: 'Error en la base de datos' });
                }

                if (results.length === 0) {
                    return res.status(404).json({ error: 'Usuario no encontrado' });
                }

                const user = results[0];
                res.json({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    message: "Bienvenido a tu perfil",
                });
            }
        );
    } catch (error) {
        res.status(500).json({ error: 'Ocurrió un error al obtener el perfil del usuario' });
    }
};