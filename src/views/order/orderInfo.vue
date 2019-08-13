<template>
  <div id="box">
    <div class="flex pad10">
      <div class="flex1">
          <div class="mgb5">
            <el-input size="mini" v-model="searchData.grandsonOrderId" type="number" placeholder="商品订单ID" clearable class="w100px mgr5"></el-input>
            <el-input size="mini" v-model="searchData.subOrderId" type="number" placeholder="子订单编号" clearable class="w100px mgr5"></el-input>
            <el-input size="mini" v-model="searchData.orderId" type="number" placeholder="主订单编号" clearable class="w100px mgr5"></el-input>
            <el-input size="mini" v-model="searchData.pid" type="number"  placeholder="商品ID" clearable class="w100px mgr5"></el-input>
            <el-input size="mini" v-model="searchData.cid" type="number" placeholder="商品分类ID" clearable class="w100px mgr5"></el-input>
            <el-input size="mini" v-model="searchData.bid" type="number" placeholder="品牌ID" clearable class="w100px mgr5"></el-input>
            <el-button size="mini" @click="showMoreSearch" :icon="showMore?'el-icon-caret-top':'el-icon-caret-bottom'">{{showMore?'收起':'更多'}}</el-button>
          </div>
          <div v-if="showMore" class="mgb5">
            <el-input size="mini" v-model="searchData.skuKey" placeholder="商品skukey" clearable class="w100px mgr5"></el-input>
            <el-input size="mini" v-model="searchData.sellerId" type="number" placeholder="卖家用户ID" clearable class="w100px mgr5"></el-input>
            <el-input size="mini" v-model="searchData.buyerId" type="number" placeholder="买家用户ID" clearable class="w100px mgr5"></el-input>
            <el-input size="mini" v-model="searchData.usiid" type="number" placeholder="卖家店铺ID" clearable class="w100px mgr5"></el-input>
            <el-select size="mini" class="mgr5 w100px" v-model="searchData.productAscription" clearable placeholder="结算方式">
              <el-option label="售价" value="0"></el-option>
              <el-option label="扣点" value="1"></el-option>
              <el-option label="成本价" value="2"></el-option>
            </el-select>
            <el-input size="mini" v-model="searchData.uciid" placeholder="优惠券ID" clearable class="w100px mgr5"></el-input>
            <el-select size="mini" class="mgr5 w100px" v-model="searchData.productType" clearable placeholder="商品类型">
              <el-option label="普通商品" value="0"></el-option>
              <el-option label="升级会员商品" value="1"></el-option>
              <el-option label="秒杀商品" value="2"></el-option>
              <el-option label="拼团商品" value="3"></el-option>
            </el-select>
            <el-select size="mini" class="mgr5 w100px" v-model="searchData.productAscription" clearable placeholder="商品平台">
              <el-option label="自发商品" value="1"></el-option>
              <el-option label="播货商品" value="2"></el-option>
              <el-option label="分享平台商品" value="3"></el-option>
            </el-select>
            <el-select size="mini" class="mgr5 w100px" v-model="searchData.buyerStatus" clearable placeholder="卖家状态">
              <el-option label="待收货" value="0"></el-option>
              <el-option label="已收货" value="1"></el-option>
              <el-option label="已退货" value="2"></el-option>
            </el-select>
            <el-select size="mini" class="mgr5 w100px" v-model="searchData.payStatus" clearable placeholder="支付状态">
              <el-option label="未付款" value="0"></el-option>
              <el-option label="已付款" value="1"></el-option>
              <el-option label="已退款" value="2"></el-option>
            </el-select>
            <el-select size="mini" class="mgr5 w100px" v-model="searchData.buyerRefundStatus" clearable placeholder="买家售后状态">
              <el-option label="无申请" value="0"></el-option>
              <el-option label="仅退款" value="1"></el-option>
              <el-option label="退货退款" value="2"></el-option>
              <el-option label="换货" value="3"></el-option>
            </el-select>
            <el-input size="mini" v-model="searchData.returnLogisticsCode" type="number" placeholder="退货物流编号" clearable class="w100px mgr5"></el-input>
            <el-input size="mini" v-model="searchData.refundOrderNumber" type="number" placeholder="三方退款单号" clearable class="w100px mgr5"></el-input>
          </div>
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
          prop="productTitle"
          label="产品标题"
          width="150">
        </el-table-column>
        <el-table-column
          label="商品主图信息"
          width="120">
          <template slot-scope="scope">
            <img class="goodsimg" :src="scope.row.mainImgUrl">
          </template>
        </el-table-column>
        <el-table-column
          prop="grandsonOrderId"
          label="商品订单ID"
          width="150">
        </el-table-column>
        <el-table-column
          prop="orderId"
          label="主订单编号"
          width="150">
        </el-table-column>
        <el-table-column
          prop="subOrderId"
          label="子订单编号"
          width="150">
        </el-table-column>
        <el-table-column
          prop="pid"
          label="商品ID"
          width="100">
        </el-table-column>
        <el-table-column
          prop="cid"
          label="商品分类ID"
          width="100">
        </el-table-column>
        <el-table-column
          prop="bid"
          label="商品品类ID"
          width="150">
        </el-table-column>
        <el-table-column
          label="产品类型"
          width="150">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.productType==0">普通商品</el-tag>
            <el-tag type="success" v-if="scope.row.productType==1">会员商品</el-tag>
            <el-tag type="warning" v-if="scope.row.productType==2">秒杀商品</el-tag>
            <el-tag type="danger" v-if="scope.row.productType==3">拼团商品</el-tag>
          </template>
        </el-table-column>
        <!-- <el-table-column
          label="产品类型"
          width="150">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.productAscription==1">自发商品</el-tag>
            <el-tag type="warning" v-if="scope.row.productAscription==2">播货商品</el-tag>
            <el-tag type="danger" v-if="scope.row.productAscription==3">分享平台商品</el-tag>
          </template>
        </el-table-column> -->
        <!-- <el-table-column
          prop="sowingUserId"
          label="播货用户ID"
          width="100">
        </el-table-column>
        <el-table-column
          prop="sowingPid"
          label="播货商品ID"
          width="100">
        </el-table-column>
        <el-table-column
          prop="priceMarkup"
          label="播货单件加价价格"
          width="150">
        </el-table-column> -->
        <el-table-column
          prop="discountAmount"
          label="优惠券占比价格"
          width="150">
        </el-table-column>
        <!-- <el-table-column
          prop="skuKey"
          label="商品sku key"
          width="100">
        </el-table-column>
        <el-table-column
          prop="spSkuKey"
          label="供货商产品sku表key"
          width="100">
        </el-table-column> -->
        <el-table-column
          prop="salesPrice"
          label="商品销售单价(播货价+售价+税费)"
          width="150">
        </el-table-column>
        <el-table-column
          prop="memberDiscountPrice"
          label="会员折扣价(单商品分佣使用)"
          width="150">
        </el-table-column>
        <el-table-column
          prop="productNumber"
          label="购买数量"
          width="100">
        </el-table-column>
        <el-table-column
          prop="taxationAmount"
          label="税费"
          width="100">
        </el-table-column>
        <el-table-column
          prop="buyerId"
          label="买家用户ID"
          width="100">
        </el-table-column>
        <el-table-column
          prop="sellerId"
          label="卖家用户ID"
          width="100">
        </el-table-column>
        <el-table-column
          prop="usiid"
          label="卖家店铺ID"
          width="100">
        </el-table-column>
        <el-table-column
          label="结算方式"
          width="150">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.settlementType==0">售价</el-tag>
            <el-tag type="warning" v-if="scope.row.settlementType==1">成本价</el-tag>
            <el-tag type="success" v-if="scope.row.settlementType==2">扣点</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="points"
          label="扣点数"
          width="100">
        </el-table-column>
        <el-table-column
          label="评价状态"
          width="150">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.isComment==0">未评价</el-tag>
            <el-tag type="warning" v-if="scope.row.isComment==1">已评价</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="支付状态"
          width="150">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.payStatus==0">未付款</el-tag>
            <el-tag type="success" v-if="scope.row.payStatus==1">已付款</el-tag>
            <el-tag type="warning" v-if="scope.row.payStatus==2">已退款</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="买家状态"
          width="150">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.buyerStatus==0">待收货</el-tag>
            <el-tag type="success" v-if="scope.row.buyerStatus==1">已收货</el-tag>
            <el-tag type="warning" v-if="scope.row.buyerStatus==2">退换货</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="买家退货状态"
          width="150">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.buyerRefundStatus==1">仅退款</el-tag>
            <el-tag type="danger" v-else-if="scope.row.buyerRefundStatus==2">退款退货</el-tag>
            <el-tag type="warning" v-else-if="scope.row.buyerRefundStatus==3">换货</el-tag>
            <el-tag type="info" v-else>无</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="商家退货状态"
          width="150">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.sellerRefundStatus==2">同意</el-tag>
            <el-tag type="danger" v-else-if="scope.row.sellerRefundStatus==1">拒绝</el-tag>
            <el-tag type="info" v-else>无</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="logisticsCompanyCode"
          label="物流公司编码"
          width="150">
        </el-table-column>
        <el-table-column
          prop="logisticsCompany"
          label="物流公司名称"
          width="150">
        </el-table-column>
        <el-table-column
          prop="returnLogisticsCode"
          label="退货物流编号"
          width="150">
        </el-table-column>
        <el-table-column
          prop="refundOrderNumber"
          label="三方退款单号"
          width="150">
        </el-table-column>
        <el-table-column
          prop="refundRemark"
          label="退款原因"
          width="200">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          width="200">
        </el-table-column>
        <el-table-column
          fixed="right"
          align="center"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <template v-if="scope.row.payStatus!=2">
              <template v-if="scope.row.sellerRefundStatus">
                <el-button v-if="scope.row.sellerRefundStatus==2" :loading="refunButLoading" @click="refundBut(scope.row)" type="danger" size="small">确认退款</el-button>
                <span v-if="scope.row.sellerRefundStatus==1" class="red">已拒绝</span>
              </template>
              <template v-else>
                <template v-if="scope.row.buyerRefundStatus>0">
                  <div class="mgb5">
                    <el-button size="small" type="success" @click="okbut(scope.row)" class="minbut">同意</el-button>
                  </div>
                  <div>
                    <el-button size="small" type="danger" @click="nobut(scope.row)" class="minbut">拒绝</el-button>
                  </div>
                </template>
                <template v-else>
                  <el-button v-if="scope.row.productType==1" type="danger" @click="applyRefundBut(scope.row)" size="mini">申请退款</el-button>
                </template>
              </template>
            </template>
            <span v-else class="on">已退款</span>
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
    <!-- 申请退款 -->
    <el-dialog
      title="申请退款"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="退款原因">
          <el-input type="textarea" v-model="form.refundRemark"></el-input>
        </el-form-item>
        <el-form-item label="退款说明">
          <el-input type="textarea" v-model="form.refundDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureApplyRefundBut">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'orderinfo',
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
      // 是否显示更多筛选
      showMore:false,
      // 退款订单loading
      refunButLoading:false,
      // 申请退款
      dialogVisible:false,
      onOrder:'',
      form:{
        refundRemark:'',
        refundDesc:''
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    // 申请退款
    applyRefundBut(item){
      console.log('会员商品申请退款',item)
      this.dialogVisible = true
      this.onOrder = item
      // this.$api.sureApplyOrderRefund({})
    },
    sureApplyRefundBut(){
      this.$api.sureApplyOrderRefund({
        refundRemark:this.form.refundRemark,
        refundDesc:this.form.refundDesc,
        grandsonOrderId:this.onOrder.grandsonOrderId
      },data=>{
        console.log('会员退款',data)
        if(data.data.res_code==1){
          this.$message({
            showClose:true,
            message:'订单申请退款成功',
            type:'success'
          })
          this.dialogVisible = false
          this.getList()
        }else{
           this.$message({
            showClose:true,
            message:'订单申请退款失败',
            type:'error'
          })
        }
      })
    },
    // 获取订单列表
    getList(){
      console.log('获取商品订单',this.postData)
      this.$api.orderItemProductList(this.postData,data=>{
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
            message:'商品订单获取失败',
            type:'error'
          })
        }
      })
    },
    // 同意退款
    okbut(item){
      this.$api.sureOrderRefund({grandsonOrderId:item.grandsonOrderId,sellerRefundStatus:2},data=>{
        console.log('同意退款',data)
        if(data.data.res_code==1){
          this.$message({
            showClose:true,
            message:'同意退款申请成功',
            type:'success'
          })
          this.getList()
        }else{
          this.$message({
            showClose:true,
            message:'同意退款申请失败',
            type:'error'
          })
        }
      })
    },
    // 拒绝退款
    nobut(item){
      this.$prompt('拒绝原因', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(async ({ value }) => {
          this.$api.sureOrderRefund({grandsonOrderId:item.grandsonOrderId,sellerRefundStatus:1,refuseRemark:value},data=>{
            console.log('拒绝退款',data)
            if(data.data.res_code==1){
              this.$message({
                showClose:true,
                message:'拒绝退款申请成功',
                type:'success'
              })
              this.getList()
            }else{
              this.$message({
                showClose:true,
                message:'拒绝退款申请失败',
                type:'error'
              })
            }
          })
        }).catch(() => {
      
        })
    },
    // 确认退款
    refundBut(item){
      this.refunButLoading = true
      console.log('确认退款',item)
      this.$confirm('确认退款?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        this.$api.sureRefund({grandsonOrderId:item.grandsonOrderId},data=>{
          console.log(data)
          if(data.data.res_code==1){
            this.$message({
              showClose:true,
              message:'确认退款成功',
              type:'success'
            })
            this.getList()
          }else{
            this.$message({
              showClose:true,
              message:'确认退款失败',
              type:'error'
            })
          }
          this.refunButLoading = false
        })
      }).catch(() => {
          this.refunButLoading = false
      })
    },
    // 更多
    showMoreSearch () {
      this.showMore = !this.showMore
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
        if (this.searchData[i]) {
          this.postData[i] = this.searchData[i]
        } else {
          delete this.postData[i]
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
  margin-bottom: 5px;
}
.w100px .el-input__inner{
  padding-left: 5px !important;
}
.goodsimg{
  max-height: 100px;
  max-width: 100px;
}
</style>
