<template>
	<div class="box bgfff flex2">
		<div class="pad10 flex">
  			<div class="flex1">
  				<el-input size="mini" placeholder="商品ID" clearable style="width:100px;" v-model="searchData.pid"></el-input>
  				<el-input size="mini" placeholder="商品名称" clearable style="width:100px;" v-model="searchData.title"></el-input>
  				<el-input size="mini" placeholder="店铺ID" clearable style="width:100px;" v-model="searchData.storeId"></el-input>
  				<el-input size="mini" placeholder="店铺名称" clearable style="width:100px;" v-model="searchData.storeName"></el-input>
  				<el-select size="mini" @change="searchBut" v-model="searchData.state" style="width:100px;" class="mgr5 mgb5" clearable placeholder="商品状态">
	              <el-option label="下架" value="0"></el-option>
	              <el-option label="上架" value="1"></el-option>
	            </el-select>
	            <el-select size="mini" @change="searchBut" v-model="searchData.type" style="width:100px;" class="mgr5 mgb5" clearable placeholder="商品类型">
	              <el-option label="新店开张" value="1"></el-option>
	              <el-option label="普通商品" value="2"></el-option>
	              <el-option label="9.9" value="3"></el-option>
	              <el-option label="爆品" value="4"></el-option>
	            </el-select>
	            <el-select size="mini" @change="searchBut" v-model="searchData.review" style="width:100px;" class="mgr5 mgb5" clearable placeholder="审核状态">
	              <el-option label="待审核" value="1"></el-option>
	              <el-option label="已拒绝" value="2"></el-option>
	              <el-option label="已通过" value="3"></el-option>
	            </el-select>
	        </div>
  			<div class="flex flexcenter">
  				<el-button type="primary" @click="searchBut" size="mini" icon="el-icon-search">搜索</el-button>
	          	<!-- <el-button :loading="downLoading" type="primary" @click="downgoods" size="mini" icon="el-icon-download">导出</el-button> -->
	  		</div>
  		</div>
  		<div class="flex1" style="position:relative;">
	        <div class="tablebox">
	  			<el-table
		          :data="list"
		          border
		          stripe
		          height="100%"
		          style="width: 100%">
		          <el-table-column
		          	fixed="left"
			        type="index"
			        width="50">
			      </el-table-column>
			      <el-table-column
			      	prop="pid"
			        label="商品ID"
			        width="80">
			      </el-table-column>
			      <el-table-column
			        label="商品主图"
			        width="100">
			        <template slot-scope="scope">
			        	<img class="img" :src="scope.row.imgUrl">
			        </template>
			      </el-table-column>
			      <el-table-column
			      	prop="title"
			        label="商品名称"
			        min-width="120">
			      </el-table-column>
			      <el-table-column
			      	prop="categoryName"
			        label="三级分类"
			        min-width="100">
			      </el-table-column>
			      <el-table-column
			      	prop="typeStr"
			        label="商品类型"
			        width="100">
			      </el-table-column>
			      <el-table-column
			      	prop="storeName"
			        label="店铺名称"
			        width="100">
			      </el-table-column>
			      <el-table-column
			      	prop="currentPrice"
			        label="售价"
			        width="80">
			      </el-table-column>
			      <el-table-column
			      	prop="commission"
			        label="佣金"
			        width="80">
			      </el-table-column>
			      <el-table-column
			      	prop="stock"
			        label="库存"
			        width="80">
			      </el-table-column>
			      <el-table-column
			      	prop="stateStr"
			        label="商品状态"
			        align="center"
			        width="100">
			      </el-table-column>
			      <el-table-column
			      	prop="reviewStr"
			      	align="center"
			        label="审核状态"
			        width="100">
			      </el-table-column>
			      <el-table-column
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
    	<!-- 订单详情 -->
    	<el-dialog
	      title="商品详情"
	      :visible="dialog"
	      width="80%"
	      class="mg5vh"
	      @close="dialog = false"
	      :before-close="handleClose">
	      <div class="box infoBox">
	      	<el-scrollbar class="noxscroll scroll" style="height: 100%">
	      		<el-form ref="form" size="small" :model="form" label-width="100px">
					<el-form-item label="商品名称">
						<span>{{form.title}}</span>
					</el-form-item>
					<el-form-item label="商品描述">
						<span>{{form.description}}</span>
					</el-form-item>
					<el-form-item label="商品图片">
						<img v-for="item in form.pictures" class="goodsImg" @click="lookImg(item.imgUrl)" :src="item.imgUrl">
					</el-form-item>
					<el-form-item label="商品类型">
						<span>{{form.typeStr}}</span>
					</el-form-item>
					<el-form-item label="商品分类">
						<span>{{form.categoryName}}</span>
					</el-form-item>
					<el-form-item label="商品门市价">
						<span>{{form.retailPrice}}</span>
					</el-form-item>
					<el-form-item label="商品现价">
						<span>{{form.currentPrice}}</span>
					</el-form-item>
					<el-form-item label="商品限购">
						<span>{{form.purchaseLimit}}</span>
					</el-form-item>
					<el-form-item label="商品库存">
						<span>{{form.stock}}</span>
					</el-form-item>
					<el-form-item v-if="form.rushStartTime" label="抢购时间">
						<span>{{$utils.getTime(form.rushStartTime)}} -- {{$utils.getTime(form.rushEndTime)}}</span>
					</el-form-item>
					<el-form-item v-if="form.expiryStartDate" label="商品有效期">
						<span>{{$utils.getTime(form.expiryStartDate)}} -- {{$utils.getTime(form.expiryEndDate)}}</span>
					</el-form-item>
					<el-form-item label="发货方式">
						<span>{{form.deliveryStr}}</span>
					</el-form-item>
					<el-form-item label="不发货地区">
						<span v-if="form.noDeliveryArea">{{form.noDeliveryArea}}</span>
						<span v-else>无</span>
					</el-form-item>
					<el-form-item label="不包邮地区">
						<span v-if="form.noPackagedArea">{{form.noPackagedArea}}</span>
						<span v-else>无</span>
					</el-form-item>
					<el-form-item v-if="form.noPackagedAreas" label="运费">
						<span>{{form.freight}}</span>
					</el-form-item>
					<el-form-item label="商品状态">
						<span class="mgr10">{{form.stateStr}}</span>
						<template v-if="form.review==3">
							<el-button v-if="form.state!=1" size="small" type="primary" @click="goodsType('a')">上架</el-button>
							<el-button v-else size="small" type="warning" @click="goodsType('b')">下架</el-button>
						</template>
					</el-form-item>
					<el-form-item label="审核状态">
						<span class="mgr10">{{form.reviewStr}}</span>
						<template v-if="form.review==1">
							<el-button size="small" type="primary" @click="goodsReview('a')">通过</el-button>
							<el-button size="small" type="danger" @click="goodsReview('b')">拒绝</el-button>
						</template>
					</el-form-item>
					</el-form>
	      	</el-scrollbar>
	      </div>
	    </el-dialog>
	    <!-- 查看图片 -->
		<el-dialog
		  title="查看图片"
		  :visible.sync="dialogVisible2"
		  width="540px"
		  top="15px"
		  :before-close="handleClose">
		  <div class="imgBox2">
		  	<img :src="imgUrl">
		  </div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible2 = false">取 消</el-button>
		    <el-button type="primary" @click="dialogVisible2 = false">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>

<script type="text/javascript">
	export default {
		name:'bGoods',
		data () {
			return {
				page:{
					num:""
				},
				searchData:{},
				postData:{
					pageIndex:1
				},
				form:'',
				dialog:false,
				dialogVisible2:false,
				imgUrl:'',
				list:''
			}
		},
		created () {
			this.getList()
		},
		methods:{
			// 查看图片
			lookImg (item) {
				this.imgUrl = item
				this.dialogVisible2 = true
			},
			goodsReview(item){
				console.log('审核',item)
				if(item=='a'){
					this.$confirm('确定商品通过审核?', '提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          type: 'warning'
			        }).then(() => {
			          this.$api.bGoodsCheck({pid:this.form.pid,review:3},(res)=>{
			          	console.log('通过审核',res)
			          	if (res.data.res_code==1) {
			          		this.$message({
			          			showClose: true,
					            message:'操作成功！',
					            type: 'success'
			          		})
			          		this.lookinfo({pid:this.form.pid})
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
				}else{
					this.$prompt('请输入拒绝原因', '提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			        }).then(async ({ value }) => {
			          this.$api.bGoodsCheck({pid:this.form.pid,review:2,reason:value},(res)=>{
			          	console.log('拒绝审核',res)
			          	if (res.data.res_code==1) {
			          		this.$message({
			          			showClose: true,
					            message:'操作成功！',
					            type: 'success'
			          		})
			          		this.lookinfo({pid:this.form.pid})
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
			goodsType (item) {
				console.log('商品上下限',item)
				let req = {pid:this.form.pid}
				if(item=='a'){
					req.state = 1
				} else {
					req.state = 0
				}
				this.$api.bGoodsUpdate(req,res=>{
					console.log('上下结束',res)
					if (res.data.res_code==1) {
						this.$message({
				            showClose: true,
				            message: '成功！',
				            type: 'success'
				        })
				        this.lookinfo({pid:this.form.pid})
				        this.getList()
					} else {
						this.$message({
				            showClose: true,
				            message: res.data.message?res.data.message:'抱歉，操作失败！',
				            type: 'error'
				        })
					}
				})
			},
			lookinfo (item) {
				console.log('查看详情',item)
				this.$api.bGoodsInfo({pid:item.pid},res=>{
					console.log('商品详情',res)
					if (res.data.res_code==1) {
						this.form = res.data.result
						this.dialog = true
					} else {
						this.$message({
				            showClose: true,
				            message: res.data.message?res.data.message:'抱歉，获取商品详情失败！',
				            type: 'error'
				        })
					}
				})
			},
			pageChange(item){
		      this.postData.pageIndex = item
		      this.getList()
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
			getList(){
		    	this.$api.bGoodsList(this.postData,(res)=>{
		    		console.log('获取商品列表',res)
		    		if (res.data.res_code==1) {
		    			this.list = res.data.result
		    			console.log('list',this.list)
		    			this.page.num = res.data.total
		    		} else {
		    			if(res.data.res_code==1004){
		    				this.list = ''
		    				this.page.num = 0
		    			}else{
		    				this.$message({
					            showClose: true,
					            message: res.data.message?res.data.message:'抱歉，获取商品列表失败！',
					            type: 'error'
					        })
		    			}
		    		}
		    	})
		    },
		}
	}
</script>

<style type="text/css" scoped>
.img{
	max-height: 80px;
	max-width: 80px;
}
.goodsImg{
	max-height: 80px;
	max-width: 80px;
	margin-right: 10px;
	margin-bottom: 5px;
}
.infoBox{
	position: relative;
	height: 100% !important;
}
.infoBox>.scroll{
	position: absolute;
	top: 0px;
	left: 0px;
	width: 100%;
	height: 100%;
}
</style>
