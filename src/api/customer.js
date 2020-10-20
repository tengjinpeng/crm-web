import  axios from '../utils/myaxios'
let category ={
  /**分页查询所有
   * */
  findPage(currentPage,pageSize){
    return axios.get(`customer/page?currentPage=${currentPage}&pageSize=${pageSize}`)
  },

updateOrAdd(entity){
    if(entity.id){
      return axios.put("customer",entity);
    }else {
      return axios.post("customer",entity);
    }
},
  findById(id){
    return axios.get(`customer/${id}`)
  },
  deleteByIds(id){
     return axios.delete(`customer/${id}`)
  }
};
export  default  category;

