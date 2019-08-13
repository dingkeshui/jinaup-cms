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
              prop="kaolaBid"
              label="考拉品牌ID">
            </el-table-column>
            <el-table-column
              prop="kalaoBname"
              label="考拉品牌名称">
            </el-table-column>
            <el-table-column
              prop="jinaupBid"
              label="自己品牌ID">
            </el-table-column>
            <el-table-column
              prop="jinaupBname"
              label="自己品牌名称">
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
        title="选择自己的品牌"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <!-- <span class="mgr5">自己的品牌:</span> -->
        <el-select
          v-model="mybrandid"
          @change="mybrandchange"
          filterable="true"
          remote="true"
          size="small"
          clearable
          class="mgr5"
          @clear="mybrandclear"
          :remote-method="mybrandsearch"
          placeholder="搜/选自己品牌">
            <el-option
              v-for="item in mybrandlist"
              :key="item.bid"
              :label="item.chineseName"
              :value="item.bid">
            </el-option>
            <div style="position: sticky;background: #fff;height:30px;top:0;z-index:1">
              <p>
                <el-pagination
                small
                @current-change="mybrandPageChange"
                :page-size="20"
                :total="mybrandpage.num"
                layout="prev, pager, next, jumper"/>
              </p>
            </div>
        </el-select>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="surebrand">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'kaolabrand',
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
      // 考拉品牌列表
      kaobrandlist:'',
      // 考拉品牌页面
      kaobrandpage:{
        num:''
      },
      // 自己品牌列表
      mybrandlist:'',
      // 自己品牌页面
      mybrandpage:{
        num:''
      },
      mybrandid:'',
      mybranditem:'',
      kaobrandid:'',
      kaobranditem:''
  	}
  },
  created(){
    this.getkaolabrand()
    this.getmylabrand()
  },
  watch:{
    mybrandid(val){
      if(val){
        for(let i in this.mybrandlist){
          if(this.mybrandlist[i].bid==val){
            this.mybranditem = this.mybrandlist[i]
            break
          }
        }
      }
    }
  },
  methods:{
    change(item){
      this.dialogVisible = true
      this.kaobranditem = item
    },
    // 品牌对应
    surebrand(){
      console.log('品牌对应',this.kaobranditem,this.mybranditem)
      this.$api.kaolaBrandUp({kaolaBid:this.kaobranditem.kaolaBid,jinaupBid:this.mybranditem.bid,jinaupBname:this.mybranditem.chineseName},data=>{
        console.log('品牌对应',data)
        if(data.data.res_code==1){
          this.$message({
            showClose:true,
            type:'success',
            message:'品牌对应成功'
          })
          this.dialogVisible = false
          this.getkaolabrand()
        }else{
          this.$message({
            showClose:true,
            type:'error',
            message:'品牌对应失败'
          })
        }
      })
    },
  	getkaolabrand(){
      this.$api.kaolaBrandList(this.postkaobrand,data=>{
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
            message:'考拉品牌列表获取失败'
          })
        }
      })
    },
    // 获取品牌
    getmylabrand(){
      this.$api.brandList(this.postmybrand,data=>{
        if(data.status==200){
          if(data.data.res_code==1){
            this.mybrandlist = data.data.result
          }else{
            this.mybrandlist = ''
          }
          this.mybrandpage.num = data.data.total
        }else{
          this.$message({
            showClose:true,
            type:'error',
            message:'自己品牌列表获取失败'
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
      console.log('考拉品牌跳页')
      this.postkaobrand.pageIndex = item
      this.getkaolabrand()
    },
    // 自己品牌跳页
    mybrandPageChange(item){
      console.log('自己品牌跳页')
      this.postmybrand.pageIndex = item
      this.getmylabrand()
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
