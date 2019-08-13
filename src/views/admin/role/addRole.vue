<template>
  <div id="adminList">
  	<el-scrollbar class="noxscroll" style="height: 100%">
	  	<h1 class="title on">新增角色</h1>
	    <el-form :model="myform" label-width="30%" style="padding: 10px">
	      <el-form-item label="角色昵称">
	        <el-input style="width: 65%" v-model="myform.crName"></el-input>
	      </el-form-item>
	      <!-- <el-form-item label="crState">
	        <el-input style="width: 65%" v-model="myform.crState"></el-input>
	      </el-form-item>
	      <el-form-item label="cmsType">
	        <el-input style="width: 65%" v-model="myform.cmsType"></el-input>
	      </el-form-item> -->
	      <el-form-item>
	        <el-button @click="addAuth" type="primary">新增角色</el-button>
	        <el-button @click="clearAll">清空</el-button>
	      </el-form-item>
	    </el-form>
	</el-scrollbar>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'adminRole',
  data () {
  	return {
  		myform: {
  			crName: '',
  			crState: '',
  			cmsType: ''
  		}
  	}
  },
  methods: {
  	addAuth () {
  		let that = this
  		console.log(that.myform)
  		let res = {}
  		for (let i in that.myform){
  			if(that.myform[i]){
  				res[i]=that.myform[i]
  			}
  		}
  		console.log(res)
  		that.$api.addRole(res,(data)=>{
  			console.log('新增角色')
  			console.log(data)
  			if(data.data.res_code==1){
  				that.$message({
		          message: '恭喜你，角色新增成功！',
		          showClose: true,
		          type: 'success'
		        })
		        that.myform={
					caName: '',
		  			crState: '',
		  			cmsType: ''
				}
  			} else {
  				that.$message({
		          message: data.data.message?data.data.message:'抱歉，角色添加失败！',
		          showClose: true,
		          type: 'error'
		        })
  			}
  		})
  	},
  	clearAll () {
  		this.myform={
			caName: '',
  			crState: '',
  			cmsType: ''
		}
		that.$message({
          message: '信息清除成功！',
          showClose: true,
          type: 'success'
        })
  	}
  }
}
</script>

<style type="text/css" scoped lang="scss">
#adminList{
	height: 100%;
	width: 100%;
	background-color: #fff;
	.title{
		padding-top: 30px;
		text-align: center;
		margin-bottom: 50px;
  	}
}
</style>
