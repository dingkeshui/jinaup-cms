<template>
  <div id="noauthbox">
  	<img class="logoimg" src="../../assets/logo.jpg">
  	<p class="colaaa">抱歉，您暂无权限，请联系管理员</p>
  	<p><i class="el-icon-phone mgr5"></i><span>{{$store.state.adminTel}}</span></p>
  	<p class="mgt40"><el-button icon="el-icon-back" @click="back" circle></el-button></p>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'noauth',
  data () {
  	return {

  	}
  },
  methods: {
  	back () {
  		this.$router.push({ path: '/login' })
  	}
  }
}
</script>

<style type="text/css" scoped>
#noauthbox{
	height: 100%;
	width: 100%;
	background-color: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
}
.logoimg{
	height: 100px;
	border-radius: 5px;
	margin-bottom: 20px;
}
p{
	line-height: 50px;
}

</style>
