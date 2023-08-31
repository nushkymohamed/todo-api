// src/routes/todo.ts
import express from 'express';
import Todo from '../models/Todo';

const router = express.Router();

router.post('/todo/new', async (req, res) => {
    try {
        const { title, description, status } = req.body;
        const newTodo = new Todo({
            title,
            description,
            status,
        });
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (todo) {
            res.status(200).json(todo);
        } else {
            res.status(404).json({ message: 'Todo not found' });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

router.put('/todo/update/:id', async (req, res) => {
    try {
        const { title, description, status } = req.body;
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            { title, description, status },
            { new: true }
        );
        if (updatedTodo) {
            res.status(200).json(updatedTodo);
        } else {
            res.status(404).json({ message: 'Todo not found' });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

router.delete('/todo/delete/:id', async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndRemove(req.params.id);
        if (deletedTodo) {
            res.status(200).json({ message: 'Todo deleted' });
        } else {
            res.status(404).json({ message: 'Todo not found' });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get('/complete/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        todo.status = !todo.status; // Toggle the completion status

        await todo.save();

        res.json(todo);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
export default router;
