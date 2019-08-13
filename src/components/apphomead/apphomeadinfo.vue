<template>
  <div class="box">
  	<el-scrollbar class="noxscroll" style="height: 100%">
  		<h1 class="title on"><span v-if="!adinfo">添加首页广告</span><span v-else>首页广告信息</span></h1>
  		<el-form ref="form" :model="form" style="width:70%;margin-left:15%;" label-width="120px">
  		<el-form-item label="广告别名">
			    <el-input placeholder="请输入广告别名" v-model="form.alias"></el-input>
			</el-form-item>
			<el-form-item label="广告类型">
			  <el-select v-model="form.contentType" clearable placeholder="请选择广告类型">
          <el-option
            v-for="item in adlist"
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
                <td>会员专题ID</td>
                <td class="flex1">会员专题昵称</td>
                <td>会员专题图片</td>
              </tr>
              <tr>
                <td>{{specialitem.tid}}</td>
                <td class="flex1">{{specialitem.title}}</td>
                <td><img :src="specialitem.imgUrl"></td>
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
      <el-form-item label="uiType">
          <el-input placeholder="请输入广告uiType" v-model="form.uiType"></el-input>
      </el-form-item>
			<el-form-item label="排序位置">
			    <el-input placeholder="请输入排序ID" v-model="form.position"></el-input>
			</el-form-item>
			<el-form-item label="广告图片">
            <div style="overflow: hidden">
              <div class="avatardiv">
                <input accept="image/*" ref="pcimg" @change="chooseimg" type="file" class="headimginp">
                <img v-if="imgUrl" :src="imgUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </div>
            </div>
	          <p class="fs12 colccc mg-15">注:图片大小不得大于2M</p>
			</el-form-item>
      <el-form-item label="广告状态">
          <el-radio v-model="form.state" label="1">上线</el-radio>
          <el-radio v-model="form.state" label="0">下线</el-radio>
      </el-form-item>
			<el-form-item>
				<template v-if="adinfo">
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
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
import brank from '@/components/brank/branklist.vue'
import special from '@/components/special/speciallist.vue'
import classlist from '@/components/goods/classlist.vue'
import goods from '@/components/goods/goodslist.vue'
import comspecial from '@/components/special/comspeciallist.vue'

export default {
  name: 'bankinfo',
  props:['adinfo','adlist'],
  components:{
    brank,
    special,
    classlist,
    goods,
    comspecial
  },
  data () {
  	return {
      // 选择的品牌信息
      brankitem:'',
      // 选择的会员专题信息
      specialitem:'',
      // 选择的普通专题信息
      comspecialitem:'',
      // 选择的分类信息
      classitem:'',
      // 选择的商品信息
      goodsitem:'',
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
        uiType:'',
        position:''
  		}
  	}
  },
  watch:{
    specialitem(val){
      console.log('specialitem',val)
      if(val){
        this.comspecialitem = ""
      }
    },
    comspecialitem(val){
      console.log('comspecialitem',val)
      if(val){
        this.specialitem = ""
      }
    }
  },
  created () {
  	let that = this
  	if (that.adinfo) {
  		console.log('adinfo',that.adinfo)
  		for (let i in that.form) {
  			that.form[i] = that.adinfo[i]
  		}
      that.form.state = that.form.state+''
  		that.imgUrl = that.adinfo.pictUrl
      if(that.adinfo.contentType == 1){
        this.getgoods(that.adinfo.contentValue)
      } else if (that.adinfo.contentType == 2) {
        this.getSpecial(that.adinfo.contentValue)
        // this.getSpikeGoods(that.adinfo.contentValue)
      } else if (that.adinfo.contentType == 3) {
        this.getClass(that.adinfo.contentValue)
        // this.getSpecial(that.adinfo.contentValue)
      } else if (that.adinfo.contentType == 4) {
        this.getBrank(that.adinfo.contentValue)
        // this.getAssemble(that.adinfo.contentValue)
      } else if (that.adinfo.contentType == 5) {
        // this.getClass(that.adinfo.contentValue)
      } else if (that.adinfo.contentType == 6) {
        // this.getBrank(that.adinfo.contentValue)
      }
  	}

  },
  methods:{
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
      }
      this.showbox = false
      this.showcom = item
    },
    // 获取某一商品信息
    getgoods(item){
      console.log('获取某一商品信息',item)
      this.$api.infoDetail({pid:item},data=>{
        console.log(data)
        if(data.data.res_code==1){
          this.goodsitem = data.data.result
        }else{
          this.$message({
            showClose:true,
            message:'商品信息查询失败',
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
      console.log('获取某一专题',item)
      this.$api.topicList({tid:item},data=>{
        console.log(data)
        if(data.data.res_code==1){
          this.specialitem = data.data.result
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
    	console.log('添加广告')
    	let that = this
    	console.log(that.form)
    	let formData = new FormData()
    	for (let i in that.form) {
    		formData.append(i,that.form[i])
    	}
      if(that.form.contentType==1){
        formData.append('contentValue',that.goodsitem.pid)
      }else if(that.form.contentType==2){
        if(that.specialitem){
          formData.append('contentValue',that.specialitem.tid)
        }else{
          formData.append('contentValue',that.comspecialitem.siid)
        }
      }else if (that.form.contentType==3){
        formData.append('contentValue',that.classitem.cid)
      }else if (that.form.contentType==4){
        formData.append('contentValue',that.brankitem.bid)
      }
    	formData.append('pictImg',that.imgFile)
      console.log(formData.get('pictImg'))
    	that.$api.homeadAdd(formData,(data)=>{
    		console.log(data)
    		if(data.data.res_code==1){
    			that.$message({
		            showClose: true,
		            message: '广告添加成功！',
		            type: 'success'
		        })
    			that.clospage('new')
    		}else{
    			that.$message({
		            showClose: true,
		            message: '广告添加失败！',
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
  		for (let i in that.form) {
  			formData.append(i,that.form[i])
  		}
      formData.append('phaid',that.adinfo.phaid)
      if (that.imgFile) {
        formData.append('pictImg',that.imgFile)
        console.log(that.imgFile)
      }
      if(that.form.contentType==1){
        formData.append('contentValue',that.goodsitem.pid)
      }else if(that.form.contentType==2){
        if (that.specialitem) {
          formData.append('contentValue',that.specialitem.tid)
        } else {
          formData.append('contentValue',that.comspecialitem.siid)
        }
      }else if (that.form.contentType==3){
        if (that.classitem) {
          formData.append('contentValue',that.classitem.cid)
        }
      }else if (that.form.contentType==4){
        if (that.brankitem) {
          formData.append('contentValue',that.brankitem.bid)
        }
      }
  		isFile = true
    	that.$api.homeadUpdata(formData, isFile, (data)=>{
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
.w300{
	width: 300px;
}
</style>
