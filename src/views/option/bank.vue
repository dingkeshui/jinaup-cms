<template>
  <div class="box">
  	<div v-if="showbox1" class="box1 flex2">
  		<div class="pad10 flex">
  			<div class="flex1"></div>
  			<div class="flex flexcenter">
  				<el-button @click="addnewfun" type="primary" size="mini">添加银行</el-button>
  			</div>
  		</div>
  		<div class="flex1" style="position:relative;">
        <div class="tablebox">
  			<el-table
	          :data="list"
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
	            prop="banckName"
	            label="银行呢称">
	          </el-table-column>
	          <el-table-column
	            prop="banckCode"
	            label="银行编码">
	          </el-table-column>
	           <el-table-column
	            prop="sortId"
	            label="排序ID">
	          </el-table-column>
	           <el-table-column
	            label="PC端图片"
	            width="100">
	            <template slot-scope="scope">
	            	<div class="imgbox">
	            		<img :src="scope.row.pcPicUrl">
	            	</div>
	            </template>
	          </el-table-column>
	           <el-table-column
	            label="APP端图片"
	            width="100">
	            <template slot-scope="scope">
	            	<div class="imgbox">
	            		<img :src="scope.row.appPicUrl">
	            	</div>
	            </template>
	          </el-table-column>
	          <el-table-column
	            fixed="right"
	            label="操作"
	            width="100">
	            <template slot-scope="scope">
	              <div class="mgb10"><el-button type="primary" class="minbut" @click="changeBank(scope.row)" size="small">修改</el-button></div>
	              <div><el-button type="waring" class="minbut" @click="delBank(scope.row)" size="small">删除</el-button></div>
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
  	<bankinfo v-else :branckinfo="branckinfo" @clospage="clospage"></bankinfo>
  </div>
</template>

<script type="text/javascript">
import bankinfo from '@/components/bank/bankinfo.vue'

export default {
  name: 'bank',
  components:{
  	bankinfo
  },
  data () {
  	return {
  		showbox1:true,
  		postData:{
  			pageIndex:1
  		},
  		// 银行信息列表
  		list:'',
  		// 银行组件传递的值
  		branckinfo:"",
      page:{
        num:''
      }
  	}
  },
  created(){
  	this.getList()
  },
  methods:{
  	getList () {
  		console.log('获取银行列表')
  		let that = this
  		that.$api.banckInfoList(that.postData,(data)=>{
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
		          message: '抱歉，银行列表获取失败！',
		          type: 'error'
		        })
  			}
  		})
  	},
    pageChange(item){
      this.postData.pageIndex = item
      this.getList()
    },
  	// 添加银行
  	addnewfun () {
  		console.log('添加银行')
  		let that = this
  		that.showbox1 = false
  		that.branckinfo = ""
  	},
  	// 修改银行
  	changeBank (data) {
  		console.log('修改银行')
  		console.log(data)
  		let that = this
  		that.showbox1 = false
  		that.branckinfo = data
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
  	// 删除银行
  	delBank (item) {
  		console.log('删除银行')
  		console.log(item)
  		let that = this
  		that.$confirm('确定将 '+item.banckName+' 银行信息删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async ()=>{
        	that.$api.banckInfoDel({biid:item.biid}, (data)=>{
	  			console.log(data)
	  			if (data.data.res_code==1) {
	  				that.$message({
	  					showClose:true,
	  					message:'银行删除成功',
	  					type:'success'
	  				})
	  				that.postData.pageIndex = 1
	  				that.getList()
	  			} else {
	  				that.$message({
	  					showClose:true,
	  					message:'银行删除失败',
	  					type:'error'
	  				})
	  			}
	  		})
        }).catch(()=>{
        	console.log('取消了确定删除')
        })
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
