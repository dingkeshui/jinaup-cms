<template>
  <div class="login">
    <div class="loginmain">
      <div class="loginbox">
        <!-- <h1 class="loginTitle on"><p class="font">积纳有品</p></h1> -->
        <div v-loading="loading" id="login_container"></div>
      </div>
      <div class="text">
        <span class="pagename">{{text}}</span>
        <span v-if="isTest" @click="testLoginFun" class="callme">测试登陆</span>
        <span v-else class="callme">联系我们</span>
      </div>
    </div>
    <canvas id="canvas"></canvas>
  </div>
</template>

<script type="text/javascript">
import wxlogin from '../../utils/wxlogin/wxlogin'
// 引入微信登陆配置文件
import wxloginConfig from '../../config/wxLoginJson.json'

export default {
  data () {
    return {
      input: '',
      text: '积纳有品管理后台',
      info: '微信扫码登陆',
      isok: false,
      // 背景开始模糊
      filter: false,
      // 微信登陆参数
      wxlogin: '',
      // loading
      loading: true,
      isTest:false,
      sessionId:''
    }
  },
  created(){

  },
  methods: {
    login () {
      console.log('点击了登陆')
      this.info = '登陆中'
      console.log(this.input)
      let that = this
      setTimeout(() => {
        that.info = '登陆成功'
        that.isok = true
        setTimeout(() => {
          let num = that.input
          that.$store.commit('token', num)
          console.log(that.$store.state.token)
          that.$router.push({ path: '/home' })
        }, 500)
      }, 500)
    },
    testLoginFun(){
      console.log('testLoginFun')
      let that = this
      this.$api.testLogin({sessionId:that.sessionId},res=>{
        console.log('测试登陆',res)
        if(res.data.res_code==1){
          console.log('登陆成功')
          that.$store.commit('testToken', 1233)
          that.$router.push({ path: '/home' })
        } else {
          this.$message({
            message:res.data.message?res.data.message:'登陆失败',
            type:'error'
          })
        }
      })
    }
  },
  mounted () {
    console.log('enter created')
    console.log('api==')
    console.log(this.$api)
    let that = this
    if(location.href.indexOf('test')>=0){
      this.isTest = true
    }
    // 请求sessionid
    that.$api.getSessionId(function(data){
      console.log('data==',data)
      let state = data.data.sessionId
      that.sessionId = data.data.sessionId
      console.log(state)
      wxloginConfig.state = state
      that.wxlogin=new WxLogin(wxloginConfig)
      that.loading = false
    })

    class Circle {
      //创建对象
      //以一个圆为对象
      //设置随机的 x，y坐标，r半径，_mx，_my移动的距离
      //this.r是创建圆的半径，参数越大半径越大
      //this._mx,this._my是移动的距离，参数越大移动
      constructor(x, y) {
          this.x = x;
          this.y = y;
          this.r = Math.random() * 10 ;
          this._mx = Math.random() ;
          this._my = Math.random() ;

      }

      //canvas 画圆和画直线
      //画圆就是正常的用canvas画一个圆
      //画直线是两个圆连线，为了避免直线过多，给圆圈距离设置了一个值，距离很远的圆圈，就不做连线处理
      drawCircle(ctx) {
          ctx.beginPath();
          //arc() 方法使用一个中心点和半径，为一个画布的当前子路径添加一条弧。
          ctx.arc(this.x, this.y, this.r, 0, 360)
          ctx.closePath();
          ctx.fillStyle = 'rgba(204, 204, 204, 0.3)';
          ctx.fill();
      }

      drawLine(ctx, _circle) {
          let dx = this.x - _circle.x;
          let dy = this.y - _circle.y;
          let d = Math.sqrt(dx * dx + dy * dy)
          if (d < 150) {
              ctx.beginPath();
              //开始一条路径，移动到位置 this.x,this.y。创建到达位置 _circle.x,_circle.y 的一条线：
              ctx.moveTo(this.x, this.y);   //起始点
              ctx.lineTo(_circle.x, _circle.y);   //终点
              ctx.closePath();
              ctx.strokeStyle = 'rgba(204, 204, 204, 0.3)';
              ctx.stroke();
          }
      }

      // 圆圈移动
      // 圆圈移动的距离必须在屏幕范围内
      move(w, h) {
          this._mx = (this.x < w && this.x > 0) ? this._mx : (-this._mx);
          this._my = (this.y < h && this.y > 0) ? this._my : (-this._my);
          this.x += this._mx / 2;
          this.y += this._my / 2;
      }
    }
    //鼠标点画圆闪烁变动
    class currentCirle extends Circle {
        constructor(x, y) {
            super(x, y)
        }

        drawCircle(ctx) {
            ctx.beginPath();
            //注释内容为鼠标焦点的地方圆圈半径变化
            //this.r = (this.r < 14 && this.r > 1) ? this.r + (Math.random() * 2 - 1) : 2;
            // this.r = 8;
            // ctx.arc(this.x, this.y, this.r, 0, 360);
            // ctx.closePath();
            //ctx.fillStyle = 'rgba(0,0,0,' + (parseInt(Math.random() * 100) / 100) + ')'
            // ctx.fillStyle = 'rgba(255, 77, 54, 0.6)'
            // ctx.fill();

        }
    }
    //更新页面用requestAnimationFrame替代setTimeout
    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    let w = canvas.width = canvas.offsetWidth;
    let h = canvas.height = canvas.offsetHeight;
    let circles = [];
    let current_circle = new currentCirle(0, 0)

    let draw = function () {
        ctx.clearRect(0, 0, w, h);
        for (let i = 0; i < circles.length; i++) {
            circles[i].move(w, h);
            circles[i].drawCircle(ctx);
            for (let j = i + 1; j < circles.length; j++) {
                circles[i].drawLine(ctx, circles[j])
            }
        }
        if (current_circle.x) {
            current_circle.drawCircle(ctx);
            for (var k = 1; k < circles.length; k++) {
                current_circle.drawLine(ctx, circles[k])
            }
        }
        requestAnimationFrame(draw)
    }

    let init = function (num) {
        for (var i = 0; i < num; i++) {
            circles.push(new Circle(Math.random() * w, Math.random() * h));
        }
        draw();
    }
    window.addEventListener('load', init(60));
    window.onmousemove = function (e) {
        e = e || window.event;
        current_circle.x = e.clientX;
        current_circle.y = e.clientY;
    }
    window.onmouseout = function () {
        current_circle.x = null;
        current_circle.y = null;
    }
  }
}
</script>

<style type="text/css" scoped>
.mgb10{
  margin-bottom: 10px;
}
#canvas{
  position: absolute;
  z-index: -1;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
}
.login{
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  /*background: rgb(225, 243, 216);*/
  background-color: #fff;
  justify-content: center;
  will-change: filter;
}
.loginmain{
  position: relative;
  box-sizing: border-box;
  z-index: 10;
  background: inherit;
  text-align: center;
  border:1px solid rgb(160, 207, 255);
  border-radius: 5px;
  padding: 10px;
}
.loginbox{
  position: relative;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
}
.text{
  position: absolute;
  color: #fff;
  font-size: 12px;
  width: 100%;
  bottom: -30px;
  display: flex;
  color: rgb(198, 226, 255);
  left: 0px;
  text-align: left;
}
.pagename{
  flex: 1;
}
.callme{
  cursor: pointer;
}
.callme:hover{
  color: #409EFF;
}
.info{
  font-size: 12px;
  line-height: 30px;
  margin-top: 30px;
}
.loginTitle{
  /*position: absolute;
  top: 00px;
  width: 100%;
  text-align: center;
  overflow: hidden;*/
  height: 40px;
  line-height: 40px;
  text-align: center;
}
.font{
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  will-change: transform;
  transition: transform 1s;
  margin-top: -40px;
}
#login_container{
  width: 300px;
  min-height: 404px;
  background-color: #fff;
  border-radius: 5px;
}
</style>
