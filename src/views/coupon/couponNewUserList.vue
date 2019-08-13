<template>
	<div class="box flex bgfff">
		<div class="pad10 flex">
			<div class="flex1">
				<el-input class="mgr10 w200px" size="small" v-model="searchData.cid" placeholder="优惠券ID"></el-input>
				<el-date-picker
			      v-model="searchData.startTimeLong "
			      type="datetime"
			      size="small"
			      value-format="timestamp"
			      placeholder="选择开始时间">
			    </el-date-picker>
			</div>
			<div>
				<el-button size="small" type="primary" @click="searchfun" icon="el-icon-search">搜索</el-button>
			</div>
		</div>
		<div class="flex1" style="position:relative;">
			<div class="tablebox">
				<el-table
				    :data="listTime"
				    border
				    fit
				    height="100%"
				    highlight-current-row
				    style="width: 100%">
				    <el-table-column
				      fixed
				      type="index"
				      label="排序"
				      width="50">
				    </el-table-column>
				    <el-table-column
				      prop="couponInfoVo.title"
				      label="标题"
				      min-width="200">
				    </el-table-column>
				    <el-table-column
				      prop="cid"
				      label="优惠券ID"
				      min-width="80">
				    </el-table-column>
				    <el-table-column
				      prop="startTimeDate"
				      label="开始时间"
				      min-width="150">
				    </el-table-column>
				    <el-table-column
				      prop="endTimeDate"
				      label="结束时间"
				      min-width="150">
				    </el-table-column>
				    <el-table-column
				      prop="couponInfoVo.description"
				      label="描述"
				      min-width="150">
				    </el-table-column>
				    <el-table-column
				      label="分类"
				      width="100">
				      <template slot-scope="scope">
				      	<el-tag v-if="scope.row.couponInfoVo.couponType==0">通用券</el-tag>
				      	<el-tag type="success" v-if="scope.row.couponInfoVo.couponType==1">品类券</el-tag>
				      	<el-tag type="info" v-if="scope.row.couponInfoVo.couponType==2">商品券</el-tag>
				      	<el-tag type="warning" v-if="scope.row.couponInfoVo.couponType==3">店铺券</el-tag>
				      	<el-tag type="danger" v-if="scope.row.couponInfoVo.couponType==4">供应商券</el-tag>
				      </template>
				    </el-table-column>
				    <el-table-column
				      label="使用规则"
				      width="100">
				      <template slot-scope="scope">
				      	<span v-if="scope.row.couponInfoVo.couponRuleType==1">满减券</span>
				      	<span v-else>现金券</span>
				      </template>
				    </el-table-column>
				    <el-table-column
				      prop="couponInfoVo.full"
				      label="满(元)"
				      width="100">
				    </el-table-column>
				    <el-table-column
				      prop="couponInfoVo.reduction"
				      label="减(元)"
				      width="100">
				    </el-table-column>
				    <el-table-column
				      label="状态">
				      <template slot-scope="scope">
				      	<el-tag type="success" v-if="scope.row.couponInfoVo.state==1">上线</el-tag>
				      	<el-tag type="danger" v-else>下线</el-tag>
				      </template>
				    </el-table-column>
				    <el-table-column
				      fixed="right"
				      label="操作"
				      align="center"
				      width="110">
				      <template slot-scope="scope">
				      	<div class="mgb5">
				      		<el-button @click="changbut(scope.row)" class="minbut" type="primary" size="small">修改</el-button>
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
		        :total="pageinfo.num"
		        @current-change="pageChange"
		        layout="total, prev, pager, next, jumper">
	      	</el-pagination>
	  	</div>
	  	<!-- 修改优惠券 -->
	  	<el-dialog
		  title="修改优惠券"
		  :visible.sync="dialogVisible"
		  width="50%"
		  :before-close="handleClose">
		  <div class="flex mgb10">
		  	<div class="w100px">优惠券标题</div>
		  	<div v-if="onCouponInfo" class="flex1">{{onCouponInfo.couponInfoVo.title}}</div>
		  </div>
		  <div class="flex flexvcenter mgb10">
		  	<div class="w100px">开始时间</div>
		  	<div class="flex1">
		  		<el-date-picker
			      v-model="changeNewUserCouData.startTimeLong"
			      type="datetime"
			      value-format="timestamp"
			      placeholder="开始日期时间">
			    </el-date-picker>
		  	</div>
		  </div>
		  <div class="flex flexvcenter mgb10">
		  	<div class="w100px">结束时间</div>
		  	<div class="flex1">
		  		<el-date-picker
			      v-model="changeNewUserCouData.endTimeLong"
			      type="datetime"
			      value-format="timestamp"
			      placeholder="结束日期时间">
			    </el-date-picker>
		  	</div>
		  </div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="sureChangeNewUserCoupon">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>

<script type="text/javascript">
export default {
	data () {
		return{
			pageinfo:{
				num:''
			},
			postData:{
				pageIndex:1
			},
			searchData:{},
			list:'',
			onCouponInfo:'', //选中的优惠券信息
			dialogVisible:false,
			changeNewUserCouData:{
				endTimeLong:"",
				startTimeLong:""
			}
		}
	},
	created () {
		this.getList()
	},
	computed:{
		listTime () {
			if(this.list){
				this.list.map(val => {
					val.startTimeDate = this.$utils.getTime(val.startTime)
					val.endTimeDate = this.$utils.getTime(val.endTime)
				})
			}
			return this.list
		}
	},
	methods:{
		changbut (item) {
			console.log('修改',item)
			this.onCouponInfo = item
			this.dialogVisible = true
			this.changeNewUserCouData.endTimeLong = item.endTime
			this.changeNewUserCouData.startTimeLong = item.startTime
		},
		getList () {
			this.$api.newUserCouponList(this.postData,res=>{
				console.log('res',res)
				if (res.data.res_code==1) {
					this.list = res.data.result
					this.pageinfo.num = res.data.total
				} else {
					this.$message({
	  					showClose:true,
	  					message:res.data.message?res.data.message:'优惠券列表获取失败',
	  					type:'error'
	  				})
				}
			})
		},
		pageChange () {
			this.postData.pageIndex++
			this.getList()
		},
		searchfun(){
			for (let i in this.searchData) {
				if (this.searchData[i]) {
					this.postData[i] = this.searchData[i]
				} else {
					delete this.postData[i]
				}
			}
			this.postData.pageIndex = 1
			this.getList()
		},
		sureChangeNewUserCoupon(){
			this.$api.changeNewUserCoupon({
				id:this.onCouponInfo.id,
				startTimeLong:this.changeNewUserCouData.startTimeLong,
				endTimeLong:this.changeNewUserCouData.endTimeLong,
				cid:this.onCouponInfo.cid
			},res=>{
				console.log('修改优惠券',res)
				if(res.data.res_code==1){
					this.$message({
						showClose:true,
	  					message:'修改成功',
	  					type:'success'
					})
					this.dialogVisible = false
					this.getList()
				}else{
					this.$message({
						showClose:true,
	  					message:res.data.message?res.data.message:'优惠券列表获取失败',
	  					type:'error'
					})
				}
			})
		}
	}
}
</script>

<style type="text/css">
	
</style>