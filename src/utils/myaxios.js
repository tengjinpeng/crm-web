import  axios from 'axios'
axios.defaults.baseURL=`http://localhost:8080/`;
/**
 * axios每次请求完成后，都会走响应拦截器
 * */
axios.interceptors.response.use(function (response) {
  // Do something with response data
  let{status,data}=response.data;
  if(status==20000){
    return data;
  }else {
    return response;
  }

  return response;
}, function (error) {

  // Do something with response error
  return Promise.reject(error);
});
export default  axios
