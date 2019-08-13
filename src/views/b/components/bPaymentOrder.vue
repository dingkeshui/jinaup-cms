<template>
	<div class="box flex2 bgfff">
		<div class="pad10 flex">
  			<div class="flex1">
  				<!-- <el-select size="mini" @change="searchBut" v-model="searchData.processStatus" style="width:100px;" class="mgr5 mgb5" clearable placeholder="流程状态">
	              <el-option label="待付款" value="1"></el-option>
	              <el-option label="待发货" value="2"></el-option>
	              <el-option label="待收货" value="3"></el-option>
	              <el-option label="待评价" value="4"></el-option>
	              <el-option label="取消" value="5"></el-option>
	              <el-option label="已退款" value="6"></el-option>
	              <el-option label="交易完成" value="9"></el-option>
	            </el-select>
	            <el-select size="mini" @change="searchBut" v-model="searchData.refundStatus" style="width:100px;" class="mgr5 mgb5" clearable placeholder="退款状态">
	              <el-option label="正常" value="0"></el-option>
	              <el-option label="申请退款" value="1"></el-option>
	              <el-option label="撤销退款" value="2"></el-option>
	              <el-option label="退款完成" value="3"></el-option>
	            </el-select>
  				<el-input size="mini" placeholder="订单号" clearable style="width:100px;" v-model="searchData.orderNumber"></el-input>
  				<el-input size="mini" placeholder="商品Id" clearable style="width:100px;" v-model="searchData.microPid"></el-input>
  				<el-input size="mini" placeholder="店铺id" clearable style="width:100px;" v-model="searchData.storeId"></el-input>
  				<el-input size="mini" placeholder="收件人姓名" clearable style="width:100px;" v-model="searchData.consignee"></el-input>
  				<el-input size="mini" placeholder="收件人手机号" clearable style="width:100px;" v-model="searchData.consigneePhone"></el-input>
  				<el-input size="mini" placeholder="收件人详细地址" clearable style="width:100px;" v-model="searchData.addressDetail"></el-input>
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
	            </el-date-picker> -->
	        </div>
  			<div class="flex flexcenter">
  				<!-- <el-button type="primary" @click="searchBut" size="mini" icon="el-icon-search">搜索</el-button> -->
	          	<el-button :loading="downOrderButLoading" type="primary" @click="downfile" size="mini" icon="el-icon-download">导出</el-button>
	  		</div>
  		</div>
  		<div class="maincontent">
      		<el-scrollbar class="noxscroll" style="height: 100%">
      			<div v-for="(item,index) in listTime" class="orderItem">
		          <div class="orderItemTop">
		            <template v-if="item.microStoreInfoVo">
		              <span class="spanColor1">店铺昵称:</span>
		              <span class="spanColor2 mgr10">{{item.storeName}}</span>
		            </template>
		            <!-- <template v-if="item.microStoreInfoVo">
		              <span class="spanColor1">店铺ID:</span>
		              <span class="spanColor2 mgr10">{{item.microStoreInfoVo.id}}</span>
		            </template> -->
		            <span class="spanColor1">下单时间:</span>
		            <span class="spanColor2 mgr10">{{$utils.getTime(item.orderTime)}}</span>
		            <span class="spanColor1">订单号:</span>
		            <span class="spanColor2 mgr10">{{item.orderNumber}}</span>
		            <el-tag size="small" class="mgr10" type="primary">{{item.payStatus}}</el-tag>
		            <el-tag size="small" class="mgr10" type="danger">{{item.processStatus}}</el-tag>
		            <span class="spanColor1">用户名:</span>
		            <span class="spanColor2 mgr10" v-if="item.buyerName">{{item.buyerName}}</span>
		            <!-- <span class="spanColor1">用户ID:</span>
		            <span class="spanColor2 mgr10">{{item.buyerId}}</span> -->
		          </div>
		          <div class="orderItemMid flex">
		            <div class="flex1 orderOneItemBox">
		              <div class="pad10 orderOneItem flex">
		                <div class="flex goodsImgbox flexcenter mgr5">
		                  <img :src="item.pictureUrl">
		                </div>
		                <div class="flex1">
		                  <div style="min-height:40px;" class="goodsTitleBox">{{item.goodsName}}</div>
		                  <div class="fs12 mgb5">
		                    <span class="titleSpan">数量:</span>
		                    <span class="on mgr10">{{item.buyNum}}</span>
		                  </div>
		                  <div class="fs12">
		                    <span class="titleSpan">单价:</span>
		                    <span class="on mgr10">{{item.unitPrice}}</span>
		                  </div>
		                </div>
		              </div>
		            </div>
		            <div class="w150 flex2 br flexcenter">
		              <div style="width:100%;">
		                <span class="moneySpan">总金额:</span>
		                <span class="red">￥{{item.orderAmount}}</span>
		              </div>
		              <div style="width:100%;" class="fs14">
		              	<span class="moneySpan">运费:</span>
		              	<span>￥{{item.totalDeliveryMoney}}</span>
		              </div>
		              <div style="width:100%;" class="fs14">
		              	<span class="moneySpan">优惠券:</span>
		              	<span class="red">{{item.totalDiscountAmount?item.totalDiscountAmount:0}}元</span>
		              </div>
		            </div>

		            <div class="w100 flex2 br flexcenter">
		              <div class="fs18 mgb10">实付款</div>
		              <div class="red fs18">{{item.payAmount}}</div>
		            </div>
		            <div class="w150 br flex2 flexcenter fs14">
		              	<div v-if="item.payStatus>1" style="width:100%;">
		              		<span class="moneySpan">支付方式:</span>
		              		<span>{{item.payChannel}}</span>
		          		</div>
		                <div style="width:100%;">
		                	<span class="moneySpan">发货方式:</span>
		                	<span >{{item.delivery}}</span>
		                </div>
		            </div>
		            <!-- <div class="w100 flex2 flexcenter">
		              <el-button v-if="item.refundStatus>=1" size="mini" type="primary" @click="lookInfo(item)">详情</el-button>
		            </div> -->
		          </div>
		          <!-- <div class="fs12 pad10 orderItemFoot">
		            <template v-if="item.receivingMethod==2">
			            <span class="colaaa">收货人:</span>
			            <span class="mgr10">{{item.consignee}}</span>
			            <span class="colaaa">电话:</span>
			            <span class="mgr10">{{item.consigneePhone}}</span>
			            <span class="colaaa">地址:</span>
			            <span class="mgr10">{{item.addressDetail}}</span>
		            </template>
		            <template v-else>
		            	<span>无需物流</span>
		            </template>
		          </div> -->
		        </div>
      		</el-scrollbar>
      	</div>
      	<div class="minfoot">
	      <el-pagination
	        background
	        size="small"
	        :page-size="20"
            @current-change="pageChange"
            :total="page.num"
	        layout="total, prev, pager, next, jumper">
	      </el-pagination>
    	</div>
    	<!-- 订单详情 -->
    	<el-dialog
	      title="订单详情"
	      :visible="dialog"
	      width="80%"
	      class="mg5vh"
	      @close="dialog = false">
	      <div class="box infoBox">
	      	<el-scrollbar class="noxscroll" v-if="orderInfo" style="height: 100%">
	      	<div class="flex mgb5">
	      		<div class="flex1">
	      			<span class="spanColor1">用户名</span>
	      			<span class="spanColor2">{{orderInfo.userInfoVo.nickName}}</span>
	      		</div>
	      		<div class="flex1">
	      			<span class="spanColor1">退款状态</span>
	      			<template v-if="orderInfo.sellerRefundStatus>=1">
	      				<span v-if="orderInfo.sellerRefundStatus==1" class="spanColor2">退款拒绝</span>
	      				<span v-if="orderInfo.sellerRefundStatus==2" class="spanColor2">退款已同意</span>
	      			</template>
	      			<template v-else>
	      				<span v-if="orderInfo.refundStatus==1" class="spanColor2">申请退款</span>
	      				<span v-if="orderInfo.refundStatus==2" class="spanColor2">撤销退款</span>
	      				<span v-if="orderInfo.refundStatus==3" class="spanColor2">退款完成</span>
	      			</template>
	      		</div>
	      	</div>
	      	<div class="flex mgb5">
	      		<div class="flex1">
	      			<span class="spanColor1">收件人</span>
	      			<span class="spanColor2">{{orderInfo.consignee}}</span>
	      		</div>
	      		<div class="flex1">
	      			<span class="spanColor1">退款原因</span>
	      			<span class="spanColor2">{{orderInfo.microOrderRefundVo.refuseRemark}}</span>
	      		</div>
	      	</div>
	      	<div class="flex mgb5">
	      		<div class="flex1">
	      			<span class="spanColor1">电话</span>
	      			<span class="spanColor2">{{orderInfo.consigneePhone}}</span>
	      		</div>
	      		<div class="flex1">
	      			<span class="spanColor1">退款说明</span>
	      			<span class="spanColor2">{{orderInfo.microOrderRefundVo.refundDesc}}</span>
	      		</div>
	      	</div>
	      	<div class="flex mgb5">
	      		<div class="flex1">
	      			<span class="spanColor1">地址</span>
	      			<span class="spanColor2">{{orderInfo.addressDetail}}</span>
	      		</div>
	      		<div class="flex1">
	      			<span class="spanColor1">订单状态</span>
	      			<span>
	      				<el-tag v-if="orderInfo.processStatus==1" size="small" class="mgr10" type="primary">待付款</el-tag>
			            <el-tag v-if="orderInfo.processStatus==2" size="small" class="mgr10" type="danger">待发货</el-tag>
			            <el-tag v-if="orderInfo.processStatus==3" size="small" class="mgr10" type="warning">待收货</el-tag>
			            <el-tag v-if="orderInfo.processStatus==4" size="small" class="mgr10" type="success">待评价</el-tag>
			            <el-tag v-if="orderInfo.processStatus==5" size="small" class="mgr10" type="info">取消</el-tag>
			            <el-tag v-if="orderInfo.processStatus==6" size="small" class="mgr10" type="info">已退款</el-tag>
			            <el-tag v-if="orderInfo.processStatus==9" size="small" class="mgr10" type="info">交易完成</el-tag>
	      			</span>
	      		</div>
	      	</div>
	      	<div class="flex mgb5">
	      		<div class="flex1">
	      			<span class="spanColor1">下单时间</span>
	      			<span class="spanColor2">{{orderInfo.orderTime}}</span>
	      		</div>
	      		<div class="flex1">
	      			<span class="spanColor1">订单号</span>
	      			<span class="spanColor2">{{orderInfo.orderNumber}}</span>
	      		</div>
	      	</div>
	      	<!-- <div v-if="orderInfo.microOrderRefundVo.uploadVoucher" class="flex mgb10">
	      		<div class="flex1">
	      			<span class="spanColor1">退款凭证</span>
	      			<span class="refundImg">
	      				<img v-for="item2 in orderInfo.microOrderRefundVo.uploadVoucher" @click="lookImg(item2)" :src="item2">
	      			</span>
	      		</div>
	      	</div> -->
	      	<div>
	      		<el-table
	      			border
				    :data="orderInfo.goodsInfo"
				    style="width: 100%">
				    <el-table-column
				        label="主图"
				        width="100">
				        <template slot-scope="scope">
				        	<div class="imgbox">
				        		<img :src="scope.row.img">
				        	</div>
				        </template>
				    </el-table-column>
				    <el-table-column
				        prop="title"
				        align="center"
				        label="名称">
				    </el-table-column>
				    <el-table-column
				        prop="currentPrice"
				        align="center"
				        label="单价"
				        width="100">
				    </el-table-column>
				    <el-table-column
				        prop="buyNum"
				        align="center"
				        label="数量"
				        width="100">
				    </el-table-column>
				     <el-table-column
				        prop="totalAmount"
				        align="center"
				        label="小计"
				        width="100">
				    </el-table-column>
			    </el-table>
	      	</div>
	      	</el-scrollbar>
	      </div>
	    </el-dialog>
	    <!-- 查看图片 -->
		<el-dialog
		  title="查看图片"
		  :visible.sync="dialogVisible2"
		  width="540px">
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
		props:['wid'],
		data () {
			return {
				list:[],
				searchData:{},
				postData:{
					pageIndex:1,
					wid:''
				},
				page:{
					num:0
				},
				downOrderButLoading:false,
				dialogVisible2:false,
				dialog:false,
				orderInfo:'',
				imgUrl:''
			}
		},
		created(){
			this.postData.wid = this.wid
			this.getList()
		},
		watch:{
			wid(val){
				console.log('货款提现订单',val)
				if(val){
					this.postData.wid = this.wid
					this.getList()
				}
			}
		},
		computed:{
			listTime(){
				if(this.list&&this.list.length){
					this.list.map(val=>{
						val.createTime = this.$utils.getTime(val.createTime)
					})
					return this.list
				}else{
					return []
				}
			}
		},
		methods:{
			lookImg (item) {
				this.imgUrl = item
				this.dialogVisible2 = true
			},
			lookInfo (item) {
				console.log('查看详情',item)
				this.$api.bOrderInfo({orderNumber:item.orderNumber},res=>{
					console.log('查看详情',res)
					if(res.data.res_code==1){
						res.data.result.time = this.$utils.getTime(res.data.result.createTime)
						res.data.result.goodsInfo = [{
							img:res.data.result.microProductPictureVos[0].imgUrl,
							title:res.data.result.microProductInfoVo.title,
							currentPrice:res.data.result.microProductInfoVo.currentPrice,
							buyNum:res.data.result.buyNum,
							totalAmount:res.data.result.totalAmount
						}]
						this.orderInfo = res.data.result
						this.dialog = true
					}else{
						this.$message({
				            showClose: true,
				            message: res.data.message?res.data.message:'抱歉，获取订单详情失败！',
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
		    	this.$api.bIncomeOrderList(this.postData,(res)=>{
		    		console.log('获取订单列表',res)
		    		if (res.data.res_code==1) {
		    			this.list = res.data.result
		    			this.page.num = res.data.total
		    		} else {
		    			if (res.data.res_code==1004) {
		    				this.list = ''
		    				this.page.num = ''
		    			} else {
		    				this.$message({
					            showClose: true,
					            message: res.data.message?res.data.message:'抱歉，获取订单列表失败！',
					            type: 'error'
					        })
		    			}
		    		}
		    	})
		    },
		    // 导出函数
		    downfile(){
		      this.downOrderButLoading = true
		      let downOrderData = {}
		      for (let i  in this.postData) {
		        if(i != 'pageIndex'){
		          downOrderData[i] = this.postData[i]
		        }
		      }
		      console.log('开始下载',downOrderData)
		      this.$api.downBIncomeOrderList(downOrderData).then(data=>{
		        console.log('下载订单',data)
		        if(data){
		          if(!!window.ActiveXObject || "ActiveXObject" in window) {
		            console.log('ie浏览器')
		            let blob = new Blob([data.data])
		            let fileName = '纳小店提现对应订单.xlsx'
		            navigator.msSaveBlob(blob, fileName)
		          } else {
		            var content = data.data
		            var elink = document.createElement('a');
		            var blob = new Blob([content]);
		            elink.download = "纳小店提现对应订单.xlsx";
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
		}
	}
</script>

<style type="text/css">
.maincontent{
  flex: 1;
  width: 100%;
  overflow: hidden;
  position: relative;
}
.orderItem{
  margin: 10px;
  border-radius: 5px;
  border:1px solid rgba(232,232,232,1);
}
.orderItemTop{
  padding: 10px;
  background-color: rgba(250,250,250,1);
  border-bottom: 1px solid rgba(232,232,232,1);
  font-size: 12px;
}
.orderItemMid{
  border-bottom: 1px solid rgba(232,232,232,1);
}
.imgbox{
	width: 80px;
	height: 80px;
	text-align: center;
}
.imgbox>img{
	max-height: 100%;
	max-width: 100%;
}
.infoBox .spanColor1{
	display: inline-block;
	width: 80px;
}
.refundImg img{
	max-width: 100px;
	max-height: 100px;
	margin-right: 10px;
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
.goodsImgbox{
	width: 80px;
	height: 80px;
}
.goodsImgbox img{
	max-height: 100%;
	max-width: 100%;
}
</style>