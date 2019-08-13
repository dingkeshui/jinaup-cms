<template>
	<div id="userList">
		<div class="box">
			<div class="miantop">
        <div class="flex1"></div>
        <div class="flex flexvcenter pad10">
          <el-button size="small" @click="addNewBut" type="primary">添加推荐人</el-button>
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
                label="排序"
      					type="index"
      					width="100">
    				  </el-table-column>
    				  <el-table-column
      					prop="uid"
      		      label="用户ID"
    					  width="100">
    				  </el-table-column>
    				  <el-table-column
    					  prop="nickName"
    		        label="用户昵称"
    					  width="150">
    				  </el-table-column>
              <el-table-column
                prop="nickName"
                label="用户头像"
                width="140">
                <template slot-scope="scope">
                  <img class="headerImg" :src="scope.row.headUrl">
                </template>
              </el-table-column>
              <el-table-column
                prop="sortId"
                label="排序序号"
                width="120">
              </el-table-column>
              <el-table-column
                prop="totalInviteNumber"
                label="邀请总数">
              </el-table-column>
              <el-table-column
                label="状态"
                width="120">
                <template slot-scope="scope">
                  <el-tag v-if="scope.row.state==1">上线</el-tag>
                  <el-tag type="danger" v-else>下线</el-tag>
                </template>
              </el-table-column>
		          <el-table-column
		            fixed="right"
                align="center"
                width="110"
		            label="操作">
		            <template slot-scope="scope">
                  <div class="mgb5">
                    <el-button class="minbut" @click="change(scope.row)" type="primary" size="small">编辑</el-button>
                  </div>
		              <div v-if="scope.row.state==1" class="mgb5">
                    <el-button class="minbut" @click="remove(scope.row)" type="warning" size="small">下线</el-button>
                  </div>
                  <div v-else>
                    <el-button class="minbut" @click="upbut(scope.row)" type="success" size="small">上线</el-button>
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
    <!-- 添加某一用户 -->
    <el-dialog
      title="添加推荐人"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose">
      <div class="">
        <div class="pad10 flex">
          <!-- <el-button @click="chooseUser" size="samll">选择用户</el-button> -->
          <el-input size="samll" v-model="userid" class="mgr10" placeholder="用户ID"></el-input>
          <el-button @click="searchbut" type="primary" size="samll">搜索</el-button>
        </div>
        <div class="pad10" v-if="userinfoone">
          <div class="flex mgb10 flexvcenter">
            <span class="mgr10">用户头像</span>
            <img :src="userinfoone.headUrl">
          </div>
          <div class="flex">
            <div class="flex1 flexvcenter">
              <span class="mgr10">用户ID</span>
              <span class="on">{{userinfoone.uid}}</span>
            </div>
            <div class="flex1 flexvcenter">
              <span class="mgr10">用户昵称</span>
              <span class="on">{{userinfoone.nickName}}</span>
            </div>
            <div class="flex1 flex flexvcenter">
              <span class="mgr10">用户排序</span>
              <el-input placeholder="排序" v-model="userinfoone.sortId" size="samll" style="width:100px;"></el-input>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addNewUser">添 加</el-button>
      </span>
    </el-dialog>
	</div>
</template>

<script type="text/javascript">

export default {
  name: 'userPower',
  data () {
    return {
    	postData:{
    		pageIndex:1
    	},
    	list:'',
    	searchData:{},
    	dialogVisible:false,
      // 搜索的用户ID
      userid:'',
      userinfoone:'',
      page:{
        num:''
      }
    }
  },
  created(){
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
  	// 获取推荐人列表
  	getList () {
  		console.log('获取推荐人列表')
  		console.log(this.postData)
  		this.$api.userRecommenderList(this.postData,data=>{
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
  					message:'获取推荐人列表失败',
  					type:'error'
  				})
  			}
  		})
  	},
    pageChange(item){
      this.postData.pageIndex = item
      this.getList()
    },
    // 修改
    change(item){
      this.$prompt('请输入排序', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(async ({ value }) => {
          this.$api.userRecommenderUpdata({uid:item.uid,sortId:value},data=>{
            console.log(data)
            if(data.data.res_code==1){
              this.$message({
                showClose:true,
                message:'修改成功',
                type:'success'
              })
              this.getList()
            }else{
              this.$message({
                showClose:true,
                message:'修改失败',
                type:'error'
              })
            }
          })
        }).catch(() => {
              
        });
    },
    // 用户上线
    upbut(item){
      this.$api.userRecommenderUpdata({uid:item.uid,sortId:item.sortId,state:1},data=>{
        console.log('用户上线',data)
        if (data.data.res_code==1) {
          this.$message({
            showClose:true,
            message:'用户上线成功',
            type:'success'
          })
          this.getList()
        } else {
          this.$message({
            showClose:true,
            message:data.data.message?data.data.message:'用户上线失败',
            type:'error'
          })
        }
      })
    },
    // 删除用户
    remove(item){
      this.$api.userRecommenderDel({uid:item.uid},data=>{
        if(data.data.res_code==1){
          this.$message({
            showClose:true,
            message:'下线成功',
            type:'success'
          })
          this.getList()
        }else{
          this.$message({
            showClose:true,
            message:'下线失败',
            type:'error'
          })
        }
      })

    },
    // 
    searchbut(){
      this.$api.userSelect({uid:this.userid},data=>{
        console.log('嗖嗖的用户',data)
        if(data.status==200){
          if(data.data.res_code==1){
            this.userinfoone = data.data.result
          }else{
            this.userinfoone = ""
          }
        }else{
          this.$message({
            showClose:true,
            message:'搜搜失败！',
            type:'error'
          })
        }
      })
    },
    addNewUser(){
      console.log('添加推荐人',this.userinfoone)
      this.$api.userRecommenderAdd({uid:this.userinfoone.uid,nickName:this.userinfoone.nickName,headUrl:this.userinfoone.headUrl,sortId:this.userinfoone.sortId},data=>{
        console.log(data)
        if (data.data.res_code==1) {
          this.dialogVisible = false
          this.$message({
            showClose:true,
            message:'添加成功！',
            type:'success'
          })
          this.getList()
        } else {
          this.$message({
            showClose:true,
            message:'添加失败！',
            type:'error'
          })
        }
      })
    },
    // 添加推荐人
    addNewBut () {
      console.log('添加推荐人')
      this.dialogVisible = true
      this.userinfoone = ""
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
.headerImg{
  max-height: 120px;
  max-width: 120px;
}
</style>
