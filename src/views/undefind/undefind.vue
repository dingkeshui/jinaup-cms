<template>
  <div id="undefindbox">
  	<img src="../../assets/logo.jpg">
  	<span class="colaaa">页面走丢了~</span>
  	<i @click="back" class="hand el-icon-back"></i>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'undefindpage',
  methods:{
  	back () {
  		this.$router.go(-1)
  	}
  }
}
</script>

<style type="text/css" scoped>
#undefindbox{
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
}
img{
	height: 100px;
	border-radius: 5px;
	margin-bottom: 30px;
}
i{
	font-size: 24px;
	margin-top: 20px;
	color: #aaa;
	border-radius: 50%;
	border:1px solid #aaa;
	padding: 6px;
}
</style>
