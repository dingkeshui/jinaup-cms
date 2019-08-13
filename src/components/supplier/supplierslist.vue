<template>
  <div id="userList">
    <div v-if="showBox1" class="box">
      <div class="miantop">
          <div class="maintopleft">
            <el-input class="w200 mgr5" size="small" clearable v-model="searchData.uid" placeholder="用户ID"></el-input>
            <el-input class="w200 mgr5" size="small" clearable v-model="searchData.nickName" placeholder="供货商昵称"></el-input>
          </div>
          <div class="flex flexvcenter pad10">
            <el-button size="small" @click="searchUser" type="primary" icon="el-icon-search">搜索</el-button>
            <el-button v-if="!chooseitem" size="small" @click="addbut" type="primary">添加供货商</el-button>
          </div>
      </div>
      <div class="maincontent" v-loading="vloading">
        <div class="tablebox">
            <el-table
              :data="list"
              border
              stripe
              height="100%"
              style="width: 100%"
              class="mytabel">
              <el-table-column
                fixed="left"
                type="index"
                width="50">
              </el-table-column>
              <el-table-column
                prop="uid"
                label="供货商ID"
                width="120">
              </el-table-column>
              <el-table-column
                prop="nickName"
                label="供货商昵称"
                width="150">
              </el-table-column>
              <el-table-column
                prop="userName"
                label="登陆账号"
                width="110">
              </el-table-column>
              <el-table-column
                prop="phoneNum"
                label="手机号码"
                width="120">
              </el-table-column>
              <el-table-column
                prop="purchaserName"
                label="采购员"
                width="120">
              </el-table-column>
              <el-table-column
                prop="companyAddress"
                label="公司注册地址"
                width="200">
              </el-table-column>
              <el-table-column
                prop="company"
                label="公司名称"
                width="150">
              </el-table-column>
              <el-table-column
                label="公司类型"
                min-width="130">
                <template slot-scope="scope">
                  <el-tag v-if="scope.row.companyType==1" type="">公司</el-tag>
                  <el-tag v-if="scope.row.companyType==2" type="success">合伙企业</el-tag>
                  <el-tag v-if="scope.row.companyType==3" type="warning">个人独资</el-tag>
                </template>
              </el-table-column>
              <el-table-column
                prop="platformSupport"
                label="平台支持"
                width="150">
              </el-table-column>
              <el-table-column
                label="贸易方式"
                min-width="130">
                <template slot-scope="scope">
                  <el-tag v-if="scope.row.companyType==3" type="">保税</el-tag>
                  <el-tag v-if="scope.row.companyType==1" type="success">一般贸易</el-tag>
                  <el-tag v-if="scope.row.companyType==2" type="warning">直邮</el-tag>
                </template>
              </el-table-column>
              <el-table-column
                prop="mainCategory"
                label="主营类目"
                width="120">
              </el-table-column>
              <el-table-column
                prop="mainBrand"
                label="主营品牌"
                width="120">
              </el-table-column>
              <el-table-column
                prop="weixin"
                label="微信"
                width="120">
              </el-table-column>
              <el-table-column
                prop="qq"
                label="QQ"
                width="120">
              </el-table-column>
              <el-table-column
                prop="email"
                label="email"
                width="120">
              </el-table-column>
              <el-table-column
                label="结算方式"
                width="120">
                <template slot-scope="scope">
                  <el-tag v-if="scope.row.settlementMethod==1">成本价</el-tag>
                  <el-tag v-if="scope.row.settlementMethod==2">扣点</el-tag>
                </template>
              </el-table-column>
              <el-table-column
                prop="deductionPoints"
                label="扣点数"
                width="120">
              </el-table-column>
              <el-table-column
                prop="roleId"
                label="角色ID"
                width="120">
              </el-table-column>
              <el-table-column
                label="状态"
                width="130">
                <template slot-scope="scope">
                  <el-tag type="warning" v-if="scope.row.state==0">未审核</el-tag>
                  <el-tag type="success" v-if="scope.row.state==1">审核通过</el-tag>
                  <el-tag type="danger" v-if="scope.row.state==2">冻结</el-tag>
                </template>
              </el-table-column>
              <el-table-column
                v-if="chooseitem"
                label="操作"
                align="center"
                fixed="right"
                width="130">
                <template slot-scope="scope">
                  <div><el-button type="warning" @click="choosebut(scope.row)" class="minbut" size="small">选择</el-button></div>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                v-else
                label="操作"
                fixed="right"
                width="130">
                <template slot-scope="scope">
                  <span style="width:50px;" class="mgb5 inblock" v-if="scope.row.state==0"><el-button @click="adopt(scope.row)" class="minbut" type="success" size="small">通过</el-button></span>
                  <span style="width:50px;" class="mgb5 inblock" v-if="scope.row.state!=2"><el-button @click="freeze(scope.row)" class="minbut" type="warning" size="small">冻结</el-button></span>
                  <span style="width:50px;" class="mgb5 inblock"><el-button type="primary" class="minbut" @click="changinfo(scope.row)" size="small">编辑</el-button></span>
                  <div><el-button type="danger" @click="changpsw(scope.row)" class="minbut" size="small">修改密码</el-button></div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="minfoot">
          <el-pagination
            background
            page-size="20"
            @current-change="pageChange"
            :total="page.num"
            layout="total, prev, pager, next, jumper">
          </el-pagination>
        </div>
    </div>
    <div v-else class="box2">
      <supplierinfo :itemdata="itemdata" @closepage="closepage"></supplierinfo>
    </div>
  </div>
</template>

<script type="text/javascript">
import supplierinfo from '@/components/supplier/supplierinfo.vue'

export default {
  name: 'supplierlist',
  components:{
    supplierinfo
  },
  props:['chooseitem'],
  data () {
    return {
      // 供应商的参数
      itemdata:'',
      showBox1:true,
      postData:{
        pageIndex:1
      },
      list:'',
      searchData:{},
      // 是否显示修改上级box
      dialogVisible:false,
      page:{
        num:''
      }
    }
  },
  created () {
    console.log('供货商列表进入created',this.chooseitem)
    this.getList()
  },
  methods: {
    // 搜索
    searchUser () {
      console.log('搜索')
      for (let i in this.searchData) {
        this.postData[i] = this.searchData[i]
      }
      this.postData.pageIndex=1
      this.getList()
    },
    // 获取供应商信息列表
    getList () {
      console.log('前端获取供应商信息列表')
      console.log(this.postData)
      this.$api.supplierList(this.postData,data=>{
        console.log(data)
        if(data.status==200){
          if(data.data.res_code==1){
            this.list = data.data.result
          }else{
            this.list = ''
          }
          this.page.num = data.data.total
        }else{
          this.$message({
            showClose:true,
            message:'获取供应商信息列表失败',
            type:'error'
          })
        }
      })
    },
    // 修改
    changinfo(item){
      console.log('修改')
      this.itemdata = item
      this.showBox1 = false
    },
    // 通过审核
    adopt(item){
      console.log('通过审核')
      this.$api.supplierUpdate({uid:item.uid,state:1},false,data=>{
        console.log(data)
        if (data.data.res_code==1) {
          this.$message({
            showClose:true,
            type:'success',
            message:'操作成功！'
          })
          this.getList()
        }else{
          this.$message({
            showClose:true,
            type:'error',
            message:'操作失败！'
          })
        }
      })
    },
    // 冻结
    freeze(item){
      console.log('冻结')
      this.$api.supplierUpdate({uid:item.uid,state:2},false,data=>{
        console.log(data)
        if (data.data.res_code==1) {
          this.$message({
            showClose:true,
            type:'success',
            message:'操作成功！'
          })
          this.getList()
        }else{
          this.$message({
            showClose:true,
            type:'error',
            message:'操作失败！'
          })
        }
      })
    },
    // 修改密码
    changpsw(item){
      console.log('修改密码')
      this.$prompt('请输入新密码', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(async ({ value }) => {
          this.$api.supplierPwd({uid:item.uid,passwd:value},data=>{
            console.log(data)
            if(data.data.res_code==1){
              this.$message({
                showClose:true,
                type:'success',
                message:'操作成功！'
              })
              this.getList()
            }else{
              this.$message({
                showClose:true,
                type:'error',
                message:'操作失败！'
              })
            }
          })
        }).catch(() => {
              
        });
    },
    // 关闭子组件
    closepage (item) {
      this.showBox1  = true
      if(item){
        this.getList()
      }
    },
    pageChange(item){
      this.postData.pageIndex = item
      this.getList()
    },
    // 添加供应商
    addbut () {
      this.itemdata = ''
      this.showBox1 = false
    },
    choosebut(item){
      console.log('选择供货商',item)
      this.$emit('input',item)
      this.$emit('closepage')
    }
  }
}
</script>

<style type="text/css" scoped>
#userList{
  height: 100%;
  width: 100%;
  background-color: #fff;
}
.box{
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.box2{
  width: 100%;
  height:100%;
}
.miantop{
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #ccc;
  display: flex;
  box-sizing: border-box;
  overflow: hidden;
}
.maintopleft{
  flex: 1;
  display: flex;
  padding: 10px 5px;
  align-items: center;
}
.maincontent{
  flex: 1;
  width: 100%;
  overflow: hidden;
  position: relative;
}
.minfoot{
  padding: 10px;
  border-top: 1px solid #ccc;
  text-align: right;
}
.idimg{
  max-height: 150px;
  max-height: 150px;
}
.w200{
  width: 200px;
}
</style>
