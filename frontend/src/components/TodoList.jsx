import  { useState, useEffect } from 'react';
import axios from 'axios';

const TodoList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('/api/todos');
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };
        fetchTasks();
    }, []);

    const handleUpdate = async (id, updatedTask) => {
        try {
            await axios.put(`/api/todos/${id}`, { task: updatedTask });
            setTasks(tasks.map((task) =>
                task.id === id ? { ...task, task: updatedTask } : task
            ));
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleComplete = async (id) => {
        try {
            await axios.patch(`/api/todos/${id}/complete`);
            setTasks(tasks.map((task) =>
                task.id === id ? { ...task, completed: true } : task
            ));
        } catch (error) {
            console.error('Error completing task:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/todos/${id}`);
            setTasks(tasks.filter((task) => task.id !== id));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <ul>
            {tasks.map((task) => (
                <li key={task.id}>
                    <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                        {task.task}
                    </span>
                    <button onClick={() => handleComplete(task.id)}>Complete</button>
                    <button onClick={() => handleUpdate(task.id, prompt('Update task:', task.task))}>Update</button>
                    <button onClick={() => handleDelete(task.id)}>Delete</button>
                </li>
            ))}
        </ul>
    );
};

export default TodoList;
