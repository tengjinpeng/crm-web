import  obj from '../../api/menu'

import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

let category={
  components: { Treeselect },
  created(){
   this.findAlls();
  },
  data(){
    return {
      tableData: [],
      createDialog:false,
      formData:{
        menuType:"M"
      },
      deleteDialog:false,
      delByid:0,
      treeMenuList:[
        {
          menuId:0,
          menuName:"主目录",
          children:[],
        }
      ],
      normalizer(node){
        if(node.children==null||node.children.length==0){
          delete  node.children;
        }
        return{
          id:node.menuId,
          label:node.menuName,
        }
      },
    }
  },
  methods:{

    async findAlls(){
      this.tableData= await obj.findAll();
      //赋值树形组件
      this.$nextTick(()=> this.treeMenuList[0].children=this.tableData);

      if(this.tableData.records==0&&this.currentPage!=1){
        this.currentPage=this.currentPage-1;
          this.findAlls();
      }



    },


    async addOrUpdate() {
     await obj.updateOrAdd(this.formData);
     this.findAlls();
      this.formData={};
    },
    async findById(id){
      this.formData=await obj.findById(id);
    },
    async deleteById(){
       await  obj.deleteByIds(this.delByid);
       this.findAlls();
    },


  },
};


export  default category;
