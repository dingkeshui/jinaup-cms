<template>
  <div id="box">
    <div class="maincontent">
      <div class="tablebox">
        <el-table
          :data="list"
          border
          stripe
          height="100%"
          style="width: 100%">
          <el-table-column
            fixed
            type="index">
          </el-table-column>
          <el-table-column
            prop="nickName"
            label="用户昵称">
          </el-table-column>
          <el-table-column
            prop="cuaid"
            label="用户ID">
          </el-table-column>
          <el-table-column
            label="用户头像"
            width="120">
            <template slot-scope="scope">
              <img class="headimg" :src="scope.row.headUrl">
            </template>
          </el-table-column>
          <el-table-column
            prop="roleId"
            label="角色ID">
          </el-table-column>
           <el-table-column
            label="状态">
            <template slot-scope="scope">
              <ei-tag type="success" v-if="scope.row.cuaState==1">正常</ei-tag>
              <ei-tag type="danger" v-if="scope.row.cuaState==0">关闭中</ei-tag>
            </template>
          </el-table-column>
          <!-- <el-table-column
            prop="loginIp"
            label="loginIp">
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
              <el-button v-if="scope.row.cuaState==1" type="text" @click="delAuth(scope.row)" size="small">删除</el-button>
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
    <!-- 修改用户信息打开的内容 -->
    <el-dialog title="用户修改" :visible.sync="changeMain">
      <div style="height: 380px,width: 100%">
        <el-scrollbar class="noxscroll" style="height: 350px">
          <el-form ref="form" size="small" style="margin-right:20px" :model="changeAuth" label-width="80px">
            <el-form-item label="用户昵称">
              <el-input v-model="form.nickName"></el-input>
            </el-form-item>
            <el-form-item label="角色ID">
              <el-input v-model="form.roleId"></el-input>
            </el-form-item>
            <el-form-item label="状态">
              <!-- <el-input v-model="form.cuaState"></el-input> -->
              <el-radio v-model="form.cuaState" :label="1">正常</el-radio>
              <el-radio v-model="form.cuaState" :label="0">关闭</el-radio>
            </el-form-item>
          </el-form>
        </el-scrollbar>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="changeRoleFun">修改</el-button>
        <el-button @click="changeMain = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">

export default {
  name: 'listUser',
  data () {
    return {
      // 
      page:{
        num:''
      },
      // 要查询的页数
      res:{
        pageIndex:1
      },
      list:'',
      changeMain:false,
      form:{}
    }
  },
  created () {
    let that = this
    that.getAuth()
  },
  methods: {
    getAuth () {
      // 获取角色数据
      console.log('获取用户列表')
      let that = this
      that.vloading = true
      that.$api.getUser(that.res, (data)=>{
        console.log(data)
        if (data.status==200) {
          if(data.data.res_code==1){
           that.list = data.data.result
          }else{
            that.list =""
          }
          that.page.num = data.data.total
        }else{
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
      this.$confirm('确定删除此用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
	        that.$api.delUser({cuaid:row.cuaid},(data)=>{
		      	console.log('删除用户')
		      	console.log(data)
		        if (data.data.res_code==1) {
		          that.$message({
		            showClose: true,
		            message: '用户删除成功！',
		            type: 'success'
		          })
		          // 重新加载数据
		          that.getAuth()
		        } else {
		          that.$message({
		            showClose: true,
		            message: data.data.message?data.data.message:'用户删除失败！',
		            type: 'error'
		          })
		        }
		    })
        }).catch(() => {
                
        })
    },
    showChangeAuth (row) {
      console.log('显示修改数据')
      this.form={
        cuaid:row.cuaid,
        nickName:row.nickName,
        roleId:row.roleId,
        cuaState:row.cuaState
      }
      this.changeMain = true
    },
    changeRoleFun () {
      console.log('修改数据')
      let that = this
      console.log(that.form)
      that.$api.upDataUser(that.form, (data) =>{
        console.log('修改完成')
        console.log(data)
        if (data.data.res_code==1) {
          that.$message({
            showClose: true,
            message: '用户信息修改成功！',
            type: 'success'
          })
          that.changeMain = false
          that.getAuth()
        } else {
          that.$message({
            showClose: true,
            message: data.data.message?data.data.message:'用户信息修改失败！',
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
.headimg{
  max-width: 100px;
  max-height: 100px;
}
</style>
