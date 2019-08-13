<template>
  <div id="box">
    <el-scrollbar class="noxscroll" style="height: 100%">
      <h1 class="title on">商品{{goodimginfo.imgType==1?'缩略':'详情'}}图管理</h1>
      <div>
        <el-form ref="myfrom" :rules="rules" label-width="120px" style="width:70%;margin-left:15%;">
          <el-form-item label="产品名称">
            <span class="on">{{goodimginfo.name}}</span>
          </el-form-item>
          <el-form-item :label="goodimginfo.imgType=='1'?'缩略图':'详情图'">
            <span v-if="!imgarr" class="colccc">暂无数据</span>
            <div class="imgarrbox">
              <div
                class="avatardiv"
                v-for="(item, index) in imgarr"
                v-if="item.state==1"
                :key="index"
              >
                <img :src="item.imgUrl" class="avatar">
                <div class="imgbox">
                  <i @click="closeimg(item,index)" class="el-icon-delete mgr10"></i>
                  <i class="el-icon-upload ibox">
                    <input
                      accept="image/*"
                      ref="mainimg"
                      @change="chooseimg(item,$event)"
                      type="file"
                      class="imginp"
                    >
                  </i>
                </div>
                <!-- <i class="el-icon-error closeimg" @click="closeimg(item,index)"></i> -->
              </div>
              <div class="avatardiv" v-for="(item, index) in imgUrl" :key="index">
                <img :src="item" class="avatar">
                <i class="el-icon-error closeimg" @click="closeimgurl(index)"></i>
              </div>
              <template v-if="!isgoods">
                <div v-if="20-imgarr.length-imgUrl.length>0" class="avatardiv">
                  <input
                    accept="image/*"
                    ref="imgarr"
                    @change="chooseimgarr"
                    type="file"
                    class="headimginp"
                  >
                  <i class="el-icon-plus avatar-uploader-icon"></i>
                </div>
              </template>
            </div>
            <!-- <p v-if="imgarr.length" class="fs12 colccc mg-15">注:最多20张图片，每张图片大小不得大于2M</p> -->
          </el-form-item>
          <el-form-item>
            <template>
              <el-button v-if="!isgoods" type="primary" @click="changeGoods">上传图片</el-button>
              <el-button @click="closePage" plain>取消</el-button>
              <el-button @click="getImgNew" type="primary">重新抓取图片</el-button>
            </template>
          </el-form-item>
        </el-form>
      </div>
    </el-scrollbar>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'goodsimg',
  // goodimginfo:图片信息  isgoods:是否为商品，商品不能添加图片只能删除
  props: ['goodimginfo', 'isgoods'],
  data() {
    return {
      // 服务器上的图片
      imgarr: '',
      // 本地图片文本
      imgFile: [],
      // 本地图片数组
      imgUrl: []
    }
  },
  created() {
    let that = this
    console.log('goodimginfo', that.goodimginfo)
    that.getImgList()
  },
  computed: {
    // 计算属性
  },
  methods: {
    // 下载图片
    downimg(item, index) {
      if (!!window.ActiveXObject || 'ActiveXObject' in window) {
        console.log('ie下载')
      } else {
        console.log('普通下载')
      }
      var img = new Image()
      img.crossOrigin = 'Anonymous'
      img.onload = function() {
        var canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height
        var ctx = canvas.getContext('2d')
        // 将img中的内容画到画布上
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        // 将画布内容转换为Blob
        console.log(222)
        canvas.toBlob(blob => {
          console.log(111)
          // blob转为同源url
          var blobUrl = window.URL.createObjectURL(blob)
          // 创建a链接
          var a = document.createElement('a')
          a.href = blobUrl
          a.download = ''
          // 触发a链接点击事件，浏览器开始下载文件
          console.log(123)
          a.click()
        })
      }
      img.src = item.imgUrl
      // 必须设置，否则canvas中的内容无法转换为blob
      img.setAttribute('crossOrigin', 'Anonymous')
    },
    getImgNew() {
      console.log('重新获取图片')
      let that = this
      this.$api.getKaoLaImgUp({ pid: that.goodimginfo.pid }, data => {
        if (data.data.res_code == 1) {
          this.$message({
            showClose: true,
            message: '图片更新成功！',
            type: 'success'
          })
          this.getImgList()
        } else {
          this.$message({
            showClose: true,
            message: data.data.message
              ? data.data.message
              : '抱歉，图片更新失败！',
            type: 'error'
          })
        }
      })
    },
    getImgList() {
      if (this.isgoods) {
        this.getImgListGoods()
      } else {
        this.getImgListProduct()
      }
    },
    chooseimg(item, e) {
      console.log('文件选择', item, e)
      let that = this
      let headimginp = e.target.files[0]
      console.log(headimginp)
      let isLt2M = headimginp.size / 1024 / 1024 < 10
      if (!isLt2M) {
        this.$message({
          message: '注意，图片大小不得大于10M',
          type: 'error'
        })
        return
      }
      let formadata = new FormData()
      formadata.append('ppid', item.ppid)
      formadata.append('img', headimginp)
      this.$api.changeGoodsImg(formadata, data => {
        if (data.data.res_code == 1) {
          this.$message({
            showClose: true,
            message: '图片更新成功！',
            type: 'success'
          })
          item.imgUrl = data.data.result.imgUrl
        } else {
          this.$message({
            showClose: true,
            message: '抱歉，图片更新失败！',
            type: 'error'
          })
        }
        e.value = ''
      })
    },
    // 获取产品图片列表
    getImgListProduct() {
      let that = this
      this.$api.productPictureList(
        {
          pid: that.goodimginfo.pid,
          imgType: that.goodimginfo.imgType,
          pageIndex: 1
        },
        data => {
          console.log('获取图片列表')
          console.log(data)
          if (data.status == 200) {
            if (data.data.res_code == 1) {
              that.imgarr = data.data.result
            }
          } else {
            this.$message({
              showClose: true,
              message: '抱歉，图片列表获取失败！',
              type: 'error'
            })
          }
        }
      )
    },
    // 获取店铺商品图片列表
    getImgListGoods() {
      console.log('获取店铺商品图片列表')
      let that = this
      this.$api.picList(
        {
          pid: that.goodimginfo.pid,
          imgType: that.goodimginfo.imgType,
          pageIndex: 1
        },
        data => {
          console.log('获取图片列表')
          console.log(data)
          if (data.status == 200) {
            if (data.data.res_code == 1) {
              that.imgarr = data.data.result
            }
          } else {
            this.$message({
              showClose: true,
              message: '抱歉，图片列表获取失败！',
              type: 'error'
            })
          }
        }
      )
    },
    closeimg(item, index) {
      console.log('删除服务器图片')
      let that = this
      console.log(item)
      if (this.isgoods) {
        that.$api.picDel({ ppid: item.ppid }, data => {
          console.log(data)
          if (data.data.res_code == 1) {
            that.imgarr.splice(index, 1)
          } else {
            this.$message({
              showClose: true,
              message: '抱歉，图片删除失败！',
              type: 'error'
            })
          }
        })
      } else {
        that.$api.productPictureDel({ ppid: item.ppid }, data => {
          console.log(data)
          if (data.data.res_code == 1) {
            that.imgarr.splice(index, 1)
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
    closeimgurl(data) {
      // 关闭一张图片
      console.log('close one img')
      console.log(data)
      this.imgUrl.splice(data, 1)
      this.imgFile.splice(data, 1)
    },
    chooseimgarr() {
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
      reads.onload = function(e) {
        that.imgUrl.push(e.target.result)
        that.$refs.imgarr.value = ''
      }
    },
    // 保存编辑
    changeGoods() {
      console.log('保存编辑')
      let that = this
      console.log(that.goodimginfo)
      let formData = new FormData()
      formData.append('pid', that.goodimginfo.pid)
      formData.append('imgType', that.goodimginfo.imgType)
      that.imgFile.map(val => {
        formData.append('files', val)
      })
      console.log(that.imgFile)
      that.$api.productPictureAdd(formData, data => {
        console.log(data)
        if (data.data.res_code == 1) {
          that.$message({
            showClose: true,
            message: '图片增加成功！',
            type: 'success'
          })
          that.getImgList()
          that.imgUrl = []
          that.imgFile = []
        } else {
          that.$message({
            showClose: true,
            message: '图片增加失败！',
            type: 'error'
          })
        }
      })
    },
    // 关闭页面
    closePage() {
      console.log('子组件关闭页面')
      let that = this
      that.$emit('closepage')
    }
  }
}
</script>

<style type="text/css" scoped>
#box {
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
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.imgarrbox {
  padding-top: 10px;
  overflow: hidden;
}
.avatar {
  max-width: 100%;
  max-height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.headimginp {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 1;
}
.closeimg {
  position: absolute;
  top: -10px;
  right: -15px;
  z-index: 1;
}
.imgbox {
  position: absolute;
  bottom: 0px;
  left: 0px;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 20px;
  height: 50px;
  opacity: 0;
}
.avatardiv:hover .imgbox {
  opacity: 1;
}
.imgbox i {
  /*background-color: #fff;*/
  color: #fff;
}
.ibox {
  position: relative;
}
.imginp {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  opacity: 0;
}
</style>
