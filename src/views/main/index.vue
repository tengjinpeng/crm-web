<template>
    <div class="main-wrapper">
      <el-container>

        <el-aside width="200px">
          <div class="aside-title">
          <img src="@/assets/a.jpg"   alt="" width="40px">
            <span>CRM后台</span>
          </div>
          <!--菜单栏
           default-active: 默认选中哪个选项  text-color :文本颜色
          -->
         <el-scrollbar>
           <el-menu
             default-active="9"
             class="el-menu-vertical-demo"
             text-color="#303133"
             active-text-color="#409EFF"
             router
           >

             <el-menu-item index="9">
               <i class="el-icon-eleme"></i>
               <span slot="title">系统首页</span>
             </el-menu-item>

             <el-submenu index="1">
               <template slot="title">
                 <i class="el-icon-location"></i>
                 <span>基础数据</span>
               </template>
               <el-menu-item index="/main/good">
                 <i class="el-icon-menu"></i>
                 <span slot="title">商品管理</span>
               </el-menu-item>
               <el-menu-item index="/main/category">
                 <i class="el-icon-menu"></i>
                 <span slot="title">分类管理</span>
               </el-menu-item>
               <el-menu-item index="/main/customer">
                 <i class="el-icon-menu"></i>
                 <span slot="title">客户管理</span>
               </el-menu-item>
               <el-menu-item index="/main/supplier">
                 <i class="el-icon-menu"></i>
                 <span slot="title">运营商管理</span>
               </el-menu-item>
               <el-menu-item index="/main/unit">
                 <i class="el-icon-menu"></i>
                 <span slot="title">单位管理</span>
               </el-menu-item>
             </el-submenu>
             <el-submenu index="2">
               <template slot="title">
                 <i class="el-icon-location"></i>
                 <span>系统管理</span>
               </template>
               <el-menu-item index="/main/user">
                 <i class="el-icon-menu"></i>
                 <span slot="title">用户管理</span>
               </el-menu-item>
               <el-menu-item index="/main/role">
                 <i class="el-icon-menu"></i>
                 <span slot="title">角色管理</span>
               </el-menu-item>
               <el-menu-item index="/main/menu">
                 <i class="el-icon-menu"></i>
                 <span slot="title">权限管理</span>
               </el-menu-item>
             </el-submenu>

           </el-menu>
         </el-scrollbar>
        </el-aside>

        <el-container>
          <el-header>
            <span>秋天的第一杯奶茶</span>
          </el-header>
            <!--中部主页面-->
          <el-main>
            <div class="main-box">
              <router-view/>
            </div>
          </el-main>

        </el-container>
      </el-container>


    </div>
</template>

<script>
    export default {
        name: "index"
    }
</script>

<style scoped lang="scss">
  .main-wrapper{
    height: 100%;
  }

  .el-header {
    background-color: #FF4079;
    text-align: center;
    line-height: 60px;
    span{
      color:white;
      font-size: 18px;
     font-weight: 700;
    }
  }
  /*侧边栏设置*/
  .el-aside{
    color: #333;
    line-height: 200px;
    .el-scrollbar{
      height: calc(100% - 60px);
    }
    .aside-title{
      height: 60px;
      width: 100%;
      background-color: #FF4079;
      line-height: 60px;
    }
    img{
      margin-left: 20px;
      vertical-align: middle;
      margin-right: 8px;
      border-radius: 50%;
    }
    span{
      font-size: 16px;
      font-weight: 700;
    }
  }



  .el-main {
    background-color: #EEE;
    color: #333;
    padding: 10px;
    .main-box{
      width: 100%;
      background-color:white;
      padding: 20px;
      box-sizing: border-box;
    }
  }
  .el-container {
    height: 100%;
  }




</style>
