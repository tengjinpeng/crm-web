import  axios from '../utils/myaxios'
let user ={
  /**分页查询所有
   * */
  findPage(currentPage,pageSize){
    return axios.get(`user/page?currentPage=${currentPage}&pageSize=${pageSize}`)
  },

updateOrAdd(entity){
    if(entity.userId){
      return axios.put("user",entity);
    }else {
      return axios.post("user",entity);
    }
},
  findById(id){
    return axios.get(`user/${id}`)
  },
  deleteByIds(id){
     return axios.delete(`user/${id}`)
  },
  findRoleByUSerId(userId){
    return axios.get(`user/${userId}/roles`)
  },

  deleteRoleByRoleIdAndUserId(userId,roleId){
    return axios.delete(`user/${userId}/role/${roleId}`);
  }
};
export  default  user;

