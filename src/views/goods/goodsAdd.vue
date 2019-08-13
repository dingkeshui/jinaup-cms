<template>
  <div id="upgoods">
    <el-scrollbar class="noxscroll" style="height: 100%">
    <h1 class="title on">添加商品</h1>
    <div class="frombox">
      <el-form ref="myfrom" :rules="rules" :model="myfrom" label-width="120px">
        <el-form-item label="商品标题" prop="name">
          <el-input placeholder="请输入商品标题" clearable v-model="from.title"></el-input>
        </el-form-item>
        <el-form-item label="商品短标题">
          <el-input placeholder="请输入商品短标题" clearable v-model="from.shortTitle"></el-input>
        </el-form-item>
        <el-form-item label="品牌分类">
          <div class="block">
            <el-cascader
              expand-trigger="hover"
              :options="brankListFun"
              :props="brankListProps"
              v-model="form.bid">
            </el-cascader>
          </div>
        </el-form-item>
        <el-form-item prop="shopclass" label="商品分类">
          <div class="block">
            <el-cascader
              :options="goodsClass"
              @active-item-change="getClassNum"
              :props="props"
              v-model="form.cid"
            ></el-cascader>
          </div>
        </el-form-item>
        <el-form-item label="商品产地">
          <el-input placeholder="请输入商品产地" clearable v-model="from.origin"></el-input>
        </el-form-item>
        <el-form-item label="计量单位">
          <el-select v-model="from.unitMeasure" placeholder="请选择">
            <el-option
              v-for="item in unitMeasure"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品重量">
          <el-input placeholder="请输入商品重量" class="mgr10" clearable v-model="from.weight"></el-input>
          <span>克</span>
        </el-form-item>
        <el-form-item label="商品条形码">
          <el-input placeholder="请输入商品条形码" clearable v-model="from.barCode"></el-input>
        </el-form-item>
        <el-form-item label="商品国别">
          <el-select v-model="from.country" placeholder="请选择">
            <el-option
              v-for="item in country"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品主图">
          <div style="overflow: hidden">
          <div class="avatardiv">
            <input accept="image/*" ref="imga" @change="chooseimga" type="file" class="headimginp">
            <img v-if="imgaUrl" :src="imgaUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </div>
          </div>
          <p class="fs12 colccc mg-15">注:图片大小不得大于2M</p>
        </el-form-item>
        <el-form-item prop="shopclass" label="商品状态">
          <div class="block">
            <el-radio v-model="from.state" label="1">上线</el-radio>
            <el-radio v-model="from.state" label="0">下线</el-radio>
          </div>
        </el-form-item>
        <el-form-item label="商品属性">
          <div v-for="(item,index) in myfrom.classs" class="flex mgb10">
            <div class="classname on">{{item.name}}</div>
            <div class="flex1">
              <el-checkbox-group
                v-model="classOn[index].val"
                @change="groupchange(data)">
                <el-checkbox v-for="(item2,index2) in item.val" :label="item2" :key="item2">{{item2}}</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="属性详情">
          <div v-if="classArr" class="classArrbox">
            <table class="classTable" cellspacing="0">
              <tr>
                <td v-for="item in classNameArr">{{item}}</td>
                <td>库存</td>
                <td>数量</td>
              </tr>
              <tr v-for="item in classArr">
                <td v-for="item2 in item">{{item2}}</td>
                <td>
                  <input v-model="input" class="tdinp" placeholder="请输入内容"></input>
                </td>
                <td>
                  <input v-model="input" class="tdinp" placeholder="请输入内容"></input>
                </td>
              </tr>
            </table>
          </div>
          <div v-else class="on">
            请先选择属性
          </div>
        </el-form-item>
        <el-form-item label="生产日期">
          <el-date-picker
            v-model="myfrom.createdDay"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="保期">
           <el-input-number v-model="myfrom.protectTime" :min="1" :max="10" label="描述文字"></el-input-number>
           <span>月</span>
        </el-form-item>
        <el-form-item label="商品货号">
           <el-input v-model="myfrom.goodsid" placeholder="请输入商品货号"></el-input>
        </el-form-item>
        <el-form-item label="产地">
          <el-cascader
            :options="checkadress"
            change-on-select
          ></el-cascader>
        </el-form-item>
        <el-form-item label="仓库">
          <div class="block">
            <el-cascader
              expand-trigger="hover"
              :options="checkadress"
              v-model="myfrom.adress">
            </el-cascader>
          </div>
        </el-form-item>
        <el-form-item label="运费模板">
          <el-cascader
            :options="checkadress"
            change-on-select
          ></el-cascader>
        </el-form-item>
        <el-form-item label="计价单位">
          <el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
            <el-select v-model="select" style="width: 130px;" slot="append" placeholder="请选择">
              <el-option label="餐厅名" value="1"></el-option>
              <el-option label="订单号" value="2"></el-option>
              <el-option label="用户电话" value="3"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item label="标签">
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="复选框 A"></el-checkbox>
            <el-checkbox label="复选框 B"></el-checkbox>
            <el-checkbox label="复选框 C"></el-checkbox>
          </el-checkbox-group>
          <el-button size="mini" type="primary">添加</el-button>
        </el-form-item>
        <el-form-item label="定时上架">
          <el-date-picker
            v-model="myfrom.createdDay"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="定时下架">
          <el-date-picker
            v-model="myfrom.createdDay"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="优惠方式">
          <div class="discountBox">
            <div class="discountTitle">
                <el-checkbox v-model="checked">直降优惠</el-checkbox>
            </div>
            <div class="discountMain">
                <div class="mgb10">
                  <span class="mgr5">开始时间</span>
                  <el-date-picker
                    v-model="myfrom.createdDay"
                    type="datetime"
                    class="w200"
                    placeholder="选择日期时间">
                  </el-date-picker>
                </div>
                <div class="mgb10">
                  <span class="mgr5">结束时间</span>
                  <el-date-picker
                    v-model="myfrom.createdDay"
                    type="datetime"
                    class="w200"
                    placeholder="选择日期时间">
                  </el-date-picker>
                </div>
                <div class="">
                  <span class="mgr5">促销价格</span>
                  <el-input class="w200" v-model="input" placeholder="请输入促销价"></el-input>
                </div>
            </div>
          </div>
          <div class="discountBox">
            <div class="discountTitle">
                <el-checkbox v-model="checked">VIP会员价</el-checkbox>
            </div>
            <div class="discountMain">
                <div class="mgb10">
                  <span class="mgr5">VIP1</span>
                  <el-input class="w200" v-model="input" placeholder="请输入促销价"></el-input>
                </div>
                <div class="mgb10">
                  <span class="mgr5">VIP2</span>
                  <el-input class="w200" v-model="input" placeholder="请输入促销价"></el-input>
                </div>
                <div class="">
                  <span class="mgr5">VIP3</span>
                  <el-input class="w200" v-model="input" placeholder="请输入促销价"></el-input>
                </div>
            </div>
          </div>
          <div class="discountBox">
            <div class="discountTitle">
                <el-checkbox v-model="checked">秒杀</el-checkbox>
            </div>
            <div class="discountMain">
                <div class="mgb10">
                  <span class="mgr5">开始时间</span>
                  <el-date-picker
                    v-model="myfrom.createdDay"
                    type="datetime"
                    class="w200"
                    placeholder="选择日期时间">
                  </el-date-picker>
                </div>
                <div class="mgb10">
                  <span class="mgr5">结束时间</span>
                  <el-date-picker
                    v-model="myfrom.createdDay"
                    type="datetime"
                    class="w200"
                    placeholder="选择日期时间">
                  </el-date-picker>
                </div>
                <div class="">
                  <span class="mgr5">秒杀价格</span>
                  <el-input class="w200" v-model="input" placeholder="请输入促销价"></el-input>
                </div>
            </div>
          </div>
          <div class="discountBox">
            <div class="discountTitle">
                <el-checkbox v-model="checked">阶梯价格</el-checkbox>
            </div>
            <div class="discountMain">
                <div class="flexvcenter">
                  <span class="flex1 center">数量</span>
                  <span class="flex1 center">折扣</span>
                  <span class="flex1 center">操作</span>
                </div>
                <div class="flexvcenter mgb10">
                  <el-input class="w100 mgr5" v-model="input" placeholder="数量"></el-input>
                  <el-input class="w100 mgr5" v-model="input" placeholder="折扣"></el-input>
                  <div class="w100 center">
                    <el-button type="text">删除</el-button>
                    <el-button type="text">添加</el-button>
                  </div>
                </div>
                <div class="flexvcenter">
                  <el-input class="w100 mgr5" v-model="input" placeholder="数量"></el-input>
                  <el-input class="w100 mgr5" v-model="input" placeholder="折扣"></el-input>
                  <div class="w100 center">
                    <el-button type="text">删除</el-button>
                    <el-button type="text">添加</el-button>
                  </div>
                </div>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="商品封面图">
          <div style="overflow: hidden">
          <div class="avatardiv">
            <input accept="image/*" ref="headimg" @change="chooseheadimg" type="file" class="headimginp">
            <img v-if="myfrom.headimg" :src="myfrom.headimg" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </div>
          </div>
          <p class="fs12 colccc mg-15">注:图片大小不得大于2M</p>
        </el-form-item>
        <el-form-item label="商品轮播图">
          <div class="imgarrbox">
          <div class="avatardiv" v-for="(item, index) in myfrom.imgarr" :key="index">
            <img :src="item" class="avatar">
            <i class="el-icon-error closeimg" @click="closeimg(index)"></i>
          </div>
          <div v-if="myfrom.imgarr.length!=5" class="avatardiv">
            <input accept="image/*" ref="imgarr" @change="chooseimgarr" type="file" class="headimginp">
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </div>
          </div>
          <p class="fs12 colccc mg-15">注:轮播图最多五张图片，每张图片大小不得大于2M</p>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addGoods">立即创建</el-button>
           <el-button @click="removeall" type="danger" plain>清空</el-button>
        </el-form-item>
      </el-form>
    </div>
    </el-scrollbar>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'goodsAdd',
  data () {
    return {
      // 商品分类
      goodsClass:[],
      // 品牌列表
      brankList:[],
      // 品牌列表props
      brankListProps:{
        value:'bid',
        label:'chineseName'
      },
      // 计量单位
      unitMeasure:'',
      // 商品国别
      country:'',
      // 商品主图文本流
      imgaFile:'',
      // 商品主图base64
      imgaUrl:'',
      form:{
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
        // 重量
        weight:'',
        // 商品条形码
        barCode:'',
        // 产品国别
        country:'',
        // 状态
        state:1,
        // 主图
        mainImg:''
      },
      // 多图文件
      imgarrfile:[],
      // sku数组
      classArr:'',
      // 选择中的属性名称
      classNameArr:'',
      myfrom: {
        name2:'',
        // 名称
        name: '',
        // 商品属性
        classs: [{'name':'颜色','val':['红色','绿色','黑色']},{'name':'大小','val':[32,33,43,45]},{'name':'品牌','val':['ysl','cg','dior']}],
        // 上架
        upper: true,
        //  商品地址
        adress: [],
        // 原价
        oldprice: '',
        // 现价
        nowprice: '',
        // 是否包邮
        shipping: true,
        // 商品邮费
        shipnum: '',
        // 商品封面图
        headimg: '',
        // 商品轮播图片
        imgarr: [],
        // 商品详情
        main: '',
        // 商品分类
        shopclass: [],
        // 商品属性
        classitem: [],
        radio:'',
        // 生产日期
        createdDay:"",
        // 保期/月
        protectTime:'',
        // 商品货号
        goodsid: '',
        // 商品产地
        goodsadress: []
      },
      // 选中的属性
      classOn:[],
      // 表单验证
      rules: {
        name: [
          {required: true, message: '请输入商品名称', trigger: 'blur'}
        ],
        shopclass: [
          {required: true, message: '请选择活动区域', trigger: 'change'}
        ]
      },
      // 临时缓存要添加的商品属性
      newclass: {},
      // 地址选择器数据
      checkadress: [
        {
          value: '1',
          label: '国内',
          children: [{
            value: '1-1',
            label: '北京'
          }, {
            value: '1-2',
            label: '四川',
            children: [{
              value: '1-2-1',
              label: '重庆'
            }, {
              value: '1-2-2',
              label: '成都'
            }]
          }]
        }, {
          value: '2',
          label: '国外',
          children: [{
            value: '2-1',
            label: '欧洲',
            children: [{
              value: '2-1-1',
              label: '英国'
            }, {
              value: '2-1-2',
              label: '法国'
            }]
          }]
        }
      ],
      // 分类选择器数据
      checkclass: [
        {
          value: '1',
          label: '彩妆',
          children: [{
            value: '1-1',
            label: '粉底'
          }, {
            value: '1-2',
            label: '口红',
            children: [{
              value: '1-2-1',
              label: '圣罗兰'
            }, {
              value: '1-2-2',
              label: '肌肤之钥'
            }]
          }]
        }, {
          value: '2',
          label: '上衣',
          children: [{
            value: '2-1',
            label: '外套',
            children: [{
              value: '2-1-1',
              label: '卫衣'
            }, {
              value: '2-1-2',
              label: '毛衣'
            }]
          }]
        }
      ]
    }
  },
  created () {
    let that = this
    that.classOn=that.myfrom.classs.map((val,index)=>{
      return {'name':val.name,'val':[]}
    })
    console.log('map')
    console.log(that.classOn)
    that.getBrandList()
  },
  computed:{
    // 计算属性

  },
  methods: {
    onSubmit () {
      // 点击了上传商品
      console.log('click up goods')
    },
    addGoods(){
      // 添加商品
      console.log('添加商品')
      let that = this
      console.log('创建虚拟表单')
      let formData2 = new FormData()
      that.imgarrfile.map((val)=>{
        formData2.append('files',val)
      })
      formData2.append('pid',that.myfrom.name)
      formData2.append('imgType',that.myfrom.name2)
      console.log(formData2.get('files'))
      that.$api.productPictureAdd(formData2,(data)=>{
          console.log('返回添加品牌结果')
          console.log(data)
          if(data.data.res_code==1){
            this.$message({
              showClose: true,
              message: '恭喜，商品添加成功！',
              type: 'success'
            })
          }else{
            this.$message({
              showClose: true,
              message: '抱歉，商品添加失败！',
              type: 'error'
            })
          }
      })
    },
    // 获取品牌列表
    getBrandList () {
      console.log('获取品牌列表')
      let that = this
      this.$api.brandList({pageIndex:1},(data)=>{
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
    getGoodsClass () {
      let that = this
      that.$api.categoryList({parentId:0},(data)=>{
        console.log('获取商品分类')
        console.log(data)
        if(data.status==200){
          if (data.data.res_code==1) {
            that.goodsClass = data.data.result
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
    // 商品分类层级选择器 
    getClassNum (item) {
      console.log('商品分类选择器')
      console.log(item)
    },
    // 选择商品主图
    chooseimga () {
      // 进入选择封面图片
      console.log('商品主图')
      let that = this
      let headimginp = this.$refs.imga.files[0]
      console.log(headimginp)
      let isLt2M = headimginp.size / 1024 / 1024 < 1
      if (!isLt2M) {
        this.$message({
          message: '注意，图片大小不得大于2M',
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
    changenum () {
      // 商品库存
      console.log('change goods num')
    },
    handleAvatarSuccess (res, file) {
      // 商品封面图设置路径
      console.log('enter fun1')
      console.log(URL.createObjectURL(file.raw))
      console.log(file)
      this.myfrom.headimg = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      // 商品封面图判断大小
      console.log('enter fun2')
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 选择封面图片
    chooseheadimg (file) {
      // 进入选择封面图片
      console.log('enter choose head img')
      let headimginp = this.$refs.headimg.files[0]
      console.log(headimginp)
      let isLt2M = headimginp.size / 1024 / 1024 < 1
      console.log(isLt2M)
      if (!isLt2M) {
        this.$message({
          message: '注意，图片大小不得大于2M',
          type: 'error'
        })
        this.$refs.headimg.value = ''
        return
      }
      let reads = new FileReader()
      let that = this
      reads.readAsDataURL(headimginp)
      reads.onload = function (e) {
        console.log(e)
        that.myfrom.headimg = e.target.result
      }
    },
    chooseimgarr (file) {
      // 进入选择轮播图
      let that = this
      console.log('enter get img arr')
      let headimginp = this.$refs.imgarr.files[0]
      that.imgarrfile.push(headimginp)
      console.log('headimginp===')
      console.log(that.imgarrfile)
      let isLt2M = headimginp.size / 1024 / 1024 < 2
      console.log(isLt2M)
      if (!isLt2M) {
        this.$message({
          message: '注意，图片大小不得大于2M',
          type: 'error'
        })
        this.$refs.headimg.value = ''
        return
      }
      let reads = new FileReader()
      reads.readAsDataURL(headimginp)
      reads.onload = function (e) {
        that.myfrom.imgarr.push(e.target.result)
        that.$refs.headimg.value = ''
      }
    },
    closeimg (data) {
      // 关闭一张图片
      console.log('close one img')
      console.log(data)
      this.myfrom.imgarr.splice(data, 1)
    },
    addclass () {
      // 添加商品属性
      console.log('click add class button')
      if (!this.newclass.name) {
        this.$message({
          showClose: true,
          message: '添加失败，属性名不能为空',
          type: 'error'
        })
        return
      }
      this.myfrom.classitem.push(this.newclass)
      this.newclass = {}
      this.$message({
        showClose: true,
        message: '恭喜，属性添加成功',
        type: 'success'
      })
      console.log(this.myfrom)
    },
    removeclass (index) {
      // 删除商品属性
      console.log('click remove class button')
      this.myfrom.classitem.splice(index, 1)
      this.$message({
        showClose: true,
        message: '恭喜，属性删除成功',
        type: 'success'
      })
      console.log(this.myfrom.classitem)
    },
    // 属性选中事件
    groupchange () {
      console.log('change')
      let that = this
      let newarr = []
      let namearr = []
      for (let i = 0;i<that.classOn.length;i++) {
        console.log(that.classOn[i])
        if(that.classOn[i].val.length){
          newarr.push(that.classOn[i])
          namearr.push(that.classOn[i].name)
        }
      }
      console.log('data===')
      console.log(this.classOn)
      console.log(newarr)
      console.log(namearr)
      let str;
      if (newarr.length == 1) {
        console.log('====1')
        str = newarr[0].val.map(val=>{
          console.log(val)
          let returnarr = []
          returnarr.push(val)
          console.log(returnarr)
          return returnarr
        })
        console.log(str)
      } else if (newarr.length>1) {
        str = newarr[0].val
        for (let i = 1;i<newarr.length;i++) {
          let nstr = [];
          for(let k = 0;k<str.length;k++){
            for(let h = 0;h<newarr[i].val.length;h++){
              nstr.push(str[k]+','+newarr[i].val[h])
            }
          }
          str = nstr
        }
        str = str.map((val)=>{
          return val.split(',')
        })
      } else {
        console.log('空')
      }
      console.log("str==")
      console.log(str)
      that.classArr = str
      that.classNameArr = namearr
    },
    removeall () {
      // 清空全部
      console.log('click remove all')
      this.$confirm('确定清空?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '清空成功!'
        })
      }).catch(() => {
        console.log('取消清空全部')
      })
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
.w300{
  width: 300px;
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
.closeimg{
  position: absolute;
  right: -9px;
  top: -9px;
  font-size: 18px;
  z-index: 10;
}
.closeimg:hover{
  color: red;
}
.imgarrbox{
  padding-top: 10px;
  overflow: hidden;
}
.classbox{
  border: 1px solid #ccc;
  border-radius: 5px;
  float: left;
  margin-right: 10px;
  margin-bottom: 10px;
}
.classname{
  margin-right: 20px;
}
.classTable{
  text-align: center;
}
.classTable td{
  border-bottom:1px solid #ccc;
  border-right:1px solid #ccc;
  padding:0px 10px;
  margin: 0px;
  min-width: 50px;
}
.classTable tr td:first-child{
  border-left: 1px solid #ccc;
}
.classTable tr:first-child td{
  background-color: #ccc;
  border-left:1px solid #fff;
  color: #fff;
}
.classArrbox{
  overflow-x: scroll;
}
.tdinp{
  min-width: 150px;
  outline: none;
  text-align: center;
  border:0px;
}
.discountMain{
  display: inline-block;
  border-radius: 5px;
  padding: 10px;
  border: 1px solid #ccc;
}
.discountTitle{
  text-align: center;
}
.w200{
  width: 200px;
}
.w100{
  width: 100px;
}
.discountBox{
  display: inline-block;
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>
