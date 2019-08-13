<template>
	<div id="userList">
		<div class="box">
			<div class="miantop">
			    <div class="maintopleft">
					<el-input class="mgr10" style="width:200px;" clearable placeholder="用户ID" v-model="searchData.uid" size="small"></el-input>
          <el-input class="mgr10" style="width:200px;" clearable placeholder="订单号" v-model="searchData.businessValue" size="small"></el-input>
					<el-select size="small" class="mgr5" v-model="searchData.businessType" clearable placeholder="变更分类">
		              <el-option label="预估分佣" value="1"></el-option>
		              <el-option label="结算分佣" value="2"></el-option>
		              <el-option label="提现" value="3"></el-option>
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
            label="排序"
  					width="50">
				  </el-table-column>
				  <el-table-column
					  prop="uid"
		        label="用户ID"
					  width="100">
				  </el-table-column>
          <el-table-column
            prop="nickName"
            label="用户昵称"
            width="150">
          </el-table-column>
				  <el-table-column
					  prop="currentAmount"
		        label="当前金额"
					  width="150">
				  </el-table-column>
				  <el-table-column
					  prop="amount"
		        label="变更金额"
					  width="150">
				  </el-table-column>
				  <el-table-column
		        label="增加/减少"
					  width="100">
  					<template slot-scope="scope">
              <el-tag v-if="scope.row.symbol==0" type="success">减少</el-tag>
  						<el-tag v-if="scope.row.symbol==1" type="warning">增加</el-tag>
  					</template>
				  </el-table-column>
          <el-table-column
            label="业务类型"
            width="120">
            <template slot-scope="scope">
              <el-tag size="small" v-if="scope.row.businessType==1" type="success">预估分佣</el-tag>
              <el-tag size="small" v-if="scope.row.businessType==2" type="warning">结算分佣</el-tag>
              <el-tag size="small" v-if="scope.row.businessType==3">提现分佣</el-tag>
              <el-tag size="small" v-if="scope.row.businessType==4" type="danger">转移用户与佣金</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="佣金类型"
            width="120">
            <template slot-scope="scope">
              <el-tag size="small" v-if="scope.row.commissionType==1" type="success">自购佣金</el-tag>
              <el-tag size="small" v-if="scope.row.commissionType==2" type="warning">销售佣金</el-tag>
              <el-tag size="small" v-if="scope.row.commissionType==3">管理佣金</el-tag>
              <el-tag size="small" v-if="scope.row.commissionType==4" type="danger">会员商品佣金</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="commissionLevel"
            label="佣金等级"
            width="100">
          </el-table-column>
				  <el-table-column
            prop="businessValue"
            label="订单ID"
            width="150">
          </el-table-column>
          <el-table-column
            prop="description"
            label="描述">
          </el-table-column>
          <!-- <el-table-column
            fixed="right"
            label="操作">
            <template slot-scope="scope">
              <div v-if="scope.row.state==0" class="mgb5"><el-button class="minbut" type="primary" @click="adoptuser(scope.row)" size="small">通过</el-button></div>
              <div v-if="scope.row.state==0"><el-button class="minbut" type="warning" @click="rejectuser(scope.row)" size="small">驳回</el-button></div>
              <span v-if="scope.row.state==1" class="on">已通过</span>
              <span v-if="scope.row.state==2" class="warning">已驳回</span>
            </template>
          </el-table-column> -->
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
  name: 'userBalance',
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
      },
      // 佣金类型
      commissionList:''
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
        if (this.searchData[i]||this.searchData[i] === 0 ||this.searchData[i] === '0') {
          console.log('11111',i,this.searchData[i])
          this.postData[i] = this.searchData[i]
        } else {
          console.log('2222',i,this.searchData[i])
          delete this.postData[i]
        }
  		}
      console.log('data',this.searchData,this.postData)
  		this.postData.pageIndex=1
  		this.getList()
  	},
  	// 获取用户余额变更列表
  	getList () {
  		console.log('获取用户余额变更列表')
  		console.log(this.postData)
  		this.$api.getUserExchangeList(this.postData,data=>{
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
  					message:'获取用户余额变更列表失败',
  					type:'error'
  				})
  			}
  		})
  	},
    // 获取佣金类型
    getcommission(){
      console.log('获取佣金类型')
      this.$api.getCommissionType(data=>{
        console.log(data)
        if(data.data.res_code==1){
          this.commissionList=data.data.result
        }else{
          this.$message({
            showClose:true,
            message:'获取佣金类型失败',
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
