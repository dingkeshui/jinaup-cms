<template>
  <div id="box">
    <div class="flex pad10">
      <div class="flex1">
          <el-input size="mini" v-model="searchData.subOrderId" type="number" placeholder="子订单编号" clearable class="w100 mgr5"></el-input>
          <el-input size="mini" v-model="searchData.orderId" type="number" placeholder="主订单号" clearable class="w100 mgr5"></el-input>
          <el-input size="mini" v-model="searchData.sellerId" type="number" placeholder="卖家ID" clearable class="w100 mgr5"></el-input>
          <el-select size="mini" @change="searchbut" class="mgr5 w100" v-model="searchData.userIdentity" clearable placeholder="卖家身份">
            <el-option label="店主" value="1"></el-option>
            <el-option label="供货商" value="2"></el-option>
          </el-select>
          <el-select size="mini" @change="searchbut" class="mgr5 w100" v-model="searchData.productType" clearable placeholder="商品类型">
            <el-option label="普通商品" value="0"></el-option>
            <el-option label="升级会员商品" value="1"></el-option>
            <el-option label="秒杀商品" value="2"></el-option>
            <el-option label="拼团商品" value="3"></el-option>
          </el-select>
          <el-select size="mini" @change="searchbut" class="mgr5 w100" v-model="searchData.buyerStatus" clearable placeholder="买家状态">
            <el-option label="待收货" value="0"></el-option>
            <el-option label="已收货" value="1"></el-option>
            <el-option label="退货" value="2"></el-option>
            <el-option label="换货" value="3"></el-option>
          </el-select>
          <el-select size="mini" @change="searchbut" class="mgr5 w100" v-model="searchData.ascription" clearable placeholder="订单归属">
            <el-option label="平台" value="0"></el-option>
            <el-option label="店铺" value="1"></el-option>
          </el-select>
          <el-select size="mini" @change="searchbut" class="mgr5 w100" v-model="searchData.payStatus" clearable placeholder="支付状态">
            <el-option label="未付款" value="0"></el-option>
            <el-option label="已付款" value="1"></el-option>
            <el-option label="已退款" value="2"></el-option>
          </el-select>
          <el-select size="mini" @change="searchbut" class="mgr5 w100" v-model="searchData.deliveryType" clearable placeholder="配送类型">
            <el-option label="平台配送" value="1"></el-option>
            <el-option label="商家配送" value="2"></el-option>
          </el-select>
           <el-select size="mini" @change="searchbut" class="mgr5 w100" v-model="searchData.sellerStatus" clearable placeholder="卖家状态">
            <el-option label="备货中" value="0"></el-option>
            <el-option label="已发货" value="1"></el-option>
          </el-select>
          <el-select size="mini" @change="searchbut" class="mgr5 w100" v-model="searchData.state" clearable placeholder="订单状态">
            <el-option label="进行中" value="1"></el-option>
            <el-option label="已完成" value="2"></el-option>
            <el-option label="已关闭" value="3"></el-option>
            <el-option label="取消订单" value="4"></el-option>
          </el-select>
          <el-select size="mini" @change="searchbut" class="mgr5 w100" v-model="searchData.supplierPushStatus" clearable placeholder="推单状态">
            <el-option label="未推单" value="0"></el-option>
            <el-option label="已推单" value="1"></el-option>
            <el-option label="无需推单" value="2"></el-option>
          </el-select>
          <el-input size="mini" v-model="searchData.swid" placeholder="仓库ID" clearable class="w100 mgr5"></el-input>
          <el-date-picker
            size="mini"
            @change="searchbut"
            v-model="searchData.time"
            value-format="yyyy-MM-dd HH-mm-ss"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
      </div>
      <div>
        <div style="text-align:right;" class="mgb5"><el-button size="mini" @click="searchbut" type="primary" icon="el-icon-search">搜索</el-button></div>
        <div>
          <el-button size="mini" :loading="downOrderButLoading" @click="downfile" type="primary" icon="el-icon-download">导出</el-button>
          <el-button size="mini" :loading="downCwOrderButLoading" @click="finDownfile" type="primary" icon="el-icon-download">财务导出</el-button>
        </div>
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
        <!-- <el-table-column
          type="selection"
          fixed="left"
          width="55">
        </el-table-column> -->
        <el-table-column
          type="index"
          fixed="left"
          width="50">
        </el-table-column>
        <el-table-column
          prop="subOrderId"
          label="子订单号"
          width="200">
        </el-table-column>
        <el-table-column
          prop="orderId"
          label="主订单号"
          width="200">
        </el-table-column>
        <!-- <el-table-column
          label="订单归属"
          width="100">
          <template slot-scope="scope">
          	<el-tag v-if="scope.row.ascription==1" type="success">店铺</el-tag>
          	<el-tag v-else>平台</el-tag>
          </template>
        </el-table-column> -->
        <el-table-column
          prop="sellerName"
          label="卖家昵称"
          width="100">
        </el-table-column>
        <el-table-column
          prop="purchaserName"
          label="采购员"
          width="100">
        </el-table-column>
        <el-table-column
          prop="buyerName"
          label="买家昵称"
          width="100">
        </el-table-column>
        <el-table-column
          label="买家状态"
          width="100">
          <template slot-scope="scope">
          	<el-tag v-if="scope.row.buyerStatus==0">待收货</el-tag>
          	<el-tag v-if="scope.row.buyerStatus==1" type="success">已收货</el-tag>
          	<el-tag v-if="scope.row.buyerStatus==2" type="warning">退货</el-tag>
          	<el-tag v-if="scope.row.buyerStatus==3" type="danger">换货</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="支付状态"
          width="100">
          <template slot-scope="scope">
          	<el-tag v-if="scope.row.payStatus==0" type="danger">未付款</el-tag>
          	<el-tag v-if="scope.row.payStatus==1" type="success">已付款</el-tag>
          	<el-tag v-if="scope.row.payStatus==2" type="warning">已退款</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="评价状态"
          width="100">
          <template slot-scope="scope">
          	<el-tag type="warning" v-if="scope.row.isComment==0">未评价</el-tag>
          	<el-tag v-if="scope.row.isComment==1" type="success">已评价</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="discountAmount"
          label="优惠金额"
          width="100">
        </el-table-column>
        <el-table-column
          prop="deliveryMoney"
          label="快递费"
          width="100">
        </el-table-column>
        <el-table-column
          prop="reductionExpressPrice"
          label="减免快递费"
          width="100">
        </el-table-column>
        <el-table-column
          prop="totalAmount"
          label="子订单商家总金额（包含税费和运费）"
          width="150">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="订单备注"
          width="200">
        </el-table-column>
        <el-table-column
          label="配送分类"
          width="100">
          <template slot-scope="scope">
          	<el-tag v-if="scope.row.deliveryType==1">商家配送</el-tag>
            <el-tag type="success" v-if="scope.row.deliveryType==2">平台配送</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="卖家状态"
          width="100">
          <template slot-scope="scope">
          	<el-tag v-if="scope.row.sellerStatus==0">备货中</el-tag>
            <el-tag type="success" v-if="scope.row.sellerStatus==1">已发送</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="订单状态"
          width="100">
          <template slot-scope="scope">
          	<el-tag v-if="scope.row.state==1">进行中</el-tag>
            <el-tag type="success" v-if="scope.row.state==2">已完成</el-tag>
            <el-tag type="success" v-if="scope.row.state==3">已关闭</el-tag>
            <el-tag type="success" v-if="scope.row.state==4">取消订单</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="推单状态"
          width="100">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.supplierPushStatus==0">未推单</el-tag>
            <el-tag type="warning" v-if="scope.row.supplierPushStatus==1">已推单</el-tag>
            <el-tag type="danger" v-if="scope.row.supplierPushStatus==2">无需推单</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="logisticsCompany"
          label="物流公司编码"
          width="150">
        </el-table-column>
        <el-table-column
          prop="logisticsCode"
          label="物流单号"
          width="200">
        </el-table-column>
        <el-table-column
          prop="swid"
          label="仓库ID"
          width="100">
        </el-table-column>
        <el-table-column
          prop="deliveryTime"
          label="发货时间"
          width="150">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          width="200">
        </el-table-column>
        <!-- <el-table-column
          fixed="right"
          label="操作"
          align="center"
          width="100">
          <template slot-scope="scope">
            <el-button @click="downone(scope.row)" type="primary" size="small">导出</el-button>
          </template>
        </el-table-column> -->
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
  name: 'orderchildren',
  data () {
    return {
      // 订单导出
      downOrderButLoading:false,
      // 财务订单导出
      downCwOrderButLoading:false,
      // 请求列表参数
      postData:{
        pageIndex:1
      },
      // 页面信息
      page:{
        num:''
      },
      // 搜索的参数
      searchData:{},
      // 订单列表
      list:'',
      // 是否显示订单详情
      ordermainshow: false,
      //  详细筛选的弹出框
      screenmain: false,
      // 下载订单的参数
      downOrderData:{}
    }
  },
  created () {
    this.getList()
  },
  methods: {
    // 财务导出
    finDownfile(){
      this.downCwOrderButLoading = true
      let downOrderData = {}
      for (let i  in this.postData) {
        if(i != 'pageIndex'){
          downOrderData[i] = this.postData[i]
        }
      }
      console.log('财务导出')
      this.$api.financeDownOrder(downOrderData).then(data=>{
        console.log('财务导出',data)
        if(data){
          if(!!window.ActiveXObject || "ActiveXObject" in window) {
            console.log('ie浏览器')
            let blob = new Blob([data.data])
            let fileName = 'JNYP.xlsx'
            navigator.msSaveBlob(blob, fileName)
          } else {
            var content = data.data
            var elink = document.createElement('a');
            var blob = new Blob([content]);
            elink.download = "积纳有品财务订单.xlsx";
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
            message:'财务订单导出失败',
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
      this.$api.downOrder(downOrderData).then(data=>{
        console.log('下载订单',data)
        if(data){
          if(!!window.ActiveXObject || "ActiveXObject" in window) {
            console.log('ie浏览器')
            let blob = new Blob([data.data])
            let fileName = 'JNYP.xlsx'
            navigator.msSaveBlob(blob, fileName)
          } else {
            var content = data.data
            var elink = document.createElement('a');
            var blob = new Blob([content]);
            elink.download = "JNYP.xlsx";
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
    // 获取订单列表
    getList(){
      console.log('获取订单',this.postData)
      this.$api.orderItemInfoList(this.postData,data=>{
        console.log(data)
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
    // 搜索
    searchbut () {
      console.log('搜索')
      for (let i in this.searchData) {
        if (i=='time') {
          if(this.searchData.time){
            this.postData.startTime = this.searchData.time[0]
            this.postData.endTime = this.searchData.time[1]
          }else{
            delete this.postData.startTime
            delete this.postData.endTime
          }
        }else{
          if(this.searchData[i]){
            this.postData[i] = this.searchData[i]
          }else{
            delete this.postData[i]
          }
        }
      }
      this.postData.pageIndex = 1
      this.getList()
    }
  },
  computed:{
    listTime () {
      if(this.list){
        this.list.map(val=>{
          val.createTime = this.$utils.getTime(val.createTime)
          if (val.deliveryTime) {
            val.deliveryTime = this.$utils.getTime(val.deliveryTime)
          }
        })
      }
      console.log('计算属性',this.list)
      return this.list
    }
  }
}
</script>

<style type="text/css">
#box{
  background-color: #fff;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}
.maincontent{
  flex: 1;
  width: 100%;
  overflow: hidden;
  position: relative;
}
.minfoot{
  padding: 10px;
  border-top: 1px solid #ccc;
  text-align: right;
}
.tablebox{
  position: absolute;
  width: 100%;
  height: 100%;
}
.ordermain{
  height: 400px;
  border:1px solid #ccc;
  border-radius: 10px;
  overflow: hidden;
}
.ordermainitem{
  padding: 10px 0px;
  border-bottom: 1px solid #ccc;
  display: flex;
  width: 100%;
  align-items: center;
}
.ordermainitem:last-child{
  border-bottom: 0px;
}
.ordermainiteml{
  width: 100px;
  padding: 10px;
  border-right: 1px solid #ccc;
  text-align: center;
}
.ordermainitemr{
  flex: 1;
  padding: 10px;
}
.ordermainitemf{
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 80px;
}
.w150{
  width: 150px !important;
}
.w100{
  width: 100px !important;
  margin-bottom: 5px;
}
.w100 .el-input__inner{
  padding-left: 5px !important;
}
</style>
