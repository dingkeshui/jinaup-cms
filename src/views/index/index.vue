<template>
  <div class="box">
    <div class="topbox" :class="{bdheadershow:!$store.state.headerhidden}">
      <transition name="fade" mode="out-in">
        <div v-if="!$store.state.headerhidden">
          <bdheader></bdheader>
        </div>
        <el-tooltip v-else class="item" effect="dark" content="显示头部导航" placement="bottom">
          <div class="showheader" @click="showheader"></div>
        </el-tooltip>
      </transition>
    </div>
    <div style="position: relative;overflow: hidden;" class="flex1 flex">
      <div class="mainleft">
        <el-scrollbar class="noxscroll" style="height: 100%">
          <!-- <div> -->
          <bdleft></bdleft>
          <!-- </div> -->
        </el-scrollbar>
      </div>
      <div class="mainright">
        <transition>
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import bdheader from '../../components/head/bdheader'
import bdleft from '../../components/left/bdleft'

export default {
  name: 'index',
  components: {
    bdheader,
    bdleft
  },
  data() {
    return {
      title: 'this is index'
    }
  },
  methods: {
    showheader() {
      this.$store.commit('headerhidden', false)
    }
  }
}
</script>

<style type="text/css" scoped>
.box {
  width: 100%;
  height: 100%;
  display: flex;
  /*overflow: hidden;*/
  flex-direction: column;
}
.mainleft {
  width: 200px;
  height: auto;
  overflow-x: hidden;
  overflow-y: auto;
  border-right: 1px solid #ccc;
}
.main {
  flex: 1;
  display: flex;
}
.mainright {
  flex: 1;
  overflow: hidden;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}
.el-menu {
  border-right: 0px !important;
}
/*路由动画*/
.enter-enter {
  transform: translate3d(100%, 0, 0);
}

.enter-enter-active {
  transition: transform 0.3s ease;
}
.showheader {
  height: 5px;
  background-color: #409eff;
}
.topbox {
  height: 5px;
  transition: height 0.3s;
}
.bdheadershow {
  height: 80px;
}
</style>
