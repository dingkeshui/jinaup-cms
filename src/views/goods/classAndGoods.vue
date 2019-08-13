<template>
  <div class="box">
    <div v-if="showBox1" class="box1 flex2">
    	<div class="pad10 flex">
    		<div class="flex1">
  	  		<el-select size="small" v-model="goodclass.one.val" @change="classChange('one')" clearable placeholder="请选择一级分类">
            <el-option
              v-for="item in goodclass.one.list"
              :key="item.cid"
              :label="item.cname"
              :value="item.cid">
            </el-option>
          </el-select>
          <el-select size="small" v-model="goodclass.two.val" @change="classChange('two')" clearable placeholder="请选择二级分类">
            <el-option
              v-for="item in goodclass.two.list"
              :key="item.cid"
              :label="item.cname"
              :value="item.cid">
            </el-option>
          </el-select>
          <el-select size="small" v-model="goodclass.three.val" @change="classChange('three')" clearable placeholder="请选择三级分类">
            <el-option
              v-for="item in goodclass.three.list"
              :key="item.cid"
              :label="item.cname"
              :value="item.cid">
            </el-option>
          </el-select>
          <el-select size="small" v-model="goodclass.four.val" @change="classChange('four')" clearable placeholder="请选择四级分类">
            <el-option
              v-for="item in goodclass.four.list"
              :key="item.cid"
              :label="item.cname"
              :value="item.cid">
            </el-option>
          </el-select>
  		</div>
  		<div>
        <el-button size="small" @click="searchfun" type="primary" icon="el-icon-search">搜索</el-button>
  			<el-button size="small" @click="addfun" type="primary" icon="el-icon-plus">添加</el-button>
  		</div>
    	</div>
    	<div class="flex1" style="position: relative;">
        <div class="tablebox">
    		<el-table
            :data="list"
            border
            stripe
            height="100%"
            @selection-change="handleSelectionChange"
            style="width: 100%">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                type="index"
                label="排序"
                fixed
                width="50">
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作">
                <template slot-scope="scope">
                <div class="mgb5"><el-button @click="lookorder(scope.row)" class="minbut" size="small">详细信息</el-button></div>
                <div class="mgb5"><el-button @click="lookorder(scope.row)" class="minbut" size="small">编辑</el-button></div>
                <div class="mgb5"><el-button @click="remove(scope.row)" type="warning" class="minbut" size="small">下线</el-button></div>
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
      
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'classAndGoods',
  data () {
  	return {
  		searchData:{
  		},
  		postData:{
  			pageIndex:1
  		},
      page:{
        num:''
      },
  		list:'',
      showBox1:true,
      // 商品分类列表
      goodclass:{one:{list:'',val:''},two:{list:'',val:''},three:{list:'',val:''},four:{list:'',val:''}},
      // 请求class的参数
      classData: {
        parentId:0
      }
  	}
  },
  created(){
  	this.getClassList('one')
  },
  methods:{
  	// 获取评价列表
  	getList () {
  		console.log('获取分类商品关系列表')
  		console.log(this.postData)
  		this.$api.relationList(this.postData,(data)=>{
  			console.log(data)
  			if (data.status == 200) {
  				if (data.data.res_code==1) {
  					this.list = data.data.result
  			    } else {
  			    	this.list= ""
  			    }
            this.page = data.data.total
  			} else {
  				this.$message({
  					showClose:true,
  					message:'获取评价列表失败',
  					type:'error'
  				})
  			}
  			
  		})
  	},
    pageChange(itme){
      this.postData.pageIndex =item
      this.getList()
    },
    // 选择商品分类
    classChange(item){
      console.log('选择商品分类',item)
      if(item == "one"){
        this.classData.parentId = this.goodclass.one.val
        this.goodclass.two = {val:'',list:''}
        this.goodclass.three = {val:'',list:''}
        this.goodclass.four = {val:'',list:''}
        this.getClassList('two')
      }else if (item == "two") {
        this.classData.parentId = this.goodclass.two.val
        this.goodclass.three = {val:'',list:''}
        this.goodclass.four = {val:'',list:''}
        this.getClassList('three')
      }else if (item == "three") {
        this.classData.parentId = this.goodclass.three.val
        this.goodclass.four = {val:'',list:''}
        this.getClassList('four')
      }else if (item == "four") {
        this.searchData.cid = this.goodclass.four.val
      }
    },
    // 获取商品分类
    getClassList (item) {
      console.log('获取商品分类',this.classData)
      this.$api.categoryList(this.classData,data=>{
        console.log(data)
        if (data.status==200) {
          let list
          if (data.data.res_code==1) {
            list = data.data.result
          } else {
            list = ""
          }
          if(item){
            this.goodclass[item].list = list
          }
        } else {
          this.$message({
            showClose:true,
            message:'商品分类获取失败',
            type:'error'
          })
        }
      })
    },
    // 删除
    remove(item){
      console.log('删除',item)
      this.$confirm('确定将优惠券 '+item.title+' 下线?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          this.$api.relationDel({spcid:item.spcid},(data)=>{
            console.log(data)
            if (data.data.res_code==1) {
              this.getList()
              this.$message({
                showClose:true,
                message:'分类产品关系删除成功',
                type:'success'
              })
            }else{
              this.$message({
                showClose:true,
                message:'分类产品关系删除失败',
                type:'error'
              })
            }
          })
        }).catch(() => {
          console.log('取消确定')       
        });
    },
    // 添加商品
    addfun () {
      console.log('添加')
      
    },
  	// 搜索
  	searchfun () {
  		console.log('搜搜')
  		this.postData.cid = this.searchData.cid
  		this.postData.pageIndex = 1
  		this.getList()
  	}
  }
}
</script>

<style type="text/css" scoped>
.box{
	height: 100%;
	width: 100%;
	background-color: #fff;
}
.box1,.box2{
  width: 100%;
  height: 100%;
}
</style>
