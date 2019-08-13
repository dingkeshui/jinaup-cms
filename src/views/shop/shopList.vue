<template>
  <div id="shopList">
  	<transition name="fade">
  		<div v-if="showbox1" class="box1 flex2">
  			<div class="pad5 flex">
  				<div class="flex1">
  					<el-input class="w200 mgr5" size="small" v-model="searchData.storeName" placeholder="店铺昵称"></el-input>
  					<el-input class="w200 mgr5" size="small" v-model="searchData.uid" placeholder="用户ID"></el-input>
  					<el-input class="w200 mgr5" size="small" v-model="searchData.contactsPhone" placeholder="联系电话"></el-input>
  					<el-input class="w200 mgr5" size="small" v-model="searchData.idCard " placeholder="身份证号"></el-input>
  					<el-select size="small" v-model="searchData.state " clearable placeholder="店铺状态">
					    <el-option label="关闭" value="0"></el-option>
					    <el-option label="开启" value="1"></el-option>
					</el-select>
  				</div>
  				<div>
  					<el-button type="primary" @click="search" size="small">搜索</el-button>
  					<el-button type="primary" @click="showAll" size="small">显示全部</el-button>
  				</div>
  			</div>
  			<div class="flex1" style="position: relative;">
          <div class="tablebox">
  				<el-table
				    :data="tableData3"
				    border
				    style="width: 100%">
				    <el-table-column
			          type="index"
			          width="50">
			        </el-table-column>
				    <el-table-column
				      prop="date"
				      label="日期">
				    </el-table-column>
				    <el-table-column
				      prop="name"
				      label="姓名">
				    </el-table-column>
				    <el-table-column
				      prop="province"
				      label="省份">
				    </el-table-column>
				    <el-table-column
				      prop="city"
				      label="市区">
				    </el-table-column>
				    <el-table-column
				      prop="address"
				      label="地址">
				    </el-table-column>
				    <el-table-column
				      prop="zip"
				      label="邮编">
				    </el-table-column>
				    <el-table-column
				      label="操作">
				      <template slot-scope="scope">
				        <el-button @click="addClick(scope.row)" type="text" size="small">新增运费模板</el-button>
				      </template>
				    </el-table-column>
				    <el-table-column
				      fixed="right"
				      width="130"
				      label="操作">
				      <template slot-scope="scope">
				        <div><el-button @click="change(scope.row,a)" class="minbut" type="primary" size="small">开启</el-button></div>
				        <div><el-button @click="change(scope.row,b)" class="minbut" type="warning" size="small">关闭</el-button></div>
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
  		<div class="box2"></div>
  	</transition>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'shoplist',
  data () {
  	return {
  		postData:{
  			pageIndex:1
  		},
  		searchData:{},
  		showbox1:true,
      page:{
        num:''
      }
  	}
  },
  created(){
  	this.getlist()
  },
  methods:{
  	getlist(){
  		console.log('获取店铺',this.postData)
  		this.$api.userStoreList(this.postData,data=>{
  			console.log(data)
  			if(data.status==200){
  				if(data.data.res_code==1){
  					this.list=data.data.result
  				}else{
  					this.list=""
  				}
          this.page.num = data.data.total
  			}else{
  				this.$message({
  					showClose:true,
  					message:'获取失败',
  					type:'error'
  				})
  			}
  		})
  	},
    pageChange(item){
      this.postData.pageIndex = item
      this.getlist()
    },
  	search(){
  		for(let i in this.searchData){
  			this.postData[i] = this.searchData[i]
  		}
  		this.postData.pageIndex =1
  		this.getlist()
  	},
  	// 显示全部
  	showAll (){
  		this.postData = {pageIndex:1}
  		this.searchData = {}
  		this.getlist()
  	},
  	change (item,type) {
  		let state = 0
  		if (type=="a") {
  			state = 1
  		}
  		this.$api.userStoreUpdata({state:state,usiid:item.usiid},data=>{
  			console.log(data)
  			if(data.status==200){
  				this.$message({
  					showClose:true,
  					message:'修改成功！',
  					type:'success'
  				})
  				this.getlist()
  			}else{
  				this.$message({
  					showClose:true,
  					message:'修改失败',
  					type:'error'
  				})
  			}
  		})
  	}
  }
}
</script>

<style type="text/css" scoped>
#shopList{
	width: 100%;
	height: 100%;
	background-color: #fff;
}
.box1,.box2{
	width: 100%;
	height: 100%;
}
.w200{
	width: 200px;
}
</style>
