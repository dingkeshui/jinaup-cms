<template>
  <div class="box">
  	<el-scrollbar class="noxscroll" style="height: 100%">
  		<h1 class="title on"><span v-if="!branckinfo">添加银行</span><span v-else>银行信息</span></h1>
  		<el-form ref="form" :model="form" style="width:50%;margin-left:25%;" label-width="120px">
  			<el-form-item label="银行名称">
			    <el-input class="w300" placeholder="请输入银行名称" v-model="form.banckName"></el-input>
			</el-form-item>
			<el-form-item label="银行编码">
			    <el-input class="w300" placeholder="请输入银行编码" v-model="form.banckCode"></el-input>
			</el-form-item>
			<el-form-item label="排序ID">
			    <el-input class="w300" placeholder="请输入排序ID" v-model="form.sortId"></el-input>
			</el-form-item>
			<el-form-item label="PC端图片">
	            <div style="overflow: hidden">
		          <div class="avatardiv">
		            <input accept="image/*" ref="pcimg" @change="chooseimg('a')" type="file" class="headimginp">
		            <img v-if="pcImgUrl" :src="pcImgUrl" class="avatar">
		            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
		          </div>
	            </div>
	          <p class="fs12 colccc mg-15">注:图片大小不得大于2M</p>
			</el-form-item>
			<el-form-item label="APP端图片">
			    <div style="overflow: hidden">
		          <div class="avatardiv">
		            <input accept="image/*" ref="appimg" @change="chooseimg('b')" type="file" class="headimginp">
		            <img v-if="appImgUrl" :src="appImgUrl" class="avatar">
		            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
		          </div>
	          </div>
			</el-form-item>
			<el-form-item>
				<template v-if="branckinfo">
			    	<el-button type="primary" @click="changBank">保存编辑</el-button>
		    	</template>
		    	<template v-else>
		    		<el-button type="primary" @click="addBank">立即创建</el-button>
			    	<el-button @click="removeall">清空</el-button>
		    	</template>
		    	<el-button @click="clospage">取消</el-button>
		    </el-form-item>
  		</el-form>
  	</el-scrollbar>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'bankinfo',
  props:['branckinfo'],
  data () {
  	return {
  		// pc图片文本
  		pcImgFile:'',
  		pcImgUrl:'',
  		// app图片
  		appImgFile:'',
  		appImgUrl:'',
  		form:{
  			// 银行名称
  			banckName:'',
  			// 银行编码
  			banckCode:'',
  			// 排序id
  			sortId:''
  		}
  	}
  },
  created () {
  	let that = this
  	if (that.branckinfo) {
  		console.log('branckinfo',that.branckinfo)
  		for (let i in that.form) {
  			that.form[i] = that.branckinfo[i]
  		}
  		that.pcImgUrl= that.branckinfo.pcPicUrl
  		that.appImgUrl= that.branckinfo.appPicUrl
  	}

  },
  methods:{
  	// 选择商品图
    chooseimg (item) {
      // 进入选择图片
      console.log('商品图',item)
      let that = this
      let headimginp 
      if (item == 'a') {
      	headimginp = that.$refs.pcimg.files[0]
      } else {
      	headimginp = that.$refs.appimg.files[0]
      }
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
      	if (item == 'a') {
      		that.pcImgFile = headimginp
      		that.pcImgUrl = e.target.result
      	} else {
      		that.appImgUrl = e.target.result
      		that.appImgFile = headimginp
      	}
      }
    },
    // 添加银行
    addBank () {
    	console.log('添加银行')
    	let that = this
    	console.log(that.form)
    	let formData = new FormData()
    	for (let i in that.form) {
    		formData.append(i,that.form[i])
    	}
    	formData.append('pcImg',that.pcImgFile)
    	formData.append('appImg',that.appImgFile)
      console.log(formData.get('pcImg'))
      console.log(formData.get('appImg'))
      console.log(formData.get('banckName'))
    	that.$api.banckInfoAdd(formData,(data)=>{
    		console.log(data)
    		if(data.data.res_code==1){
    			that.$message({
		            showClose: true,
		            message: '银行添加成功！',
		            type: 'success'
		        })
    			that.clospage('new')
    		}else{
    			that.$message({
		            showClose: true,
		            message: '银行添加失败！',
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
    	if (that.pcImgFile || that.appImgFile) {
    		formData = new FormData()
    		for (let i in that.form) {
    			formData.append(i,that.form[i])
    		}
    		formData.append('biid',that.branckinfo.biid)
    		if (that.pcImgFile) {
    			formData.append('pcImg',that.pcImgFile)
    		}
    		if (that.appImgFile) {
    			formData.append('appImg',that.appImgFile)
    		}
    		isFile = true
    	} else {
    		isFile = false
    		formData = {}
    		for (let i in that.form) {
    			formData[i] = that.form[i]
    		}
    		formData.biid = that.branckinfo.biid
    		console.log('formData',formData)
    	}
    	that.$api.banckInfoUpdata(formData, isFile, (data)=>{
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
    	if (item == 'new') {
    		that.$emit('clospage',item)
    	} else {
    		that.$emit('clospage')
    	}
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
