
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(express.json());

const readTodos = () => {
    const data = fs.readFileSync('todos.json', 'utf-8');
    return JSON.parse(data);
};

const writeTodos = (todos) => {
    fs.writeFileSync('todos.json', JSON.stringify(todos, null, 2));
};

                               // Routes

app.get('/todos', (req, res) => {
    try {
        const todos = readTodos();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Error reading todos' });
    }
});


app.post('/todos', (req, res) => {
    try {
        const todos = readTodos();
        const newTodo = req.body;
        todos.push(newTodo);
        writeTodos(todos);
        res.status(201).json({ message: 'Todo created', todo: newTodo });
    } catch (error) {
        res.status(500).json({ message: 'Error creating todo' });
    }
});

app.put('/todos/:id', (req, res) => {
    try {
        const todos = readTodos();
        const todoId = parseInt(req.params.id);
        const updatedTodo = req.body;
        const index = todos.findIndex(todo => todo.id === todoId);

        if (index !== -1) {
            todos[index] = updatedTodo;
            writeTodos(todos);
            res.status(200).json({ message: 'Todo updated', todo: updatedTodo });
        } else {
            res.status(404).json({ message: 'Todo not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating todo' });
    }
});


app.patch('/todos/:id', (req, res) => {
    try {
        const todos = readTodos();
        const todoId = parseInt(req.params.id);
        const index = todos.findIndex(todo => todo.id === todoId);

        if (index !== -1) {
            todos[index].completed = true;
            writeTodos(todos);
            res.status(200).json({ message: 'Todo marked as complete', todo: todos[index] });
        } else {
            res.status(404).json({ message: 'Todo not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error marking todo as complete' });
    }
});


app.delete('/todos/:id', (req, res) => {
    try {
        const todos = readTodos();
        const todoId = parseInt(req.params.id);
        const filteredTodos = todos.filter(todo => todo.id !== todoId);

        if (todos.length !== filteredTodos.length) {
            writeTodos(filteredTodos);
            res.status(200).json({ message: 'Todo deleted' });
        } else {
            res.status(404).json({ message: 'Todo not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting todo' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
