import { connection} from "../config";

export const getTasks = async (req, res) => {
    try {
        const [tasks] = await connection.query('SELECT * FROM tasks WHERE user_id = ?', [req.user.id]);
        res.json(tasks);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createTask = async (req, res) => {
    try {
        const { title, description, date } = req.body;
        const [result] = await connection.query(
            'INSERT INTO tasks (title, description, date, user_id) VALUES (?, ?, ?, ?)',
            [title, description, date, req.user.id]
        );
        res.json({
            id: result.insertId,
            title,
            description,
            date,
            user_id: req.user.id
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const [result] = await connection.query('DELETE FROM tasks WHERE id = ?', [req.params.id]);

        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Task not found" });

        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateTask = async (req, res) => {
    try {
        const { title, description, date } = req.body;
        const [result] = await connection.query(
            'UPDATE tasks SET title = ?, description = ?, date = ? WHERE id = ?',
            [title, description, date, req.params.id]
        );

        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Task not found" });

        res.json({ id: req.params.id, title, description, date });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getTask = async (req, res) => {
    try {
        const [task] = await connection.query('SELECT * FROM tasks WHERE id = ?', [req.params.id]);

        if (task.length === 0)
            return res.status(404).json({ message: "Task not found" });

        res.json(task[0]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
