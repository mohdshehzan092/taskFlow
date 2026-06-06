import express from 'express';
import { createTask, getAllTasks, getTaskById, updateTask, deleteTask } from '../controllers/taskController.js';
import  isAuth  from '../middleware/isAuth.js';

const router = express.Router();

router.post('/create-task', isAuth, createTask);
router.get('/get-tasks', isAuth, getAllTasks);
router.get('/get-task/:id', isAuth, getTaskById);
router.put('/update-task/:id', isAuth, updateTask);
router.delete('/delete-task/:id', isAuth, deleteTask);

export default router;