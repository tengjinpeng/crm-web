<template>
<div class="category-wrapper">
  <div class="execute-box">
    <el-button size="mini" plain
               @click="createDialog=true,formData={},imageUrl='',roleIds=[]">添加</el-button>

  </div>
  <el-table
    :data="tableData"
    border
    highlight-current-row
    stripe
    style="width: 100%">
    <el-table-column
      prop="userId"
      label="ID"
      width="66"
      align="center"
    >

    </el-table-column>
    <el-table-column
      prop="userName"
      label="用户名"
      width="180"
      align="center"
    >
    </el-table-column>
    <el-table-column
      prop="nickName"
      label="昵称"
      align="center"
    >
    </el-table-column>
    <el-table-column
      prop="email"
      label="用户邮箱"
      show-overflow-tooltip
      align="center"
    >
    </el-table-column>
    <el-table-column
      prop="phone"
      label="联系方式"
      show-overflow-tooltip
      align="center"
    >
    </el-table-column>
    <el-table-column
      prop="sex"
      label="性别"
      align="center"
    >
      <template v-slot="x">
        <span v-if="x.row.sex==0">男</span>
        <span v-else>女</span>
      </template>
    </el-table-column>
    <el-table-column
      label="头像"
      align="center">
    <template v-slot="obj">
   <template>
     <el-avatar shape="square" :size="50" :fit="fit" :src="obj.row.avatar"></el-avatar>
   </template>
    </template>
    </el-table-column>
    <el-table-column
      label="是否离职"
      align="center">
      <template v-slot="obj">
      <el-tag type="success" v-if="obj.row.delFlag==0">在职</el-tag>
        <el-tag type="danger" v-else>离职</el-tag>
      </template>

    </el-table-column>
    <el-table-column
      label="帐号状态"
      align="center">
      <template v-slot="obj">
        <el-switch
          @change="AccountStatus(obj.row)"
          v-model="obj.row.status"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
      </template>
    </el-table-column>


    <el-table-column
      label="操作"
      align="center"
      width="180"
    >
      <template v-slot="obj">
        <el-button type="warning" icon="el-icon-edit" size="mini" @click="createDialog=true,findById(obj.row.userId)"></el-button>
        <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteDialog=true,delByid=obj.row.userId"></el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-pagination style="text-align: center;margin-top: 30px"
    background
    layout="prev, pager, next"
    :current-page="currentPage"
    :page-size="pageSize"
    :total="total"
   @current-change="pageChange"
  >
  </el-pagination>
  <!--弹框-->
  <el-dialog
    title="提示"
    :visible.sync="createDialog"
    width="30%">
    <el-form ref="form" :model="formData"  label-width="80px" >

        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="基础数据" name="first">
            <el-form-item label="用户名" prop="userName">
              <el-input v-model="formData.userName"></el-input>
            </el-form-item>
            <el-form-item label="昵称" prop="nickName">
              <el-input v-model="formData.nickName"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="formData.email"></el-input>
            </el-form-item>
            <el-form-item label="联系方式" prop="phone">
              <el-input v-model="formData.phone"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <template>
                <el-radio-group v-model="formData.sex">
                  <el-radio label="0">男</el-radio>
                  <el-radio label="1">女</el-radio>

                </el-radio-group>
              </template>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="员工状态" name="second">
            <el-form-item label="是否可用" >
              <el-switch
                v-model="formData.status"
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
            </el-form-item>
            <el-form-item label="是否离职" >
              <el-tag type="info" v-if="formData.delFlag==2">离职状态</el-tag>
              <el-tag type="info" v-else>在职状态</el-tag>
            </el-form-item>
            <el-form-item label="用户头像" prop="avatar">
              <el-upload
                class="avatar-uploader"
                action="http://localhost:8080/upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="角色添加" name="third">
            <div v-if="formData.userId">
              <h3>已有角色</h3>
              <el-tag
                style="margin-right: 5px"
                v-for="role in userRoles"
                :key="role.roleId"
                closable
                @close="deleteRoleByRoleIdsAndUserId(role.roleId)"
                type="success">
                {{role.roleName}}
              </el-tag>
            </div>
            <div>
              <h3>分配角色</h3>
              <el-select v-model="roleIds"  multiple placeholder="请选择">
                <el-option
                  v-for="item in  roles"
                  :key="item.roleId"
                  :label="item.roleName"
                  :value="item.roleId">
                </el-option>
              </el-select>

            </div>

          </el-tab-pane>
          <el-tab-pane label="备注信息" name="fourth">
            <el-form-item label="用户备注">
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入内容"
                v-model="formData.remark">
              </el-input>
            </el-form-item>
          </el-tab-pane>
        </el-tabs>



    </el-form>
    <span slot="footer" class="dialog-footer" v-if="activeName=='fourth'">
    <el-button @click="createDialog=false">取 消</el-button>
    <el-button type="primary" @click="createDialog=false,addOrUpdate()">确 定</el-button>
  </span>
  </el-dialog>


  <el-dialog
    title="提示"
    :visible.sync="deleteDialog"
    width="30%">
    <span>确定要删除吗?</span>
    <span slot="footer" class="dialog-footer">
    <el-button @click="deleteDialog=false">取 消</el-button>
    <el-button type="primary" @click="deleteDialog=false,deleteById()">确 定</el-button>
  </span>
  </el-dialog>

</div>
</template>

<script>
import obj from './index.js'
export default obj

</script>

<style scoped lang="scss">
@import "./index";
</style>
