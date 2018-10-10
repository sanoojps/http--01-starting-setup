import axios from 'axios';

const axios_instance = 
axios.create(
    {
        baseURL:'https://jsonplaceholder.typicode.com/'
    }
);

axios_instance.defaults.headers.common['Authorization'] 
 = 'AUTH_TOKEN';
axios_instance.defaults.headers.post['Content-Type'] = 
'application/json'

export default axios_instance