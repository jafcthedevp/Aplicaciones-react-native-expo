import { Router } from "express";
import { getTasks, getTaskCount, getTask, saveTask, updateTasks, deleteTasks } from '../controllers/tasks.controller'

const router = Router()

router.get('/tasks', getTasks)

router.get('/tasks/count', getTaskCount)

router.get('/tasks/:id', getTask)

router.post('/tasks', saveTask)

router.delete('/tasks/:id', deleteTasks)

router.put('/tasks/:id', updateTasks)

export default router;