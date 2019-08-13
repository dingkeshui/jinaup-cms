<template>
  <div class="box flex">
  	<div class="pad10 flex">
  		<div class="flex1">
	  		<el-input
	  			size="small"
				placeholder="请输入产品ID"
				v-model="searchData.pid"
				style="width:200px;"
				clearable>
			</el-input>
		</div>
		<div>
			<el-button @click="searchfun" size="small" type="primary" icon="el-icon-search">搜索</el-button>
		</div>
  	</div>
  	<div class="flex1" style="position: relative;">
      <div class="tablebox">
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
              fixed
              width="50">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作">
              <template slot-scope="scope">
              <div class="mgb5"><el-button @click="lookorder(scope.row)" class="minbut" size="small">详细信息</el-button></div>
              <div class="mgb5"><el-button @click="lookorder(scope.row)" class="minbut" size="small">编辑</el-button></div>
              <div v-if="scope.row.state>0" class="mgb5"><el-button @click="removeProduct(scope.row)" type="warning" class="minbut" size="small">下线</el-button></div>
              </template>
            </el-table-column>
         </el-table>
        </div>
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
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'goodsEvaluate',
  data () {
  	return {
  		searchData:{
  			pid:''
  		},
  		postData:{
  			pageIndex:1
  		},
  		list:'',
      page:{
        num:""
      }
  	}
  },
  created(){
  	this.getList()
  },
  methods:{
  	// 获取评价列表
  	getList () {
  		console.log('获取评价列表')
  		console.log(this.postData)
  		this.$api.commentsList(this.postData,(data)=>{
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
  					message:'获取评价列表失败',
  					type:'error'
  				})
  			}
  			
  		})
  	},
    pageChange(item){
      this.postData.pageIndex = item
      this.getList()
    },
  	// 搜索
  	searchfun () {
  		console.log('搜搜')
  		this.postData.pid = this.searchData.pid
  		this.postData.pageIndex = 1
  		this.getList()
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
</style>
