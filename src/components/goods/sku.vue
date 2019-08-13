<template>
  <div id="box">
    <el-scrollbar class="noxscroll" style="height: 100%">
    <h1 class="title on">商品SKU</h1>
    <div>
      <el-form ref="myfrom" :rules="rules" label-width="120px" style="width:70%;margin-left:15%;">
        <el-form-item label="商品名称">
          <span class="on">{{skudata.shortTitle}}</span>
        </el-form-item>
        <el-form-item label="SKU列表">
          <template v-if="list">
            <el-tag v-for="item in list" :key="item.skuName">{{item.skuName}}</el-tag>
          </template>
          <template v-else class="colaaa">暂无数据</template>
        </el-form-item>
        <el-form-item>
          <template>
            <el-button type="primary" @click="changeGoods">保存编辑</el-button>
            <el-button @click="closePage" plain>取消</el-button>
          </template>
        </el-form-item>
      </el-form>
    </div>
    </el-scrollbar>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'sku',
  props:['skudata'],
  data () {
    return {
      list:''
    }
  },
  created () {
    console.log('skudata',this.skudata)
    this.getSkuList()
  },
  computed:{
    // 计算属性
  },
  methods: {
    // 获取商品sku属性
    getSkuList(){
      console.log('获取商品sku属性')
      this.$api.skuList({pid:this.skudata.pid},data=>{
        console.log(data)
        if(data.status == 200){
          if (data.data.res_code == 1) {
            this.list = data.data.result
          } else {
            this.list = ""
          }
        }else {
          this.$message({
            showClose:true,
            type:'error',
            message:'商品sku列表获取失败'
          })
        }
      })
    },
    getImgList(){
      if(isgoods){
        this.getImgListGoods()
      }else{
        this.getImgListProduct()
      }
    },
    // 获取产品图片列表
    getImgListProduct () {
      let that = this
      this.$api.productPictureList({pid:that.goodimginfo.pid,imgType:that.goodimginfo.imgType,pageIndex:1},(data)=>{
        console.log('获取图片列表')
        console.log(data)
        if(data.status==200){
          if(data.data.res_code==1){
            that.imgarr = data.data.result
          }
        }else{
          this.$message({
            showClose: true,
            message: '抱歉，图片列表获取失败！',
            type: 'error'
          })
        }
      })
    },
    // 获取店铺商品图片列表
    getImgListGoods () {
      console.loh('获取店铺商品图片列表')
      this.$api.picList({pid:that.goodimginfo.pid,imgType:that.goodimginfo.imgType,pageIndex:1},(data)=>{
        console.log('获取图片列表')
        console.log(data)
        if(data.status==200){
          if(data.data.res_code==1){
            that.imgarr = data.data.result
          }
        }else{
          this.$message({
            showClose: true,
            message: '抱歉，图片列表获取失败！',
            type: 'error'
          })
        }
      })
    },
    closeimg (item,index) {
      console.log('删除服务器图片')
      let that = this
      console.log(item)
      if(isgoods){
        that.$api.picDel({ppid:item.ppid},(data)=>{
          console.log(data)
          if (data.data.res_code==1) {
            that.imgarr.splice(index,1)
          } else {
            this.$message({
              showClose: true,
              message: '抱歉，图片删除失败！',
              type: 'error'
            })
          }
        })
      }else{
        that.$api.productPictureDel({ppid:item.ppid},(data)=>{
          console.log(data)
          if (data.data.res_code==1) {
            that.imgarr.splice(index,1)
          } else {
            this.$message({
              showClose: true,
              message: '抱歉，图片删除失败！',
              type: 'error'
            })
          }
        })
      }
    },
    closeimgurl (data) {
      // 关闭一张图片
      console.log('close one img')
      console.log(data)
      this.imgUrl.splice(data, 1)
      this.imgFile.splice(data, 1)
    },
    chooseimgarr () {
      // 进入选择轮播图
      let that = this
      console.log('进入选择多图')
      let headimginp = that.$refs.imgarr.files[0]
      let isLt2M = headimginp.size / 1024 / 1024 < 2
      console.log(isLt2M)
      if (!isLt2M) {
        this.$message({
          message: '注意，图片大小不得大于2M',
          type: 'error'
        })
        this.$refs.imgarr.value = ''
        return
      }
      that.imgFile.push(headimginp)
      console.log(that.imgFile)
      let reads = new FileReader()
      reads.readAsDataURL(headimginp)
      reads.onload = function (e) {
        that.imgUrl.push(e.target.result)
        that.$refs.imgarr.value = ''
      }
    },
    // 保存编辑
    changeGoods () {
      console.log('保存编辑')
      let that = this
      console.log(that.goodimginfo)
      let formData = new FormData()
      formData.append('pid',that.goodimginfo.pid)
      formData.append('imgType',that.goodimginfo.imgType)
      that.imgFile.map(val=>{
        formData.append('files',val)
      })
      console.log(that.imgFile)
      that.$api.productPictureAdd(formData,(data)=>{
        console.log(data)
        if(data.data.res_code==1){
          that.$message({
            showClose: true,
            message: '图片增加成功！',
            type: 'success'
          })
          that.getImgList()
          that.imgUrl = []
          that.imgFile = []
        }else{
          that.$message({
            showClose: true,
            message: '图片增加失败！',
            type: 'error'
          })
        }
      })
    },
    // 关闭页面
    closePage(){
      console.log('子组件关闭页面')
      let that = this
      that.$emit('closepage')
    }
  }
}
</script>

<style type="text/css" lang="scss" scoped>
#box{
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.avatardiv {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  width: 178px;
  height: 178px;
  float: left;
  margin-right: 20px;
  margin-bottom: 10px;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.imgarrbox{
  padding-top: 10px;
  overflow: hidden;
}
.avatar{
  max-width: 100%;
  max-height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%)
}
.headimginp{
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 1;
}
</style>
