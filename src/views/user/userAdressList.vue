<template>
	<div id="userList">
		<div class="box">
			<div class="miantop">
			    <div class="maintopleft">
			    	<el-select size="small" class="mgr10" v-model="searchData.state" clearable placeholder="地址分类">
					    <el-option
					      label="默认地址"
					      value="0">
					    </el-option>
					    <el-option
					      label="非默认地址"
					      value="1">
					    </el-option>
					    <el-option
					      label="已删除"
					      value="2">
					    </el-option>
					</el-select>
					<el-input style="width:200px;" placeholder="用户ID" v-model="searchData.uid" size="small"></el-input>	
			    </div>
			    <div class="flex flexvcenter pad10">
			    	<el-button size="small" @click="searchUser" type="primary" icon="el-icon-search">搜索</el-button>
			    </div>
			</div>
			<div class="maincontent" v-loading="vloading">
				<div class="tablebox">
		        <el-table
		          :data="list"
		          border
		          stripe
		          height="100%"
		          style="width: 100%"
		          class="mytabel">
				  <el-table-column
				  	fixed="left"
					type="index"
					width="50">
				  </el-table-column>
				  <el-table-column
					prop="uid"
		            label="uid"
					width="50">
				  </el-table-column>
				  <el-table-column
					prop="uaid"
		            label="uaid"
					width="50">
				  </el-table-column>
				  <el-table-column
					prop="address"
		            label="地址"
					width="200">
				  </el-table-column>
				  <el-table-column
					prop="addressDetail"
		            label="详细地址"
					width="300">
				  </el-table-column>
		          <el-table-column
		            prop="consignee"
		            label="收货人"
		            width="100">
		          </el-table-column>
		          <el-table-column
		            prop="consigneePhone"
		            label="收货人电话"
		            width="150">
		          </el-table-column>
		          <el-table-column
		            label="默认地址"
		            width="100">
		            <template slot-scope="scope">
		            	<el-tag v-if="scope.row.state==0" type="success">默认地址</el-tag>
		            	<el-tag v-else type="danger">非默认</el-tag>
		            </template>
		          </el-table-column>
		          <el-table-column
		            prop="countryName"
		            label="国家"
		            width="50">
		          </el-table-column>
		          <el-table-column
		            prop="countryId"
		            label="国家ID"
		            width="50">
		          </el-table-column>
		          <el-table-column
		            prop="provinceName"
		            label="省名称"
		            width="50">
		          </el-table-column>
		          <el-table-column
		            prop="provinceId"
		            label="省级ID"
		            width="50">
		          </el-table-column>
		          <el-table-column
		            prop="cityName"
		            label="市名称"
		            width="50">
		          </el-table-column>
		          <el-table-column
		            prop="cityId"
		            label="市ID"
		            width="50">
		          </el-table-column>
		           <el-table-column
		            prop="areaName"
		            label="区名称"
		            width="50">
		          </el-table-column>
		          <el-table-column
		            prop="areaId"
		            label="区ID"
		            width="50">
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
	</div>
</template>

<script type="text/javascript">

export default {
  name: 'userAdressList',
  data () {
    return {
    	postData:{
    		pageIndex:1
    	},
    	list:'',
    	searchData:{},
    	// 是否显示修改上级box
    	dialogVisible:false,
    	page:{
    		num:''
    	}
    }
  },
  created(){
  	this.getList()
  },
  methods: {
  	// 搜索
  	searchUser () {
  		console.log('搜索')
  		for (let i in this.searchData) {
  			this.postData[i] = this.searchData[i]
  		}
  		this.postData.pageIndex=1
  		this.getList()
  	},
  	// 获取用户地址列表
  	getList () {
  		console.log('获取用户地址列表',this.postData)
  		this.$api.getUserAdressList(this.postData,data=>{
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
  					message:'用户地址获取失败',
  					type:'error'
  				})
  			}
  		})
  	},
  	// 
  	pageChange(item){
  		this.postData.pageIndex = item
  		this.getList()
  	},
  	lookSpecial (row) {
  		// 查看编辑专题
  		console.log(row)
  		let that = this
  		that.showInfo = true
  	},
  	closePage (data) {
  		// 关闭专题详情
  		console.log('关闭秒杀详情')
  		console.log(data)
  		this.showInfo = false
  	},
  	changeUp () {
  		// 修改上级
  		console.log('修改上级')
  		this.dialogVisible=true
  	},
  	closeMain () {
  		// 关闭用户编辑页面
  		console.log('关闭用户编辑页面')
  		this.showInfo = false
  	}
  }
}
</script>

<style type="text/css" scoped>
#userList{
	height: 100%;
	width: 100%;
	background-color: #fff;
}
.box{
	height: 100%;
	width: 100%;
	display: flex;
  	flex-direction: column;
}
.miantop{
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #ccc;
  display: flex;
  box-sizing: border-box;
  overflow: hidden;
}
.maintopleft{
  flex: 1;
  display: flex;
  padding: 10px 5px;
  align-items: center;
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
</style>
