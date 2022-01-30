import axios from "axios";

const instance = axios.create({
    baseURL: 'https://model-masters-api.herokuapp.com',
    withCredentials: true,
});

export default instance;