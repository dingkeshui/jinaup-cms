<template>
	<div id="userList">
		<div class="box">
			<div class="miantop">
			    <div class="maintopleft">
					<el-input class="mgr10" style="width:200px;" placeholder="用户ID" v-model="searchData.uid" size="small"></el-input>	
					<el-select size="small" v-model="searchData.collectionType" clearable placeholder="请选择">
            <el-option label="商品" value="1"></el-option>
            <el-option label="专题" value="2"></el-option>
          </el-select>
			    </div>
			    <div class="flex flexvcenter pad10">
			    	<el-button size="small" @click="searchUser" type="primary" icon="el-icon-search">搜索</el-button>
			    	<el-button size="small" @click="allUser" type="primary">全部</el-button>
			    </div>
			</div>
			<div class="maincontent" v-loading="vloading">
        <div class="tablebox">
		        <el-table
		          :data="list"
		          border
		          stripe
		          height="100%">
    				  <el-table-column
    				  	fixed="left"
                label="排序"
      					type="index"
      					width="50">
    				  </el-table-column>
    				  <el-table-column
    					  prop="uid"
    		        label="用户ID"
    					  width="100">
    				  </el-table-column>
              <el-table-column
                prop="nickName"
                label="用户昵称"
                width="100">
              </el-table-column>
              <el-table-column
                prop="ucid"
                label="收藏ID"
                width="100">
              </el-table-column>
    				  <el-table-column
    		        label="收藏分类"
    					  width="100">
                <template slot-scope="scope">
                  <el-tag type="success" v-if="scope.row.collectionType==1">商品</el-tag>
                  <el-tag type="warning" v-else>专题</el-tag>
                </template>
    				  </el-table-column>
              <el-table-column
                prop="collectionValue"
                label="收藏值"
                width="100">
              </el-table-column>
              <el-table-column
                label="收藏商品图"
                width="120">
                <template slot-scope="scope">
                  <img v-if="scope.row.productInfoVo" class="idimg" :src="scope.row.productInfoVo.mainImgUrl">
                </template>
              </el-table-column>
              <el-table-column
                prop="productInfoVo.title"
                label="收藏商品名称"
                min-width="120">
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
  name: 'userCollection',
  data () {
    return {
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
    pageChange(item){
      this.postData.pageIndex = item
      this.getList()
    },
  	// 获取用户收藏列表
  	getList () {
  		console.log('获取用户收藏列表')
  		console.log(this.postData)
  		this.$api.getUserCollectionList(this.postData,data=>{
  			console.log(data)
  			if(data.status==200){
  				if(data.data.res_code==1){
  					this.list = data.data.result
  				}else{
  					this.list = ''
  				}
          console.log('list',this.list)
          this.page.num = data.data.total
  			}else{
  				this.$message({
  					showClose:true,
  					message:'获取用户收藏列表失败',
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
      this.searchData = {}
  		this.getList()
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
</style>
