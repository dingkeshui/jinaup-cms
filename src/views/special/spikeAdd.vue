<template>
  <div id="adminList">
  	<spikeInfo></spikeInfo>
  </div>
</template>

<script type="text/javascript">
import spikeInfo from '../../components/spike/spike'

export default {
  name: 'adminList',
  components:{
	spikeInfo
  },
  data () {
  	return {
  		
  	}
  },
  methods: {
  	
  }
}
</script>

<style type="text/css" scoped lang="scss">
#adminList{
	height: 100%;
	width: 100%;
	background-color: #fff;
}
</style>
