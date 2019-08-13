<template>
  <div class="box">
    编辑秒杀
    <!-- <el-button @click="handleAddSure">确认</el-button> -->
    <el-button @click="handleEditSure">确认</el-button>
  </div>
</template>

<script>
export default {
  name: 'seckillEdit',
  data () {
    return {

    }
  },
  methods: {
    handleEditSure () {
      this.$emit('editSure')
    }
  }

}
</script>

<style scoped type="text/css">

</style>
