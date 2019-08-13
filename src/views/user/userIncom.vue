<template>
	<div id="userList">
		<div class="box">
			<div class="miantop">
			    <div class="maintopleft">
  					<el-input class="mgr5" style="width:200px;" clearable placeholder="用户ID" v-model="searchData.uid" size="small"></el-input>
  					<el-select @change="searchUser" size="small" class="mgr5" v-model="postType" placeholder="用户收益">
              <el-option label="实际收益" value="1"></el-option>
              <el-option label="预估收益" value="2"></el-option>
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
    					  width="50">
    				  </el-table-column>
              <template v-if="show==1">
      				  <el-table-column
      					  prop="uid"
      		        label="用户ID">
      				  </el-table-column>
                <el-table-column
                  prop="nickName"
                  label="用户昵称">
                </el-table-column>
      				  <el-table-column
      					  prop="totalIncome"
      		        label="总收益">
      				  </el-table-column>
      				  <el-table-column
      					  prop="withdrawals"
      		        label="已提现收益">
      				  </el-table-column>
                <el-table-column
                  prop="balance"
                  label="剩余金额">
                </el-table-column>
                <el-table-column
                  prop="withdrawalsLoading"
                  label="待打款金额">
                </el-table-column>
                <el-table-column
                  prop="purchasingPower"
                  label="用户购买力">
                </el-table-column>
              </template>
              <template v-else>
                <el-table-column
                  prop="uid"
                  label="用户ID"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="nickName"
                  label="用户昵称"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="totalInviteNumber"
                  label="直属人员总数(包含粉丝和会员)"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="totalMemberNumber"
                  label="直邀会员总数"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="totalTurnover"
                  label="直邀总交易额"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="todayOrderNumber"
                  label="今日订单总数"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="todaySalesVolume"
                  label="今日销售额"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="todayIncome"
                  label="今日收益"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="monthOrderNumber"
                  label="月订单总数"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="monthSalesVolume"
                  label="月销售额"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="monthIncome"
                  label="月收益"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="estimateBalance"
                  label="预估收益"
                  min-width="150">
                </el-table-column>
                <el-table-column
                  prop="totalIncome"
                  label="总收益"
                  min-width="150">
                </el-table-column>
              </template>
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
  name: 'userIncom',
  data () {
    return {
      // 收益类型
      postType:'1',
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
      // 1显示实际收益，2 显示预估收益
      show:1
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
  	// 获取用户余额变更列表
  	getList () {
  		if(this.postType==1){
        this.postOne()
      }else {
        this.postTwo()
      }
  	},
    // 实际收益
    postOne(){
      console.log('获取用户实际收益列表')
      console.log(this.postData)
      this.show = 1
      this.$api.getUserIncomeList(this.postData,data=>{
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
            message:'获取用户实际收益列表失败',
            type:'error'
          })
        }
      })
    },
    pageChange(item){
      this.postData.pageIndex = item
      this.getList()
    },
    // 预估收益
    postTwo(){
      console.log('获取用户预估收益列表')
      console.log(this.postData)
      this.show = 2
      this.$api.getUserEstimateList(this.postData,data=>{
        console.log(data)
        if(data.status==200){
          if(data.data.res_code==1){
            this.list = data.data.result
          }else{
            this.list = ''
          }
        }else{
          this.$message({
            showClose:true,
            message:'获取用户预估收益列表失败',
            type:'error'
          })
        }
      })
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
