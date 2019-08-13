<template>
  <div>
  <div id="bd-header">
    <div class="logobox">
      <img class="logoimg" src="../../assets/logo.jpg">
    </div>
    <div class="headerright">
      <div class="header-left"></div>
      <div class="header-right">
        <!-- <el-tooltip class="item" effect="dark" content="搜索页面" placement="top-start">
          <div class="icon hand">
            <img src="../../assets/icon/search.png">
          </div>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="消息提示" placement="top-start">
          <div class="icon hand">
            <img src="../../assets/icon/news.png">
          </div>
        </el-tooltip> -->
        <el-tooltip class="item" effect="dark" placement="top-start">
          <div slot="content">
            使用帮助<br/>
            1.产品为cms后台上传产品标准库的产品<br/>
            2.商品为供货商或商家上传的商品<br/>
            3.目前只能上传产品，不能上传商品
          </div>
          <div class="icon hand">
            <i class="el-icon-question"></i>
          </div>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="联系我们" placement="top-start">
          <div class="icon hand" @click="contactus = true">
            <i class="el-icon-service"></i>
          </div>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="隐藏头部导航" placement="top-start">
          <div class="icon hand" @click="hidentop">
            <i class="el-icon-caret-top"></i>
          </div>
        </el-tooltip>
        <img class="haedimgbox mgr5 hand" 
        :src="headimgurl">
        <el-dropdown class="hand" @command="myinfo">
          <span class="el-dropdown-link">
            {{nickname}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">退出账号</el-dropdown-item>
            <el-dropdown-item command="b">个人中心</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <el-dialog
      title="积纳有品"
      :visible.sync="signout"
      width="30%">
      <span>您确定要退出该账号么？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="signout = false">取 消</el-button>
        <el-button type="primary" @click="signoutfun">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="个人中心"
      :visible.sync="mycenter"
      width="30%"
      class="mycenterbox">
      <div><span>昵称</span>{{nickname}}</div>
      <div><span>头像</span><img :src="headimgurl"></div>
      <div><span>权限</span>{{power}}</div>
      <div><span>联系我们</span><i class="el-icon-phone mgr5"></i>{{$store.state.adminTel}}</div>
    </el-dialog>
    <el-dialog
      title="联系我们"
      :visible.sync="contactus"
      width="30%"
      class="mycenterbox">
      <div><span>TEL<i class="el-icon-phone mgr5"></i></span>{{$store.state.adminTel}}</div>
    </el-dialog>
  </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'bdheader',
  data () {
    return {
      nickname: '管理员',
      power: '管理员',
      headimgurl: '../../assets/logo.jpg',
      signout: false,
      mycenter: false,
      contactus: false
    }
  },
  methods: {
    signoutfun () {
      console.log('点击退出')
      this.$api.loginOut((data)=>{
        console.log('退出账号')
        console.log(data)
        if (data.data.res_code==1) {
          console.log('ook')
          sessionStorage.removeItem('CmsTrackID')
          this.$store.commit('goout')
          this.$router.push({ path: '/login' })
        }
      })
    },
    myinfo (command) {
      console.log('click command =' + command)
      let that = this
      switch (command) {
        case 'a':
          console.log('点击了退出')
          that.signout = true
          break
        case 'b':
          console.log('click enter my center')
          that.mycenter = true
      }
    },
    hidentop () {
      // 隐藏头部导航
      console.log('click hidden header')
      this.$store.commit('headerhidden', true)
    }
  },
  created () {
    console.log('进入created')
    console.log(this.$store)
    let that = this
    if (this.$store.state.userInfo.headimgurl) {
      console.log('imgurl==')
      console.log(this.$store.state.userInfo.headimgurl)
      this.headimgurl = this.$store.state.userInfo.headimgurl
    }
    if (this.$store.state.userInfo.nickname) {
      this.nickname = this.$store.state.userInfo.nickname
    }
  }
}
</script>

<style type="text/css" scoped>
  #bd-header {
    height: 80px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
  }
  .logobox {
    height: 100%;
    box-sizing: border-box;
    width: 200px;
    display: flex;
    padding:5px 10px;
    align-items: center;
    justify-content: center;
  }
  .logoimg {
    height: 100%;
  }
  .headerright{
    flex: 1;
    display: flex;
    height: 100%;
    align-items: center;
    padding: 0px 10px;
  }
  .header-left{
    flex: 1;
  }
  .header-right{
    display: flex;
    align-items: center;
  }
  .haedimgbox{
    margin-left: 10px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .mycenterbox div{
    display: flex;
    width: 100%;
    padding: 10px;
    align-items: center;
    /*justify-content: center;*/
    box-sizing: border-box;
    color: #aaa;
  }
  .mycenterbox span{
    padding: 0px 20px;
    display: inline-block;
    width: 80px;
  }
  .mycenterbox img{
    height: 50px;
    border-radius: 50%;
  }
  .icon{
    padding: 10px 10px;
    border-radius: 5px;
  }
  .icon:hover{
    background-color: #fff;
  }
  .icon img{
    width: 30px;
    height: 30px;
  }
  .icon i{
    font-size: 30px;
  }
</style>
