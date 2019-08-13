<template>
	<div id="userList">
		<supplierlist chooseitem=""></supplierlist>
	</div>
</template>

<script type="text/javascript">
import supplierlist from '@/components/supplier/supplierslist.vue'

export default {
  name: 'supplier',
  components:{
    supplierlist
  },
  data () {
    return {
      
    }
  },
  created () {
  },
  methods: {
  	
  }
}
</script>

<style type="text/css" scoped>
#userList{
	height: 100%;
	width: 100%;
	background-color: #fff;
}
</style>
