<template>
	<div class="box flex2 bgfff">
		<div class="pad10 flex">
  			<div class="flex1">
  				<el-input size="mini" placeholder="用户姓名" clearable style="width:100px;" v-model="searchData.userName "></el-input>
  				<el-input size="mini" placeholder="用户ID" clearable style="width:100px;" v-model="searchData.uid"></el-input>
  				<el-select size="mini" @change="searchBut" v-model="searchData.state" style="width:100px;" class="mgr5 mgb5" clearable placeholder="审核状态">
	              <el-option label="申请中" value="1"></el-option>
	              <el-option label="待打款" value="2"></el-option>
	              <el-option label="已打款" value="3"></el-option>
	            </el-select>
	            <el-date-picker
	              size="mini"
			      v-model="applyTime"
			      type="datetimerange"
			      value-format="yyyy-MM-dd HH:mm:ss"
			      range-separator="至"
			      clearable
			      @change="applyTimeFun"
			      start-placeholder="申请提现开始"
			      end-placeholder="申请提现结束">
			    </el-date-picker>
			    <el-date-picker
	              size="mini"
			      v-model="makeMoneyTime"
			      @change="makeMoneyTimeFun"
			      value-format="yyyy-MM-dd HH:mm:ss"
			      type="datetimerange"
			      range-separator="至"
			      clearable
			      start-placeholder="打款开始日期"
			      end-placeholder="打款结束日期">
			    </el-date-picker>
  			</div>
  			<div class="flex flexcenter">
  				<el-button type="primary" @click="searchBut" size="mini" icon="el-icon-search">搜索</el-button>
	          	<el-button :loading="downOrderButLoading" type="primary" @click="downfile" size="mini" icon="el-icon-download">导出</el-button>
  			</div>
  		</div>
  		<div class="flex1" style="position:relative;">
  			<div class="tablebox">
  				<el-table
				:data="listTime"
				border
				stripe
				height="100%"
				style="width: 100%">
				<el-table-column
		            type="index"
		            label="排序"
		            align="center"
		            fixed
		            width="50">
		        </el-table-column>
		        <el-table-column
		            prop="storeId"
		            label="店铺ID"
		            width="80">
	            </el-table-column>
	            <el-table-column
		            prop="storeName"
		            label="店铺名称"
		            min-width="150">
	            </el-table-column>
	            <el-table-column
		            prop="microBankCardVo.userName"
		            label="开户人"
		            width="100">
	            </el-table-column>
	            <el-table-column
		            prop="microBankCardVo.idCard"
		            label="身份证号"
		            width="130">
	            </el-table-column>
	            <el-table-column
		            prop="money"
		            label="结算金额"
		            width="80">
	            </el-table-column>
	            <el-table-column
		            prop="newTime"
		            label="申请提现时间"
		            width="120">
	            </el-table-column>
	            <el-table-column
		            prop="stateStr"
		            label="状态"
		            width="80">
	            </el-table-column>
	             <el-table-column
		            label="打款时间"
		            align="center"
		            width="120">
		            <template slot-scope="scope">
		            	<span v-if="scope.row.state==3">{{scope.row.upTime}}</span>
		            </template>
	            </el-table-column>
	            <el-table-column
		            fixed="right"
		            align="center"
		            width="100"
		            label="操作">
		            <template slot-scope="scope">
		              <div class="mgb5">
		              	<el-button type="primary" @click="info(scope.row)" class="minbut" size="small">账户详情</el-button>
		              </div>
		              <div class="mgb5">
		              	<el-button type="primary" @click="orderInfo(scope.row)" class="minbut" size="small">订单详情</el-button>
		              </div>
		              <template v-if="scope.row.state==1">
		              	<el-button type="primary" @click="changeType(scope.row,'a')" class="minbut" size="small">同意</el-button>
		              </template>
		              <template v-if="scope.row.state==2">
		              	<el-button type="primary" @click="changeType(scope.row,'c')" class="minbut" size="small">确认打款</el-button>
		              </template>
		            </template>
		        </el-table-column>
		        </el-table>
  			</div>
  		</div>
  		<div class="minfoot">
	    	<el-pagination
	        	background
	        	:page-size="20"
            	@current-change="pageChange"
            	:total="page.num"
	        	layout="total, prev, pager, next, jumper">
	    	</el-pagination>
    	</div>
    	<!-- 账户详情 -->
    	<el-dialog
		  title="账户详情"
		  :visible.sync="dialogVisible"
		  width="50%">
		  <template v-if="OnOrder">
		  <div class="flex mgb10">
		  	<div class="w100px">开户人</div>
		  	<div class="flex1">{{OnOrder.microBankCardVo.userName}}</div>
		  </div>
		  <div class="flex mgb10">
		  	<div class="w100px">开户行</div>
		  	<div class="flex1">{{OnOrder.microBankCardVo.bankName}}</div>
		  </div>
		  <div class="flex mgb10">
		  	<div class="w100px">银行卡号</div>
		  	<div class="flex1">{{OnOrder.microBankCardVo.bankCard}}</div>
		  </div>
		  <div class="flex mgb10">
		  	<div class="w100px">开户行所在地</div>
		  	<div class="flex1">{{OnOrder.microBankCardVo.accountArea}}</div>
		  </div>
		  <div class="flex mgb10">
		  	<div class="w100px">分支行</div>
		  	<div class="flex1">{{OnOrder.microBankCardVo.branchLine}}</div>
		  </div>
		  <div class="flex mgb10">
		  	<div class="w100px">预留手机号</div>
		  	<div class="flex1">{{OnOrder.microBankCardVo.reservedPhone}}</div>
		  </div>
		  </template>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
		  </span>
		</el-dialog>
		<!-- 订单详情 -->
		<el-dialog
	      title="订单详情"
	      :visible.sync="showOrderList"
	      width="80%"
	      class="mg5vh"
	      @close="showOrderList = false">
	      <list :wid="OnOrder.wid"></list>
	    </el-dialog>
  	</div>
</template>

<script type="text/javascript">
import list from './components/bPaymentOrder.vue'

	export default {
		data () {
			return {
				page:{
					num:0
				},
				postData:{
					pageIndex:1
				},
				list:[],
				searchData:{},
				OnOrder:'',
				dialogVisible:false,
				downOrderButLoading:false,
				showOrderList:false,
				applyTime:'',
				makeMoneyTime:''
			}
		},
		components:{
			list
		},
		created () {
			this.getList()
		},
		computed:{
			listTime(){
				if(this.list&&this.list.length){
					this.list.map(val=>{
						val.newTime = this.$utils.getTime(val.createTime)
						val.upTime = this.$utils.getTime(val.updateTime)
					})
				}
				return this.list
			}
		},
		methods:{
			applyTimeFun(res){
				console.log('申请时间改变',res)
				if(res){
					this.searchData.startDate = res[0]
					this.searchData.endDate = res[1]
				}else{
					this.searchData.startDate = ''
					this.searchData.endDate = ''
				}
				this.searchBut()
			},
			makeMoneyTimeFun(res){
				console.log('打款时间改变',res)
				if(res){
					this.searchData.payStartDate = res[0]
					this.searchData.payEndDate = res[1]
				}else{
					this.searchData.payStartDate = ''
					this.searchData.payEndDate = ''
				}
				this.searchBut()
			},
			downfile(){
				this.downOrderButLoading = true
				let downOrderData = {}
			      for (let i  in this.postData) {
			        if(i != 'pageIndex'){
			          downOrderData[i] = this.postData[i]
			        }
			      }
			      console.log('开始下载',downOrderData)
			      this.$api.downBIncomeList(downOrderData).then(data=>{
			        console.log('下载订单',data)
			        if(data){
			          if(!!window.ActiveXObject || "ActiveXObject" in window) {
			            console.log('ie浏览器')
			            let blob = new Blob([data.data])
			            let fileName = '纳小店提现列表.xlsx'
			            navigator.msSaveBlob(blob, fileName)
			          } else {
			            var content = data.data
			            var elink = document.createElement('a');
			            var blob = new Blob([content]);
			            elink.download = "纳小店提现列表.xlsx";
			            elink.style.display = 'none';
			            elink.href = URL.createObjectURL(blob)
			            document.body.appendChild(elink)
			            console.log('a点击事件,JNYP')
			            elink.click()
			            document.body.removeChild(elink)
			            window.URL.revokeObjectURL(blob)
			          }
			        }else{
			          this.$message({
			            showClose:true,
			            message:'订单导出失败',
			            type:'error'
			          })
			        }
			        this.downOrderButLoading = false
			      }).catch(data=>{
			        console.log('catch失败',data)
			        this.$message({
			          showClose:true,
			          message:'订单导出失败',
			          type:'error'
			        })
			        this.downOrderButLoading = false
			      })
			},
			orderInfo(e){
				this.OnOrder = e
				this.showOrderList = true
			},
			changeType(e,type){
				console.log('type',type,e)
				if (type=='a') {
					this.$confirm('确认通过审核?', '提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          type: 'warning'
			        }).then(async () => {
			          	this.$api.bIncomeUp({wid:e.wid,state:2},res=>{
							if (res.data.res_code==1) {
				    			this.$message({
						            showClose: true,
						            message: '操作成功！',
						            type: 'success'
						        })
						        this.getList()
				    		} else {
				    			this.$message({
						            showClose: true,
						            message: res.data.message?res.data.message:'抱歉，操作失败！',
						            type: 'error'
						        })
				    		}
						})
			        }).catch(() => {
			                 
			        })
				} else {
					this.$confirm('确认打款?', '提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          type: 'warning'
			        }).then(async () => {
			          	this.$api.bIncomeUp({wid:e.wid,state:3},res=>{
							if (res.data.res_code==1) {
				    			this.$message({
						            showClose: true,
						            message: '操作成功！',
						            type: 'success'
						        })
						        this.getList()
				    		} else {
				    			this.$message({
						            showClose: true,
						            message: res.data.message?res.data.message:'抱歉，操作失败！',
						            type: 'error'
						        })
				    		}
						})
			        }).catch(() => {
			                 
			        })
				}
			},
			info (item) {
				this.OnOrder = item
				this.dialogVisible = true
			},
			pageChange(item){
		      this.postData.pageIndex = item
		      this.getList()
		    },
		    getList(){
		    	this.$api.bIncomeList(this.postData,(res)=>{
		    		console.log('获取货款结算列表',res)
		    		if (res.data.res_code==1) {
		    			this.list = res.data.result
		    			this.page.num = res.data.total
		    		} else {
		    			if (res.data.res_code==1004) {
		    				this.list = ''
		    				this.page.num = 0
		    			} else {
		    				this.$message({
					            showClose: true,
					            message: res.data.message?res.data.message:'抱歉，获取列表失败！',
					            type: 'error'
					        })
		    			}
		    		}
		    	})
		    },
		    searchBut(){
				for(let i in this.searchData){
					if(this.searchData[i]){
						this.postData[i] = this.searchData[i]
					}else{
						delete this.postData[i]
					}
				}
				this.postData.pageIndex = 1
				this.getList()
			},
		}
	}
</script>

<style type="text/css">
	.w100px{
		width: 100px;
	}
</style>