<template>
  <div id="adminList">
  	<el-scrollbar class="noxscroll" style="height: 100%">
	  	<h1 class="title on">新增权限</h1>
	    <el-form :model="myform" label-width="30%" style="padding: 10px">
	      <el-form-item label="权限昵称">
	        <el-input style="width: 65%" v-model="myform.caName"></el-input>
	      </el-form-item>
	      <el-form-item label="上级权限ID">
	        <el-input style="width: 65%" v-model="myform.caParentId"></el-input>
	        <p class="fs12 colccc">注:一级权限caParentId为0</p>
	      </el-form-item>
	      <!-- <el-form-item label="caSort">
	        <el-input style="width: 65%" v-model="myform.caSort"></el-input>
	      </el-form-item> -->
	      <el-form-item label="权限路由">
	        <el-input style="width: 65%" v-model="myform.caUrl"></el-input>
	      </el-form-item>
	      <el-form-item>
	        <el-button @click="addAuth" type="primary">新增权限</el-button>
	        <el-button @click="clearAll">清空</el-button>
	      </el-form-item>
	    </el-form>
	</el-scrollbar>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'adminList',
  data () {
  	return {
  		caName: '权限一',
  		myform: {
  			caName: '',
  			caParentId: '',
  			caSort: '',
  			caUrl: ''
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
  		that.$api.addAuth(res,(data)=>{
  			console.log('新增权限')
  			console.log(data)
  			if(data.data.res_code==1){
  				that.$message({
		          message: '恭喜你，权限新增成功！',
		          showClose: true,
		          type: 'success'
		        })
		        that.myform={
					caName: '',
					caParentId: '',
					caSort: '',
					caUrl: ''
				}
  			} else {
  				that.$message({
		          message: '抱歉，权限添加失败！',
		          showClose: true,
		          type: 'error'
		        })
  			}
  		})
  	},
  	clearAll () {
  		this.myform={
			caName: '',
			caParentId: '',
			caSort: '',
			caUrl: ''
		}
		this.$message({
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
