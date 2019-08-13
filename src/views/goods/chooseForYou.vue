<template>
  <div class="max flex2">
    <div class="pad10 flex">
      <div class="flex1"></div>
      <div>
        <el-button @click="addgoods" type="primary" size="small">添加商品</el-button>
      </div>
    </div>
    <div class="maincontent">
      <div class="tablebox">
        <el-table
          :data="list"
          ref="multipleTable"
          border
          stripe
          height="100%"
          style="width: 100%">
          <el-table-column
            type="index"
            label="排序"
            width="50">
          </el-table-column>
          <el-table-column
            prop="pid"
            label="商品ID"
            width="100">
          </el-table-column>
          <el-table-column
            prop="title"
            label="商品标题"
            min-width="150">
          </el-table-column>
          <el-table-column
            label="产品主图片"
            width="120">
            <template slot-scope="scope">
                <img class="headimg" :src="scope.row.mainImgUrl">
            </template>
          </el-table-column>
          <el-table-column
            prop="salesPrice"
            label="商品售价"
            min-width="100">
          </el-table-column>
          <el-table-column
            prop="supplyPrice"
            label="供货价"
            min-width="100">
          </el-table-column>
          <el-table-column
            prop="sortId"
            label="商品排序"
            width="80">
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="90">
            <template slot-scope="scope">
              <div class="mgb5"><el-button @click="removebut(scope.row)" size="small" type="danger">删除</el-button></div>
              <div><el-button @click="changebut(scope.row)" size="small" type="warning">更新</el-button></div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="pad10" style="text-align:right;">
      <el-pagination
        background
        page-size="20"
        @current-change="pageChange"
        :total="page.num"
        layout="total, prev, pager, next, jumper">
      </el-pagination>
    </div>
    <!-- 选择商品 -->
    <el-dialog
        title="选择商品"
        :visible.sync="dialogVisible"
        width="80%"
        class="mg5vh"
        @close="clospageCom"
        :before-close="handleClose">
        <goods @closepage="clospageCom"  v-model="goodsitem" itemdata="choose"></goods>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
import goods from '@/components/goods/goodslist.vue'

export default {
  name: 'chooseforyou',
  components:{
    goods
  },
  data () {
  	return {
      // 选中的商品
      goodsitem:'',
      postData:{
        pageIndex:1
      },
  		list:'',
      page:{
        num:''
      },
      // 显示选择商品
      dialogVisible:false
  	}
  },
  created () {
  	this.getList()
  },
  watch:{
    goodsitem(val){
      if(val){
        this.$api.homeChoiceAdd({pid:val.pid},data=>{
          console.log('添加商品',data)
          if(data.data.res_code==1){
            this.$message({
              showClose:true,
              message:'添加商品成功',
              type:'success'
            })
            this.getList()
          }else{
            this.$message({
              showClose:true,
              message:'添加商品失败',
              type:'error'
            })
          }
        })
      }
    }
  },
  methods:{
    getList(){
      console.log('获取为你精选列表',this.postData)
      this.$api.homeChoiceList(this.postData,data=>{
        console.log(data)
        if(data.status==200){
          if(data.data.res_code==1){
            this.list = data.data.result
          }else{
            this.list = ''
          }
          this.page.num = data.data.total
        }else{
          this.$message({
            showClose:true,
            message:'为你精选列表获取失败',
            type:'error'
          })
        }
      })
    },
    addgoods(){
      this.dialogVisible = true
    },
    // 修改
    changebut(item){
      this.$prompt('请输入商品排序(越小越靠前)', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(async ({ value }) => {
          this.$api.homeChoiceUp({phcid:item.phcid,sortId:value},data=>{
            console.log(data)
            if(data.data.res_code==1){
              this.$message({
                showClose:true,
                message:'商品更新成功',
                type:'success'
              })
              this.getList()
            }else{
              this.$message({
                showClose:true,
                message:'商品更新失败',
                type:'error'
              })
            }
          })
        }).catch(() => {
          
        })
    },
    // 删除
    removebut(item){
      this.$confirm('确认将此商品删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          this.$api.homeChoiceDel({phcid:item.phcid},data=>{
            console.log(data)
            if(data.data.res_code==1){
              this.$message({
                showClose:true,
                message:'商品删除成功',
                type:'success'
              })
              this.getList()
            }else{
              this.$message({
                showClose:true,
                message:'商品删除失败',
                type:'error'
              })
            }
          })
        }).catch(() => {
                    
        })
    },
  	pageChange(item){
      this.postData.pageIndex = item
      this.getList()
    },
    clospageCom(){
      this.dialogVisible = false
    }
  }
}
</script>

<style type="text/css" scoped>
.max{
	width: 100%;
	height: 100%;
	background-color: #fff;
}
.headimg{
  max-height: 100px;
  max-width: 100px;
}
</style>
