import  axios from '../utils/myaxios'
let category ={
  /**分页查询所有
   * */
  findPage(currentPage,pageSize){
    return axios.get(`good/page?currentPage=${currentPage}&pageSize=${pageSize}`)
  },

updateOrAdd(entity){
    if(entity.id){
      return axios.put("good",entity);
    }else {
      return axios.post("good",entity);
    }
},
  findById(id){
    return axios.get(`good/${id}`)
  },
  deleteByIds(id){
     return axios.delete(`good/${id}`)
  },
//  分类树
  findCategoryTree(){
    return axios.get(`category/categoryTree`)
  },

};
export  default  category;

