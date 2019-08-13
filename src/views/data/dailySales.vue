<template>
  <div class="box flex2">
  		<div class="pad10 flex">
  			<div class="flex1">
            <el-date-picker
              v-model="searchData.startTime"
              type="date"
              size="mini"
              value-format="yyyyMMdd"
              placeholder="开始日期">
            </el-date-picker>
            <el-date-picker
              v-model="searchData.endTime"
              type="date"
              size="mini"
              value-format="yyyyMMdd"
              placeholder="结束日期">
            </el-date-picker>
        </div>
  			<div class="flex flexcenter">
  				<el-button type="primary" @click="searchBut" size="mini" icon="el-icon-search">搜索</el-button>
          <el-button :loading="downLoading" type="primary" @click="downgoods" size="mini" icon="el-icon-download">导出</el-button>
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
	            prop="statDate"
	            label="统计时间">
	          </el-table-column>
	          <el-table-column
	            prop="orderTotalAmount"
	            label="订单总金额">
	          </el-table-column>
	          <el-table-column
	            prop="orderTotalPayAmount"
	            label="支付订单金额">
	          </el-table-column>
	          <el-table-column
              prop="userRegisterNum"
              label="当日用户注册数">
            </el-table-column>
            <el-table-column
              prop="nonMemberOrderTotalPayAmount"
              label="非会员订单金额">
            </el-table-column>
            <el-table-column
              prop="memberOrderTotalPayAmount"
              label="会员订单金额">
            </el-table-column>
            <el-table-column
              prop="upMemberUserNum"
              label="当天够买399会员人数">
            </el-table-column>
            <el-table-column
              prop="orderNum"
              label="订单数(主订单)">
            </el-table-column>
            <el-table-column
              prop="discountAmount"
              label="优惠金额">
            </el-table-column>
            <el-table-column
              prop="costAmount"
              label="成本">
            </el-table-column>
            <el-table-column
              prop="allCustomerPrice"
              label="当日用户的客单价">
            </el-table-column>
            <el-table-column
              prop="nonMemberCustomerPrice"
              label="非会员用户客单价">
            </el-table-column>
            <el-table-column
              prop="buyerUserNum"
              label="当日购买用户数">
            </el-table-column>
            <el-table-column
              prop="newCustomerNum"
              label="新客户下单数（首次下单）">
            </el-table-column>
            <el-table-column
              prop="oldCustomerNum"
              label="老客户下单数">
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
  name: 'dailySales',
  data () {
  	return {
      downLoading:false,
  		postData:{
  			pageIndex:1
  		},
  		// 银行信息列表
  		list:'',
  		// 银行组件传递的值
  		searchData:{},
      page:{
        num:''
      }
  	}
  },
  created(){
  	this.getList()
  },
  methods:{
    downgoods(){
      this.downLoading = true
      let downgoodsdata = {}
      for (let i in this.searchData) {
        if(i!='pageIndex'){
          downgoodsdata[i] = this.searchData[i]
        }
      }
      console.log('导出商品',downgoodsdata)
      this.$api.dailySalesExport(downgoodsdata).then(data=>{
        if (data.data) {
          console.log('下载商品',data)
          if(!!window.ActiveXObject || "ActiveXObject" in window) {
            console.log('ie浏览器')
            let blob = new Blob([data.data])
            let fileName = '日销售额.xlsx'
            navigator.msSaveBlob(blob, fileName)
          } else {
            let content = data.data
            let elink = document.createElement('a');
            let blob = new Blob([content]);
            elink.download = "日销售额.xlsx";
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
            message: '抱歉，导出失败！',
            type: 'error'
          })
        }
        this.downLoading = false
      }).catch(data=>{
        console.log('catch',data)
        this.$message({
          showClose: true,
          message: data.data.message?data.data.message:'抱歉，导出失败！',
          type: 'error'
        })
        this.downLoading = false
      })
    },
  	getList () {
  		console.log('获取银行列表')
  		let that = this
  		that.$api.dailySalesList(that.postData,(data)=>{
  			console.log(data)
  			if(data.status==200){
  				if(data.data.res_code==1){
  					that.list=data.data.result
  				}else{
            that.list = ""
          }
          this.page.num = data.data.total
  			}else{
  				that.$message({
		          showClose: true,
		          message: data.data.message?data.data.message:'抱歉，列表获取失败！',
		          type: 'error'
		        })
  			}
  		})
  	},
    //  搜索商品 
    searchBut () {
      console.log('搜索商品')
      for(let i in this.searchData){
        if(this.searchData[i]){
          this.postData[i]=this.searchData[i]
        }else{
          delete this.postData[i]
        }
      }
      this.getList()
    },
    pageChange(item){
      this.postData.pageIndex = item
      this.getList()
    }
  }
}
</script>

<style type="text/css" scoped>
.box{
	width: 100%;
	height: 100%;
	background-color: #fff;
}
.box1,.box2{
	width: 100%;
	height: 100%;
}
.imgbox{
	width: 100%;
	height: 100%;
}
.imgbox img{
	max-height: 100%;
	max-width: 100%;
}
</style>
