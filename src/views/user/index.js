import  obj from '../../api/user'
import  role from '../../api/role'
import axios from '../../utils/myaxios'

let category={
  created(){

   this.findPage()
    this.findAllrole();
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
      delByid:0,
      imageUrl:'',
      fit:'',
      activeName: 'first',
      textarea2: '',
      roles:[],
      roleIds:[],
      userRoles:[]


    }
  },
  methods:{
  //  分页查询
    async findPage(){
      let e= await obj.findPage(this.currentPage,this.pageSize);
      console.log(e.records);
          this.tableData=e.records;
          this.total=e.total;
      if(e.records==0&&this.currentPage!=1){
        this.currentPage=this.currentPage-1;
          this.findPage();
      }
    },
    pageChange(page){
      console.log(page);
      this.currentPage=page;
      this.findPage();
    },

    async addOrUpdate() {
      this.userRoles.forEach(item=> this.roleIds.push(item.roleId));
      this.formData.roleIds=this.roleIds.join("A");
      this.roleIds=[];
     await obj.updateOrAdd(this.formData);
     this.findPage();
      this.formData={};
      this.imgeUr=""
    },
    async findById(id){
      this.formData=await obj.findById(id);
      this.imageUrl=this.formData.avatar;//编辑图片回显

     this.findRoleByUSerId(id);//获取用户角色列表

    },

    async deleteById(){
       await  obj.deleteByIds(this.delByid);
       this.findPage()
    },
    //账户状态更新
   async AccountStatus(obj){
      console.log(this.tableData[0].status);
    await axios.put(`user`,obj);
     this.$message.success("更新状态成功")
    },
    //上传成功之后
    handleAvatarSuccess(res, file) {
      console.log(res);
      this.imageUrl = res.data;//回显到弹框
      this.formData.avatar=res.data;//回显到表格
    },
    //上传之前验证
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpg'||'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG或者png或者jpeg 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    //标签页
    handleClick(tab, event) {},
  //  获取角色列表
    async findAllrole(){
      this.roles =await role.findAll();
    },
  //  通过roleId 进行角色删除
    async  deleteRoleByRoleIdsAndUserId(roleId){
     await  obj.deleteRoleByRoleIdAndUserId(this.formData.userId,roleId);
     //删除几个 下拉框动态显示几个
      this.findAllrole();
      this.findRoleByUSerId(this.formData.userId);
    },

    //显示可选角色（删除用户已有角色）
    async findRoleByUSerId(userId){
      this.userRoles= await  obj.findRoleByUSerId(userId);//查所有角色
      this.userRoles.forEach(item=>{
        this.roles.splice(this.roles.findIndex(item1=>item1.roleId==item.roleId),1);
      });
    },

  },
};


export  default category;
