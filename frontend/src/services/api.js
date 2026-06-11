import axios from 'axios';


const API = axios.create({
  baseURL: 'https://682d1a01-f66c-4d70-bd57-6c1738043f74.e1-us-east-azure.choreoapps.dev/api',
});


API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});


export const loginUser = (userData) => API.post('/auth/login', userData);
export const registerUser = (userData) => API.post('/auth/register', userData);

export const getTasks = () => API.get('/tasks');
export const createTask = (taskData) => API.post('/tasks', taskData);
export const updateTask = (id, taskData) => API.put(`/tasks/${id}`, taskData);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);