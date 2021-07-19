import axios from 'axios';

const endPoint = 'http://localhost:8000/product';
const token = `Bearer ${localStorage.getItem('account') === null ? '' : JSON.parse(localStorage.getItem('account')).token}`;

export function getAll() {
    return axios.get(endPoint).then((res) => res.data);
}
