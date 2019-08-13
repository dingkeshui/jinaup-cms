<template>
  <div class="max flex2">
      <!-- <div class="flex">
        <div class="flex1 flexvcenter">
          <div class="pad10">
          </div>
        </div>
        <div class="flex flexcenter">
          <div class="pad10">
              <el-button type="primary" @click="addnewBus" size="small">新增信息</el-button>
          </div>
        </div>
      </div> -->
      <div class="flex1" style="position:relative;">
        <div class="tablebox">
        <el-table
            :data="kaobrandlist"
            border
            stripe
            height="100%"
            style="width: 100%">
            <el-table-column
              type="index"
              label="排序"
              width="50">
            </el-table-column>
            <el-table-column
              prop="kaolaCid"
              label="考拉分类ID">
            </el-table-column>
            <el-table-column
              prop="kalaoCname"
              label="考拉分类名称">
            </el-table-column>
            <el-table-column
              prop="jinaupCid"
              label="自己分类ID">
            </el-table-column>
            <el-table-column
              prop="jinaupCname"
              label="自己分类名称">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              align="center"
              width="100">
              <template slot-scope="scope">
                <div class="mgb10"><el-button type="primary" @click="change(scope.row)" size="small">修改</el-button></div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="minfoot">
        <el-pagination
          background
          page-size="20"
          @current-change="kaobrandPageChange"
          :total="kaobrandpage.num"
          layout="total, prev, pager, next, jumper">
        </el-pagination>
      </div>
      <!--  -->
      <el-dialog
        title="选择自己的分类"
        :visible.sync="dialogVisible"
        width="300px"
        :before-close="handleClose">
        <div class="mgb10">
          <span class="mgr5">考拉分类:</span>
          <span>{{kaoclassitem.kalaoCname}}</span>
        </div>
        <!-- 一级分类 -->
            <div class="mgb5">
              <el-select
              v-model="onClass['0']"
              @change="classChange('1')"
              filterable="true"
              class="mgr5"
              clearable
              placeholder="一级分类">
                <el-option
                  v-for="item in classlist['0']"
                  :key="item.cid"
                  :label="item.cname"
                  :value="item.cid">
                </el-option>
              </el-select>
            </div>
            <!-- 二级分类 -->
            <div class="mgb5">
              <el-select
              v-model="onClass['1']"
              @change="classChange('2')"
              class="mgr5"
              filterable="true"
              clearable
              placeholder="二级分类">
                <el-option
                  v-for="item in classlist['1']"
                  :key="item.cid"
                  :label="item.cname"
                  :value="item.cid">
                </el-option>
              </el-select>
            </div>
            <!-- 三级分类 -->
            <div>
              <el-select
              v-model="onClass['2']"
              @change="classChange('3')"
              class="mgr5"
              filterable="true"
              clearable
              placeholder="三级分类">
                <el-option
                  v-for="item in classlist['2']"
                  :key="item.cid"
                  :label="item.cname"
                  :value="item.cid">
                </el-option>
              </el-select>
            </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="surebrand">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'kaolaclass',
  data(){
  	return {
      dialogVisible:false,
      // 考拉品牌参数
      postkaobrand:{
        pageIndex:1
      },
      // 自己品牌参数
      postmybrand:{
        pageIndex:1
      },
      // 考拉分类列表
      onClass:[],
      classlist:[],
      // 考拉品牌页面
      kaobrandpage:{
        num:''
      },
      // 自己品牌页面
      mybrandpage:{
        num:''
      },
      kaobrandlist:'',
      myClassitem:'',
      kaoclassitem:''
  	}
  },
  created(){
    this.getkaolabrand()
    this.getClassList()
  },
  watch:{

  },
  methods:{
    change(item){
      this.dialogVisible = true
      this.kaoclassitem = item
    },
    // 品牌对应
    surebrand(){
      if(this.onClass.length<3){
        this.$message({
          showClose:true,
          type:'error',
          message:'请选择三级分类！'
        })
        return
      }
      console.log('分类对应',this.onClass)
      this.$api.kaolaClassUp({kaolaCid:this.kaoclassitem.kaolaCid,jinaupCid:this.myClassitem.cid,jinaupCname:this.myClassitem.cname},data=>{
        console.log('品牌对应',data)
        if(data.data.res_code==1){
          this.$message({
            showClose:true,
            type:'success',
            message:'分类对应成功'
          })
          this.dialogVisible = false
          this.getkaolabrand()
        }else{
          this.$message({
            showClose:true,
            type:'error',
            message:'分类对应失败'
          })
        }
      })
    },
    // 分类改变
    classChange(item){
      console.log('分类改变',item,this.classlist,this.onClass)
      if (item == 3) {
        console.log('进入3')
        for (let i in this.classlist[2]) {
          if (this.classlist[2][i].cid == this.onClass[2]) {
            this.myClassitem = this.classlist[2][i]
            console.log('myClassitem',this.myClassitem,this.classlist[2][i])
            return
          }
        }
      } else {
        console.log('进入else')
        this.onClass = this.onClass.slice(0,item)
        this.classlist = this.classlist.slice(0,item)
        this.getClassList()
      }
    },
    // 获取分类列表
    getClassList(){
      console.log('获取分类列表')
      let res
      if (this.onClass.length) {
        res = this.onClass[this.onClass.length-1]
      }else{
        res = 0
      }
      this.$api.categoryList({parentId:res},data=>{
        console.log(data)
        if (data.status==200) {
          if (data.data.res_code==1) {
            this.classlist.push(data.data.result)
          }else{

          }
        } else {
          this.$message({
            showClose: true,
            message: '抱歉，分类列表获取失败！',
            type: 'error'
          })
        }
      })
    },
  	getkaolabrand(){
      console.log('获取考拉分类列表')
      this.$api.kaolaClassList(this.postkaobrand,data=>{
        console.log(data)
        if(data.status==200){
          if(data.data.res_code==1){
            this.kaobrandlist = data.data.result
          }else{
            this.kaobrandlist = ''
          }
          this.kaobrandpage.num = data.data.total
        }else{
          this.$message({
            showClose:true,
            type:'error',
            message:'考拉分类列表获取失败'
          })
        }
      })
    },
    // 清空品牌搜索
    mybrandclear () {
      console.log('清空品牌搜索')
      this.postmybrand = {
        pageIndex:1
      }
      this.getmylabrand()
    },
     // 自己品牌搜索
    mybrandsearch (item) {
      console.log('品牌搜索',item)
      this.postmybrand.chineseName = item
      this.postmybrand.pageIndex = 1
      this.getmylabrand()
    },
    // 考拉品牌跳页
    kaobrandPageChange(item){
      this.postkaobrand.pageIndex = item
      this.getkaolabrand()
    },
    // 自己品牌跳页
    mybrandPageChange(item){
      this.mybrandpage = item
      this.getClassList()
    }
  }
}
</script>

<style type="text/css" scoped>
.item{
	margin-bottom: 20px;
	border:1px solid #ccc;
	border-radius: 10px;
}
</style>
