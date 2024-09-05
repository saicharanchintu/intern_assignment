import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './InternForm.css'

const InternForm = ({ intern, onSave }) => {
    const [internData, setInternData] = useState({
        name: '',
        email: '',
        department: '',
        startDate: '',
        endDate: ''
    });

    useEffect(() => {
        if (intern) {
            setInternData(intern);
        }
    }, [intern]);

    const handleChange = (e) => {
        setInternData({ ...internData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (intern?._id) {
                await axios.put(`http://localhost:5000/api/interns/${intern._id}`, internData);
            } else {
                await axios.post('http://localhost:5000/api/interns', internData);
            }
            onSave();
        } catch (error) {
            console.error('Error saving intern:', error);
        }
    };

    return (
        <div className="intern-form-container">
            <h2>{intern ? 'Edit Intern' : 'Add New Intern'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" onChange={handleChange} value={internData.name} />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" onChange={handleChange} value={internData.email} />
                </div>
                <div>
                    <label>Department:</label>
                    <input type="text" name="department" onChange={handleChange} value={internData.department} />
                </div>
                <div>
                    <label>Start Date:</label>
                    <input type="date" name="startDate" onChange={handleChange} value={internData.startDate} />
                </div>
                <div>
                    <label>End Date:</label>
                    <input type="date" name="endDate" onChange={handleChange} value={internData.endDate} />
                </div>
                <button type="submit">{intern ? 'Update Intern' : 'Add Intern'}</button>
            </form>
        </div>
    );
};

export default InternForm;
