<template>
  <div class="box flex2">
  		<div class="flex">
  			<div class="flex1 flexvcenter">
  				<div class="pad10">
  					<el-select v-model="classon.one" size="small" @change="classChange('a')" placeholder="请选择一级分类">
					    <el-option
					      v-for="item in list.classone"
					      :key="item.cid"
					      :label="item.cname"
					      :value="item.cid">
					    </el-option>
					</el-select>
  				</div>
  				<div class="pad10">
  					<el-select v-model="classon.two" size="small" @change="classChange('b')" placeholder="请选择二级分类">
					    <el-option
					      v-for="item in list.classtwo"
					      :key="item.cid"
					      :label="item.cname"
					      :value="item.cid">
					    </el-option>
					</el-select>
  				</div>
  				<!-- <div class="pad10">
  					<el-select v-model="classon.three" size="small" @change="classChange('c')" placeholder="请选择三级分类">
					    <el-option
					      v-for="item in list.classthree"
					      :key="item.cid"
					      :label="item.cname"
					      :value="item.cid">
					    </el-option>
					</el-select>
  				</div> -->
  			</div>
  			<div class="flex flexcenter">
  			</div>
  		</div>
  		<div class="flex1" style="position:relative;">
        <div class="tablebox">
  			<el-table
	          :data="list.classthree"
	          border
	          stripe
	          height="100%"
	          style="width: 100%">
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
	            prop="baseProductTaxVo.productVat"
	            label="产品增值税">
	          </el-table-column>
	           <el-table-column
	            prop="baseProductTaxVo.productSaleTax"
	            label="产品消费税">
	          </el-table-column>
	          <el-table-column
	            fixed="right"
	            label="操作"
	            width="100">
	            <template slot-scope="scope">
	              <div v-if="scope.row.baseProductTaxVo"><el-button type="warning" @click="changeTax(scope.row)" size="small">修改</el-button></div>
	              <div v-else><el-button type="primary" @click="addTax(scope.row)" size="small">添加</el-button></div>
	            </template>
	          </el-table-column>
	        </el-table>
        </div>
  		</div>
  		<el-dialog
		  :title="addnew?'添加税率':'修改税率'"
		  :visible.sync="dialogVisible"
		  width="50%">
		  <div class="flex mgb10 flexvcenter">
		  	<span class="colaaa" style="width:100px;">分类名称</span>
		  	<span>{{form.cname}}</span>
		  </div>
		  <div class="flex mgb10 flexvcenter">
		  	<span class="colaaa" style="width:100px;">产品增值税</span>
		  	<el-input v-model="form.productVat" placeholder="请输入产品增值税"></el-input>
		  </div>
		  <div class="flex mgb10 flexvcenter">
		  	<span class="colaaa" style="width:100px;">产品消费税</span>
		  	<el-input v-model="form.productSaleTax" placeholder="请输入产品消费税"></el-input>
		  </div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button v-if="addnew" type="primary" @click="addnewfun">添 加</el-button>
		    <el-button v-else type="primary" @click="changefun">保 存</el-button>
		  </span>
		</el-dialog>
  </div>
</template>

<script type="text/javascript">

export default {
  name: 'productTax',
  data () {
  	return {
  		postData:{
  			parentId:0,
  		},
  		dialogVisible:false,
  		// 添加税率还是修改税率
  		addnew:true,
  		// 分类数组
  		list:{
  			classone:"",
  			classtwo:"",
  			classthree:""
  		},
  		// 选中的前三级分类
  		classon:{
  			one:'',
  			two:''
  		},
  		form:{
  			cid:'',
  			productVat:'',
  			productSaleTax:'',
  			cname:''
  		}
  	}
  },
  created(){
  	this.getList('classone')
  },
  methods:{
  	getList (item) {
  		console.log('获取分类列表')
  		let that = this
  		console.log(that.postData)
  		that.$api.categoryList(that.postData,(res)=>{
  			console.log(res)
  			if(res.status!=200){
  				this.$message({
			      showClose: true,
			      message: '抱歉，数据获取失败！',
			      type: 'error'
			    })
  			}else{
  				if(res.data.res_code==1){
	  				that.list[item] = res.data.result
	  				console.log(that.list)
  				} else {
  					that.list[item] = ""
  				}
  			}
  		})
  	},
  	// 选择分类
  	classChange (item) {
  		console.log('选择分类')
  		console.log(item)
  		let that = this
  		if (item == 'a') {
  			that.postData.parentId = that.classon.one
  			that.classon.two = ""
  			that.getList('classtwo')
  		} else if (item == 'b') {
  			that.postData.parentId = that.classon.two
  			that.getList('classthree')
  		}
  	},
  	// 添加税率
  	addTax (item) {
  		console.log('添加税率')
  		let that = this
  		that.form = {
  			cid:item.cid,
  			productVat:'',
  			productSaleTax:'',
  			cname:item.cname
  		}
  		that.dialogVisible = true
  		that.addnew = true
  	},
  	// 添加税率确认
  	addnewfun () {
  		console.log('确认税率添加')
  		let that = this
  		that.$api.productTaxAdd(that.form,(data)=>{
  			console.log(data)
  			if(data.data.res_code==1){
  				that.$message({
  					showClose:true,
  					message:'添加成功',
  					type:'success'
  				})
  				that.dialogVisible = false
  				that.getList('classthree')
  			}else{
  				that.$message({
  					showClose:true,
  					message:'添加失败',
  					type:'error'
  				})
  			}
  		})
  	},
  	// 修改税率
  	changeTax (data) {
  		console.log('修改税率')
  		console.log(data)
  		let that = this
  		that.form={
  			cid:data.cid,
  			productVat:data.baseProductTaxVo.productVat,
  			productSaleTax:data.baseProductTaxVo.productSaleTax,
  			cname:data.cname
  		}
  		that.dialogVisible = true
  		that.addnew = false
  	},
  	// 确认保存修改
  	changefun () {
  		console.log('确认保存修改')
  		let that = this
  		console.log(that.form)
  		that.$api.productTaxUpdata(that.form,(data)=>{
  			console.log(data)
  			if(data.data.res_code==1){
  				that.$message({
  					showClose:true,
  					message:'修改成功',
  					type:'success'
  				})
  				that.getList('classthree')
  				that.dialogVisible =false
  			} else {
  				that.$message({
  					showClose:true,
  					message:'修改失败',
  					type:'error'
  				})
  			}
  		})
  	}
  }
}
</script>

<style type="text/css" scoped>
.box{
	width: 100%;
	height: 100%;
	background-color: #fff;
}
.w100{
	width: 100%;
}
</style>
