import axios from 'axios';

 const axiosInstance = axios.create({
     baseURL: 'http://localhost:5158/',
     Headers:{
         'acept': '*/*',
         'Content-Type': 'application/json'
         // Autorizer 
     }
 });

export default axiosInstance;