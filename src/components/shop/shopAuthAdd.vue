<template>
	<div id="specialInfo">
		<el-scrollbar class="noxscroll" style="height: 100%">
		  	<h1 v-if="pagedata" class="title on">编辑权限</h1>
		  	<h1 v-else class="title on">添加权限</h1>
		    <el-form :model="myform" label-width="120" style="width:60%;margin-left:20%;">
		      <el-form-item label="权限昵称">
		        <el-input placeholder="权限昵称" v-model="myform.caName"></el-input>
		      </el-form-item>
		      <el-form-item label="权限URL">
		        <el-input placeholder="权限URL" v-model="myform.caUrl"></el-input>
		      </el-form-item>
		      <el-form-item label="权限cmsType">
		        <el-input placeholder="权限cmsType" v-model="myform.cmsType"></el-input>
		      </el-form-item>
		      <el-form-item label="caParentId">
		        <el-input placeholder="caParentId" v-model="myform.caParentId"></el-input>
		      </el-form-item>
		      <el-form-item label="caSort">
		        <el-input placeholder="caSort" v-model="myform.caSort"></el-input>
		      </el-form-item>
		      <el-form-item label="isExistUrl">
		        <el-input placeholder="isExistUrl" v-model="myform.isExistUrl"></el-input>
		      </el-form-item>
		      <el-form-item>
	            <el-button v-if="!pagedata" type="primary" @click="add">立即创建</el-button>
	            <el-button v-else type="primary" @click="change">保存编辑</el-button>
	            <el-button @click="closePage" plain>取消</el-button>
		      </el-form-item>
		    </el-form>
		</el-scrollbar>
	</div>
</template>

<script type="text/javascript">
export default {
  name: 'shopAuthAdd',
  props:["pagedata"],
  data () {
    return {
    	myform:{}
    }
  },
  methods:{
  	add(){
  		console.log(this.myform)
  		this.$api.supAuthAdd(this.myform,data=>{
  			console.log(data)
  			if(data.data.res_code==1){
  				this.$message({
  					showClose:true,
  					type:'success',
  					message:'添加成功'
  				})
  				this.closePage('new')
  			}else{
  				this.$message({
  					showClose:true,
  					type:'error',
  					message:'添加失败'
  				})
  			}
  		})
  	},
  	change () {
  		console.log('修改',this.myform)
  		this.$api.supAuthUpdate(this.myform,data=>{
  			console.log(data)
  			if(data.data.res_code==1){
  				this.$message({
  					showClose:true,
  					type:'success',
  					message:'修改成功'
  				})
  				this.closePage('new')
  			}else{
  				this.$message({
  					showClose:true,
  					type:'error',
  					message:'修改失败'
  				})
  			}
  		})
  	},
  	closePage(item){
  		this.$emit('closepage',item)
  	}
  },
  created () {
  	if(this.pagedata){
  		delete this.pagedata.createTime
  		delete this.pagedata.updateTime
  		for (let i in this.pagedata) {
  			this.myform[i] = this.pagedata[i]
  		}
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
</style>
