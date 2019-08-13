<template>
  <div class="max flex2">
    <div class="pad10 flex">
      <div class="flex1">
        <el-select size="small" @change="searchfun" v-model="searchData.state" clearable placeholder="请选择">
          <el-option label="上线" value="1"></el-option>
          <el-option label="下线" value="0"></el-option>
        </el-select>
      </div>
      <div>
        <el-button @click="addgoods" type="primary" size="small">添加海报</el-button>
      </div>
    </div>
    <div class="maincontent">
      <div class="tablebox">
        <el-table
          :data="list"
          ref="multipleTable"
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
            prop="upid"
            label="海报ID"
            width="100">
          </el-table-column>
          <el-table-column
            prop="title"
            label="海报标题"
            min-width="150">
          </el-table-column>
          <el-table-column
            label="海报图片"
            width="120">
            <template slot-scope="scope">
                <img class="headimg" :src="scope.row.imgUrl">
            </template>
          </el-table-column>
          <el-table-column
            prop="sortId"
            label="海报排序"
            width="100">
          </el-table-column>
          <el-table-column
            label="海报状态"
            width="130">
            <template slot-scope="scope">
              <el-tag type="success" v-if="scope.row.state==1">上线中</el-tag>
              <el-tag type="info" v-if="scope.row.state==0">下线中</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="90">
            <template slot-scope="scope">
              <div><el-button @click="changebut(scope.row)" size="small" type="warning">更新</el-button></div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="pad10" style="text-align:right;">
      <el-pagination
        background
        page-size="20"
        @current-change="pageChange"
        :total="page.num"
        layout="total, prev, pager, next, jumper">
      </el-pagination>
    </div>
    <!-- 添加修改 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio v-model="form.state" label="1">上线</el-radio>
          <el-radio v-model="form.state" label="0">下线</el-radio>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="form.sortId"></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <div style="overflow: hidden">
              <div class="avatardiv">
                <input accept="image/*" ref="pcimg" @change="chooseimg" type="file" class="headimginp">
                <img v-if="imgUrl" :src="imgUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </div>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button v-if="isAddNew" type="primary" @click="addnew">确 定</el-button>
        <el-button v-else type="primary" @click="sureChange">保存编辑</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">

export default {
  name: 'poster',
  data () {
  	return {
      postData:{
        pageIndex:1
      },
      searchData:{
        state:''
      },
  		list:'',
      page:{
        num:''
      },
      // 显示选择商品
      dialogVisible:false,
      form:{
        title:'',
        state:'1',
        sortId:''
      },
      imgUrl:'',
      imgFile:'',
      // 是否添加新的
      isAddNew:false
  	}
  },
  created () {
  	this.getList()
  },
  watch:{
    goodsitem(val){
      if(val){
        this.$api.homeChoiceAdd({pid:val.pid},data=>{
          console.log('添加商品',data)
          if(data.data.res_code==1){
            this.$message({
              showClose:true,
              message:'添加商品成功',
              type:'success'
            })
            this.getList()
          }else{
            this.$message({
              showClose:true,
              message:'添加商品失败',
              type:'error'
            })
          }
        })
      }
    }
  },
  methods:{
    getList(){
      console.log('获取海报列表',this.postData)
      this.$api.posterList(this.postData,data=>{
        console.log(data)
        if(data.status==200){
          if(data.data.res_code==1){
            this.list = data.data.result
          }else{
            this.list = ''
          }
          this.page.num = data.data.total
        }else{
          this.$message({
            showClose:true,
            message:'获取海报列表失败',
            type:'error'
          })
        }
      })
    },
    addnew(){
      let formdata= new FormData()
      for(let i in this.form){
        formdata.append(i,this.form[i])
      }
      formdata.append('img',this.imgFile)
      this.$api.posterAdd(formdata,data=>{
        console.log(data)
        if(data.data.res_code==1){
          this.$message({
            showClose:true,
            message:'海报添加成功',
            type:'success'
          })
          this.dialogVisible = false
          this.getList()
        }else{
          this.$message({
            showClose:true,
            message:'海报添加失败',
            type:'error'
          })
        }
      })
    },
    addgoods(){
      this.dialogVisible = true
      this.form = {
        title:'',
        state:'1',
        sortId:''
      }
      this.isAddNew = true
      this.imgFile = ''
      this.imgUrl = ''
    },
    // 选择商品图
    chooseimg (item) {
      // 进入选择图片
      console.log('商品图',item)
      let that = this
      let headimginp 
      headimginp = that.$refs.pcimg.files[0]
      console.log(headimginp)
      let isLt2M = headimginp.size / 1024 / 1024 < 10
      // if (!isLt2M) {
      //   this.$message({
      //     message: '注意，图片大小不得大于10M',
      //     type: 'error'
      //   })
      //   return
      // }      
      let reads = new FileReader()
      reads.readAsDataURL(headimginp)
      reads.onload = function (e) {
        that.imgFile = headimginp
        that.imgUrl = e.target.result
      }
    },
    // searchfun
    searchfun(){
      for(let i in this.searchData){
        this.postData[i] = this.searchData[i]
      }
      this.postData.pageIndex = 1
      this.getList()
    },
    // 修改
    changebut(item){
      this.form.upid = item.upid
      this.form.title = item.title
      this.form.state = item.state+''
      this.form.sortId = item.sortId
      this.imgUrl = item.imgUrl
      this.imgFile = ''
      this.isAddNew = false
      this.dialogVisible = true 
    },
    sureChange(){
      console.log('确认修改',this.form)
      let formdata = new FormData()
      for(let i in this.form){
        formdata.append(i,this.form[i])
      }
      if(this.imgFile){
        formdata.append('img',this.imgFile)
      }
      this.$api.posterUp(formdata,data=>{
        console.log(data)
        if(data.data.res_code==1){
          this.$message({
            showClose:true,
            message:'海报修改成功',
            type:'success'
          })
          this.dialogVisible = false
          this.getList()
        }else{
          this.$message({
            showClose:true,
            message:'海报修改失败',
            type:'error'
          })
        }
      })
    },
  	pageChange(item){
      this.page.num = item
      this.getList()
    }
  }
}
</script>

<style type="text/css" scoped>
.max{
	width: 100%;
	height: 100%;
	background-color: #fff;
}
.headimg{
  max-height: 100px;
  max-width: 100px;
}
</style>
