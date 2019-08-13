<template>
  <div id="homebox">
    <!-- <el-row class="hometop">
      <el-col class="br1" :span="8">
        <div  @click="clickdiv(0)" class="grid-content bg-purple">
          <div class="topnum"><span>{{text[0]}}</span></div>
          <div>今日访问量(人次)</div>
        </div>
      </el-col>
      <el-col :span="8" class="br1">
        <div  @click="clickdiv(1)" class="grid-content bg-purple-light">
          <div class="topnum"><span>{{text[1]}}</span></div>
          <div>今日流水(元)</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div  @click="clickdiv(2)" class="grid-content bg-purple">
          <div class="topnum"><span>{{text[2]}}</span></div>
          <div>今日下单数(个)</div>
        </div>
      </el-col>
    </el-row>
    <div class=""><el-button @click="getnew">刷新数据</el-button></div>-->
    <mynull></mynull>
  </div>
</template>

<script type="text/javascript">
import mynull from '../../components/null/null.vue'
import Vue from 'vue'

export default {
  name: 'home',
  components: {
    mynull
  },
  data() {
    return {
      text: [1, 0, 3]
    }
  },
  methods: {
    changenum(newnum1, index) {
      // 数字改变动画
      let that = this
      // 改变后的最终值*100
      let newnum = parseInt(newnum1 * 1 * 100)
      // 获取差值*100
      let neednum = newnum - that.text[index] * 1 * 100
      console.log(neednum, newnum, that.text[index] * 1)
      // 假设变换的总时间为500毫秒，变换次数为50次，每隔10毫秒变换一次
      let num
      if (neednum >= 5000) {
        // 获取每次改变的数值
        num = parseInt(neednum / 50)
      } else {
        num = 100
      }
      let fun = setInterval(() => {
        let nextnum = that.text[index] * 1 * 100 + num
        if (nextnum > newnum) {
          Vue.set(
            that.text,
            index,
            index == 1 ? (newnum / 100).toFixed(2) : parseInt(newnum / 100)
          )
          clearInterval(fun)
        } else {
          Vue.set(
            that.text,
            index,
            index == 1 ? (nextnum / 100).toFixed(2) : parseInt(nextnum / 100)
          )
        }
      }, 10)
    },
    getnew() {
      // 刷新页面
      console.log('click get new')
      let oldnew = this.text
      for (let i in oldnew) {
        let newnum = oldnew[i] * 1 + Math.random() * 100
        this.changenum(newnum, i)
      }
    }
  },
  mounted() {
    console.log('home.vue dome ok')
    this.getnew()
  }
}
</script>

<style type="text/css" lang="scss" scoped>
#homebox {
  height: 100%;
  width: 100%;
  background-color: #fff;
  .hometop {
    padding: 20px 10px;
    text-align: center;
    .topnum {
      height: 100px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      // display: table-cell;
      // vertical-align: middle;
      // text-align: center;
      // width: 0.1%;
      font-size: 50px;
    }
    .br1 {
      border-right: 1px solid #ccc;
    }
  }
}
</style>
