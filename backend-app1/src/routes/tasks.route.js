import { Router } from "express";
import { getTasks, createTask, deleteTask, updateTask, getTask } from "../controllers/tasks.controller";
import { auth } from "../middlewares/auth";
import { validateSchema } from "../middlewares/validate";
import { createTaskSchema } from "../schemas/task.schema.js";

const router = Router();

/**
 * @swagger
 * /tasks:
 *  get:
 *          summary: Register user credentials
 * */

router.get("/tasks", auth, getTasks);

/**
 * @swagger
 * /tasks:
 *  post:
 *          summary: Register user credentials
 * */

router.post("/tasks", auth, validateSchema(createTaskSchema), createTask);

/**
 * @swagger
 * /tasks/:id:
 *  get:
 *          summary: Register user credentials
 * */

router.get("/tasks/:id", auth, getTask);

/**
 * @swagger
 * /tasks/:id:
 *  put:
 *          summary: Register user credentials
 * */

router.put("/tasks/:id", auth, updateTask);

/**
 * @swagger
 * /delete:
 *  tasks/:id:
 *          summary: Register user credentials
 * */

router.delete("/tasks/:id", auth, deleteTask);

export default router;