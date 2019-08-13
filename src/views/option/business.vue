<template>
  <div class="box flex2">
  		<div class="flex">
  			<div class="flex1 flexvcenter">
  				<div class="pad10">
  					<el-select v-model="postData.levelType" @change="getList" size="small" placeholder="请选择分类">
					    <el-option
					      v-for="item in levelType"
					      :key="item.val"
					      :label="item.name"
					      :value="item.val">
					    </el-option>
					  </el-select>
  				</div>
  			</div>
  			<div class="flex flexcenter">
          <div class="pad10">
              <el-button type="primary" @click="addnewBus" size="small">新增信息</el-button>
          </div>
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
		        type="selection"
		        width="55">
		      </el-table-column>
	          <el-table-column
		        type="index"
            label="排序"
		        width="50">
		      </el-table-column>
	          <el-table-column
	            prop="title"
	            label="标题">
	          </el-table-column>
            <el-table-column
              prop="contentType"
              label="显示描述/链接">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.contentType==0" type="success">描述</el-tag>
                <el-tag v-else type="warning">链接</el-tag>
              </template>
            </el-table-column>
	          <el-table-column
	            prop="description"
	            label="描述">
	          </el-table-column>
             <el-table-column
              prop="jumpUrl"
              label="链接">
            </el-table-column>
	          <el-table-column
	            fixed="right"
	            label="操作"
	            width="100">
	            <template slot-scope="scope">
                <div class="mgb10"><el-button type="primary" @click="changeTax(scope.row)" size="small">修改</el-button></div>
	              <div><el-button type="warning" @click="delTax(scope.row)" size="small">删除</el-button></div>
	            </template>
	          </el-table-column>
	        </el-table>
        </div>
  		</div>
      <div class="minfoot">
        <el-pagination
          background
          page-size="20"
          current-change="currentChange"
          :total="pageinfo.total"
          layout="total, prev, pager, next, jumper">
        </el-pagination>
      </div>
      <!-- 新增商学院信息 -->
  		<el-dialog
		  :title="addnew?'新增商学院信息':'修改商学院信息'"
		  :visible.sync="dialogVisible"
		  width="50%">
		  <div class="flex mgb10 flexvcenter">
		  	<span class="colaaa" style="width:100px;">商学院分类</span>
		  	<span>{{levelTypeNmae}}</span>
		  </div>
		  <div class="flex mgb10 flexvcenter">
		  	<span class="colaaa" style="width:100px;">商学院标题</span>
		  	<el-input v-model="form.title" placeholder="请输入商学院标题"></el-input>
		  </div>
		  <div class="flex mgb10 flexvcenter">
		  	<span class="colaaa" style="width:100px;">链接/描述</span>
		  	<el-radio v-model="form.contentType" label="1">链接</el-radio>
        <el-radio v-model="form.contentType" label="0">描述</el-radio>
		  </div>
      <div v-if="form.contentType==0" class="flex mgb10 flexvcenter">
        <span class="colaaa" style="width:100px;">商学院描述</span>
        <el-input
          type="textarea"
          :rows="3"
          placeholder="请输入内容"
          v-model="form.description">
        </el-input>
      </div>
      <div v-else class="flex mgb10 flexvcenter">
        <span class="colaaa" style="width:100px;">商学院链接</span>
        <el-input v-model="form.jumpUrl" placeholder="请输入商学院链接"></el-input>
      </div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button v-if="addnew" type="primary" @click="addnewfun">添 加</el-button>
		    <el-button v-else type="primary" @click="changefun">保 存</el-button>
		  </span>
		</el-dialog>
  </div>
</template>

<script type="text/javascript">

export default {
  name: 'productTax',
  data () {
  	return {
  		postData:{
  			pageIndex:0,
        levelType:1
  		},
      // 页面信息
      pageinfo:{
        total:''
      },
  		dialogVisible:false,
  		// 添加还是修改
  		addnew:true,
  		// 分类数组
      levelType:[{name:'新人',val:1},{name:'初级',val:2},{name:'中级',val:3},{name:'高级',val:4}],
  		// 表格数据
  		list:"",
  		form:{
  			levelType:'',
  			title:'',
  			description:'',
  			jumpUrl:'',
        contentType:'0'
  		}
  	}
  },
  created(){
  	this.getList()
  },
  methods:{
  	getList () {
  		console.log('获取分类列表')
  		let that = this
  		console.log(that.postData)
  		that.$api.collegeList(that.postData,(res)=>{
  			console.log(res)
  			if(res.status!=200){
  				this.$message({
			      showClose: true,
			      message: '抱歉，商学院信息列表获取失败！',
			      type: 'error'
			    })
  			}else{
  				if(res.data.res_code==1){
	  				that.list = res.data.result
	  				console.log(that.list)
  				} else {
  					that.list = ""
  				}
          that.pageinfo.total = data.data.total
  			}
  		})
  	},
    currentChange(item){
      this.postData.pageIndex = item
      this.getList()
    },
    // 新增商学院信息
    addnewBus () {
      this.dialogVisible = true
      this.addnew = true
      this.form = {
        levelType:this.postData.levelType,
        title:'',
        description:'',
        jumpUrl:'',
        contentType:'0'
      }
    },
  	// 修改信息
  	changeTax (item) {
  		console.log('修改信息')
  		let that = this
  		that.form = {
  			bsiid:item.bsiid ,
  			levelType:item.levelType,
        title:item.title,
        description:item.description,
        jumpUrl:item.jumpUrl,
        contentType:item.contentType+''
  		}
  		that.dialogVisible = true
  		that.addnew = false
  	},
  	// 添加确认
  	addnewfun () {
  		console.log('确认学院添加')
  		let that = this
  		that.$api.collegeAdd(that.form,(data)=>{
  			console.log(data)
  			if(data.data.res_code==1){
  				that.$message({
  					showClose:true,
  					message:'添加成功',
  					type:'success'
  				})
  				that.dialogVisible = false
  				that.getList()
  			}else{
  				that.$message({
  					showClose:true,
  					message:'添加失败',
  					type:'error'
  				})
  			}
  		})
  	},
    // 删除
    delTax (item) {
      console.log('删除')
      console.log(item)
      let that= this
      that.$confirm('确定将 '+item.title+' 删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          that.$api.collegeDel({bsiid:item.bsiid},(data)=>{
            console.log(data)
            if(data.data.res_code==1){
              that.$message({
                showClose:true,
                message:'删除成功',
                type:'success'
              })
              that.getList()
            }else{
              that.$message({
                showClose:true,
                message:'删除失败',
                type:'error'
              })
            }
          })
        }).catch(() => {
          console.log('取消确认删除')  
        })
    },
  	// 确认保存修改
  	changefun () {
  		console.log('确认保存修改')
  		let that = this
  		console.log(that.form)
  		that.$api.collegeUpdata(that.form,(data)=>{
  			if(data.data.res_code==1){
  				that.$message({
  					showClose:true,
  					message:'修改成功',
  					type:'success'
  				})
  				that.getList()
  				that.dialogVisible =false
  			} else {
  				that.$message({
  					showClose:true,
  					message:'修改失败',
  					type:'error'
  				})
  			}
  		})
  	}
  },
  computed:{
    levelTypeNmae(){
      return this.levelType[this.postData.levelType-1].name
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
.w100{
	width: 100%;
}
</style>
