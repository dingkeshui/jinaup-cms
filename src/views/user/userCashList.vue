<template>
	<div id="userList">
		<div class="box">
			<div class="miantop">
			    <div class="maintopleft">
			    	<el-select size="mini" @change="searchUser" class="mgr10" v-model="searchData.state" clearable placeholder="订单状态">
					    <el-option label="待审核" value="0"></el-option>
					    <el-option label="待打款" value="1"></el-option>
					    <el-option label="已打款" value="2"></el-option>
					    <el-option label="无效" value="3"></el-option>
					    <el-option label="提现失败" value="4"></el-option>
					</el-select>
					<el-select size="mini" @change="searchUser" class="mgr10" v-model="searchData.cashSource" clearable placeholder="提现来源">
					    <el-option label="积纳有品" value="1"></el-option>
					    <el-option label="纳小店" value="2"></el-option>
					</el-select>
					<el-input style="width:200px;" class="mgr10" placeholder="用户ID" v-model="searchData.uid" size="mini"></el-input>
					<el-input style="width:200px;" class="mgr10" placeholder="提现订单ID" v-model="searchData.orderId" size="mini"></el-input>	
			    </div>
			    <div class="flex flexvcenter pad5">
			    	<el-button size="mini" @click="searchUser" type="primary" icon="el-icon-search">搜索</el-button>
			    	<el-button size="mini" @click="gmOrderDownFun" :loading="gmOrderDownLoading" type="primary" icon="el-icon-download">工猫提现申请列表</el-button>
			    </div>
			</div>
			<div class="maincontent">
				<div class="tablebox">
			        <el-table
			          :data="list"
			          border
			          stripe
			          height="100%"
			          style="width: 100%"
			          class="mytabel">
			          <el-table-column
			          	label="排序"
						type="index"
						width="50">
					  </el-table-column>
			          <el-table-column
			            prop="orderId"
			            label="订单ID">
			          </el-table-column>
			          <el-table-column
			            prop="nickName"
			            label="用户昵称">
			          </el-table-column>
			          <el-table-column
			            prop="uid"
			            label="用户ID">
			          </el-table-column>
			          <el-table-column
			            label="提现来源">
			            <template slot-scope="scope">
			            	<el-tag v-if="scope.row.cashSource==1" size="small">积纳有品</el-tag>
			            	<el-tag v-else size="small">纳小店</el-tag>
			            </template>
			          </el-table-column>
			          <el-table-column
			            prop="userPayeeAccountNumberVo.accountHolder"
			            label="开户人">
			          </el-table-column>
			          <el-table-column
			            prop="userPayeeAccountNumberVo.idNumber"
			            label="身份证号"
			            min-width="100">
			          </el-table-column>
			          <!-- <el-table-column
			            label="提现渠道"
			            min-width="150">
			            <template slot-scope="scope">
			            	<el-tag v-if="scope.row.thrChannel==1">银行</el-tag>
			    			<el-tag v-if="scope.row.thrChannel==2" type="success">支付宝账号</el-tag>
			    			<el-tag v-if="scope.row.thrChannel==3" type="warning">微信账号</el-tag>
			            </template>
			          </el-table-column> -->
			          <el-table-column
			            prop="currentAmount"
			            label="当前金额">
			          </el-table-column>
			          <el-table-column
			            prop="applyAmount"
			            label="提现金额">
			          </el-table-column>
			          <el-table-column
			            prop="actualAmount"
			            label="实发金额">
			          </el-table-column>
			          <el-table-column
			            prop="processFee"
			            label="手续费">
			          </el-table-column>
			          <el-table-column
			            prop="incomeTax"
			            label="平台扣税">
			          </el-table-column>
			          <el-table-column
			            prop="gmIncomeTax"
			            label="工猫扣税">
			          </el-table-column>
			          <el-table-column
			            label="订单状态">
			            <template slot-scope="scope">
			            	<el-tag size="small" type="warning" v-if="scope.row.state==0">待审核</el-tag>
			            	<el-tag size="small" type="danger" v-if="scope.row.state==1">待打款</el-tag>
			            	<el-tag size="small" type="success" v-if="scope.row.state==2">已打款</el-tag>
			            	<el-tag size="small" type="info" v-if="scope.row.state==3">无效</el-tag>
			            	<span v-if="scope.row.state==4" class="red">{{scope.row.thrError}}</span>
			            </template>
			          </el-table-column>
			          <el-table-column
			            label="更新个人所得税和工猫手续费">
			            <template slot-scope="scope">
			            	<el-button size="small" type="primary" @click="getNew(scope.row)">更新</el-button>
			            </template>
			          </el-table-column>
			          <el-table-column
			            fixed="right"
			            label="操作"
			            align="center"
			            width="100">
			            <template slot-scope="scope">
			              <!-- <div><el-button class="minbut" type="warning" size="small">删除</el-button></div> -->
			              <div class="mgb5"><el-button class="minbut" type="primary" @click="moreinfo(scope.row)" size="small">账户详情</el-button></div>
			              <div class="mgb5" v-if="scope.row.state==0">
			              	<el-button class="minbut" type="warning" @click="okCash(scope.row)" size="small">同意申请</el-button>
			              </div>
			              <div v-if="scope.row.state==1||scope.row.state==4">
			              	<el-button class="minbut" type="success" @click="sureCash(scope.row)" size="small">确认打款</el-button>
			              </div>
			              <div v-if="scope.row.state==0">
			              	<el-button class="minbut" type="danger" @click="noCash(scope.row)" size="small">拒绝申请</el-button>
			              </div>
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
		<!-- 提现详情 -->
		<el-dialog
		  title="提现详情"
		  :visible.sync="dialogVisible"
		  width="50%"
		  :before-close="handleClose">
		  <el-scrollbar class="noxscroll" style="height:50vh;">
		  	<el-form ref="form" :model="form" label-width="120px">
		  		<el-form-item label="用户ID">
			    	<span>{{form.uid}}</span>
			  	</el-form-item>
			  	<!-- <el-form-item label="提现渠道">
			    	<el-tag v-if="form.thrChannel==1">银行</el-tag>
			    	<el-tag v-if="form.thrChannel==2" type="success">支付宝账号</el-tag>
			    	<el-tag v-if="form.thrChannel==3" type="warning">微信账号</el-tag>
			  	</el-form-item> -->
			  	<el-form-item label="账号信息">
			    	<span>{{form.accountNumber}}</span>
			  	</el-form-item>
			  	<el-form-item label="开户行">
			    	<span>{{form.openingBank}}</span>
			  	</el-form-item>
			  	<el-form-item label="开户人">
			    	<span>{{form.accountHolder}}</span>
			  	</el-form-item>
			  	<el-form-item label="开户行所在地">
			    	<span>{{form.bankLocation}}</span>
			  	</el-form-item>
			  	<el-form-item label="预留手机号">
			    	<span>{{form.reservedPhone}}</span>
			  	</el-form-item>
			  	<el-form-item label="分支行">
			    	<span>{{form.branchLine}}</span>
			  	</el-form-item>
			  	<el-form-item label="身份证号码">
			    	<span>{{form.idNumber}}</span>
			  	</el-form-item>
			  	<el-form-item label="绑定工猫">
			    	<el-radio v-model="form.isBindGm" label="0">已绑定</el-radio>
  					<el-radio v-model="form.isBindGm" label="1">未绑定</el-radio>
			  	</el-form-item>

		  	</el-form>
		  </el-scrollbar>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>

<script type="text/javascript">

export default {
  name: 'userCashList',
  data () {
    return {
    	postData:{
    		pageIndex:1
    	},
    	list:'',
    	searchData:{},
    	page:{
    		num:''
    	},
    	dialogVisible:false,
    	form:{},
    	gmOrderDownLoading:false
    }
  },
  created () {
  	this.getList()
  },
  methods: {
  	//工猫订单申请下载
  	gmOrderDownFun(){
	    this.gmOrderDownLoading = true
  		console.log('工猫订单申请下载',this.searchData)
  		this.$api.gmOrderDown(this.searchData).then(data=>{
  			if (data.data) {
	          console.log('下载工猫订单',data)
	          if(!!window.ActiveXObject || "ActiveXObject" in window) {
		  			console.log('ie浏览器')
		    		let blob = new Blob([data.data])
		    		let fileName = '工猫提现申请列表.xlsx'
		    		navigator.msSaveBlob(blob, fileName)
		  	  } else {
		          let content = data.data
		          let elink = document.createElement('a');
		          let blob = new Blob([content]);
		          elink.download = "工猫提现申请列表.xlsx";
		          elink.style.display = 'none';
		          elink.href = URL.createObjectURL(blob)
		          document.body.appendChild(elink)
		          elink.click()
		          document.body.removeChild(elink)
		          window.URL.revokeObjectURL(blob)
	          }
	        } else {
	          this.$message({
	            showClose: true,
	            message: data.data.message?data.data.message:'抱歉，导出商品失败！',
	            type: 'error'
	          })
	        }
	        this.gmOrderDownLoading = false
  		}).catch(data=>{
  			console.log('工猫下载catsh',data)
  			this.$message({
	            showClose: true,
	            message: data.data.message?data.data.message:'抱歉，导出商品失败！',
	            type: 'error'
	        })
  		})
  	},
  	// 确认打款
  	sureCash(item){
  		console.log('确认打款',item)
  		this.$confirm('确认打款?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          	this.$api.payWithdrawal({orderId:item.orderId},data=>{
	  			console.log(data)
	  			if (data.data.res_code==1) {
	  				this.$message({
	  					showClose:true,
	  					message:'提现申请已上传至工猫！等待工猫打款中',
	  					type:'success'
	  				})
	  				this.getList()
	  			} else {
	  				this.$message({
	  					showClose:true,
	  					message:'确认打款失败',
	  					type:'error'
	  				})
	  			}
	  		})
        }).catch((data) => {
             console.log('catch',data)       
        })
  	},
  	// 同意打款
  	okCash(item){
  		console.log('同意打款',item)
  		this.$confirm('确认该申请通过?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
        	this.$api.getUserCashUpdataState({orderId:item.orderId,state:1},data=>{
	  			console.log(data)
	  			if(data.data.res_code==1){
	  				this.$message({
	  					showClose:true,
	  					message:'同意打款成功',
	  					type:'success'
	  				})
	  				this.getList()
	  			}else{
	  				this.$message({
	  					showClose:true,
	  					message:'同意打款失败',
	  					type:'error'
	  				})
	  			}
	  		})
    	}).catch((data) => {
         console.log('catch',data)       
        })
  	},
  	// 拒绝打款
  	noCash(item){
  		console.log('拒绝打款',item)
  		this.$confirm('将拒绝该申请，是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
	  		this.$api.getUserCashUpdataState({orderId:item.orderId,state:3},data=>{
	  			console.log(data)
	  			if(data.data.res_code==1){
	  				this.$message({
	  					showClose:true,
	  					message:'拒绝打款成功',
	  					type:'success'
	  				})
	  				this.getList()
	  			}else{
	  				this.$message({
	  					showClose:true,
	  					message:'拒绝打款失败',
	  					type:'error'
	  				})
	  			}
	  		})
  		}).catch((data) => {
         console.log('catch',data)       
        })
  	},
  	// 更新个人所得税
  	getNew(item){
  		console.log('更新个人所得税',item)
  		this.$api.cashUp({orderId:item.orderId},data=>{
  			if (data.data.res_code==1) {
  				this.$message({
  					showClose:true,
  					message:'个人所得税更新成功',
  					type:'success'
  				})
  				this.getList()
  			} else {
  				this.$message({
  					showClose:true,
  					message:'个人所得税更新失败',
  					type:'error'
  				})
  			}
  		})
  	},
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
  		console.log('获取提现订单列表')
  		console.log(this.postData)
  		this.$api.getUserCashList(this.postData,data=>{
  			console.log(data)
  			if(data.status==200){
  				if(data.data.res_code==1){
  					this.list = data.data.result
  				}else{
  					this.list = ''
  				}
  				this.page.num = data.data.total?data.data.total:0
  			}else{
  				this.$message({
  					showClose:true,
  					message:'用户提现列表获取失败',
  					type:'error'
  				})
  			}
  		})
  	},
  	// 提现详情
  	moreinfo(item){
  		console.log('提现详情',item)
  		if(item.userPayeeAccountNumberVo){
	  		this.form = item.userPayeeAccountNumberVo
	  		this.form.isBindGm = item.userPayeeAccountNumberVo.isBindGm+''
	  		this.dialogVisible = true
	  	}else{
	  		this.$message({
				showClose:true,
				message:'获取不到数据',
				type:'error'
			})
	  	}
  	},
  	pageChange(item){
  		this.postData.pageIndex = item
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
</style>
