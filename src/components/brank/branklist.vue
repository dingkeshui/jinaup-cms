<template>
  <div id="brand">
  	<transition name="fade">
  		<div v-if="showBox1" class="box1 flex2">
  			<div class="flexvcenter pad5">
	  			<div class="flex1">
	  				<el-input size="small" placeholder="品牌名称" style="width:300px;" v-model="searchData.chineseName" class="mgr5"></el-input>
	  				<el-button size="small" @click="search" type="primary">搜索</el-button>
	  				<el-button @click="getBrandAll" type="success" size="small">全部品牌</el-button>
	  				<el-button @click="downBrank" :loading="downBrankButLoading" type="warning" size="small">导出品牌</el-button>
	  				<!-- <el-button @click="showUpBrank('a')" type="warning" size="small">批量新增品牌</el-button> -->
	  				<!-- <el-button @click="showUpBrank('b')" type="warning" size="small">批量修改品牌</el-button> -->
	  			</div>
	  			<div class="flexvcenter">
	  				<el-button v-if="itemdata" size="small" @click="closepage" type="primary">取消</el-button>
	  				<el-button v-else size="small" @click="addNewBrand" type="primary">新增品牌</el-button>
	  			</div>
	  		</div>
	  		<div class="flex1" style="position: relative;">
	  			<div class="tablebox">
		  		<el-table
				    :data="brandList"
				    border
				    height="100%"
				    v-loading="tableloading"
				    style="width: 100%;height:100%;">
				    <el-table-column
				      type="index"
				      label="排序"
				      width="50">
				    </el-table-column>
				    <el-table-column
				      prop="chineseName"
				      label="品牌中文名称">
				    </el-table-column>
				    <el-table-column
				      label="LOGO图片"
				      width="120">
				      <template slot-scope="scope">
				      	<img style="width:100px;" :src="scope.row.logoImgUrl">
				      </template> 
				    </el-table-column>
				    <el-table-column
				      prop="englishName"
				      label="品牌英文名称">
				    </el-table-column>
				    <el-table-column
				      prop="bid"
				      label="品牌ID"
				      width="100">
				    </el-table-column>
				    <el-table-column
				      prop="state"
				      label="品牌状态"
				      width="130">
				      <template slot-scope="scope">
				      	<span v-if="scope.row.state==1" class="on">上线</span>
				      	<span v-else class="warning">下线</span>
				      </template>
				    </el-table-column>
				    <el-table-column
				      prop="origin"
				      label="品牌产地">
				    </el-table-column>
				    <!-- <el-table-column
				      prop="description"
				      label="品牌描述"
				      width="250">
				    </el-table-column>
				    <el-table-column
				      prop="story"
				      label="品牌历史"
				      width="250">
				    </el-table-column>
				    <el-table-column
				      prop="officialAddress"
				      label="品牌官方地址"
				      width="250">
				    </el-table-column>
				    <el-table-column
				      prop="officialUrl"
				      label="品牌官方网址"
				      width="200">
				    </el-table-column> -->
				    <el-table-column
				      v-if="itemdata"
				      fixed="right"
				      label="操作"
				      width="130">
				      <template slot-scope="scope">
				        <el-button @click="choose(scope.row)" type="danger" class="minbut" size="small">选择</el-button>
				      </template>
				    </el-table-column>
				    <el-table-column
				      v-else
				      fixed="right"
				      label="操作"
				      width="130">
				      <template slot-scope="scope">
				      	<div class="center mgb10">
				        <el-button @click="handleClick(scope.row)" type="primary" class="minbut" size="small">编辑</el-button>
				        </div>
				        <div v-if="scope.row.state==1" class="center">
				        <el-button @click="removeBrand(scope.row)" type="warning" class="minbut" size="small">下线</el-button>
				    	</div>
				      </template>
				    </el-table-column>
				 </el-table>
				</div>
		  	</div>
		  	<div class="minfoot">
		  		<el-pagination
			        background
			        page-size="20"
			        @current-change="pageChange"
			        :total="page.num"
			        layout="total, prev, pager, next, jumper">
		      	</el-pagination>
		  	</div>
  		</div>
  		<div v-else class="box2">
  			<el-scrollbar style="height:100%;">
  				<h1 v-if="addnew" class="title on">添加品牌</h1>
  				<h1 v-else class="title on">品牌编辑</h1>
  				<el-form ref="form" :model="form" style="width:60%;margin-left:20%;" label-width="120px">
					<el-form-item label="品牌中文名称">
						<el-input v-model="form.chineseName"></el-input>
					</el-form-item>
					<el-form-item label="品牌英文名称">
						<el-input v-model="form.englishName"></el-input>
					</el-form-item>
					<!-- <el-form-item label="品牌描述">
						<el-input type="textarea" v-model="form.description"></el-input>
					</el-form-item> -->
					<el-form-item label="品牌LOGO">
			          <div style="overflow: hidden">
			          <div class="avatardiv">
			            <input accept="image/*" ref="logoimg" @change="chooselogo" type="file" class="headimginp">
			            <img v-if="logoimg" :src="logoimg" class="avatar">
			            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
			          </div>
			          </div>
			          <p class="fs12 colccc mg-15">注:图片大小不得大于2M</p>
			        </el-form-item>
			        <el-form-item label="品牌产地">
						<el-input v-model="form.origin"></el-input>
					</el-form-item>
					<el-form-item label="品牌状态">
						<el-radio-group v-model="form.state">
						  <el-radio :label="1">上线</el-radio>
						  <el-radio :label="0">下线</el-radio>
						</el-radio-group>
					</el-form-item>
					<!-- <el-form-item label="品牌官方地址">
						<el-input v-model="form.officialAddress"></el-input>
					</el-form-item>
					<el-form-item label="品牌官方网址">
						<el-input v-model="form.officialUrl"></el-input>
					</el-form-item>
					<el-form-item label="品牌故事">
						<el-input type="textarea" v-model="form.story"></el-input>
					</el-form-item> -->
					<el-form-item>
						<el-button v-if="addnew" type="primary" @click="brandAdd" :loading="addloading">添加品牌</el-button>
						<el-button v-else @click="changeBrand" :loading="addloading" type="primary">保存编辑</el-button>
						<el-button @click="showBox1 = true">取消</el-button>
					</el-form-item>
				</el-form>
  			</el-scrollbar>
  		</div>
  	</transition>
  	<!-- 上传sku -->
    <el-dialog
      :title="upBrankType=='a'?'新增品牌':'修改品牌'"
      :visible.sync="showUpBrankData"
      width="30%"
      :before-close="handleClose">
      <span class="inpbox mgb10">
        <el-button size="small" type="primary">选择文件</el-button>
        <input class="inp" ref="mainimg" type="file" @change="filechange" name="">
      </span>
      <p v-if="file" class="fs12"><span class="mgr10">文件名:{{file.name}}</span><span>大小:{{file.fileSize}}</span></p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showUpBrankData = false">取 消</el-button>
        <el-button type="primary" :loading="upBrankFileLoading" @click="upSkuFileFun">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'choosebrand',
  props:['itemdata'],
  data () {
  	return {
  		upBrankFileLoading:false,
  		downBrankButLoading:false,
  		// 获取品牌列表的参数
  		getlistdata:{
  			pageIndex:1
  		},
  		page:{
  			num:''
  		},
  		showBox1:true,
  		addnew:true,
  		// 搜索的内容
  		searchData:{},
  		// logo
  		logoimg:'',
  		logofile:"",
  		imgarrfile:[],
  		// 表格加载
  		tableloading:false,
  		// 添加品牌loading
  		addloading:false,
  		// 品牌列表
  		brandList:'',
	    form:{
	    	bid:'',
	    	chineseName:'',
	    	englishName:'',
	    	// description:'',
	    	origin:'',
	    	state:1
	    	// officialAddress:'',
	    	// officialUrl:'',
	    	// story:''
	    },
	    showUpBrankData:false,
	    upBrankType:''
  	}
  },
  created () {
  	console.log('进入created',this.itemdata)
  	let that = this
  	that.getBrandList()
  },
  methods:{
  	filechange(){

  	},
  	showUpBrank(item){
  		this.showUpBrankData = true
  		this.upBrankType = item
  	},
  	downBrank(){
  		this.downBrankButLoading = true
		let downgoodsdata = {}
		for (let i in this.postData) {
			if(i!='pageIndex'){
			  downgoodsdata[i] = this.postData[i]
			}
		}
		console.log('导出商品',downgoodsdata)
		this.$api.downBrank(downgoodsdata).then(data=>{
			if (data.data) {
			  console.log('下载商品',data)
			  if(!!window.ActiveXObject || "ActiveXObject" in window) {
			    console.log('ie浏览器')
			    let blob = new Blob([data.data])
			    let fileName = '积纳有品品牌.xlsx'
			    navigator.msSaveBlob(blob, fileName)
			  } else {
			    let content = data.data
			    let elink = document.createElement('a');
			    let blob = new Blob([content]);
			    elink.download = "积纳有品品牌.xlsx";
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
			    message: '抱歉，导出品牌失败！',
			    type: 'error'
			  })
			}
			this.downBrankButLoading = false
		}).catch(data=>{
			console.log('catch',data)
			this.$message({
			  showClose: true,
			  message: '抱歉，导出品牌失败！',
			  type: 'error'
			})
			this.downBrankButLoading = false
		})
  	},
  	// 编辑品牌
  	handleClick(data){
  		this.showBox1=false
  		this.addnew=false
  		for (let i in this.form) {
  			this.form[i] = data[i]==null?"":data[i]
  		}
  		console.log(this.form)
  		this.logoimg = data.logoImgUrl
  	},
  	// 新增品牌
  	addNewBrand(){
  		this.showBox1=false
  		this.addnew=true
  	},
  	// 
  	pageChange(item){
  		this.getlistdata.pageIndex =item
  		this.getBrandList()
  	},
  	getBrandList () {
  		//获取品牌列表
  		let that = this
  		that.tableloading = true
  		that.$api.brandList(that.getlistdata,(data)=>{
	  		console.log('获取品牌列表')
	  		console.log(data)
	  		if (data.status==200) {
	  			if(data.data.res_code==1){
		  			that.brandList=data.data.result
		  			console.log(that.brandList)
		  		} else{
		  			that.brandList = ""
		  		}
		  		that.page.num = data.data.total
	  		} else {
	  			this.$message({
					showClose: true,
				  	message: '抱歉，品牌列表获取失败！',
				  	type: 'error'
				})
	  		}
	  		// 关闭
	  		that.tableloading = false
	  	})
  	},
  	// 关闭页面
  	closepage(){
  		this.$emit('closepage')
  	},
  	// 选择品牌
  	choose (item) {
       this.$emit("input", item)
       this.closepage()
  	},
  	// 多图上传
  	chooseBigImg(){
  		let that = this
  		let headimginp = that.$refs.imgarr.files[0]
  		that.imgarrfile.push(headimginp)
  		console.log(that.imgarrfile)
  	},
  	// 选择logo
  	chooselogo (data){
  		console.log('logo')
  		console.log(data)
  		let that = this
  		let headimginp = this.$refs.logoimg.files[0]
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
		that.logofile = headimginp
		reads.readAsDataURL(headimginp)
		reads.onload = function (e) {
			console.log(e)
			that.logoimg = e.target.result
		}
  	},
  	// 点击上传添加品牌
  	brandAdd () {
  		console.log('添加品牌')
  		let that = this
  		console.log(that.form)
  		// 创建虚拟表单
  		console.log('创建虚拟表单')
  		let formData = new FormData()
  		if(that.logofile){
  			formData.append('logoImg',that.logofile)
  		}
  		for(let i in that.form){
  			formData.append(i,that.form[i])
  		}
  		console.log(formData.get('chineseName'))
  		console.log(formData.get('logoImg'))
  		that.addloading = true
  		that.$api.brandAdd(formData,(data)=>{
  			console.log('返回添加品牌结果')
  			console.log(data)
  			that.addloading = false
  			if(data.data.res_code==1){
  				this.$message({
  				  showClose: true,
				  message: '恭喜，品牌添加成功！',
				  type: 'success'
				})
				that.clearAdd()
				that.getBrandList()
				that.showBox1 = true
  			}else{
  				this.$message({
  				  showClose: true,
				  message: '抱歉，品牌添加失败！',
				  type: 'error'
				})
  			}
  		})
  	},
  	// 保存编辑
  	changeBrand(){
  		console.log('保存编辑')
  		let that = this
  		// 创建虚拟表单
  		console.log('创建虚拟表单')
  		let formData = new FormData()
  		if(that.logofile){
  			formData.append('logoImg',that.logofile)
  		}
  		for(let i in that.form){
  			formData.append(i,that.form[i])
  		}
  		console.log(formData.get('chineseName'))
  		console.log(formData.get('logoImg'))
  		that.addloading = true
  		that.$api.brandUpdate(formData,(data)=>{
  			console.log('返回编辑品牌结果')
  			console.log(data)
  			that.addloading = false
  			if(data.data.res_code==1){
  				this.$message({
  				  showClose: true,
				  message: '恭喜，品牌编辑成功！',
				  type: 'success'
				})
				that.clearAdd()
				that.getBrandList()
				that.showBox1 = true
  			}else{
  				this.$message({
  				  showClose: true,
				  message: '抱歉，品牌编辑失败！',
				  type: 'error'
				})
  			}
  		})
  	},
  	// 删除品牌
  	removeBrand (data) {
  		console.log('删除品牌')
  		console.log(data)
  		let that = this
  		this.$confirm('此操作该品牌将下线, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.$api.brandDel({bid:data.bid},(res)=>{
          	console.log(res)
          	if(res.data.res_code==1){
          		that.getBrandList()
          		this.$message({
  				  showClose: true,
				  message: '恭喜，品牌下线成功！',
				  type: 'success'
				})
          	}else{
          		this.$message({
  				  showClose: true,
				  message: '抱歉，品牌下线失败！',
				  type: 'error'
				})
          	}
          })
        }).catch(() => {
          
        });
  	},
  	// 显示全部品牌
  	getBrandAll(){
  		console.log('显示全部品牌')
  		this.getlistdata = {pageIndex:1}
  		this.getBrandList()
  	},
  	// 搜索
  	search () {
  		console.log('搜索')
  		for(let i in this.searchData){
  			this.getlistdata[i] = this.searchData[i]
  		}
  		this.getlistdata.pageIndex = 1
  		this.getBrandList()
  	},
  	// 清空添加品牌的信息
  	clearAdd () {
  		console.log('清空添加的信息')
  		this.form = {
  			bid:'',
	    	chineseName:'',
	    	englishName:'',
	    	// description:'',
	    	origin:'',
	    	state:1,
	    	// officialAddress:'',
	    	// officialUrl:'',
	    	// story:''
	    }
	    this.logoimg=""
	    this.logofile=""
  	}
  }
}
</script>

<style type="text/css" scoped>
#brand{
	width: 100%;
	height: 100%;
	background-color: #fff;
}
.box1,.box2{
	width: 100%;
	height: 100%;
}
</style>
