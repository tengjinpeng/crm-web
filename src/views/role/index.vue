<template>
<div class="category-wrapper">
  <div class="execute-box">
    <el-button size="mini" plain @click="createDialog=true,formData={}">添加</el-button>

  </div>
  <el-table
    :data="tableData"
    border
    highlight-current-row
    stripe
    style="width: 100%">
    <el-table-column
      prop="roleId"
      label="ID"
      width="180"
      align="center"
    >

    </el-table-column>
    <el-table-column
      prop="roleName"
      label="角色名"
      width="180"
      align="center"
    >
    </el-table-column>
    <el-table-column
      prop="roleSort"
      label="角色权重"
      align="center"
    >
    </el-table-column>
    <el-table-column
      prop="remark"
      label="角色备注"
      align="center"
    >
    </el-table-column>

    <el-table-column
      label="操作"
      align="center"
    >
      <template v-slot="obj">
        <el-button type="warning" icon="el-icon-edit" size="mini" @click="createDialog=true,findById(obj.row.roleId)"></el-button>
        <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteDialog=true,delByid=obj.row.roleId"></el-button>
      </template>
    </el-table-column>
  </el-table>


  <!--弹框-->
  <el-dialog
    title="提示"
    :visible.sync="createDialog"
    width="30%">
    <el-form ref="form" :model="formData" label-width="80px">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="角色名称">
            <el-input v-model="formData.roleName"></el-input>
          </el-form-item>
          <el-form-item label="角色排序">
            <el-input v-model="formData.roleSort"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="formData.remark"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <h3>分配权限</h3>
          <el-scrollbar>
            <el-tree
              ref="tree"
              :data="menuList"
              show-checkbox
              node-key="menuId"
              :default-expand-all="true"
              :props="defaultProps">
            </el-tree>
          </el-scrollbar>
        </el-col>

      </el-row>

    </el-form>
    <span slot="footer" class="dialog-footer">
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
