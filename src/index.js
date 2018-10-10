import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios'

/**
 * Adding axios and global inteceptors to add headers etc
 */

//axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com/'
axios.defaults.headers.common['Authorization'] 
 = 'AUTH_TOKEN';
axios.defaults.headers.post['Content-Type'] = 
'application/json'

axios.interceptors.request.use(
    (request) => {
        //edit request config
        console.log(request);
        return request;
    },
    (error) => {
        console.log(error);
        return Promise.reject(error);
    }
);

// /**
//  * Prints both locally "caught" error
//  */
// axios.interceptors.response.use(
//     (response) => {
//         console.log(response);
//     },
//     (error) => {
//         console.log(error);
//         return Promise.reject(error);
//     }
// );

/**
 * Renmoving an interceptor "eject"
 * 
 *     var myInterceptor = axios.interceptors.request.use(function () {});
//  axios.interceptors.request.eject(myInterceptor);
 * 
 * 
 */

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
