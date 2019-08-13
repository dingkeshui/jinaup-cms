<template>
	<div id="userList">
		<div class="box">
			<div class="miantop">
			    <div class="maintopleft">
            <el-select class="w150 mgr5" size="small" clearable v-model="searchData.day" placeholder="按天统计">
               <el-option label="昨天" value="-1"></el-option>
               <el-option label="今天" value="1"></el-option>
               <el-option label="7天内" value="7"></el-option>
            </el-select>
            <el-select class="w150 mgr5" size="small" clearable v-model="searchData.month" placeholder="按月统计">
               <el-option label="上个月" value="-1"></el-option>
               <el-option label="本月" value="1"></el-option>
            </el-select>
			    </div>
			    <div class="flex flexvcenter pad10">
			    	<el-button size="small" @click="searchUser" type="primary" icon="el-icon-search">搜索</el-button>
			    	<el-button size="small" @click="allUser" type="primary">全部</el-button>
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
      					width="100">
    				  </el-table-column>
    				  <el-table-column
      					prop="userId"
      		      label="用户ID">
    				  </el-table-column>
              <el-table-column
                prop="nickName"
                label="用户昵称">
              </el-table-column>
    				  <el-table-column
    					  prop="orderId"
    		        label="用户订单ID">
    				  </el-table-column>
    				  <el-table-column
    					  prop="totalAmount"
    		        label="交易金额">
    				  </el-table-column>
              <el-table-column
                prop="totalAmount"
                label="业务类型">
                <template slot-scope="scope">
                  <el-tag v-if="scope.row.businessType==1">新增</el-tag>
                  <el-tag v-else>取消</el-tag>
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
	</div>
</template>

<script type="text/javascript">

export default {
  name: 'userPower',
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
  	// 获取用户购买力列表
  	getList () {
  		console.log('获取用户购买力列表')
  		console.log(this.postData)
  		this.$api.userPowerList(this.postData,data=>{
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
  					message:'用户购买力列表失败',
  					type:'error'
  				})
  			}
  		})
  	},
    pageChange(item){
      this.postData.pageIndex = item
      this.getList()
    },
  	// 全部用户
  	allUser () {
  		this.postData={
  			pageIndex:1
  		}
  		this.getList()
  	},
  	adoptuser (row) {
  		// 通过
  		console.log('通过')
  		this.$api.getUserAuthInfoUpdata({uid:row.uid,state:1},data=>{
  			console.log(data)
  			if (data.data.res_code==1) {
  				this.$message({
  					showClose:true,
  					message:'用户认证通过',
  					type:'success'
  				})
  				this.getList()
  			}else{
  				this.$message({
  					showClose:true,
  					message:'用户认证失败',
  					type:'success'
  				})
  			}
  		})
  	},
  	rejectuser (row) {
  		console.log('驳回')
  		this.$prompt('请输入驳回原因', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(async ({ value }) => {
        	console.log('确定驳回')
         	this.$api.getUserAuthInfoUpdata({uid:row.uid,state:2,refuseReason:value},data=>{
         		if (data.data.res_code==1) {
	  				this.$message({
	  					showClose:true,
	  					message:'用户认证驳回成功',
	  					type:'success'
	  				})
  					this.getList()
	  			}else{
	  				this.$message({
	  					showClose:true,
	  					message:'用户认证驳回失败',
	  					type:'success'
	  				})
	  			}
         	})
        }).catch(() => {
          	console.log('取消驳回')
        })
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
.idimg{
	max-height: 150px;
	max-height: 150px;
}
</style>
