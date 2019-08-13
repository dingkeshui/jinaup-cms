<template>
  <div id="box">
    <div class="flex pad10">
      <div class="flex1">
          <el-input size="mini" v-model="searchData.orderNumber" type="number" placeholder="主订单号" clearable class="w100px mgr5"></el-input>
          <el-input size="mini" v-model="searchData.buyerId" type="number" placeholder="买家用户ID" clearable class="w100px mgr5"></el-input>
          <el-input size="mini" v-model="searchData.uciid" type="number" placeholder="优惠券ID" clearable class="w100px mgr5"></el-input>
          <el-select size="mini" class="mgr5 w100px" v-model="searchData.productType" clearable placeholder="商品类型">
            <el-option label="普通商品" value="0"></el-option>
            <el-option label="升级会员商品" value="1"></el-option>
            <el-option label="秒杀商品" value="2"></el-option>
            <el-option label="拼团商品" value="3"></el-option>
          </el-select>
          <el-select size="mini" class="mgr5 w100px" v-model="searchData.tradeStatus" clearable placeholder="交易状态">
            <el-option label="进行中" value="0"></el-option>
            <el-option label="已完成" value="1"></el-option>
            <el-option label="取消交易" value="2"></el-option>
            <el-option label="已结算" value="3"></el-option>
            <el-option label="已分佣" value="4"></el-option>
          </el-select>
          <el-select size="mini" class="mgr5 w100px" v-model="searchData.payStatus" clearable placeholder="支付状态">
            <el-option label="未付款" value="0"></el-option>
            <el-option label="已付款" value="1"></el-option>
            <el-option label="已退款" value="2"></el-option>
          </el-select>
          <el-select size="mini" class="mgr5 w100px" v-model="searchData.payChannel" clearable placeholder="支付渠道">
            <el-option label="微信" value="1"></el-option>
            <el-option label="支付宝" value="2"></el-option>
          </el-select>
          <el-input size="mini" v-model="searchData.outerTradeNo" type="number" placeholder="支付单号" clearable class="w100px mgr5"></el-input>
          <el-select size="mini" class="mgr5 w100px" v-model="searchData.orderChannel" clearable placeholder="订单来源">
            <el-option label="安卓" value="1"></el-option>
            <el-option label="IOS" value="2"></el-option>
            <el-option label="PC" value="3"></el-option>
            <el-option label="小程序" value="4"></el-option>
          </el-select>
      </div>
      <div>
        <el-button size="mini" @click="searchbut" type="primary" icon="el-icon-search">搜索</el-button>
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
          prop="orderNumber"
          label="订单号"
          width="150">
        </el-table-column>
        <el-table-column
          prop="consignee"
          label="收货人"
          width="150">
        </el-table-column>
        <el-table-column
          prop="buyerId"
          label="收货人ID"
          width="150">
        </el-table-column>
        <el-table-column
          prop="addressDetail"
          label="收货地址"
          width="250">
        </el-table-column>
        <el-table-column
          prop="consigneePhone"
          label="收货人手机"
          width="150">
        </el-table-column>
        <el-table-column
          prop="addressId"
          label="地址ID"
          width="150">
        </el-table-column>
        <el-table-column
          prop="orderAmount"
          label="订单金额(不含运费和税费)"
          width="100">
        </el-table-column>
        <el-table-column
          prop="orderChannel"
          label="订单来源"
          width="150">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.orderChannel==1">安卓</el-tag>
            <el-tag type="success" v-if="scope.row.orderChannel==2">IOS</el-tag>
            <el-tag type="warning" v-if="scope.row.orderChannel==3">PC</el-tag>
            <el-tag type="danger" v-if="scope.row.orderChannel==4">小程序</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="payAmount"
          label="支付金额"
          width="100">
        </el-table-column>
        <el-table-column
          label="支付方式"
          width="150">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.payChannel==1">微信</el-tag>
            <el-tag type="warning" v-if="scope.row.payChannel==2">支付宝</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="支付状态"
          width="150">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.payStatus==1">已支付</el-tag>
            <el-tag type="warning" v-if="scope.row.payStatus==2">未支付</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="payTime"
          label="支付时间"
          width="150">
        </el-table-column>
        <el-table-column
          prop="totalTaxationAmount"
          label="总税费"
          width="150">
        </el-table-column>
        <el-table-column
          prop="totalDeliveryMoney"
          label="总快递费"
          width="150">
        </el-table-column>
        <el-table-column
          prop="totalAmount"
          label="总金额(包含运费/税费)"
          width="150">
        </el-table-column>
        <el-table-column
          prop="outerTradeNo"
          label="第三方支付单号"
          width="150">
        </el-table-column>
        <el-table-column
          label="产品类型"
          width="150">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.productType==0">普通商品</el-tag>
            <el-tag type="success" v-if="scope.row.productType==1">升级会员商品</el-tag>
            <el-tag type="warning" v-if="scope.row.productType==2">秒杀商品</el-tag>
            <el-tag type="danger" v-if="scope.row.productType==3">拼团商品</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="remark"
          label="评论"
          width="200">
        </el-table-column>
        <el-table-column
          prop="subOrderlist"
          label="子订单"
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
          width="100">
          <template slot-scope="scope">
            <el-button @click="lookorder(scope.row)" type="text" size="small">查看/修改</el-button>
            <el-button type="text" size="small">删除</el-button>
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
  name: 'orderlist',
  data () {
    return {
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
    }
  },
  created () {
    this.getList()
  },
  methods: {
    // 获取订单列表
    getList(){
      console.log('获取订单',this.postData)
      this.$api.orderInfoList(this.postData,data=>{
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
        this.postData[i] = this.searchData[i]
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
          if (val.payTime) {
            val.payTime = this.$utils.getTime(val.payTime)
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
.w100px{
  width: 100px !important;
}
</style>
