<template>
  <div id="box">
    <div class="maincontent">
      <div class="tablebox">
        <el-table
          :data="roleList"
          border
          stripe
          height="100%"
          style="width: 100%">
          <el-table-column
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            prop="crName"
            label="角色昵称">
          </el-table-column>
          <el-table-column
            prop="crid"
            label="角色ID">
          </el-table-column>
           <el-table-column
            prop="crState"
            label="crState">
          </el-table-column>
           <el-table-column
            prop="cmsType"
            label="cmsType">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="createTime">
          </el-table-column>
          <el-table-column
            prop="updateTime"
            label="updateTime">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button type="text" @click="showChangeAuth(scope.row)" size="small">修改</el-button>
              <el-button type="text" @click="delAuth(scope.row)" size="small">删除</el-button>
              <el-button type="text" @click="getRoleAuth(scope.row)" size="small">查看权限</el-button>
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
    <!-- 修改角色信息打开的内容 -->
    <el-dialog title="角色修改" :visible.sync="changeMain">
      <div style="height: 380px,width: 100%">
        <el-scrollbar class="noxscroll" style="height: 350px">
          <el-form ref="form" size="small" style="margin-right:20px" :model="changeAuth" label-width="80px">
            <el-form-item label="crName">
              <el-input v-model="changeAuth.crName"></el-input>
            </el-form-item>
            <el-form-item label="crState">
              <el-input v-model="changeAuth.crState"></el-input>
            </el-form-item>
            <el-form-item label="cmsType">
              <el-input v-model="changeAuth.cmsType"></el-input>
            </el-form-item>
          </el-form>
        </el-scrollbar>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="changeRoleFun">修改</el-button>
        <el-button @click="changeMain = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 修改角色权限信息打开的内容 -->
    <el-dialog width="70%" title="权限修改" :visible.sync="changeAuthMain">
      <div style="width: 100%">
        <!-- <el-transfer v-model="roleAuth" :data="returNauthList" :titles="titleArr"></el-transfer> -->
        <div>
          <el-checkbox-group v-model="roleAuth">
            <span v-for="item in authList" :key="item.caid"><el-checkbox class="w150" :label="item.caid" >{{item.caName}}</el-checkbox></span>
          </el-checkbox-group>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="changeAuthFun">修改</el-button>
        <el-button @click="changeAuthMain = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">

export default {
  name: 'listRole',
  data () {
    return {
      page:{
        num:'',
        num2:''
      },
      // 要查询的页数
      res:{
        pageIndex:1
      },
      // 表格的加载动画
      vloading: true,
      // 有数据
      isShow: false,
      // 权限数据
      roleList:'',
      // 当前修改的角色信息
      changeAuth: {},
      // 编辑权限
      changeMain: false,
      // 当前的用户权限
      roleAuth:[],
      // 权限列表
      authList:[],
      // 修改权限时的标题
      titleArr:['全部权限','当前权限'],
      // 是否显示权限选择框
      changeAuthMain: false,
      // 当前选择的角色id
      crid:'',
      getListAuthPage:{
        pageIndex:1
      }
    }
  },
  created () {
    let that = this
    that.getAuth()
    // 获取权限列表
    that.getListAuth()
  },
  methods: {
    // 获取全部权限
    getListAuth () {
      let that = this
      that.$api.getListAuth(this.getListAuthPage,(data)=>{
        console.log('获取权限列表')
        console.log(data)
        if (data.status==200) {
          if (data.data.res_code==1) {
            that.authList = that.authList.concat(data.data.result)
          }else{
            
          }
          this.page.num2 = data.data.total
          if(this.getListAuthPage.pageIndex*20 < data.data.total){
            this.getListAuthPage.pageIndex = this.getListAuthPage.pageIndex + 1
            this.getListAuth()
          }
        } else {
          that.$message({
            showClose: true,
            message: '权限列表加载失败！',
            type: 'error'
          })
        }
        
      })
    },
    getAuth () {
      // 获取角色数据
      console.log('获取角色列表')
      let that = this
      that.vloading = true
      that.$api.getRoleList(that.res, (data)=>{
        console.log('查询结果')
        console.log(data)
        if(data.status ==200){
          if(data.data.res_code==1){
            that.roleList = data.data.result
          }else{
            that.roleList = ""
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
    pageChange (item) {
      this.res.pageIndex = item
      this.getAuth()
    },
    delAuth (row) {
      console.log(row)
      let that = this
      this.$confirm('确定删除此角色?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
	        that.$api.delRole({crid:row.crid},(data)=>{
		      	console.log('删除角色')
		      	console.log(data)
		        if (data.data.res_code==1) {
		          that.$message({
		            showClose: true,
		            message: '角色删除成功！',
		            type: 'success'
		          })
		          // 重新加载数据
		          that.getAuth()
		        } else {
		          that.$message({
		            showClose: true,
		            message: '角色删除失败！',
		            type: 'error'
		          })
		        }
		    })
        }).catch(() => {
                
        })
    },
    showChangeAuth (row) {
      console.log('显示修改数据')
      let that = this
      delete row.createTime
      delete row.updateTime
      that.changeAuth = row
      console.log(that.changeAuth)
      that.changeMain = true
    },
    changeRoleFun () {
      console.log('修改数据')
      let that = this
      console.log(that.changeAuth)
      that.$api.upDataRole(that.changeAuth, (data) =>{
        console.log('修改完成')
        console.log(data)
        if (data.data.res_code==1) {
          that.$message({
            showClose: true,
            message: '角色信息修改成功！',
            type: 'success'
          })
          that.changeMain = false
          that.getAuth()
        } else {
          that.$message({
            showClose: true,
            message: '角色信息修改失败！',
            type: 'error'
          })
        }
      })
    },
    getRoleAuth (row) {
    	// 查看角色权限
    	console.log('查看角色权限')
      console.log(row)
    	let that = this
    	that.crid = row.crid
    	that.$api.getAuthRole({crid:row.crid}, (data)=>{
    		console.log('角色权限请求完成')
    		console.log(data)
    		if(data.status==200){
    			if(data.data.result){
    				that.roleAuth = data.data.result.map(item=>item.caid)
    				console.log('roleAuth===',that.roleAuth)
    			}else{
    				that.roleAuth = []
    			}
    			that.changeAuthMain = true
     		}else{
    			that.$message({
		            showClose: true,
		            message: '角色权限请求失败！',
		            type: 'error'
		         })
    		}
    	})
    },
    changeAuthFun () {
    	// 修改角色权限
    	console.log('修改角色权限')
    	let that = this
    	console.log(that.roleAuth)
    	that.$api.changeRole({crid:that.crid,ids:that.roleAuth},(data)=>{
    		console.log('修改角色权限完成')
    		console.log(data)
    		if (data.data.res_code==1) {
    			that.$message({
		            showClose: true,
		            message: '角色权限修改成功！',
		            type: 'success'
		        })
		        that.changeAuthMain=false
    		}else{
    			that.$message({
		            showClose: true,
		            message: '角色权限修改失败！',
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
.tagbox{
  padding: 5px 10px;
}
.w150{
  width: 150px;
}
</style>
