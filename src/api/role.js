import  axios from '../utils/myaxios'
let category ={

  findAll(){
    return axios.get(`role`)
  },

updateOrAdd(entity){

    if(entity.roleId){
      return axios.put("role",entity);
    }else {
      return axios.post("role",entity);
    }
},
  findById(id){
    return axios.get(`role/${id}`)
  },
  deleteByIds(id){
     return axios.delete(`role/${id}`)
  }
};
export  default  category;

