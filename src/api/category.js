import  axios from '../utils/myaxios'
let category ={
  /**分页查询所有
   * */
  findPage(currentPage,pageSize){
    return axios.get(`category/page?currentPage=${currentPage}&pageSize=${pageSize}`)
  },

updateOrAdd(entity){
    if(entity.id){
      return axios.put("category",entity);
    }else {
      return axios.post("category",entity);
    }
},
  findById(id){
    return axios.get(`category/${id}`)
  },
  deleteByIds(id){
     return axios.delete(`category/${id}`)
  }
};
export  default  category;

