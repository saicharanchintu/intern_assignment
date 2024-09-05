import React, { useEffect, useState } from 'react';
import { getToken } from '../../services/authServices';
import axios from 'axios';

const Dashboard = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getToken();
        const res = await axios.get('http://localhost:5000/api/auth/admin', {
          headers: { Authorization: token }
        });
        setMessage(res.data);
      } catch (err) {
        setMessage('Access denied');
      }
    };
    fetchData();
  }, []);

  return <h1>{message}</h1>;
};

export default Dashboard;
