<template>
	<div id="specialList">
		<transition name="fade">
		<div class="box" v-if="!showInfo">
			<div class="miantop">
			    <div class="maintopleft">
			        
			    </div>
			    <div class="flex flexvcenter pad5">
            <el-button type="primary" size="small" @click="addbut" >增加锚点</el-button>
            <el-button type="primary" size="small" @click="upGoods" >导入商品</el-button>
			    	<el-button v-if="itemdata" type="primary" size="small" @click="closepageitem">取消</el-button>
			    </div>
			</div>
			<div class="maincontent" v-loading="vloading">
		      	<div class="tablebox">
			        <el-table
			          :data="list"
			          border
			          stripe
			          height="100%">
                <el-table-column
                  type="index"
                  label="排序"
                  width="50">
                </el-table-column>
                <el-table-column
                  prop="said"
                  width="100px"
                  label="锚点ID">
                </el-table-column>
			          <el-table-column
			            prop="anchorName"
                  width="100px"
			            label="锚点昵称">
			          </el-table-column>
                <el-table-column
                  prop="anchorDesc"
                  label="锚点描述">
                </el-table-column>
			          <el-table-column
			            prop="sortId"
			            label="锚点排序">
			          </el-table-column>
                <el-table-column
                  label="UI样式">
                  <template slot-scope="scope">
                    <el-tag size="small" v-if="scope.row.uiType==1" type="success">一行一个商品</el-tag>
                    <el-tag size="small" v-if="scope.row.uiType==2" type="warning">一行两个商品</el-tag>
                    <el-tag size="small" v-if="scope.row.uiType==3">一行三个商品</el-tag>
                  </template>
                </el-table-column>
			          <el-table-column
			            fixed="right"
                  align="center"
			            label="操作">
			            <template slot-scope="scope">
			              <div class="mgb5"><el-button class="minbut" type="primary" @click="changebut(scope.row)" size="small">查看详情</el-button></div>
			              <div><el-button class="minbut" type="warning" @click="remove(scope.row)" size="small">删除</el-button></div>
			            </template>
			          </el-table-column>
			        </el-table>
		      	</div>
		    </div>
		    <div class="minfoot">
		      <el-pagination
		        background
            page-size="20"
		        :total="page.num"
            @current-change="pageChange"
		        layout="total, prev, pager, next, jumper">
		      </el-pagination>
		    </div>
		</div>
    <div v-else style="width:100%;height:100%;">

    </div>
		</transition>
    <!-- 增加锚点 -->
    <el-dialog
      :title="onAnchorl?'锚点信息':'增加锚点'"
      :visible.sync="dialogVisible"
      fullscreen="true"
      class="flexdialog"
      :before-close="handleClose">
      <div class="flex2" style="height:100%;">
        <div class="flex1">
          <el-scrollbar class="noxscroll pad10" style="height:100%;">
            <el-form ref="form" :model="form" label-width="120px">
              <el-form-item label="锚点名称">
                <el-input v-model="form.anchorName"></el-input>
              </el-form-item>
              <el-form-item label="锚点描述">
                <el-input v-model="form.anchorDesc"></el-input>
              </el-form-item>
              <el-form-item label="排序序号">
                <el-input v-model="form.sortId"></el-input>
              </el-form-item>
              <el-form-item label="UI样式">
                <el-select v-model="form.uiType" placeholder="请选择UI样式">
                  <el-option label="一行一个" value="1"></el-option>
                  <el-option label="一行两个" value="2"></el-option>
                  <el-option label="一行三个" value="3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="锚点商品">
                <div><el-button size="small" type="primary" @click="addgoods">选择商品</el-button></div>
                <div v-if="goodslitem">
                  <table cellspacing="0" class="tab">
                      <tr>
                        <td>商品ID</td>
                        <td class="flex1">商品昵称</td>
                        <td>商品图片</td>
                        <td>操作</td>
                      </tr>
                      <tr v-for="(item,index) in goodslitem" :key="index">
                        <td>{{item.pid}}</td>
                        <td class="flex1">{{item.title}}</td>
                        <td><img :src="item.mainImgUrl"></td>
                        <td><el-button @click="removeOneGoods(index)" type="warning" size="small">删除商品</el-button></td>
                      </tr>
                  </table>
                </div>
              </el-form-item>
            </el-form>
          </el-scrollbar>
        </div>
        <div class="pad10" style="text-align:right;">
          <el-button v-if="!onAnchorl" @click="addbutfun" type="primary">确定添加</el-button>
          <el-button v-else @click="changebutfun" type="primary">保存编辑</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- 添加商品 -->
    <el-dialog
      title="添加商品"
      :visible="showgoodslist"
      width="80%"
      class="mg5vh"
      @close="clospagegoods">
      <goodslist @closepage="clospagegoods" @moregoods="getMoreGoods" :ongoodsdata="goodslitem?goodslitem:[]" itemdata="more"></goodslist>
    </el-dialog>
    <!-- 导入商品 -->
    <el-dialog
      title="批量上传商品"
      :visible.sync="showUpSku"
      width="30%"
      :before-close="handleClose">
      <span class="inpbox mgb10">
        <el-button size="small" type="primary">选择文件</el-button>
        <input class="inp" ref="mainimg" type="file" @change="filechange" name="">
      </span>
      <p v-if="file" class="fs12"><span class="mgr10">文件名:{{file.name}}</span><span>大小:{{file.fileSize}}</span></p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showUpSku = false">取 消</el-button>
        <el-button type="primary" :loading="upSkuButLoading" @click="upSkuFileFun">确 定</el-button>
      </span>
    </el-dialog>
	</div>
</template>

<script type="text/javascript">
import goodslist from '@/components/goods/goodslist.vue'
export default {
  name: 'anchoilist',
  props:['itemdata'],
  components:{
  	goodslist
  },
  data () {
    return {
    	postData:{
    		pageIndex:1,
    	},
      page:{
        num:""
      },
    	list:'',
      // 选中的商品列表
      goodslitem:'',
      // 增加锚点
      dialogVisible:false,
      // 添加商品
      showgoodslist:false,
    	// 是否显示showInfo
    	showInfo: false,
      form:{},
      // 编辑的锚点
      onAnchorl:'',
      showUpSku:false,
      file:'',
      upSkuButLoading:false
    }
  },
  created () {
    console.log('itemdata',this.itemdata)
    this.postData.sidd = this.itemdata.siid
  	this.getlist()
  },
  watch:{
    goodslitem (val) {
      console.log('选中的商品列表改变')
      console.log(val)
    },
    onAnchorl(val){
      if(val){
        this.goodslitem = val.productInfoVos
      }else{
        this.goodslitem = ""
      }
    }
  },
  methods: {
  	// 获取列表
  	getlist () {
  		console.log('获取锚点列表')
  		let that = this
  		console.log(that.postData)
  		that.$api.spcialAnList(that.postData,(data)=>{
  			console.log(data)
  			if (data.status==200) {
  				if(data.data.res_code==1){
  					that.list=data.data.result
  				}else{
  					that.list=""
  				}
          this.page.num = data.data.total
  			} else {
  				that.$message({
  					showClose:true,
  					message:'锚点列表获取失败',
            type:'error'
  				})
  			}
  		})
  	},
    // 选择文件
    filechange(){
      console.log('选择文件')
      let headimginp = this.$refs.mainimg.files[0]
      headimginp.fileSize = this.$utils.getFileSize(headimginp.size)
      console.log(headimginp)
      this.file = headimginp
    },
    // 导入商品
    upGoods () {
      this.showUpSku = true
    },
    upSkuFileFun () {
      this.upSkuButLoading = true
      console.log('上传商品文件',this.$api,this.$api.upSkuFile)
      let formdata = new FormData()
      formdata.append('excelFile',this.file)  
      this.$api.batchSpecialAnchorProduct(formdata,data=>{
        console.log('维护sku',data)
        if (data.data.res_code==1) {
          this.$message({
            showClose: true,
            message: '恭喜，商品导入成功！',
            type: 'success'
          })
          this.showUpSku = false
        }else{
          this.$message({
            showClose: true,
            message: data.data.message?data.data.message:'抱歉，商品导入失败！',
            type: 'error'
          })
        }
        this.upSkuButLoading = false
      })
    },
    // 获取多个商品
    getMoreGoods(item){
      this.goodslitem = item
    },
    // 删除某一个商品
    removeOneGoods (item) {
      this.goodslitem.splice(item,1)
    },
    // 添加锚点
    addbut(){
      this.dialogVisible  = true
      this.form = {}
      this.goodslitem = ''
      this.onAnchorl = ''
    },
    // 确认增加描点
    addbutfun(){
      console.log('确认增加描点',this.form)
      this.form.sidd  = this.itemdata.siid
      let pids = []
      if(this.goodslitem){
        this.goodslitem.map(val=>{
          pids.push(val.pid)
        })
        this.form.pids = pids.join(',')
      }
      console.log(this.form)
      this.$api.spcialAnAdd(this.form,data=>{
        console.log(data)
        if(data.data.res_code==1){
          this.$message({
            showClose:true,
            message:'锚点添加成功',
            type:'success'
          })
          this.dialogVisible = false
          this.getlist()
        }else{
          this.$message({
            showClose:true,
            message:'锚点添加失败',
            type:'error'
          })
        }
      })
    },
    // 编辑锚点
    changebut (item) {
      console.log('查看锚点')
      this.$api.spcialAnDetail({said:item.said},data=>{
        console.log(data)
        if(data.data.res_code==1){
          this.dialogVisible = true
          this.onAnchorl = data.data.result
          this.form = {
            anchorName:data.data.result.anchorName,
            anchorDesc:data.data.result.anchorDesc,
            sortId:data.data.result.sortId,
            uiType:data.data.result.uiType+'',
            said:data.data.result.said
          }
        }else{
          this.$message({
            showClose:true,
            message:'锚点详情获取失败',
            type:'error'
          })
        }
      })
    },
    // 确认编辑锚点
    changebutfun () {
      let pids = []
      this.goodslitem.map(val=>{
        pids.push(val.pid)
      })
      this.form.pids = pids.join(',')
      console.log(this.form)
      this.$api.spcialAnUp(this.form,data=>{
        console.log(data)
        if(data.data.res_code==1){
          this.$message({
            showClose:true,
            message:'锚点编辑成功',
            type:'success'
          })
          this.dialogVisible = false
          this.getlist()
        }else{
          this.$message({
            showClose:true,
            message:'锚点编辑失败',
            type:'error'
          })
        }
      })
    },
    //选择商品
    addgoods () {
      console.log('选择商品')
      this.showgoodslist = true
    },
    // 关闭商品列表
    clospagegoods () {
      console.log('关闭商品列表')
      this.showgoodslist = false
    },
    // 页面改变
    pageChange (item) {
      this.postData.pageIndex = item
      this.getlist()
    },
    // 关闭本页面
    closepageitem(){
      this.$emit('closepage')
    },
  	// 搜索专题
  	search(){
  		console.log('搜索专题')
  		this.postData.pageIndex=1
  		this.getlist()
  	},
    // 锚点删除
    remove (item) {
      console.log('锚点删除',item)
      this.$confirm('确定将 '+item.anchorName+' 锚点删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          this.$api.spcialAnDel({said:item.said},data=>{
            console.log(data)
            if (data.data.res_code==1) {
              this.getlist()
              this.$message({
                showClose:true,
                message:'专题锚点删除成功',
                type:'success'
              })
              this.getlist()
            }else{
              this.$message({
                showClose:true,
                message:'专题锚点删除失败',
                type:'error'
              })
            }
          })
        }).catch(() => {
          console.log('取消确定')      
        })
    },
  	closePage (data) {
  		// 关闭专题详情
  		console.log('关闭专题详情')
  		console.log(data)
  		this.showInfo = false
      if(data=='new'){
        this.getlist()
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
.inpbox{
  position: relative;
  display: inline-block;
}
.inpbox input{
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 1;
}
</style>
