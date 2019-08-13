<template>
  <div id="couponClass">
  	<transition name="fade">
		<div v-if="showBox1" class="box1 flex2">
  			<div class="flex pad5">
  				<div class="flex1">
  					<el-select size="small" clearable class="mgr10" v-model="searchData.couponType" clearable placeholder="优惠券分类">
					    <el-option label="通用券" value="0"></el-option>
					    <el-option label="品类券" value="1"></el-option>
					    <el-option label="商品券" value="2"></el-option>
					    <el-option label="店铺券" value="3"></el-option>
					    <el-option label="供应商券" value="4"></el-option>
					</el-select>
					<el-select size="small" clearable class="mgr10" v-model="searchData.obtainMethod" clearable placeholder="优惠券类型">
					    <el-option label="手动领取" value="0"></el-option>
					    <el-option label="升级会员" value="1"></el-option>
					</el-select>
					<el-select size="small" clearable class="mgr10" v-model="searchData.state" clearable placeholder="优惠券状态">
					    <el-option label="下线" value="0"></el-option>
					    <el-option label="上线" value="1"></el-option>
					</el-select>
  				</div>
  				<div class="">
  					<el-button size="small" type="primary" @click="searchfun" icon="el-icon-search">搜索</el-button>
  					<el-button size="small" @click="addnewfun">增加优惠券</el-button>
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
				      prop="cid"
				      label="ID"
				      min-width="80">
				    </el-table-column>
				    <el-table-column
				      prop="title"
				      label="标题"
				      min-width="200">
				    </el-table-column>
				    <el-table-column
				      label="状态">
				      <template slot-scope="scope">
				      	<el-tag type="success" v-if="scope.row.state==1">上线</el-tag>
				      	<el-tag type="danger" v-else>下线</el-tag>
				      </template>
				    </el-table-column>
				    <el-table-column
				      prop="description"
				      label="描述"
				      min-width="200">
				    </el-table-column>
				    <el-table-column
				      label="分类"
				      width="100">
				      <template slot-scope="scope">
				      	<el-tag v-if="scope.row.couponType==0">通用券</el-tag>
				      	<el-tag type="success" v-if="scope.row.couponType==1">品类券</el-tag>
				      	<el-tag type="info" v-if="scope.row.couponType==2">商品券</el-tag>
				      	<el-tag type="warning" v-if="scope.row.couponType==3">店铺券</el-tag>
				      	<el-tag type="danger" v-if="scope.row.couponType==4">供应商券</el-tag>
				      </template>
				    </el-table-column>
				    <el-table-column
				      prop="couponTypeValue"
				      label="优惠券值"
				      min-width="120">
				    </el-table-column>
				    <el-table-column
				      label="领取方式"
				      width="100">
				      <template slot-scope="scope">
				      	<span v-if="scope.row.obtainMethod==0">手动领取</span>
				      	<span v-else>升级会员</span>
				      </template>
				    </el-table-column>
				    <el-table-column
				      prop="totalNum"
				      label="优惠券总数"
				      width="100">
				      <template slot-scope="scope">
				      	<el-tag type="success" v-if="scope.row.totalNum<0">无限制</el-tag>
				      	<span v-else>{{scope.row.totalNum}}</span>
				      </template>
				    </el-table-column>
				    <el-table-column
				      prop="address"
				      label="发布者类型"
				      width="100">
				      <template slot-scope="scope">
				      	<span class="on" v-if="scope.row.couponPublisherType==1">平台</span>
				      	<span class="warning" v-if="scope.row.couponPublisherType==2">商家</span>
				      	<span class="suc" v-if="scope.row.couponPublisherType==3">供货商</span>
				      </template>
				    </el-table-column>
				    <el-table-column
				      prop="couponPublisher"
				      label="发布者ID">
				    </el-table-column>
				    <el-table-column
				      label="领取时间类型"
				      width="150">
				      <template slot-scope="scope">
				      	<el-tag type="success" v-if="scope.row.timeType==1">按设置时间</el-tag>
				      	<el-tag type="danger" v-else>按领取时间</el-tag>
				      </template>
				    </el-table-column>
				    <el-table-column
				      label="使用规则"
				      width="100">
				      <template slot-scope="scope">
				      	<span v-if="scope.row.couponRuleType==1">满减券</span>
				      	<span v-else>现金券</span>
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
				      prop="effectiveDay"
				      label="领取后有效期(天)"
				      width="120">
				    </el-table-column>
				    <el-table-column
				      label="结算类型"
				      width="150">
				      <template slot-scope="scope">
				      	<el-tag type="success" v-if="scope.row.settlementType==0">平台承担</el-tag>
				      	<el-tag type="" v-if="scope.row.settlementType==1">商家承担</el-tag>
				      	<el-tag type="warning" v-if="scope.row.settlementType==2">供货商承担</el-tag>
				      </template>
				    </el-table-column>
				    <el-table-column
				      prop="userId"
				      label="操作账户ID"
				      width="120">
				    </el-table-column>
				     <el-table-column
				      prop="startTime"
				      label="开始时间"
				      width="200">
				    </el-table-column>
				     <el-table-column
				      prop="endTime"
				      label="结束时间"
				      width="200">
				    </el-table-column>
				    <el-table-column
				      fixed="right"
				      label="操作"
				      align="center"
				      width="110">
				      <template slot-scope="scope">
				      	<div class="mgb5">
				      		<el-button @click="touser(scope.row)" v-if="scope.row.state==1" class="minbut" type="primary" size="small">指定用户</el-button>
				      	</div>
				      	<div class="mgb5">
				        	<el-button @click="addToNewUser(scope.row)" v-if="scope.row.state==1" class="minbut" type="primary" size="small">设为新用户券</el-button>
				        </div>
				        <div>
				        	<el-button @click="remove(scope.row)" v-if="scope.row.state==1" class="minbut" type="warning" size="small">下线</el-button>
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
		</div>
		<div v-else class="box2">
			<couponinfo pagedata="" @closepage="closepage"></couponinfo>
		</div>
	</transition>
	<!-- 指定用户 -->
	<el-dialog
        :title="选择用户"
        :visible.sync="dialogVisible"
        width="80%"
        class="mg5vh"
        @close="clospageCom"
        :before-close="handleClose">
        <user @closepage="clospageCom"  v-model="usersitem" itemdata="choose"></user>
    </el-dialog>
    <!-- 新用户优惠券 -->
    <el-dialog
	  title="新用户优惠券"
	  :visible.sync="dialogVisible2"
	  width="50%"
	  :before-close="handleClose">
	  <div class="flex mgb10">
	  	<div class="w100px">优惠券标题</div>
	  	<div class="flex1">{{newUserCouponInfo.title}}</div>
	  </div>
	  <div class="flex mgb10">
	  	<div class="w100px">开始时间</div>
	  	<div class="flex1">
	  		<el-date-picker
		      v-model="addNewUserCouData.startTimeLong"
		      type="datetime"
		      value-format="timestamp"
		      placeholder="开始日期时间">
		    </el-date-picker>
	  	</div>
	  </div>
	  <div class="flex mgb10">
	  	<div class="w100px">结束时间</div>
	  	<div class="flex1">
	  		<el-date-picker
		      v-model="addNewUserCouData.endTimeLong"
		      type="datetime"
		      value-format="timestamp"
		      placeholder="结束日期时间">
		    </el-date-picker>
	  	</div>
	  </div>
	  <span slot="footer" class="dialog-footer">
	    <el-button @click="dialogVisible2 = false">取 消</el-button>
	    <el-button type="primary" @click="sureAddNewUserCoupon">确 定</el-button>
	  </span>
	</el-dialog>
  </div>
</template>

<script type="text/javascript">
import couponinfo from '@/components/coupon/couponInfo.vue'
import user from '@/components/user/userlist.vue'

export default {
  name: 'couponList',
  components:{
  	couponinfo,
  	user
  },
  data () {
  	return {
  		showBox1:true,
  		postData:{
  			pageIndex:1
  		},
  		// 搜索的参数
  		searchData:{

  		},
  		pageinfo:{
  			num:''
  		},
  		list:'',
  		// 选择用户
  		dialogVisible:false,
  		dialogVisible2:false,
  		// 用户信息
  		usersitem:'',
  		oncoupon:'',
  		// 要添加新用户的优惠
  		newUserCouponInfo:'',
  		addNewUserCouData:{
  			startTimeLong:'',
  			endTimeLong:''
  		}
  	}
  },
  watch:{
  	usersitem(val){
  		if(val){
  			console.log('usersitem',val)
  			this.$confirm('确定向用户 '+val.nickName+' 发放优惠券 '+this.oncoupon.title+' ?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(async () => {
	          this.$api.couponToUser({uid:val.uid,cid:this.oncoupon.cid},data=>{
	          	console.log(data)
	          	if (data.data.res_code==1) {
	          		this.$message({
	          			showClose:true,
	  					message:'优惠券列发放成功',
	  					type:'success'
	          		})
	          	} else {
	          		this.$message({
	          			showClose:true,
	  					message:'优惠券发放失败',
	  					type:'error'
	          		})
	          	}
	          })
	        }).catch(() => {
	                   
	        });
  		}
  	}
  },
  created(){
  	this.getList()
  },
  methods: {
  	// 获取优惠券列表
  	getList(){
  		console.log('获取优惠券列表')
  		let that = this
  		console.log(that.postData)
  		that.$api.couponList(that.postData,data=>{
  			console.log(data)
  			if(data.status==200){
  				if(data.data.res_code==1){
  					that.list = data.data.result
  				}else{
  					that.list = ""
  				}
  				that.pageinfo.num = data.data.total
  			}else{
  				that.$message({
  					showClose:true,
  					message:'优惠券列表获取失败',
  					type:'error'
  				})
  			}
  		})
  	},
  	// 添加到新用户优惠券
  	addToNewUser (item) {
  		this.newUserCouponInfo = item
  		this.addNewUserCouData.startTimeLong = ""
  		this.addNewUserCouData.endTimeLong = ""
  		this.dialogVisible2 = true
  	},
  	// 确定添加新用户优惠券
  	sureAddNewUserCoupon () {
  		if (!this.addNewUserCouData.startTimeLong) {
  			this.$message({
				showClose:true,
				message:'开始时间不能为空',
				type:'error'
			})
			return
  		}
  		if (!this.addNewUserCouData.endTimeLong) {
  			this.$message({
				showClose:true,
				message:'结束时间不能为空',
				type:'error'
			})
			return
  		}
  		if(this.addNewUserCouData.endTimeLong<this.addNewUserCouData.startTimeLong){
  			this.$message({
				showClose:true,
				message:'开始时间不能大于结束时间',
				type:'error'
			})
			return
  		}
  		this.$api.addNewUserCoupon({startTimeLong:this.addNewUserCouData.startTimeLong,endTimeLong:this.addNewUserCouData.endTimeLong,cid:this.newUserCouponInfo.cid},(res=>{
  			console.log('添加到新用户优惠券结果',res)
  			if (res.data.res_code==1) {
  				this.dialogVisible2 = false
  				this.$message({
					showClose:true,
					message:'添加成功',
					type:'success'
				})
				this.getList()
  			} else {
  				this.$message({
					showClose:true,
					message:res.data.message?res.data.message:'添加失败',
					type:'error'
				})
  			}
  		}))
  	},
  	// 指定用户
  	touser(item){
  		this.dialogVisible = true
  		this.oncoupon = item
  		this.usersitem = ''
  	},
  	// 关闭用户
  	clospageCom(){
  		this.dialogVisible = false
  	},
  	pageChange (item) {
  		this.postData.pageIndex = item
  		this.getList()
  	},
  	// 搜索优惠券
  	searchfun () {
  		console.log('搜索优惠券')
  		let that = this
  		console.log(that)
  		for (let i in that.searchData) {
  			that.postData[i] = that.searchData[i]
  		}
  		that.postData.pageIndex = 1
  		that.getList()
  	},
  	// 新增优惠券
  	addnewfun(){
  		this.showBox1 = false
  	},
  	// 删除
  	remove (item) {
  		console.log('删除')
  		let that = this
  		console.log(item)
  		that.$confirm('确定将优惠券 '+item.title+' 下线?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          that.$api.couponDel({cid:item.cid},(data)=>{
  			console.log(data)
  			if (data.data.res_code==1) {
  				that.getList()
  				that.$message({
  					showClose:true,
  					message:'优惠券删除成功',
  					type:'success'
  				})
  			}else{
  				that.$message({
  					showClose:true,
  					message:'优惠券删除失败',
  					type:'error'
  				})
  			}
  		  })
        }).catch(() => {
          console.log('取消确定')       
        });
  	},
  	handleClick(){
  		this.showBox1 = false
  	},
  	closepage(item){
  		if(item=='new'){
  			this.getList()
  		}
  		this.showBox1 = true
  	}
  },
  computed:{
  	listTime () {
  		let that = this
  		if(that.list){
  			that.list.map(val=>{
  				val.startTime = that.$utils.getTime(val.startTime)
  				val.endTime = that.$utils.getTime(val.endTime)
  			})
  		}
  		console.log('计算属性',that.list)
  		return that.list
  	}
  }
}
</script>

<style type="text/css" scoped>
#couponClass{
	width: 100%;
	height: 100%;
	background-color: #fff;
}
.box1,.box2{
	width: 100%;
	height: 100%;
}
</style>
