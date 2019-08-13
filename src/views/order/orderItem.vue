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
            <el-option label="会员商品" value="1"></el-option>
            <el-option label="体验会员商品" value="4"></el-option>
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
      <el-scrollbar class="noxscroll" style="height: 100%">
        <div v-for="(item,index) in listTime" class="orderItem">
          <div class="orderItemTop">
            <template v-if="item.sellerName">
              <span class="spanColor1">供货商:</span>
              <span class="spanColor2 mgr10">{{item.sellerName}}</span>
            </template>
            <template v-else>
              <span class="spanColor1">供货商ID:</span>
              <span class="spanColor2 mgr10">{{item.sellerId}}</span>
            </template>
            <span class="spanColor1">下单时间:</span>
            <span class="spanColor2 mgr10">{{item.createTime}}</span>
            <span class="spanColor1">订单号:</span>
            <span class="spanColor2 mgr10">{{item.subOrderId}}</span>
            <el-tag v-if="item.processStatus==1" size="small" class="mgr10" type="primary">待付款</el-tag>
            <el-tag v-if="item.processStatus==2" size="small" class="mgr10" type="danger">待发货</el-tag>
            <el-tag v-if="item.processStatus==3" size="small" class="mgr10" type="warning">待收货</el-tag>
            <el-tag v-if="item.processStatus==4" size="small" class="mgr10" type="success">待评价</el-tag>
            <el-tag v-if="item.processStatus==5" size="small" class="mgr10" type="info">取消</el-tag>
            <el-tag v-if="item.processStatus==9" size="small" class="mgr10" type="info">交易完成</el-tag>
            <span class="spanColor1">用户名:</span>
            <span class="spanColor2 mgr10">{{item.buyerName}}</span>
            <span class="spanColor1">用户ID:</span>
            <span class="spanColor2 mgr10">{{item.buyerId}}</span>
            <template v-if="item.processStatus!=5">
              <el-button v-if="item.processStatus>1" size="mini" type="primary" @click="subsidyFreightShow(item)">平台补贴运费</el-button>
            </template>
          </div>
          <div class="orderItemMid flex">
            <div class="flex1 orderOneItemBox">
              <div v-for="item2 in item.grandsonOrderlist" class="pad10 orderOneItem flex">
                <div class="flex goodsImgbox flexcenter mgr5">
                  <img :src="item2.mainImgUrl">
                </div>
                <div class="flex1">
                  <div style="min-height:40px;" class="goodsTitleBox">{{item2.productTitle}}</div>
                  <div class="fs12 mgb5">
                    <span class="titleSpan">商品订单号:</span>
                    <span class="on">{{item2.grandsonOrderId}}</span>
                  </div>
                  <div v-if="item2.confirmReceiptTime" class="fs12 mgb5">
                    <span class="titleSpan">确认收货时间:</span>
                    <span class="on">{{item2.confirmReceiptTime}}</span>
                  </div>
                  <div class="fs12 mgb5">
                    <span class="titleSpan">规格:</span>
                    <span class="on mgr10">{{item2.skuName}}</span>
                    <span class="titleSpan">数量:</span>
                    <span class="on mgr10">{{item2.productNumber}}</span>
                  </div>
                  <div class="fs12 mgb5">
                    <span class="titleSpan">采购员:</span>
                    <span class="on mgr10">{{item.purchaserName}}</span>
                  </div>
                  <div class="fs12">
                    <span class="titleSpan">单价:</span>
                    <span class="on mgr10">{{item2.salesPrice}}</span>
                    <template v-if="item2.buyerRefundStatus>0">
                      <span class="titleSpan">状态:</span>
                      <span v-if="item2.sellerRefundStatus==0" class="red mgr10">已申请退款</span>
                      <span v-if="item2.sellerRefundStatus==1" class="red mgr10">退款已拒绝</span>
                      <span v-if="item2.sellerRefundStatus==2" class="red mgr10">退款已同意</span>
                    </template>
                    <template v-if="item2.payStatus!=2">
                      <template v-if="item2.sellerRefundStatus">
                        <span class="titleSpan">操作:</span>
                        <el-button v-if="item2.sellerRefundStatus==2" :loading="refunButLoading" @click="refundBut(item2)" type="danger" class="minbut" size="small">确认退款</el-button>
                        <!-- <span v-if="scope.row.sellerRefundStatus==1" class="red">已拒绝</span> -->
                      </template>
                      <template v-else>
                        <template v-if="item2.buyerRefundStatus>0">
                            <span class="titleSpan">操作:</span>
                            <el-button size="small" type="success" @click="okbut(item2)" class="minbut mgr5">同意</el-button>
                            <el-button size="small" type="danger" @click="nobut(item2)" class="minbut">拒绝</el-button>
                        </template>
                        <template v-else>
                          <!-- <template v-if=""></template> -->
                          <template v-if="(item2.productType==1||item2.productType==4)&&item.processStatus>1">
                            <template v-if="item2.commissionStatus==0||item2.commissionStatus==1">
                              <span class="titleSpan">操作:</span>
                              <el-button class="minbut" type="danger" @click="applyRefundBut(item2)" size="small">申请退款</el-button>
                            </template>
                          </template>
                        </template>
                      </template>
                    </template>
                  </div>
                </div>
              </div>
            </div>
            <div class="w150 flex2 br flexcenter">
              <div style="width:100%;">
                <span class="moneySpan">总金额:</span><span class="red">￥{{item.totalAmount}}</span>
              </div>
              <div style="width:100%;" class="fs14"><span class="moneySpan">运费:</span><span>￥{{item.deliveryMoney}}</span></div>
              <div style="width:100%;" class="fs14"><span class="moneySpan">税费:</span><span>￥{{item.taxationAmount}}</span></div>
              <div style="width:100%;" class="fs14"><span class="moneySpan">优惠券:</span><span class="red">{{item.discountAmount}}元</span></div>
              <div style="width:100%;" class="fs14"><span class="moneySpan">补贴运费:</span><span class="red">{{item.subsidyFreight}}元</span></div>
            </div>
            <div class="w100 flex2 br flexcenter">
              <div class="fs18 mgb10">实付款</div>
              <div class="red fs18">{{item.payAmount}}</div>
            </div>
            <div class="w150 br flex2 flexcenter fs14">
              <!-- <div style="width:100%;"><span class="moneySpan">支付方式:</span>支付宝支付</div> -->
              <template v-if="item.logisticsCode">
                <template v-if="item.logisticsCode=='无'">
                 <div style="width:100%;"><span class="moneySpan">发货方式:</span>无需物流</div>
                </template>
                <template v-else>
                 <div style="width:100%;"><span class="moneySpan">发货方式:</span>快递发货</div>
                </template>
              </template>
            </div>
            <div class="w100 flex2 flexcenter">
              <template v-if="!item.isAllRefund">
               <div v-if="item.processStatus==2" class="mgb5">
                 待发货
               </div>
              </template>
              <div class="mgb5 red fs12" v-else><span>已全部申请退款</span></div>
              <!-- <div class="mgb5"><el-button size="small" @click="moreinfo(item)" class="minbut" type="primary">详情</el-button></div> -->
            </div>
          </div>
          <div class="fs12 pad10">
            <el-button v-if="item.sellerStatus!=1&&item.cooperationType<1" size="small" class="minbut" @click="changeConsigneeBut(item)" type="danger">修改收货信息</el-button>
            <span class="colaaa">收货人:</span>
            <span class="mgr10">{{item.consignee}}</span>
            <span class="colaaa">电话:</span>
            <span class="mgr10">{{item.consigneePhone}}</span>
            <span class="colaaa">地址:</span>
            <span class="mgr10">{{item.addressDetail}}</span>
            <template v-if="item.logisticsCode">
              <template v-if="item.logisticsCode=='无'">
                <el-tag size="small" type="info">无需物流</el-tag>
              </template>
              <template v-else>
                <el-tag size="small" type="info">{{item.logisticsCompany}}</el-tag>
                <span class="colaaa">快递单号:</span>
                <span class="on">{{item.logisticsCode}}</span>
              </template>
            </template>
          </div>
        </div>
      </el-scrollbar>
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
    <!-- 修改收货信息 -->
    <el-dialog
      title="修改收货信息"
      :visible.sync="showChangeConsignee"
      width="50%"
      :before-close="handleClose">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="子订单编号">
          <span>{{form2.subOrderId}}</span>
        </el-form-item>
        <el-form-item label="收货人">
          <el-input type="text" v-model="form2.consignee"></el-input>
        </el-form-item>
        <el-form-item label="收获人电话">
          <el-input type="text" v-model="form2.consigneePhone"></el-input>
        </el-form-item>
        <el-form-item label="收货地址">
          <el-input type="textarea" v-model="form2.addressDetail"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showChangeConsignee = false">取 消</el-button>
        <el-button type="primary" @click="sureChangeConsignee">确 定</el-button>
      </span>
    </el-dialog>
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
      downOrderData:{},
      // 退款订单loading
      refunButLoading:false,
      // 申请退款
      dialogVisible:false,
      onOrder:'',
      form:{
        refundRemark:'',
        refundDesc:''
      },
      form2:{
        subOrderId:'',
        addressDetail:'',
        consignee:'',
        consigneePhone:''
      },
      // 修改收货信息
      showChangeConsignee:false
    }
  },
  created () {
    this.getList()
  },
  methods: {
    changeConsigneeBut(item){
        console.log('修改收货信息')
        this.form2 = {
            subOrderId:item.subOrderId,
            addressDetail:item.addressDetail,
            consignee:item.consignee,
            consigneePhone:item.consigneePhone
        }
        this.showChangeConsignee = true
    },
    sureChangeConsignee () {
        console.log('确定修改收货信息')
        this.$api.updateConsignee(this.form2,res=>{
          if(res.data.res_code==1){
              this.$message({
                showClose:true,
                message:'操作成功',
                type:'success'
              })
              this.showChangeConsignee = false
              this.getList()
          }else{
              this.$message({
                showClose:true,
                message:res.data.message?res.data.message:'操作失败',
                type:'error'
              })
          }
        })
    },
    // 平台补贴运费
    subsidyFreightShow(item){
      this.$prompt('请输入补贴运费', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
      }).then(async ({ value }) => {
        this.$api.subsidyFreight({subOrderId:item.subOrderId,subsidyFreight:value},(res)=>{
          console.log('平台补贴运费',res)
          if (res.data.res_code==1) {
            this.$message({
              showClose:true,
              message:'操作成功',
              type:'success'
            })
            this.getList()
          } else {
            this.$message({
              showClose:true,
              message:res.data.message?res.data.message:'操作失败',
              type:'error'
            })
          }
        })
      }).catch(() => {
        
      })
    },
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
            message:res.data.message?res.data.message:'订单申请退款失败',
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
            let fileName = '积纳有品财务订单.xlsx'
            navigator.msSaveBlob(blob, fileName)
          } else {
            console.log('非ie')
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
          val.grandsonOrderlist.map(val2=>{
            if(val2.confirmReceiptTime){
              val2.confirmReceiptTime = this.$utils.getTime(val.confirmReceiptTime)
            }
          })
          let num = 0
          val.grandsonOrderlist.map(val2=>{
            if(val2.buyerRefundStatus>0&&val2.sellerRefundStatus!=1){
              num++
            }
          })
          if(num == val.grandsonOrderlist.length){
            val.isAllRefund = true
          }else{
            val.isAllRefund = false
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
