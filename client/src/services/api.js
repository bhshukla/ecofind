import axios from 'axios';

// Create an instance of axios with a base URL
const apiClient = axios.create({
    baseURL: 'http://localhost:3001', // Your backend's URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient;