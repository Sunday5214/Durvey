import axios from 'axios';

export const getRequest = async (method, url, data) => {
    switch(method){
        case 'GET':
            return await axios.get(url);
        case 'POST':
            return await axios.post(url, data);
        case 'DELETE':
            return await axios.delete(url);
        case 'PUT':
            return await axios.put(url, data);
        default:
            return new Error('Unhandled Method');
    }
}