import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const InternDetails = () => {
    const { id } = useParams();
    const [intern, setIntern] = useState(null);

    useEffect(() => {
        const fetchInternDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/interns/${id}`);
                setIntern(response.data);
            } catch (error) {
                console.error('Error fetching intern details:', error);
            }
        };

        fetchInternDetails();
    }, [id]);

    if (!intern) return <div>Loading...</div>;

    return (
        <div>
            <h2>{intern.name}'s Details</h2>
            <p>Email: {intern.email}</p>
            <p>Department: {intern.department}</p>
            <p>Start Date: {new Date(intern.startDate).toLocaleDateString()}</p>
            <p>End Date: {intern.endDate ? new Date(intern.endDate).toLocaleDateString() : 'Ongoing'}</p>
        </div>
    );
};

export default InternDetails;
