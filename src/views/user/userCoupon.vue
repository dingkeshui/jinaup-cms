<template>
	<div id="userList">
		<div class="box">
			<div class="miantop">
			    <div class="maintopleft">
  					<el-input class="mgr5" style="width:100px;" placeholder="用户ID" v-model="searchData.uid" size="mini"></el-input>	
            <el-input class="mgr5" style="width:100px;" placeholder="优惠券ID" v-model="searchData.cid" size="mini"></el-input> 
  					<el-select size="mini" style="width:110px;" class="mgr5" v-model="searchData.collectionType" clearable placeholder="优惠券类型">
              <el-option label="通用券" value="0"></el-option>
              <el-option label="品类券" value="1"></el-option>
              <el-option label="商品券" value="2"></el-option>
              <el-option label="店铺券" value="3"></el-option>
              <el-option label="供应商券" value="4"></el-option>
            </el-select>
            <el-input class="mgr5" style="width:100px;" placeholder="发布者ID" v-model="searchData.couponPublisher" size="mini"></el-input> 
            <el-select size="mini" style="width:110px;" class="mgr5" v-model="searchData.couponRuleType" clearable placeholder="优惠券规则">
              <el-option label="满减券" value="1"></el-option>
              <el-option label="现金券" value="2"></el-option>
            </el-select>
            <el-select size="mini" style="width:110px;" class="mgr5" v-model="searchData.state" clearable placeholder="优惠券状态">
              <el-option label="未使用" value="0"></el-option>
              <el-option label="已使用" value="1"></el-option>
              <el-option label="已失效" value="2"></el-option>
            </el-select>
            <el-select size="mini" style="width:110px;" class="mgr5" v-model="searchData.settlementType" clearable placeholder="结算类型">
              <el-option label="平台承担" value="0"></el-option>
              <el-option label="商家承担" value="1"></el-option>
              <el-option label="供货商承担" value="2"></el-option>
            </el-select>
			    </div>
			    <div class="flex flexvcenter pad10">
			    	<el-button size="mini" @click="searchUser" type="primary" icon="el-icon-search">搜索</el-button>
			    	<el-button size="mini" @click="allUser" type="primary">全部</el-button>
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
    		        label="用户ID"
    					  width="100">
    				  </el-table-column>
              <el-table-column
                prop="nickName"
                label="用户昵称"
                width="150">
              </el-table-column>
              <el-table-column
                prop="cid"
                label="优惠券ID"
                width="100">
              </el-table-column>
              <el-table-column
                prop="title"
                label="优惠券标题"
                width="100">
              </el-table-column>
              <el-table-column
                label="优惠券类型"
                width="120">
                <template slot-scope="scope">
                  <span v-if="scope.row.couponType==0">通用券</span>
                  <span v-if="scope.row.couponType==1">品类券</span>
                  <span v-if="scope.row.couponType==2">商品券</span>
                  <span v-if="scope.row.couponType==3">店铺券</span>
                  <span v-if="scope.row.couponType==4">供应商券</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="couponTypeValue"
                label="优惠券类型值"
                width="100">
              </el-table-column>
               <el-table-column
                label="结算类型"
                width="120">
                <template slot-scope="scope">
                  <span v-if="scope.row.settlementType==0">平台承担</span>
                  <span v-if="scope.row.settlementType==1">商家承担</span>
                  <span v-if="scope.row.settlementType==2">供货商承担</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="couponPublisherType"
                label="发布者类型"
                width="120">
                <template slot-scope="scope">
                  <el-tag v-if="scope.row.couponPublisherType==1" type="success">平台</el-tag>
                  <el-tag v-if="scope.row.couponPublisherType==2" type="warning">商家</el-tag>
                  <el-tag v-if="scope.row.couponPublisherType==3">供货商</el-tag>
                </template>
              </el-table-column>
              <el-table-column
                prop="couponPublisher"
                label="发布者ID"
                width="100">
              </el-table-column>
              <el-table-column
                prop="description"
                label="优惠券描述"
                width="200">
              </el-table-column>
              <el-table-column
                label="优惠券规则"
                width="120">
                <template slot-scope="scope">
                  <el-tag v-if="scope.row.couponRuleType==1" type="success">满减券</el-tag>
                  <el-tag v-else type="info">现金券</el-tag>
                </template>
              </el-table-column>
              <el-table-column
                prop="full"
                label="满(元)"
                width="100">
              </el-table-column>
              <el-table-column
                prop="reduction"
                label="减(元)"
                width="100">
              </el-table-column>
              <el-table-column
                label="优惠券状态"
                width="120">
                <template slot-scope="scope">
                  <el-tag v-if="scope.row.state==0" type="success">未使用</el-tag>
                  <el-tag v-if="scope.row.state==1" type="info">已使用</el-tag>
                  <el-tag v-if="scope.row.state==3" type="warning">已失效</el-tag>
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
  name: 'userCoupon',
  data () {
    return {
    	postData:{
    		pageIndex:1
    	},
    	list:'',
    	searchData:{},
      page:{
        num:1
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
  	// 获取用户收藏列表
  	getList () {
  		console.log('获取用户优惠券列表')
  		console.log(this.postData)
  		this.$api.getUserCouponInfoList(this.postData,data=>{
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
  					message:'获取用户优惠券列表失败',
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
      this.searchData = {}
  		this.getList()
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
	max-height: 100px;
	max-height: 100px;
}
</style>
