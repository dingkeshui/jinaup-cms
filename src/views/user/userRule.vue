<template>
	<div id="userList">
		<div class="box">
			<div class="miantop">
			    <div class="maintopleft">
            <el-input class="w200 mgr5" size="small" clearable v-model="searchData.uid" placeholder="用户ID"></el-input>
			    </div>
			    <div class="flex flexvcenter pad10">
			    	<el-button size="small" @click="searchUser" type="primary" icon="el-icon-search">搜索</el-button>
			    	<el-button size="small" @click="addbut" type="primary">添加规则</el-button>
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
      					type="index"
      					width="50">
    				  </el-table-column>
    				  <el-table-column
      					prop="ulrid"
      		      label="规则ID">
				      </el-table-column>
              <el-table-column
                prop="inviteNumber"
                label="邀请人数">
              </el-table-column>
              <el-table-column
                prop="turnover"
                label="交易金额">
              </el-table-column>
              <el-table-column
                prop="userLevel"
                label="用户等级">
              </el-table-column>
              <el-table-column
                label="优先级">
                <template slot-scope="scope">
                  <el-tag v-if="scope.row.priority==1" type="success">邀请人数</el-tag>
                  <el-tag v-else type="warning">交易额</el-tag>
                </template>
              </el-table-column>
		          <el-table-column
		            fixed="right"
		            label="操作">
		            <template slot-scope="scope">
                  <div class="mgb5"><el-button class="minbut" @click="changebut(scope.row)" type="primary" size="small">编辑</el-button></div>
		              <div class="mgb5"><el-button class="minbut" @click="removebut(scope.row)" type="warning" size="small">删除</el-button></div>
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
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose">
      <div class="flex mgb10">
        <div style="width:100px;">邀请人数</div>
        <div class="flex1"><el-input placeholder="邀请人数" v-model="form.inviteNumber" size="small"></el-input></div>
      </div>
      <div class="flex mgb10">
        <div style="width:100px;">交易额</div>
        <div class="flex1"><el-input placeholder="交易额"  v-model="form.turnover" size="small"></el-input></div>
      </div>
      <div class="flex mgb10">
        <div style="width:100px;">用户等级</div>
        <el-select class="w150 mgr5" size="small"  v-model="form.userLevel" placeholder="用户身份">
               <el-option label="v0" value="0"></el-option>
               <el-option label="v1" value="1"></el-option>
               <el-option label="v1.1" value="2"></el-option>
               <el-option label="v2" value="3"></el-option>
               <el-option label="v2.2" value="4"></el-option>
               <el-option label="v3" value="5"></el-option>
               <el-option label="v3.3" value="6"></el-option>
        </el-select>
      </div>
      <div class="flex mgb10">
        <div style="width:100px;">优先权</div>
        <el-select class="w150 mgr5" size="small"  v-model="form.priority" placeholder="优先权">
               <el-option label="邀请人数" value="1"></el-option>
               <el-option label="交易额" value="2"></el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button v-if="isaddnew" type="primary" @click="addnewfun">添加规则</el-button>
        <el-button v-else type="primary" @click="changefun">保存编辑</el-button>
      </span>
    </el-dialog>
	</div>
</template>

<script type="text/javascript">

export default {
  name: 'userRule',
  data () {
    return {
    	postData:{
    		pageIndex:1
    	},
    	list:'',
    	searchData:{},
    	dialogVisible:false,
      form:{},
      // 是添加还是编辑
      isaddnew:true,
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
  	// 获取用户购买力列表
  	getList () {
  		console.log('获取用户升级规则列表')
  		console.log(this.postData)
  		this.$api.userUpgradeList(this.postData,data=>{
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
  					message:'获取用户升级规则列表失败',
  					type:'error'
  				})
  			}
  		})
  	},
    pageChange(item){
      this.postData.pageIndex = item
      this.getList()
    },
    // 添加规则
    addnewfun(){
      this.$api.userUpgradeAdd(this.form,data=>{
        console.log(data)
        if (data.status==200) {
          this.$message({
            showClose:true,
            message:'添加成功',
            type:'success'
          })
          this.dialogVisible = false
          this.getList()
        } else {
          this.$message({
            showClose:true,
            message:'添加失败',
            type:'error'
          })
        }
      })
    },
    // 保存编辑
    changefun () {
      this.$api.userUpgradeUpdata(this.form,data=>{
        console.log(data)
        if (data.status==200) {
          this.$message({
            showClose:true,
            message:'添加成功',
            type:'success'
          })
          this.dialogVisible = false
          this.getList()
        } else {
          this.$message({
            showClose:true,
            message:'添加失败',
            type:'error'
          })
        }
      })
    },
  	// 全部用户
  	allUser () {
  		this.postData={
  			pageIndex:1
  		}
  		this.getList()
  	},
    // 添加规则
    addbut () {
      this.isaddnew = true
      this.dialogVisible = true
      this.form = {}
    },
    // 编辑规则
    changebut (item) {
      this.isaddnew = false
      this.dialogVisible = true
      this.form = {
        ulrid:item.ulrid,
        inviteNumber:item.inviteNumber,
        turnover:iem.turnover,
        userLevel:item.userLevel,
        priority:item.priority
      }
    },
    removebut(item){
      console.log('删除规则')
      this.$api.userUpgradeDel({ulrid:item.ulrid},data=>{
        console.log(data)
        if (data.data.res_code==1) {
          this.$message({
            showClose:true,
            message:'删除成功',
            type:'success'
          })
          this.getList()
        } else {
          this.$message({
            showClose:true,
            message:'删除失败',
            type:'error'
          })
        }
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
	max-height: 150px;
	max-height: 150px;
}
.w200{
  width: 200px;
}
</style>
