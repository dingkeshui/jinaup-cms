<template>
	<div class="box flex2 bgfff">
		<div class="pad10 flex">
  			<div class="flex1">
	  			<el-select size="mini" @change="searchBut" v-model="searchData.auditState" style="width:100px;" class="mgr5 mgb5" clearable placeholder="审核状态">
	              <el-option label="待审核" value="1"></el-option>
	              <el-option label="通过" value="2"></el-option>
	              <el-option label="拒绝" value="3"></el-option>
	            </el-select>
          		<el-input size="mini" type="number" placeholder="店铺ID" clearable style="width:100px;" v-model="searchData.id"></el-input>
          		<el-input size="mini" placeholder="店铺昵称" clearable style="width:100px;" v-model="searchData.storeName"></el-input>
          		<el-input size="mini" placeholder="真实姓名" clearable style="width:100px;" v-model="searchData.realName"></el-input>
          		<el-input size="mini" placeholder="手机号" type="number" clearable style="width:100px;" v-model="searchData.phone"></el-input>
          		<el-select v-model="onCity" value-key="citycode" class="w150" clearable @change="cityChange" filterable size="mini" placeholder="选择/搜索城市">
				    <el-option
				      v-for="item in cityList"
				      :key="item.citycode"
				      :label="item.name"
				      :value="item">
				    </el-option>
				</el-select>
				<el-select v-model="onArea" class="w150" clearable @change="areaChange" filterable size="mini" placeholder="选择/搜索区">
				    <el-option
				      v-for="item in areaList"
				      :key="item.adcode"
				      :label="item.name"
				      :value="item">
				    </el-option>
				</el-select>
	            <el-date-picker
	              style="width:150px;"
	              v-model="searchData.startTime"
	              type="datetime"
	              size="mini"
	              clearable
	              value-format="yyyy-MM-dd HH:mm:ss"
	              placeholder="开始日期">
	            </el-date-picker>
	            <el-date-picker
	              style="width:150px;"
	              v-model="searchData.endTime"
	              type="datetime"
	              size="mini"
	              clearable
	              value-format="yyyy-MM-dd HH:mm:ss"
	              placeholder="结束日期">
	            </el-date-picker>
	        </div>
  			<div class="flex flexcenter">
  				<el-button type="primary" @click="searchBut" size="mini" icon="el-icon-search">搜索</el-button>
          		<!-- <el-button :loading="downLoading" type="primary" @click="downgoods" size="mini" icon="el-icon-download">导出</el-button> -->
  			</div>
  		</div>
  		<div class="flex1" style="position:relative;">
  			<div class="tablebox">
  				<el-table
				:data="listTime"
				border
				stripe
				ref="multipleTable"
				height="100%"
				@select="selectFun"
				@selection-change="selectChangeFun"
				@select-all="selectAllFun"
				style="width: 100%">
				<el-table-column
				  v-if="type"
				  fixed="left"
			      type="selection"
			      width="55">
			    </el-table-column>
		        <el-table-column
		            prop="id"
		            label="店铺ID"
		            width="80">
	            </el-table-column>
	            <el-table-column
		            prop="time"
		            label="入驻日期"
		            width="150">
	            </el-table-column>
		        <el-table-column
		            prop="storeName"
		            label="小店昵称"
		            min-width="150">
	            </el-table-column>
	            <el-table-column
		            prop="serviceProviderUid"
		            label="服务商ID"
		            min-width="80">
	            </el-table-column>
	            <el-table-column
		            prop="realName"
		            label="真实姓名"
		            width="100">
	            </el-table-column>
	            <el-table-column
		            prop="phone"
		            label="手机号"
		            width="100">
	            </el-table-column>
	            <el-table-column
		            prop="principal"
		            label="负责人"
		            width="100">
	            </el-table-column>
	            <el-table-column
		            prop="storeRegion"
		            label="详细地址"
		            min-width="150">
	            </el-table-column>
	            <el-table-column
		            align="center"
		            label="状态"
		            width="100">
		            <template slot-scope="scope">
		            	<!-- <el-tag v-if="scope.row.auditState===0" type="warning">待审核</el-tag> -->
		            	<el-tag v-if="scope.row.auditState==1">待审核</el-tag>
		            	<el-tag v-if="scope.row.auditState==2" type="success">审核通过</el-tag>
		            	<el-tag v-if="scope.row.auditState==3" type="danger">已拒绝</el-tag>
		            </template>
	            </el-table-column>
		        <el-table-column
		        	v-if="!type"
		            fixed="right"
		            align="center"
		            width="100"
		            label="操作">
		            <template slot-scope="scope">
		              <div class="mgb5"><el-button type="primary" @click="lookinfo(scope.row)" class="minbut" size="small">查看</el-button></div>
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
    	<!-- 店铺详情 -->
    	<el-dialog
	      title="店铺详情"
	      :visible="dialogVisible"
	      width="80%"
	      class="mg5vh"
	      @close="dialogVisible = false"
	      :before-close="handleClose">
		  <div class="box infoBox">
	      	<el-scrollbar class="noxscroll scroll" style="height: 100%">
		  <div class="pad10 flex mgb10">
		  	<div class="w100px">小店昵称</div>
		  	<div class="flex1">{{item.storeName}}</div>
		  </div>
		  <div class="pad10 flex mgb10">
		  	<div class="flex1 flex">
		  		<div class="w100px">入驻日期</div>
		  		<div class="flex1">{{$utils.getTime(item.createTime)}}</div>
		  	</div>
		  </div>
		  <div class="pad10 flex mgb10">
		  	<div class="flex1 flex">
		  		<div class="w100px">真实姓名</div>
		  		<div class="flex1">
		  			<el-input placeholder="真实姓名" v-model="item.realName" clearable></el-input>
		  		</div>
		  	</div>
		  </div>
		  <div class="pad10 flex mgb10">
		  	<div class="flex1 flex">
		  		<div class="w100px">负责人</div>
		  		<div class="flex1">
		  			<el-input placeholder="负责人" v-model="item.principal" clearable></el-input>
		  		</div>
		  	</div>
		  </div>
		  <div class="pad10 flex mgb10">
		  	<div class="flex1 flex">
		  		<div class="w100px">身份证号</div>
		  		<div class="flex1">
		  			<el-input placeholder="身份证号" v-model="item.idCard" clearable></el-input>
		  		</div>
		  	</div>
		  </div>
		  <div class="pad10 flex mgb10">
		  	<div class="flex1 flex">
		  		<div class="w100px">统一社会信用代码</div>
		  		<div class="flex1">
		  			<el-input placeholder="统一社会信用代码" v-model="item.unifiedSocialCreditCode" clearable></el-input>
		  		</div>
		  	</div>
		  </div>
		  <div class="pad10 flex mgb10">
		  	<div class="flex1 flex">
		  		<div class="w100px">联系电话</div>
		  		<div class="flex1">{{item.phone}}</div>
		  	</div>
		  </div>
		  <div class="pad10 flex mgb10">
		  	<div class="flex1 flex">
		  		<div class="w100px">客服电话</div>
		  		<div class="flex1">{{item.servicePhone}}</div>
		  	</div>
		  </div>
		  <div class="pad10 flex mgb10">
		  	<div class="flex1 flex">
		  		<div class="w100px">详细地址</div>
		  		<div class="flex1">
		  			<el-input placeholder="详细地址" v-model="item.storeAddressDetail" clearable></el-input>
		  		</div>
		  	</div>
		  </div>
		  <div class="pad10 flex mgb10">
		  	<div class="w100px">身份证正反面</div>
		  	<div class="flex1 flex">
		  		<div class="imgbox">
		  			<img @click="lookImg(item.idImgPositive,'idImgPositive')" :src="item.idImgPositive">
		  		</div>
		  		<div class="imgbox">
		  			<img @click="lookImg(item.idImgOpposite,'idImgOpposite')" :src="item.idImgOpposite">
		  		</div>
		  	</div>
		  </div>
		  <div class="pad10 flex mgb10">
		  	<div class="w100px">营业执照</div>
		  	<div class="flex1 flex">
		  		<div v-if="item.businessLicensePhoto" class="imgbox">
		  			<img @click="lookImg(item.businessLicensePhoto,'businessLicensePhoto')" :src="item.businessLicensePhoto">
		  		</div>
		  	</div>
		  </div>
		  <div class="pad10 flex mgb10">
		  	<div class="w100px">门头照片</div>
		  	<div class="flex1 flex">
		  		<div v-if="item.storePhoto" class="imgbox">
		  			<img @click="lookImg(item.storePhoto,'storePhoto')" :src="item.storePhoto">
		  		</div>
		  	</div>
		  </div>
		  <div class="pad10 flex mgb10">
		  	<div class="w100px">资质照片</div>
		  	<div class="flex1 flex">
		  		<div v-if="item.qualificationPhoto1" class="imgbox">
		  			<img @click="lookImg(item.qualificationPhoto1,'qualificationPhoto1')" :src="item.qualificationPhoto1">
		  		</div>
		  		<div v-if="item.qualificationPhoto2" class="imgbox">
		  			<img @click="lookImg(item.qualificationPhoto2,'qualificationPhoto2')" :src="item.qualificationPhoto2">
		  		</div>
		  		<div v-if="item.qualificationPhoto3" class="imgbox">
		  			<img @click="lookImg(item.qualificationPhoto3,'qualificationPhoto3')" :src="item.qualificationPhoto3">
		  		</div>
		  		<div v-if="item.qualificationPhoto4" class="imgbox">
		  			<img @click="lookImg(item.qualificationPhoto4,'qualificationPhoto4')" :src="item.qualificationPhoto4">
		  		</div>
		  	</div>
		  </div>
		  <div class="pad10 flex mgb10">
		  	<div class="w100px">审核状态</div>
		  	<div class="flex1">
		  		<span v-if="item.auditState<2" class="mgr10">待审核</span>
		  		<el-tag v-if="item.auditState==2" class="mgr10" type="success">审核已通过</el-tag>
		  		<el-tag v-if="item.auditState==3" class="mgr10" type="danger">已拒绝</el-tag>
		  		<el-button type="success" @click="auditStateFun(item,'a')" class="minbut" size="small">审核通过</el-button>
		        <el-button type="danger" @click="auditStateFun(item,'b')" class="minbut" size="small">拒绝</el-button>
		  	</div>
		  </div>
		  </el-scrollbar>
	      </div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="sureChangeInfo">确定修改</el-button>
		  </span>
		</el-dialog>
		<!-- 查看图片 -->
		<el-dialog
		  title="查看图片"
		  :visible.sync="dialogVisible2"
		  width="540px"
		  top="15px"
		  :before-close="handleClose">
		  <div class="imgBox2">
		  	<img v-if="imgFileUrl" :src="imgFileUrl">
		  	<img v-else :src="imgUrl">
		  </div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible2 = false">取 消</el-button>
		    <el-button type="primary" v-if="imgFile" @click="sureChange">确定修改</el-button>
		    <el-button type="warning" @click="changeImg" class="inpbox">
		    	<input accept="image/*" ref="imga" @change="chooseimg" type="file">
		    	选择图片
		    </el-button>
		  </span>
		</el-dialog>
	</div>
</template>

<script type="text/javascript">
	export default {
		props:['type'],
		data () {
			return {
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
				cityList:'',
				areaList:'',
				onCity:'',
				onArea:'',
				imgUrl:'',
				imgName:'',
				imgFile:'',
				imgFileUrl:'',
				onlist:[]
			}
		},
		created(){
			console.log('组件',this.type)
			this.getList()
			this.getCityList()
		},
		watch:{
			list(item){
				console.log('list改变',item)
				this.$nextTick(()=>{
					this.onlist.map(val=>{
						for(let i in this.list){
							if(this.list[i].id == val.id){
								this.list.isOn = true
								this.$refs.multipleTable.toggleRowSelection(this.list[i]);
							}
						}
					})
				})
			},
			onlist(item){
				console.log('子组件onlist改变',item)
				this.$emit('input',item)
			}
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
			// 确定修改信息
			sureChangeInfo(){
				let obj = {}
				obj.id = this.item.id
				obj.realName = this.item.realName
				obj.idCard = this.item.idCard
				obj.principal = this.item.principal
				obj.unifiedSocialCreditCode = this.item.unifiedSocialCreditCode
				obj.storeAddressDetail = this.item.storeAddressDetail
				console.log('obj',obj)
				this.$api.storeEditStoreInfo(obj,res=>{
					if (res.data.res_code==1) {
		          		this.$message({
		          			showClose: true,
				            message:'操作成功！',
				            type: 'success'
		          		})
		          		this.getBshopInfo(this.item)
		          	}else{
		          		this.$message({
				            showClose: true,
				            message: res.data.message?res.data.message:'抱歉，操作失败！',
				            type: 'error'
				        })
		          	}
				})
			},
			// 确定修改
			sureChange(){
				if(this.imgFile){
					let data = new FormData()
					data.append(this.imgName,this.imgFile)
					data.append('id',this.item.id)
					this.$api.bShopImgChange(data,res=>{
						if (res.data.res_code==1) {
			          		this.$message({
			          			showClose: true,
					            message:'操作成功！',
					            type: 'success'
			          		})
			          		this.getBshopInfo(this.item)
			          		this.dialogVisible2 = false
			          	}else{
			          		this.$message({
					            showClose: true,
					            message: res.data.message?res.data.message:'抱歉，操作失败！',
					            type: 'error'
					        })
			          	}
					})
				}
			},
			// 选择图片
			chooseimg(){
				let that = this
		      let headimginp = this.$refs.imga.files[0]
		      console.log(headimginp)
		      let bigSize = this.$store.state.oneImgBigSize
		      let isLt2M = headimginp.size / 1024 / 1024 < bigSize
		      if (!isLt2M) {
		        this.$message({
		          message: '注意，图片大小不得大于'+bigSize+'M',
		          type: 'error'
		        })
		        this.$refs.imga.value = ''
		        return
		      }
		      that.imgFile = headimginp
		      let reads = new FileReader()
		      reads.readAsDataURL(headimginp)
		      reads.onload = function (e) {
		        that.imgFileUrl = e.target.result
		      }
			},
			// 全选
			selectAllFun (item) {
				console.log('全选',item)
				if (item.length) {
					console.log('全选中')
					this.list.map(val=>{
						val.isOn = true
						let have = false
						for (let i in this.onlist) {
							if(this.onlist[i].id == val.id){
								have = true
								break
							}
						}
						if(!have){
							this.onlist.push(val)
						}
					})
				} else {
					console.log('全选不中')
					this.list.map(val=>{
						val.isOn = false
						for (let i in this.onlist) {
							if(this.onlist[i].id == val.id){
								this.onlist.splice(i,1)
								break
							}
						}
					})
				}
				console.log('全选的onlist',this.onlist)
			},
			// 选中
			selectFun (item,row) {
				row.isOn = !row.isOn
				if (row.isOn) {
					this.onlist.push(row)
				} else {
					for (let i in this.onlist) {
						if(this.onlist[i].id == row.id){
							this.onlist.splice(i,1)
							break
						}
					}
				}
				console.log('onlist',this.onlist)
			},
			// 审核
			auditStateFun (item,type) {
				if(type=='a'){
					this.$confirm('确定店铺通过审核?', '提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          type: 'warning'
			        }).then(() => {
			          this.$api.bShopAudit({id:item.id,auditState:2},(res)=>{
			          	console.log('通过审核',res)
			          	if (res.data.res_code==1) {
			          		this.$message({
			          			showClose: true,
					            message:'操作成功！',
					            type: 'success'
			          		})
			          		this.getBshopInfo(this.item)
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
				}else{
					this.$prompt('请输入拒绝原因', '提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			        }).then(async ({ value }) => {
			          this.$api.bShopAudit({id:item.id,auditState:3,auditExplain:value},(res)=>{
			          	console.log('拒绝审核',res)
			          	if (res.data.res_code==1) {
			          		this.$message({
			          			showClose: true,
					            message:'操作成功！',
					            type: 'success'
			          		})
			          		this.getBshopInfo(this.item)
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
			// 查看图片
			lookImg (item,name) {
				this.imgUrl = item
				this.imgName = name
				this.imgFile = ''
				this.dialogVisible2 = true
			},
			// 获取城市列表
			getCityList(){
				this.$api.bCityList({},res=>{
					if(res.data.res_code==1){
						let arr =[]
						res.data.result.map(val=>{
							arr = arr.concat(val.values)
						})
						this.cityList = arr
					}else{

					}
				})
			},
			// 获取区列表
			getAreaList(){
				this.$api.bAreaList({citycode:this.onCity.citycode},res=>{
					console.log('获取区',res)
					if(res.data.res_code==1){
						this.areaList = res.data.result
					}else{
						this.areaList = ''
					}
					console.log('areaList',this.areaList)
				})
			},
			// 城市改变
			cityChange(item){
				console.log('城市改变',item)
				if(item){
					this.searchData.citycode = item.citycode
					this.searchData.adcode = item.adcode
					this.getAreaList()
				}else{
					this.searchData.citycode = ''
					this.searchData.adcode = ''
				}
				this.areaList = ''
				this.onArea = ''
				this.searchBut()
			},
			// 区改变
			areaChange(item){
				console.log('区改变',item)
				if(item){
					this.searchData.citycode = item.citycode
					this.searchData.adcode = item.adcode
				}else{
					this.searchData.citycode = ''
					this.searchData.adcode = ''
				}
				this.searchBut()
			},
			// 查看
			lookinfo(item){
				this.getBshopInfo(item)
			},
			// 获取店铺详情
			getBshopInfo (item) {
				this.$api.getBshopInfo({id:item.id},res=>{
					console.log('店铺详情',res)
					if(res.data.res_code==1){
						this.item = res.data.result
						this.dialogVisible = true
						this.radio = ''
					}else{
						this.$message({
				            showClose: true,
				            message: res.data.message?res.data.message:'抱歉，详情获取失败！',
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
		    	if(this.type){
		    		this.$api.serviceProviderShopList(this.postData,(res)=>{
			    		console.log('获取店铺列表1',res)
			    		if (res.data.res_code==1) {
			    			res.data.result.map(val=>{
			    				val.isOn = false
			    			})
			    			this.list = res.data.result
			    			this.page.num = res.data.total
			    		} else {
			    			if (res.data.res_code==1004) {
			    				this.list = ''
			    				this.page.num = 0
			    			} else {
			    				this.$message({
						            showClose: true,
						            message: res.data.message?res.data.message:'抱歉，获取店铺列表失败！',
						            type: 'error'
						        })
			    			}
			    		}
			    	})
		    	}else{
		    		this.$api.bShopList(this.postData,(res)=>{
			    		console.log('获取店铺列表',res)
			    		if (res.data.res_code==1) {
			    			res.data.result.map(val=>{
			    				val.isOn = false
			    			})
			    			this.list = res.data.result
			    			console.log('list',this.list)
			    			this.page.num = res.data.total
			    		} else {
			    			if (res.data.res_code==1004) {
			    				this.list = ''
			    				this.page.num = 0
			    			} else {
			    				this.$message({
						            showClose: true,
						            message: res.data.message?res.data.message:'抱歉，获取店铺列表失败！',
						            type: 'error'
						        })
			    			}
			    		}
			    	})
		    	}
		    },
		    sureFun(){

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
	.imgbox{
		width: 200px;
		height: 130px;
		margin-right: 10px;
		text-align: center;
	}
	.imgbox>img{
		max-width: 100%;
		max-height: 100%;
	}
	.itmeBox{
		width: 70%;
		margin-left: 15%;
	}
	.imgBox2{
		width: 500px;
		height: 400px;
		text-align: center;
	}
	.imgBox2>img{
		max-height: 100%;
		max-width: 100%;
	}
	.inpbox{
		position: relative;
	}
	.inpbox input{
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
		opacity: 0;
	}
</style>