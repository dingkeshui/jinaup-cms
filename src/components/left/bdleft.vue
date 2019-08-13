<template>
<el-row class="tac" id="bdleftbox">
  <el-col>
    <el-menu
      :default-active="defaultval"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#EBF1F6"
      text-color="#2c3e50"
      unique-opened
      router
      active-text-color="#409EFF">
      <template v-for="(item,index) in routerlsit">
        <el-menu-item v-if="item.path=='/'" index="/home">
          <i class="el-icon-menu"></i>
          <span slot="title">后台首页</span>
          <i class="el-submenu__icon-arrow el-icon-arrow-down before604"></i>
        </el-menu-item>
        <template v-else>
          <el-submenu v-if="item.path!='*'" :index="item.path">
            <template slot="title">
              <i :class="item.meta.icon"></i>
              <span>{{item.meta.name}}</span>
            </template>
              <el-menu-item v-for="item2 in item.children" :key="item2.path" :index="item2.path">{{item2.meta.name}}</el-menu-item>
          </el-submenu>
        </template>
      </template>
    </el-menu>
  </el-col>
</el-row>
</template>

<script>
export default {
  name: 'bdleft',
  data () {
    return {
      defaultval: '/home',
      routerlsit:''
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  },
  mounted () {
    this.defaultval=this.$route.path
    console.log(this.$route.path)
    console.log('routerlsit',this.$store.state.leftRouter)
    this.routerlsit = this.$store.state.leftRouter
  }
}
</script>

<style type="text/css" scoped>
  .el-menu-item.is-active{
    background-color: #fff !important;
  }
  .el-menu-item::hover{
    background-color: #fff !important;
    color: #409EFF !important;
  }
  #bdleftbox{
    width: 100%;
  }
  .before604:before{
    content: "\E604" !important;
  }
</style>
