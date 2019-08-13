<template>
<div class="classlist flex2">
	<div class="pad10 flex">
		<div class="flex1">
			<!-- <el-select size="small" v-model="postData.dayType" @change="getlist" placeholder="秒杀日期">
			    <el-option label="昨天" value="0"></el-option>
			    <el-option label="今天" value="1"></el-option>
			    <el-option label="明天" value="2"></el-option>
			</el-select> -->
			<el-date-picker
		      v-model="postData.dayStr"
		      type="date"
		      @change="getlist"
		      value-format="yyyyMMdd"
		      placeholder="选择日期">
		    </el-date-picker>
		</div>
		<div>
			<el-button type="primary" @click="addnewbut" size="small">添加秒杀</el-button>
		</div>
	</div>
	<div class="flex1">
		<el-table
            :data="listdata"
            border
            stripe
            height="100%"
            style="min-width: 100%">
            <el-table-column
              type="index"
              label="排序"
              width="50">
            </el-table-column>
            <el-table-column
              prop="productInfoVo.title"
              label="商品昵称">
            </el-table-column>
            <el-table-column
              prop="productInfoVo.pid"
              width="70"
              label="商品ID">
            </el-table-column>
            <el-table-column
              prop="salesPrice"
              width="70"
              label="销售价">
            </el-table-column>
            <el-table-column
              prop="seckillPrice"
              width="70"
              label="秒杀价">
            </el-table-column>
            <el-table-column
              prop="salesStore"
              width="80"
              label="销售数量">
            </el-table-column>
            <el-table-column
              prop="effectiveDate"
              width="100"
              label="秒杀时间">
            </el-table-column>
            <el-table-column
              prop="buyerNumber"
              width="80"
              label="每人限购">
            </el-table-column>
            <el-table-column
              prop="store"
              width="80"
              label="剩余库存">
            </el-table-column>
            <el-table-column
              prop="sortId"
              width="60"
              label="排序">
            </el-table-column>
            <el-table-column
              width="90"
              label="秒杀状态">
              <template slot-scope="scope">
              	<el-tag v-if="scope.row.state==1">未开始</el-tag>
              	<el-tag type="success" v-if="scope.row.state==2">进行中</el-tag>
              	<el-tag type="info" v-if="scope.row.state==3">已结束</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              label="商品图片"
              width="100">
              <template slot-scope="scope">
              	<img class="img" :src="scope.row.productInfoVo.mainImgUrl">
              </template>
            </el-table-column>
            <el-table-column
              v-if="itemdata"
              fixed="right"
              label="操作"
              width="120">
              <template slot-scope="scope">
              	<template v-if="scope.row.state!=3">
                	<el-button @click="choose(scope.row)" type="primary" size="small">选择</el-button>
                </template>
                <template v-else>
                	<span class="red">已结束</span>
                </template>
              </template>
            </el-table-column>
            <el-table-column
              v-else
              align="center"
              fixed="right"
              label="操作"
              width="90">
              <template slot-scope="scope">
              	<template v-if="scope.row.state!=3">
	                <div class="mgb5"><el-button class="minbut" @click="changeclass(scope.row)" type="primary" size="small">编辑</el-button></div>
	                <div class="mgb5"  v-if="scope.row.state!=3"><el-button class="minbut" @click="remove(scope.row)" type="warning" size="small">删除</el-button></div>
	                <div class="mgb5"><el-button class="minbut" @click="newsort(scope.row)" type="primary" size="small">排序</el-button></div>
                </template>
                <template v-else>
                 	<span class="red">已结束</span>
                </template>
              </template>
            </el-table-column>
          </el-table>
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
  	<!-- 增加秒杀 -->
  	<el-dialog
	  :title="isAdd?'增加秒杀':'编辑秒杀'"
	  :visible.sync="dialogVisible"
	  fullscreen="true"
	  :before-close="infoHandleClose">
	  	<el-form ref="form" :model="form" label-width="120px">
		  <el-form-item label="选择商品">
		    <div v-if="isAdd"><el-button size="small" @click="choosebut" type="primary">选择商品</el-button></div>
		    <div v-if="goodsitem">
              <table cellspacing="0" class="tab">
                  <tr>
                    <td>商品ID</td>
                    <td class="flex1">商品昵称</td>
                    <td>商品图片</td>
                  </tr>
                  <tr>
                    <td>{{goodsitem.pid}}</td>
                    <td class="flex1">{{goodsitem.title}}</td>
                    <td><img :src="goodsitem.mainImgUrl"></td>
                  </tr>
              </table>
            </div>
		  </el-form-item>
		  <el-form-item label="秒杀SKU">
		  	<el-table
			    :data="goodsInfo.supplierProductSkuVoList"
			    border
			    style="width: 100%">
			    <el-table-column
			      prop="skuName"
			      label="秒杀属性"
			      width="150">
			    </el-table-column>
			    <el-table-column
			      prop="salesPrice"
			      label="售价"
			      width="80">
			    </el-table-column>
			    <el-table-column
			      prop="supplyPrice"
			      label="供货价"
			      width="80">
			    </el-table-column>
			    <el-table-column
			      v-if="isAdd"
			      prop="oldstore"
			      label="库存"
			      width="80">
			    </el-table-column>
			    <el-table-column
			      prop="salesStore"
			      v-if="!isAdd"
			      label="实际已销售">
			    </el-table-column>
			    <el-table-column
			      label="秒杀价">
			      <template slot-scope="scope">
			      	<el-input v-model="scope.row.seckillPrice" placeholder="秒杀价"></el-input>
			      </template>
			    </el-table-column>
			    <el-table-column
			      label="每人限购">
			      <template slot-scope="scope">
			      	<el-input v-model="scope.row.buyerNumber" placeholder="每人限购数量"></el-input>
			      </template>
			    </el-table-column>
			    <el-table-column
			      label="佣金">
			      <template slot-scope="scope">
			      	<el-input v-model="scope.row.commissionAmount" placeholder="佣金"></el-input>
			      </template>
			    </el-table-column>
			    <el-table-column
			      label="秒杀库存">
			      <template slot-scope="scope">
			      	<el-input v-model="scope.row.store" placeholder="秒杀库存"></el-input>
			      </template>
			    </el-table-column>
			    <el-table-column
			      label="预设已销售">
			      <template slot-scope="scope">
			      	<el-input v-model="scope.row.presetSalesStore" placeholder="已销售"></el-input>
			      </template>
			    </el-table-column>
			    <el-table-column
			      v-if="!isAdd"
			      label="操作">
			      <template slot-scope="scope">
			      	<el-button type="primary" @click="sureChange(scope.row)" szie="small">保存</el-button>
			      </template>
			    </el-table-column>
			</el-table>
		  </el-form-item>
		  <el-form-item label="秒杀开始时间">
		  	<el-date-picker
		  	  :disabled="!isAdd"
	      	  value-format="timestamp"
		      v-model="startTime"
		      type="datetime"
		      placeholder="选择日期时间">
		    </el-date-picker>
		  </el-form-item>
		</el-form>
	  <span slot="footer" class="dialog-footer">
	    <el-button @click="infoHandleClose">取 消</el-button>
	    <el-button v-if="isAdd" type="primary" @click="sureadd">添 加</el-button>
	  </span>
	</el-dialog>
	<!-- 选择商品 -->
    <el-dialog
      :title="选择商品"
      :visible.sync="dialogShow"
      class="mg5vh"
      width="80%"
      @close="clospageCom"
      :before-close="handleClose">
      <goods @closepage="clospageCom"  v-model="goodsitem" itemdata="choose"></goods>
    </el-dialog>
</div>	
</template>

<script type="text/javascript">
import goods from '@/components/goods/goodslist.vue'

export default{
	name:'spikeinfo',
	props:['itemdata'],
	components:{
		goods
	},
	data(){
		return {
			list:'',
			postData:{
				pageIndex:1,
				dayStr:''
			},
			page:{
				num:''
			},
			// 增加秒杀
			dialogVisible:false,
			dialogShow:false,
			// 商品绑定数据
			goodsitem:'',
			// goods详细信息
			goodsInfo:'',
			form:{},
			// 秒杀开始时间
			startTime:'',
			isAdd:true
		}
	},
	created(){
		console.log('秒杀列表',this.itemdata)
		let tiem =  (new Date()).getTime()
		this.postData.dayStr = this.$utils.getTime(tiem,'day','')
		console.log(this.postData)
		this.getlist()
	},
	computed:{
		listdata(){
			if(this.list){
				this.list.map(val=>{
					val.effectiveDate = val.effectiveDate.slice(0,4)+'/'+val.effectiveDate.slice(4,6)+'/'+val.effectiveDate.slice(6)
				})
				return this.list
			}
		}
	},
	methods:{
		//编辑秒杀后重新加载页面
		infoHandleClose(){
			console.log('重新加载页面')
			this.dialogVisible = false
			this.getlist()
		},
		// 重新排序
		newsort(item){
			console.log('重新排序',item)
			this.$prompt('请输入新的排序序号', '提示', {
			  confirmButtonText: '确定',
			  cancelButtonText: '取消'
			}).then(async ({ value }) => {
			  this.$api.seckillGoodsSort({pid:item.pid,dayStr:this.postData.dayStr,sortId:value},data=>{
			  	console.log(data)
			  	if (data.data.res_code==1) {
			  		this.$message({
						showClose:true,
						message:'秒杀商品排序成功',
						type:'success'
					})
					this.getlist()
			  	} else {
			  		this.$message({
						showClose:true,
						message:'秒杀商品排序失败',
						type:'error'
					})
			  	}
			  })
			}).catch(() => {
			      
			})
		},
		// 添加秒杀
		sureadd(){
			console.log('添加秒杀',this.goodsInfo.supplierProductSkuVoList)
			let arr = []
			this.goodsInfo.supplierProductSkuVoList.map(val=>{
				val.startTime = this.startTime
				arr.push(val)
			})
			console.log('arr==',arr)
			this.$api.seckillAdd({seckillSkuArrayJson:JSON.stringify(arr)},(data)=>{
				console.log(data)
				if(data.data.res_code==1){
					this.$message({
						showClose:true,
						message:'秒杀商品添加成功',
						type:'success'
					})
					this.dialogVisible = false
					this.getlist()
				}else{
					this.$message({
						showClose:true,
						message:'秒杀商品添加失败',
						type:'error'
					})
				}
			})
		},
		// 确定编辑秒杀
		sureChange(item){
			console.log('确定编辑秒杀',item)
			let res = {
				psiid:item.psiid,
				pid:item.pid,
				skuKey:item.skuKey,
				store:item.store,
				presetSalesStore:item.presetSalesStore,
				salesStore:item.salesStore,
				seckillPrice:item.seckillPrice,
				commissionAmount:item.commissionAmount,
				buyerNumber:item.buyerNumber
			}
			console.log('编辑秒杀参数',res)
			this.$api.seckillUpdata(res,data=>{
				console.log(data)
				if(data.data.res_code==1){
					this.$message({
						showClose:true,
						message:'秒杀商品编辑成功',
						type:'success'
					})
					this.changeclass({pid:item.pid})
				}else{
					this.$message({
						showClose:true,
						message:'秒杀商品编辑失败',
						type:'error'
					})
				}
			})
		},
		// 选择秒杀
		choose(item){
			this.$emit('input',item)
			this.closepage()
		},
		closepage(){
			this.$emit('closepage')
		},
		getlist(){
			console.log('获取秒杀列表',this.postData)
			this.$api.seckillGoodsList(this.postData,(data)=>{
				console.log(data)
				if(data.status == 200){
					if (data.data.res_code==1) {
						this.list = data.data.result
					} else {
						this.list = ""
					}
					this.page.num = data.data.total
				} else {
					this.$message({
						showClose:true,
						message:'秒杀列表获取失败',
						type:'error'
					})
				}
			})
		},
		// 编辑秒杀
		changeclass(item){
			console.log('编辑秒杀',item)
			this.dialogVisible = true
			this.isAdd = false
			this.$api.seckillList({pid:item.pid,dayStr:this.postData.dayStr},data=>{
				console.log(data)
				if(data.data.res_code==1){
					this.goodsitem={
						pid:item.pid,
						title:item.productInfoVo.title,
						mainImgUrl:item.productInfoVo.mainImgUrl
					}
					this.goodsInfo = {supplierProductSkuVoList:data.data.result}
					console.log('goodsInfo',this.goodsInfo)
					this.startTime = data.data.result[0].startTime
				}else{
					this.$message({
						showClose:true,
						message:'秒杀信息失败',
						type:'error'
					})
				}
			})
			// this.$api.infoDetail({pid:item.pid},(data)=>{
			// 	console.log(data)
			// 	if(data.data.res_code==1){
			// 		this.goodsitem={
			// 			pid:data.data.result.pid,
			// 			shortTitle:data.data.result.shortTitle,
			// 			mainImgUrl:data.data.result.mainImgUrl
			// 		}
			// 		this.goodsInfo = {supplierProductSkuVoList:data.data.result.productSeckillInfoVoList}
			// 		console.log('goodsInfo',this.goodsInfo)
			// 		this.startTime = data.data.result.productSeckillInfoVoList[0].startTime
			// 	}else{
			// 		this.$message({
			// 			showClose:true,
			// 			message:'秒杀信息失败',
			// 			type:'error'
			// 		})
			// 	}
			// })
		},
		// 删除商品
		remove(item){
			console.log('删除商品',item)
			this.$confirm('此操作将该秒杀商品删除?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(async () => {
	        	let res = {pid:item.pid,dayStr:this.postData.dayStr}
	         	this.$api.seckillGoodsDel(res,(data)=>{
	         		console.log(data)
	         		if(data.data.res_code==1){
	         			this.$message({
	         				showClose:true,
							message:'秒杀商品删除成功',
							type:'success'
	         			})
	         			this.getlist()
	         		}else{
	         			this.$message({
	         				showClose:true,
							message:'秒杀商品删除失败',
							type:'error'
	         			})
	         		}
	         	})
	        }).catch(() => {
	           
	        })
		},
		// 选择商品
		choosebut(){
			this.dialogShow = true
		},
		pageChange(item){
			this.postData.pageIndex = item
			this.getlist()
		},
		addnewbut () {
			console.log('添加秒杀')
			this.isAdd = true
			this.dialogVisible = true
			this.goodsitem = ''
		},
		// 关闭选择商品
		clospageCom(){
			this.dialogShow = false
		}
	},
	watch:{
		goodsitem(val){
			if(this.isAdd){
				if(val){
					console.log('goodsitem改变',val)
					this.$api.infoDetail({pid:val.pid},(data)=>{
						console.log(data)
						if(data.data.res_code==1){
							data.data.result.supplierProductSkuVoList.map(val2=>{
								val2.oldstore = val2.store
								val2.store = val2.store
								val2.buyerNumber = val2.store
								val2.seckillPrice = val2.salesPrice
								// let num = Math.ceil(Math.random()*400+100)
								val2.presetSalesStore = 0
							})
							this.goodsInfo = data.data.result
						}else{
							this.$message({
		         				showClose:true,
								message:'商品信息获取失败',
								type:'error'
		         			})
						}
					})
				}else{
					this.goodsInfo=""
				}
			}
		}
	}
}
	
</script>

<style type="text/css">
.classlist{
	width: 100%;
	height: 100%;
}
.img{
	max-width: 80px;
	max-height: 80px;
}
.itembox{
	border-radius: 5px;
	border:1px solid #ccc;
	display: inline-block;
	margin-right: 20px;
	margin-bottom: 20px;
}
</style>
