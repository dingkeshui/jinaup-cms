<template>
	<div id="userList">
		<div v-if="showBox1" class="box">
			<div class="miantop">
			    <div class="maintopleft">
			    </div>
			    <div class="flex flexvcenter pad10">
			    	<!-- <el-button size="small" @click="searchUser" type="primary" icon="el-icon-search">搜索</el-button> -->
			    	<el-button size="small" @click="addbut" type="primary">添加权限</el-button>
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
    					  prop="caid"
    		        label="权限ID">
    				  </el-table-column>
              <el-table-column
                prop="caName"
                label="权限昵称">
              </el-table-column>
              <el-table-column
                prop="caUrl"
                label="caUrl">
              </el-table-column>
              <el-table-column
                prop="cmsType"
                label="cmsType">
              </el-table-column>
              <el-table-column
                prop="caParentId"
                label="caParentId">
              </el-table-column>
    				  <el-table-column
                prop="isExistUrl"
                label="isExistUrl">
              </el-table-column>
              <el-table-column
                prop="caSort"
                label="caSort">
              </el-table-column>
    				  <el-table-column
    					  min-width="120"
                label="操作">
    					  <template slot-scope="scope">
                  <div class="mgb5">
                    <el-button size="small" @click="change(scope.row)" type="primary">编辑</el-button>
                  </div>
                  <div>
                    <el-button size="small" @click="remove(scope.row)" type="warning">删除</el-button>
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
      <shopauthadd :pagedata="pagedata" @closepage="closepage"></shopauthadd>
    </div>
	</div>
</template>

<script type="text/javascript">
import shopauthadd from '@/components/shop/shopAuthAdd.vue'

export default {
  name: 'shopauthlist',
  components:{
    shopauthadd
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
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
  	// 获取商户权限信息
  	getList () {
  		console.log('获取商户权限信息')
  		console.log(this.postData)
  		this.$api.supAuthList(this.postData,data=>{
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
  					message:'获取商户权限信息列表失败',
  					type:'error'
  				})
  			}
  		})
  	},
    // 删除权限
    remove(item){
      this.$api.supAuthDel({caid:item.caid},data=>{
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
