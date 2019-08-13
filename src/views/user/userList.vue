<template>
	<div id="userList">
		<user></user>
	</div>
</template>

<script type="text/javascript">
import user from '@/components/user/userlist.vue'

export default {
  name: 'userList',
  components:{
  	user
  },
  data () {
    return {
    	
    }
  },
  created(){
  	
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
