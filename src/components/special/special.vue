<template>
	<div id="specialInfo">
		<el-scrollbar class="noxscroll" style="height: 100%">
		  	<h1 v-if="pagedata" class="title on">会员专题详情</h1>
		  	<h1 v-else class="title on">新增会员专题</h1>
		    <el-form :model="myfrom" label-width="120px" style="width: 70%;margin-left: 15%;">
		      <el-form-item label="专题昵称">
		        <el-input placeholder="请输入专题昵称" v-model="form.title"></el-input>
		      </el-form-item>
		      <el-form-item label="专题描述">
		        <el-input placeholder="请输入专题描述" v-model="form.description"></el-input>
		      </el-form-item>
		      <el-form-item label="专题类型">
            <el-radio v-model="form.topicType" :label="3">399专题</el-radio>
		        <el-radio v-model="form.topicType" :label="4">19.9专题</el-radio>
		      </el-form-item>
		      <!-- <el-form-item v-if="form.topicType==2" label="文本编辑器">
            <el-button size="samll" @click="addgoods">添加商品</el-button>
		        <quill :quilldata="form.htmlContent" v-model="form.htmlContent"></quill>
		      </el-form-item> -->
		      <el-form-item label="专题图片">
		        <div style="overflow: hidden">
		        <div class="avatardiv">
		          <input accept="image/*" ref="headimg" @change="chooseheadimg" type="file" class="headimginp">
		          <img v-if="imgUrl" :src="imgUrl" class="avatar">
		          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
		        </div>
		        </div>
		        <p class="fs12 colccc">注:图片大小不得大于{{$store.state.oneImgBigSize}}M</p>
		      </el-form-item>
          <el-form-item v-if="form.topicType==3" label="会员权益图片">
            <div style="overflow: hidden">
            <div class="avatardiv">
              <input accept="image/*" ref="img2" @change="chooseimg2" type="file" class="headimginp">
              <img v-if="imgUrl2" :src="imgUrl2" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </div>
            </div>
            <p class="fs12 colccc">注:图片大小不得大于{{$store.state.oneImgBigSize}}M</p>
          </el-form-item>
          <el-form-item v-if="form.topicType==3" label="会员招募图片">
            <div style="overflow: hidden">
            <div class="avatardiv">
              <input accept="image/*" ref="img3" @change="chooseimg3" type="file" class="headimginp">
              <img v-if="imgUrl3" :src="imgUrl3" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </div>
            </div>
            <p class="fs12 colccc">注:图片大小不得大于{{$store.state.oneImgBigSize}}M</p>
          </el-form-item>
          <el-form-item label="专题分享图片">
            <div style="overflow: hidden">
            <div class="avatardiv">
              <input accept="image/*" ref="shareimg" @change="chooseshareimg" type="file" class="headimginp">
              <img v-if="imgShareUrl" :src="imgShareUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </div>
            </div>
            <p class="fs12 colccc">注:图片大小不得大于{{$store.state.oneImgBigSize}}M</p>
          </el-form-item>
		      <el-form-item label="专题状态">
		        <el-radio v-model="form.state" label="1">上线</el-radio>
  				<el-radio v-model="form.state" label="0">下线</el-radio>
		      </el-form-item>
		      <el-form-item>
		      	<div v-if="pagedata">
		      		 <el-button :loading="isloading" @click="changfun" type="primary">修改专题</el-button>
		      		 <el-button :loading="isloading" @click="clearPage">取消</el-button>
		      	</div>
		      	<div v-else>
		      		<el-button @click="addfun" type="primary">新增专题</el-button>
		      		 <el-button @click="clearAll">清空</el-button>
		      	</div>
		      </el-form-item>
		    </el-form>
		</el-scrollbar>
		<el-tooltip class="item" effect="dark" content="关闭专题详情" placement="bottom">
      		<el-button v-if="pagedata" class="clearPage" @click="clearPage" type="warning" icon="el-icon-close" circle></el-button>
    </el-tooltip>
    <el-dialog
      title="选择商品"
      :visible="visible"
      width="80%"
      class="mg5vh"
      @close="clospageCom"
      :before-close="handleClose">
      <special v-if="showcom=='c'" @closepage="clospageCom" v-model="specialitem" itemdata="choose"></special>
    </el-dialog>
	</div>
</template>

<script type="text/javascript">
import quill from '@/components/quill/quill.vue'

export default {
  name: 'specialInfo',
  props:["pagedata"],
  components:{
  	quill
  },
  data () {
    return {
      // 选择商品visible
      visible:false,
    	form:{
    		title:'',
    		description:'',
    		topicType:3,
    		htmlContent:'',
    		state:'1'
    	},
    	imgUrl:'',
      imgUrl2:'',
      imgUrl3:'',
      imgFile:'',
      imgFile2:'',
    	imgFile3:'',
      imgShareUrl:'',
      imgShareFile:'',
      // 按钮加载中
      isloading:false
    }
  },
  methods:{
    // 选择分享图片
    chooseshareimg(){
      let that = this
      let headimginp = this.$refs.shareimg.files[0]
      console.log(headimginp)
      let bigSize = this.$store.state.oneImgBigSize
      let isLt2M = headimginp.size / 1024 / 1024 < bigSize
      console.log(isLt2M)
      if (!isLt2M) {
        this.$message({
          message: '注意，图片大小不得大于'+bigSize+'M',
          type: 'error'
        })
        this.$refs.shareimg.value = ''
        return
      }
      let reads = new FileReader()
      that.imgShareFile = headimginp
      reads.readAsDataURL(headimginp)
      reads.onload = function (e) {
        console.log(e)
        that.imgShareUrl = e.target.result
      }
    },
  	// 选择封面图片
    chooseheadimg (file) {
      // 进入选择封面图片
      console.log('enter choose head img')
      let that = this
      let headimginp = this.$refs.headimg.files[0]
      let bigSize = this.$store.state.oneImgBigSize
      console.log(headimginp)
      let isLt2M = headimginp.size / 1024 / 1024 < bigSize
      console.log(isLt2M)
      if (!isLt2M) {
        this.$message({
          message: '注意，图片大小不得大于'+bigSize+'M',
          type: 'error'
        })
        this.$refs.headimg.value = ''
        return
      }
      let reads = new FileReader()
      that.imgFile = headimginp
      reads.readAsDataURL(headimginp)
      reads.onload = function (e) {
        console.log(e)
        that.imgUrl = e.target.result
      }
    },
    chooseimg2(){
      let that = this
      let headimginp = this.$refs.img2.files[0]
      let bigSize = this.$store.state.oneImgBigSize
      console.log(headimginp)
      let isLt2M = headimginp.size / 1024 / 1024 < bigSize
      console.log(isLt2M)
      if (!isLt2M) {
        this.$message({
          message: '注意，图片大小不得大于'+bigSize+'M',
          type: 'error'
        })
        this.$refs.img2.value = ''
        return
      }
      let reads = new FileReader()
      that.imgFile2 = headimginp
      reads.readAsDataURL(headimginp)
      reads.onload = function (e) {
        console.log(e)
        that.imgUrl2 = e.target.result
      }
    },
    chooseimg3(){
      let that = this
      let headimginp = this.$refs.img3.files[0]
      let bigSize = this.$store.state.oneImgBigSize
      console.log(headimginp)
      let isLt2M = headimginp.size / 1024 / 1024 < bigSize
      console.log(isLt2M)
      if (!isLt2M) {
        this.$message({
          message: '注意，图片大小不得大于'+bigSize+'M',
          type: 'error'
        })
        this.$refs.img3.value = ''
        return
      }
      let reads = new FileReader()
      that.imgFile3 = headimginp
      reads.readAsDataURL(headimginp)
      reads.onload = function (e) {
        console.log(e)
        that.imgUrl3 = e.target.result
      }
    },
    // 添加商品
    addgoods () {

    },
    // 新增专题
    addfun () {
      this.isloading = true
    	console.log('新增专题')
    	console.log(this.form)
    	let fordata = new FormData()
    	for (let i in this.form) {
    		fordata.append(i,this.form[i])
    	}
      if (this.form.topicType==4&&this.imgFile2) {
        fordata.append('rightsUrl',this.imgFile2)
      }
      if (this.form.topicType==4&&this.imgFile3) {
        fordata.append('rightsUrlTwo',this.imgFile3)
      }
      fordata.append('img',this.imgFile)
    	fordata.append('shareImg',this.imgShareFile)
    	this.$api.topicAdd(fordata,data=>{
    		console.log(data)
    		if (data.data.res_code==1) {
    			this.$message({
    				showClose:true,
    				message:'专题添加成功',
    				type:'success'
    			})
    		} else {
    			this.$message({
    				showClose:true,
    				message:'专题添加失败',
    				type:'error'
    			})
    		}
        this.isloading = false
    	})
    },
    // 修改专题
    changfun () {
    	console.log('修改专题')
      this.isloading = true
    	this.form.tid = this.pagedata.tid
    	console.log(this.form)
    	let isFile,formdata
    	if (this.imgFile||this.imgShareFile||this.imgFile2||this.imgFile3) {
    		isFile = true
    		formdata = new FormData()
    		for (let i in this.form) {
    			formdata.append(i,this.form[i])
    		}
        if(this.imgFile){
          formdata.append('img',this.imgFile)
        }
        if(this.imgFile2){
          formdata.append('rightsUrl',this.imgFile2)
        }
        if(this.imgFile3){
          formdata.append('rightsUrlTwo',this.imgFile3)
        }
        if(this.imgShareFile){
          formdata.append('shareImg',this.imgShareFile)
        }
    	} else {
    		isFile = false
    		formdata = this.form
    	}
    	console.log(formdata)
    	this.$api.topicUpdata(formdata,isFile,data=>{
    		console.log(data)
    		if(data.data.res_code==1){
    			this.clearPage('new')
    			this.$message({
    				showClose:true,
    				message:'专题更新成功',
    				type:'success'
    			})
    		} else {
    			this.$message({
    				showClose:true,
    				message:'专题更新失败',
    				type:'error'
    			})
    		}
        this.isloading = false
    	})
    },
    clearPage (item) {
    	// 关闭专题详情
    	console.log('子组件点击的关闭详情')
    	this.$emit('closePage',item)
    },
    clearAll () {
    	// 清空
    	console.log('清空')
    },
    // 表格选择
    handleSelectionChange(val) {
        this.multipleSelection = val;
    }
  },
  created () {
  	console.log('pagedata')
  	console.log(this.pagedata)
  	if(this.pagedata){
  		this.form = {
    		title:this.pagedata.title,
    		description:this.pagedata.description,
    		topicType:this.pagedata.topicType,
    		htmlContent:this.pagedata.htmlContent,
    		state:this.pagedata.state+''
    	}
      this.imgUrl = this.pagedata.imgUrl
    	this.imgShareUrl = this.pagedata.shareImgUrl
      this.imgUrl2 = this.pagedata.rightsImgUrl
      this.imgUrl3 = this.pagedata.rightsTwoUrl
  	}
  }
}
</script>

<style type="text/css" scoped lang="scss">
#specialInfo{
	height: 100%;
	width: 100%;
	background-color: #fff;
	position: relative;
}
.title{
	padding-top: 30px;
	text-align: center;
	margin-bottom: 50px;
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
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.clearPage{
	position: absolute;
	top: 20px;
	right: 20px;
}
.tablebox{
	border:1px solid #ccc;
	margin-top: 10px;
	position: relative;
}
.pagenumbox{
	text-align: right;
	height: 30px;
	line-height: 30px;
}
.specialMain{
	border: 1px solid #ccc;
	border-radius: 5px;
	.maintitle{
		padding: 10px 0px;
		text-align: center;
	}
}
</style>
