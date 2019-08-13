<template>
	<div id="userList">
		<div v-if="showBox1" class="box">
			<div class="miantop">
			    <div class="maintopleft">
			    </div>
			    <div class="flex flexvcenter pad10">
			    	<el-button size="small" @click="addbut" type="primary">添加角色</el-button>
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
    					  prop="crid"
    		        label="角色ID">
    				  </el-table-column>
              <el-table-column
                prop="crName"
                label="角色昵称">
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
    					  min-width="120"
                label="操作">
    					  <template slot-scope="scope">
                  <div class="mgb5">
                    <el-button class="minbut" size="small" @click="change(scope.row)" type="primary">编辑</el-button>
                  </div>
                  <div class="mgb5">
                    <el-button class="minbut" size="small" @click="look(scope.row)" type="primary">查看权限</el-button>
                  </div>
                  <div>
                    <el-button class="minbut" size="small" @click="remove(scope.row)" type="warning">删除</el-button>
                  </div>
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
      <shoproleadd :pagedata="pagedata" @closepage="closepage"></shoproleadd>
    </div>
    <el-dialog
      title="权限信息"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose">
      <div>
        <el-checkbox-group v-model="onAuth">
          <span v-for="item in allAuth">
             <el-checkbox :label="item.caid">{{item.caName}}</el-checkbox>
          </span>
        </el-checkbox-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeRoleAuth">保存权限</el-button>
      </span>
    </el-dialog>
	</div>
</template>

<script type="text/javascript">
import shoproleadd from '@/components/shop/shopRoleAdd.vue'

export default {
  name: 'shoprolelist',
  components:{
    shoproleadd
  },
  data () {
    return {
      pagedata:'',
      showBox1:true,
    	postData:{
    		pageIndex:1
    	},
    	list:'',
    	searchData:{},
      page:{
        num:''
      },
      // 显示权限信息
      dialogVisible:false,
      // 所有的权限信息
      allAuth:[],
      // 当前角色的权限
      onAuth:[],
      // 选择的角色
      onRole:''
    }
  },
  created () {
    this.getList()
    this.getAllAuth()
  },
  methods: {
  	// 获取商户角色信息
  	getList () {
  		console.log('获取商户角色信息')
  		console.log(this.postData)
  		this.$api.supRoleList(this.postData,data=>{
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
  					message:'获取商户角色信息列表失败',
  					type:'error'
  				})
  			}
  		})
  	},
    // 删除角色
    remove(item){
      this.$api.supRoleDel({crid:item.crid},data=>{
        console.log(data)
        if(data.data.res_code==1){
          this.$message({
            showClose:true,
            message:'删除成功',
            type:'success'
          })
          this.getList()
        }else{
          this.$message({
            showClose:true,
            message:'删除失败',
            type:'error'
          })
        }
      })
    },
    // 查看权限
    look(item){
      this.onRole = item
      this.dialogVisible = true
      this.$api.supRoleAuthList({crid:item.crid},data=>{
        console.log(data)
        if(data.status == 200){
          if(data.data.res_code == 1){
            this.onAuth = data.data.result
          }else{
            this.onAuth = ""
          }
        }else{
          this.$message({
            showClose:true,
            type:'error',
            message:"用户权限获取失败"
          })
        }
      })
    },
    // 修改角色权限
    changeRoleAuth () {
      console.log('修改角色权限',this.onAuth)
      this.$api.supRoleAuthChange({ids:this.onAuth,crid:this.onRole.crid},data=>{
        console.log(data)
        if(data.data.res_code == 1){
          this.$message({
            showClose:true,
            type:'success',
            message:"权限修改成功"
          })
        }else{
          this.$message({
            showClose:true,
            type:'error',
            message:"权限修改失败"
          })
        }
      })
    },
    // 获取全部权限
    getAllAuth(){
      this.$api.supAuthList({pageIndex:1},data=>{
        console.log(data)
        if (data.status == 200) {
          this.allAuth = data.data.result
        } else {
          this.$message({
            showClose:true,
            message:'全部权限获取失败',
            type:'error'
          })
        }
      })
    },
    // 关闭子组件
    closepage (item) {
      this.showBox1  = true
      if (item) {
        this.getList()
      }
    },
    pageChange(item){
      this.postData.pageIndex = item
      this.getList(3)
    },
    change(item){
      this.showBox1 = false
      this.pagedata = item
    },
  	// 添加权限
  	addbut () {
      this.pagedata = ""
      this.showBox1 = false
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

</style>
