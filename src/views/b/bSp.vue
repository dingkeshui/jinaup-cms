<template>
	<div class="box flex2 bgfff">
		<div class="pad10 flex">
  			<div class="flex1">
	  			<el-select size="mini" @change="searchBut" v-model="searchData.userLevel" style="width:100px;" class="mgr5 mgb5" clearable placeholder="用户等级">
	              <el-option label="非会员" value="0"></el-option>
	              <el-option label="会员" value="1"></el-option>
	              <el-option label="经理" value="2"></el-option>
	              <el-option label="服务商" value="3"></el-option>
	            </el-select>
          		<el-input size="mini" placeholder="用户ID" clearable style="width:100px;" v-model="searchData.uid"></el-input>
          		<el-input size="mini" placeholder="用户昵称" clearable style="width:100px;" v-model="searchData.nickName"></el-input>
          		<el-input size="mini" placeholder="手机号" type="number" clearable style="width:100px;" v-model="searchData.phoneNumber"></el-input>
	        </div>
  			<div class="flex flexcenter">
  				<el-button type="primary" @click="searchBut" size="mini" icon="el-icon-search">搜索</el-button>
          		<el-button type="primary" @click="addUser" size="mini">添加服务商</el-button>
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
		            prop="uid"
		            label="用户ID"
		            width="80">
	            </el-table-column>
	            <el-table-column
		            prop="nickName"
		            label="用户昵称"
		            min-width="150">
	            </el-table-column>
		        <el-table-column
		            prop="phoneNumber"
		            label="手机号"
		            width="150">
	            </el-table-column>
	            <el-table-column
		            label="类型"
		            width="100">
		            <template slot-scope="scope">
		            	<el-tag v-if="scope.row.userType==1" type="primary">会员</el-tag>
		            	<el-tag v-else type="warning">非会员</el-tag>
		            </template>
	            </el-table-column>
	            <el-table-column
		            label="等级"
		            width="100">
		            <template slot-scope="scope">
		            	<el-tag v-if="scope.row.userLevel==0" type="info">非会员</el-tag>
		            	<el-tag v-if="scope.row.userLevel==1" type="primary">会员</el-tag>
		            	<el-tag v-if="scope.row.userLevel==2" type="warning">经理</el-tag>
		            	<el-tag v-if="scope.row.userLevel==3" type="danger">总监</el-tag>
		            </template>
	            </el-table-column>
		        <el-table-column
		            fixed="right"
		            align="center"
		            width="100"
		            label="操作">
		            <template slot-scope="scope">
		              <div class="mgb5">
		              	<el-button type="primary" @click="addShop(scope.row)" class="minbut" size="small">关联店铺</el-button>
		              </div>
		              <div class="mgb5">
		              	<el-button type="danger" @click="remove(scope.row)" class="minbut" size="small">取消资格</el-button>
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
		<!-- 选择用户 -->
		<el-dialog
	        :title="添加服务商"
	        :visible.sync="dialogVisible2"
	        width="80%"
	        class="mg5vh"
	        @close="clospageCom"
	        :before-close="handleClose">
	        <user @closepage="clospageCom" v-model="usersitem" itemdata="choose"></user>
	    </el-dialog>
	    <!-- 添加店铺 -->
	    <el-dialog
		  title="关联店铺"
		  :visible.sync="dialogVisible"
		  width="90%"
		  top="10px"
		  :before-close="handleClose">
		  <div class="box infoBox">
		  	<el-scrollbar class="noxscroll scroll" style="height: 100%">
		  	<div class="flex mgb10">
		  		<div class="w100px">
		  			用户信息
		  		</div>		
		  		<div class="flex1">
		  			<el-table
					    :data="info.userInfo2"
					    border
					    style="width: 100%">
					    <el-table-column
				            prop="uid"
				            label="用户ID"
				            width="80">
				        </el-table-column>
				        <el-table-column
				            prop="nickName"
				            label="用户昵称"
				            min-width="120">
				        </el-table-column>
				        <el-table-column
				            prop="nickName"
				            label="用户头像"
				            width="100">
				            <template slot-scope="scope">
				            	<img class="img" :src="scope.row.headUrl">
				            </template>
				        </el-table-column>
				        <el-table-column
				            prop="phoneNumber"
				            label="手机号"
				            width="100">
				        </el-table-column>
				        <el-table-column
				            label="类型"
				            width="80">
				            <template slot-scope="scope">
				            	<el-tag size="small" v-if="scope.row.userType==1" type="primary">会员</el-tag>
				            	<el-tag size="small" v-else type="warning">非会员</el-tag>
				            </template>
				        </el-table-column>
				        <el-table-column
				            label="等级"
				            width="80">
				            <template slot-scope="scope">
				            	<el-tag size="small" v-if="scope.row.userLevel==0" type="info">非会员</el-tag>
				            	<el-tag size="small" v-if="scope.row.userLevel==1" type="primary">会员</el-tag>
				            	<el-tag size="small" v-if="scope.row.userLevel==2" type="warning">经理</el-tag>
				            	<el-tag size="small" v-if="scope.row.userLevel==3" type="danger">总监</el-tag>
				            </template>
				        </el-table-column>
				        <el-table-column
				            prop="parentName"
				            label="上级"
				            width="100">
				        </el-table-column>
					</el-table>
		  		</div>		
		  	</div>
		  	<div class="flex">
		  		<div class="w100px">
		  			关联店铺
		  		</div>
		  		<div class="flex1">
		  			<div class="mgb10">
		  				<el-button size="small" type="primary" @click="chooseShop">选择店铺</el-button>
		  			</div>
		  			<div>
		  				<el-table
						    :data="info.storeList"
						    border
						    style="width: 100%">
						    <el-table-column
					            prop="id"
					            fixed="left"
					            label="店铺ID"
					            width="80">
					        </el-table-column>
					        <el-table-column
					            prop="createTime"
					            label="入住日期"
					            width="120">
					            <template slot-scope="scope">
					            	{{$utils.getTime(scope.row.createTime)}}
					            </template>
					        </el-table-column>
					        <el-table-column
					            prop="storeName"
					            label="小店昵称"
					            min-width="120">
					        </el-table-column>
					        <el-table-column
					            prop="realName"
					            label="真实姓名"
					            width="120">
					        </el-table-column>
					        <el-table-column
					            prop="servicePhone"
					            label="手机号"
					            width="100">
					        </el-table-column>
					        <el-table-column
					            prop="storeRegion"
					            label="地址"
					            width="120">
					        </el-table-column>
					        <el-table-column
					            prop="storeAddressDetail"
					            label="详细地址"
					            width="120">
					        </el-table-column>
					        <el-table-column
					            fixed="right"
					            align="center"
					            width="80"
					            label="操作">
					            <template slot-scope="scope">
					              <div class="mgb5"><el-button type="danger" @click="removeShop(scope.row)" class="minbut" size="small">删除</el-button></div>
					            </template>
					        </el-table-column>
						</el-table>
		  			</div>
		  		</div>
		  	</div>
		  	</el-scrollbar>
		  </div>
		  <span slot="footer" size="mini" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <!-- <el-button type="primary" @click="dialogVisible = false">确 定</el-button> -->
		  </span>
		</el-dialog>
		<!-- 选择店铺 -->
		<el-dialog
	      :title="选择店铺"
	      :visible="shopDialog"
	      width="80%"
	      class="mg5vh"
	      @close="shopDialog = false"
	      :before-close="handleClose">
	      	<bshop v-if="shopDialog" type="type" v-model="onShopList"></bshop>
	      	<span slot="footer" class="dialog-footer">
			    <el-button @click="shopDialog = false">取 消</el-button>
			    <el-button type="primary" @click="sureAddShop">确 定</el-button>
			</span>
	    </el-dialog>
		</div>
</template>

<script type="text/javascript">
import bshop from '@/components/b/bShop.vue'
import user from '@/components/user/userlist2'

	export default {
		data () {
			return {
				usersitem:'',
				page:{
					num:''
				},
				searchData:{},
				postData:{
					pageIndex:1
				},
				list:'',
				item:'',
				radio:'', // 审核状态
				dialogVisible:false,
				dialogVisible2:false,
				shopDialog:false,
				info:'',
				onShopList:''
			}
		},
		components:{
			bshop,
			user
		},
		watch:{
			onShopList(item){
				console.log('父组件改变',item)
			},
			usersitem(item){
				console.log('选择了用户',item)
				if (item) {
					this.$api.addServiceProvider({uid:item.uid,userServiceType:1},res=>{
						console.log('结果',res)
						if(res.data.res_code==1){
							this.$message({
			          			showClose: true,
					            message:'操作成功！',
					            type: 'success'
			          		})
			          		this.getList()
						}else{
							this.$message({
					            showClose: true,
					            message: res.data.message?res.data.message:'抱歉，操作失败！',
					            type: 'error'
					        })
						}
					})
				}
			}
		},
		created(){
			this.getList()
		},
		computed:{
			listTime(){
				if(this.list){
					this.list.map(val=>{
						val.time = this.$utils.getTime(val.createTime)
					})
				}
				return this.list
			}
		},
		methods:{
			clospageCom(item){
				this.dialogVisible2 = false
				console.log('选择用户',item)
			},
			sureAddShop () {
				if(this.onShopList&&this.onShopList.length){
					let stores = []
					this.onShopList.map(val=>{
						stores.push(val.id)
					})
					stores = JSON.stringify(stores)
					let data = {
						uid:this.info.userInfo.uid,
						stores:stores
					}
					console.log('data==',data,)
					this.$api.addServiceProviderShop(data,res=>{
						console.log('res',res)
						if (res.data.res_code==1) {
							this.$message({
			          			showClose: true,
					            message:'操作成功！',
					            type: 'success'
			          		})
			          		this.shopDialog = false
			          		this.addShop({uid:this.info.userInfo.uid})
						} else {
							this.$message({
					            showClose: true,
					            message: res.data.message?res.data.message:'抱歉，操作失败！',
					            type: 'error'
					        })
						}
					})
				} else {
					this.shopDialog = false
				}
			},
			// 删除店铺
			removeShop(item){
				console.log('删除店铺',item)
				this.$api.removeServiceProviderShop({storeId:item.id},res=>{
					console.log('删除店铺结果',res)
					if (res.data.res_code==1) {
						this.$message({
		          			showClose: true,
				            message:'操作成功！',
				            type: 'success'
		          		})
		          		this.addShop({uid:this.info.userInfo.uid})
					} else {
						this.$message({
				            showClose: true,
				            message: res.data.message?res.data.message:'抱歉，操作失败！',
				            type: 'error'
				        })
					}
				})
			},
			// 取消资格
			remove (item) {
				console.log('取消资格',item)
				this.$confirm('确定取消 '+item.nickName+' 服务商资格?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          this.$api.removeServiceProvider({uid:item.uid},(res)=>{
		          	console.log('通过审核',res)
		          	if (res.data.res_code==1) {
		          		this.$message({
		          			showClose: true,
				            message:'操作成功！',
				            type: 'success'
		          		})
		          		this.getList()
		          	}else{
		          		this.$message({
				            showClose: true,
				            message: res.data.message?res.data.message:'抱歉，操作失败！',
				            type: 'error'
				        })
		          	}
		          })
		        }).catch(() => {
		                 
		        })
			},
			// 选择店铺
			chooseShop () {
				this.shopDialog = true
			},
			// 添加服务商
			addUser () {
				this.dialogVisible2 = true
			},
			// 管连店铺
			addShop (item) {
				this.$api.getServiceProviderInfo({uid:item.uid},res=>{
					console.log('info',res)
					if (res.data.res_code==1) {
						res.data.result.userInfo2 = [res.data.result.userInfo]
						this.info = res.data.result
						this.dialogVisible = true
					} else {
						this.$message({
				            showClose: true,
				            message: res.data.message?res.data.message:'服务商信息获取失败！',
				            type: 'error'
				        })
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
			pageChange(item){
		      this.postData.pageIndex = item
		      this.getList()
		    },
		    getList(){
		    	this.$api.getServiceProvider(this.postData,(res)=>{
		    		console.log('获取服务商列表',res)
		    		if (res.data.res_code==1) {
		    			this.list = res.data.result
		    			this.page.num = res.data.total
		    		} else {
		    			this.$message({
				            showClose: true,
				            message: res.data.message?res.data.message:'抱歉，获取服务商列表失败！',
				            type: 'error'
				        })
		    		}
		    	})
		    }
		}
	}
</script>

<style type="text/css">
	.w100px{
		width: 120px;
		font-weight: bold;
	}
	.w150{
		width: 150px;
	}
	.img{
		max-width: 80px;
		max-height: 80px;
	}
	.infoBox{
		position: relative;
		height: 450px !important;
	}
	.infoBox>.scroll{
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
	}
</style>