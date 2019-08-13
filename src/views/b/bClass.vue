<template>
	<div class="box flex2 bgfff">
		<div class="pad10 flex">
  			<div class="flex1">
  				<span class="fs14">
  					<span class="on">分类等级:</span>
  					<span class="colaaa hand" @click="changClass(-1)">一级分类</span>
  					<span class="colaaa hand" v-for="(item,index) in onClassArr" @click="changClass(index)">/{{item.cname}}</span>
  					<el-button size="mini" type="primary" @click="addClass">添加分类</el-button>
  				</span>
  				<el-input size="mini" placeholder="父类ID" clearable style="width:100px;" v-model="searchData.parentId"></el-input>
  				<el-input size="mini" placeholder="分类名称" clearable style="width:100px;" v-model="searchData.cname"></el-input>
  				<el-select size="mini" @change="searchBut" v-model="searchData.clevel" style="width:100px;" class="mgr5 mgb5" clearable placeholder="分类层级">
	              <el-option label="申请中" value="1"></el-option>
	              <el-option label="待打款" value="2"></el-option>
	              <el-option label="已打款" value="3"></el-option>
	            </el-select>
	            <el-select size="mini" @change="searchBut" v-model="searchData.state" style="width:100px;" class="mgr5 mgb5" clearable placeholder="分类状态">
	              <el-option label="下线" value="0"></el-option>
	              <el-option label="上线" value="1"></el-option>
	            </el-select>
  			</div>
  			<div class="flex flexcenter">
  				<el-button type="primary" @click="searchBut" size="mini" icon="el-icon-search">搜索</el-button>
	          	<!-- <el-button :loading="downOrderButLoading" type="primary" @click="downfile" size="mini" icon="el-icon-download">导出</el-button> -->
  			</div>
  		</div>
  		<div class="flex1" style="position:relative;">
  			<div class="tablebox">
  				<el-table
				:data="list"
				border
				stripe
				height="100%"
				style="width: 100%">
		        <el-table-column
		            prop="cid"
		            label="分类ID"
		            align="center"
		            width="80">
	            </el-table-column>
	            <el-table-column
		            prop="cname"
		            label="分类名称"
		            align="center"
		            min-width="120">
	            </el-table-column>
	            <el-table-column
		            prop="sortId"
		            label="分类排序"
		            align="center"
		            width="80">
	            </el-table-column>
	            <el-table-column
		            label="分类图片"
		            align="center"
		            width="100">
		            <template slot-scope="scope">
		            	<img class="img" :src="scope.row.imgUrl">
		            </template>
	            </el-table-column>
	            <el-table-column
		            prop="clevelStr"
		            label="级别"
		            align="center"
		            width="100">
	            </el-table-column>
	            <el-table-column
	            	v-if="onClassArr.length<2"
		            label="子分类"
		            align="center"
		            width="100">
		            <template slot-scope="scope">
		            	<el-button size="mini" type="primary" @click="lookNext(scope.row)">查看</el-button>
		            </template>
	            </el-table-column>
	            <el-table-column
		            label="状态"
		            align="center"
		            width="100">
		            <template slot-scope="scope">
		            	<el-tag size="small" type="primary" v-if="scope.row.state==1">上线中</el-tag>
		            	<el-tag size="small" type="danger" v-else>下线中</el-tag>
		            </template>
	            </el-table-column>
	            <el-table-column
		            fixed="right"
		            align="center"
		            width="100"
		            label="操作">
		            <template slot-scope="scope">
		              <div class="mgb5">
		              	<el-button type="primary" @click="changeClass(scope.row)" class="minbut" size="small">编辑</el-button>
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
    	<!-- 添加分类 -->
    	<el-dialog title="添加分类" :visible.sync="dialogFormVisible" label-width="100px">
    		<div class="flex mgb5" v-if="onClassArr.length">
    			<div class="w100px">上级分类</div>
    			<div class="flex1">
    				{{onClassArr[onClassArr.length-1].cname}}
    			</div>
    		</div>
    		<div class="flex mgb5">
    			<div class="w100px">分类等级</div>
    			<div class="flex1">
    				{{onClassArr.length+1}}
    			</div>
    		</div>
    		<div class="flex mgb5">
    			<div class="w100px">分类名称</div>
    			<div class="flex1">
    				<el-input v-model="form.cname"></el-input>
    			</div>
    		</div>
    		<div class="flex mgb5">
    			<div class="w100px">分类排序</div>
    			<div class="flex1">
    				<el-input type="number" v-model="form.sortId"></el-input>
    			</div>
    		</div>
    		<div class="flex mgb5">
    			<div class="w100px">分类图片</div>
    			<div class="flex1">
    				<div style="overflow: hidden">
				      	<div class="avatardiv">
				        	<input accept="image/*" ref="headimg" @change="chooseheadimg" type="file" class="headimginp">
				        	<img v-if="addImgUrl" :src="addImgUrl" class="avatar">
				        	<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				      	</div>
				      	</div>
				      	<p class="fs12 colccc">注:图片大小不得大于5M</p>
    			</div>
    		</div>
    		<div class="flex mgb5">
    			<div class="w100px">分类状态</div>
    			<div class="flex1">
    				<el-radio v-model="form.state" :label="1">上线</el-radio>
  					<el-radio v-model="form.state" :label="0">下线</el-radio>
    			</div>
    		</div>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisible = false">取 消</el-button>
		    <el-button :loading="addLoading" type="primary" @click="sureAddClass">确 定</el-button>
		  </div>
		</el-dialog>
		<!-- 修改分类 -->
    	<el-dialog title="修改分类" :visible.sync="dialogFormVisible2">
    		<div class="flex mgb5">
    			<div class="w100px">分类等级</div>
    			<div class="flex1">
    				{{onClass.clevelStr}}
    			</div>
    		</div>
    		<div class="flex mgb5">
    			<div class="w100px">分类名称</div>
    			<div class="flex1">
    				<el-input v-model="onClass.cname"></el-input>
    			</div>
    		</div>
    		<div class="flex mgb5">
    			<div class="w100px">分类排序</div>
    			<div class="flex1">
    				<el-input type="number" v-model="onClass.sortId"></el-input>
    			</div>
    		</div>
    		<div class="flex mgb5">
    			<div class="w100px">分类图片</div>
    			<div class="flex1">
    				<div style="overflow: hidden">
				      	<div class="avatardiv">
				        	<input accept="image/*" ref="headimg2" @change="chooseheadimg(2)" type="file" class="headimginp">
				        	<img v-if="changeImgUrl" :src="changeImgUrl" class="avatar">
				        	<img v-else-if="onClass.imgUrl" :src="onClass.imgUrl" class="avatar">
				        	<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				      	</div>
				      	</div>
				      	<p class="fs12 colccc">注:图片大小不得大于5M</p>
    			</div>
    		</div>
    		<div class="flex mgb5">
    			<div class="w100px">分类状态</div>
    			<div class="flex1">
    				<el-radio v-model="onClass.state" :label="1">上线</el-radio>
  					<el-radio v-model="onClass.state" :label="0">下线</el-radio>
    			</div>
    		</div>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisible2 = false">取 消</el-button>
		    <el-button type="primary" :loading="changeLoading" @click="sureChangeClass">确 定</el-button>
		  </div>
		</el-dialog>
  	</div>
</template>

<script type="text/javascript">
	export default {
		data () {
			return {
				page:{
					num:''
				},
				postData:{
					pageIndex:1
				},
				onClassArr:[],
				list:'',
				searchData:{},
				dialogFormVisible:false,
				dialogFormVisible2:false,
				form:{
					cname:'',
					clevel:'',
					parentId:'',
					sortId:'',
					state:''
				},
				// 添加分类选择的图片
				addImgUrl:'',
				addImgUrlFile:'',
				changeImgUrl:'',
				changeImgUrlFile:'',
				onClass:'',
				addLoading:false,
				changeLoading:false
			}
		},
		created () {
			this.getList()
		},
		methods:{
			// 修改分类
			changeClass (item) {
				this.dialogFormVisible2 = true
				this.onClass = JSON.parse(JSON.stringify(item))
				this.changeImgUrl = ''
			},
			// 确定修改class
			sureChangeClass () {
				console.log('修改分类',this.onClass)
				if(!this.onClass.cname){
					this.$message({
			            message: '昵称不能为空',
			            type: 'error'
			        })
			        return false
				}
				if(!this.onClass.sortId){
					this.$message({
			            message: '排序不能为空',
			            type: 'error'
			        })
			        return false
				}
				// if (!this.onClass.imgUrl&&!this.changeImgUrl) {
		  // 			this.$message({
			 //            message: '图片不能为空',
			 //            type: 'error'
			 //        })
			 //        return
		  // 		}
				let formdata = new FormData()
				if (this.changeImgUrl) {
					formdata.append('uploadImg',this.changeImgUrlFile)
				}
				formdata.append('cid',this.onClass.cid)
				formdata.append('cname',this.onClass.cname)
				formdata.append('sortId',this.onClass.sortId)
				formdata.append('state',this.onClass.state)
				this.changeLoading = true
				this.$api.bClassUp(formdata,res=>{
					this.changeLoading = false
					console.log('修改分类结果',res)
		  			if (res.data.res_code==1) {
		  				this.$message({
				            message: '修改成功',
				            type: 'success'
				        })
				        this.dialogFormVisible2 = false
				        this.getList()
		  			} else {
		  				this.$message({
				            message: res.data.message?res.data.message:'修改失败',
				            type: 'error'
				        })
		  			}
				})
			},
			chooseheadimg (item) {
	  		// 进入选择封面图片
		        console.log('enter choose head img')
		        let that = this
		        let headimginp 
		        if (item!=2) {
		        	headimginp = this.$refs.headimg.files[0]
		        }else{
		        	headimginp = this.$refs.headimg2.files[0]
		        }
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
		          	if (item!=2) {
			        	that.addImgUrl = e.target.result
			        	that.addImgUrlFile = headimginp
			        }else{
			        	that.changeImgUrl = e.target.result
			        	that.changeImgUrlFile = headimginp
			        }
		        }
		  	},
		  	// 确定添加分类
		  	sureAddClass () {
		  		if (!this.form.cname) {
		  			this.$message({
			            message: '昵称不能为空',
			            type: 'error'
			        })
			        return
		  		}
		  		if (!this.form.sortId) {
		  			this.$message({
			            message: '排序不能为空',
			            type: 'error'
			        })
			        return
		  		}
		  		// if (!this.addImgUrl) {
		  		// 	this.$message({
			   //          message: '图片不能为空',
			   //          type: 'error'
			   //      })
			   //      return
		  		// }
		  		console.log('form',this.form)
		  		let formdata = new FormData()
		  		for(let i in this.form){
		  			formdata.append(i,this.form[i])
		  		}
		  		if(this.addImgUrl){
		  			formdata.append('uploadImg',this.addImgUrlFile)
		  		}
		  		this.addLoading = true
		  		this.$api.bClassAdd(formdata,res=>{
		  			console.log('res',data)
		  			this.addLoading = false
		  			if (res.data.res_code==1) {
		  				this.$message({
				            message: '添加成功',
				            type: 'success'
				        })
				        this.dialogFormVisible = false
				        this.getList()
		  			} else {
		  				this.$message({
				            message: res.data.message?res.data.message:'操作失败',
				            type: 'error'
				        })
		  			}
		  		})
		  	},
			// 添加分类
			addClass(){
				this.dialogFormVisible = true
				this.form = {
					cname:'',
					clevel:this.onClassArr.length+1,
					parentId:this.onClassArr.length?this.onClassArr[this.onClassArr.length-1].cid:0,
					sortId:'',
					state:1
				}
				this.addImgUrl = ''
			},
			// 分类改变
			changClass (item) {
				this.onClassArr.splice(item+1,this.onClassArr.length-item-1)
				this.postData.pageIndex = 1
				this.getList()
			},
			// 查看下一集
			lookNext (item) {
				console.log('查看下一家',item)
				this.onClassArr.push(item)
				this.postData.pageIndex = 1
				this.getList()
			},
			pageChange(item){
		      this.postData.pageIndex = item
		      this.getList()
		    },
		    getList(){
		    	this.postData.clevel = this.onClassArr.length+1
		    	if(this.onClassArr.length){
		    		this.postData.parentId = this.onClassArr[this.onClassArr.length-1].cid
		    	}else{
		    		this.postData.parentId = 0
		    	}
		    	this.$api.bClassList(this.postData,(res)=>{
		    		console.log('获取分类列表',res)
		    		if (res.data.res_code==1) {
		    			this.list = res.data.result
		    			this.page.num = res.data.total
		    		} else {
		    			this.$message({
				            showClose: true,
				            message: res.data.message?res.data.message:'抱歉，获取列表失败！',
				            type: 'error'
				        })
		    		}
		    	})
		    },
		    searchBut(){
				for(let i in this.searchData){
					if(this.searchData[i]){
						this.postData[i] = this.searchData[i]
					}else{
						delete this.postData[i]
					}
				}
				this.postData.pageIndex = 1
				this.getList()
			},
		}
	}
</script>

<style type="text/css">
.img{
	max-width: 80px;
	max-height: 80px;
}
</style>