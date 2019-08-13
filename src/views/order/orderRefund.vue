<template>
	<div class="box flex2">
		<div class="pad10 flex">
			<div class="flex1">
				<el-input size="mini" v-model="searchData.grandsonOrderId" placeholder="商品订单号" clearable class="w150 mgr5"></el-input>
				<el-input size="mini" v-model="searchData.subOrderId" placeholder="子订单号" clearable class="w150 mgr5"></el-input>
				<el-date-picker
				  size="mini"
			      v-model="searchData.startTime"
			      type="datetime"
				  class="w150"
			      value-format="yyyy-MM-dd HH-mm-ss"
			      placeholder="开始日期时间">
			    </el-date-picker>
			    <el-date-picker
				  size="mini"
				  class="w150"
			      v-model="searchData.endTime"
			      type="datetime"
			      value-format="yyyy-MM-dd HH-mm-ss"
			      placeholder="结束日期时间">
			    </el-date-picker>
			    <el-select v-model="searchData.cooperationType" @change="searchbut" size="mini" class="w150" clearable placeholder="合作者">
			    	<el-option label="考拉" value="1"></el-option>
			    	<el-option label="唯妮" value="2"></el-option>
			    	<el-option label="e仓" value="3"></el-option>
			    </el-select>
			</div>
			<div>
				<el-button size="mini" @click="searchbut" type="primary" icon="el-icon-search">搜索</el-button>
				<el-button size="mini" :loading="downCwOrderButLoading" @click="finDownfile" type="primary" icon="el-icon-download">导出</el-button>
			</div>
		</div>
		<div class="maincontent">
			<div class="tablebox">
				<el-table
		        :data="listTime"
		        border
		        stripe
		        height="100%"
		        style="width: 100%">
		        <el-table-column
		          type="index"
		          fixed="left"
		          width="50">
		        </el-table-column>
		        <el-table-column
		          prop="grandsonOrderId"
		          label="商品订单号"
		          width="180">
		        </el-table-column>
		        <el-table-column
		          prop="subOrderId"
		          label="子订单号"
		          width="180">
		        </el-table-column>
		        <el-table-column
		          prop="refundAmount"
		          label="退款金额">
		        </el-table-column>
		        <el-table-column
		          label="货品状态">
		          <template slot-scope="scope">
	          		<el-tag size="small" type="success" v-if="scope.row.productStatus==1">已收到</el-tag>
	          		<el-tag size="small" type="warning" v-else>未收到</el-tag>
		          </template>
		        </el-table-column>
		        <el-table-column
		          label="退款状态">
		          <template slot-scope="scope">
		          	<el-tag size="small" type="primary" v-if="scope.row.sellerRefundStatus==0">待审核</el-tag>
		          	<el-tag size="small" type="danger" v-if="scope.row.sellerRefundStatus==1">已拒绝</el-tag>
		          	<el-tag size="small" type="success" v-if="scope.row.sellerRefundStatus==2">已同意</el-tag>
		          </template>
		        </el-table-column>
		        <el-table-column
		          prop="refundRemark"
		          label="退款原因"
		          width="150">
		        </el-table-column>
		        <el-table-column
		          prop="refundDesc"
		          label="退款说明"
		          min-width="150">
		        </el-table-column>
		      	</el-table>
			</div>
		</div>
		<div class="minfoot">
			<el-pagination
		        background
		        page-size="20"
		        :total="page.num"
		        @current-change="pageChange"
		        layout="total, prev, pager, next, jumper">
		    </el-pagination>
		</div>
	</div>
</template>

<script type="text/javascript">
export default {
	name:'orderRefund',
	data(){
		return {
			downCwOrderButLoading:false,
			list:'',
			searchData:{},
			postData:{
				pageIndex:1
			},
			page:{
				num:''
			}
		}
	},
	created () {
		this.getList()
	},
	computed:{
		listTime () {
			if(this.list){
				this.list.map(val=>{
				  val.createTime = this.$utils.getTime(val.createTime)
				})
			}
			console.log('计算属性',this.list)
			return this.list
		}
	},
	methods:{
		finDownfile(){
	      this.downCwOrderButLoading = true
	      let downOrderData = {}
	      for (let i  in this.postData) {
	        if(i != 'pageIndex'){
	          downOrderData[i] = this.postData[i]
	        }
	      }
	      console.log('财务导出')
	      this.$api.downOrderRefund(downOrderData).then(data=>{
	        console.log('财务导出',data)
	        if(data){
	          if(!!window.ActiveXObject || "ActiveXObject" in window) {
	            console.log('ie浏览器')
	            let blob = new Blob([data.data])
	            let fileName = '积纳有品退款订单.xlsx'
	            navigator.msSaveBlob(blob, fileName)
	          } else {
	            console.log('非ie')
	            var content = data.data
	            var elink = document.createElement('a');
	            var blob = new Blob([content]);
	            elink.download = "积纳有品退款订单.xlsx";
	            elink.style.display = 'none';
	            elink.href = URL.createObjectURL(blob)
	            document.body.appendChild(elink)
	            elink.click()
	            document.body.removeChild(elink)
	            window.URL.revokeObjectURL(blob)
	          }
	        }else{
	          this.$message({
	            showClose:true,
	            message:'退款订单导出失败',
	            type:'error'
	          })
	        }
	        this.downCwOrderButLoading = false
	      }).catch(data=>{
	        console.log('catch失败',data)
	        this.$message({
	          showClose:true,
	          message:'财务订单导出失败',
	          type:'error'
	        })
	        this.downCwOrderButLoading = false
	      })
	    },
		searchbut () {
			console.log('搜索')
			for (let i in this.searchData) {
			this.postData[i] = this.searchData[i]
			}
			this.postData.pageIndex = 1
			this.getList()
		},
		getList () {
	      console.log('获取退款订单列表',this.postData)
	      this.$api.orderRefundList(this.postData,data=>{
	        console.log('退款订单列表',data)
	        if (data.status==200) {
	          if (data.data.res_code==1) {
	            this.list = data.data.result
	          } else {
	            this.list = ""
	          }
	          this.page.num = data.data.total
	        } else {
	          this.$message({
	            showClose:true,
	            message:'订单获取失败',
	            type:'error'
	          })
	        }
	      })
	    },
		// 页面改变
	    pageChange (item) {
	      console.log('页面改变',item)
	      this.postData.pageIndex = item
	      this.getList()
	    },

	}
}	
</script>

<style type="text/css" scoped>
.box{
	width: 100%;
	height: 100%;
	background: #fff;
}
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
.spanColor1{
  color: #999DA2;
}
.spanColor2{
  color: #484848;
}
.goodsImgbox{
  width: 80px;
  height: 80px;
}
.goodsImgbox img{
  max-height: 100%;
  max-width: 100%;
}
.orderItemMid{
  border-bottom: 1px solid rgba(232,232,232,1);
}
.butBox{
  border-left: 1px solid rgba(232,232,232,1);
}
.w200{
  width: 200px;
}
.w150{
  width: 150px;
}
.w100{
  width: 100px;
}
.orderOneItemBox{
  border-right: 1px solid #ccc;
}
.orderOneItem + .orderOneItem{
  border-top:1px solid #e8e8e8; 
}
.moneySpan{
  width: 70px;
  padding-left: 30px;
}
.w150 .moneySpan{
  padding-left: 20px;
}
.goodsTitleBox{
  font-size: 15px;
  color: #484848;
}
.titleSpan{
  color: #484848;
}
</style>