<template>
  <div class="box flex2">
      <div class="flex">
        <div class="flex1 flexvcenter">
          <div class="pad10">
            <el-select v-model="postData.pageId" @change="getList" size="small" placeholder="请选择分类">
              <el-option
                v-for="item in helplist"
                :key="item.pageType"
                :label="item.pageName"
                :value="item.pageType">
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
      :title="addnew?'新增信息':'修改信息'"
      :visible.sync="dialogVisible"
      width="50%">
      <div class="flex mgb10 flexvcenter">
        <span class="colaaa" style="width:100px;">信息标题</span>
        <el-input v-model="form.title" placeholder="请输入信息标题"></el-input>
      </div>
      <div class="flex mgb10 flexvcenter">
        <span class="colaaa" style="width:100px;">链接/描述</span>
        <el-radio v-model="form.contentType" label="1">链接</el-radio>
        <el-radio v-model="form.contentType" label="0">描述</el-radio>
      </div>
      <div v-if="form.contentType==0" class="flex mgb10 flexvcenter">
        <span class="colaaa" style="width:100px;">信息描述</span>
        <el-input
          type="textarea"
          :rows="3"
          placeholder="请输入内容"
          v-model="form.description">
        </el-input>
      </div>
      <div v-else class="flex mgb10 flexvcenter">
        <span class="colaaa" style="width:100px;">信息链接</span>
        <el-input v-model="form.jumpUrl" placeholder="请输入信息链接"></el-input>
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
  name: 'help',
  data () {
    return {
      postData:{
        pageIndex:0,
        pageId:''
      },
      // 帮助信息
      helplist:'',
      // 页面信息
      pageinfo:{
        total:''
      },
      dialogVisible:false,
      // 添加还是修改
      addnew:true,
      // 表格数据
      list:"",
      form:{
        pageId:'',
        title:'',
        description:'',
        jumpUrl:'',
        contentType:'0'
      }
    }
  },
  created(){
    this.gethelp()
  },
  methods:{
    gethelp(){
      console.log('获取help')
      let that = this
      that.$api.getHelpInfo((data)=>{
        console.log(data)
        if(data.status==200){
          if(data.data.res_code==1){
            that.helplist = data.data.result
          }else{
            that.helplist = "" 
          }
          that.pageinfo.total = data.data.total
        }else{
          that.$message({
            showClose:true,
            message:'获取帮助页面信息失败',
            type:'error'
          })
        }
      })
    },
    currentChange(item){
      this.postData.pageIndex = item
      this.getList()
    },
    getList () {
      console.log('获取分类列表')
      let that = this
      console.log(that.postData)
      that.$api.helpList(that.postData,(res)=>{
        console.log(res)
        if(res.status!=200){
          this.$message({
            showClose: true,
            message: '抱歉，列表获取失败！',
            type: 'error'
          })
        }else{
          if(res.data.res_code==1){
            that.list = res.data.result
          } else {
            that.list = ""
          }
        }
      })
    },
    // 新增商学院信息
    addnewBus () {
      this.dialogVisible = true
      this.addnew = true
      this.form = {
        pageId:this.postData.pageId,
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
        hiid:item.hiid,
        pageId:item.pageId,
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
      console.log('确认信息添加')
      let that = this
      console.log(that.form)
      that.$api.helpAdd(that.form,(data)=>{
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
          that.$api.helpDel({bsiid:item.hiid},(data)=>{
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
      that.$api.helpUpdata(that.form,(data)=>{
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
    // 计算属性
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
