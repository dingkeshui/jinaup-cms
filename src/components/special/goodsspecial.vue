<template>
	<div class="box">
		<div class="maincontent">
			<div class="tablebox">
				<el-table
					:data="list"
					border
					stripe
					height="100%">
					<el-table-column
	                  type="index"
	                  label="排序"
	                  width="50">
	                </el-table-column>
	                <el-table-column
	                  prop="title"
	                  label="专题标题">
	                </el-table-column>
	                <el-table-column
	                  prop="id"
	                  label="专题ID">
	                </el-table-column>
	                <el-table-column
	                  prop="productName"
	                  label="商品标题">
	                </el-table-column>
	                <el-table-column
	                  prop="pid"
	                  label="商品ID">
	                </el-table-column>
	                <el-table-column
	                  width="120"
	                  label="专题状态">
	                  <template slot-scope="scope">
	                  	<el-tag v-if="scope.row.status==1" type="success" size="small">上线中</el-tag>
	                  	<el-tag v-else type="danger" size="small">下线中</el-tag>
	                  </template>
	                </el-table-column>
	                <el-table-column
	                  fixed="right"
	                  width="100"
	                  align="center"
	                  label="操作">
	                  <template slot-scope="scope">
	                    <div class="mgb5"><el-button class="minbut" type="primary" @click="choose(scope.row)" size="small">选择</el-button></div>
	                  </template>
	                </el-table-column>
				</el-table>
			</div>
		</div>
		<div class="minfoot">
	      <el-pagination
	        background
	        :total="page.num"
        	page-size="20"
        	@current-change="pageChange"
	        layout="total, prev, pager, next, jumper">
	      </el-pagination>
	    </div>
	</div>
</template>

<script type="text/javascript">
export default {
	data () {
		return {
			postData:{
				pageIndex:1
			},
			list:'',
			page:{
				num:0
			}
		}
	},
	created(){
		this.getlist()
	},
	methods:{
		// 获取列表
	  	getlist () {
	  		let that = this
	  		that.$api.goodsSpecialList(that.postData,(data)=>{
	  			console.log('商品专题',data)
	  			if (data.status==200) {
	  				if(data.data.res_code==1){
	  					that.list=data.data.result
	  				}else{
	  					that.list=""
	  				}
	          		this.page.num = data.data.total
	  			} else {
	  				that.$message({
	  					showClose:true,
	  					message:'专题列表获取失败',
	            		type:'error'
	  				})
	  			}
	  		})
	  	},
		// 页面改变
	    pageChange (item) {
	      this.postData.pageIndex = item
	      this.getlist()
	    },
	    // 选择
	    choose(item){
	      this.$emit('input',item)
	      this.closepageitem()
	    },
	    // 关闭本页面
	    closepageitem(){
	      this.$emit('closepage')
	    }
	}
}
</script>

<style type="text/css" scoped>
.box{
	height: 100%;
	width: 100%;
	display: flex;
  flex-direction: column;
}
.maincontent{
  flex: 1;
  width: 100%;
  overflow: hidden;
  position: relative;
}
.minfoot{
  padding: 10px;
  border-top: 1px solid #ccc;
  text-align: right;
}
.tablebox{
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>