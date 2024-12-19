import  { useState } from 'react';
import axios from 'axios';

const TodoForm = ({ onTaskAdded }) => {
    const [task, setTask] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!task.trim()) return;

        try {
            const response = await axios.post('/api/todos', { task });
            onTaskAdded(response.data);
            setTask('');
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter a task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
            />
            <button type="submit">Add Task</button>
        </form>
    );
};

export default TodoForm;
