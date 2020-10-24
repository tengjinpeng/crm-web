import  obj from '../../api/role'
import  menu from '../../api/menu'
let category={
  created(){

   this.findAll()
    this.findAllMenu();
  },
  data(){
    return {
      tableData: [],
      createDialog:false,
      formData:{},
      deleteDialog:false,
      delByid:0,
      menuList:[],
      defaultProps: {
        children: 'children',
        label: 'menuName'
      }
    }
  },
  methods:{

    async findAll(){
      let e= await obj.findAll();
      console.log(e);
          this.tableData=e
      //删除时页面数据为空，页面递减逻辑
      if(e.records==0&&this.currentPage!=1){
        this.currentPage=this.currentPage-1;
          this.findAll();
      }
    },

    async addOrUpdate() {
      console.log(this.$refs.tree.getCheckedKeys()) ;
      console.log(this.$refs.tree.getHalfCheckedKeys());
      this.formData.menuIds=this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys());
     await obj.updateOrAdd(this.formData);
      this.formData={};
      this.$refs.tree.setCheckedKeys([]);
      this.findAll();
      },
    async findById(id){
      this.formData=await obj.findById(id);
      this.$refs.tree.setCheckedKeys(this.formData.menuIds);
      },
    async deleteById(){
       await  obj.deleteByIds(this.delByid);
       this.findAll()
    },
    async findAllMenu(){
      this.menuList=await  menu.findAll();
    }

  },
};


export  default category;
