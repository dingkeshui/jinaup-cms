a<template>
  <div class="box flex2">
  		<div class="pad10 flex">
  			<div class="flex1">
	            <el-input size="mini" placeholder="姓名" clearable style="width:100px;" v-model="searchData.trueName"></el-input>
	            <el-input size="mini" placeholder="手机号" clearable style="width:100px;" v-model="searchData.phoneNumber"></el-input>
	            <el-select size="mini" style="width:100px;" @change="searchBut" v-model="searchData.status" clearable placeholder="审核状态">
		          <el-option label="待审核" value="0"></el-option>
		          <el-option label="通过" value="1"></el-option>
		          <el-option label="拒绝" value="2"></el-option>
		        </el-select>
	            <el-select size="mini" v-model="searchData.firstCategoryId" style="width:150px;" @change="(e)=>adressChange(e,1)" filterable clearable  placeholder="请选择省">
				    <el-option
				      v-for="item in adressList[0]"
				      :key="item.id"
				      :label="item.name"
				      :value="item.id">
				    </el-option>
				</el-select>
				<el-select size="mini" v-model="searchData.secondCategoryId" style="width:150px;" @change="(e)=>adressChange(e,2)" filterable clearable  placeholder="请选择市">
				    <el-option
				      v-for="item in adressList[1]"
				      :key="item.id"
				      :label="item.name"
				      :value="item.id">
				    </el-option>
				</el-select>
				<el-select size="mini" v-model="searchData.thirdCategoryId" style="width:150px;" @change="(e)=>adressChange(e,3)" filterable clearable  placeholder="请选择区">
				    <el-option
				      v-for="item in adressList[2]"
				      :key="item.id"
				      :label="item.name"
				      :value="item.id">
				    </el-option>
				</el-select>
	        </div>
	  		<div class="flex flexcenter">
	  			<el-button type="primary" @click="searchBut" size="mini" icon="el-icon-search">搜索</el-button>
	  		</div>
  		</div>
  		<div class="flex1" style="position:relative;">
        <div class="tablebox">
  			<el-table
	          :data="listTime"
	          border
	          stripe
	          height="100%"
	          style="width: 100%">
	        <el-table-column
	          	fixed="left"
		        type="index"
		        width="50">
		    </el-table-column>
			<el-table-column
				prop="id"
				width="50"
				label="ID">
			</el-table-column>
			<el-table-column
				prop="trueName"
				label="姓名">
			</el-table-column>
			<el-table-column
				prop="phoneNumber"
				label="手机号">
			</el-table-column>
            <el-table-column
              prop="firstCategoryName"
              label="省">
            </el-table-column>
            <el-table-column
              prop="secondCategoryName"
              label="市">
            </el-table-column>
            <el-table-column
              prop="thirdCategoryName"
              label="区">
            </el-table-column>
            <el-table-column
              prop="time"
              min-width="180"
              label="申请日期">
            </el-table-column>
            <el-table-column
              label="审核状态">
              <template slot-scope="scope">
              	<el-tag v-if="scope.row.status===0">待审</el-tag>
              	<el-tag v-if="scope.row.status==1" type="success">通过</el-tag>
              	<el-tag v-if="scope.row.status==2" type="danger">拒绝</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="操作">
              <template slot-scope="scope">
              	<template v-if="scope.row.status===0">
              		<div class="mgb10"><el-button size="mini" type="primary" @click="changeAdd(scope.row)">通过</el-button></div>
              		<div><el-button size="mini" type="danger" @click="changeNo(scope.row)">拒绝</el-button></div>
              	</template>
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
</template>

<script type="text/javascript">

export default {
  name: 'serviceSignUp',
  data () {
  	return {
  		postData:{
  			pageIndex:1
  		},
  		// 银行信息列表
  		list:'',
  		// 银行组件传递的值
  		searchData:{},
		page:{
			num:''
		},
		adressList:[],
		onAdress:[]
  	}
  },
  created(){
  	this.getList()
  	this.adressByPid()
  },
  computed:{
			listTime(){
				if(this.list){
					this.list.map(val=>{
						val.time = this.$utils.getTime(val.createTime)
					})
				}
				return this.list
			}
  },
  methods:{
  	// 添加
  	changeAdd(item){
  		this.$confirm('确定服务商通过审核?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          this.$api.bServiceUp({status:1,id:item.id},res=>{
          	if(res.data.res_code==1){
					this.getList()
				}else{
	            	this.$message({
			          showClose: true,
			          message: res.data.message?res.data.message:'抱歉，操作失败！',
			          type: 'error'
			        })
	        }
          })
        }).catch(() => {
        
        });
  	},
  	// 拒绝
  	changeNo(item){
  		this.$confirm('确定拒绝服务商申请?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          this.$api.bServiceUp({status:2,id:item.id},res=>{
          	if(res.data.res_code==1){
					this.getList()
				}else{
	            	this.$message({
			          showClose: true,
			          message: res.data.message?res.data.message:'抱歉，操作失败！',
			          type: 'error'
			        })
	        }
          })
        }).catch(() => {
        
        });
  	},
  	// 获取区域列表
  	adressByPid () {
  		let pid = 1
  		if(this.onAdress.length){
  			pid = this.onAdress[this.onAdress.length-1]
  		}
  		this.$api.adressByPid({pid:pid},res=>{
  			if(res.data.res_code==1){
					this.adressList.push(res.data.result)
					console.log('adressList',this.adressList)
				}else{
	            	this.$message({
			          showClose: true,
			          message: res.data.message?res.data.message:'抱歉，列表获取失败！',
			          type: 'error'
			        })
	        }
  		})
  	},
  	// 区域改变
  	adressChange (item,index) {
  		console.log('区域改变',item,index)
		this.onAdress.splice(index-1,this.onAdress.length-index+1,item)
		this.adressList.splice(index,this.adressList.length-index+1)
		if(index==1){
			this.searchData.secondCategoryId  = ''
			this.searchData.thirdCategoryId  = ''
		} else if (index==2) {
			this.searchData.thirdCategoryId  = ''
		}
  		console.log('待处理',this.onAdress,this.adressList)
  		if(item&&index!=3){
  			this.adressByPid()
  		}
  	},
  	getList () {
  		console.log('获取列表')
  		let that = this
  		that.$api.bServiceList(that.postData,(data)=>{
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
		          message: data.data.message?data.data.message:'抱歉，列表获取失败！',
		          type: 'error'
		        })
  			}
  		})
  	},
    //  搜索商品 
    searchBut () {
      console.log('搜索商品')
      for(let i in this.searchData){
        if(this.searchData[i]){
          this.postData[i]=this.searchData[i]
        }else{
          delete this.postData[i]
        }
      }
      this.getList()
    },
    pageChange(item){
      this.postData.pageIndex = item
      this.getList()
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
