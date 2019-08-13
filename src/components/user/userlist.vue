<template>
	<div id="userList">
		<transition name="fade">
		<div class="box" v-if="!showInfo">
			<div class="miantop">
			    <div class="maintopleft">
			    	<el-input class="w150 mgr5" clearable size="mini" v-model="searchData.nickName" placeholder="用户昵称"></el-input>
			    	<el-input class="w150 mgr5" type="number" clearable size="mini" v-model="searchData.uid" placeholder="用户ID"></el-input>
			    	<el-input class="w150 mgr5" type="number" clearable size="mini" v-model="searchData.phoneNumber" placeholder="手机号码"></el-input>
			    	<template v-if="!itemdata">
			    	<el-select class="w150 mgr5" @change="searchUser" clearable size="mini" v-model="searchData.userType" placeholder="用户类型">
			    		 <el-option label="非会员" value="0"></el-option>
			    		 <el-option label="会员" value="1"></el-option>
			    		 <el-option label="体验会员" value="2"></el-option>
  					</el-select>
  					<el-select class="w150 mgr5" @change="searchUser" clearable size="mini" v-model="searchData.userIdentity" placeholder="用户身份">
			    		 <el-option label="用户" value="0"></el-option>
			    		 <el-option label="店主" value="1"></el-option>
			    		 <el-option label="供货商" value="2"></el-option>
  					</el-select>
  					<el-select class="w150 mgr5" @change="searchUser" clearable size="mini" v-model="searchData.userLevel" placeholder="用户等级">
			    		 <el-option label="非会员" value="0"></el-option>
			    		 <el-option label="会员" value="1"></el-option>
			    		 <el-option label="经理" value="2"></el-option>
			    		 <el-option label="总监" value="3"></el-option>
			    		 <el-option label="体验会员" value="9"></el-option>
  					</el-select>
  					<el-select class="w150 mgr5" @change="searchUser" clearable size="mini" v-model="searchData.platform" placeholder="用户平台">
			    		 <el-option label="安卓" value="1"></el-option>
			    		 <el-option label="IOS" value="2"></el-option>
			    		 <el-option label="PC" value="3"></el-option>
			    		 <el-option label="GZH" value="4"></el-option>
  					</el-select>
					<el-input class="w150" size="mini" clearable v-model="searchData.inviteCode" placeholder="邀请码"></el-input>
					</template>
			    </div>
			    <div class="flex flexvcenter mgr5">
			    	<el-button size="mini" @click="searchUser" type="primary" icon="el-icon-search">搜索</el-button>
			    	<el-button size="mini" @click="allUser" type="primary">全部</el-button>
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
			            fixed
			            type="index"
			            label="排序">
			          </el-table-column>
			          <el-table-column
			            prop="nickName"
			            label="用户昵称"
			            width="100">
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
			            	<div><el-button @click="changeUserPar(scope.row)" size="mini" type="warning">修改上级</el-button></div>
			            </template>
			          </el-table-column>
			          <el-table-column
			            prop="parentName"
			            label="上级名称"
			            width="100">
			          </el-table-column>
			          <el-table-column
			            prop="parentName"
			            label="导出团队所有用户"
			            width="100">
			            <template slot-scope="scope">
			            	<el-button  v-loading.fullscreen.lock="fullscreenLoading" type="warning" @click="upUserTeam(scope.row)" size="mini">导出团队</el-button>
			            </template>
			          </el-table-column>
			          <el-table-column
			            prop="inviteCode"
			            label="邀请码"
			            width="100">
			          </el-table-column>
			          <el-table-column
			          	align="center"
			            label="用户类型"
			            width="120">
			            <template slot-scope="scope">
			            	<el-tag class="mgb5" v-if="scope.row.userType==1" size="small" type="warning">会员</el-tag>
			            	<el-tag class="mgb5" v-if="scope.row.userType==2" size="small" type="danger">体验会员</el-tag>
			            	<el-tag class="mgb5" v-if="scope.row.userType==0" size="small" type="success">非会员</el-tag>
			            	<div v-if="scope.row.userType==1" class="mgb5">
				            	<el-button class="minbut" type="danger" @click="changeToMember(scope.row)" size="small">取消会员</el-button>
				            </div>
				            <div v-else class="mgb5">
				            	<el-button class="minbut" type="success" @click="changeToMember(scope.row)" size="small">改为会员</el-button>
				            </div>
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
			            	<span v-if="scope.row.userLevel==9">体验会员</span>
			            	<div><el-button type="success" class="minbut" @click="changeUserLevel(scope.row)" size="small">修改</el-button></div>
			            </template>
			          </el-table-column>
			          <el-table-column
			            prop="sex"
			            label="性别"
			            width="50">
			            <template slot-scope="scope">
			            	<el-tag size="mini" v-if="scope.row.sex==1">男</el-tag>
			            	<el-tag size="mini" v-if="scope.row.sex==0" type="success">女</el-tag>
			            </template>
			          </el-table-column>
			          <el-table-column
			            prop="registerTime"
			            label="注册时间"
			            width="150">
			          </el-table-column>
			          <el-table-column
			            label="用户来源"
			            width="110">
			            <template slot-scope="scope">
			            	<el-tag v-if="scope.row.source==1" size="small" type="warning">微信</el-tag>
			            	<el-tag v-if="scope.row.source==2" size="small" type="success">APP</el-tag>
			            	<el-tag v-if="scope.row.source==3" size="small">PC</el-tag>
			            </template>
			          </el-table-column>
			          <el-table-column
			            label="用户状态">
			            <template slot-scope="scope">
			            	<el-tag v-if="scope.row.state==1">正常</el-tag>
			            	<el-tag v-else>封禁中</el-tag>
			            </template>
			          </el-table-column>
			          <el-table-column
			          	v-if="itemdata"
			            fixed="right"
			            align="center"
			            label="操作">
			            <template slot-scope="scope">
			            	<el-button type="warning" @click="chooseuser(scope.row)" size="small">选择</el-button>
			            </template>
			          </el-table-column>
			          <el-table-column
			          	v-else
			            align="center"
			            fixed="right"
			            label="操作">
			            <template slot-scope="scope">
			            <!-- <div class="mgb5">
			            	<el-button class="minbut" type="primary" @click="lookUser(scope.row)" size="small">查看</el-button>
			            </div> -->
			            <div>
			            	<el-button class="minbut" type="warning" @click="userDel(scope.row)" size="small">封禁</el-button>
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
			<el-scrollbar class="noxscroll" style="width:100%;height:100%">
				<h1 class="title on">用户信息</h1>
				<el-form ref="form" :model="oneUser" style="width:60%;margin-left:20%;" label-width="120px">
				  <el-form-item label="用户ID">
				    <span>123131231231231312312</span>
				  </el-form-item>
				  <el-form-item label="用户昵称">
				    <el-input v-model="form.name"></el-input>
				  </el-form-item>
				  <el-form-item label="上级">
				    <span class="mgr10 on">无敌屁猫</span>
				    <el-button @click="changeUp" type="warning" size="mini">修改</el-button>
				  </el-form-item>
				  <el-form-item label="冻结">
				    <el-radio-group v-model="form.resource">
				      <el-radio label="15天"></el-radio>
				      <el-radio label="30天"></el-radio>
				      <el-radio label="永久"></el-radio>
				    </el-radio-group>
				  </el-form-item>
				  <el-form-item label="用户等级">
				    <el-select v-model="form.region" placeholder="请选择用户等级">
				      <el-option label="普通" value="shanghai"></el-option>
				      <el-option label="金牌" value="beijing"></el-option>
				      <el-option label="经理" value="beijing"></el-option>
				      <el-option label="总监" value="beijing"></el-option>
				    </el-select>
				  </el-form-item>
				  <el-form-item label="手机号">
				    <el-input v-model="form.name"></el-input>
				  </el-form-item>
				  <el-form-item label="对应订单收益">
				    <el-radio-group v-model="form.resource">
				      <el-radio label="转移"></el-radio>
				      <el-radio label="不转移"></el-radio>
				    </el-radio-group>
				  </el-form-item>
				  <el-form-item label="备注">
				    <el-input type="textarea" v-model="form.desc"></el-input>
				  </el-form-item>
				  <el-form-item>
				    <el-button type="primary" @click="onSubmit">保存</el-button>
				    <el-button @click="closeMain">取消</el-button>
				  </el-form-item>
				</el-form>
			</el-scrollbar>
		</div>
		</transition>
		<!-- 修改上级弹出的内容 -->
		<el-dialog
		  title="修改用户上级"
		  :visible.sync="dialogVisible"
		  width="50%"
		  :before-close="handleClose">
		  <div>
		  	<div class="flexvcenter pad5"><span class="w100">用户昵称</span><span>{{changUser.nickName}}</span></div>
		  	<div class="flexvcenter pad5">
		  		<span class="w100">是否转移收益</span>
		  		<el-radio v-model="isMigrateCommission" :label="0">不转移</el-radio>
  				<el-radio v-model="isMigrateCommission" :label="1">转移</el-radio>
		  	</div>
		  	<div class="flexvcenter pad5"><span class="w100">上级用户</span><el-button @click="chooseUserFun" type="primary" size="mini">选择</el-button></div>
		  	<div>
                <table cellspacing="0" class="tab">
                    <tr>
                      <td>上级用户ID</td>
                      <td class="flex1">上级用户昵称</td>
                      <!-- <td>用户头像</td> -->
                    </tr>
                    <tr>
                      <td>{{usersitem.uid}}</td>
                      <td class="flex1">{{usersitem.nickName}}</td>
                      <!-- <td><img :src="usersitem.headUrl"></td> -->
                    </tr>
                </table>
          	</div>
		  </div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="sureChangeUserPar">确 定</el-button>
		  </span>
		</el-dialog>
		<!-- 选择用户 -->
		<el-dialog
	        :title="选择用户"
	        :visible.sync="dialogVisible2"
	        width="80%"
	        class="mg5vh"
	        @close="clospageCom"
	        :before-close="handleClose">
	        <user @closepage="clospageCom" v-model="usersitem" itemdata="choose"></user>
	    </el-dialog>
	    <!-- 修改用户等级 -->
	    <el-dialog
		  title="修改用户等级"
		  :visible.sync="dialogVisible3"
		  width="50%"
		  :before-close="handleClose">
		  <div>
		  	<div class="flexvcenter pad5"><span class="w100">用户昵称</span><span>{{changUser.nickName}}</span></div>
		  	<div class="flexvcenter pad5">
		  		<span class="w100">用户等级</span>
		  		<el-select v-model="changUser.userLevel" placeholder="用户等级">
				    <el-option label="非会员" :value="0"></el-option>
				    <el-option label="会员" :value="1"></el-option>
				    <el-option label="经理" :value="2"></el-option>
				    <el-option label="总监" :value="3"></el-option>
				    <el-option label="体验会员" :value="9"></el-option>
				</el-select>
		  	</div>
		  </div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible3 = false">取 消</el-button>
		    <el-button type="primary" @click="sureChangeUserLever">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>

<script type="text/javascript">
import user from '@/components/user/userlist2'

export default {
  name: 'userlistinfo',
  props:['itemdata'],
  components:{
	user
  },
  data () {
    return {
    	postData:{
    		pageIndex:1
    	},
    	searchData:{},
    	list:'',
    	// 单个用户信息
    	oneUser:'',
    	// 选择的用户信息
    	usersitem:"",
    	// 
    	changUser:'',
    	// 是否显示修改上级box
    	dialogVisible:false,
    	// 选择用户
    	dialogVisible2:false,
    	// 修改用户等级
    	dialogVisible3:false,
    	page:{
    		num:''
    	},
    	// 全局loading
    	fullscreenLoading:false,
    	// 修改上级是否转移收益
    	isMigrateCommission:0
    }
  },
  created(){
  	this.getList()
  },
  methods: {
  	//兼容360下载
  	downloadFile (sUrl) {
  		console.log('navigator',navigator.userAgent)
  		// let isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
  		// let isSafari = navigator.userAgent.toLowerCase().indexOf('safari') > -1;
  		let isChrome = navigator.userAgent.indexOf('chrome') > -1;
  		let isSafari = navigator.userAgent.indexOf('safari') > -1;
	    //iOS devices do not support downloading. We have to inform user about this.
	    if (/(iP)/g.test(navigator.userAgent)) {
	        alert('Your device does not support files downloading. Please try again in desktop browser.');
	        return false;
	    }

	    //If in Chrome or Safari - download via virtual link click
	    if (isChrome || isSafari) {
	        //Creating new link node.
	        var link = document.createElement('a');
	        link.href = sUrl;

	        if (link.download !== undefined) {
	            //Set HTML5 download attribute. This will prevent file from opening if supported.
	            var fileName = sUrl.substring(sUrl.lastIndexOf('/') + 1, sUrl.length);
	            link.download = fileName;
	        }

	        //Dispatching click event.
	        if (document.createEvent) {
	            var e = document.createEvent('MouseEvents');
	            e.initEvent('click', true, true);
	            link.dispatchEvent(e);
	            return true;
	        }
	    }

	    // Force file download (whether supported by server).
	    // if (sUrl.indexOf('?') === -1) {
	    //     sUrl += '?download';
	    // }

	    window.open(sUrl, '_self');
	    return true;
	},
  	// 导出用户团队
  	upUserTeam(item){
  		console.log('导出团队',item)
  		this.fullscreenLoading = true
  		this.$api.getUserTeam({uid:item.uid}).then(data=>{
  			console.log('then',data)
  			this.fullscreenLoading = false
  			if(data){
	          // this.downloadFile(data.data)
	          if(!!window.ActiveXObject || "ActiveXObject" in window) {
				console.log('ie浏览器')
				let blob = new Blob([data.data])
				let fileName = '用户团队列表.xlsx'
				navigator.msSaveBlob(blob, fileName)
		  	  } else {
		  	  	var content = data.data
				var elink = document.createElement('a');
				var blob = new Blob([content]);
				elink.download = "用户团队列表.xlsx";
				elink.style.display = 'none';
				elink.href = URL.createObjectURL(blob)
				document.body.appendChild(elink)
				elink.click()
				document.body.removeChild(elink)
				window.URL.revokeObjectURL(blob)
		  	  }
	        }else{
	          this.$message({
	            showClose:true,
	            message:'用户团队导出失败',
	            type:'error'
	          })
	        }
  		}).catch(data=>{
  			console.log('catch',data)
  			this.fullscreenLoading = false
  			this.$message({
	            showClose:true,
	            message:'用户团队导出失败',
	            type:'error'
	        })
  		})
  	},
  	// 搜索
  	searchUser () {
  		console.log('搜索')
  		for (let i in this.searchData) {
  			this.postData[i] = this.searchData[i]
  		}
  		this.postData.pageIndex=1
  		this.getList()
  	},
  	// 全部用户
  	allUser () {
  		console.log('全部用户')
  		this.postData = {
  			pageIndex:1
  		}
  		this.searchData = {}
  		this.getList()
  	},
  	// 获取用户列表
  	getList () {
  		console.log('获取用户列表')
  		console.log(this.postData)
  		this.$api.userList(this.postData,data=>{
  			console.log(data)
  			if(data.status==200){
  				if(data.data.res_code==1){
  					data.data.result.map(val=>{
  						val.registerTime = this.$utils.getTime(val.registerTime)
  					})
  					this.list = data.data.result
  				}else{
  					this.list = ''
  				}
  				this.page.num = data.data.total
  			}else{
  				this.$message({
  					showClose:true,
  					message:'获取用户列表失败',
  					type:'error'
  				})
  			}
  		})
  	},
  	// 关闭用户
  	clospageCom(){
  		this.dialogVisible2 = false
  	},
  	pageChange(item){
  		this.postData.pageIndex = item
  		this.getList()
  	},
  	// 用户封禁
  	userDel (row) {
  		console.log('用户封禁')
  		this.$confirm('确定将用户 '+row.nickName+' 封禁?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          this.$api.userDel({uid:row.uid},data=>{
          	console.log(data)
          	if(data.data.res_code==1){
          		this.$message({
		            type: 'success',
		            message: '封禁成功！',
		            showClose:true
		        })   
		        this.getList() 
          	}else{
          		this.$message({
		            type: 'success',
		            message: '封禁失败！',
		            showClose:true
		        })   
          	}
  		  })
        }).catch(() => {
               
        })
  	},
  	// 选择用户
  	chooseuser(item){
  		this.$emit('input',item)
  		this.$emit('closepage')
  	},
  	lookUser (row) {
  		// 查看单个用户
  		console.log(row)
  		let that = this
  		that.getOneUser(row.uid)
  		that.showInfo = true
  	},
  	// 选择用户
  	chooseUserFun(){
  		this.dialogVisible2 = true
  	},
  	sureChangeUserLever(){
  		this.$api.changeUserLevel({uid:this.changUser.uid,userLevel:this.changUser.userLevel},data=>{
          	console.log('修改用户等级',data)
          	if (data.data.res_code==1) {
          		this.$message({
		            type: 'success',
		            message: '修改成功!',
		            showClose:true
		        })
		        this.dialogVisible3 = false
		        this.getList()
          	} else {
          		this.$message({
		            type: 'error',
		            message: '修改失败！',
		            showClose:true
		        })   
          	}
        })
  	},
  	// 修改用户等级
  	changeUserLevel(row){
  		console.log('修改用户等级',row)
  		this.dialogVisible3 = true
  		this.changUser = row
  	},
  	// 修改用户上级
  	changeUserPar(row){
  		console.log('修改上级啊',row)
  		this.dialogVisible = true
  		this.changUser = row
  		this.usersitem = {
  			uid:row.parentId,
  			nickName:row.parentName
  		}
  	},
  	// 确定修改上级
  	sureChangeUserPar(){
  		this.$api.changeUserPar({uid:this.changUser.uid,isMigrateCommission:this.isMigrateCommission,parentId:this.usersitem.uid,parentName:this.usersitem.nickName},data=>{
  			console.log('确定修改上级',data)
  			if (data.data.res_code==1) {
          		this.$message({
		            type: 'success',
		            message: '修改成功!',
		            showClose:true
		        })
		        this.dialogVisible = false
		        this.getList()
          	} else {
          		console.log('data.data.message',data.data,data.data.message)
          		this.$message({
		            type: 'error',
		            message: data.data.message?data.data.message:'修改失败！',
		            showClose:true
		        })
          	}
  		})
  	},
  	// 改为会员
  	changeToMember(row){
  		console.log('改为会员',row)
  		this.$confirm('确定将用户 '+row.nickName+' '+(row.userType==1?'取消会员':'改为会员')+' ?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          this.$api.changeUserMenber({uid:row.uid,userType:row.userType==1?0:1},(data)=>{
          	console.log('cab',data)
          	if (data.data.res_code==1) {
          		this.$message({
		            type: 'success',
		            message: '修改成功!',
		            showClose:true
		        })
		        this.getList()
          	} else {
          		this.$message({
		            type: 'error',
		            message: '修改失败！',
		            showClose:true
		        })   
          	}
          })
        }).catch(() => {
                  
        });
  	},
  	// 查询单个用户信息
  	getOneUser (item) {
  		this.$api.userSelect({uid:item},data=>{
  			console.log('单个用户',data)
  			if (data.data.res_code==1) {
  				this.oneUser = data.data.result
  			} else {
  				this.$message({
  					showClose:true,
  					message:'用户信息查询失败'
  				})
  			}
  		})
  	},
  	closePage (data) {
  		// 关闭专题详情
  		console.log('关闭秒杀详情')
  		console.log(data)
  		this.showInfo = false
  	},
  	changeUp () {
  		// 修改上级
  		console.log('修改上级')
  		this.dialogVisible = true
  	},
  	closeMain () {
  		// 关闭用户编辑页面
  		console.log('关闭用户编辑页面')
  		this.showInfo = false
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
.w200{
	width: 200px;
}
.box2{
	height: 100%;
	width: 100%;
}
.w100{
	width: 100px;
}
.w150{
	width: 100px !important;
}
.headimg{
	max-height: 100px;
	max-height: 100px;
}
</style>
