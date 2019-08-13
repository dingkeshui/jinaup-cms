<template>
  <div id="box">
    <goods></goods>
  </div>
</template>

<script type="text/javascript">
import goods from '@/components/goods/goodslist.vue'

export default {
  name: 'goodslist',
  components:{
    goods
  },
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
    // 获取商品列表
    getGoodsList () {
      let that = this
      console.log(that.postData)
      that.$api.infoList(that.postData,(data)=>{
        console.log('获取商品列表')
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
    // 获取商品分类
    getGoodsClass () {
      console.log('获取商品分类父级函数')
      let that = this
      let res = {parentId:0}
      if(that.goodsClassOn.length){
        res.parentId = that.goodsClassOn[that.goodsClassOn.length-1].id
      }
      console.log(res)
      that.$api.categoryList(res,(data)=>{
        console.log('获取商品分类')
        console.log(data)
        if(data.status==200){
          if (data.data.res_code==1) {
            that.goodsClass.two = data.data.result
            if (that.goodsClassOn.length<1) {
              that.goodsClass.one = data.data.result
            }
          }else{
            that.goodsClass.two = ""
          }
          console.log(that.goodsClass)
        }else{
          that.$message({
            showClose: true,
            message: '抱歉，商品分类获取失败！',
            type: 'error'
          })
        }
      })
    },
    // 获取品牌列表
    getBrandList () {
      let that = this
      this.$api.brandList({pageIndex:1},(data)=>{
        console.log('获取品牌列表')
        console.log(data)
        if(data.status==200){
          if(data.data.res_code==1){
            that.brankList = data.data.result
          }
        }else{
          this.$message({
            showClose: true,
            message: '抱歉，品牌列表获取失败！',
            type: 'error'
          })
        }
      })
    },
    // 商品分类选中事件
    classChange (item) {
      console.log('选中的商品分类')
      console.log(item)
      let that = this
      if(that.goodsClassOn.length==4){
        that.goodsClassOn[4] = {
          id:item.cid,
          name:item.cname
        }
        that.searchData.cid = item.cid
      } else {
        that.goodsClassOn.push({
          name:item.cname,
          id:item.cid
        })
        that.searchData.cid = item.cid
        console.log(that.goodsClassOn)
        that.getGoodsClass()
      }
    },
    // 关闭标签页面
    closetag (item,index) {
      console.log('关闭标签',item,index)
      let that = this
      if (index == 0) {
        that.goodsClassOn = []
        that.goodsClass.two = Object.assign({}, that.goodsClass.one)
      } else {
        that.goodsClassOn = that.goodsClassOn.slice(0, index)
        that.getGoodsClass()
      }
      console.log(that.goodsClassOn)
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
    currentChange (data) {
      console.log('跳页',data)
      this.postData.parentId = data
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
