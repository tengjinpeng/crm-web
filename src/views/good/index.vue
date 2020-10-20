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
<!--动态显示列-->
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="商品编号">
            <span>{{ props.row.goodCode }}</span>
          </el-form-item>
          <el-form-item label="商品名字">
            <span>{{ props.row.goodName}}</span>
          </el-form-item>
          <el-form-item label="商品型号">
            <span>{{ props.row.goodModel}}</span>
          </el-form-item>
          <el-form-item label="所属分类">
            <span>{{ props.row.typeId}}</span>
          </el-form-item>
          <el-form-item label="商品单位">
            <span>{{ props.row.goodUnit}}</span>
          </el-form-item>
          <el-form-item label="采购价格">
            <span>{{ props.row.lastPurchasingPrice}}</span>
          </el-form-item>
          <el-form-item label="销售价格">
            <span>{{ props.row.sellPrice}}</span>
          </el-form-item>
          <el-form-item label="库存数量">
            <span>{{ props.row.storeNum}}</span>
          </el-form-item>
          <el-form-item label="库存下线">
            <span>{{ props.row.minStoreNum}}</span>
          </el-form-item>
          <el-form-item label="商品状态">
            <span>{{ props.row.state}}</span>
          </el-form-item>
          <el-form-item label="生产厂商">
            <span>{{ props.row.producer}}</span>
          </el-form-item>
          <el-form-item label="备注">
            <span>{{ props.row.remarks}}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      prop="goodCode"
      label="ID"
      width="180"
      show-overflow-tooltip
      align="center"
    >
    </el-table-column>
    <el-table-column
      prop="goodName"
      label="商品名称"
      align="center"
    >
    </el-table-column>
    <el-table-column
      prop="goodModel"
      label="商品模型"
      align="center"
    >
    </el-table-column>
    <el-table-column
      prop="typeId"
      label="商品类型"
      align="center"
    >
    </el-table-column>
    <el-table-column
      prop="goodUnit"
      label="商品单位"
      align="center"
    >
    </el-table-column>



    <el-table-column
      label="操作"
      align="center"
    >
      <!--插槽获取id值-->
      <template v-slot="obj">
        <el-button type="warning" icon="el-icon-edit" size="mini" @click="createDialog=true,findById(obj.row.goodCode)"></el-button>
        <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteDialog=true,delByid=obj.row.goodCode"></el-button>
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
            <el-row>
              <el-col :span="12">
                <el-form-item label="商品名字">
                <el-input type="text" v-model="formData.goodName"/>
              </el-form-item></el-col>
              <el-col :span="12">
                <el-form-item label="商品型号">
                  <el-input type="text" v-model="formData.goodModel"/>
                </el-form-item>
              </el-col>
            </el-row>

      <el-row>
        <!--级联选择器-->
        <el-col :span="12">
          <el-form-item label="所属分类">
            <el-cascader
             @change="getLastChildren"
              :props="props"
              :options="categoryList"

              ></el-cascader>
            </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商品单位">
            <!--下拉框-->
            <!--<el-select v-model="formData.goodUnit" placeholder="请选择单位">-->
              <!--<el-option-->
                <!--v-for="item in categoryList"-->
                <!--:key="item.value"-->
                <!--:label="item.label"-->
                <!--:value="item.value">-->
              <!--</el-option>-->
            <!--</el-select>-->
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="采购价格">
            <el-input type="text" v-model="formData.lastPurchasingPrice"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="销售价格">
          <el-input type="text" v-model="formData.sellPrice"/>
        </el-form-item>
        </el-col>
      </el-row>


      <el-row>
        <el-col :span="12">
          <el-form-item label="库存数量">
            <el-input type="text" v-model="formData.storeNum"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="库存下线">
            <el-input type="text" v-model="formData.minStoreNum"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="商品状态">
          <el-input type="text" v-model="formData.state"/>
        </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="生产厂商">
          <el-input type="text" v-model="formData.producer"/>
        </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="备注">
        <el-input type="text" v-model="formData.remarks"/>
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
