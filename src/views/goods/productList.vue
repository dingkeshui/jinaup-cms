<template>
  <div id="box">
    <div v-if="showBox1" class="box1 flex2">
      <div class="miantop">
        <div class="maintopleft">
            <el-select size="mini" style="width:110px;margin-left:5px;" class="mgr5" v-model="searchData.state" clearable placeholder="商品状态">
              <el-option label="上线商品" value="1"></el-option>
              <el-option label="下线商品" value="0"></el-option>
            </el-select>
            <!-- 品牌 -->
            <el-select
            style="position: relative;width:100px;"
            v-model="searchData.bid"
            @change="searchBut"
            filterable="true"
            remote="true"
            clearable
            class="mgr5"
            size="mini"
            @clear="brandclear"
            :remote-method="remoteMethod"
            placeholder="搜/选品牌">
              <el-option
                v-for="item in brandlist"
                :key="item.bid"
                :label="item.chineseName"
                :value="item.bid">
              </el-option>
              <div style="position: sticky;background: #fff;height:30px;top:0;z-index:1">
                <p>
                  <el-pagination
                  small
                  @current-change="brandPageChange"
                  :page-size="20"
                  :total="brandPage.num"
                  layout="prev, pager, next, jumper"/>
                </p>
              </div>
            </el-select>
          <!-- 一级分类 -->
            <el-select
            v-model="onClass['0']"
            @change="classChange('1')"
            filterable="true"
            style="width:100px;"
            class="mgr5"
            clearable
            size="mini"
            placeholder="一级分类">
              <el-option
                v-for="item in classlist['0']"
                :key="item.cid"
                :label="item.cname"
                :value="item.cid">
              </el-option>
            </el-select>
            <!-- 二级分类 -->
            <el-select
            v-model="onClass['1']"
            @change="classChange('2')"
            style="width:100px;"
            class="mgr5"
            filterable="true"
            clearable
            size="mini"
            placeholder="二级分类">
              <el-option
                v-for="item in classlist['1']"
                :key="item.cid"
                :label="item.cname"
                :value="item.cid">
              </el-option>
            </el-select>
            <!-- 三级分类 -->
            <el-select
            v-model="onClass['2']"
            @change="classChange('3')"
            style="width:100px;"
            class="mgr5"
            filterable="true"
            clearable
            size="mini"
            placeholder="三级分类">
              <el-option
                v-for="item in classlist['2']"
                :key="item.cid"
                :label="item.cname"
                :value="item.cid">
              </el-option>
            </el-select>
            <el-input style="width:150px;" v-model="searchData.title" size="mini" clearable placeholder="标题"></el-input>
        </div>
        <div class="flex flexvcenter pad10">
          <el-button type="primary" @click="searchBut" size="mini" icon="el-icon-search">搜索</el-button>
        </div>
      </div>
      <!-- 标签box -->
      <div class="maincontent">
        <div class="tablebox">
        <el-table
          :data="productList"
          border
          stripe
          height="100%"
          @selection-change="handleSelectionChange"
          style="width: 100%">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            type="index"
            label="排序"
            fixed
            width="50">
          </el-table-column>
          <el-table-column
            prop="pid"
            label="商品ID"
            width="100">
          </el-table-column>
          <el-table-column
            prop="title"
            label="产品标题"
            width="250">
          </el-table-column>
          <el-table-column
            label="产品主图片"
            width="90">
            <template slot-scope="scope">
              <div class="mainImgBox">
                <img :src="scope.row.mainImgUrl">
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="shortTitle"
            label="产品短标题"
            width="150">
          </el-table-column>
          <el-table-column
            label="产品小图"
            width="120">
            <template slot-scope="scope">
              <el-button @click="changImg(scope.row,'a')" class="minbut" size="mini" type="primary">操作</el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="产品详情图"
            width="120">
            <template slot-scope="scope">
              <el-button @click="changImg(scope.row,'b')" class="minbut" size="mini" type="primary">操作</el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="bName"
            label="品牌分类"
            width="120">
          </el-table-column>
          <el-table-column
            prop="cName"
            label="产品分类"
            width="120">
          </el-table-column>
          <el-table-column
            label="产品状态"
            width="120">
            <template slot-scope="scope">
               <el-tag
                :type="scope.row.state == '1' ? 'success' : 'warning'"
                disable-transitions>{{scope.row.state == 1?'上线':'下线'}}中</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="country"
            label="产品国别"
            width="100">
          </el-table-column>
          <el-table-column
            prop="origin"
            label="产品产地"
            width="150">
          </el-table-column>
          <el-table-column
            prop="weight"
            label="产品重量(克)"
            width="120">
          </el-table-column>
          <el-table-column
            prop="barCode"
            label="产品编码"
            width="150">
          </el-table-column>
          <el-table-column
            prop="unitMeasureName"
            label="计量单位"
            width="120">
          </el-table-column>
          <el-table-column
            prop="unitMeasureValue"
            label="SPU计量单位值"
            width="120">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="120">
            <template slot-scope="scope">
              <div class="mgb5"><el-button @click="lookorder(scope.row)" type="primary" class="minbut" size="small">编辑</el-button></div>
              <div v-if="scope.row.state>0" class="mgb5"><el-button @click="removeProduct(scope.row)" type="warning" class="minbut" size="small">下线</el-button></div>
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
          :total="pageinfo.total"
          layout="total, prev, pager, next, jumper">
        </el-pagination>
      </div>
    </div>
    <div v-else class="box2">
      <productinfo v-if="!showImg" :productinfo="productinfo" @closepage="closepage"></productinfo>
      <goodsimg v-else :goodimginfo="goodimginfo" @closepage="closepage"></goodsimg>  
    </div>
  </div>
</template>

<script type="text/javascript">
import productinfo from '@/components/goods/productinfo.vue'
import goodsimg from '@/components/goods/goodsimg.vue'
export default {
  name: 'peoductlist',
  components:{
    productinfo,
    goodsimg
  },
  data () {
    return {
      onClass:[],
      classlist:[],
      showBox1: true,
      // 产品库列表
      productList:'',
      // 跳页信息
      pageinfo:{
        total:''
      },
      // 传递给productInfo的信息
      productinfo:'',
      // 商品列表接口请求的参数
      postData:{
        pageIndex:1
      },
      // 搜索的参数
      searchData:{},
      // 是否显示编辑图片
      showImg:false,
      // 编辑图片的参数
      goodimginfo:'',
      brandlist:'',
      // 品牌请求参数
      brandPost:{
        pageIndex:1
      },
      brandPage:{
        num:''
      }
    }
  },
  created () {
    let that = this
    that.getGoodsList()
    this.getClassList()
    this.getBrandList()
  },
  methods: {
    // 品牌搜索
    remoteMethod (item) {
      console.log('品牌搜索',item)
      this.brandPost.chineseName = item
      this.brandPost.pageIndex = 1
      this.getBrandList()
    },
    // 清空品牌搜索
    brandclear () {
      console.log('清空品牌搜索')
      this.brandPost = {
        pageIndex:1
      }
      this.getBrandList()
    },
    // 品牌跳页
    brandPageChange(item){
      this.brandPost.pageIndex = item
      this.getBrandList()
    },
    // 获取品牌
    getBrandList(){
      this.$api.brandList(this.brandPost,data=>{
        if(data.status==200){
          if(data.data.res_code==1){
            this.brandlist = data.data.result
            this.brandPage.num = data.data.total
          }else{
           
          }
        }else{
          this.$message({
            showClose:true,
            type:'error',
            message:'品牌列表获取失败'
          })
        }
      })
    },
    // 分类改变
    classChange(item){
      console.log('分类改变',item)
      if(item==3){
        this.searchData.cid = this.onClass[2]
        this.searchBut()
      }else{
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
    // 获取产品库列表
    getGoodsList () {
      let that = this
      console.log(that.postData)
      that.$api.productInfoList(that.postData,(data)=>{
        console.log('获取产品库列表')
        console.log(data)
        if(data.status==200){
          if(data.data.res_code==1){
            that.productList=data.data.result
            console.log(that.productList)
            that.pageinfo.total = data.data.total
          } else {
            that.productList=""
          }
        }else{
          this.$message({
            showClose: true,
              message: '抱歉，商品列表获取失败！',
              type: 'error'
          })
        }
        
      })
    },
    // 表格多选改变事件
    handleSelectionChange (item) {
      console.log('表格多选改变事件')
      console.log(item)
    },
    // 关闭编辑页面
    closepage (data) {
      this.showBox1 = true
      if (data == 'new') {
        this.getGoodsList()
      }
    },
    // 跳页
    pageChange (data) {
      console.log('跳页',data)
      this.postData.pageIndex = data
      this.getGoodsList()
    },
    // 删除产品
    removeProduct (item) {
      console.log('删除产品')
      console.log(item)
      let that = this
      that.$confirm('确定将 '+item.shortTitle+' 删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        that.$api.productInfoDel({pid:item.pid},(data)=>{
          console.log(data)
          if(data.data.res_code==1){
            that.$message({
              showClose: true,
              message: '产品删除成功！',
              type: 'success'
            })
            that.postData.pageIndex = 1
            that.getGoodsList()
          }else{
            that.$message({
              showClose: true,
              message: '产品删除失败！',
              type: 'error'
            })
          }
        })
      }).catch(() => {
       console.log('点击的取消')
      })
    },
    //  搜索商品 
    searchBut () {
      console.log('搜索商品')
      let that = this
      that.postData = {}
      for(let i in that.searchData){
        that.postData[i]=that.searchData[i]
      }
      console.log(that.postData)
      that.getGoodsList()
    },
    // 点击商品图片按钮
    changImg (item,type) {
      console.log('编辑产品图片')
      console.log(item,type)
      let that = this
      that.showBox1 = false
      that.showImg = true
      that.goodimginfo = {
        pid:item.pid,
        imgType:1,
        name:item.shortTitle
      }
      if(type=="b"){
        that.goodimginfo.imgType = 2
      }
    },
    lookorder (e) {
      // 点击查看订单详情
      console.log('center order main')
      console.log(e)
      let that = this
      that.productinfo = e
      that.showBox1 = false
      that.showImg = false
      // this.ordermainshow = true
    },
    adresschange () {
      // 选择地址
      console.log('change adress')
    }
  },
  computed:{
    goodsClassOnnum(){
      let num = this.goodsClassOn.length
      return num == 4?4:num+1
    }
  },
  watch:{
    brankitem(newName, oldName){
      if (newName) {
        this.searchData.bid = newName.bid
      } else {
        this.searchData.bid = ''
      }
    },
    classitem(newName, oldName){
      if (newName) {
        this.searchData.cid = newName.cid
      } else {
        this.searchData.cid = ''
      }
    }
  }
}
</script>

<style type="text/css" scoped>
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
.maintopitem2{
  height: 100%;
  display: flex;
  align-items: center;
  padding:0px 10px;
  border-right:1px solid #bbb;
  box-sizing: border-box;
  color: #606266;
  font-size: 14px;
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
.ordermainbox{
  height: 1000px;
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
.tagbox{
  padding: 5px 10px;
}
.mainImgBox{
  width: 70px;
  height: 70px;
}
.mainImgBox img{
  max-width: 100%;
  max-height: 100%;
}
.box2,.box1{
  width: 100%;
  height: 100%;
}
</style>
