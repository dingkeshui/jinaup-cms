<template>
  <div id="box">
    <div v-if="showBox1" class="box1 flex2">
      <div class="pad10 flex">
        <div class="flex1">
          <!-- 产品标题 -->
            <el-input style="width:100px;" v-model="searchData.title" size="mini" clearable placeholder="商品标题"></el-input>
          <!-- 审核 -->
            <el-select size="mini" @change="searchBut" v-model="searchData.authState" style="width:100px;" class="mgr5 mgb5" clearable placeholder="审核状态">
              <el-option label="待审核" value="0"></el-option>
              <el-option label="通过" value="1"></el-option>
              <el-option label="拒绝" value="2"></el-option>
            </el-select>
            <!-- 上下线 -->
            <el-select class="mgr5 mgb5" size="mini" @change="searchBut" v-model="searchData.state" style="width:100px;" clearable placeholder="商品状态">
              <el-option label="上线商品" value="1"></el-option>
              <el-option label="下线商品" value="0"></el-option>
            </el-select>
            <!-- 上下线 -->
            <el-select class="mgr5 mgb5" size="mini" @change="searchBut" v-model="searchData.productType" style="width:100px;" clearable placeholder="商品种类">
              <el-option label="普通商品" value="0"></el-option>
              <el-option label="会员商品 " value="1"></el-option>
              <el-option label="体验会员商品 " value="4"></el-option>
              <el-option label="秒杀商品" value="2"></el-option>
              <!-- <el-option label="拼团商品" value="3"></el-option> -->
            </el-select>
            <!-- 品牌 -->
            <el-select
            style="position: relative;width:100px;"
            v-model="searchData.bid"
            @change="searchBut"
            filterable="true"
            remote="true"
            clearable
            class="mgr5 mgb5"
            size="mini"
            @clear="brandclear"
            :remote-method="remoteMethod"
            placeholder="搜/选品牌">
              <el-option
                v-for="item in brandlist"
                :key="item.bid"
                :label="item.chineseName"
                :value="item.bid">
              </el-option>
              <div style="position: sticky;background: #fff;height:30px;top:0;z-index:1">
                <p>
                  <el-pagination
                  small
                  @current-change="brandPageChange"
                  :page-size="20"
                  :total="brandPage.num"
                  layout="prev, pager, next, jumper"/>
                </p>
              </div>
            </el-select>
            <!-- 一级分类 -->
            <el-select
            v-model="onClass['0']"
            @change="classChange('1')"
            filterable="true"
            style="width:100px;"
            class="mgr5 mgb5"
            clearable
            size="mini"
            placeholder="一级分类">
              <el-option
                v-for="item in classlist['0']"
                :key="item.cid"
                :label="item.cname"
                :value="item.cid">
              </el-option>
            </el-select>
            <!-- 二级分类 -->
            <el-select
            v-model="onClass['1']"
            @change="classChange('2')"
            style="width:100px;"
            class="mgr5 mgb5"
            filterable="true"
            clearable
            size="mini"
            placeholder="二级分类">
              <el-option
                v-for="item in classlist['1']"
                :key="item.cid"
                :label="item.cname"
                :value="item.cid">
              </el-option>
            </el-select>
            <!-- 三级分类 -->
            <el-select
            v-model="onClass['2']"
            @change="classChange('3')"
            style="width:100px;"
            class="mgr5 mgb5"
            filterable="true"
            clearable
            size="mini"
            placeholder="三级分类">
              <el-option
                v-for="item in classlist['2']"
                :key="item.cid"
                :label="item.cname"
                :value="item.cid">
              </el-option>
            </el-select>
            <!-- 商家id -->
            <el-input style="width:100px;" type="number" class="mgr5 mgb5" v-model="searchData.uid" size="mini" clearable placeholder="商家Id"></el-input>
            <!-- 产品id -->
            <el-input style="width:100px;" type="number" v-model="searchData.pid" size="mini" clearable placeholder="产品Id"></el-input>
            <!-- 上下线 -->
            <el-select class="mgr5 mgb5" size="mini" @change="searchBut" v-model="searchData.userIdentity" style="width:100px;" clearable placeholder="用户身份">
              <el-option label="店主" value="1"></el-option>
              <el-option label="供货商" value="2"></el-option>
            </el-select>
            <!-- 选择考拉/维尼 -->
            <el-select class="mgr5 mgb5" size="mini" @change="searchBut" v-model="downPidData.uid" style="width:100px;" clearable placeholder="考拉/维尼/E仓">
              <el-option label="考拉" value="51"></el-option>
              <el-option label="维尼" value="213"></el-option>
              <el-option label="E仓" value="242"></el-option>
            </el-select>
        </div>
        <div>
          <div class="mgb5" style="text-align:right;">
            <el-button type="primary" @click="searchBut" size="mini" icon="el-icon-search">搜索</el-button>
            <el-button v-if="itemdata" type="primary" @click="itemclosepage" size="mini">取消</el-button>
            <el-button v-if="!itemdata" :loading="downGoodsButLoading" type="primary" @click="downgoods" size="mini" icon="el-icon-download">导出商品</el-button>
            <el-button type="primary" @click="upSku" size="mini" icon="el-icon-upload2">导入SKU</el-button>
          </div>
          <div style="text-align:right;" v-if="!itemdata">
            <el-button type="primary" @click="upWeiniGoods" size="mini" icon="el-icon-upload2">导入{{downPidData.uid?downPidData.uid=='51'?'考拉':downPidData.uid=='213'?'维尼':'E仓':''}}商品</el-button>
            <el-button type="primary" :loading="downGoodsPidLoading" @click="downGoodsPid" size="mini" icon="el-icon-download">导出{{downPidData.uid?downPidData.uid=='51'?'考拉':downPidData.uid=='213'?'维尼':'E仓':''}}商品Pid</el-button>
            <el-button type="primary" :loading="downOfflineGoodsLoading" @click="downOfflineGoods" size="mini" icon="el-icon-download">导出下线商品</el-button>
          </div>
        </div>
      </div>
      <div class="maincontent">
        <div class="tablebox">
        <el-table
          :data="productList"
          ref="multipleTable"
          border
          stripe
          v-loading="tableLoading"
          height="100%"
          @select="selectFun"
          @selection-change="handleSelectionChange"
          style="width: 100%">
          <el-table-column
            v-if="itemdata=='more'"
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            type="index"
            label="排序"
            fixed
            width="50">
          </el-table-column>
          <el-table-column
            prop="pid"
            label="商品ID">
          </el-table-column>
          <el-table-column
            prop="title"
            label="商品标题"
            width="200">
          </el-table-column>
          <el-table-column
            prop="bName"
            label="品牌名称"
            width="120">
          </el-table-column>
          <el-table-column
            prop="cName"
            label="分类名称"
            width="120">
          </el-table-column>
          <el-table-column
            label="商品主图片"
            width="90">
            <template slot-scope="scope">
              <div class="mainImgBox">
                <img :src="scope.row.mainImgUrl">
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="商品类型"
            width="110">
            <template slot-scope="scope">
             <el-tag v-if="scope.row.productType==0" size="small">普通商品</el-tag>
             <el-tag v-if="scope.row.productType==1" type="success" size="small">会员商品</el-tag>
             <el-tag v-if="scope.row.productType==4" type="success" size="small">体验会员商品</el-tag>
             <el-tag v-if="scope.row.productType==2" type="warning" size="small">秒杀商品</el-tag>
             <el-tag v-if="scope.row.productType==3" type="danger" size="small">拼团商品</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="结算方式"
            width="110">
            <template slot-scope="scope">
             <el-tag v-if="scope.row.settlementMethod==0" size="small">销售价</el-tag>
             <el-tag v-if="scope.row.settlementMethod==1" type="success" size="small">成本价</el-tag>
             <el-tag v-if="scope.row.settlementMethod==2" type="warning" size="small">扣点数:{{scope.row.deductionPoints}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="purchaserName"
            label="采购员"
            width="100">
          </el-table-column>
          <el-table-column
            prop="uName"
            label="供应商"
            width="150">
          </el-table-column>
          <el-table-column
            prop="uid"
            label="供应商ID"
            width="80">
          </el-table-column>
          <el-table-column
            prop="salesPrice"
            label="销售价"
            width="80">
          </el-table-column>
          <el-table-column
            prop="supplyPrice"
            label="供货价"
            width="80">
          </el-table-column>
          <el-table-column
            prop="commissionAmount"
            label="佣金"
            width="80">
          </el-table-column>
          <el-table-column
            label="审核状态"
            width="100">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.authState==0">待审核</el-tag>
              <el-tag type="success" v-if="scope.row.authState==1">通过</el-tag>
              <el-tag type="danger" v-if="scope.row.authState==2">拒绝</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="商品状态"
            width="100">
            <template slot-scope="scope">
               <el-tag
                :type="scope.row.state == '1' ? 'success' : 'warning'"
                disable-transitions>{{scope.row.state == 1?'上线':'下线'}}中</el-tag>
            </template>
          </el-table-column>
          <!-- <el-table-column
            prop="basePid"
            label="产品库ID"
            width="120">
          </el-table-column>
          <el-table-column
            prop="shortTitle"
            label="商品短标题"
            width="150">
          </el-table-column>
          <el-table-column
            prop="description"
            label="商品描述"
            width="250">
          </el-table-column> -->
          <el-table-column
            label="商品小图">
            <template slot-scope="scope">
              <el-button @click="changImg(scope.row,'a')" class="minbut" size="mini" type="primary">操作</el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="商品详情图">
            <template slot-scope="scope">
              <el-button @click="changImg(scope.row,'b')" class="minbut" size="mini" type="primary">操作</el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="bid"
            label="品牌ID">
          </el-table-column>
          <el-table-column
            prop="cid"
            label="分类ID">
          </el-table-column>
          <el-table-column
            prop="marketPrice"
            label="市场价"
            width="120">
          </el-table-column>
          <el-table-column
            prop="wholesalePrice"
            label="批发价"
            width="120">
          </el-table-column>
          <el-table-column
            prop="storePrice"
            label="自提价"
            width="120">
          </el-table-column>
          <!-- <el-table-column
            label="是否容许播货"
            width="130">
            <template slot-scope="scope">
             <el-tag v-if="scope.row.isSowing==0" type="danger" size="small">不容许</el-tag>
             <el-tag v-if="scope.row.isSowing==1" type="success" size="small">容许</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="originalPid"
            label="被播货商品id"
            width="120">
          </el-table-column>
          <el-table-column
            prop="sowingPrice"
            label="小b整体播货加价"
            width="120">
          </el-table-column> -->
          <!-- <el-table-column
            label="商品种类"
            width="130">
            <template slot-scope="scope">
             <el-tag v-if="scope.row.productAscription==1" type="danger" size="small">自发商品</el-tag>
             <el-tag v-if="scope.row.productAscription==2" type="success" size="small">播货商品</el-tag>
             <el-tag v-if="scope.row.productAscription==3" size="small">分享平台商品</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="sstid"
            label="运费模板ID"
            width="120">
          </el-table-column>
          <el-table-column
            prop="limitedNumber"
            label="每个用户限购数量"
            width="120">
          </el-table-column> -->
          <!-- <el-table-column
            label="用户身份"
            width="130">
            <template slot-scope="scope">
             <el-tag v-if="scope.row.userIdentity==0" type="danger" size="small">用户</el-tag>
             <el-tag v-if="scope.row.userIdentity==1" type="success" size="small">店主</el-tag>
             <el-tag v-if="scope.row.userIdentity==2"size="small">供货商</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="uid"
            label="供货商/小B用户ID"
            width="150">
          </el-table-column>
          <el-table-column
            prop="usiid"
            label="小B店铺ID"
            width="130">
          </el-table-column>
          <el-table-column
            prop="swid"
            label="仓库ID"
            width="130">
          </el-table-column>
          <el-table-column
            label="结算方式"
            width="130">
            <template slot-scope="scope">
             <el-tag v-if="scope.row.settlementMethod==0" type="danger" size="small">成本价</el-tag>
             <el-tag v-if="scope.row.settlementMethod==1" type="success" size="small">扣点</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="deductionPoints"
            label="扣点数"
            width="100">
          </el-table-column>
          <el-table-column
            prop="productionDate"
            label="生产日期"
            width="150">
          </el-table-column>
          <el-table-column
            label="是否预售"
            width="130">
            <template slot-scope="scope">
             <el-tag v-if="scope.row.isPresell==0" type="danger" size="small">非预售</el-tag>
             <el-tag v-if="scope.row.isPresell==1" type="success" size="small">预售</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="是否包税"
            width="130">
            <template slot-scope="scope">
             <el-tag v-if="scope.row.isFreeTax==0" type="danger" size="small">不包税</el-tag>
             <el-tag v-if="scope.row.isFreeTax==1" type="success" size="small">包税</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="是否自营"
            width="130">
            <template slot-scope="scope">
             <el-tag v-if="scope.row.isSelf==0" type="danger" size="small">非自营</el-tag>
             <el-tag v-if="scope.row.isSelf==1" type="success" size="small">自营</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="发货方式"
            width="130">
            <template slot-scope="scope">
             <el-tag v-if="scope.row.deliveryCode==1" size="small">保税区发货</el-tag>
             <el-tag v-if="scope.row.deliveryCode==2" type="success" size="small">香港直邮</el-tag>
             <el-tag v-if="scope.row.deliveryCode==3" type="warning" size="small">海外直邮</el-tag>
             <el-tag v-if="scope.row.deliveryCode==4" type="danger" size="small">国内发货</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="商品类型"
            width="130">
            <template slot-scope="scope">
             <el-tag v-if="scope.row.productType==1" size="small">普通商品</el-tag>
             <el-tag v-if="scope.row.productType==2" type="success" size="small">会员商品</el-tag>
             <el-tag v-if="scope.row.productType==3" type="warning" size="small">秒杀商品</el-tag>
             <el-tag v-if="scope.row.productType==4" type="danger" size="small">拼团商品</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="是否推荐"
            width="130">
            <template slot-scope="scope">
             <el-tag v-if="scope.row.isRecommend==0" type="danger" size="small">非推荐</el-tag>
             <el-tag v-if="scope.row.isRecommend==1" type="success" size="small">推荐</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="贸易方式"
            width="130">
            <template slot-scope="scope">
             <el-tag v-if="scope.row.importType==1" size="small">一般贸易</el-tag>
             <el-tag v-if="scope.row.importType==2" type="success" size="small">直邮</el-tag>
             <el-tag v-if="scope.row.importType==3" type="warning" size="small">保税区</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="商品SKU"
            width="130">
            <template slot-scope="scope">
              <el-button @click="lookSku(scope.row)" size="small">查看</el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="是否包邮"
            width="130">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.isFreeShipping==0" type="danger" size="small">不包邮</el-tag>
              <el-tag v-if="scope.row.isFreeShipping==1" type="success" size="small">包邮</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="country"
            label="商品国别"
            width="100">
          </el-table-column>
          <el-table-column
            prop="origin"
            label="商品产地"
            width="200">
          </el-table-column>
          <el-table-column
            label="热销"
            width="120">
            <template slot-scope="scope">
               <el-tag
                :type="scope.row.isHot == '1' ? 'success' : 'info'"
                disable-transitions>{{scope.row.isHot == 1?'热销':'否'}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="新品"
            width="120">
            <template slot-scope="scope">
               <el-tag
                :type="scope.row.isNew == '1' ? 'success' : 'warning'"
                disable-transitions>{{scope.row.isNew == 1?'新品':'否'}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="weight"
            label="商品重量(克)"
            width="130">
          </el-table-column>
          <el-table-column
            prop="barCode"
            label="商品条形码"
            width="150">
          </el-table-column>
          <el-table-column
            prop="sortId"
            label="排序ID"
            width="100">
          </el-table-column>
          <el-table-column
            prop="customerService"
            label="商品环信客服id"
            width="150">
          </el-table-column>
          <el-table-column
            prop="unitMeasure"
            label="计量单位"
            width="120">
          </el-table-column>
          <el-table-column
            prop="unitMeasureValue"
            label="SPU计量单位值"
            width="130">
          </el-table-column> -->
          <template v-if="itemdata">
            <el-table-column
              v-if="itemdata!='more'"
              fixed="right"
              width="100"
              align="center"
              label="操作">
              <template slot-scope="scope">
                <template v-if="scope.row.authState==1">
                  <div v-if="scope.row.state==1" class="mgb5"><el-button @click="choose(scope.row)" type="primary" class="minbut" size="small">选择</el-button></div>
                  <span v-else class="red">未上线</span>
                </template>
                <span v-if="scope.row.authState==0" class="red">待审中</span>
                <span v-if="scope.row.authState==2" class="red">已拒绝</span>
              </template>
            </el-table-column>
          </template>
          <el-table-column
            v-else
            fixed="right"
            align="center"
            width="100"
            label="操作">
            <template slot-scope="scope">
              <div class="mgb5"><el-button type="primary" @click="lookgoodsinfo(scope.row)" class="minbut" size="small">查看</el-button></div>
              <div class="mgb5" v-if="scope.row.authState==0"><el-button type="success" @click="authStatebut(scope.row,'a')" class="minbut" size="small">通过</el-button></div>
              <div class="mgb5" v-if="scope.row.authState==0"><el-button type="danger" @click="authStatebut(scope.row,'b')" class="minbut" size="small">拒绝</el-button></div>
              <div v-if="scope.row.state>0" class="mgb5"><el-button @click="removeProduct(scope.row)" type="warning" class="minbut" size="small">下线</el-button></div>
            </template>
          </el-table-column>
        </el-table>
        </div>
      </div>
      <div class="pad10 flex">
        <div class="flex1">
          <template v-if="itemdata=='more'">
            共{{onGoods.length}}件商品
            <el-button type="primary" size="small" @click="chooseGoodsMore">确定选择</el-button>
          </template>
        </div>
        <el-pagination
          background
          page-size="20"
          @current-change="pageChange"
          :total="pageinfo.total"
          layout="total, prev, pager, next, jumper">
        </el-pagination>
      </div>
    </div>
    <div v-else class="box2">
      <goodsimg v-if="showBox2Type=='goodsimg'" isgoods="true" :goodimginfo="goodimginfo" @closepage="closepage"></goodsimg>
      <sku v-if="showBox2Type=='sku'" :skudata="skudata" @closepage="closepage"></sku>
      <goodsinfo v-if="showBox2Type=='goodsinfo'" :goodsinfo="goodsinfo" @closepage="closepage"></goodsinfo>
    </div>
    <!-- 上传sku -->
    <el-dialog
      title="批量上传SKU"
      :visible.sync="showUpSku"
      width="30%"
      :before-close="handleClose">
      <span class="inpbox mgb10">
        <el-button size="small" type="primary">选择文件</el-button>
        <input class="inp" ref="mainimg" type="file" @change="filechange" name="">
      </span>
      <p v-if="file" class="fs12"><span class="mgr10">文件名:{{file.name}}</span><span>大小:{{file.fileSize}}</span></p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showUpSku = false">取 消</el-button>
        <el-button type="primary" :loading="upSkuButLoading" @click="upSkuFileFun">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 上传维尼商品 -->
    <el-dialog
      title="批量上传维尼商品"
      :visible.sync="showUpWeiniSku"
      width="30%"
      :before-close="handleClose">
      <span class="inpbox mgb10">
        <el-button size="small" type="primary">选择文件</el-button>
        <input class="inp" ref="weinifile" type="file" @change="weinifilechange" name="">
      </span>
      <p v-if="weiniFile" class="fs12">
        <span class="mgr10">文件名:{{weiniFile.name}}</span>
        <span>大小:{{weiniFile.fileSize}}</span>
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showUpWeiniSku = false">取 消</el-button>
        <el-button type="primary" :loading="upWeiniButLoading" @click="upWeiniFileFun">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
import goodsimg from '@/components/goods/goodsimg.vue'
import goodsinfo from '@/components/goods/goodsinfo.vue'
// import classlist from '@/components/goods/classlist.vue'
import sku from '@/components/goods/sku.vue'

export default {
  name: 'choosegoods',
  // ongoodsdata为多选的选中数据
  props:['itemdata','ongoodsdata'],
  components:{
    goodsimg,
    goodsinfo,
    // classlist,
    sku
  },
  data () {
    return {
      // 表格加载loading
      tableLoading:false,
      // 品牌列表
      brandlist:'',
      // 品牌请求参数
      brandPost:{
        pageIndex:1
      },
      brandPage:{
        num:''
      },
      // 分类列表
      classlist:[],
      // 选中的分类
      onClass:[],
      showBox1: true,
      // 产品库列表
      productList:'',
      // 跳页信息
      pageinfo:{
        total:''
      },
      // 传递给productInfo的信息
      productinfo:'',
      // 商品列表接口请求的参数
      postData:{
        pageIndex:1
      },
      // 搜索的参数
      searchData:{
        pageIndex:1
      },
      // 导出考拉/维尼商品
      downPidData:{
        uid:''
      },
      // 是否显示编辑图片
      showBox2Type:'',
      // 编辑图片的参数
      goodimginfo:'',
      // 要显示的商品详情
      goodsinfo:'',
      // 要显示的sku商品信息
      skudata:"",
      // 多选时选中的商品
      onGoods:[],
      // 显示上传sku文件
      showUpSku:false,
      // 上传sku文件
      upSkuFile:'',
      file:'',
      weiniFile:'',
      // 到处商品的loading
      downGoodsButLoading:false,
      // 导出商品的sku的loading
      downSkuButLoading:false,
      // 导入商品sku的loading
      upSkuButLoading:false,
      // 导出下线的商品sku
      downOfflineGoodsLoading:false,
      // 到处商品pid
      downGoodsPidLoading:false,
      showUpWeiniSku:false,
      upWeiniButLoading:false
    }
  },
  created () {
    let that = this
    that.getGoodsList()
    console.log('itemdata',this.itemdata,this.ongoodsdata)
    this.getBrandList()
    this.getClassList()
  },
  mounted(){

  },
  methods: {
    // 确认导入维尼商品
    upWeiniFileFun () {
      if(!this.weiniFile){
        this.$message({
          showClose: true,
          message: '请选择文件！',
          type: 'error'
        })
        return
      }
      let formdata = new FormData()
      formdata.append('file',this.weiniFile)
      formdata.append('uid',this.downPidData.uid)
      this.upWeiniButLoading = true
      this.$api.weiniImportWeiniBidCidData(formdata,data=>{
        console.log('维护sku',data)
        if (data.data.res_code==1) {
          this.$message({
            showClose: true,
            message: '恭喜，商品导入成功！',
            type: 'success'
          })
          this.showUpWeiniSku = false
          this.getGoodsList()
        }else{
          this.$message({
            showClose: true,
            message: data.data.message?data.data.message:'抱歉，商品导入失败！',
            type: 'error'
          })
        }
        this.upWeiniButLoading = false
      })
    },
    // 导入维尼商品
    upWeiniGoods () {
      if(!this.downPidData.uid){
        this.$message({
          showClose: true,
          message: '请选择导出考拉/维尼/E仓商品！',
          type: 'error'
        })
        return
      }
      this.showUpWeiniSku = true
    },
    // 导出考拉或者维尼商品
    downGoodsPid(){
      if(!this.downPidData.uid){
        this.$message({
          showClose: true,
          message: '请选择导出考拉/维尼/E仓商品！',
          type: 'error'
        })
        return
      }
      this.downGoodsPidLoading = true
      this.downPidData.state = this.searchData.state
      this.downPidData.authState = this.searchData.authState
      this.$api.weiniExportWeiniPid(this.downPidData).then(data=>{
        if (data.data) {
          console.log('下载商品',data)
          if(!!window.ActiveXObject || "ActiveXObject" in window) {
            console.log('ie浏览器')
            let blob = new Blob([data.data])
            let fileName = '积纳有品'+(this.downPidData.uid==51?'考拉':this.downPidData.uid==213?'维尼':'E仓')+'商品.xlsx'
            navigator.msSaveBlob(blob, fileName)
          } else {
            let content = data.data
            let elink = document.createElement('a');
            let blob = new Blob([content]);
            elink.download = '积纳有品'+(this.downPidData.uid==51?'考拉':this.downPidData.uid==213?'维尼':'E仓')+'商品.xlsx';
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
            message: '抱歉，导出商品失败！',
            type: 'error'
          })
        }
        this.downGoodsPidLoading = false
      }).catch(data=>{
        console.log('catch',data)
        this.$message({
          showClose: true,
          message: '抱歉，导出商品下线失败！',
          type: 'error'
        })
        this.downGoodsPidLoading = false
      })
    },
    // 导入sku
    upSku () {
      this.showUpSku = true
    },
    upSkuFileFun () {
      this.upSkuButLoading = true
      console.log('上传sku文件',this.$api,this.$api.upSkuFile)
      let formdata = new FormData()
      formdata.append('excelFile',this.file)  
      this.$api.upSkuFile(formdata,data=>{
        console.log('维护sku',data)
        if (data.data.res_code==1) {
          this.$message({
            showClose: true,
            message: '恭喜，商品sku导入成功！',
            type: 'success'
          })
          this.showUpSku = false
        }else{
          this.$message({
            showClose: true,
            message: data.data.message?data.data.message:'抱歉，商品sku导入失败！',
            type: 'error'
          })
        }
        this.upSkuButLoading = false
      })
    },
    // 选择文件
    filechange(){
      console.log('选择文件')
      let headimginp = this.$refs.mainimg.files[0]
      headimginp.fileSize = this.$utils.getFileSize(headimginp.size)
      console.log(headimginp)
      this.file = headimginp
    },
    // 维尼选择文件
    weinifilechange(){
      let headimginp = this.$refs.weinifile.files[0]
      headimginp.fileSize = this.$utils.getFileSize(headimginp.size)
      this.weiniFile = headimginp
    },
    // 导出下线sku
    downOfflineGoods(){
      this.downOfflineGoodsLoading = true
      let downgoodsdata = {}
      for (let i in this.searchData) {
        if(i!='pageIndex'&&this.searchData[i]){
          downgoodsdata[i] = this.searchData[i]
        }
      }
      console.log('导出商品',downgoodsdata)
      this.$api.downOfflineGoods(downgoodsdata).then(data=>{
        if (data.data) {
          console.log('下载商品',data)
          if(!!window.ActiveXObject || "ActiveXObject" in window) {
            console.log('ie浏览器')
            let blob = new Blob([data.data])
            let fileName = '积纳有品下线商品.xlsx'
            navigator.msSaveBlob(blob, fileName)
          } else {
            let content = data.data
            let elink = document.createElement('a');
            let blob = new Blob([content]);
            elink.download = "积纳有品下线商品.xlsx";
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
            message: '抱歉，导出下线商品失败！',
            type: 'error'
          })
        }
        this.downOfflineGoodsLoading = false
      }).catch(data=>{
        console.log('catch',data)
        this.$message({
          showClose: true,
          message: '抱歉，导出商品下线失败！',
          type: 'error'
        })
        this.downOfflineGoodsLoading = false
      })
    },
    // 导出商品
    downgoods () {
      this.downGoodsButLoading = true
      let downgoodsdata = {}
      for (let i in this.postData) {
        if(i!='pageIndex'){
          downgoodsdata[i] = this.postData[i]
        }
      }
      console.log('导出商品',downgoodsdata)
      this.$api.downGoods(downgoodsdata).then(data=>{
        if (data.data) {
          console.log('下载商品',data)
          if(!!window.ActiveXObject || "ActiveXObject" in window) {
            console.log('ie浏览器')
            let blob = new Blob([data.data])
            let fileName = '积纳有品商品.xlsx'
            navigator.msSaveBlob(blob, fileName)
          } else {
            let content = data.data
            let elink = document.createElement('a');
            let blob = new Blob([content]);
            elink.download = "积纳有品商品.xlsx";
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
            message: '抱歉，导出商品失败！',
            type: 'error'
          })
        }
        this.downGoodsButLoading = false
      }).catch(data=>{
        console.log('catch',data)
        this.$message({
          showClose: true,
          message: '抱歉，导出商品失败！',
          type: 'error'
        })
        this.downGoodsButLoading = false
      })
    },
    // 批量导出商品sku
    downsku(){
      this.downSkuButLoading = true
      let downgoodsdata = {}
      for (let i in this.postData) {
        if(i!='pageIndex'){
          downgoodsdata[i] = this.postData[i]
        }
      }
      console.log('导出商品sku',downgoodsdata)
      this.$api.downGoodsSku(downgoodsdata).then(data=>{
        console.log('下载商品sku',data)
        if (data.data) {
          if(!!window.ActiveXObject || "ActiveXObject" in window) {
            console.log('ie浏览器')
            let blob = new Blob([data.data])
            let fileName = '积纳有品商品SKU.xlsx'
            navigator.msSaveBlob(blob, fileName)
          } else {
            let content = data.data
            let elink = document.createElement('a');
            let blob = new Blob([content]);
            elink.download = "积纳有品商品SKU.xlsx";
            elink.style.display = 'none';
            elink.href = URL.createObjectURL(blob)
            document.body.appendChild(elink)
            elink.click()
            document.body.removeChild(elink)
            window.URL.revokeObjectURL(blob) 
          }
        }else{
          this.$message({
            showClose: true,
            message: '抱歉，导出商品SKU失败！',
            type: 'error'
          })
        }
        this.downSkuButLoading = false
      }).catch(data=>{
        console.log('catch',data)
        this.$message({
          showClose: true,
          message: '抱歉，导出商品SKU失败！',
          type: 'error'
        })
        this.downSkuButLoading = false
      })
    },
    // 表格单选
    selectFun (selection, row) {
      console.log('表格单选',selection, row)
      let ison = true
      if (selection.length) {
        for(let i in selection){
          if(selection[i].pid==row.pid){
            ison = false
          }
        }
      }
      if (ison) {
        for(let i in this.onGoods){
          if(this.onGoods[i]==row){
            this.onGoods = this.onGoods.splice(i,1)
            break
          }
        }
      }
    },
    // 获取商品列表
    getGoodsList () {
      this.tableLoading = true
      let that = this
      console.log(that.postData)
      that.$api.infoList(that.postData,(data)=>{
        console.log('获取商品列表')
        console.log(data)
        if(data.status==200){
          if(data.data.res_code==1){
            that.productList=data.data.result
            console.log(that.productList)
          } else {
            that.productList=""
          }
          that.pageinfo.total = data.data.total
        }else{
          this.$message({
            showClose: true,
            message: '抱歉，商品列表获取失败！',
            type: 'error'
          })
        }
        this.tableLoading = false
      })
    },
    // 分类改变
    classChange(item){
      console.log('分类改变',item)
      if(item==3){
        this.searchData.cid = this.onClass[2]
        this.searchBut()
      }else{
        this.onClass = this.onClass.slice(0,item)
        this.classlist = this.classlist.slice(0,item)
        this.getClassList()
      }
    },
    // 获取分类列表
    getClassList(){
      console.log('获取分类列表')
      let res
      if (this.onClass.length) {
        res = this.onClass[this.onClass.length-1]
      }else{
        res = 0
      }
      this.$api.categoryList({parentId:res},data=>{
        console.log(data)
        if (data.status==200) {
          if (data.data.res_code==1) {
            this.classlist.push(data.data.result)
          }else{
            this.searchData.cid = this.onClass[this.onClass.length-1]
            this.searchBut()
          }
        } else {
          this.$message({
            showClose: true,
            message: '抱歉，分类列表获取失败！',
            type: 'error'
          })
        }
      })
    },
    // 审核按鈕
    authStatebut(item,res){
      console.log('审核', item, res)
      if(res=='a'){
        if(!item.salesPrice){
            this.$message({
              showClose:true,
              message:'销售价不能为0',
              type:'error'
            })
            return
        }
        this.$api.infoReview({pid:item.pid,authState:1},data=>{
          console.log(data)
          if(data.data.res_code==1){
            this.$message({
              showClose:true,
              message:'操作成功',
              type:'success'
            })
            this.getGoodsList()
          }else{
            this.$message({
              showClose:true,
              message:data.data.message?data.data.message:'操作失败',
              type:'error'
            })
          }
        })
      }else{
        this.$prompt('请输入拒绝原因', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(async ({ value }) => {
          console.log('进入then')
          this.$api.infoReview({pid:item.pid,authState:2,refuseReasons:value},data=>{
            console.log(data)
            if(data.data.res_code==1){
              this.$message({
                showClose:true,
                message:'操作成功',
                type:'success'
              })
              this.getGoodsList()
            }else{
              this.$message({
                showClose:true,
                message:data.data.message?data.data.message:'操作失败',
                type:'error'
              })
            }
          })
        }).catch(() => {
          console.log('取消catch')
        })
      }
    },
    // 品牌搜索
    remoteMethod (item) {
      console.log('品牌搜索',item)
      this.brandPost.chineseName = item
      this.brandPost.pageIndex = 1
      this.getBrandList()
    },
    // 清空品牌搜索
    brandclear () {
      console.log('清空品牌搜索')
      this.brandPost = {
        pageIndex:1
      }
      this.getBrandList()
    },
    // 品牌跳页
    brandPageChange(item){
      this.brandPost.pageIndex = item
      this.getBrandList()
    },
    // 获取品牌
    getBrandList(){
      this.$api.brandList(this.brandPost,data=>{
        if(data.status==200){
          if(data.data.res_code==1){
            this.brandlist = data.data.result
            this.brandPage.num = data.data.total
          }else{
           
          }
        }else{
          this.$message({
            showClose:true,
            type:'error',
            message:'品牌列表获取失败'
          })
        }
      })
    },
    // 查看商品SKU
    lookSku (item) {
      console.log('查看商品SKU')
      console.log(item)
      this.skudata = item
      this.showBox2Type = 'sku'
      this.showBox1 = false
    },
    // 查看商品详情
    lookgoodsinfo (item) {
      console.log('查看商品详情')
      this.$api.infoDetail({pid:item.pid},data=>{
        console.log(data)
        if (data.data.res_code==1) {
          this.showBox2Type = 'goodsinfo'
          this.showBox1 = false
          this.goodsinfo = data.data.result
        } else {
          this.$message({
            showClose:false,
            message:'商品详情获取失败！',
            type:'error'
          })
        }
      })
    },
    // 作为子组建被选择
    choose (item) {
      this.$emit('input',item)
      this.itemclosepage()
    },
    itemclosepage () {
      this.$emit('closepage')
    },
    // 表格多选改变事件
    handleSelectionChange (item) {
      console.log('表格多选改变事件0',item.length)
      let arr = []
      for (let i in item) {
        let ison = true
        for (let h in this.onGoods) {
          if (this.onGoods[h].pid == item[i].pid) {
            ison = false
            break
          }
        }
        if (ison) {
          console.log('进入ison',item[i])
          arr.push(item[i])
        }
      }
      if (arr.length) {
        console.log(arr.length)
        if(this.onGoods){
          this.onGoods.push.apply(this.onGoods,arr)
        }else{
          this.onGoods = []
          this.onGoods.push.apply(this.onGoods,arr)
        }
      }
      console.log('表格多选改变事件',arr,item,this.onGoods)
    },
    // 确定多选
    chooseGoodsMore () {
      console.log('确定多选')
      this.$emit('moregoods',this.onGoods)
      this.$emit('closepage')
    },
    // 关闭编辑页面
    closepage (data) {
      this.showBox1 = true
      if (data == 'new') {
        this.getGoodsList()
      }
    },
    // 跳页
    pageChange (data) {
      console.log('跳页',data)
      this.postData.pageIndex = data
      this.getGoodsList()
    },
    // 删除产品
    removeProduct (item) {
      console.log('删除产品')
      console.log(item)
      let that = this
      that.$confirm('确定将 '+item.title+' 下线?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let res = {pid:item.pid,state:'0'}
        console.log('res',res)
        that.$api.infoUpdata(res, false, (data)=>{
          console.log('下线',data)
          if(data.data.res_code==1){
            that.$message({
              showClose: true,
              message: '产品下线成功！',
              type: 'success'
            })
            // that.postData.pageIndex = 1
            that.getGoodsList()
          }else{
            that.$message({
              showClose: true,
              message: '产品下线失败！',
              type: 'error'
            })
          }
        })
      }).catch(() => {
       console.log('点击的取消')
      })
    },
    //  搜索商品 
    searchBut () {
      console.log('搜索商品')
      let that = this
      that.postData = {}
      for(let i in that.searchData){
        that.postData[i]=that.searchData[i]
      }
      console.log(that.postData)
      that.getGoodsList()
    },
    // 点击商品图片按钮
    changImg (item,type) {
      console.log('编辑产品图片')
      console.log(item,type)
      let that = this
      that.showBox1 = false
      that.showBox2Type = 'goodsimg'
      that.goodimginfo = {
        pid:item.pid,
        imgType:1,
        name:item.title
      }
      if(type=="b"){
        that.goodimginfo.imgType = 2
      }
    },
    // 表格默认选中事件
    ontabel(){
      // 选中表格
      console.log('默认选中')
      
    },
    adresschange () {
      // 选择地址
      console.log('change adress')
    },
    tableon(item){
      console.log('tableon',item)
      setTimeout(()=>{
        item.map(val=>{
          this.$refs.multipleTable.toggleRowSelection(this.productList[val],true)
          console.log('watch改变一次',val)
        })
      },0)
    }
  },
  computed:{
    goodsClassOnnum(){
      let num = this.goodsClassOn.length
      return num == 4?4:num+1
    }
  },
  watch:{
    ongoodsdata:{
      handler(val){
        this.onGoods = this.ongoodsdata
        console.log('多选默认选中的商品',val,this.ongoodsdata,this.onGoods)
      },
      immediate:true,
      deep:true
    },
    classitem(newName, oldName){
      if (newName) {
        this.searchData.cid = newName.cid
      } else {
        this.searchData.cid = ''
      }
    },
    // 监听商品变化
    productList (val) {
      console.log('$refs.multipleTable',this.$refs.multipleTable,this.productList)
      if(val){
        let arr = []
        for (let i in this.onGoods) {
          for (let h in this.productList) {
            if(this.productList[h].pid == this.onGoods[i].pid){
              arr.push(h)
              break
            }
          }
        }
        if(arr.length){
          this.tableon(arr)
        }
      }
    }
  }
}
</script>

<style type="text/css" scoped>
#box{
  background-color: #fff;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}
.miantop{
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #ccc;
  display: flex;
  box-sizing: border-box;
  overflow: hidden;
}
.maintopleft{
  flex: 1;
  display: flex;
  padding: 10px 0px;
}
.maintopitem2{
  height: 100%;
  display: flex;
  align-items: center;
  padding:0px 10px;
  border-right:1px solid #bbb;
  box-sizing: border-box;
  color: #606266;
  font-size: 14px;
}
.maintopright{
  display: flex;
  align-items: center;
  padding: 0px 10px;
}
.maintopright i{
  width: 40px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border-radius: 5px;
  cursor: pointer;
}
.maintopright i:hover{
  background-color: #E5F1FB;
}
.maintopright2{
  padding: 0px 10px;
  display: flex;
  align-items: center;
}
.demonstration{
  margin-right: 10px;
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
.mytabel{
  width: 100%;
  height: 300px;
}
.ordermain{
  height: 400px;
  border:1px solid #ccc;
  border-radius: 10px;
  overflow: hidden;
}
.ordermainbox{
  height: 1000px;
}
.ordermainitem{
  padding: 10px 0px;
  border-bottom: 1px solid #ccc;
  display: flex;
  width: 100%;
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
.tagbox{
  padding: 5px 10px;
}
.mainImgBox{
  width: 70px;
  height: 70px;
}
.mainImgBox img{
  max-width: 100%;
  max-height: 100%;
}
.box2,.box1{
  width: 100%;
  height: 100%;
}
.el-button+.el-button {
    margin-left: 0px !important;
}
.inpbox{
  position: relative;
  display: inline-block;
}
.inpbox input{
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 1;
}
</style>
