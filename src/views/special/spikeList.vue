<template>
	<div id="specialList">
		<transition name="fade">
		<div class="box" v-if="!showInfo">
			<div class="miantop">
			    <div class="maintopleft">
			        <div class="maintopitem">
			          <el-select v-model="specialType" placeholder="请选择">
					    <el-option
					      v-for="item in options"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
			        </div>
			    </div>
			</div>
			<div class="maincontent" v-loading="vloading">
		      	<div class="tablebox" v-if="special">
			        <el-table
			          :data="special"
			          border
			          stripe
			          height="100%"
			          style="min-width: 100%"
			          class="mytabel">
			          <el-table-column
			            fixed
			            prop="crName"
			            label="秒杀昵称">
			          </el-table-column>
			          <el-table-column
			            prop="crid"
			            label="秒杀ID">
			          </el-table-column>
			           <el-table-column
			            prop="stime"
			            label="秒杀开始时间">
			          </el-table-column>
			          <el-table-column
			            prop="etime"
			            label="秒杀结束时间">
			          </el-table-column>
			           <el-table-column
			            prop="num"
			            label="秒杀商品数">
			          </el-table-column>
			          <el-table-column
			            prop="type"
			            label="秒杀状态">
			          </el-table-column>
			          <el-table-column
			            fixed="right"
			            label="操作">
			            <template slot-scope="scope">
			              <el-button class="minbut" type="primary" @click="lookSpecial(scope.row)" size="small">查看</el-button>
			              <el-button class="minbut" type="warning" @click="removeSpecial(scope.row)" size="small">删除</el-button>
			            </template>
			          </el-table-column>
			        </el-table>
		      	</div>
		      	<nulldiv v-else></nulldiv>
		    </div>
		    <div class="minfoot">
		      <el-pagination
		        background
		        :total="1000"
		        layout="total, prev, pager, next, jumper">
		      </el-pagination>
		    </div>
		</div>
		<specialInfo v-else @closePage="closePage" pagedata=""></specialInfo>
		</transition>
	</div>
</template>

<script type="text/javascript">
import specialInfo from '../../components/spike/spike.vue'
import nulldiv from '../../components/null/null.vue'

export default {
  name: 'spikeList',
  components:{
  	specialInfo,
  	nulldiv
  },
  data () {
    return {
    	// 选择的专题分类
    	specialType:'all',
    	// 专题分类
    	options:[{value:'all',label:'全部秒杀'},{value:'up',label:'上线秒杀'},{value:'down',label:'过期秒杀'}],
    	// 专题列表
    	special:[{crName:'专题一',crid:'1231313121',title:'我们的美妆',num:'13',type:'up',stime:'2019-2-30',etime:'2019-3-02'}],
    	// 是否显示showInfo
    	showInfo: false
    }
  },
  methods: {
  	lookSpecial (row) {
  		// 查看编辑专题
  		console.log(row)
  		let that = this
  		that.showInfo = true
  	},
  	closePage (data) {
  		// 关闭专题详情
  		console.log('关闭秒杀详情')
  		console.log(data)
  		this.showInfo = false
  		if (data) {

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
