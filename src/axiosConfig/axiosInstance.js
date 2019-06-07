import axios from 'axios'
import Cookies from "js-cookie";

var tokenName = 'auth-token';

export function GetAuthHeader() {
  console.log('GetHeader')
  console.log(Cookies.get(tokenName))
  if(typeof Cookies.get(tokenName) !== 'undefined' ) {
    console.log('token set')
    return {'Authorization': "bearer " + Cookies.get(tokenName)};
  }
  console.log('token not set')
  return {};
}

const instance = axios.create({
    baseURL: 'http://localhost:8443/',
    timeout: 1000,
    withCredentials: true
  });

  instance.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    console.log("error function")
    console.log(error)
    console.log(error.response)
    if (error instanceof Error && error.message === 'Network Error') {
      console.log("Error with connection")
      Cookies.remove(tokenName)
      // window.location.reload();
    }
  });

export default instance;