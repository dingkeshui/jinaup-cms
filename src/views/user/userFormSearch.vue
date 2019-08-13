<template>
	<div id="userList">
		<div class="box">
			<div class="miantop">
			    <div class="maintopleft">
            <el-input class="w200 mgr5" size="small" v-model="searchData.uid" placeholder="用户ID"></el-input>
			    </div>
			    <div class="flex flexvcenter pad10">
            <el-button size="small" @click="searchUser('a')" type="primary" icon="el-icon-search">查询直属下级</el-button>
			    	<el-button size="small" @click="searchUser('b')" type="primary" icon="el-icon-search">查询上级</el-button>
			    </div>
			</div>
      <div class="maincontent">
        <div class="tablebox">
          <el-table
                :data="list"
                border
                stripe
                height="100%"
                style="width: 100%"
                class="mytabel">
                <el-table-column
                  fixed
                  type="index"
                  label="排序">
                </el-table-column>
                <el-table-column
                  prop="nickName"
                  label="用户昵称">
                </el-table-column>
                <el-table-column
                  prop="uid"
                  label="用户ID"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="phoneNumber"
                  label="用户电话"
                  width="100">
                </el-table-column>
                <el-table-column
                  label="用户头像"
                  width="120">
                  <template slot-scope="scope">
                    <img class="headimg" :src="scope.row.headUrl">
                  </template>
                </el-table-column>
                <el-table-column
                  label="用户身份"
                  width="120">
                  <template slot-scope="scope">
                    <el-tag v-if="scope.row.userIdentity==0" size="small">用户</el-tag>
                    <el-tag v-if="scope.row.userIdentity==1" type="success" size="small">店主</el-tag>
                    <el-tag v-if="scope.row.userIdentity==2" type="warning" size="small">供货商</el-tag>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="parentId"
                  align="center"
                  label="上级ID"
                  width="100">
                  <template slot-scope="scope">
                    <span>{{scope.row.parentId}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="parentName"
                  label="上级名称"
                  width="100">
                </el-table-column>
                <el-table-column
                  align="center"
                  label="用户类型"
                  width="120">
                  <template slot-scope="scope">
                    <el-tag class="mgb5" v-if="scope.row.userType==1" size="small" type="warning">会员</el-tag>
                    <el-tag class="mgb5" v-else size="small" type="success">非会员</el-tag>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="userLevel"
                  label="用户等级"
                  align="center"
                  width="100">
                  <template slot-scope="scope">
                    <span class="on" v-if="scope.row.userLevel==0">非会员</span>
                    <span class="suc" v-if="scope.row.userLevel==1">会员</span>
                    <span class="warning" v-if="scope.row.userLevel==2">经理</span>
                    <span class="red" v-if="scope.row.userLevel==3">总监</span>
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
	</div>
</template>

<script type="text/javascript">

export default {
  name: 'userformsearch',
  data () {
    return {
    	postData:{
    		pageIndex:1
    	},
    	list:'',
    	searchData:{},
      page:{
        num:''
      },
      // 选中的面板
      activeNames:[]
    }
  },
  created(){
  	// this.getList()
  },
  methods: {
    // 面板点击
    handleChange(item){
      console.log('面板点击',item)
    },
  	// 搜索
  	searchUser (item) {
  		console.log('搜索')
  		for (let i in this.searchData) {
  			this.postData[i] = this.searchData[i]
  		}
      this.searchType = item
  		this.postData.pageIndex=1
  		this.getList()
  	},
  	// 获取直属下级
  	getList () {
      if (this.searchType=='a') {
        console.log('获取直属下级',this.postData)
        this.$api.userSelectSub(this.postData,data=>{
          console.log(data)
          if(data.status==200){
            if(data.data.res_code==1){
              this.list = data.data.result
            }else{
              this.list = ''
              this.$message({
                showClose:true,
                message:data.data.message,
                type:'error'
              })
            }
            console.log('list',this.list)
            this.page.num = data.data.total
          }else{
            this.$message({
              showClose:true,
              message:'查询失败',
              type:'error'
            })
          }
        })
      } else {
        console.log('获取直属上级',this.postData)
        this.$api.userSelectParent(this.postData,data=>{
          console.log(data)
          if(data.status==200){
            if(data.data.res_code==1){
              this.list = data.data.result
            }else{
              this.list = ''
              this.$message({
                showClose:true,
                message:data.data.message,
                type:'error'
              })
            }
            console.log('list',this.list)
            this.page.num = data.data.total
          }else{
            this.$message({
              showClose:true,
              message:'查询失败',
              type:'error'
            })
          }
        })
      }
  	},
    pageChange(item){
      this.postData.pageIndex = item
      this.getList()
    },
  	// 全部用户
  	allUser () {
  		this.postData={
  			pageIndex:1
  		}
  		this.getList()
  	},
  	adoptuser (row) {
  		// 通过
  		console.log('通过')
  		this.$api.getUserAuthInfoUpdata({uid:row.uid,state:1},data=>{
  			console.log(data)
  			if (data.data.res_code==1) {
  				this.$message({
  					showClose:true,
  					message:'用户认证通过',
  					type:'success'
  				})
  				this.getList()
  			}else{
  				this.$message({
  					showClose:true,
  					message:'用户认证失败',
  					type:'success'
  				})
  			}
  		})
  	},
  	rejectuser (row) {
  		console.log('驳回')
  		this.$prompt('请输入驳回原因', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(async ({ value }) => {
        	console.log('确定驳回')
         	this.$api.getUserAuthInfoUpdata({uid:row.uid,state:2,refuseReason:value},data=>{
         		if (data.data.res_code==1) {
	  				this.$message({
	  					showClose:true,
	  					message:'用户认证驳回成功',
	  					type:'success'
	  				})
  					this.getList()
	  			}else{
	  				this.$message({
	  					showClose:true,
	  					message:'用户认证驳回失败',
	  					type:'success'
	  				})
	  			}
         	})
        }).catch(() => {
          	console.log('取消驳回')
        })
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
.idimg{
	max-height: 100px;
	max-height: 100px;
}
.w200{
  width: 200px;
}
.headimg{
  max-height: 100%;
  max-width: 100%;
}
</style>
