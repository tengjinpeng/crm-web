import  axios from '../utils/myaxios'
let category ={
  /**分页查询所有
   * */
  findPage(currentPage,pageSize){
    return axios.get(`supplier/page?currentPage=${currentPage}&pageSize=${pageSize}`)
  },

updateOrAdd(entity){
    if(entity.id){
      return axios.put("supplier",entity);
    }else {
      return axios.post("supplier",entity);
    }
},
  findById(id){
    return axios.get(`supplier/${id}`)
  },
  deleteByIds(id){
     return axios.delete(`supplier/${id}`)
  }
};
export  default  category;

