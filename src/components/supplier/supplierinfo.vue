<template>
  <div id="box">
    <el-scrollbar class="noxscroll" style="height: 100%">
    <h1 class="title on">添加供货商</h1>
    <div>
      <el-form ref="myfrom" :rules="rules" label-width="120px" style="width:70%;margin-left:15%;">
        <el-form-item label="供货商名称">
          <el-input clearable v-model="form.nickName" placeholder="供货商名称"></el-input>
        </el-form-item>
        <el-form-item label="登陆账号">
          <el-input clearable v-model="form.userName" placeholder="登陆账号"></el-input>
          <div class="fs12 colccc">注:为供货商的登陆账号</div>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input clearable v-model="form.phoneNum" placeholder="手机号码"></el-input>
        </el-form-item>
        <el-form-item v-if="!itemdata" label="登陆密码">
          <el-input clearable v-model="form.passwd" placeholder="登陆密码"></el-input>
        </el-form-item>
        <el-form-item label="采购员">
          <el-input clearable v-model="form.purchaserName" placeholder="采购员"></el-input>
        </el-form-item>
        <el-form-item label="公司注册地址">
          <el-input clearable v-model="form.companyAddress" placeholder="公司注册地址"></el-input>
        </el-form-item>
        <el-form-item label="公司名称">
          <el-input clearable v-model="form.company " placeholder="公司名称"></el-input>
        </el-form-item>
        <el-form-item label="公司类型">
          <el-select v-model="form.companyType" placeholder="公司类型">
           <el-option label="公司" value="1"></el-option>
           <el-option label="合伙企业" value="2"></el-option>
           <el-option label="个人独资" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="平台支持">
          <el-input clearable v-model="form.platformSupport" placeholder="平台支持"></el-input>
        </el-form-item>
        <el-form-item label="贸易方式">
          <el-select v-model="form.tradeMode" placeholder="请选择贸易方式">
           <el-option label="保税" value="3"></el-option>
           <el-option label="一般贸易" value="1"></el-option>
           <el-option label="直邮" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="主营类目">
          <el-input clearable v-model="form.mainCategory" placeholder="主营类目"></el-input>
        </el-form-item>
        <el-form-item label="主营品牌">
          <el-input clearable v-model="form.mainBrand" placeholder="主营品牌"></el-input>
        </el-form-item>
        <el-form-item label="qq联系方式">
          <el-input clearable v-model="form.qq" placeholder="qq联系方式"></el-input>
        </el-form-item>
        <el-form-item label="email联系方式">
          <el-input clearable v-model="form.email" placeholder="email联系方式"></el-input>
        </el-form-item>
        <el-form-item label="微信联系方式">
          <el-input clearable v-model="form.weixin" placeholder="微信联系方式"></el-input>
        </el-form-item>
        <el-form-item label="结算方式">
          <el-radio v-model="form.settlementMethod" label="1">成本价</el-radio>
          <el-radio v-model="form.settlementMethod" label="2">扣点</el-radio>
        </el-form-item>
        <el-form-item v-if="form.settlementMethod=='2'" label="扣点数">
          <el-input clearable v-model="form.deductionPoints" placeholder="扣点数"></el-input>
        </el-form-item>
        <!-- <el-form-item label="角色ID">
          <el-button size="small" @click="searchUser" type="primary" icon="el-icon-search">选择角色</el-button>
          <div v-if="useritem">
            <table cellspacing="0" class="tab">
                <tr>
                  <td>角色ID</td>
                  <td class="flex1">角色昵称</td>
                </tr>
                <tr>
                  <td>{{useritem.crid}}</td>
                  <td class="flex1">{{useritem.crName}}</td>
                </tr>
            </table>
          </div>
        </el-form-item> -->
        <el-form-item label="状态">
          <el-select v-model="form.state" placeholder="请选择状态">
           <el-option label="未审核" value="0"></el-option>
           <el-option label="审核通过" value="1"></el-option>
           <el-option label="冻结" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="营业执照">
          <div class="imgarrbox">
            <!-- <div v-if="imgUrl" class="avatardiv">
              <img :src="imgUrl" class="avatar"></img>
            </div> -->
            <div class="avatardiv">
              <input accept="image/*" ref="imgarr" @change="chooseimgarr" type="file" class="headimginp">
              <img v-if="imgUrl" :src="imgUrl" class="avatar"></img>
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </div>
          </div>
          <p class="fs12 red">注:图片不得大于{{$store.state.oneImgBigSize}}M</p>
        </el-form-item>
        <el-form-item>
            <el-button v-if="itemdata" type="primary" @click="changefun">保存修改</el-button>
            <el-button v-else type="primary" @click="addfun">确认添加</el-button>
            <el-button @click="closePage" plain>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    </el-scrollbar>
    <el-dialog
      :title="选择用户"
      :visible.async="dialogShow"
      width="80%"
      class="mg5vh"
      @close="clospageCom"
      :before-close="handleClose">
      <rolelist @closepage="clospageCom"  v-model="useritem" itemdata="choose"></rolelist>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
import rolelist from '@/components/shop/shopRoleList'

export default {
  name: 'supplierinfo',
  components:{
    rolelist
  },
  // 有changeinfo代表是修改供货商信息
  props:['itemdata'],
  data () {
    return {
      list:'',
      imgUrl:'',
      imgFile:'',
      form:{
        // 结算方式
        settlementMethod:'1'
      },
      // 选择的用户信息
      useritem:'',
      dialogShow:false
    }
  },
  created () {
    console.log('itemdata',this.itemdata)
    if(this.itemdata){
      this.imgUrl = this.itemdata.businessLicense
      delete this.itemdata.updateTime
      delete this.itemdata.createTime
      delete this.itemdata.passwd
      for (let i in this.itemdata) {
        if (typeof(this.itemdata[i]) == 'number'){
          this.form[i] = this.itemdata[i]+''
        }else{
          this.form[i] = this.itemdata[i]
        }
      }
      if(this.itemdata.roleId){
        this.getUserInfo(this.itemdata.roleId)
      }
    }
  },
  computed:{
    // 计算属性
  },
  methods: {
    // 添加供货商
    addfun () {
      console.log(this.form)
      let formData = new FormData()
      for (let i in this.form) {
        formData.append(i,this.form[i])
      }
      formData.append('file',this.imgFile)
      this.$api.supplierAdd(formData, data=>{
        console.log(data)
        if (data.data.res_code == 1) {
          this.$message({
            showClose:true,
            message:'添加成功！',
            type:'success'
          })
          this.closePage('new')
        } else {
          this.$message({
            showClose:true,
            message:data.data.message?data.data.message:'添加失败！',
            type:'error'
          })
        }
      })
    },
    // 保存供货商
    changefun () {
      console.log('保存供货商',this.form)
      let res = new FormData()
      for (let i in this.form) {
        if(this.form[i]){
          res.append(i,this.form[i])
        }
      }
      if(this.imgFile){
        res.append('file',this.imgFile)
      }
      this.$api.supplierUpdate(res,true,data=>{
        console.log(data)
        if(data.data.res_code==1){
          this.$message({
            showClose:true,
            message:'操作成功！',
            type:'success'
          })
          this.closePage('new')
        }else{
          this.$message({
            showClose:true,
            message:'操作失败！',
            type:'error'
          })
        }
      })
    },
    // 选择用户
    searchUser () {
      this.dialogShow = true
    },
    // 擦汗寻角色权限信息
    getUserInfo(item){
      this.$api.supRoleList({crid:item},(data)=>{
        console.log('角色权限信息',data)
        if(data.data.res_code==1){
          this.useritem = data.data.result[0]
        }else{
          this.$message({
            showClose:true,
            message:'角色权限信息获取失败',
            type:'error'
          })
        }
      })
    },
    clospageCom(){
      this.dialogShow = false
    },
    chooseimgarr () {
      // 进入选择图
      let that = this
      console.log('进入选择图')
      let headimginp = that.$refs.imgarr.files[0]
      let bigSize = this.$store.state.oneImgBigSize
      let isLt2M = headimginp.size / 1024 / 1024 < bigSize
      if (!isLt2M) {
        this.$message({
          message: '注意，图片大小不得大于'+bigSize+'M',
          type: 'error'
        })
        return
      }
      that.imgFile = headimginp
      console.log(that.imgFile)
      let reads = new FileReader()
      reads.readAsDataURL(headimginp)
      reads.onload = function (e) {
        that.imgUrl = e.target.result
      }
    },
    // 关闭页面
    closePage(item){
      console.log('子组件关闭页面')
      let that = this
      that.$emit('closepage',item)
    }
  },
  watch:{
    useritem(val){
      console.log('watch',val)
      this.form.roleId = val.crid
    }
  }
}
</script>

<style type="text/css" lang="scss" scoped>
#box{
  width: 100%;
  height: 100%;
  background-color: #fff;
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
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.imgarrbox{
  padding-top: 10px;
  overflow: hidden;
}
.avatar{
  max-width: 100%;
  max-height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
</style>
