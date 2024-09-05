import axios from 'axios';

const API_URL = 'http://localhost:5000/api/interns/';

export const getAllInterns = async () => {
    return await axios.get(API_URL);
};

export const createIntern = async (internData) => {
    return await axios.post(API_URL, internData);
};

export const updateIntern = async (id, internData) => {
    return await axios.put(`${API_URL}${id}`, internData);
};

export const deleteIntern = async (id) => {
    return await axios.delete(`${API_URL}${id}`);
};
