import  axios from '../utils/myaxios'
let category ={

  findAll(){
    return axios.get(`menu/menuTree`)
  },

updateOrAdd(entity){
    if(entity.menuId){
      return axios.put("menu",entity);
    }else {
      return axios.post("menu",entity);
    }
},
  findById(id){
    return axios.get(`menu/${id}`)
  },
  deleteByIds(id){
     return axios.delete(`menu/${id}`)
  }
};
export  default  category;

