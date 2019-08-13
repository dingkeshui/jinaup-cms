<template>
  <div id="goodsClass">
    <classlist fromgoodsclass="true"></classlist>
  </div>
</template>

<script type="text/javascript">
import Vue from 'vue'
import classlist from '@/components/goods/classlist.vue'

export default {
  name: 'goodsClass',
  components:{
    classlist
  },
  data () {
  	return {
  		
  	}
  },
  methods:{
  },
  created () {
  }
}
</script>

<style type="text/css" scoped>
#goodsClass{
	height: 100%;
	width: 1005;
	background-color: #fff;
}
</style>
