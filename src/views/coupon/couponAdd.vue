<template>
  <div id="couponAddbox">
  	<couponinfo></couponinfo>
  </div>
</template>

<script type="text/javascript">
import couponinfo from '@/components/coupon/couponInfo.vue'

export default {
  name: 'couponAdd',
  components:{
  	couponinfo
  },
  data () {
  	return {
  
  	}
  }
}
</script>

<style type="text/css" scoped lang="scss">
#couponAddbox{
	height: 100%;
	widows: 100%;
	background-color: #fff;
}
</style>
