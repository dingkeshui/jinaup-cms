<template>
  <div id="box">
    <div class="flex pad10">
      <div class="flex1">
          <el-input size="mini" v-model="searchData.subOrderId" type="number" placeholder="子订单编号" clearable class="w100 mgr5"></el-input>
          <el-input size="mini" v-model="searchData.orderId" type="number" placeholder="主订单号" clearable class="w100 mgr5"></el-input>
          <el-input size="mini" v-model="searchData.sellerId" type="number" placeholder="卖家ID" clearable class="w100 mgr5"></el-input>
          <el-input size="mini" v-model="searchData.consignee" type="text" placeholder="收货人" clearable class="w100 mgr5"></el-input>
          <el-input size="mini" v-model="searchData.consigneePhone" type="number" placeholder="收货人电话" clearable class="w100 mgr5"></el-input>
          <el-input size="mini" v-model="searchData.addressDetail" type="text" placeholder="收货地址" clearable class="w100 mgr5"></el-input>
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
            @change="timeChange"
            v-model="searchData.time"
            value-format="yyyy-MM-dd HH-mm-ss"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
      </div>
      <div>
        <div>
          <el-button size="mini" :loading="downCwOrderButLoading" @click="finDownfile" type="primary" icon="el-icon-download">财务导出</el-button>
        </div>
      </div>
    </div>
    <div class="maincontent">
        <div class="tablebox">
        <el-table
          :data="listTime"
          border
          height="100%"
          style="width: 100%">
          <el-table-column
              prop="id"
              width="50"
              aligin="center"
              label="id">
          </el-table-column>
          <el-table-column
              prop="downloadUrl"
              label="下载链接">
          </el-table-column>
          <el-table-column
              prop="createTime"
              width="170"
              label="创建时间">
          </el-table-column>
          <el-table-column
              fixed="right"
              label="操作"
              align="center"
              width="100">
              <template slot-scope="scope">
                <div>
                  <el-button type="primary" class="minbut" @click="downFun(scope.row)" size="small">下载</el-button>
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
      list:''
    }
  },
  created () {
    this.getList()
  },
  methods: {
    // 下载函数
    downFun (item) {
      console.log('点击下载',item)
      var iframe =document.createElement("iframe")
      iframe.style.display ="none";
      iframe.src = item.downloadUrl;
      document.body.appendChild(iframe);
    },
    // 时间改变
    timeChange(e){
      console.log('时间改变',e)
      if(e&&e.length==2){
        this.searchData.startTime = e[0]
        this.searchData.endTime = e[1]
      } else {
        this.searchData.startTime = ''
        this.searchData.endTime = ''
      }
    },
    // 财务导出
    finDownfile(){
      if(!this.searchData.startTime||!this.searchData.endTime){
        this.$message({
          showClose:true,
          message:'时间不能为空',
          type:'error'
        })
      }
      this.downCwOrderButLoading = true
      let downOrderData = {}
      for (let i  in this.searchData) {
        if(i != 'pageIndex'&&this.searchData){
          downOrderData[i] = this.searchData[i]
        }
      }
      console.log('财务导出')
      this.$api.orderReportTaskFinanceExport(downOrderData,res=>{
        this.downCwOrderButLoading = false
        if(res.data.res_code==1){
            this.$message({
              showClose:true,
              message:'订单导出成功',
              type:'success'
            })
            this.getList()
        }else{
            this.$message({
              showClose:true,
              message:res.data.message?res.data.message:'订单导出失败',
              type:'error'
            })
        }
      })
    },
    // 获取订单列表
    getList(){
      console.log('获取订单',this.postData)
      this.$api.reportDownLoadList(this.postData,data=>{
        console.log('获取订单',data)
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
