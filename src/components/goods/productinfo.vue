<template>
  <div id="upgoods">
    <el-scrollbar class="noxscroll" style="height: 100%">
    <h1 class="title on"><span v-if="productinfo">编辑产品</span><span v-else>添加产品</span></h1>
    <div class="frombox">
      <el-form ref="myfrom" :rules="rules" :model="form" label-width="120px">
        <el-form-item class="is-required" label="产品标题">
          <el-input placeholder="请输入产品标题" clearable v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="产品短标题">
          <el-input class="w200" placeholder="请输入产品短标题" clearable v-model="form.shortTitle"></el-input>
        </el-form-item>
        <el-form-item class="is-required" label="品牌分类">
          <span class="on">{{form.bName}}</span>
          <div><el-button size="mini" @click="choose" type="primary">选择品牌分类</el-button></div>
        </el-form-item>
        <el-form-item class="is-required" v-if="!changeGoodsClass" label="产品分类">
          <span style="margin-right:30px;" class="on">{{productinfo.cName}}</span>
          <div><el-button size="mini" type="primary" @click="changeGoodsClassFun">选择分类</el-button></div>
        </el-form-item>
        <el-form-item class="is-required" v-else label="产品分类">
          <el-select filterable @change="changeClass1" v-model="goodsClassid[0]" class="w200 mgb10" placeholder="请选择一级分类">
            <el-option
              v-for="item in goodsClass['one']"
              :key="item.cid"
              :label="item.cname"
              :value="item.cid">
            </el-option>
          </el-select>
          <el-select filterable @change="changeClass2" v-model="goodsClassid[1]" class="w200 mgb10" placeholder="请选择二级分类">
            <el-option
              v-for="item in goodsClass['two']"
              :key="item.cid"
              :label="item.cname"
              :value="item.cid">
            </el-option>
          </el-select>
          <el-select filterable @change="changeClass3" v-model="form.cid" class="w200 mgb10" placeholder="请选择三级分类">
            <el-option
              v-for="item in goodsClass['three']"
              :key="item.cid"
              :label="item.cname"
              :value="item.cid">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="产品产地">
          <el-input  placeholder="请输入产品产地" clearable v-model="form.origin"></el-input>
        </el-form-item> -->
        <el-form-item class="is-required" label="发货方式">
          <el-select class="w200" v-model="form.importType" placeholder="发货方式">
            <el-option label="直邮" value="0"></el-option>
            <el-option label="保税" value="1"></el-option>
            <el-option label="海淘" value="2"></el-option>
            <el-option label="国内贸易" value="3"></el-option>
            <el-option label="个人清关" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="is-required" label="计量单位">
          <el-select filterable class="w200" v-model="form.unitMeasure" placeholder="请选择">
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
          <el-input placeholder="请输入SPU计量单位值" class="w200" clearable v-model="form.unitMeasureValue"></el-input>
        </el-form-item>
        <el-form-item label="产品重量">
          <el-input placeholder="请输入产品重量" class="mgr10 w200" clearable v-model="form.weight"></el-input>
          <span>克</span>
        </el-form-item>
        <el-form-item label="产品编码">
          <el-input placeholder="请输入产品编码" class="w200" clearable v-model="form.barCode"></el-input>
        </el-form-item>
        <el-form-item label="产品国别">
          <el-input placeholder="请输入产品国别" class="w200" clearable v-model="form.country"></el-input>
        </el-form-item>
        <el-form-item class="is-required" label="产品主图">
          <div style="overflow: hidden">
          <div class="avatardiv">
            <input accept="image/*" ref="imga" @change="chooseimga" type="file" class="headimginp">
            <img v-if="imgaUrl" :src="imgaUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </div>
          </div>
          <p class="fs12 colccc mg-15">注:图片大小不得大于{{$store.state.oneImgBigSize}}M</p>
        </el-form-item>
        <el-form-item class="is-required" prop="shopclass" label="产品状态">
          <div class="block">
            <el-radio v-model="form.state" label="1">上线</el-radio>
            <el-radio v-model="form.state" label="0">下线</el-radio>
          </div>
        </el-form-item>
        <el-form-item>
          <template v-if="!productinfo">
            <el-button :loading="butLoading" type="primary" @click="addGoods">立即创建</el-button>
            <el-button @click="removeall" type="danger" plain>清空</el-button>
          </template>
          <template v-else>
            <el-button :loading="butLoading" type="primary" @click="changeGoods">保存编辑</el-button>
            <el-button @click="closePage" type="danger" plain>取消</el-button>
          </template>
        </el-form-item>
      </el-form>
    </div>
    </el-scrollbar>
    <!-- 选择品牌分类 -->
    <el-dialog
      title="选择品牌分类"
      :visible.sync="dialogShow"
      width="80%"
      class="mg5vh"
      @close="clospageCom"
      :before-close="handleClose">
      <brank @closepage="clospageCom" v-model="brankitem" itemdata="choose"></brank>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
import brank from '@/components/brank/branklist.vue'

export default {
  name: 'productInfoCom',
  props:['productinfo'],
  components:{
    brank
  },
  data () {
    return {
      // 是否显示选择品牌
      dialogShow:false,
      // 商品分类
      goodsClass:{one:'',two:'',three:''},
      goodsClassid:[],
      // 选中的品牌
      brankitem:'',
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
        // 分类id
        cid:'',
        // 品牌id
        bid:'',
        bName:'',
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
        importType:'1',
        // 商品条形码
        barCode:'',
        // 产品国别
        country:'',
        // 状态
        state:'1'
      },
      // 创建按钮的loading
      butLoading: false
    }
  },
  created () {
    let that = this
    console.log('productinfo',that.productinfo)
    // 获取商品分类
    that.getGoodsClass({parentId:0},'one')
    // 获取税率单位
    that.getTaxUmit()
    if (that.productinfo) {
      that.changeGoodsClass = false
      that.imgaUrl = that.productinfo.mainImgUrl
      for (let i in that.form) {
        that.form[i] = that.productinfo[i]
      }
      that.form.state = that.form.state+''
      that.form.importType = that.form.importType+''
      console.log('子组件接受form',that.form)
    }
  },
  computed:{
    // 计算属性

  },
  watch:{
    brankitem (val) {
      if(val){
        this.form.bid = val.bid
        this.form.bName = val.chineseName
      }
      console.log('watch',this.form)
    }
  },
  methods: {
    choose(){
      this.dialogShow = true
    },
    // 关闭选择品牌
    clospageCom () {
      this.dialogShow = false
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
    changeClass1 (item) {
      console.log('选择1')
      console.log(item)
      let that = this
      that.getGoodsClass({pageIndex:1,parentId:item},'two')
      that.goodsClass['three'] = ''
    },
    changeClass2 (item) {
      console.log('选择2')
      console.log(item)
      let that = this
      that.getGoodsClass({pageIndex:1,parentId:item},'three')
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
      console.log('保存编辑')
      let that = this
      console.log(that.form)
      let formData
      let isFile
      if (that.imgaFile) {
        formData = new FormData()
        for(let i in that.form){
          formData.append(i,that.form[i])
        }
        formData.append('mainImg',that.imgaFile)
        formData.append('pid',that.productinfo.pid)
        isFile = true
      }else{
        formData = {}
        for(let i in that.form){
          formData[i] = that.form[i]
        }
        formData.pid = that.productinfo.pid
        isFile = false
      }
      console.log(formData)
      that.$api.productInfoUpdata(formData, isFile, (data)=>{
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
    width: 70%;
    margin-left: 15%;
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
</style>
