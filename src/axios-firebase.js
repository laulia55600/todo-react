import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://todo-react-f964f-default-rtdb.europe-west1.firebasedatabase.app/'
});

export default instance;