<template>
	<div id="specialInfo">
		<el-scrollbar class="noxscroll" style="height: 100%">
		  	<h1 v-if="pagedata" class="title on">秒杀详情</h1>
		  	<h1 v-else class="title on">新增秒杀</h1>
		    <el-form :model="myform" label-width="30%" style="padding: 10px">
		      <el-form-item label="秒杀昵称">
		        <el-input style="width: 65%" placeholder="请输入秒杀昵称" v-model="myform.caName"></el-input>
		      </el-form-item>
		      <el-form-item label="秒杀开始时间">
		        <el-date-picker type="date" placeholder="秒杀开始日期" v-model="myform.sday" style="width: 30%;margin-right: 5%;"></el-date-picker>
	        	<el-time-picker type="fixed-time" placeholder="秒杀开始时间" v-model="myform.stime" style="width: 30%;"></el-time-picker>
		      </el-form-item>
		      <el-form-item label="秒杀结束时间">
		        <el-date-picker type="date" placeholder="秒杀结束日期" v-model="myform.eday" style="width: 30%;margin-right: 5%"></el-date-picker>
	        	<el-time-picker type="fixed-time" placeholder="秒杀结束时间" v-model="myform.etime" style="width: 30%;"></el-time-picker>
		      </el-form-item>
		      <el-form-item label="增加商品">
		      	<div>
		      		<el-input style="width: 65%" placeholder="请输入商品库中商品ID" v-model="searchId" class="input-with-select">
					    <el-button slot="append" icon="el-icon-search"></el-button>
					</el-input>
		      	</div>
		      	<div style="width: 65%" class="searchmain">
	      			<div class="flexvcenter bb1d">
	      				<div class="searchmainimg"><img src="../../assets/logo.jpg"></div>
	      				<div class="searchmainname">搜索的商品昵称索的商品昵213312索的商品昵</div>
	      			</div>
	      			<div class="flexvcenter bb1d">
	      				<div class="searchmainpay">
	      					<span class="mgr5">商品原价</span>
	      					<span class="red">￥245.23</span>
	      				</div>
	      				<div class="flexcenter flex1">
	      					<span class="mgr5">秒杀价格</span>
	      					<el-input v-model="num" style="width: 100px"></el-input>
	      				</div>
	      			</div>
	      			<div class="flexvcenter bb1d">
	      				<div class="flexvcenter pad10">
	      					<span class="mgr5">商品库存</span>
	      					<span class="colaaa">123321</span>
	      				</div>
	      				<div class="flexcenter flex1">
	      					<span class="mgr5">秒杀数量</span>
	      					<el-input-number v-model="num" controls-position="right" :min="1" :max="10"></el-input-number>
	      				</div>
	      			</div>
	      			<div class="flexcenter pad10">
	      				<el-button size="small" type="primary">添加</el-button>
	      				<el-button size="small">取消</el-button>
	      			</div>
		      	</div>
		      </el-form-item>
		      <el-form-item label="秒杀商品">
		        <div style="width: 65%;" class="goodsBox">
		      		<div class="goodsBoxTitle on"><h4>秒杀中商品</h4></div>
		      		<div class="searchmain">
		      			<div class="flexvcenter bb1d">
		      				<div class="searchmainimg"><img src="../../assets/logo.jpg"></div>
		      				<div class="searchmainname">搜索的商品昵称索的商品昵213312索的商品昵</div>
		      			</div>
		      			<div class="flexvcenter bb1d">
		      				<div class="searchmainpay">
		      					<span class="mgr5">商品原价</span>
		      					<span class="colaaa">￥245.23</span>
		      				</div>
		      				<div class="flexcenter flex1">
		      					<span class="mgr5">秒杀价格</span>
		      					<el-input v-model="num" style="width: 100px"></el-input>
		      				</div>
		      			</div>
		      			<div class="flexvcenter bb1d">
		      				<div class="flexvcenter pad10">
		      					<span class="mgr5">商品库存</span>
		      					<span class="colaaa">123321</span>
		      				</div>
		      				<div class="flexcenter flex1">
		      					<span class="mgr5">秒杀数量</span>
		      					<el-input-number v-model="num" controls-position="right" :min="1" :max="10"></el-input-number>
		      				</div>
		      			</div>
		      			<div class="flexcenter pad10">
		      				<el-button size="small" type="warning">删除</el-button>
		      			</div>
		      		</div>
		      	</div>
		      </el-form-item>
		      <el-form-item label="秒杀上线">
				<el-switch
				  v-model="myform.switch"
				  active-color="#13ce66"
				  inactive-color="#ff4949">
				</el-switch>
		      </el-form-item>
		      <el-form-item>
		      	<div v-if="pagedata">
		      		 <el-button @click="addAuth" type="primary">修改秒杀</el-button>
		      		 <el-button type="danger">删除秒杀</el-button>
		      		 <el-button @click="clearPage">取消</el-button>
		      	</div>
		      	<div v-else>
		      		<el-button @click="addAuth" type="primary">新增秒杀</el-button>
		      		<el-button @click="clearAll">清空</el-button>
		      	</div>  
		      </el-form-item>
		    </el-form>
		</el-scrollbar>
		<el-tooltip class="item" effect="dark" content="关闭秒杀详情" placement="bottom">
      		<el-button v-if="pagedata" class="clearPage" @click="clearPage" type="warning" icon="el-icon-close" circle></el-button>
    	</el-tooltip>
	</div>
</template>

<script type="text/javascript">
export default {
  name: 'spikelInfo',
  props:["pagedata"],
  data () {
    return {
    	thisclass:false,
    	myform:{
    		caName:'',
    		switch: true,
    		sday:'',
    		stime:'',
    		eday:'',
    		etime:''
    	},
    	num:5
    }
  },
  methods:{
  	// 选择封面图片
    chooseheadimg (file) {
      // 进入选择封面图片
      console.log('enter choose head img')
      let headimginp = this.$refs.headimg.files[0]
      console.log(headimginp)
      let isLt2M = headimginp.size / 1024 / 1024 < 1
      console.log(isLt2M)
      if (!isLt2M) {
        this.$message({
          message: '注意，图片大小不得大于2M',
          type: 'error'
        })
        this.$refs.headimg.value = ''
        return
      }
      let reads = new FileReader()
      let that = this
      reads.readAsDataURL(headimginp)
      reads.onload = function (e) {
        console.log(e)
        that.myfrom.headimg = e.target.result
      }
    },
    clearPage () {
    	// 关闭专题详情
    	console.log('子组件点击的关闭详情')
    	this.$emit('closePage','子组件传递的参数')
    },
    clearAll () {
    	// 清空
    	console.log('清空页面')
    }
  },
  created () {
  	console.log('pagedata')
  	console.log(this.pagedata)
  }
}
</script>

<style type="text/css" scoped lang="scss">
#specialInfo{
	height: 100%;
	width: 100%;
	background-color: #fff;
	position: relative;
}
.title{
	padding-top: 30px;
	text-align: center;
	margin-bottom: 50px;
}
.avatardiv {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  width: 178px;
  height: 178px;
  float: left;
  margin-right: 20px;
  margin-bottom: 10px;
}
.headimginp{
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 1;
}
.avatar{
  max-width: 100%;
  max-height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%)
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.searchmain{
	border: 1px solid #ccc;
	border-radius: 5px;
	margin: 10px 0px;
	padding: 0px 5px;
	width: 100%;
	box-sizing:border-box;
	.searchmainimg{
		width: 60px;
		height: 60px;
		text-indent: center;
		padding: 5px;
		img{
			max-width: 100%;
			max-height: 100%;
		}
	}
	.searchmainname{
		flex:1;
		padding: 10px;
		text-align: center;
		line-height: 25px;
	}
	.searchmainpay{
		padding: 10px;
	}
	.searchmainbut{
		padding: 10px;
		display: flex;
		flex-direction:column;
		align-items:center;
		justify-content:center;
	}
}
.goodsBox{
	border:1px solid #ccc;
	border-radius: 5px;
	.goodsBoxTitle{
		text-align: center;
	}
	.searchmain{
		border:0px;
		border-top:1px solid #ccc;
		border-radius: 0px;
	}
}
.clearPage{
	position: absolute;
	top: 20px;
	right: 20px;
}
</style>
