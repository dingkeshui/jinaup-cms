<template>
	<div id="specialInfo">
		<el-scrollbar class="noxscroll" style="height: 100%">
		  	<h1 v-if="pagedata" class="title on">店铺详情</h1>
		  	<h1 v-else class="title on">店铺审核</h1>
		    <el-form :model="myform" label-width="30%" style="padding: 10px">
		      <el-form-item label="供货商昵称">
		        <el-input style="width: 65%" placeholder="请输入专题昵称" v-model="myform.caName"></el-input>
		      </el-form-item>
		      <el-form-item label="申请时间">
		        <el-date-picker type="date" placeholder="申请日期" v-model="myform.sday" style="width: 30%;margin-right: 5%;"></el-date-picker>
	        	<el-time-picker type="fixed-time" placeholder="申请时间" v-model="myform.stime" style="width: 30%;"></el-time-picker>
		      </el-form-item>
		      <el-form-item label="真实姓名">
		        <el-input style="width: 65%" placeholder="请输入真实姓名" v-model="myform.rName"></el-input>
		      </el-form-item>
		      <el-form-item label="手机号">
		        <el-input style="width: 65%" placeholder="请输入手机号" v-model="myform.tel"></el-input>
		      </el-form-item>
		      <el-form-item label="身份证号">
		        <el-input style="width: 65%" placeholder="请输入身份证号" v-model="myform.id"></el-input>
		      </el-form-item>
		      <el-form-item label="专题图片">
		        <div style="overflow: hidden">
		        <div class="avatardiv">
		          <input accept="image/*" ref="headimg" @change="chooseheadimg" type="file" class="headimginp">
		          <img v-if="myform.headimg" :src="myform.headimg" class="avatar">
		          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
		        </div>
		        </div>
		        <p class="fs12 colccc mg-15">注:图片大小不得大于2M</p>
		      </el-form-item>
		      <el-form-item label="增加商品">
		      	<div>
		      		<el-input style="width: 65%" placeholder="请输入商品库中商品ID" v-model="searchId" class="input-with-select">
					    <el-button slot="append" icon="el-icon-search"></el-button>
					</el-input>
		      	</div>
		      	<div style="width: 65%" class="searchmain">
		      		<div class="searchmainimg"><img src="../../assets/logo.jpg"></div>
		      		<div class="searchmainname">搜索的商品昵称索的商品昵213312索的商品昵</div>
		      		<div class="searchmainpay">￥245.23</div>
		      		<div class="searchmainbut">
		      			<div><el-button size="small" class="mgb5" type="primary">添加</el-button></div>
		      			<div><el-button size="small">取消</el-button></div>
		      		</div>
		      	</div>
		      </el-form-item>
		      <el-form-item label="店铺上线">
				<el-switch
				  v-model="myform.switch"
				  active-color="#13ce66"
				  inactive-color="#ff4949">
				</el-switch>
		      </el-form-item>
		      <el-form-item>
		      	<div v-if="pagedata">
		      		 <el-button @click="addAuth" type="primary">修改店铺</el-button>
		      		 <el-button type="danger">删除店铺</el-button>
		      		 <el-button @click="clearPage">取消</el-button>
		      	</div>
		      	<div v-else>
		      		<el-button @click="addAuth" type="primary">通过审核</el-button>
		      		 <el-button @click="clearAll">清空</el-button>
		      	</div>
		      </el-form-item>
		    </el-form>
		</el-scrollbar>
		<el-tooltip class="item" effect="dark" content="关闭专题详情" placement="bottom">
      		<el-button v-if="pagedata" class="clearPage" @click="clearPage" type="warning" icon="el-icon-close" circle></el-button>
    	</el-tooltip>
	</div>
</template>

<script type="text/javascript">
export default {
  name: 'shopInfo',
  props:["pagedata"],
  data () {
    return {
    	thisclass:false,
    	myfrom:{
    		sday:'',
    		stime:'',
    		caName:'',
    		switch: true,
    		rname:'',
    		id:'',
    		tel:''
    	}
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
    	console.log('清空')
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
	display: flex;
	align-items:center;
	.searchmainimg{
		width: 60px;
		height: 60px;
		text-indent: center;
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
