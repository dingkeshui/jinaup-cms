<template>
  <div id="box">
    <div class="maincontent">
      <div class="tablebox">
        <el-table
          :data="authList"
          border
          stripe
          height="100%"
          style="width: 100%">
          <el-table-column
            fixed
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            fixed
            prop="caName"
            label="权限呢称">
          </el-table-column>
          <el-table-column
            prop="caParentId"
            label="上级权限ID">
          </el-table-column>
          <el-table-column
            prop="caUrl"
            label="权限路由">
          </el-table-column>
           <el-table-column
            prop="caid"
            label="权限ID">
          </el-table-column>
<!--           <el-table-column
            prop="cmsType"
            label="cmsType">
          </el-table-column>
          <el-table-column
            prop="caSort"
            label="caSort">
          </el-table-column>
          <el-table-column
            prop="isExistUrl"
            label="isExistUrl">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="createTime">
          </el-table-column>
          <el-table-column
            prop="updateTime"
            label="updateTime">
          </el-table-column> -->
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button type="text" @click="showChangeAuth(scope.row)" size="small">修改</el-button>
              <el-button type="text" @click="delAuth(scope.row)" size="small">删除</el-button>
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
    <!-- 详细筛选打开的内容 -->
    <el-dialog title="权限修改" :visible.sync="changeMain">
      <div style="height: 380px,width: 100%">
        <el-scrollbar class="noxscroll" style="height: 350px">
          <el-form ref="form" size="small" style="margin-right:20px" :model="changeAuth" label-width="80px">
            <el-form-item label="权限昵称">
              <el-input v-model="changeAuth.caName"></el-input>
            </el-form-item>
            <el-form-item label="上级权限ID">
              <el-input v-model="changeAuth.caParentId"></el-input>
            </el-form-item>
            <!-- <el-form-item label="caSort">
              <el-input v-model="changeAuth.caSort"></el-input>
            </el-form-item> -->
            <el-form-item label="权限路由">
              <el-input v-model="changeAuth.caUrl"></el-input>
            </el-form-item>
            <!-- <el-form-item label="cmsType">
              <el-input v-model="changeAuth.cmsType"></el-input>
            </el-form-item>
            <el-form-item label="isExistUrl">
              <el-input v-model="changeAuth.isExistUrl"></el-input>
            </el-form-item> -->
          </el-form>
        </el-scrollbar>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="changeAuthFun">修改</el-button>
        <el-button @click="changeMain = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'listAuth',
  data () {
    return {
      page:{
        num:''
      },
      // 要查询的页数
      res:{
        pageIndex:1
      },
      // 权限数据
      authList:'',
      // 当前修改的权限信息
      changeAuth: {},
      // 编辑权限
      changeMain: false
    }
  },
  created () {
    let that = this
    that.getAuth()
  },
  methods: {
    removesearch () {
      // 清空搜索框
      this.searchtext=''
    },
    getAuth () {
      // 获取权限数据
      let that = this
      that.vloading = true
      console.log('页数',that.res)
      that.$api.getListAuth(that.res, (data)=>{
        console.log('查询结果')
        console.log(data)
        that.vloading = false
        if (data.status==200) {
          if(data.data.res_code==1){
            that.authList=data.data.result
          }else{
            that.authList =""
          }
          that.page.num = data.data.total
        }else{
          that.isShow=false
          that.$message({
              showClose: true,
              message: '数据加载失败！',
              type: 'error'
          })
        }
        
      })
    },
    pageChange(item){
      this.res.pageIndex = item
      this.getAuth()
    },
    delAuth (row) {
        console.log(row)
        let that = this
        this.$confirm('确定删除此权限?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.$api.delAuth({caid:row.caid},(data)=>{
            console.log('删除权限')
            console.log(data)
            if (data.data.res_code==1) {
              that.$message({
                showClose: true,
                message: '权限删除成功！',
                type: 'success'
              })
              // 重新加载数据
              that.getAuth()
            } else {
              that.$message({
                showClose: true,
                message: '权限删除失败！',
                type: 'error'
              })
            }
          })
        }).catch(() => {

        })
    },
    showChangeAuth (row) {
      console.log('显示修改数据')
      this.changeAuth={
        caName:row.caName,
        caUrl:row.caUrl,
        cmsType:row.cmsType,
        caParentId:row.caParentId,
        isExistUrl:row.isExistUrl,
        caSort:row.caSort,
        caid:row.caid
      }
      this.changeMain = true
    },
    changeAuthFun () {
      console.log('修改数据')
      let that = this
      console.log(that.changeAuth)
      that.$api.upDataAuth(that.changeAuth, (data) =>{
        console.log('修改完成')
        console.log(data)
        if (data.data.res_code==1) {
          that.$message({
            showClose: true,
            message: '权限修改成功！',
            type: 'success'
          })
          that.changeMain = false
          that.getAuth(true)
        } else {
          that.$message({
            showClose: true,
            message: '权限修改失败！',
            type: 'error'
          })
        }
      })
    }
  },
  computed: {
 
  }
}
</script>

<style type="text/css" scoped>
#box{
  background-color: #fff;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
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
.mytabel{
  width: 100%;
  height: 300px;
}
.tagbox{
  padding: 5px 10px;
}
</style>
