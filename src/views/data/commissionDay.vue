<template>
  <div class="box flex2">
  		<div class="pad10 flex">
  			<div class="flex1">
            <el-date-picker
              v-model="searchData.startTime"
              type="date"
              size="mini"
              value-format="yyyyMMdd"
              placeholder="开始日期">
            </el-date-picker>
            <el-date-picker
              v-model="searchData.endTime"
              type="date"
              size="mini"
              value-format="yyyyMMdd"
              placeholder="结束日期">
            </el-date-picker>
        </div>
  			<div class="flex flexcenter">
  				<el-button type="primary" @click="searchBut" size="mini" icon="el-icon-search">搜索</el-button>
          <el-button :loading="downLoading" type="primary" @click="downgoods" size="mini" icon="el-icon-download">佣金报表导出</el-button>
          <el-button :loading="downLoading2" type="primary" @click="downClassNum" size="mini" icon="el-icon-download">分类销售额导出</el-button>
          <el-button :loading="downLoading3" type="primary" @click="downNum" size="mini" icon="el-icon-download">销售额导出</el-button>
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
		        type="index"
		        width="50">
		      </el-table-column>
	          <el-table-column
	            prop="statDate"
	            label="统计时间">
	          </el-table-column>
            <el-table-column
              label="佣金状态"
              width="100">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.businessType==0" type="primary">退款</el-tag>
                <el-tag v-if="scope.row.businessType==1" type="danger">预估分佣</el-tag>
                <el-tag v-if="scope.row.businessType==2" type="warning">结算分佣</el-tag>
                <!-- <el-tag v-if="scope.row.businessType==3" type="success">提现</el-tag> -->
              </template>
            </el-table-column>
            <el-table-column
              label="佣金类型"
              width="150">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.commissionType==1" type="primary">自购佣金</el-tag>
                <el-tag v-if="scope.row.commissionType==2" type="danger">销售佣金</el-tag>
                <el-tag v-if="scope.row.commissionType==3" type="warning">管理佣金</el-tag>
                <el-tag v-if="scope.row.commissionType==4" type="success">会员商品佣金</el-tag>
              </template>
            </el-table-column>
	          <el-table-column
	            prop="commissionLevel"
	            label="佣金等级">
	          </el-table-column>
	          <el-table-column
	            prop="totalAmount"
	            label="总金额">
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
  name: 'classOrder',
  data () {
  	return {
      downLoading:false,
      downLoading2:false,
      downLoading3:false,
  		postData:{
  			pageIndex:1
  		},
  		// 银行信息列表
  		list:'',
  		// 银行组件传递的值
  		searchData:{},
      page:{
        num:''
      }
  	}
  },
  created(){
  	this.getList()
  },
  methods:{
    downNum(){
      this.downLoading3 = true
      let downgoodsdata = {}
      for (let i in this.searchData) {
        if(i!='pageIndex'){
          downgoodsdata[i] = this.searchData[i]
        }
      }
      console.log('导出商品',downgoodsdata)
      this.$api.statSalesExport(downgoodsdata).then(data=>{
        if (data.data) {
          console.log('下载商品',data)
          if(!!window.ActiveXObject || "ActiveXObject" in window) {
            console.log('ie浏览器')
            let blob = new Blob([data.data])
            let fileName = '销售额.xlsx'
            navigator.msSaveBlob(blob, fileName)
          } else {
            let content = data.data
            let elink = document.createElement('a');
            let blob = new Blob([content]);
            elink.download = "销售额.xlsx";
            elink.style.display = 'none';
            elink.href = URL.createObjectURL(blob)
            document.body.appendChild(elink)
            elink.click()
            document.body.removeChild(elink)
            window.URL.revokeObjectURL(blob)
          }
        } else {
          this.$message({
            showClose: true,
            message: '抱歉，导出失败！',
            type: 'error'
          })
        }
        this.downLoading3 = false
      }).catch(data=>{
        console.log('catch',data)
        this.$message({
          showClose: true,
          message: data.data.message?data.data.message:'抱歉，导出失败！',
          type: 'error'
        })
        this.downLoading3 = false
      })
    },
    downClassNum(){
      this.downLoading2 = true
      let downgoodsdata = {}
      for (let i in this.searchData) {
        if(i!='pageIndex'){
          downgoodsdata[i] = this.searchData[i]
        }
      }
      console.log('导出商品',downgoodsdata)
      this.$api.statCategoryExport(downgoodsdata).then(data=>{
        if (data.data) {
          console.log('下载商品',data)
          if(!!window.ActiveXObject || "ActiveXObject" in window) {
            console.log('ie浏览器')
            let blob = new Blob([data.data])
            let fileName = '分类销售额.xlsx'
            navigator.msSaveBlob(blob, fileName)
          } else {
            let content = data.data
            let elink = document.createElement('a');
            let blob = new Blob([content]);
            elink.download = "分类销售额.xlsx";
            elink.style.display = 'none';
            elink.href = URL.createObjectURL(blob)
            document.body.appendChild(elink)
            elink.click()
            document.body.removeChild(elink)
            window.URL.revokeObjectURL(blob)
          }
        } else {
          this.$message({
            showClose: true,
            message: '抱歉，导出失败！',
            type: 'error'
          })
        }
        this.downLoading2 = false
      }).catch(data=>{
        console.log('catch',data)
        this.$message({
          showClose: true,
          message: data.data.message?data.data.message:'抱歉，导出失败！',
          type: 'error'
        })
        this.downLoading2 = false
      })
    },
    downgoods(){
      this.downLoading = true
      let downgoodsdata = {}
      for (let i in this.searchData) {
        if(i!='pageIndex'){
          downgoodsdata[i] = this.searchData[i]
        }
      }
      console.log('导出商品',downgoodsdata)
      this.$api.commissionDistributionExport(downgoodsdata).then(data=>{
        if (data.data) {
          console.log('下载商品',data)
          if(!!window.ActiveXObject || "ActiveXObject" in window) {
            console.log('ie浏览器')
            let blob = new Blob([data.data])
            let fileName = '每日佣金分配.xlsx'
            navigator.msSaveBlob(blob, fileName)
          } else {
            let content = data.data
            let elink = document.createElement('a');
            let blob = new Blob([content]);
            elink.download = "每日佣金分配.xlsx";
            elink.style.display = 'none';
            elink.href = URL.createObjectURL(blob)
            document.body.appendChild(elink)
            elink.click()
            document.body.removeChild(elink)
            window.URL.revokeObjectURL(blob)
          }
        } else {
          this.$message({
            showClose: true,
            message: '抱歉，导出失败！',
            type: 'error'
          })
        }
        this.downLoading = false
      }).catch(data=>{
        console.log('catch',data)
        this.$message({
          showClose: true,
          message: data.data.message?data.data.message:'抱歉，导出失败！',
          type: 'error'
        })
        this.downLoading = false
      })
    },
  	getList () {
  		console.log('获取银行列表')
  		let that = this
  		that.$api.commissionDistributionList(that.postData,(data)=>{
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
