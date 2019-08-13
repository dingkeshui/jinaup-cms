<template>
  <div class="box flex">
  	<div class="pad10 flex">
  		<div class="flex1">
        <span class="on">专题标题:</span>
	  		<span class="colaaa">{{goodsdata.title}}</span>
		  </div>
      <div>
        <el-button @click="addgoods" size="small" type="primary">添加商品</el-button>
        <el-button size="small" @click="closepage" type="primary" icon="el-icon-back">返回</el-button>
      </div>
  	</div>
  	<div class="flex1">
  		<el-table
          :data="list"
          border
          stripe
          height="100%"
          @selection-change="handleSelectionChange"
          style="width: 100%">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              type="index"
              label="排序"
              width="50">
            </el-table-column>
            <el-table-column
              prop="pid"
              label="商品ID"
              width="80">
            </el-table-column>
            <el-table-column
              prop="productInfoVo.title"
              label="商品名称">
            </el-table-column>
            <el-table-column
              prop="pid"
              label="商品图片"
              width="120">
              <template slot-scope="scope">
                <img v-if="scope.row.productInfoVo" class="w100" :src="scope.row.productInfoVo.mainImgUrl">
              </template>
            </el-table-column>
            <el-table-column
              prop="sortId"
              label="商品排序">
            </el-table-column>
            <el-table-column
              fixed="right"
              width="120"
              label="操作">
              <template slot-scope="scope">
                <div class="mgb5"><el-button type="primary" @click="changebut(scope.row)" class="minbut" size="small">编辑</el-button></div>
                <div class="mgb5"><el-button @click="remove(scope.row)" type="warning" class="minbut" size="small">删除</el-button></div>
              </template>
            </el-table-column>
         </el-table>
  	</div>
  	<div class="minfoot">
        <el-pagination
          background
          page-size="20"
          @current-change="pageChange"
          :total="page.num"
          layout="total, prev, pager, next, jumper">
        </el-pagination>
    </div>
    <el-dialog
      title="添加商品"
      :visible="showgoodslist"
      width="80%"
      class="mg5vh"
      @close="clospagegoods">
      <goodslist @closepage="clospagegoods" v-model="goodslitem" itemdata="choose"></goodslist>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
import goodslist from '@/components/goods/goodslist'

export default {
  name: 'spegoods',
  props:['goodsdata'],
  components:{
    goodslist
  },
  data () {
  	return {
      // 显示商品列表页面
      showgoodslist:false,
      // 商品列表选中的商品
      goodslitem:'',
  		searchData:{
  			pid:''
  		},
  		postData:{
  			pageIndex:1,
        tid:this.goodsdata.tid
  		},
  		list:'',
      page:{
        num:''
      }
  	}
  },
  created(){
  	this.getList()
  },
  methods:{
    // 关闭
    clospagegoods () {
      console.log('关闭商品列表页面')
      this.showgoodslist = false
    },
  	// 获取专题商品列表
  	getList () {
  		console.log('获取专题商品列表')
  		console.log(this.postData)
  		this.$api.topicProList(this.postData,(data)=>{
  			console.log(data)
  			if (data.status == 200) {
  				if (data.data.res_code==1) {
					  this.list = data.data.result
			    } else {
			    	this.list= ""
			    }
          this.page.num = data.data.total
  			} else {
  				this.$message({
  					showClose:true,
  					message:'获取专题商品列表失败',
  					type:'error'
  				})
  			}
  			
  		})
  	},
    // 编辑
    changebut(item){
      this.$prompt('请输入排序', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(async ({ value }) => {
          this.$api.topicProUpdata({tpid:item.tpid,sortId:value},data=>{
            console.log(data)
            if(data.data.res_code==1){
              this.$message({
                showClose:true,
                message:'修改成功',
                type:'success'
              })
              this.getList()
            }else{
              this.$message({
                showClose:false,
                message:'修改失败',
                type:'error'
              })
            }
          })
        }).catch(() => {
              
        });
    },
    // 删除
    remove(item){
      console.log('删除')
      this.$confirm('确认将该商品删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          this.$api.topicProDel({tpid:item.tpid},data=>{
            if(data.data.res_code==1){
              this.$message({
                showClose:true,
                message:'删除成功',
                type:'success'
              })
              this.getList()
            }else{
              this.$message({
                showClose:false,
                message:'删除失败',
                type:'error'
              })
            }
          })
        }).catch(() => {
                
        });
    },
    // 跳页
    pageChange(data){
      this.postData.pageIndex = data
      this.getList()
    },
    // 增加商品
    addgoods(){
      this.showgoodslist = true
    },
    // 关闭页面
    closepage () {
      this.$emit('closepage')
    }
  },
  watch:{
    goodslitem(val){
      console.log('goodslitem',val)
      let req = {tid:this.goodsdata.tid,pid:val.pid,sortId:'1'}
      console.log(req)
      this.$api.topicProAdd(req, data=>{
        console.log(data)
        if (data.data.res_code==1) {
          this.$message({
            showClose:true,
            type:'success',
            message:"商品增加成功"
          })
          this.getList()
        } else {
          this.$message({
            showClose:true,
            type:'error',
            message:"商品增加失败"
          })
        }
      })
    }
  }
}
</script>

<style type="text/css" scoped>
.box{
	height: 100%;
	width: 100%;
	background-color: #fff;
}
.w100{
  max-width: 100px;
  max-height: 100px;
}
</style>
