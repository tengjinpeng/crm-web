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
      prop="id"
      label="ID"
      width="180"
      align="center"
    >

    </el-table-column>
    <el-table-column
      prop="name"
      label="名称"
      width="180"
      align="center"
    >
    </el-table-column>
    <el-table-column
      prop="contact"
      label="联系人"
      align="center"
    >
    </el-table-column>
    <el-table-column
      prop="phone"
      label="联系人"
      align="center"
    >
    </el-table-column>
    <el-table-column
      prop="remark"
      label="备注"
      align="center"
    >
    </el-table-column>

    <el-table-column
      label="操作"
      align="center"
    >
      <template v-slot="obj">
        <el-button type="warning" icon="el-icon-edit" size="mini" @click="createDialog=true,findById(obj.row.id)"></el-button>
        <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteDialog=true,delByid=obj.row.id"></el-button>
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
    <el-form ref="form" :model="formData" label-width="80px">
      <el-form-item label="供应商">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="联系人">
        <el-input v-model="formData.contact"></el-input>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input v-model="formData.phone"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="formData.remark"></el-input>
      </el-form-item>
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
