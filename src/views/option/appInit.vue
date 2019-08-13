<template>
	<div class="box bgfff flex2">
		<div class="flex1" style="position:relative;">
	        <div class="tablebox">
	  			<el-table
		          :data="list"
		          border
		          stripe
		          height="100%"
		          style="width: 100%">
		          <el-table-column
		          	fixed="left"
			        type="index"
			        width="55">
			      </el-table-column>
			      <el-table-column
		            prop="iosReviewVersion"
		            label="IOS进审版本">
		          </el-table-column>
		          <el-table-column
		            prop="iosMaxVersion"
		            label="IOS线上版本">
		          </el-table-column>
		          <el-table-column
		            prop="iosUpdateMust"
		            label="IOS强制更新">
		            <template slot-scope="scope">
		            	<el-tag v-if="scope.row.iosUpdateMust<1">非强制</el-tag>
		            	<el-tag v-else type="danger">强制</el-tag>
		            </template>
		          </el-table-column>
		          <el-table-column
		            prop="iosUpdateTips"
		            label="IOS升级提示">
		          </el-table-column>
		          <el-table-column
		            prop="androidMiReviewVersion"
		            label="安卓小米进审版本">
		          </el-table-column>
		          <el-table-column
		            prop="androidAliReviewVersion"
		            label="安卓阿里进审版本">
		          </el-table-column>
		          <el-table-column
		            prop="androidMaxVersion"
		            label="安卓线上版本">
		          </el-table-column>
		          <el-table-column
		            label="安卓强制升级">
		            <template slot-scope="scope">
		            	<el-tag v-if="scope.row.androidUpdateMust<1">非强制</el-tag>
		            	<el-tag v-else type="danger">强制</el-tag>
		            </template>
		          </el-table-column>
		          <el-table-column
		            prop="androidUpdateTips"
		            label="安卓升级提示">
		          </el-table-column>
		          <el-table-column
		            prop="androidMaxVersionCode"
		            label="安卓版本号">
		          </el-table-column>
		          <el-table-column
		            prop="androidHuaweiReviewVersion"
		            label="安卓华为进审版本">
		          </el-table-column>
		          <el-table-column
		            prop="appletsReviewVersion"
		            label="小程序进审版本">
		          </el-table-column>
		          <el-table-column
		          	align="center"
		            label="操作">
		            <template slot-scope="scope">
		            	<el-button type="danger" size="mini" @click="changeBut(scope.row)">发版</el-button>
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
    	<!-- 发版提示 -->
    	<el-dialog
		  title="发版"
		  :visible.sync="dialogVisible"
		  top="20px"
		  width="50%"
		  :before-close="handleClose">
		  <div>
		  	<div class="flex mgb10">
		  		<div class="w100px">ios进审版本</div>
		  		<div class="flex1">
		  			<el-input placeholder="ios进审版本" v-model="onItem.iosReviewVersion" clearable></el-input>
		  		</div>
		  	</div>
		  	<div class="flex mgb10">
		  		<div class="w100px">ios线上版本</div>
		  		<div class="flex1">
		  			<el-input placeholder="ios线上版本" v-model="onItem.iosMaxVersion" clearable></el-input>
		  		</div>
		  	</div>
		  	<div class="flex mgb10">
		  		<div class="w100px">ios强制升级</div>
		  		<div class="flex1">
		  			<el-radio v-model="onItem.iosUpdateMust" label="1">强制</el-radio>
  					<el-radio v-model="onItem.iosUpdateMust" label="0">不强制</el-radio>
		  		</div>
		  	</div>
		  	<div class="flex mgb10">
		  		<div class="w100px">ios升级提示</div>
		  		<div class="flex1">
		  			<el-input placeholder="ios进审版本" v-model="onItem.iosUpdateTips" clearable></el-input>
		  		</div>
		  	</div>
		  	<div class="flex mgb10">
		  		<div class="w100px">安卓小米进审版本</div>
		  		<div class="flex1">
		  			<el-input placeholder="安卓小米进审版本" v-model="onItem.androidMiReviewVersion" clearable></el-input>
		  		</div>
		  	</div>
		  	<div class="flex mgb10">
		  		<div class="w100px">安卓阿里进审版本</div>
		  		<div class="flex1">
		  			<el-input placeholder="安卓阿里进审版本" v-model="onItem.androidAliReviewVersion" clearable></el-input>
		  		</div>
		  	</div>
		  	<div class="flex mgb10">
		  		<div class="w100px">安卓华为进审版本</div>
		  		<div class="flex1">
		  			<el-input placeholder="安卓华为进审版本" v-model="onItem.androidHuaweiReviewVersion" clearable></el-input>
		  		</div>
		  	</div>
		  	<div class="flex mgb10">
		  		<div class="w100px">安卓线上版本</div>
		  		<div class="flex1">
		  			<el-input placeholder="安卓线上版本" v-model="onItem.androidMaxVersion" clearable></el-input>
		  		</div>
		  	</div>
		  	<div class="flex mgb10">
		  		<div class="w100px">安卓版本号</div>
		  		<div class="flex1">
		  			<el-input placeholder="安卓版本号" v-model="onItem.androidMaxVersionCode" clearable></el-input>
		  		</div>
		  	</div>
		  	<div class="flex mgb10">
		  		<div class="w100px">android升级提示</div>
		  		<div class="flex1">
		  			<el-input placeholder="android升级提示" v-model="onItem.androidUpdateTips" clearable></el-input>
		  		</div>
		  	</div>
		  	<div class="flex mgb10">
		  		<div class="w100px">安卓强制升级</div>
		  		<div class="flex1">
		  			<el-radio v-model="onItem.androidUpdateMust" label="1">强制</el-radio>
  					<el-radio v-model="onItem.androidUpdateMust" label="0">不强制</el-radio>
		  		</div>
		  	</div>
		  	<div class="flex mgb10">
		  		<div class="w100px">小程序进审版本</div>
		  		<div class="flex1">
		  			<el-input placeholder="小程序进审版本" v-model="onItem.appletsReviewVersion" clearable></el-input>
		  		</div>
		  	</div>
		  </div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button type="danger" @click="sureChange">确 定</el-button>
		  </span>
		</el-dialog>
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
	  		dialogVisible:false,
	  		page:{
		        num:''
		    },
		    onItem:''
		}
	},
	created(){
		this.getList()
	},
	methods:{
		sureChange(){
			this.$confirm('确定发版?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(async () => {
	          this.$api.appInitUp(this.onItem,res=>{
	          	if(res.data.res_code==1){
	  				this.$message({
			          showClose: true,
			          message: '发版成功！',
			          type: 'success'
			        })
			        this.dialogVisible = false
	  			}else{
	            	that.$message({
			          showClose: true,
			          message: res.data.message?res.data.message:'抱歉，发版失败！',
			          type: 'error'
			        })
	          	}
	          })
	        }).catch(() => {          
	        });
		},
		changeBut(item){
			console.log('发版',item)
			this.dialogVisible = true
			this.onItem = item
		},
		getList(){
			let that = this
			this.$api.appInitList(this.postData,data=>{
				if(data.status==200){
		  			if(data.data.res_code==1){
		  				that.list=data.data.result
		  			}else{
		            	that.list = ""
		          	}
		          	this.page.num = data.data.total
	  			}else{
	  				that.$message({
			          showClose: true,
			          message: '抱歉，列表获取失败！',
			          type: 'error'
			        })
	  			}
			})
		},
		pageChange(item){
	      this.postData.pageIndex = item
	      this.getList()
	    },
	}
}
</script>

<style type="text/css">
	
</style>