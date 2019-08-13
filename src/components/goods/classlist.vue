<template>
<div class="classlist flex2">
	<div class="pad10 flex">
		<div class="flex1">
			<span class="on">分类等级：</span>
			<span class="mgr5"><el-tag class="hand" @click.native="clicktag(-1)">一级分类</el-tag></span>
			<span class="mgr5" v-for="(item,index) in onlist" :key="item.val"><el-tag class="hand" @click.native="clicktag(index)">{{item.name}}</el-tag></span>
			<template v-if="fromgoodsclass">
				<el-button v-if="onlist.length<3" @click="addclass" type="primary" size="small">添加子分类</el-button>
			</template>
		</div>
		<div>
			 <el-button v-if="!fromgoodsclass" type="primary" @click="closepage" size="small">取 消</el-button>
		</div>
	</div>
	<div class="flex1">
		<el-table
            :data="list"
            border
            stripe
            height="100%"
            style="min-width: 100%">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              type="index"
              label="排序"
              width="50">
            </el-table-column>
            <el-table-column
              prop="cname"
              label="分类昵称">
            </el-table-column>
            <el-table-column
              prop="cid"
              label="分类ID">
            </el-table-column>
            <el-table-column
              label="分类图片"
              width="120">
              <template slot-scope="scope">
              	<img class="img" :src="scope.row.imgUrl">
              </template>
            </el-table-column>
            <el-table-column
              v-if="onlist.length<2"
              label="子分类"
              width="120">
              <template slot-scope="scope">
                <el-button type="primary" @click="looknext(scope.row)" size="small">查看</el-button>
              </template>
            </el-table-column>
             <el-table-column
              prop="sortId"
              label="分类排序">
            </el-table-column>
            <el-table-column
              prop="clevel"
              label="分类等级">
            </el-table-column>
            <el-table-column
              prop="parentId"
              label="父级ID">
            </el-table-column>
            <el-table-column
              label="分类状态">
              <template slot-scope="scope">
              	<el-tag v-if="scope.row.state==1" type="success">上线中</el-tag>
              	<el-tag v-else type="danger">下线中</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              v-if="!fromgoodsclass"
              fixed="right"
              label="操作"
              width="120">
              <template slot-scope="scope">
                <el-button @click="choose(scope.row)" type="primary" size="small">选择</el-button>
              </template>
            </el-table-column>
            <el-table-column
              v-if="fromgoodsclass"
              fixed="right"
              label="操作"
              width="120">
              <template slot-scope="scope">
                <div class="mgb5"><el-button class="minbut" @click="changeclass(scope.row)" type="primary" size="small">编辑</el-button></div>
                 <div class="mgb5"  v-if="scope.row.state==1"><el-button class="minbut" @click="removeClass(scope.row)" type="warning" size="small">删除</el-button></div>
                <div v-if="onlist.length==2"><el-button class="minbut" @click="attribute(scope.row)" type="primary" size="small">属性编辑</el-button></div>
              </template>
            </el-table-column>
          </el-table>
	</div>
	<!-- 添加分类或者编辑的弹框 -->
	<el-dialog
	  :title="dialogdata.addnew?'添加分类':'编辑分类'"
	  :visible.sync="dialogVisible"
	  fullscreen="true"
	  :before-close="handleClose">
		  <el-form ref="form" size="small" :model="dialogdata.data" label-width="120px">
		  	<el-form-item label="分类名称">
			    <el-input v-model="dialogdata.data.cname"></el-input>
			</el-form-item>
			<el-form-item label="分类等级">
			    <span class="colaaa fs18">{{dialogdata.data.clevel}}</span>
			</el-form-item>
			<el-form-item v-if="dialogdata.data.parentName" label="父等级名">
			    <span class="colaaa fs18">{{dialogdata.data.parentName}}</span>
			</el-form-item>
			<el-form-item label="分类排序">
			    <el-input v-model="dialogdata.data.sortId"></el-input>
			    <p class="fs12 colaaa">注:小在前</p>
			</el-form-item>
			<el-form-item label="分类图片">
		        <div style="overflow: hidden">
			      	<div class="avatardiv">
			        	<input accept="image/*" ref="headimg" @change="chooseheadimg" type="file" class="headimginp">
			        	<img v-if="imgUrl" :src="imgUrl" class="avatar">
			        	<i v-else class="el-icon-plus avatar-uploader-icon"></i>
			      </div>
		      	</div>
		      	<p class="fs12 colccc mg-15">注:图片大小不得大于5M</p>
			</el-form-item>
			<el-form-item label="分类状态">
			    <el-radio v-model="dialogdata.data.state" label="1">上线</el-radio>
	  			<el-radio v-model="dialogdata.data.state" label="0">下线</el-radio>
			</el-form-item>
		  </el-form>
	  <span slot="footer" class="dialog-footer">
	    <el-button @click="dialogVisible = false">取 消</el-button>
	    <el-button v-if="dialogdata.addnew" type="primary" @click="addclassfun">确定添加</el-button>
	    <el-button v-else type="primary" @click="changeclassfun">保存编辑</el-button>
	  </span>
	</el-dialog>
	<!-- 编辑属性名 -->
	<el-dialog
	  title="编辑属性名"
	  :visible.sync="dialogVisible2"
	  fullscreen="true"
	  class="flexdialog"
	  :before-close="handleClose">
	  <div class="flex2" style="height:100%;">
	  	<div class="pad5">
	  		<el-button @click="addAttributeName" type="primary" size="small">添加属性名</el-button>
	  	</div>
	  	<div class="flex1">
	  		<el-table
            :data="attributelist"
            border
            stripe
            height="100%">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              type="index"
              label="排序"
              width="50">
            </el-table-column>
            <el-table-column
              prop="aname"
              label="属性名"
              width="120">
            </el-table-column>
            <el-table-column
              prop="aid"
              label="属性ID"
              width="100">
            </el-table-column>
            <el-table-column
              prop="sortId"
              label="属性排序"
              width="100">
            </el-table-column>
            <el-table-column
              label="属性值">
              <template slot-scope="scope">
              	<el-tag class="mgr5" v-for="item in scope.row.valueList" :key="item.name" size="mini" @close="closeTag(item)">{{item.vname}}</el-tag>
              	<!-- <el-button type="primary" size="small" @click="addAttributeVal(scope.row)" class="minbut">添加属性值</el-button> -->
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="120">
              <template slot-scope="scope">
              	<div class="mgb5"><el-button @click="changeAttributeName(scope.row)" size="small" type="primary">编辑</el-button></div>
              	<div><el-button @click="removeAttributeName(scope.row)" type="warning" size="small">删除</el-button></div>
              </template>
            </el-table-column>
        	</el-table>
	  	</div>
	  	<div class="pad10" style="text-align: right;">
	  		<el-button @click="dialogVisible2 = false">取消</el-button>
	  	</div>
	  </div>
	</el-dialog>
	<!-- 添加属性名 -->
	<el-dialog
	  :title="attributeName.addnew?'添加属性名':'编辑属性名'"
	  :visible.sync="dialogVisible3"
	  width="60%"
	  :before-close="handleClose">
		  <el-form ref="form" size="small" :model="attributeName.data" label-width="120px">
		  	<el-form-item label="属性名称">
			    <el-input v-model="attributeName.data.aname"></el-input>
			</el-form-item>
			<el-form-item label="属性排序">
			    <el-input v-model="attributeName.data.sortId"></el-input>
			</el-form-item>
			<el-form-item label="属性值传图">
				<el-radio v-model="attributeName.data.isImg" label="1">需要</el-radio>
	  			<el-radio v-model="attributeName.data.isImg" label="0">不需要</el-radio>
			</el-form-item>
		  </el-form>
	  <span slot="footer" class="dialog-footer">
	    <el-button @click="dialogVisible3 = false">取 消</el-button>
	    <el-button v-if="attributeName.addnew" type="primary" @click="addAttributeNameFun">确定添加</el-button>
	    <el-button v-else type="primary" @click="changeAttributeNameFun">保存编辑</el-button>
	  </span>
	</el-dialog>
	<!-- 添加属性值 -->
	<el-dialog
	  title="添加属性值"
	  :visible.sync="dialogVisible4"
	  width="60%"
	  :before-close="handleClose">
		  <el-form ref="form" size="small" :model="attributeVal" label-width="120px">
		  	<el-form-item label="属性值称">
			    <el-input v-model="attributeVal.vname"></el-input>
			</el-form-item>
			<el-form-item label="属性排序">
			    <el-input v-model="attributeVal.sortId"></el-input>
			</el-form-item>
		  </el-form>
	  <span slot="footer" class="dialog-footer">
	    <el-button @click="dialogVisible4 = false">取 消</el-button>
	    <el-button v-if="attributeName.addnew" type="primary" @click="addAttributeValFun">确定添加</el-button>
	  </span>
	</el-dialog>
</div>	
</template>

<script type="text/javascript">
export default{
	name:'classlist',
	// 有fromgoodsclass代表是商品分类进入
	props:['fromgoodsclass'],
	data(){
		return {
			list:'',
			// 选中的分类
			onlist:[],
			// 添加或者编辑分类的弹框
			dialogdata:{
				data:{},
				addnew:false
			},
			// 是否显示弹框
			dialogVisible:false,
			// 分类的图片链接
			imgUrl:"",
			// 分类的图片文本流
			imgFile:"",
			// 编辑属性名
			dialogVisible2:false,
			// 属性列表
			attributelist:'',
			// 选中的三级分类
			onclasslast:'',
			// 编辑属性名
			dialogVisible3:false,
			// 编辑属性值
			dialogVisible4:false,
			// 要添加或修改的基础属性名
			attributeName:{
				data:{},
				addnew:true
			},
			// 要添加或修改的基础属性值
			attributeVal:{}
		}
	},
	created(){
		this.getlist()
	},
	methods:{
		getlist(){
			let postdata
			if(this.onlist.length){
				postdata = {
					parentId:this.onlist[this.onlist.length-1].val
				}
			}else{
				postdata={
					parentId:0
				}
			}
			this.$api.categoryList(postdata,data=>{
				console.log(data)
				if (data.status==200) {
					if (data.data.res_code==1) {
						this.list = data.data.result
					} else {
						this.list = ""
					}
				} else {
					this.$message({
						showClose:true,
						message:'分类列表获取失败',
						type:'error'
					})
				}
			})
		},
		// 关闭属性值
		closeTag(item){
			console.log('关闭属性值')
			this.$api.baseAttrValueDel({vid:item.vid},data=>{
				console.log(data)
				if(data.data.res_code==1){
					this.$message({
						showClose:true,
						message:'属性删除成功',
						type:'success'
					})
					this.getAttriName()
				}else{
					this.$message({
						showClose:true,
						message:'属性删除失败',
						type:'error'
					})
				}
			})
		},
		// 添加属性值
		addAttributeVal(item){
			console.log('添加属性值',item)
			this.dialogVisible4 = true
			this.attributeVal = {
				aid:item.aid
			}
		},
		// 确定添加属性值
		addAttributeValFun(){
			console.log('确定添加属性值',this.attributeVal)
			this.$api.baseAttrValueAdd(this.attributeVal,data=>{
				console.log(data)
				if(data.data.res_code==1){
					this.$message({
						showClose:true,
						message:'属性值添加成功',
						type:'success'
					})
					this.dialogVisible4 = false
					this.getAttriName()
				}else{
					this.$message({
						showClose:true,
						message:'属性值添加失败',
						type:'error'
					})
				}
			})
		},
		// 编辑属性名
		attribute(item){
			this.onclasslast = item
			this.dialogVisible2 = true
			this.getAttriName()
		},
		// 获取属性名列表
		getAttriName(){
			this.$api.baseAttrNameAll({cid:this.onclasslast.cid},data=>{
				console.log(data)
				if(data.status==200){
					if (data.data.res_code==1) {
						this.attributelist = data.data.result
					}else{
						this.attributelist = ""
					}
				}else{
					this.$message({
						showClose:true,
						type:'error',
						message:'属性获取失败'
					})
				}
			})
		},
		// 编辑属性名
		changeAttributeName(item){
			this.dialogVisible3 = true
			this.attributeName.addnew = false
			this.attributeName.data={
				aid:item.aid,
				aname:item.aname,
				isImg:item.isImg+'',
				sortId:item.sortId
			}
		},
		// 确认编辑属性名
		changeAttributeNameFun(){
			console.log('确认编辑属性名',this.attributeName)
			this.$api.baseAttrNameUpdata(this.attributeName.data,data=>{
				console.log(data)
				if(data.data.res_code==1){
					this.$message({
						showClose:true,
						type:'success',
						message:'属性编辑成功'
					})
					this.dialogVisible3 = false
					this.getAttriName()
				}else{
					this.$message({
						showClose:true,
						type:'error',
						message:'属性编辑失败'
					})
				}
			})
		},
		// 添加属性名
		addAttributeName(){
			this.dialogVisible3 = true
			this.attributeName.addnew = true
			this.attributeName.data={
				cid:this.onclasslast.cid,
				isImg:'1'
			}
		},
		// 确认添加属性名
		addAttributeNameFun(){
			console.log('确认添加属性名',this.attributeName)
			this.$api.baseAttrNameAdd(this.attributeName.data,data=>{
				console.log(data)
				if(data.data.res_code==1){
					this.$message({
						showClose:true,
						type:'success',
						message:'属性添加成功'
					})
					this.dialogVisible3 = false
					this.getAttriName()
				}else{
					this.$message({
						showClose:true,
						type:'error',
						message:'属性添加失败'
					})
				}
			})
		},
		// 删除属性名
		removeAttributeName(item){
			console.log('删除属性名',item)
			this.$confirm('确定将 '+item.aname+' 属性删除?','提示',{
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(async () => {
	          	this.$api.baseAttrNameDel({aid:item.aid},data=>{
					console.log(data)
					if(data.data.res_code==1){
						this.$message({
							showClose:true,
							message:'删除成功',
							type:'success'
						})
						this.getAttriName()
					}else{
						this.$message({
							showClose:true,
							message:'删除失败',
							type:'error'
						})
					}
				})
	        }).catch(() => {
	          console.log('点击了取消')
	        })
		},
		// 添加分类
		addclass () {
			console.log('添加分类')
			if(this.onlist.length){
				let arr = this.onlist[this.onlist.length-1]
				this.dialogdata.data={
					parentId:arr.val,
					clevel:this.onlist.length+1,
					state:'1',
					parentName:arr.name
				}
			}else{
				this.dialogdata.data={
					parentId:0,
					clevel:1,
					state:'1'
				}
			}
			this.imgFile = ""
			this.imgUrl = ""
			this.dialogVisible = true
			this.dialogdata.addnew = true
		},
		// 编辑分类
		changeclass(item){
			this.dialogVisible = true
			this.dialogdata.addnew = false
			this.imgFile = ""
			this.imgUrl = item.imgUrl
			this.dialogdata.data={
				cid:item.cid,
				parentId:item.parentId,
				clevel:item.clevel,
				state:item.state+'',
				sortId:item.sortId,
				cname:item.cname,
				parentName:this.onlist.length?this.onlist[this.onlist.length-1].name:'顶层分类'
			}
		},
		// 确定编辑
		changeclassfun(){
			console.log('确定编辑',this.dialogdata)
			let fromdata = new FormData()
			delete this.dialogdata.data.parentName
			for (let i in this.dialogdata.data) {
				fromdata.append(i,this.dialogdata.data[i])
			}
			if (this.imgFile) {
				fromdata.append('categoryImg',this.imgFile)
			}
			this.$api.categoryUpdata(fromdata,true,data=>{
				console.log(data)
				if(data.data.res_code==1){
					this.$message({
						showClose:true,
						message:'编辑成功',
						type:'success'
					})
					this.dialogVisible = false
					this.getlist()
				}else{
					this.$message({
						showClose:true,
						message:'编辑失败',
						type:'error'
					})
				}
			})
		},
		// 分类下线
		removeClass(item){
			this.$confirm('确定将 '+item.cname+' 分类下线?','提示',{
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(async () => {
	          	this.$api.categoryDel({cid:item.cid},data=>{
					console.log(data)
					if(data.data.res_code==1){
						this.$message({
							showClose:true,
							message:'编辑成功',
							type:'success'
						})
						this.getlist()
					}else{
						this.$message({
							showClose:true,
							message:'编辑失败',
							type:'error'
						})
					}
				})
	        }).catch(() => {
	          console.log('点击了取消')
	        })
		},
		// 确定添加
		addclassfun () {
			console.log('添加分类',this.dialogdata)
			let fromdata = new FormData()
			delete this.dialogdata.data.parentName
			for (let i in this.dialogdata.data) {
				fromdata.append(i,this.dialogdata.data[i])
			}
			fromdata.append('categoryImg',this.imgFile)
			this.$api.categoryAdd(fromdata,data=>{
				console.log(data)
				if(data.data.res_code==1){
					this.$message({
						showClose:true,
						message:'添加成功',
						type:'success'
					})
					this.dialogVisible = false
					this.getlist()
				}else{
					this.$message({
						showClose:true,
						message:'添加失败',
						type:'error'
					})
				}
			})
		},
		chooseheadimg () {
  		// 进入选择封面图片
	        console.log('enter choose head img')
	        let that = this
	        let headimginp = this.$refs.headimg.files[0]
	        console.log(headimginp)
	        let isLt2M = headimginp.size / 1024 / 1024 < 5
	        console.log(isLt2M)
	        if (!isLt2M) {
	          this.$message({
	            message: '注意，图片大小不得大于5M',
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
		// 选择
		choose (item) {
			console.log('子页面选择',item)
			this.$emit('input',item)
			this.closepage()
		},
		clicktag(item){
			console.log(item)
			this.onlist = this.onlist.slice(0,item+1)
			console.log('onlist',this.onlist)
			this.getlist()
		},
		closepage(){
			this.$emit('closepage')
		},
		looknext (item) {
			console.log('查看子分类',item)
			this.onlist.push({
				name:item.cname,
				val:item.cid
			})
			this.getlist()
		}
	}
}
	
</script>

<style type="text/css">
.classlist{
	width: 100%;
	height: 100%;
}
.img{
	max-width: 80px;
	max-height: 80px;
}
</style>
