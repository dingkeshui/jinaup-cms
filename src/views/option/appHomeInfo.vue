<template>
  <div class="box">
  	<div v-if="showbox1" class="box1 flex2">
  		<div class="pad10 flex">
  			<div class="flex1">
          <el-select size="mini" clearable @change="searchFun" v-model="searchData.state" placeholder="状态">
            <el-option label="上线中" value="1"></el-option>
            <el-option label="下线中" value="0"></el-option>
          </el-select>   
        </div>
  			<div class="flex flexcenter">
  				<el-button @click="addnewfun" type="primary" size="mini">添加数据</el-button>
  			</div>
  		</div>
  		<div class="flex1" style="position:relative;">
        <div class="tablebox">
  			<el-table
	          :data="listdata"
	          border
	          stripe
	          height="100%"
	          style="width: 100%">
	          <el-table-column
  	          fixed="left"
  		        type="selection"
  		        width="55">
		        </el-table-column>
	          <el-table-column
  	          fixed="left"
  		        type="index"
  		        width="50">
		        </el-table-column>
	          <el-table-column
	            prop="alias"
	            label="别名">
	          </el-table-column>
            <el-table-column
              prop="pageName"
              label="模板类型">
            </el-table-column>
            <el-table-column
              label="背景图片"
              width="100">
              <template slot-scope="scope">
                <div class="imgbox">
                  <img :src="scope.row.pictUrl">
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="phid"
              label="数据ID">
            </el-table-column>
	          <el-table-column
              prop="contentTypeName"
	            label="数据类型">
	          </el-table-column>
            <el-table-column
              prop="contentValue"
              label="数据类型值">
            </el-table-column>
            <el-table-column
              width="100"
              label="可见类型">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.visibleType==0" size="small">全部可见</el-tag>
                <el-tag v-if="scope.row.visibleType==1" size="small" type="danger">普通可见</el-tag>
                <el-tag v-if="scope.row.visibleType==2" size="small" type="warning">Vip可见</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="pageSort"
              label="排序位置">
            </el-table-column>
	           <el-table-column
	            label="状态"
	            width="100">
	            <template slot-scope="scope">
                <el-tag v-if="scope.row.state==1">上线中</el-tag>
                <el-tag v-else type="danger">下线中</el-tag>
	            </template>
	          </el-table-column>
	          <el-table-column
	            fixed="right"
	            label="操作"
              align="center"
	            width="100">
	            <template slot-scope="scope">
	              <div class="mgb5"><el-button type="primary" class="minbut" @click="changeBank(scope.row)" size="small">修改</el-button></div>
                <div v-if="scope.row.pageType!=3" class="mgb5"><el-button type="primary" class="minbut" @click="changeMain(scope.row)" size="small">编辑内容</el-button></div>
	              <div v-if="scope.row.state==1"><el-button type="warning" class="minbut" @click="delAd(scope.row)" size="small">下线</el-button></div>
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
  	<div v-else style="width:100%;height:100%;">
      <homeinfo v-if="showCom=='homeinfo'" :pageinfo="adinfo" @closepage="closepage" :pagelist="getContentTypedata"></homeinfo>
      <homeinfomain v-if="showCom=='homeinfomain'" :itemdata="homeinfomain" :pagelist="getContentTypedata" @closepage="closepage"></homeinfomain>
    </div>
  </div>
</template>

<script type="text/javascript">
import homeinfo from '@/components/apphomeinfo/apphomeinfo.vue'
import homeinfomain from '@/components/apphomeinfo/apphomeinfomain.vue'

export default {
  name: 'apphomeinfo',
  components:{
    homeinfo,
    homeinfomain
  },
  data () {
  	return {
  		showbox1:true,
      addnew:true,
      searchData:{
        state:''
      },
  		postData:{
  			pageIndex:1
  		},
      // 传递的广告内容
      adinfo:'',
      form:{
        contentType:'',
        contentValue:''
      },
  		// 银行信息列表
  		list:'',
  		// 银行组件传递的值
  		branckinfo:"",
      // 广告类型
      getContentTypedata:'',
      // 首页模板列表
      getPageHomedata:'',
      page:{
        num:''
      }
  	}
  },
  created(){
  	this.getList()
    this.getAdList()
    this.getPageHome()
  },
  methods:{
    //搜搜
    searchFun(){
      if (this.searchData.state==1||this.searchData.state==0) {
        this.postData.state = this.searchData.state
      } else {
        delete this.postData.state
      }
      this.postData.pageIndex = 1
      this.getList()
    },
    // 添加内容
    changeMain(item){
      console.log('添加模板内容',item)
      this.showbox1 = false
      this.showCom = "homeinfomain"
      this.homeinfomain = item
    },
  	getList () {
  		let that = this
  		that.$api.pageHomeList(that.postData,(data)=>{
        console.log('获取首页数据列表')
  			console.log(data)
  			if(data.status==200){
  				if(data.data.res_code==1){
  					that.list=data.data.result
  				}else{
            that.list = ""
          }
          this.page.num = data.data.total
  			}else{
  				that.$message({
		          showClose: true,
		          message: '抱歉，数据列表获取失败！',
		          type: 'error'
		        })
  			}
  		})
  	},
    pageChange(item){
      this.postData.pageIndex = item
      this.getList()
    },
    // 父级关闭子页面
    closepage(data){
      console.log('父组件关闭子组件')
      this.showbox1 = true
      if(data=='new'){
        this.getList()
      }
    },
    // 获取首页模板列表
    getPageHome () {
      let that = this
      that.$api.getPageHome(data=>{
        console.log('获取首页模板列表')
        console.log(data)
        that.getPageHomedata = data.data.result
      })
    },
    // 获取广告列表
    getAdList(){
      this.$api.getContentType(data=>{
        console.log('广告类型')
        console.log(data)
        this.getContentTypedata=data.data.result
      })
    },
  	// 添加银行
  	addnewfun () {
  		console.log('添加广告')
  		let that = this
  		that.showbox1 = false
  		that.adinfo = ""
      that.showCom = "homeinfo"
  	},
  	// 修改广告
  	changeBank (data) {
  		console.log('修改银行')
  		console.log(data)
  		let that = this
  		that.showbox1 = false
      that.showCom = "homeinfo"
  		that.adinfo = data
  	},
  	// 关闭页面
  	clospage (item) {
  		console.log(item)
  		let that = this
  		if (item == 'new') {
  			that.postData.pageIndex = 1
  			that.getList()
  		}
  		that.showbox1 = true
  	},
  	// 删除广告
  	delAd (item) {
  		console.log('删除数据')
  		console.log(item)
  		let that = this
  		that.$confirm('确定将 '+item.alias +' 首页数据下线?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async ()=>{
        	that.$api.pageHomeDel({phid:item.phid}, (data)=>{
	  			console.log(data)
	  			if (data.data.res_code==1) {
	  				that.$message({
	  					showClose:true,
	  					message:'首页数据下线成功',
	  					type:'success'
	  				})
	  				that.getList()
	  			} else {
	  				that.$message({
	  					showClose:true,
	  					message:'首页数据下线失败',
	  					type:'error'
	  				})
	  			}
	  		})
        }).catch(()=>{
        	console.log('取消了确定删除')
        })
  	}
  },
  computed:{
    listdata () {
      if (this.list&&this.getContentTypedata) {
        this.list.map(val=>{
          this.getContentTypedata.map(data=>{
            if(data.contentType == val.contentType){
              val.contentTypeName = data.contentName
            }
          })
        })
      }
      console.log('计算属性',this.list)
      return this.list
    }
  }
}
</script>

<style type="text/css" scoped>
.box{
	width: 100%;
	height: 100%;
	background-color: #fff;
}
.box1,.box2{
	width: 100%;
	height: 100%;
}
.imgbox{
	width: 100%;
	height: 100%;
}
.imgbox img{
	max-height: 100%;
	max-width: 100%;
}
</style>
