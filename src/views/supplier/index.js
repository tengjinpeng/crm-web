import  obj from '../../api/supplier'

let category={
  created(){

   this.findPage()
  },
  data(){
    return {
      tableData: [],
      currentPage:1,
      pageSize:5,
      total:0,
      createDialog:false,
      formData:{},
      deleteDialog:false,
      delByid:0
    }
  },
  methods:{
  //  分页查询
    async findPage(){
      let e= await obj.findPage(this.currentPage,this.pageSize);
      console.log(e.records)
          this.tableData=e.records;
          this.total=e.total;
      //删除时页面数据为空，页面递减逻辑
      if(e.records==0&&this.currentPage!=1){
        this.currentPage=this.currentPage-1;
          this.findPage();
      }
    },
    pageChange(page){
      console.log(page)
      this.currentPage=page;
      this.findPage();
    },

    async addOrUpdate() {
     await obj.updateOrAdd(this.formData);
     this.findPage();
      this.formData={};
    },
    async findById(id){
      this.formData=await obj.findById(id);
    },
    async deleteById(){
       await  obj.deleteByIds(this.delByid);
       this.findPage()
    }

  },
};


export  default category;
