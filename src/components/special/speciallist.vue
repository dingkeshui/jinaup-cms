<template>
	<div id="specialList">
		<transition name="fade">
		<div class="box" v-if="!showInfo">
			<!-- <div class="miantop">
			    <div class="maintopleft">
			        <div class="maintopitem">
			          <el-select size="small" clearable  v-model="postData.state" placeholder="请选择状态">
    					    <el-option label="下线专题" value="0"></el-option>
    					    <el-option label="上线专题" value="1"></el-option>
    					  </el-select>
			        </div>
              <div class="maintopitem">
                <el-input style="width:200px;" placeholder="专题标题" size="small" v-model="postData.title"></el-input>
              </div>
			    </div>
			    <div class="flex flexvcenter pad5">
            <el-button type="primary" size="small" @click="search" icon="el-icon-search">搜索</el-button>
			    	<el-button v-if="itemdata" type="primary" size="small" @click="closepageitem" icon="el-icon-search">取消</el-button>
			    </div>
			</div> -->
			<div class="maincontent" v-loading="vloading">
		      	<div class="tablebox">
			        <el-table
			          :data="list"
			          border
			          stripe
			          height="100%">
                <el-table-column
                  type="index"
                  label="排序"
                  width="50">
                </el-table-column>
			          <el-table-column
			            prop="title"
                  min-width="150px"
			            label="专题标题">
			          </el-table-column>
                <!-- <el-table-column
                  width="130px"
                  label="专题类型">
                  <template slot-scope="scope">
                    <el-tag size="small" type="warning">默认</el-tag>
                  </template>
                </el-table-column> -->
			          <el-table-column
			            prop="tid"
			            label="专题ID"
                  width="120">
			          </el-table-column>
			           <el-table-column
			            prop="description"
                  min-width="200px"
			            label="专题描述">
			          </el-table-column>
                <el-table-column
                  width="100px"
                  label="专题状态">
                   <template slot-scope="scope">
                    <el-tag v-if="scope.row.state==1" size="small" type="success">上线中</el-tag>
                    <el-tag v-else size="small" type="danger">下线中</el-tag>
                  </template>
                </el-table-column>
			           <el-table-column
                  width="120px"
			            label="专题图片">
                  <template slot-scope="scope">
                    <img style="max-width:100px;max-height:100px;" :src="scope.row.imgUrl">
                  </template>
			          </el-table-column>
                <el-table-column
                  v-if="itemdata"
                  fixed="right"
                  width="130"
                  align="center"
                  label="操作">
                  <template slot-scope="scope">
                    <div class="mgb5"><el-button class="minbut" type="primary" @click="choose(scope.row)" size="small">选择</el-button></div>
                  </template>
                </el-table-column>
			          <el-table-column
                  v-else
			            fixed="right"
                  align="center"
                  width="130"
			            label="操作">
			            <template slot-scope="scope">
			              <div class="mgb5"><el-button class="minbut" type="primary" @click="lookfun(scope.row)" size="small">编辑</el-button></div>
                    <div class="mgb5"><el-button class="minbut" type="primary" @click="lookgoods(scope.row)" size="small">查看商品</el-button></div>
			              <!-- <div v-if="scope.row.state==1"><el-button class="minbut" type="warning" @click="remove(scope.row)" size="small">下线</el-button></div> -->
			            </template>
			          </el-table-column>
			        </el-table>
		      	</div>
		    </div>
		    <div class="minfoot">
		      <el-pagination
		        background
		        :total="page.num"
            page-size="20"
            @current-change="pageChange"
		        layout="total, prev, pager, next, jumper">
		      </el-pagination>
		    </div>
		</div>
    <div v-else style="width:100%;height:100%;">
      <specialInfo v-if="!lookgoodsdata" @closePage="closePage" :pagedata="oneSpec"></specialInfo>
      <spegoods v-else :goodsdata="goodsdata" @closepage="closePage"></spegoods>
    </div>
		</transition>
	</div>
</template>

<script type="text/javascript">
import specialInfo from '@/components/special/special.vue'
import spegoods from '@/components/special/spegoods.vue'
import nulldiv from '@/components/null/null.vue'

export default {
  name: 'choosespecial',
  props:['itemdata'],
  components:{
  	specialInfo,
    spegoods,
  	nulldiv
  },
  data () {
    return {
    	postData:{
    		pageIndex:1,
    		state:'',
    		topicType:''
    	},
      page:{
        num:""
      },
    	list:'',
    	// 是否显示showInfo
    	showInfo: false,
      // 查看商品
      lookgoodsdata:true,
      // 查看专题
      oneSpec:'',
      // 查看商品的子组件参数
      goodsdata:''
    }
  },
  created () {
    console.log('choosespecial',this.itemdata)
  	this.getlist()
  },
  methods: {
  	// 获取列表
  	getlist () {
  		console.log('获取专题列表')
  		let that = this
  		console.log(that.postData)
  		that.$api.topicList(that.postData,(data)=>{
  			console.log(data)
  			if (data.status==200) {
  				if(data.data.res_code==1){
  					that.list=data.data.result
  				}else{
  					that.list=""
  				}
          this.page.num = data.data.total
  			} else {
  				that.$message({
  					showClose:true,
  					message:'专题列表获取失败',
            type:'error'
  				})
  			}
  		})
  	},
    // 页面改变
    pageChange (item) {
      this.postData.pageIndex = item
      this.getlist()
    },
    // 查看商品
    lookgoods (item) {
      console.log('查看商品',item)
      this.showInfo = true
      this.lookgoodsdata = true
      this.goodsdata = item
    },
    // 看专题
    lookfun (item) {
      console.log('看专题',item)
      this.oneSpec = item
      this.showInfo = true
      this.lookgoodsdata = false
    },
    // 选择
    choose(item){
      this.$emit('input',item)
      this.closepageitem()
    },
    // 关闭本页面
    closepageitem(){
      this.$emit('closepage')
    },
  	// 搜索专题
  	search(){
  		console.log('搜索专题')
  		this.postData.pageIndex=1
  		this.getlist()
  	},
    // 专题删除
    remove (item) {
      console.log('专题删除',item)
      this.$confirm('确定将 '+item.title+' 下线?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          this.$api.topicDel({tid:item.tid},data=>{
            console.log(data)
            if (data.data.res_code==1) {
              this.getlist()
              this.$message({
                showClose:true,
                message:'专题删除成功',
                type:'success'
              })
            }else{
              this.$message({
                showClose:true,
                message:'专题删除失败',
                type:'error'
              })
            }
          })
        }).catch(() => {
          console.log('取消确定')      
        })
    },
  	closePage (data) {
  		// 关闭专题详情
  		console.log('关闭专题详情')
  		console.log(data)
  		this.showInfo = false
      if(data=='new'){
        this.getlist()
      }
  	}
  }
}
</script>

<style type="text/css" scoped>
#specialList{
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
  padding: 10px 0px;
}
.maintopitem{
  height: 100%;
  display: flex;
  align-items: center;
  padding:0px 15px;
  border-right:1px solid #bbb;
  box-sizing: border-box;
  color: #606266;
  font-size: 14px;
  min-width: 200px;
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
.tablebox{
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
