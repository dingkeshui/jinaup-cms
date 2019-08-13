<template>
  <div id="upgoods">
    <el-scrollbar class="noxscroll" style="height: 100%">
    <h1 class="title on"><span v-if="goodsinfo">商品信息</span><span v-else>添加商品</span></h1>
    <div class="frombox">
      <el-form ref="myfrom" :rules="rules" :model="form" label-width="120px">
        <el-form-item v-if="goodsinfo" label="商品ID">
          <span class="on">{{goodsinfo.pid}}</span>
        </el-form-item>
        <el-form-item label="产品库ID">
          <span class="on">{{form.basePid}}</span>
          <!-- <el-button size="small" @click="chooseProduct">选择产品</el-button> -->
        </el-form-item>
        <el-form-item label="分类ID">
          <span class="on">{{form.cid}}</span>
        </el-form-item>
        <el-form-item label="品牌ID">
          <span class="on">{{form.bid}}</span>
        </el-form-item>
        <el-form-item label="供应商ID">
          <span class="on">{{form.uid}}</span>
        </el-form-item>
        <el-form-item label="采购员">
          <span class="on">{{form.purchaserName}}</span>
        </el-form-item>
        <el-form-item label="商品标题">
          <el-input placeholder="商品标题" clearable v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="商品短标题">
          <el-input placeholder="商品短标题" clearable v-model="form.shortTitle"></el-input>
        </el-form-item>
        <el-form-item label="商品说明">
          <el-input placeholder="商品说明" clearable v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="贸易方式">
          <el-select v-model="form.importType" placeholder="贸易方式">
            <el-option label="直邮" value="0"></el-option>
            <el-option label="保税" value="1"></el-option>
            <el-option label="海淘" value="2"></el-option>
            <el-option label="国内贸易" value="3"></el-option>
            <el-option label="个人清关" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产地">
          <el-input placeholder="产地" clearable v-model="form.origin"></el-input>
        </el-form-item>
        <el-form-item label="SPU计量单位">
          <el-select class="w200" v-model="form.unitMeasure" placeholder="计量单位">
            <el-option
              class="w200"
              v-for="item in unitMeasure"
              :key="item.enName"
              :label="item.zhName"
              :value="item.enName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="SPU计量单位值">
          <el-input placeholder="SPU计量单位值" clearable v-model="form.unitMeasureValue"></el-input>
        </el-form-item>
        <el-form-item label="重量">
          <el-input class="w200 mgr10" placeholder="重量" clearable v-model="form.weight"></el-input>
          <span class="colaaa">克</span>
        </el-form-item>
        <!-- <el-form-item label="商品编码">
          <el-input placeholder="商品编码" clearable v-model="form.barCode"></el-input>
        </el-form-item> -->
        <el-form-item label="产品国别">
          <el-input placeholder="产品国别" clearable v-model="form.country"></el-input>
        </el-form-item>
        <el-form-item label="是否包邮">
          <el-select class="w200" v-model="form.isFreeShipping" placeholder="是否包邮">
            <el-option label="包邮" value="1"></el-option>
            <el-option label="不包邮" value="0"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="是否预售">
          <el-select class="w200" v-model="form.isPresell" placeholder="是否预售">
            <el-option label="预售" value="1"></el-option>
            <el-option label="非预售" value="0"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="是否包税">
          <el-select class="w200" v-model="form.isFreeTax" placeholder="是否包税">
            <el-option label="包税" value="1"></el-option>
            <el-option label="不包税" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品主图">
          <div style="overflow: hidden">
          <div class="avatardiv">
            <input accept="image/*" ref="imga" @change="chooseimga" type="file" class="headimginp">
            <img v-if="imgaUrl" :src="imgaUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </div>
          </div>
          <p class="fs12 colccc mg-15">注:图片大小不得大于2M</p>
        </el-form-item>
        <!-- <el-form-item label="是否自营">
          <el-select class="w200" v-model="form.isSelf" placeholder="是否自营">
            <el-option label="自营" value="1"></el-option>
            <el-option label="非自营" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否为新品">
          <el-select class="w200" v-model="form.isNew" placeholder="是否为新品">
            <el-option label="新品" value="1"></el-option>
            <el-option label="非新品" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否为热销">
          <el-select class="w200" v-model="form.isHot" placeholder="是否为热销">
            <el-option label="热销" value="1"></el-option>
            <el-option label="非热销" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否为推荐">
          <el-select class="w200" v-model="form.isRecommend" placeholder="是否为推荐">
            <el-option label="推荐" value="1"></el-option>
            <el-option label="非推荐" value="0"></el-option>
          </el-select>
        </el-form-item> -->
        <!-- <el-form-item label="发货方式">
          <el-select class="w200" v-model="form.deliveryCode" placeholder="发货方式">
            <el-option label="保税区发货" value="1"></el-option>
            <el-option label="香港直邮" value="2"></el-option>
            <el-option label="海外直邮" value="3"></el-option>
            <el-option label="国内发货" value="4"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="商品种类">
          <el-select @change="changfun" class="w200" v-model="form.productType" placeholder="商品种类">
            <el-option label="普通商品" value="0"></el-option>
            <el-option label="会员商品" value="1"></el-option>
            <el-option label="体验会员商品" value="4"></el-option>
            <!-- <el-option label="秒杀商品" value="2"></el-option>
            <el-option label="拼团商品" value="3"></el-option> -->
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="市场价">
          <el-input class="w200" placeholder="市场价" clearable v-model="form.marketPrice"></el-input>
        </el-form-item>
        <el-form-item label="成本价">
          <el-input class="w200" placeholder="成本价" clearable v-model="form.supplyPrice"></el-input>
        </el-form-item>
        <el-form-item label="批发价">
          <el-input class="w200" placeholder="批发价" clearable v-model="form.wholesalePrice"></el-input>
        </el-form-item>
        <el-form-item label="销售价">
          <el-input class="w200" placeholder="销售价" clearable v-model="form.salesPrice"></el-input>
        </el-form-item>
        <el-form-item label="自提价">
          <el-input class="w200" placeholder="自提价" clearable v-model="form.storePrice"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="是否容许播货">
          <el-select class="w200" v-model="form.isSowing" placeholder="是否容许播货">
            <el-option label="不容许" value="0"></el-option>
            <el-option label="容许" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="小B整体播货加价">
          <el-input class="w200" placeholder="小B整体播货加价" clearable v-model="form.sowingPrice"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="被播货商品id">
          <el-input class="w200" placeholder="被播货商品id" clearable v-model="form.originalPid"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="商品类型">
          <el-select v-model="form.productAscription" placeholder="商品类型">
            <el-option label="自发商品" value="1"></el-option>
            <el-option label="播货商品" value="2"></el-option>
            <el-option label="分享平台商品" value="3"></el-option>
          </el-select>
        </el-form-item> -->
        <!-- <el-form-item label="运费模板ID">
          <el-input class="w200" placeholder="运费模板ID" clearable v-model="form.sstid"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="每个用户限购数">
          <el-input class="w200" placeholder="每个用户限购数" clearable v-model="form.limitedNumber"></el-input>
        </el-form-item> -->
        <el-form-item label="商品状态">
          <div v-if="form.authState==1" class="block">
            <el-radio v-model="form.state" label="1">上线</el-radio>
            <el-radio v-model="form.state" label="0">下线</el-radio>
          </div>
          <div v-else class="block">
            <el-tag v-if="form.state==1" type="success">上线</el-tag>
            <el-tag v-else type="warning">下线</el-tag>
          </div>
        </el-form-item>
        <el-form-item label="审核状态">
          <div class="block">
            <el-tag v-if="form.authState==0" type="warning">待审核</el-tag>
            <el-tag v-if="form.authState==1" type="success">通过</el-tag>
            <el-tag v-if="form.authState==2" type="danger">拒绝</el-tag>
          </div>
        </el-form-item>
        <el-form-item label="用户身份">
          <el-tag v-if="form.userIdentity==0" type="success">用户</el-tag>
          <el-tag v-if="form.userIdentity==1" type="warning">店主</el-tag>
          <el-tag v-if="form.userIdentity==2">供货商</el-tag>
          <!-- <el-select v-model="form.userIdentity" placeholder="用户身份">
            <el-option label="用户" value="0"></el-option>
            <el-option label="店主" value="1"></el-option>
            <el-option label="供货商" value="2"></el-option>
          </el-select> -->
        </el-form-item>
        <el-form-item label="用户ID">
          <span class="on">{{form.uid}}</span>
        </el-form-item>
        <!-- <el-form-item label="小B店铺ID">
          <el-input class="w200" placeholder="小B店铺ID" clearable v-model="form.usiid"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="仓库ID">
          <el-input class="w200" placeholder="仓库ID" clearable v-model="form.swid"></el-input>
        </el-form-item> -->
        <el-form-item label="绩点方式">
          <el-tag v-if="form.settlementMethod==2">扣点</el-tag>
          <el-tag v-if="form.settlementMethod==1" type="success" v-else>成本价</el-tag>
          <el-tag v-if="form.settlementMethod==0" type="warning" v-else>销售价</el-tag>
        </el-form-item>
        <el-form-item v-if="form.settlementMethod==2" label="扣点数">
          <el-input class="w200" placeholder="扣点数" clearable v-model="form.deductionPoints"></el-input>
        </el-form-item>
        <el-form-item label="生产日期">
          <el-date-picker
            v-model="form.productionDate"
            type="date"
            value-format="timestamp"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="排序ID">
          <el-input-number v-model="form.sortId"></el-input-number>
          <!-- <p class="fs12 colccc">注:大的数值在后</p> -->
        </el-form-item>
        <!-- <el-form-item label="商品环信客服ID">
          <el-input class="w200" placeholder="商品环信客服ID" clearable v-model="form.customerService"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="商品统计类">
          productStatisticsVo
        </el-form-item>
        <el-form-item label="产品库图片列表">
          productPictureVoList
        </el-form-item> -->
        <!-- <el-form-item v-if="form.productPictureVoList" label="图片列表">
          <div style="overflow: hidden">
            <div v-for="item in from.productPictureVoList" class="avatardiv">
              <input accept="image/*" ref="imga" @change="chooseimga" type="file" class="headimginp">
              <img :src="item.imgUrl" class="avatar">
            </div>
          </div>
        </el-form-item> -->
        <!-- <el-form-item label="预估税费">
          <el-input class="w200" placeholder="预估税费" clearable v-model="form.estimatedTax"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="产品对应仓库">
          warehouseVo
        </el-form-item>
        <el-form-item label="仓库运费模板">
          shippingTemplatesVo
        </el-form-item> -->
        <el-form-item label="商品SKU">
          <el-table
          :data="form.supplierProductSkuVoList"
          border
          size="mini"
          style="width: 100%">
          <el-table-column
            prop="skuName"
            label="SKU名称"
            min-width="110">
            <template slot-scope="scope">
              <div style="height:40px;" class="flex flexvcenter" v-for="item in scope.row.attributeValueJson">
                <span>{{item.aname}}:</span>
                <span class="mgr5">{{item.valueVo.vname}}</span>
                <img v-if="item.valueVo.imgUrl" class="skuimg" :src="item.valueVo.imgUrl">
                <!-- <el-tooltip v-if="item.valueVo.isImg==1" effect="dark" content="上传图片" placement="bottom">
                  <div class="skuimgbox">
                    <input accept="image/*" @change="addimg(item,$event)" type="file" class="skuinp">
                    
                    <i v-else class="el-icon-picture"></i>
                  </div>
                </el-tooltip> -->
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="库存"
            min-width="80">
            <template slot-scope="scope">
              <el-input size="mini" v-model="scope.row.store"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="销售价"
            min-width="80">
            <template slot-scope="scope">
              <el-input size="mini" v-model="scope.row.salesPrice"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="市场价"
            min-width="80">
            <template slot-scope="scope">
              <el-input size="mini" v-model="scope.row.marketPrice"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="供货价"
            min-width="80">
            <template slot-scope="scope">
              <el-input size="mini" v-model="scope.row.supplyPrice"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="考拉售价"
            v-if="form.uid==51"
            min-width="80">
            <template slot-scope="scope">
              <el-input size="mini" v-model="scope.row.storePrice"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="佣金"
            min-width="80">
            <template slot-scope="scope">
              <el-input size="mini" v-model="scope.row.commissionAmount"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="编码"
            min-width="80">
            <template slot-scope="scope">
              <el-input size="mini" v-model="scope.row.barCode"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="上线"
            min-width="80">
            <template slot-scope="scope">
              <el-switch
                size="mini"
                v-model="scope.row.state"
                :active-value="1"
                :inactive-value="0"
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
            </template>
          </el-table-column>
          </el-table>
        </el-form-item>
        <!-- <el-form-item label="商品秒杀SKU">
          productSeckillInfoVoList
        </el-form-item>
        <el-form-item label="商品拼团SKU">
          productGroupInfoVoList
        </el-form-item>
        <el-form-item label="产品属性名集合">
          attributeNameVoList
        </el-form-item> -->
        <!-- <el-form-item label="购买数量">
          <el-input class="w200" placeholder="购买数量" clearable v-model="form.buyNum"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="优惠券分摊金额">
          <el-input class="w200" placeholder="优惠券分摊金额" clearable v-model="form.discountAmount"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="会员折扣价">
          <el-input class="w200" placeholder="会员折扣价" clearable v-model="form.memberDiscountPrice"></el-input>
          <p class="fs12 colccc">注:单商品分佣使用</p>
        </el-form-item> -->
        <!-- <el-form-item label="sku信息">
          <el-input placeholder="sku信息" clearable v-model="form.skuKey"></el-input>
        </el-form-item> -->
        <el-form-item>
          <template v-if="!goodsinfo">
            <el-button :loading="butLoading" type="primary" @click="addGoods">立即创建</el-button>
            <el-button @click="removeall" type="danger" plain>清空</el-button>
          </template>
          <template v-else>
            <el-button v-if="goodsinfo.productType!=2" :loading="changeButLoading" type="primary" @click="changeGoods">保存编辑</el-button>
            <span class="red mgr10" v-else>商品秒杀中不可编辑</span>
            <el-button @click="closePage" type="danger" plain>取消</el-button>
          </template>
        </el-form-item>
      </el-form>
    </div>
    </el-scrollbar>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'goodsinfo',
  props:['goodsinfo'],
  data () {
    return {
      // 商品分类
      goodsClass:{one:'',two:'',three:'',four:''},
      goodsClassid:[],
      // 品牌列表
      brankList:[],
      // 计量单位
      unitMeasure:[],
      // 商品国别
      country:'',
      // 商品主图文本流
      imgaFile:'',
      // 商品主图base64
      imgaUrl:'',
      // 显示选择商品分类
      changeGoodsClass:true,
      form:{
        productType:'0',
        state:'0',
        unitMeasure:'1',
        productionDate:'',
        authState:'',
        isFreeShipping:'',
        isFreeTax:'',
        importType:'',
        supplierProductSkuVoList:''
      },
      // 创建按钮的loading
      changeButLoading: false
    }
  },
  created () {
    let that = this
    console.log('goodsinfo',that.goodsinfo)
    // 获取品牌列表
    that.getBrandList()
    // 获取商品分类
    that.getGoodsClass({pageIndex:1},'one')
    // 获取税率单位
    that.getTaxUmit()
    if (that.goodsinfo) {
      that.changeGoodsClass = false
      that.imgaUrl = that.goodsinfo.mainImgUrl
      for (let i in that.goodsinfo) {
        if (typeof that.goodsinfo[i] == 'number') {
          that.form[i] = that.goodsinfo[i] + ''
        } else {
          that.form[i] = that.goodsinfo[i]
        }
      }
      if(that.goodsinfo.supplierProductSkuVoList){
        that.goodsinfo.supplierProductSkuVoList.map(val=>{
          val.attributeValueJson = JSON.parse(val.attributeValueJson)
        })
      }
      if(that.goodsinfo.productType==2){
        console.log('是秒杀商品')
        that.$api.skuList({pid:that.goodsinfo.pid},data=>{
          console.log('秒杀商品',data)
          if(data.data.res_code==1){
            that.goodsinfo.supplierProductSkuVoList = 
            data.data.result.map(val=>{
              val.attributeValueJson = JSON.parse(val.attributeValueJson)
            })
            that.$set(that.goodsinfo,'supplierProductSkuVoList',data.data.result)
            that.$set(that.form,'supplierProductSkuVoList',data.data.result)
            // that.goodsinfo.supplierProductSkuVoList =  data.data.result
            console.log('that.goodsinfo',that.goodsinfo,that.form)
          }
        })
      }
      that.form.state = that.goodsinfo.state+''
      that.form.authState = that.goodsinfo.authState+''
      console.log('子组件接受form',that.form)
    }
  },
  computed:{
    // 计算属性

  },
  methods: {
    changfun(item){
      console.log('select 改变',item,this.form)
    },
    // 获取品牌列表
    getBrandList () {
      let that = this
      this.$api.brandList({pageIndex:1},(data)=>{
        console.log('获取品牌列表')
        console.log(data)
        if(data.status==200){
          if(data.data.res_code==1){
            that.brankList = data.data.result
          }
        }else{
          this.$message({
            showClose: true,
            message: '抱歉，品牌列表获取失败！',
            type: 'error'
          })
        }
      })
    },
    // 获取商品分类
    getGoodsClass (res,num) {
      let that = this
      that.$api.categoryList(res,(data)=>{
        console.log('获取商品分类')
        console.log(data)
        if(data.status==200){
          if (data.data.res_code==1) {
            that.goodsClass[num] = data.data.result
            console.log('goodsClass',that.goodsClass)
          }
        }else{
          that.$message({
            showClose: true,
            message: '抱歉，商品分类获取失败！',
            type: 'error'
          })
        }
      })
    },
    // 获取税率单位
    getTaxUmit () {
      let that = this
      that.$api.getTaxUnit((data)=>{
        console.log('获取税率单位')
        console.log(data)
        if(data.data.res_code==1){
          that.unitMeasure = data.data.result
        }else{
          that.$message({
            showClose: true,
            message: '抱歉，计量单位获取失败！',
            type: 'error'
          })
        }
      })
    },
    // sku添加图片
    addimg (item,event) {
      console.log('添加图片',item,event)
      let headimginp = event.target.files[0]
      console.log(headimginp)
      let bigSize = this.$store.state.oneImgBigSize
      let isLt2M = headimginp.size / 1024 / 1024 < bigSize
      if (!isLt2M) {
        this.$message({
          message: '注意，图片大小不得大于'+bigSize+'M',
          type: 'error'
        })
        return
      }      
      let formdata = new FormData()
      formdata.append('file',headimginp)
      console.log('file',formdata.get('file'))
      this.$api.productSkuImgAdd(formdata).then(data=>{
        console.log('then',data)
        if(data.data.res_code==1){
          this.$message({
            showClose:true,
            type:'success',
            message:'图片上传成功'
          })
          this.$set(item.valueVo,'imgUrl',data.data.result.imgUrl)
          this.$set(item.valueVo,'imgHeight',data.data.result.imgHeight)
          this.$set(item.valueVo,'imgWidth',data.data.result.imgWidth)
          // item.imgUrl = data.data.result.imgUrl
          // item.imgHeight = data.data.result.imgHeight
          // item.imgWidth = data.data.result.imgWidth
          console.log('form',this.form)
        }else{
          this.$message({
            showClose:true,
            type:'error',
            message:'图片上传失败'
          })
        }
      }).catch(data=>{
        console.log('catch',data)
        this.$message({
          showClose:true,
          type:'error',
          message:'图片上传失败'
        })
      })
    },
    changeClass1 (item) {
      console.log('选择1')
      console.log(item)
      let that = this
      that.getGoodsClass({pageIndex:1,parentId:item},'two')
      that.goodsClass['three'] = ''
      that.goodsClass['four'] = ''
    },
    changeClass2 (item) {
      console.log('选择2')
      console.log(item)
      let that = this
       that.getGoodsClass({pageIndex:1,parentId:item},'three')
      that.goodsClass['four'] = ''
    },
    changeClass3 (item) {
      console.log('选择3')
      console.log(item)
      let that = this
       that.getGoodsClass({pageIndex:1,parentId:item},'four')
    },
    // 选择商品主图
    chooseimga () {
      // 进入选择封面图片
      console.log('商品主图')
      let that = this
      let headimginp = this.$refs.imga.files[0]
      console.log(headimginp)
      let bigSize = this.$store.state.oneImgBigSize
      let isLt2M = headimginp.size / 1024 / 1024 < bigSize
      if (!isLt2M) {
        this.$message({
          message: '注意，图片大小不得大于'+bigSize+'M',
          type: 'error'
        })
        this.$refs.imga.value = ''
        return
      }
      that.imgaFile = headimginp
      let reads = new FileReader()
      reads.readAsDataURL(headimginp)
      reads.onload = function (e) {
        that.imgaUrl = e.target.result
      }
    },
    // 清空
    removeall () {
      console.log('清空')
      let that = this
      that.form={
        // 分类id
        cid:'',
        // 品牌id
        bid:'',
        // 标题
        title:'',
        // 短标题
        shortTitle:'',
        // 产地
        origin:'',
        // 计量单位
        unitMeasure:'',
        // spu计量单位值
        unitMeasureValue:'',
        // 重量
        weight:'',
        // 商品条形码
        barCode:'',
        // 产品国别
        country:'',
        // 状态
        state:'1'
      }
      that.goodsClassid = []
      that.imgaFile = ''
      that.imgaUrl = ''
    },
    // 父组件有值，选择分类
    changeGoodsClassFun () {
      let that = this
      that.changeGoodsClass = true
      that.form.cid = ""
    },
    // 创建产品
    addGoods () {
      console.log('创建产品')
      let that = this
      that.butLoading = true
      console.log(that.form)
      let formData = new FormData()
      for(let i in that.form){
        formData.append(i,that.form[i])
      }
      formData.append('mainImg',that.imgaFile)
      console.log(formData.get('mainImg'))
      that.$api.productInfoAdd(formData,(data)=>{
        console.log(data)
        if(data.data.res_code==1){
          that.$message({
            showClose: true,
            message: '产品创建成功！',
            type: 'success'
          })
          that.removeall()
        }else{
          that.$message({
            showClose: true,
            message: '产品创建失败！',
            type: 'error'
          })
        }
        that.butLoading = false
      })
    },
    // 保存编辑
    changeGoods () {
      this.changeButLoading = true
      console.log('保存编辑',this.form)
      if(this.form.state==1){
        if(this.form.supplierProductSkuVoList){
          for(let i in this.form.supplierProductSkuVoList){
            if(this.form.supplierProductSkuVoList[i].state==1&&!this.form.supplierProductSkuVoList[i].salesPrice){
              this.$message({
                showClose: true,
                message: '上线sku价格不能为空',
                type: 'error'
              })
              return
            }
          }
        }
      }
      let that = this
      let formData
      let isFile
      let form2 = {
        title:this.form.title,
        shortTitle:this.form.shortTitle,
        description:this.form.description,
        origin:this.form.origin,
        productionDateStr:this.form.productionDate,
        skuArrayJson:JSON.stringify(this.form.supplierProductSkuVoList),
        importType:this.form.importType,
        unitMeasure:this.form.unitMeasure,
        unitMeasureValue:this.form.unitMeasureValue,
        weight:this.form.weight,
        state:this.form.state,
        authState:this.form.authState,
        productType:this.form.productType
      }
      if(!this.form.productionDate){
        delete form2.productionDateStr
      }
      if (this.form.settlementMethod == 2) {
        form2.deductionPoints = this.form.deductionPoints
      }
      if (that.imgaFile) {
        formData = new FormData()
        for(let i in form2){
          formData.append(i,form2[i])
        }
        formData.append('mainImg',that.imgaFile)
        formData.append('pid',that.goodsinfo.pid)
        isFile = true
      }else{
        formData = {}
        for(let i in form2){
          formData[i] = form2[i]
        }
        formData.pid = that.goodsinfo.pid
        isFile = false
      }
      console.log(formData)
      that.$api.infoUpdata(formData, isFile, (data)=>{
        console.log(data)
        if(data.data.res_code==1){
          that.$message({
            showClose: true,
            message: '产品编辑成功！',
            type: 'success'
          })
          that.closePage('new')
        }else{
          that.$message({
            showClose: true,
            message: '产品编辑失败！',
            type: 'error'
          })
        }
        this.changeButLoading = false
      })
    },
    // 关闭页面
    closePage(data){
      console.log('子组件关闭页面')
      let that = this
      that.$emit('closepage',data)
    }
  }
}
</script>

<style type="text/css" lang="scss" scoped>
#upgoods{
  width: 100%;
  height: 100%;
  background-color: #fff;
  .frombox{
    padding: 10px;
  }
}
.avatardiv {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  width: 178px;
  height: 178px;
  float: left;
  margin-right: 20px;
  margin-bottom: 10px;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.headimginp{
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 1;
}
.avatar{
  max-width: 100%;
  max-height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%)
}
.w200{
  width:200px;
}
.skuimg{
  max-width: 40px;
  max-height: 40px;
  vertical-align: middle;
}
.skuinp{
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 1;
}
.skuimgbox{
  display: inline-block;
  width: 40px;
  height: 40px;
  position: relative;
}
</style>
