import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://swoj:8443/',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
  });

export default instance;