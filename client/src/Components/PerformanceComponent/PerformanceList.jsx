import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PerformanceList = ({ internId }) => {
    const [performanceRecords, setPerformanceRecords] = useState([]);
    const [newRecord, setNewRecord] = useState('');
    const [editRecord, setEditRecord] = useState({ id: '', metrics: '' });

    useEffect(() => {
        const fetchPerformanceRecords = async () => {
            try {
                const response = await axios.get(`/api/performance/${internId}`);
                setPerformanceRecords(response.data);
            } catch (error) {
                console.error('Error fetching performance records:', error);
            }
        };

        if (internId) {
            fetchPerformanceRecords();
        }
    }, [internId]);

    const handleAddRecord = async () => {
        try {
            const response = await axios.post('/api/performance', { internId, metrics: newRecord });
            setPerformanceRecords([...performanceRecords, response.data]);
            setNewRecord('');
        } catch (error) {
            console.error('Error adding performance record:', error);
        }
    };

    const handleUpdateRecord = async () => {
        try {
            const response = await axios.put(`/api/performance/${editRecord.id}`, { metrics: editRecord.metrics });
            setPerformanceRecords(performanceRecords.map(record =>
                record._id === editRecord.id ? response.data : record
            ));
            setEditRecord({ id: '', metrics: '' });
        } catch (error) {
            console.error('Error updating performance record:', error);
        }
    };

    const handleDeleteRecord = async (id) => {
        try {
            await axios.delete(`/api/performance/${id}`);
            setPerformanceRecords(performanceRecords.filter(record => record._id !== id));
        } catch (error) {
            console.error('Error deleting performance record:', error);
        }
    };

    return (
        <div>
            <h2>Performance Records</h2>

            <div>
                <h3>Add Performance Record</h3>
                <input
                    type="text"
                    value={newRecord}
                    onChange={(e) => setNewRecord(e.target.value)}
                    placeholder="Enter performance metrics"
                />
                <button onClick={handleAddRecord}>Add</button>
            </div>

            <ul>
                {performanceRecords.map(record => (
                    <li key={record._id}>
                        {record.metrics} on {new Date(record.reviewDate).toLocaleDateString()}
                        <button onClick={() => setEditRecord({ id: record._id, metrics: record.metrics })}>
                            Edit
                        </button>
                        <button onClick={() => handleDeleteRecord(record._id)}>Delete</button>
                    </li>
                ))}
            </ul>

            {editRecord.id && (
                <div>
                    <h3>Edit Performance Record</h3>
                    <input
                        type="text"
                        value={editRecord.metrics}
                        onChange={(e) => setEditRecord({ ...editRecord, metrics: e.target.value })}
                        placeholder="Enter new metrics"
                    />
                    <button onClick={handleUpdateRecord}>Update</button>
                    <button onClick={() => setEditRecord({ id: '', metrics: '' })}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default PerformanceList;
