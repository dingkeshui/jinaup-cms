<template>
  <div class="box flex2">
  		<div class="pad10 flex">
  			<div class="flex1 flex flexvcenter">
          <span class="mgr10 on">区域路径:</span>
          <span class="hand colaaa" @click="chooseht('tonull')">中国</span>
          <template v-for="(item,index) in htarr">
            <span class="pad5 colaaa">/</span>
            <span class="hand colaaa" @click="chooseht(index)">{{item.name}}</span>
          </template>   
        </div>
  			<div class="flex flexcenter">
  				<el-button @click="addnewfun" type="primary" size="mini">添加区域</el-button>
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
	          <!-- <el-table-column
		        type="selection"
		        width="55">
		      </el-table-column> -->
	          <el-table-column
            label="排序"
		        type="index"
		        width="50">
		      </el-table-column>
	          <el-table-column
	            prop="name"
	            label="区域名称">
	          </el-table-column>
            <el-table-column
              prop="nameEn"
              label="英文名称">
            </el-table-column>
	          <el-table-column
	            prop="adcode"
	            label="考拉编码">
	          </el-table-column>
	          <el-table-column
	            prop="citycode"
	            label="城市编码">
	          </el-table-column>
            <el-table-column
              prop="lng"
              label="经度">
            </el-table-column>
            <el-table-column
              prop="lat"
              label="纬度">
            </el-table-column>
	          <el-table-column
	            label="子区域"
              align="center"
	            width="100">
	            <template slot-scope="scope">
	              <div class="mgb10"><el-button type="primary" class="minbut" @click="getchildren(scope.row)" size="small">查 看</el-button></div>
                <div><el-button type="warning" class="minbut" @click="changlocation(scope.row)" size="small">修 改</el-button></div>
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
      <!-- 添加区域 -->
      <el-dialog
        :title="addnew?'添加区域':'编辑区域信息'"
        :visible.sync="dialogVisible"
        width="50%">
        <div class="pad5 flex flexvcenter">
          <span class="mgr10 w80">父级区域</span>
          <span>中国</span>
          <span v-for="(item,index) in htarr">{{index==htarr.length-1?'':' / '}}{{item.name}}</span>
        </div>
        <div class="pad5 flex flexvcenter">
          <span class="mgr10 w80">名称</span>
          <el-input size="small" class="flex1" placeholder="区域名称" v-model="addForm.name"></el-input>
        </div>
        <div class="pad5 flex flexvcenter">
          <span class="mgr10 w80">英文名称</span>
          <el-input size="small" class="flex1" placeholder="区域英文名称" v-model="addForm.nameEn"></el-input>
        </div>
        <div class="pad5 flex flexvcenter">
          <span class="mgr10 w80">城市区码</span>
          <el-input size="small" class="flex1" placeholder="城市区码" v-model="addForm.citycode"></el-input>
        </div>
        <div class="pad5 flex flexvcenter">
          <span class="mgr10 w80">考拉编码</span>
          <el-input size="small" class="flex1" placeholder="考拉编码" v-model="addForm.adcode"></el-input>
        </div>
        <div class="pad5 flex flexvcenter">
          <span class="mgr10 w80">经度</span>
          <el-input size="small" class="flex1" placeholder="经度" v-model="addForm.lng"></el-input>
        </div>
        <div class="pad5 flex flexvcenter">
          <span class="mgr10 w80">纬度</span>
          <el-input size="small" class="flex1" placeholder="纬度" v-model="addForm.lat"></el-input>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button v-if="addnew" type="primary" @click="suraddfun">添 加</el-button>
          <el-button v-else type="primary" @click="surchangefun">保存编辑</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script type="text/javascript">

export default {
  name: 'bank',
  data () {
  	return {
  		postData:{
  			pageIndex:1,
        pid:1
  		},
  		// 区域信息列表
  		list:'',
      // 区域路径
      htarr:[],
      // 添加区域div
      dialogVisible:false,
      // 添加区域还是编辑区域
      addnew:true,
      // 添加区域的form
      addForm:{
        // 中文名
        name:'',
        // 英文名
        nameEn:'',
        // 区域编码
        code:''
      },
      // 选中的区域信息
      locationOn:'',
      page:{
        num:''
      }
  	}
  },
  created(){
  	this.getList()
  },
  methods:{
  	getList (item) {
  		console.log('获取区域列表')
      console.log(item)
  		let that = this
      console.log(that.postData)
  		that.$api.htList(that.postData,(data)=>{
  			console.log(data)
  			if(data.status==200){
          if (item) {
            that.htarr.push(item)
          }
  				if(data.data.res_code==1){
  					that.list=data.data.result
  				} else {
            that.list = ""
          }
          that.page.num = data.data.total
  			}else{
  				that.$message({
		          showClose: true,
		          message: data.data.message?data.data.message:'抱歉，区域列表获取失败！',
		          type: 'error'
		        })
  			}
  		})
  	},
    pageChange(item){
      this.postData.pageIndex = item
      this.getList()
    },
  	// 添加区域
  	addnewfun () {
  		console.log('添加区域')
  		let that = this
  		that.dialogVisible = true
      that.addnew = true
      let item  = this.htarr[this.htarr.length-1].info
      that.addForm = {
        name:'',
        nameEn:'',
        citycode:item.citycode,
        adcode:item.adcode,
        lng:item.lng,
        lat:item.lat
      }
  	},
    // 编辑区域
    changlocation (item) {
      console.log('编辑区域item',item)
      let that = this
      that.dialogVisible = true
      that.addnew = false
      that.addForm={
        name:item.name,
        nameEn:item.nameEn,
        citycode:item.citycode,
        adcode:item.adcode,
        lng:item.lng,
        lat:item.lat
      }
      that.locationOn = item
    },
    // 删除区域
    remove (item) {
      console.log('删除区域')
      let that = this
      that.$confirm('确定将 '+item.name+' 删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          that.$api.htDel({id:item.id}, (data)=>{
            console.log(data)
            if (data.data.res_code==1) {
              that.getList()
              that.$message({
                showClose:true,
                type:'success',
                message:'区域删除成功！'
              })
            } else {
              that.$message({
                showClose:true,
                type:'error',
                message:data.data.message?data.data.message:'区域删除失败！'
              })
            }
          })
        }).catch(() => {
                  
        });
    },
  	// 点击确定按钮
  	suraddfun () {
  		console.log('点击确定按钮')
  		let that = this
      that.addForm.pid = that.postData.pid
      console.log(that.addForm)
  		that.$api.htAdd(that.addForm, (data)=>{
        console.log(data)
        if (data.data.res_code==1) {
          that.dialogVisible = false
          that.$message({
            showClose:true,
            message:'区域添加成功',
            type:'success'
          })
          that.getList()
        } else {
          that.$message({
            showClose:true,
            message:data.data.message?data.data.message:'区域添加失败',
            type:'error'
          })
        }
      })
  	},
    // 保存编辑区域
    surchangefun () {
      console.log('保存编辑区域')
      let that = this
      that.addForm.id = that.locationOn.id
      console.log(that.addForm)
      that.$api.htUpdata(that.addForm, (data)=>{
        console.log(data)
        if (data.data.res_code==1) {
          that.dialogVisible = false
          that.$message({
            showClose:true,
            message:'区域编辑成功',
            type:'success'
          })
          that.getList()
        } else {
          that.$message({
            showClose:true,
            message:data.data.message?data.data.message:'区域编辑失败',
            type:'error'
          })
        }
      })
    },
    // 查看子区域
    getchildren (item) {
      console.log('查看子区域')
      let that = this
      that.postData.pid = item.id
      that.postData.pageIndex = 1
      that.getList({
        name:item.name,
        id:item.id,
        info:item
      })
    },
    // 选择某一区域
    chooseht (index) {
      console.log('选择某一区域')
      let that = this
      console.log(index)
      if (index == 'tonull') {
        that.htarr = []
        that.postData={
          pageIndex:1,
          pid:1
        }
      } else {
        that.htarr = that.htarr.slice(0,index+1)
        console.log('htarr',that.htarr)
        that.postData={
          pageIndex:1,
          pid:that.htarr[index].id
        }
      }
      that.getList()
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
.w80{
  width: 80px;
}
</style>
