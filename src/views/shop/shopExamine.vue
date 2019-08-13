<template>
  <div id="box">
  	<!-- 头部操作div -->
    <div class="miantop">
      <div class="maintopleft">
      </div>
      <transition name="updown" mode="out-in">
      <div key="div1" class="maintopright" v-if="!searchbox">
        <el-tooltip class="item mgr5" effect="dark" content="第一页" placement="bottom-start">
          <i class="el-icon-d-arrow-left fs22"></i>
        </el-tooltip>
        <el-tooltip class="item mgr5" effect="dark" content="最后一页" placement="bottom-start">
          <i class="el-icon-d-arrow-right fs22"></i>
        </el-tooltip>
        <el-tooltip class="item mgr5" effect="dark" content="下载本页" placement="bottom-start">
          <i class="el-icon-sort fs22"></i>
        </el-tooltip>
        <el-tooltip class="item mgr5" effect="dark" content="全部下载" placement="bottom-start">
          <i class="el-icon-download fs22"></i>
        </el-tooltip>
        <el-tooltip class="item mgr5" effect="dark" content="订单搜索" placement="bottom-start">
          <i @click="searchfun" class="el-icon-search fs22"></i>
        </el-tooltip>
      </div>
      <div key="div2" class="maintopright2" v-else>
        <el-input
          class="searchinp mgr5"
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          clearable
          size="small"
          v-model="searchtext">
        </el-input>
        <el-button-group style="min-width:120px">
          <el-button size="small" type="primary">搜索</el-button>
          <el-button size="small" @click="removesearch">取消</el-button>
        </el-button-group>
      </div>
      </transition>
    </div>
    <!-- 中间表格内容 -->
    <div class="maincontent">
      <!-- <el-scrollbar style="height:100%">
        <div style="height:1000px">
          123
        </div>
      </el-scrollbar> -->
      <div class="tablebox">
      <el-table
        :data="tableData3"
        border
        stripe
        height="100%"
        style="width: 100%"
        class="mytabel">
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          prop="name1"
          label="供货商">
        </el-table-column>
        <el-table-column
          prop="date"
          label="申请时间">
        </el-table-column>
        <el-table-column
          prop="name"
          label="真实姓名">
        </el-table-column>
        <el-table-column
          prop="tel"
          label="手机号">
        </el-table-column>
        <el-table-column
          prop="id"
          label="身份证号">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="130">
          <template slot-scope="scope">
          	<el-button @click="lookorder(scope.row)" class="minbut" type="primary" size="small">审核</el-button>
          </template>
        </el-table-column>
      </el-table>
      </div>
    </div>
    <!-- 脚步跳页 -->
    <div class="minfoot">
      <el-pagination
        background
        :total="1000"
        layout="total, prev, pager, next, jumper">
      </el-pagination>
    </div>
    <!-- 订单查看显示的内容 -->
    <el-dialog title="店铺审核详情" class="mgt10vh" width="70%" :visible.sync="ordermainshow">
      <div class="ordermain">
        <el-scrollbar class="noxscroll" style="height: 400px;">
          <div class="ordermainbox">
            <div class="ordermainitem">
              <div class="ordermainiteml">供货商</div>
              <div class="ordermainitemr">{{order.name}}</div>
            </div>
            <div class="ordermainitem">
              <div class="ordermainiteml">申请时间</div>
              <div class="ordermainitemr">{{order.time}}</div>
            </div>
            <div class="ordermainitem">
              <div class="ordermainiteml">真实姓名</div>
              <div class="ordermainitemr">{{order.rname}}</div>
            </div>
            <div class="ordermainitem">
              <div class="ordermainiteml">电话号码</div>
              <div class="ordermainitemr">{{order.tel}}</div>
            </div>
            <div class="ordermainitem">
              <div class="ordermainiteml">身份证号</div>
              <div class="ordermainitemr">{{order.id}}</div>
            </div>
            <div class="ordermainitem">
              <div class="ordermainiteml">身份证照片</div>
              <div class="ordermainitemr" style="overflow:hidden">
              	<div class="imgbox"><img style="width:400px" src="../../assets/logo.jpg"></div>
              	<div class="imgbox"><img style="width:400px" src="../../assets/logo.jpg"></div>
              </div>
            </div>
            <div class="ordermainitem">
              <div class="ordermainiteml">营业执照</div>
              <div class="ordermainitemr" style="overflow:hidden">
              	<div class="imgbox"><img style="width:400px" src="../../assets/logo.jpg"></div>
              </div>
            </div>
            <div class="ordermainitem">
              <div class="ordermainiteml">其他资质</div>
              <div class="ordermainitemr" style="overflow:hidden">
              	<div class="imgbox"><img style="width:400px" src="../../assets/logo.jpg"></div>
              	<div class="imgbox"><img style="width:400px" src="../../assets/logo.jpg"></div>
              </div>
            </div>
            <div class="ordermainitem">
              <div class="ordermainiteml">结算方式</div>
              <div class="ordermainitemr"><span v-if="order.type==1">扣点</span><span v-else>成本价</span></div>
            </div>
            <div class="ordermainitem">
              <div class="ordermainiteml">扣点数</div>
              <div class="ordermainitemr"><span v-if="order.type==1">{{order.num}}</span></div>
            </div>
          </div>
        </el-scrollbar>
      </div>
      <span slot="footer" class="dialog-footer">
      	<el-button type="primary" @click="examinetrue">审核通过</el-button>
      	<el-button type="danger" @click="examinefalse">审核不通过</el-button>
    	<el-button @click="ordermainshow = false">取 消</el-button>
  		</span>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'shopexamine',
  data () {
    return {
      rule: {'a': { 'name': '全部订单' }, 'b': { 'name': '今日订单' }, 'c': { 'name': '本周订单' }, 'd': { 'name': '本月订单' }, 'e': { 'name': '本季度订单' }, 'f': { 'name': '本年订单' }},
      rule2: {'a': {'name': '指定日'}, 'b': {'name': '指定周'}, 'c': {'name': '指定月'}, 'd': {'name': '指定年'}, 'e': {'name': '指定范围'}},
      // 模拟的一个订单数据
      order: {
        name: '中国百事可乐总公司',
        rname: '唐吉柯德',
        tel: '17602226923',
        id: '1482828282828282828',
        time: '2018-12-12',
        idpic: [],
        shoppic: [],
        type: '1',
        num: '123'
      },
      // 便捷选择显示的内容
      rulename1: '全部订单',
      // 选中的规则
      onrule: {'name': 'a', id: 'a'},
      // date：自定义选择显示的内容 name：日期弹出框的标题 id：显示哪个日期选择器
      rulename2: {name: '全部订单', date: '全部订单', id: ''},
      // 控制日期选择弹出框
      dialogshow: false,
      // 选择的日期
      mydate: {'a': '', 'b': '', 'c': '', 'd': '', 'e': ''},
      // 是否显示订单搜索框
      searchbox: false,
      // 是否显示订单详情
      ordermainshow: false,
      // 搜索框内容
      searchtext: '',
      // 表格内容
      tableData3: [{
        date: '2016-05-04',
        name1: '中国百事可乐总公司',
        name: '王小虎',
        tel: '17602226923',
        id: '142837199602064235',
        zip: 200333
      }],
      // 详细筛选的按钮状态
      buttyp: '',
      //  详细筛选的弹出框
      screenmain: false,
      // 详细筛选的配置
      screeninfo: {},
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: ['1'],
        desc: '',
        ctime: '2018-12-09'
      },
      // 详细筛选里的订单状态的单选按钮
      radio: '1'
    }
  },
  created () {
    let that = this
    let newarr = []
    console.log()
    for (let i = 0; i < 10; i++) {
      newarr.push(that.tableData3[0])
    }
    console.log(that.tableData3)
    this.tableData3 = newarr
  },
  methods: {
    searchfun () {
      // 搜索订单
      console.log('搜索订单')
      this.searchbox = true
    },
    removesearch () {
      // 取消搜索
      this.searchbox = false
    },
    lookorder (e) {
      // 点击查看订单详情
      console.log('center order main')
      console.log(e)
      this.ordermainshow = true
    },
    examinetrue () {
    	// 审核通过
    	console.log('click examine ok')
    	this.$confirm('确定此店铺的审核通过?', '提示', {
	        confirmButtonText: '确定',
	        cancelButtonText: '取消',
	        type: 'warning'
	    }).then(() => {
	        this.$message({
	          type: 'success',
	          message: '店铺审核通过成功!'
	        })
	        this.ordermainshow=false
	    }).catch(() => {
	    	console.log('取消')
	        this.ordermainshow=false
	    })
    },
    examinefalse () {
    	// 审核未通过
    	this.$confirm('确定此店铺的审核不通过?', '提示', {
	        confirmButtonText: '确定',
	        cancelButtonText: '取消',
	        showInput: true,
	        inputPlaceholder: '请输入不通过原因'
	    }).then(() => {
	        this.$message({
	          type: 'success',
	          message: '该店铺没有通过审核!'
	        })
	        this.ordermainshow=false
	    }).catch(() => {
	    	console.log('取消')
	        this.ordermainshow=false
	    })
    }
  }
}
</script>

<style type="text/css">
#box{
  background-color: #fff;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
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
.maintopright{
  display: flex;
  align-items: center;
  padding: 0px 10px;
}
.maintopright i{
  width: 40px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border-radius: 5px;
  cursor: pointer;
}
.maintopright i:hover{
  background-color: #E5F1FB;
}
.maintopright2{
  padding: 0px 10px;
  display: flex;
  align-items: center;
}
.demonstration{
  margin-right: 10px;
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
.mytabel{
  width: 100%;
  height: 300px;
}
.ordermain{
  height: 400px;
  border:1px solid #ccc;
  border-radius: 10px;
  overflow: hidden;
}
.ordermainitem{
  padding: 10px 0px;
  border-bottom: 1px solid #ccc;
  display: flex;
  width: 100%;
}
.ordermainitem:last-child{
  border-bottom: 0px;
}
.ordermainiteml{
  width: 100px;
  padding: 10px;
  border-right: 1px solid #ccc;
  text-align: center;
}
.ordermainitemr{
  flex: 1;
  padding: 10px;
}
.imgbox{
	float: left;margin-right: 10px;
}
.mgt10vh .el-dialog{
	margin-top: 10vh !important; 
}
.center .cell{
  text-align: center !important;
}
</style>
