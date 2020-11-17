import axios from 'axios';


axios.defaults.baseURL ='https://localhost:5001/api';

export const getRequest = async (method, resource, data) => {
    switch(method){
        case 'GET':
            return await axios.get(resource);
        case 'POST':
            return await axios.post(resource, data);
        case 'DELETE':
            return await axios.delete(resource);
        case 'PUT':
            return await axios.put(resource, data);
        default:
            return new Error('Unhandled Method');
    }
}