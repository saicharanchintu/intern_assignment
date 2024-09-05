import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskPage from '../../Pages/TaskPage';
import { useNavigate } from 'react-router-dom';

const TaskList = ({ internId }) => {
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/tasks/${internId}`);
                setTasks(response.data);
                // If no tasks, automatically show the form to add a new task
                if (response.data.length === 0) {
                    // setShowForm(true);
                    navigate(`/task/add/${internId}`)
                }
            } catch (error) {
                console.error('Error fetching tasks:', error);
            } finally {
                setLoading(false); // Ensure loading state is updated
            }
        };

        if (internId) {
            fetchTasks();
        }
    }, [internId, navigate]);

    const handleAddTask = () => {
        setEditingTask(null);
        setShowForm(true);
    };

    const handleEditTask = (task) => {
        setEditingTask(task);
        setShowForm(true);
    };

    const handleSave = async () => {
        setShowForm(false);
        try {
            const response = await axios.get(`http://localhost:5000/api/tasks/${internId}`);
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const handleDeleteTask = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/tasks/${id}`);
            setTasks(tasks.filter(task => task._id !== id));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    if (loading) {
        return <div>Loading tasks...</div>;
    }

    return (
        <div>
            <h2>Tasks</h2>
            {!showForm && (
                <button onClick={handleAddTask}>Assign New Task</button>
            )}

            {showForm ? (
                <TaskPage
                    internId={internId}
                    task={editingTask}
                    onSave={handleSave}
                    onCancel={() => setShowForm(false)}
                />
            ) : (
                <ul>
                    {tasks.map(task => (
                        <li key={task._id}>
                            <div>
                                <p>Description: {task.description}</p>
                                <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
                                <p>Priority: {task.priority}</p>
                                <p>Status: {task.status}</p>
                                <button onClick={() => handleEditTask(task)}>Edit</button>
                                <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TaskList;
