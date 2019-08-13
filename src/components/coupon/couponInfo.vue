<template>
  <div id="couponInfo">
  	<el-scrollbar class="noxscroll" style="height: 100%">
    	<h1 v-if="!pagedata" class="title on">新增优惠券</h1>
    	<h1 v-else class="title on">编辑优惠券</h1>
    	<div class="formbox">
	    	<el-form ref="myform" :model="myform" label-width="120px">
			  <el-form-item label="优惠券标题">
			    <el-input placeholder="请输入优惠券标题" v-model="myform.title"></el-input>
			  </el-form-item>
			  <el-form-item label="优惠券描述">
			  	<el-input
  				  type="textarea"
  				  :rows="3"
  				  placeholder="请输入优惠券描述"
  				  v-model="myform.description">
  				</el-input>
			  </el-form-item>
			  <el-form-item label="优惠券分类">
			    <el-select @change="couponTypeChange" v-model="myform.couponType" placeholder="请选择优惠券分类">
			      <el-option v-for="item in couponTypeList" :key="item.couponType" :label="item.zhName" :value="item.couponType"></el-option>
			    </el-select>
			  </el-form-item>
        <el-form-item v-if="myform.couponType==2" label="商品券">
          <div><el-button size="small" @click="choosetype('a')" type="primary">选择商品</el-button></div>
          <div v-if="goodsitem">
            <table cellspacing="0" class="tab">
                <tr>
                  <td>商品ID</td>
                  <td class="flex1">商品昵称</td>
                  <td>商品图片</td>
                </tr>
                <tr>
                  <td>{{goodsitem.pid}}</td>
                  <td class="flex1">{{goodsitem.shortTitle}}</td>
                  <td><img :src="goodsitem.mainImgUrl"></td>
                </tr>
            </table>
          </div>
        </el-form-item>
        <el-form-item v-if="myform.couponType==1" label="品牌券">
          <div><el-button size="small" @click="choosetype('b')" type="primary">选择品牌</el-button></div>
          <div v-if="brankitem">
            <table cellspacing="0" class="tab">
                <tr>
                  <td>品牌ID</td>
                  <td class="flex1">品牌昵称</td>
                  <td>品牌图片</td>
                </tr>
                <tr>
                  <td>{{brankitem.bid}}</td>
                  <td class="flex1">{{brankitem.chineseName}}</td>
                  <td><img :src="brankitem.logoImgUrl"></td>
                </tr>
            </table>
          </div>
        </el-form-item>
        <el-form-item v-if="myform.couponType==4" label="供货商券">
          <div><el-button size="small" @click="choosetype('c')" type="primary">选择供货商</el-button></div>
          <div v-if="suppliersitem">
            <table cellspacing="0" class="tab">
                <tr>
                  <td>供货商ID</td>
                  <td class="flex1">供货商昵称</td>
                  <td>供货商电话</td>
                </tr>
                <tr>
                  <td>{{suppliersitem.uid}}</td>
                  <td class="flex1">{{suppliersitem.nickName}}</td>
                  <td>{{suppliersitem.phoneNum}}</td>
                </tr>
            </table>
          </div>
        </el-form-item>
			  <el-form-item label="发布者类型">
			    <el-select v-model="myform.couponPublisherType" placeholder="请选择发布者类型">
			      <el-option label="平台" value="1"></el-option>
			      <el-option label="商家" value="2"></el-option>
			      <el-option label="供货商" value="3"></el-option>
			    </el-select>
			  </el-form-item>
			  <el-form-item label="领取方式">
          <!-- <span v-if="myform.couponType==0">升级会员</span> -->
			    <el-select v-model="myform.obtainMethod" placeholder="请选择优惠券领取方式">
			      <el-option label="手动领取" value="0"></el-option>
			      <el-option label="升级会员" value="1"></el-option>
			    </el-select>
			  </el-form-item>
			  <el-form-item label="领取时间类型">
			    <el-select v-model="myform.timeType" placeholder="优惠券领取时间类型">
			      <el-option label="设置时间" value="1"></el-option>
			      <el-option label="领取时间" value="2"></el-option>
			    </el-select>
			  </el-form-item>
        <el-form-item v-if="myform.timeType==1" label="设置时间">
          <el-date-picker
            clearable
            v-model="times"
            @change="timeChange"
            type="datetimerange"
            value-format="timestamp"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
			  <el-form-item v-else label="领取时间">
			    <el-input class="mgr10" style="width:200px;" placeholder="优惠券领取后有效期限" v-model="myform.effectiveDay"></el-input>
			    <span class="colaaa">天</span>
			  </el-form-item>
			  <el-form-item label="使用规则">
			    <el-select v-model="myform.couponRuleType" placeholder="优惠券使用规则">
			      <el-option label="满减券" value="1"></el-option>
			      <el-option label="现金券" value="2"></el-option>
			    </el-select>
			  </el-form-item>
			  <el-form-item v-if="myform.couponRuleType==1" label="满减券">
			    <div class="flex flexvcenter">
			    	<span class="mgr10 colaaa">满</span>
			    	<el-input class="mgr10" v-model="myform.full" placeholder="金额" style="width:100px;"></el-input>
			    	<span class="mgr10 colaaa">减</span> 
			    	<el-input class="mgr10" v-model="myform.reduction" placeholder="金额" style="width:100px;"></el-input>
			    	<span class="colaaa">元</span> 
			    </div>
			  </el-form-item>
			  <el-form-item v-else label="现金券">
			    <div class="flex flexvcenter">
            <span class="mgr10 colaaa">满</span>
            <el-input class="mgr10" v-model="myform.full" placeholder="金额" style="width:100px;"></el-input>
            <span class="mgr10 colaaa">送</span> 
            <el-input class="mgr10" v-model="myform.reduction" placeholder="金额" style="width:100px;"></el-input>
            <span class="colaaa">元</span> 
          </div>
			  </el-form-item>
			  <el-form-item label="优惠券总数">
			    <div><el-input-number class="mgr10" v-model="myform.totalNum" :min="-1"></el-input-number></div>
			    <span class="colccc fs12">注：-1为无限制</span>
			  </el-form-item>
			  <el-form-item label="结算类型">
			    <el-select v-model="myform.settlementType" placeholder="优惠券结算类型">
			      <el-option label="平台承担" value="0"></el-option>
			      <el-option label="商家承担" value="1"></el-option>
			      <el-option label="供货商承担" value="2"></el-option>
			    </el-select>
			  </el-form-item>
			  <el-form-item label="优惠券状态">
			    <el-radio v-model="myform.state" label="1">上线</el-radio>
  				<el-radio v-model="myform.state" label="0">下线</el-radio>
			  </el-form-item>
			  <el-form-item>
			  	<template  v-if="!pagedata">
			    	<el-button @click="addnew" type="primary">立即创建</el-button>
			    	<el-button>重置</el-button>
			    </template>
			    <template  v-else>
			    	<el-button type="primary">保存编辑</el-button>
			    	<el-button @click="closepage">取消</el-button>
				</template>
			  </el-form-item>
			</el-form>
		</div>
  	</el-scrollbar>
    <el-dialog
      :title="选择"
      :visible.async="dialogShow"
      width="80%"
      class="mg5vh"
      @close="clospageCom"
      :before-close="handleClose">
      <goods v-if="showcom=='a'" @closepage="clospageCom"  v-model="goodsitem" itemdata="choose"></goods>
      <brank v-if="showcom=='b'" @closepage="clospageCom" v-model="brankitem" itemdata="choose"></brank>
      <suppliers v-if="showcom=='c'" @closepage="clospageCom" v-model="suppliersitem" chooseitem="choose"></suppliers>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
import brank from '@/components/brank/branklist.vue'
import goods from '@/components/goods/goodslist.vue'
import suppliers from '@/components/supplier/supplierslist.vue'

import vue from 'vue'

export default {
  name: 'couponInfo',
  props:['pagedata'],
  components:{
    brank,
    goods,
    suppliers
  },
  data () {
  	return {
      // 选择的商品
      goodsitem:'',
      // 选择的品类
      brankitem:'',
      // 选择的供货商
      suppliersitem:'',
      dialogShow:false,
      showcom:'',
  		// 日期
  		times:'',
  		myform: {
  			// 优惠券发布者用户Id 平台默认为0
  			couponPublisher:0,
  			// 优惠券商家的用户Id|或者后台发布优惠券的操作账户id
  			userId:this.$store.state.userInfo.cuaid,
  			// 卷对应的商品id，通用券为0
  			couponTypeValue:0,
        couponRuleType:'1',
        state:'1',
        totalNum:-1
      },
      // 选中的商品分类
      onclass:[],
      // 带年前选择的分类id
      parentId:0,
      // 获取优惠券类型
      couponTypeList:''
  	}
  },
  watch:{
    goodsitem(val){
      if(val){
        this.myform.couponTypeValue = val.pid
      }
    },
    brankitem(val){
      console.log('品牌选择',val)
      if(val){
        this.myform.couponTypeValue = val.bid
      }
    },
    suppliersitem(val){
      if(val){
        this.myform.couponTypeValue = val.uid
      }
    }
  },
  methods:{
    // 获取优惠券分类
    getCouponType(){
      console.log('获取优惠券分类')
      this.$api.getCouponType(data=>{
        console.log('data')
        if(data.data.res_code==1){
          this.couponTypeList = data.data.result
        }else{
          this.$message({
            showClose:true,
            message:'获取优惠券分类失败',
            type:'error'
          })
        }
      })
    },
  	// 时间范围选择
  	timeChange(item){
  		console.log('时间范围选择')
  		console.log(item)
  		if(item&&item.length){
  			this.myform.onTime=item[0]
  			this.myform.offTime=item[1]
  		}
  	},
    // 优惠券分类改变
    couponTypeChange(item){
      console.log(item)
      // if(item==0){
      //   this.myform.obtainMethod=1
      // }
    },
    choosetype(item){
      this.dialogShow = true
      this.showcom = item
    },
    // 关闭子页面
    clospageCom () {
      this.dialogShow = false
    },
  	// 创建优惠券
  	addnew () {
  		console.log('创建优惠券')
  		let that = this
  		console.log(that.myform)
  		that.$api.couponAdd(that.myform,data=>{
  			console.log(data)
  			if (data.data.res_code==1) {
  				that.closepage('new')
  				that.$message({
  					showClose:true,
  					message:'创建成功',
  					type:'success'
  				})
          if(!this.pagedata){
            this.$router.push('/coupon/couponList')
          }
  			} else {
  				that.$message({
  					showClose:true,
  					message:'创建失败',
  					type:'error'
  				})
  			}
  		})
  	},
  	closepage(item){
  		console.log('取消')
  		this.$emit('closepage',item)
  	}
  },
  created(){
  	console.log('couponInfo created')
  	console.log(this.pagedata)
    this.getCouponType()
  }
}
</script>

<style type="text/css" scoped lang="scss">
#couponInfo{
	height: 100%;
	widows: 100%;
	background-color: #fff;
	.title{
    	padding-top: 30px;
    	text-align: center;
    	margin-bottom: 50px;
  	}
  	.formbox{
  		padding: 0px 15%;
  	}
}
</style>
