<template>
	<div class="box flex bgfff">
		<div class="pad10 flex">
			<div class="flex1">
				<el-input style="width:100px;" class="mgr10" placeholder="用户ID" v-model="searchData.uid" size="mini"></el-input>
				<el-input style="width:100px;" class="mgr10" placeholder="用户昵称" v-model="searchData.nickName" size="mini"></el-input>
				<el-input style="width:100px;" class="mgr10" placeholder="用户手机号" v-model="searchData.phoneNumber" size="mini"></el-input>
				<el-date-picker
				  size="mini"
				  class="mgr10"
				  style="width:120px;"
			      v-model="searchData.startTime"
			      type="date"
			      value-format="yyyyMMdd"
			      placeholder="开始时间">
			    </el-date-picker>
			    <el-date-picker
				  size="mini"
				  style="width:120px;"
			      v-model="searchData.endTime"
			      type="date"
			      value-format="yyyyMMdd"
			      placeholder="结束时间">
			    </el-date-picker>
			</div>
			<div>
				<el-button size="mini" @click="searchUser" type="primary" icon="el-icon-search">搜索</el-button>
			    <el-button size="mini" @click="downFun" :loading="downLoading" type="primary" icon="el-icon-download">导出</el-button>
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
			          	label="日期"
						prop="statDate"
						width="100">
					  </el-table-column>
					  <el-table-column
			          	label="用户昵称"
						prop="nickName"
						width="100">
					  </el-table-column>
					  <el-table-column
			          	label="用户ID"
						prop="uid"
						width="70">
					  </el-table-column>
					  <el-table-column
			          	label="手机号"
						prop="phoneNumber"
						width="100">
					  </el-table-column>
					  <el-table-column
			          	label="团队总人数"
						prop="teamNum"
						width="100">
					  </el-table-column>
					  <el-table-column
			          	label="直属团队总人数"
						prop="directTeamNum"
						width="100">
					  </el-table-column>
					  <el-table-column
			          	label="团队会员人数"
						prop="teamMemberNum"
						width="100">
					  </el-table-column>
					  <el-table-column
			          	label="直属团队会员人数"
						prop="directTeamMemberNum"
						width="100">
					  </el-table-column>
					  <el-table-column
			          	label="团队粉丝总人数"
						prop="teamFanNum"
						width="100">
					  </el-table-column>
					  <el-table-column
			          	label="直属团队粉丝总人数"
						prop="directTeamFanNum"
						width="100">
					  </el-table-column>
					  <el-table-column
			          	label="团队总监人数"
						prop="teamDirectorNum"
						width="100">
					  </el-table-column>
					  <el-table-column
			          	label="直属团队总监人数"
						prop="directTeamDirectorNum"
						width="100">
					  </el-table-column>
					  <el-table-column
			          	label="团队经理人数"
						prop="teamManagerNum"
						width="100">
					  </el-table-column>
					  <el-table-column
			          	label="会员商品佣金(当日)"
						prop="memberGoodsCommission"
						width="100">
					  </el-table-column>
					  <el-table-column
			          	label="销售佣金(当日)"
						prop="salesCommission"
						width="100">
					  </el-table-column>
					  <el-table-column
			          	label="管理佣金(当日)"
						prop="managementCommission"
						width="100">
					  </el-table-column>
					  <el-table-column
			          	label="正常订单数(团队级别,统计主订单数)"
						prop="ordinaryOrderNum"
						width="100">
					  </el-table-column>
					  <el-table-column
			          	label="秒杀订单数(团队级别,统计主订单数)"
						prop="seckillOrderNum"
						width="100">
					  </el-table-column>
					  <el-table-column
			          	label="会员订单数(团队级别,统计主订单数)"
						prop="memberOrderNum"
						width="100">
					  </el-table-column>
					  <el-table-column
			          	label="总订单数"
						prop="totalOrderNum"
						width="100">
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
</template>

<script type="text/javascript">
	export default {
		data () {
			return {
				list:'',
				postData:{
					pageIndex:1
				},
				searchData:{},
				page:{
					num:''
				},
				downLoading:false
			}
		},
		created(){
			this.getList()
		},
		methods:{
			// 申请下载
		  	downFun(){
			    this.downLoading = true
		  		console.log('工猫订单申请下载',this.searchData)
		  		this.$api.userTeamInfoDown(this.searchData).then(data=>{
		  			if (data.data) {
			          console.log('下载工猫订单',data)
			          if(!!window.ActiveXObject || "ActiveXObject" in window) {
				  			console.log('ie浏览器')
				    		let blob = new Blob([data.data])
				    		let fileName = '用户团队统计.xlsx'
				    		navigator.msSaveBlob(blob, fileName)
				  	  } else {
				          let content = data.data
				          let elink = document.createElement('a');
				          let blob = new Blob([content]);
				          elink.download = "用户团队统计.xlsx";
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
			            message: data.data.message?data.data.message:'抱歉，导出失败！',
			            type: 'error'
			          })
			        }
			        this.downLoading = false
		  		}).catch(data=>{
		  			console.log('工猫下载catsh',data)
		  			this.$message({
			            showClose: true,
			            message: data.data.message?data.data.message:'抱歉，导出失败！',
			            type: 'error'
			        })
			        this.downLoading = false
		  		})
		  	},
			pageChange(item){
				this.postData.pageIndex = item
				this.getList()
			},
			getList(){
				this.$api.userTeamInfoList(this.postData,res=>{
					console.log('res',res)
					if(res.status==200){
						if (res.data.res_code==1) {
							this.list = res.data.result
							this.page.num = res.data.total
						} else {
							this.list = ''
							this.$message({
			  					showClose:true,
			  					message:res.data.message?res.data.message:'获取列表失败',
			  					type:'error'
			  				})
						}
					} else {
						this.$message({
		  					showClose:true,
		  					message:'获取列表失败',
		  					type:'error'
		  				})
					}
				})
			},
			searchUser(){
				for(let i in this.searchData){
					if(this.searchData[i]){
						this.postData[i] = this.searchData[i]
					}else{
						delete this.postData[i]
					}
				}
				this.postData.pageIndex = 1
				this.getList()
			}
		}
	}
</script>

<style type="text/css">
	
</style>