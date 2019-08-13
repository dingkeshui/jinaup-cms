<template>
  <div class="box">
  	<el-scrollbar class="noxscroll" style="height: 100%">
  		<h1 class="title on"><span v-if="!pageinfo">添加首页数据</span><span v-else>首页数据信息</span></h1>
  		<el-form ref="form" :model="form" style="width:70%;margin-left:15%;" label-width="120px">
  		<el-form-item label="数据别名">
			    <el-input placeholder="请输入数据别名" v-model="form.alias"></el-input>
			</el-form-item>
      <el-form-item label="可见类型">
          <el-select v-model="form.visibleType" placeholder="请选择">
            <el-option label="全部可见" value="0"></el-option>
            <el-option label="普通可见" value="1"></el-option>
            <el-option label="Vip可见" value="2"></el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="模板类型">
        <el-select v-model="form.pageValue" @change="pagevalchange" clearable placeholder="请选择模板类型">
          <el-option
            v-for="(item,index) in pagehomeinfo"
            :key="item.pageValue"
            :label="item.pageName"
            :value="item.pageValue">
          </el-option>
        </el-select>
      </el-form-item>
      <template v-if="form.pageValue=='adOne'||form.pageValue=='carouselProduct'">
			<el-form-item label="数据类型">
			  <el-select v-model="form.contentType" clearable placeholder="请选择数据类型">
          <el-option
            v-for="item in pagelist"
            :key="item.contentType"
            :label="item.contentName"
            :value="item.contentType">
          </el-option>
        </el-select>
			</el-form-item>
      <el-form-item v-if="form.contentType==1" label="选择商品">
        <div><el-button size="small" @click="choosetype('a')" type="primary">选择商品</el-button></div>
        <div v-if="goodsitem">
          <table cellspacing="0" class="tab">
              <tr>
                <td>商品ID</td>
                <td class="flex1">商品昵称</td>
                <td>商品图片</td>
              </tr>
              <tr>
                <td>{{goodsitem.pid}}</td>
                <td class="flex1">{{goodsitem.shortTitle}}</td>
                <td><img :src="goodsitem.mainImgUrl"></td>
              </tr>
          </table>
        </div>
      </el-form-item>
      <!-- <el-form-item v-if="form.contentType==2" label="选择秒杀商品">
        <div><el-button size="small" @click="choosetype('b')" type="primary">选择秒杀商品</el-button></div>
        <div>
          
        </div>
      </el-form-item> -->
      <el-form-item v-if="form.contentType==2" label="选择专题">
        <div>
          <el-button size="small" @click="choosetype('c')" type="primary">选择会员专题</el-button>
          <el-button size="small" @click="choosetype('cb')" type="primary">选择普通专题</el-button>
        </div>
          <div v-if="comspecialitem">
            <table cellspacing="0" class="tab">
                <tr>
                  <td>普通专题ID</td>
                  <td class="flex1">普通专题昵称</td>
                  <td>普通专题图片</td>
                </tr>
                <tr>
                  <td>{{comspecialitem.siid}}</td>
                  <td class="flex1">{{comspecialitem.specialName}}</td>
                  <td><img :src="comspecialitem.specialImg"></td>
                </tr>
            </table>
          </div>
          <div v-if="specialitem">
            <table cellspacing="0" class="tab">
                <tr>
                  <td>专题ID</td>
                  <td class="flex1">专题昵称</td>
                  <td>专题图片</td>
                </tr>
                <tr>
                  <td>{{specialitem.tid}}</td>
                  <td class="flex1">{{specialitem.title}}</td>
                  <td><img :src="specialitem.imgUrl"></td>
                </tr>
            </table>
          </div>
      </el-form-item>
      <el-form-item v-if="form.contentType==3" label="选择分类">
        <div><el-button size="small" @click="choosetype('e')" type="primary">选择分类</el-button></div>
        <div v-if="classitem">
            <table cellspacing="0" class="tab">
              <tr>
                <td>分类ID</td>
                <td class="flex1">分类昵称</td>
                <td>分类图片</td>
              </tr>
              <tr>
                <td>{{classitem.cid}}</td>
                <td class="flex1">{{classitem.cname}}</td>
                <td><img v-if="imgUrl" :src="classitem.imgUrl"><span class="colaaa" v-else>暂无图片</span></td>
              </tr>
            </table>
        </div>
      </el-form-item>
      <el-form-item v-if="form.contentType=='7'" label="选择单品专题">
            <div><el-button size="small" @click="choosetype('g')" type="primary">选择单品专题</el-button></div>
            <div v-if="goodsspecialitem">
                <table cellspacing="0" class="tab">
                  <tr>
                    <td>专题昵称</td>
                    <td class="flex1">专题商品昵称</td>
                    <td>专题商品ID</td>
                  </tr>
                  <tr>
                    <td>{{goodsspecialitem.id}}</td>
                    <td class="flex1">{{goodsspecialitem.productName}}</td>
                    <td>{{goodsspecialitem.pid}}</td>
                  </tr>
                </table>
            </div>
          </el-form-item>
      <el-form-item v-if="form.contentType==4" label="选择品牌">
        <div><el-button size="small" @click="choosetype('d')" type="primary">选择品牌</el-button></div>
        <div v-if="brankitem">
            <table cellspacing="0" class="tab">
              <tr>
                <td>品牌ID</td>
                <td class="flex1">品牌昵称</td>
                <td>品牌图片</td>
              </tr>
              <tr>
                <td>{{brankitem.bid}}</td>
                <td class="flex1">{{brankitem.chineseName}}</td>
                <td><img :src="brankitem.logoImgUrl"></td>
              </tr>
            </table>
        </div>
      </el-form-item>
      </template>
      <!-- <el-form-item label="uiType">
          <el-input placeholder="请输入广告uiType" v-model="form.uiType"></el-input>
      </el-form-item> -->
			<el-form-item label="排序位置">
			    <el-input placeholder="请输入排序ID" v-model="form.pageSort"></el-input>
			</el-form-item>
			<el-form-item v-if="form.pageValue=='adOne'||form.pageValue=='carouselProduct'" label="数据图片">
        <div style="overflow: hidden">
          <div class="avatardiv">
            <input accept="image/*" ref="pcimg" @change="chooseimg" type="file" class="headimginp">
            <img v-if="imgUrl" :src="imgUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </div>
        </div>
        <p class="fs12 colccc mg-15">注:图片大小不得大于2M</p>
			</el-form-item>
      <el-form-item label="模板状态">
          <el-radio v-model="form.state" label="1">上线</el-radio>
          <el-radio v-model="form.state" label="0">下线</el-radio>
      </el-form-item>
			<el-form-item>
				<template v-if="pageinfo">
			    <el-button type="primary" @click="changBank">保存编辑</el-button>
	    	</template>
	    	<template v-else>
	    		<el-button type="primary" @click="addBank">立即添加</el-button>
		    	<el-button @click="removeall">清空</el-button>
	    	</template>
	    	<el-button @click="clospage">取消</el-button>
		    </el-form-item>
  		</el-form>
  	</el-scrollbar>
    <el-dialog
      v-if="!showbox"
      :title="dialogtitle"
      visible="true"
      width="80%"
      class="mg5vh"
      @close="clospageCom"
      :before-close="handleClose">
      <goods v-if="showcom=='a'" @closepage="clospageCom"  v-model="goodsitem" itemdata="choose"></goods>
      <special v-if="showcom=='c'" @closepage="clospageCom" v-model="specialitem" itemdata="choose"></special>
      <comspecial v-if="showcom=='cb'" @closepage="clospageCom" v-model="comspecialitem" itemdata="choose"></comspecial>
      <brank v-if="showcom=='d'" @closepage="clospageCom" v-model="brankitem" itemdata="choose"></brank>
      <classlist v-if="showcom=='e'" @closepage="clospageCom" v-model="classitem" itemdata="choose"></classlist>
      <goodsspecial v-if="showcom=='g'" @closepage="clospageCom" v-model="goodsspecialitem" itemdata="choose"></goodsspecial>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
import brank from '@/components/brank/branklist.vue'
import special from '@/components/special/speciallist.vue'
import classlist from '@/components/goods/classlist.vue'
import comspecial from '@/components/special/comspeciallist.vue'
import goods from '@/components/goods/goodslist.vue'
import goodsspecial from '@/components/special/goodsspecial.vue'

export default {
  name: 'pageinfo',
  props:['pageinfo','pagelist'],
  components:{
    brank,
    special,
    classlist,
    comspecial,
    goods,
    goodsspecial
  },
  data () {
  	return {
      // 首页模板类型
      pagehomeinfo:'',
      // 选择的品牌信息
      brankitem:'',
      // 选择的会员专题信息
      specialitem:'',
      // 选择的普通专题
      comspecialitem:'',
      // 选择的分类信息
      classitem:'',
      // 选择的商品信息
      goodsitem:'',
      // 选择的商品专题信息
      goodsspecialitem:'',
      showbox:true,
  		// pc图片文本
  		imgFile:'',
      // dialog标题
      dialogtitle:'',
  		imgUrl:'',
      // 显示哪个组件
      showcom:'',
  		form:{
        // 别名
        alias:'',
        // 状态
  			state:'1',
        // 广告类型
        contentType:'',
        uiType:'1',
        pageSort:'',
        pageValue:'',
        pageName:'',
        pageType:'',
        visibleType:'0'
  		}
  	}
  },
  watch:{
    specialitem(val){
      if(val){
        this.comspecialitem = ""
      }
    },
    comspecialitem(val){
      if(val){
        this.specialitem = ""
      }
    }
  },
  created () {
  	let that = this
    that.getPageInfo()
  	if (that.pageinfo) {
  		console.log('pageinfo',that.pageinfo)
  		for (let i in that.form) {
  			that.form[i] = that.pageinfo[i]?that.pageinfo[i]:''
  		}
      that.form.state = that.pageinfo.state+''
      that.form.visibleType = that.pageinfo.visibleType+''
  		that.imgUrl = that.pageinfo.pictUrl
      if(that.pageinfo.contentType == 1){
        this.getgoods(that.pageinfo.contentValue)
      } else if (that.pageinfo.contentType == 2) {
        this.getSpecial(that.pageinfo.contentValue)
        // this.getSpikeGoods(that.pageinfo.contentValue)
      } else if (that.pageinfo.contentType == 3) {
        this.getClass(that.pageinfo.contentValue)
      } else if (that.pageinfo.contentType == 4) {
        this.getBrank(that.pageinfo.contentValue)
      } else if (that.pageinfo.contentType == 5) {
        
      } else if (that.pageinfo.contentType == 6) {
        
      }else if (that.pageinfo.contentType == 7) {
        this.getOneGoodsSpecial(that.pageinfo.contentValue)
      }
  	}

  },
  methods:{
    // 获取商品专题
    getOneGoodsSpecial(item){
      console.log('单品专题',item)
      this.$api.oneGoodsSpecial({id:item},res=>{
        if(res.data.res_code==1){
          this.goodsspecialitem = res.data.result
        }else {
          this.$message({
            showClose:true,
            message:'信息获取失败',
            type:'error'
          })
        }
      })
    },
    // 获取首页模板类型
    getPageInfo(){
      console.log('获取首页模板类型')
      this.$api.getPageHome(data=>{
        console.log(data)
        if (data.data.res_code==1) {
          this.pagehomeinfo = data.data.result
        } else {
          this.$message({
            showClose:true,
            message:'首页模板类型获取失败',
            type:'error'
          })
        }
      })
    },
    // 首页模板类型改变
    pagevalchange (item) {
      console.log('首页模板类型改变',item)
      this.pagehomeinfo.map(val=>{
        if(val.pageValue == item){
          this.form.pageName = val.pageName
          this.form.pageType = val.pageType
        }
      })
    },
    // 选择类型
    choosetype(item){
      if(item=='a'){
        this.dialogtitle = '选择商品'
      }else if(item=='b'){
        this.dialogtitle = '选择秒杀商品'
      }else if(item=='c'){
        this.dialogtitle = '选择会员专题'
      }else if(item=='cb'){
        this.dialogtitle = '选择普通专题'
      }else if(item=='d'){
        this.dialogtitle = '选择品牌'
      }else if(item=='e'){
        this.dialogtitle = '选择分类'
      }else if(item=='g'){
        this.dialogtitle = '选择单品专题'
      }
      this.showbox = false
      this.showcom = item
    },
    // 获取某一商品信息
    getgoods(item){
      this.$api.infoDetail({pid:item},(data)=>{
        console.log('某一商品',data)
        if (data.data.res_code==1) {
          this.goodsitem = data.data.result
        } else {
          this.$message({
            showClose:true,
            message:'商品信息获取失败',
            type:'error'
          })
        }
      })
    },
    // 获取秒杀信息
    getSpikeGoods(item){
      console.log('获取秒杀信息')
    },
    // 获取某一专题
    getSpecial(item){
      console.log('获取某一专题',item,this.pageinfo)
      let res = {
        id:item,
        uiType:1
      }
      if(this.pageinfo.uiType){
        res.uiType = this.pageinfo.uiType
      }
      this.$api.spcialIdInfo(res,data=>{
        console.log(data)
        if(data.data.res_code==1){
          if(res.uiType==1){
            this.comspecialitem = {
              siid:data.data.result.id,
              specialImg:data.data.result.imgUrl,
              specialName:data.data.result.title
            }
          }else{
            this.specialitem = {
              topicType:data.data.result.topicType,
              tid:data.data.result.id,
              imgUrl:data.data.result.imgUrl,
              title:data.data.result.title
            }
          }
        }else{
          this.$message({
            showClose:true,
            message:'专题信息查询失败',
            type:'error'
          })
        }
      })
    },
    // 获取拼团
    getAssemble(){
      console.log('获取拼团')
    },
    // 获取某一品牌
    getBrank(item){
      console.log('获取某一品牌',item)
      this.$api.brandOne({bid:item},data=>{
        console.log(data)
        if(data.data.res_code==1){
          this.brankitem = data.data.result
        }else{
          this.$message({
            showClose:true,
            message:'品牌信息查询失败',
            type:'error'
          })
        }
      })
    },
    // 获取某一分类
    getClass(item){
      console.log('获取某一分类',item)
      this.$api.categoryOne({cid:item},data=>{
        console.log(data)
        if(data.data.res_code==1){
          this.classitem = data.data.result
        }else{
          this.$message({
            showClose:true,
            message:'分类信息查询失败',
            type:'error'
          })
        }
      })
    },
    // 关闭子页面
    clospageCom () {
      this.showbox = true
      console.log('父组件子页面关闭',this.classitem)
    },
  	// 选择商品图
    chooseimg (item) {
      // 进入选择图片
      console.log('商品图',item)
      let that = this
      let headimginp 
      headimginp = that.$refs.pcimg.files[0]
      console.log(headimginp)
      let isLt2M = headimginp.size / 1024 / 1024 < 1
      if (!isLt2M) {
        this.$message({
          message: '注意，图片大小不得大于2M',
          type: 'error'
        })
        return
      }      
      let reads = new FileReader()
      reads.readAsDataURL(headimginp)
      reads.onload = function (e) {
    		that.imgFile = headimginp
    		that.imgUrl = e.target.result
      }
    },
    // 添加广告
    addBank () {
    	console.log('添加数据')
    	let that = this
    	console.log(that.form)
    	let formData = new FormData()
      if(that.form.contentType==1){
        formData.append('contentValue',that.goodsitem.pid)
      }else if(that.form.contentType==2){
        if (that.specialitem) {
          if(that.specialitem.topicType==4){
            that.form.uiType = 3
          } else {
            that.form.uiType = 2
          }
          formData.append('contentValue',that.specialitem.tid)
        } else {
          that.form.uiType = 1
          formData.append('contentValue',that.comspecialitem.siid)
        }
      }else if (that.form.contentType==3){
        formData.append('contentValue',that.classitem.cid)
      }else if (that.form.contentType==4){
        formData.append('contentValue',that.brankitem.bid)
      }else if (that.form.contentType==7){
        formData.append('contentValue',that.goodsspecialitem.id)
      }
      for (let i in that.form) {
        formData.append(i,that.form[i])
      }
      if (that.imgFile) {
        formData.append('pictImg',that.imgFile)
      }
    	that.$api.pageHomeAdd(formData,(data)=>{
    		console.log(data)
    		if(data.data.res_code==1){
    			that.$message({
		            showClose: true,
		            message: '数据模板添加成功！',
		            type: 'success'
		        })
    			that.clospage('new')
    		}else{
    			that.$message({
		            showClose: true,
		            message: '数据模板添加失败！',
		            type: 'error'
		        })
    		}
    	})
    },
    // 保存编辑
    changBank () {
    	console.log('保存编辑')
    	let that = this
    	let formData
    	let isFile
  		formData = new FormData()
      formData.append('phid',that.pageinfo.phid)
      if(this.form.pageValue=='adOne'||this.form.pageValue=='carouselProduct'){
        if (that.imgFile) {
          formData.append('pictImg',that.imgFile)
        }
        if(that.form.contentType==1){
          formData.append('contentValue',that.goodsitem.pid)
        }else if(that.form.contentType==2){
          console.log('专题')
          if (that.specialitem) {
            console.log('会员专题',that.specialitem)
            if(that.specialitem.topicType==4){
              that.form.uiType=3
            } else {
              that.form.uiType=2
            }
            formData.append('contentValue',that.specialitem.tid)
          } else {
            console.log('普通专题')
            formData.append('contentValue',that.comspecialitem.siid)
            that.form.uiType=1
          }
        }else if (that.form.contentType==3){
          if (that.classitem) {
            formData.append('contentValue',that.classitem.cid)
          }
        }else if (that.form.contentType==4){
          if (that.brankitem) {
            formData.append('contentValue',that.brankitem.bid)
          }
        }else if (that.form.contentType==7){
          if (that.goodsspecialitem) {
            formData.append('contentValue',that.goodsspecialitem.id)
          }
        }
      }
      for (let i in that.form) {
        formData.append(i,that.form[i])
      }
  		isFile = true
    	that.$api.pageHomeUpdata(formData, isFile, (data)=>{
    		console.log(data)
    		if (data.data.res_code==1) {
    			that.$message({
    				message:'信息编辑成功！',
    				type:'success',
    				showClose:true
    			})
    			that.clospage('new')
    		} else {
    			that.$message({
    				message:'信息编辑失败！',
    				type:'error',
    				showClose:true
    			})
    		}
    	})
    },
    // 清空
    removeall () {
    	console.log('清空')
    	let that = this
    	for (let i in that.form) {
    		that.form[i] = ''
    	}
    	that.pcImgFile = ''
    	that.appImgFile = ''
    	that.pcImgUrl = ''
    	that.appImgUrl = ''
    },
    // 关闭页面
    clospage (item) {
    	console.log('子页面关闭页面')
   		console.log(item)
    	let that = this
    	that.$emit('closepage',item)
    }
  }
}
</script>

<style type="text/css" scoped>
.box{
	width: 100%;
	height: 100%;
}
</style>
