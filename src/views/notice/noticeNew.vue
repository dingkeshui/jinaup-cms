<template>
  <div id="noticebox">
    <h1 class="title on">发布公告</h1>
    <el-form label-width="30%" style="padding: 10px">
      <el-form-item label="公告标题">
        <el-input style="width: 65%" v-model="noticetitle"></el-input>
      </el-form-item>
      <el-form-item label="公告内容">
        <el-input style="width: 65%" resize="none" :autosize="{ minRows: 6, maxRows: 6}" type="textarea" v-model="noticemain"></el-input>
      </el-form-item>
      <el-form-item label="公告范围">
        <el-radio-group v-model="range">
          <el-radio label="1">全部</el-radio>
          <el-radio label="2">商家</el-radio>
          <el-radio label="3">用户</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="定时发布">
        <el-switch v-model="timing"></el-switch>
      </el-form-item>
      <el-form-item label="发布时间">
        <el-col class="col1">
          <el-date-picker type="date" value-format="yyyy-MM-dd" :disabled="!timing" placeholder="选择日期" v-model="date" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col style="width: 30%">
          <el-time-picker value-format="HH:mm:ss" :disabled="!timing" placeholder="选择时间" v-model="time" style="width: 100%;"></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button @click="pushnotice" type="primary">{{timing?"定时发布":"立即发布"}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'newnotice',
  data () {
    return {
      noticetitle: '',
      noticemain: '',
      range: '1',
      date: '',
      time: '',
      timing: false
    }
  },
  methods: {
    pushnotice () {
      // 点击了发布信息
      let that = this
      if (!that.noticemain) {
        this.$message({
          type: 'error',
          message: '请输入公告内容！',
          showClose: true
        })
        return
      }
      if (that.timing) {
        // 定时发布
        console.log('定时发布')
        if (!that.time || !that.date) {
          this.$message({
            type: 'error',
            message: '请选择日期与时间！',
            showClose: true
          })
          return
        }
        this.$confirm('确定在 ' + that.date + ' ' + that.time + ' 发布此公告?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '预定发布成功!',
            showClose: true
          })
        }).catch(() => {
          console.log('取消发布')
        })
      } else {
        // 现在发布
        console.log('现在发布')
        this.$confirm('确定立即发布此公告?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '发布成功!',
            showClose: true
          })
        }).catch(() => {
          console.log('取消发布')
        })
      }
    }
  }
}
</script>

<style type="text/css" lang="scss" scoped>
#noticebox{
  height: 100%;
  width: 100%;
  background-color: #fff;
  .title{
    padding-top: 30px;
    text-align: center;
    margin-bottom: 50px;
  }
  .col1{
    width: 30%;
    margin-right: 5%;
  }
}
</style>
