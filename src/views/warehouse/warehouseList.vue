<template>
  <div id="warehouseList">
  	<transition name="fade">
	  	<div v-if="showBox1" class="box1 flex2">
	  		<div class="flexvcenter pad5">
	  			<div class="flex1"></div>
	  			<div class="flexvcenter">
	  				<el-button size="small" @click="addNewWarehouse" type="primary">新增仓库</el-button>
	  			</div>
	  		</div>
		  	<div class="flex1">
		  		<el-table
				    :data="tableData3"
				    border
				    style="width: 100%">
				    <el-table-column
				      fixed
				      prop="date"
				      label="日期">
				    </el-table-column>
				    <el-table-column
				      prop="name"
				      label="姓名">
				    </el-table-column>
				    <el-table-column
				      prop="province"
				      label="省份">
				    </el-table-column>
				    <el-table-column
				      prop="city"
				      label="市区">
				    </el-table-column>
				    <el-table-column
				      prop="address"
				      label="地址">
				    </el-table-column>
				    <el-table-column
				      prop="zip"
				      label="邮编">
				    </el-table-column>
				    <el-table-column
				      label="操作">
				      <template slot-scope="scope">
				        <el-button @click="addClick(scope.row)" type="text" size="small">新增运费模板</el-button>
				      </template>
				    </el-table-column>
				    <el-table-column
				      fixed="right"
				      label="操作">
				      <template slot-scope="scope">
				        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
				        <el-button type="text" size="small">编辑</el-button>
				      </template>
				    </el-table-column>
				 </el-table>
		  	</div>
		  	<div class="minfoot">
		  		<el-pagination
			        background
			        :total="1000"
			        layout="total, prev, pager, next, jumper">
		      	</el-pagination>
		  	</div>
	  	</div>
	  	<div v-else class="box2">
	  		<el-scrollbar style="height:100%;">
	  			<div v-if="!addwarehouse">
		  			<h1 class="title on">新增运费模板</h1>
		  			<el-form ref="form" :model="form" style="width:60%;margin-left:20%;" label-width="120px">
					  <el-form-item label="模板名称">
					    <el-input v-model="form.name"></el-input>
					  </el-form-item>
					  <el-form-item label="模板备注">
					    <el-input type="textarea" v-model="form.desc"></el-input>
					  </el-form-item>
					  <el-form-item label="选择地区">
					    <el-checkbox-group v-model="form.type">
					      <el-checkbox label="北京" name="type"></el-checkbox>
					      <el-checkbox label="天津" name="type"></el-checkbox>
					      <el-checkbox label="上海" name="type"></el-checkbox>
					      <el-checkbox label="成都" name="type"></el-checkbox>
					    </el-checkbox-group>
					    <el-radio-group v-model="form.resource">
					      <el-radio label="全选"></el-radio>
					    </el-radio-group>
					  </el-form-item>
					  <el-form-item>
					    <el-button type="primary" @click="onSubmit">立即创建</el-button>
					    <el-button @click="showBox1 = true">取消</el-button>
					  </el-form-item>
					</el-form>
				</div>
				<div v-else>
					<h1 class="title on">新增仓库</h1>
					<el-form ref="form" :model="form" style="width:60%;margin-left:20%;" label-width="120px">
					  <el-form-item label="仓库名称">
					    <el-input v-model="form.name"></el-input>
					  </el-form-item>
					  <el-form-item label="仓库类型">
					    <el-radio-group v-model="form.resource">
					      <el-radio label="国内贸易"></el-radio>
					      <el-radio label="报税"></el-radio>
					      <el-radio label="海外"></el-radio>
					    </el-radio-group>
					  </el-form-item>
					  <el-form-item label="所在地">
					    <el-select class="mgb10 mgr10" v-model="form.region" placeholder="请选择国家">
					      <el-option label="区域一" value="shanghai"></el-option>
					      <el-option label="区域二" value="beijing"></el-option>
					    </el-select>
					    <el-select class="mgb10 mgr10" v-model="form.region" placeholder="请选择省">
					      <el-option label="区域一" value="shanghai"></el-option>
					      <el-option label="区域二" value="beijing"></el-option>
					    </el-select>
					    <el-select class="mgb10 mgr10" v-model="form.region" placeholder="请选择市">
					      <el-option label="区域一" value="shanghai"></el-option>
					      <el-option label="区域二" value="beijing"></el-option>
					    </el-select>
					    <el-select class="mgb10 mgr10" v-model="form.region" placeholder="请选择区">
					      <el-option label="区域一" value="shanghai"></el-option>
					      <el-option label="区域二" value="beijing"></el-option>
					    </el-select>
					  </el-form-item>
					  <el-form-item label="详细地址">
					    <el-input v-model="form.name"></el-input>
					  </el-form-item>
					  <el-form-item label="结算">
					    <el-select v-model="form.region" placeholder="请选择活动区域">
					      <el-option label="区域一" value="shanghai"></el-option>
					      <el-option label="区域二" value="beijing"></el-option>
					    </el-select>
					  </el-form-item>
					  <el-form-item label="强制拆单">
					    <el-switch v-model="form.delivery"></el-switch>
					  </el-form-item>
					  <el-form-item label="推单方式">
					    <el-radio-group v-model="form.resource">
					      <el-radio label="手动"></el-radio>
					      <el-radio label="自动"></el-radio>
					    </el-radio-group>
					  </el-form-item>
					   <el-form-item label="状态">
					    <el-radio-group v-model="form.resource">
					      <el-radio label="开启"></el-radio>
					      <el-radio label="关闭"></el-radio>
					    </el-radio-group>
					  </el-form-item>
					  <el-form-item label="配货说明">
					    <el-input type="textarea" v-model="form.desc"></el-input>
					  </el-form-item>
					  <el-form-item>
					    <el-button type="primary" @click="onSubmit">立即创建</el-button>
					    <el-button @click="showBox1 = true">取消</el-button>
					  </el-form-item>
					</el-form>
				</div>
	  		</el-scrollbar>
	  	</div>
  </transition>
  </div>
</template>

<script type="text/javascript">
export default {
	name: 'warehouseList',
	data () {
		return {
			// 显示列表
			showBox1: true,
			// 新增运费模板
			addwarehouse:true,
			// 模拟的表格数据
			tableData3: [{
		      date: '2016-05-03',
		      name: '王小虎',
		      province: '上海',
		      city: '普陀区',
		      address: '上海市普陀区金沙江路 1518 弄',
		      zip: 200333
		    }, {
		      date: '2016-05-02',
		      name: '王小虎',
		      province: '上海',
		      city: '普陀区',
		      address: '上海市普陀区金沙江路 1518 弄',
		      zip: 200333
		    }, {
		      date: '2016-05-04',
		      name: '王小虎',
		      province: '上海',
		      city: '普陀区',
		      address: '上海市普陀区金沙江路 1518 弄',
		      zip: 200333
		    }, {
		      date: '2016-05-01',
		      name: '王小虎',
		      province: '上海',
		      city: '普陀区',
		      address: '上海市普陀区金沙江路 1518 弄',
		      zip: 200333
		    }],
		    form:{
		    	name:'',
		    	desc:'',
		    	type:[],
		    	resource:'',
		    	region:'',
		    	delivery:true,

		    }
		}
	},
	methods:{
		// 新增模板运费
		addClick(){
			this.showBox1=false
			this.addwarehouse=false
		},
		// 新增仓库
		addNewWarehouse () {
			this.showBox1=false
			this.addwarehouse=true
		}
	}
}
</script>

<style type="text/css" scoped>
#warehouseList{
	height: 100%;
	width: 100%;
	background-color: #fff;
}
.box1,.box2{
	height: 100%;
}
.minfoot{
  padding: 10px;
  border-top: 1px solid #ccc;
  text-align: right;
}
</style>
