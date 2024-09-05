import React from 'react';
import { useParams } from 'react-router-dom'; 
import TaskList from './TaskList';

const TaskManagement = () => {
    const { internId } = useParams(); 
    return (
        <div>
            <h1>Task Management</h1>
            {internId ? (
                <TaskList internId={internId} /> 
            ) : (
                <p>No intern ID provided</p>
            )}
        </div>
    );
};

export default TaskManagement;
