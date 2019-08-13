<template>
  <div class="SeckillAddWrap">
    <!-- 添加或编辑秒杀 -->
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      style="margin:10px 0 20px 0px;font-size:15px;font-weight:400;"
    >
      <!-- <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>秒杀列表</el-breadcrumb-item>-->
      <el-breadcrumb-item>{{isAdd1?'添加秒杀':'编辑秒杀'}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
      <el-form-item label="场次" required prop="period">
        <!-- <el-select v-model="ruleForm.period" :placeholder="times[0].periodValue"> -->
        <!-- @change="periodValueChange" -->
        <el-select v-model="ruleForm.period" placeholder="选择场次" :disabled="disabledDate">
          <el-option
            v-for="item in ruleForm.times1"
            :key="item.period"
            :label="item.periodValue"
            :value="item.period"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="日期" required prop="date">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="ruleForm.date"
          :disabled="disabledDate"
          value-format="yyyy-MM-dd"
          format="yyyy-MM-dd"
          @change="dateChange"
          :picker-options="pickerOptions"
        >></el-date-picker>
      </el-form-item>
      <el-form-item label="分享图片">
        <div style="overflow: hidden">
          <div class="avatardiv">
            <input accept="image/*" ref="imga" @change="chooseimga" type="file" class="headimginp">
            <img v-if="imgUrl" :src="imgUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="商品" prop="productData" style="padding-right:24px;">
        <el-button
          size="mini"
          style="width:100px;height:40px;background:rgba(51,214,197,1);border-radius:4px;color:rgba(255,255,255,1);"
          @click="handleChose"
        >选择商品</el-button>

        <table class="table table1">
          <thead>
            <tr>
              <th>SKU</th>
              <th>成本价</th>
              <th>销售价</th>
              <th>已售</th>
              <th>秒杀价</th>
              <th>秒杀库存</th>
              <th>毛利补贴</th>
              <th>预售销售数量</th>
              <th>每单限购</th>
              <th>每个用户限购</th>
              <th>排序</th>
              <th>同步到明日秒杀</th>
              <th>同步到首页</th>
              <th v-if="!isAdd1">状态</th>
              <th>操作</th>
            </tr>
          </thead>
        </table>
        <table class="table table2">
          <tbody v-for="(item,index) in ruleForm.productData" :key="index">
            <tr>
              <td class="iscolspan">
                <div style="display:flex;height:100%;">
                  <img
                    :src="item.mainImgUrl"
                    alt
                    style="width:44px;height:44px;margin-right:10px;vertical-align:middle;"
                  />
                  <div>
                    <div style="margin-top:0px;height:20px;">ID:{{item.pid}}</div>
                    <div style="margin-top:0px;height:30px;" class="proTitle">{{item.title}}</div>
                  </div>
                </div>
              </td>
              <td>
                <el-input
                  v-model.number="item.buyerNumber"
                  placeholder="件"
                  type="number"
                  step="0.01"
                  min="0"
                  @DOMMouseScroll.native.prevent
                  @mousewheel.native.prevent
                  @blur="handleInput(item.buyerNumber)"
                ></el-input>
              </td>
              <td>
                <el-input
                  v-model="item.buyerOrderNumber"
                  placeholder="单"
                  type="number"
                  step="0.01"
                  min="0"
                  @DOMMouseScroll.native.prevent
                  @mousewheel.native.prevent
                  @blur="handleInput(item.buyerOrderNumber)"
                ></el-input>
              </td>
              <td>
                <el-input
                  v-model.number="item.sortId"
                  placeholder
                  type="number"
                  step="0.01"
                  min="0"
                  @DOMMouseScroll.native.prevent
                  @mousewheel.native.prevent
                  @blur="handleInput(item.sortId)"
                ></el-input>
              </td>
              <td style="text-align:center">
                <el-switch
                  v-model="item.isToTomorrow"
                  :disabled="!isAdd1 && disabledDate"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :inactive-value="0"
                  :active-value="1"
                ></el-switch>
              </td>
              <td>
                <el-switch
                  v-model="item.showTopFlag"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :inactive-value="0"
                  :active-value="1"
                ></el-switch>
              </td>
              <td v-if="!isAdd1">
                <!-- {{item.state}} -->
                <el-switch
                  v-model="item.state"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :inactive-value="0"
                  :active-value="1"
                ></el-switch>
              </td>
              <td>
                <el-button type="text" size="small" @click="handleDelete(item)">删除</el-button>
              </td>
            </tr>

            <tr v-for="(val,i) in item.productSkus" :key="i">
              <td class="proTitle" style="height:86px;">{{val.skuName}}</td>
              <td>{{val.supplyPrice}}</td>
              <td>{{val.salesPrice}}</td>
              <td>{{val.salesStore}}</td>
              <!-- <td><el-input v-model="val.salesStore" placeholder="件" type="number"></el-input></td> -->
              <td>
                <el-input
                  v-model="val.seckillPrice"
                  placeholder="元"
                  type="number"
                  step="0.01"
                  min="0"
                  @DOMMouseScroll.native.prevent
                  @mousewheel.native.prevent
                  @blur="handleInput(val.seckillPrice)"
                ></el-input>
              </td>
              <td>
                <el-input
                  v-model="val.store"
                  placeholder="件"
                  type="number"
                  step="0.01"
                  min="0"
                  @DOMMouseScroll.native.prevent
                  @mousewheel.native.prevent
                  @blur="handleInput(val.store)"
                ></el-input>
              </td>
              <td>
                <el-input
                  v-model="val.commissionAmount"
                  placeholder="元"
                  type="number"
                  step="0.01"
                  min="0"
                  @DOMMouseScroll.native.prevent
                  @mousewheel.native.prevent
                  @blur="handleInput(val.commissionAmount)"
                ></el-input>
              </td>
              <td>
                <el-input
                  v-model="val.presetSalesStore"
                  placeholder="件"
                  type="number"
                  step="0.01"
                  min="0"
                  @DOMMouseScroll.native.prevent
                  @mousewheel.native.prevent
                  @blur="handleInput(val.presetSalesStore)"
                ></el-input>
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td v-if="!isAdd1"></td>
            </tr>
          </tbody>
        </table>
      </el-form-item>
      <el-form-item>
        <div class="btn">
          <el-button
            @click="handleAddSure('ruleForm')"
            style="margin-right:20px;background:rgba(51,214,197,1);color:rgba(255,255,255,1);"
          >确认</el-button>
          <el-button @click="handleCancel(0)" style="color:rgba(51,214,197,1);">取消</el-button>
        </div>
      </el-form-item>
    </el-form>
    <choseGoods ref="choseGoodsEl" @isSureChose="handleChoseRes"></choseGoods>
  </div>
</template>

<script>
import choseGoods from './choseGoods'
import {
  getSaveSeckillPro,
  getSeckillFindTime,
  seckillFindTime,
  addOrUpdateSeckillPro,
  delSeckillProductByPsiid
} from '@/api/speckillApi'
import { throws } from 'assert'
export default {
  name: 'seckillAdd',
  props: ['isAdd', 'editId'],
  data() {
    return {
      isAdd1: this.isAdd,
      disabledDate: false,
      ruleForm: {
        // periodValue: '',
        date: '', // 选中的日期
        productData: [],
        times: [], // 获取的所设置的时间段列表
        times1: [],
        period: '' // 选择的秒杀时间段的场次筛选
      },
      imgUrl:'', //
      imgFile:'',
      rules: {
        period: [{ required: true, message: '请选择场次', trigger: 'blur' }],
        // periodValue: [
        //   { required: true, message: '请选择场次', trigger: 'blur' }
        // ],
        date: [
          {
            type: 'string',
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }
        ],
        productData: [
          { required: true, message: '请选择商品', trigger: 'blur' }
        ]
      },
      isSubmit: true,
      times0: [], //当天场次
      //日期限制 :picker-options="pickerOptions"
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      }
    }
  },
  created() {
    // 获取编辑的秒杀商品信息
    if (!this.isAdd1) {
      this.getSavedList()
    }
    if (this.isAdd) {
      // 获取场次时间段
      this.getSeckillFindTime()
    }
  },
  methods: {
    // 选择商品主图
    chooseimga () {
      // 进入选择封面图片
      console.log('商品主图')
      let that = this
      let headimginp = this.$refs.imga.files[0]
      console.log(headimginp)
      let bigSize = this.$store.state.oneImgBigSize
      let isLt2M = headimginp.size / 1024 / 1024 < bigSize
      if (!isLt2M) {
        this.$message({
          message: '注意，图片大小不得大于'+bigSize+'M',
          type: 'error'
        })
        this.$refs.imga.value = ''
        return
      }
      that.imgFile = headimginp
      let reads = new FileReader()
      reads.readAsDataURL(headimginp)
      reads.onload = function (e) {
        that.imgUrl = e.target.result
      }
    },
    // 删除操作
    handleDelete(params) {
      let that = this
      that
        .$confirm('确定删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          // that.ruleForm.productData.forEach(item => {
          if (params.psiid) {
            if (!params.state) {
              console.log('state', 1)
              delSeckillProductByPsiid({ psiid: params.psiid }).then(res => {
                if (res.data.res_code == 1) {
                  that.$message({
                    showClose: true,
                    type: 'success',
                    message: '删除成功!'
                  })
                  let arr1 = that.ruleForm.productData.filter(val => {
                    return val.psiid != params.psiid
                  })
                  that.ruleForm.productData = arr1
                }
              })
            } else {
              console.log('state', 0)
              return that.$message({
                showClose: true,
                type: 'error',
                message: '上架商品不能删除!'
              })
            }
          } else {
            let arr = that.ruleForm.productData.filter(val => {
              return val.pid != params.pid
            })
            that.ruleForm.productData = arr
            that.$message({
              type: 'success',
              message: '删除成功!'
            })
          }
          // })
        })
        .catch(() => {
          return that.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 获取当前时间限制当前时间之前的场次禁用
    getTimeHourse() {
      let that = this
      // if (that.isAdd) {
      let d = new Date()
      let hours = d.getHours()
      console.log('当前小时', hours)
      let arr = that.ruleForm.times.filter(val => {
        // console.log('当前小时', val)
        return val.period > hours
      })
      // 判断是否有零点场次
      let is0 = that.ruleForm.times.filter(val => {
        return val.period == 0
      })

      // 当前不为零点且有零点场次，添加入arr
      if (is0 && hours != 0) {
        arr.push(is0[0])
      }
      // console.log('object1', arr)
      // console.log('当前小时', arr)
      that.ruleForm.times1 = arr
      that.times0 = arr
      // }
    },
    // 限制不能输入为负数
    handleInput(params) {
      if (Number(params) < 0) {
        this.$message({
          showClose: true,
          message: '抱歉，输入不能为负数！',
          type: 'error'
        })
        this.isSubmit = false
      } else {
        this.isSubmit = true
      }
    },
    // 编辑秒杀时,获取已保存的秒杀商品
    getSavedList() {
      let that = this
      getSaveSeckillPro({ sesid: that.editId }).then(res => {
        console.log('获取已保存的秒杀商品1', res)
        if (res.data.res_code == 1) {
          that.getSeckillFindTime()
          that.imgUrl = res.data.result.shareImgUrl
          console.log('imgurl',that.imgUrl)
          if (!res.data.result.returnSeckillProduct) {
            // that.$message({
            //   showClose: true,
            //   // message: res.data.message?res.data.message:'抱歉，获取失败！',
            //   message: '该场次无商品,请选择商品添加！',
            //   type: 'warning'
            // })
          } else {
            // res.data.result.returnSeckillProduct.map(val => {
            //   val.state = val.state === 1 ? true : false
            //   val.isToTomorrow = val.isToTomorrow === 1 ? true : false
            //   val.showTopFlag = val.showTopFlag === 1 ? true : false
            // })
            that.ruleForm.productData = res.data.result.returnSeckillProduct
          }
          that.ruleForm.date = res.data.result.startTime
          if (new Date(that.ruleForm.date).getTime() <= new Date().getTime()) {
            that.disabledDate = true
          }
          // that.ruleForm.periodValue = res.data.result.periodValue
          that.ruleForm.period = res.data.result.period
        } else {
          that.$message({
            showClose: true,
            message: '抱歉，获取失败！',
            type: 'error'
          })
        }
      })
    },
    // 获取已保存的秒杀时间段
    getSeckillFindTime() {
      let that = this
      seckillFindTime().then(res => {
        console.log('获取已保存的秒杀时间段', res)
        if (res.data.res_code == 1) {
          that.ruleForm.times = res.data.result // 提交时间段成功之后重新获取保存提交的时间段
          that.ruleForm.times1 = res.data.result
          that.getTimeHourse()
          that.dateChange()
        } else {
          that.$message({
            showClose: true,
            // message: res.data.message?res.data.message:'抱歉，获取失败！',
            message: '抱歉，获取失败！',
            type: 'error'
          })
        }
      })
    },
    // 展示选择商品模态框
    handleChose() {
      // this.isAdd1 = true
      this.$refs.choseGoodsEl.showChoseGoods()
      this.$refs.choseGoodsEl.getProList()
      // this.$refs.choseGoodsEl.multipleSelection = []
    },
    // 表单验证及提交
    handleAddSure(formName) {
      console.log('提交')
      let that = this
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 验证成功提交秒杀商品
          let formData = {
            startTime: that.ruleForm.date,
            period: that.ruleForm.period,
            // periodValue: that.ruleForm.periodValue,
            // sesid: that.editId,
            sesid: that.isAdd1 ? '' : that.editId,
            products: []
          }
          let products = []
          that.ruleForm.productData.map(item => {
            let productSkus = []
            item.productSkus.map(val => {
              productSkus.push({
                spsid: val.spsid,
                skuKey: val.skuKey,
                seckillPrice: val.seckillPrice,
                salesPrice: val.salesPrice,
                supplyPrice: val.supplyPrice,
                commissionAmount: val.commissionAmount,
                store: val.store,
                presetSalesStore: val.presetSalesStore
              })
            })

            // let state1 = item.state ? 1 : 0
            products.push({
              psiid: item.psiid,
              pid: item.pid,
              buyerNumber: item.buyerNumber,
              buyerOrderNumber: item.buyerOrderNumber,
              sortId: item.sortId,
              isToTomorrow: item.isToTomorrow ? 1 : 0,
              showTopFlag: item.showTopFlag ? 1 : 0,
              // state: that.isAdd1 ? 1 : item.state ? 1 : 0,
              state: item.state ? 1 : 0,
              productSkus: productSkus
            })
            // products.productSkus = productSkus
          })

          formData.products = products
          console.log('添加或编辑应提交的数据参数', formData)

          // 验证：排序、秒杀价、秒杀库存，必填项
          var a = formData.products.some(val => {
            return val.sortId === ''
            // return !val.sortId.trim()
          })
          if (a) {
            return that.$message({
              showClose: true,
              message: '排序不能为空！',
              type: 'warning'
            })
          }

          var b
          formData.products.forEach(val => {
            b = val.productSkus.some(item => {
              return item.seckillPrice === '' || item.seckillPrice == 0
              // return !item.seckillPrice.trim().length
            })
            // console.log("b", b);
            if (b) {
              that.$message({
                showClose: true,
                message: '秒杀价不能为空,并且不能为0！',
                type: 'warning'
              })
              return
            }
          })

          var c
          formData.products.forEach(val => {
            c = val.productSkus.some(item => {
              return item.store === ''
              // return !item.store.trim().length
            })
            if (c) {
              that.$message({
                showClose: true,
                message: '秒杀库存不能为空！',
                type: 'warning'
              })
            }
            return
            // console.log("c", c);
          })

          if (!a && !b && !c && that.isSubmit) {
            // 验证必填项都填了之后提交编辑或者添加秒杀商品
            let req = new FormData()
            req.append('seckillProductArrayJson',JSON.stringify(formData))
            if(that.imgFile){
              console.log('that.imgFile',that.imgFile)
              req.append('shareImg',that.imgFile)
            }
            addOrUpdateSeckillPro(req).then(res => {
              console.log('提交秒杀商品返回结果', res)
              if (res.data.res_code == 1) {
                that.$message({
                  showClose: true,
                  message: '提交成功！',
                  type: 'success'
                })
                that.disabledDate = false
                that.$emit('addSure', 1)
                that.ruleForm.productData = []
                that.date = ''
                // that.periodValue = ''
                that.period = ''
              }
              // else if (res.data.res_code == 5000) {
              //   let str = 'Error updating database'
              //   if (res.data.message.indexOf(str) != -1) {
              //     that.$message({
              //       showClose: true,
              //       message: '抱歉，该场次已存在该商品！',
              //       type: 'warning'
              //     })
              //   } else {
              //     that.$message({
              //       showClose: true,
              //       message: res.data.message
              //         ? res.data.message
              //         : '抱歉，提交失败！',
              //       // message: '抱歉，提交失败！',
              //       type: 'error'
              //     })
              //   }
              // }
              else {
                that.$message({
                  showClose: true,
                  message: res.data.message
                    ? res.data.message
                    : '抱歉，提交失败！',
                  // message: '抱歉，提交失败！',
                  type: 'error'
                })
              }
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    // 取消添加或编辑秒杀商品
    handleCancel(item) {
      this.$emit('addSure', item)
    },
    // 合并表格
    // arraySpanMethod({ row, column, rowIndex, columnIndex }) {
    //   if (rowIndex % 7 === 0) {
    //     if (columnIndex === 0) {
    //       return [1, 7]
    //     } else if (columnIndex === 1) {
    //       return [0, 0]
    //     }
    //   }
    // },
    // 选择商品结果
    handleChoseRes(item) {
      let that = this
      if (item.length !== 0) {
        // 确认选择--展示选中的商品
        console.log('确认选择--展示选中的商品', item)
        var isPid
        item.map(val => {
          val.psiid = '' // 秒杀商品id
          val.buyerNumber = 0
          val.buyerOrderNumber = 0
          val.sortId = ''
          val.state = 1
          val.isToTomorrow = 0
          val.showTopFlag = 1
          if (!val.supplierProductSkuVoList) {
            let varr = []
            arr.push({
              spsid: '',
              salesStore: 0,
              seckillPrice: '',
              store: '',
              commissionAmount: 0,
              presetSalesStore: ''
            })
            val.supplierProductSkuVoList = arr
          } else {
            val.supplierProductSkuVoList.map(val1 => {
              val1.spsid = '' // 秒杀商品sku id
              val1.salesStore = 0
              val1.seckillPrice = ''
              // val1.skuName = val1.skuName
              // val1.store = ''
              val1.store = val1.store
              val1.commissionAmount = 0
              val1.presetSalesStore = '' // 预设销售数量
            })
          }
          // val.supplierProductSkuVoList.map(val1 => {
          //   val1.spsid = ""; // 秒杀商品sku id
          //   val1.salesStore = 0;
          //   val1.seckillPrice = "";
          //   // val1.store = ''
          //   val1.store = val1.store;
          //   val1.commissionAmount = 0;
          //   val1.presetSalesStore = ""; // 预设销售数量
          // });
          val.productSkus = val.supplierProductSkuVoList

          // 判断该商品是否添加过
          isPid = that.ruleForm.productData.some(vv => {
            return vv.pid == val.pid
          })
          if (isPid) {
            that.$message({
              showClose: true,
              message: '该商品已添加！',
              type: 'warning'
            })
          }
        })
        // this.ruleForm.productData = item
        if (!isPid) {
          console.log('添加商品')
          this.ruleForm.productData.push(...item)
          let str = JSON.parse(JSON.stringify(this.ruleForm))
          this.ruleForm = str
          // this.$set(this.ruleForm,'productData',item)
          console.log('添加选中的商品', this.ruleForm.productData)
        }
        // console.log('添加商品')
        // this.ruleForm.productData.push(...item)
        // let str = JSON.parse(JSON.stringify(this.ruleForm))
        // this.ruleForm = str
        // // this.$set(this.ruleForm,'productData',item)
        // console.log('添加选中的商品', this.ruleForm.productData)
      }
    },
    // 选择日期变化影响场次的选择
    dateChange() {
      let that = this
      let d = new Date()
      let time1 = d.getDate()
      let time2 = new Date(that.ruleForm.date).getDate()
      console.log('日期选择变化', time1, time2, time2 - time1)
      if (Math.abs(time2 - time1) >= 1) {
        that.ruleForm.times1 = that.ruleForm.times
      } else {
        that.getTimeHourse()
        let isExit = that.times0.some(val => {
          return val.period == that.ruleForm.period
        })
        console.log('是否存在', isExit, that.disabledDate)
        if (!isExit && !that.disabledDate) {
          that.ruleForm.period = ''
        }
      }
    }
    // 切换是否同步到明日
    // handleSwitchState(item, index) {
    //   this.ruleForm.productData.map((val, i) => {
    //     if (i == index) {
    //       val.isToTomorrow = item.isToTomorrow ? 1 : 0
    //     }
    //   })
    // }
  },
  components: {
    choseGoods
  }
}
</script>

<style type="text/css" scoped>
.SeckillAddWrap {
  width: 100%;
  height: 100%;
}
SeckillAddWrap .el-form {
  width: 100%;
  height: 100%;
}
.SeckillAddWrap .el-table {
  margin-top: 20px;
}
.SeckillAddWrap .el-table .cell {
  padding: 10px;
  font-size: 15px;
}
.SeckillAddWrap .btn {
  width: 500px;
  margin: 20px auto 0;
  display: flex;
}
.SeckillAddWrap .btn .el-button {
  width: 237px;
  height: 50px;
  border-radius: 5px;
}
.SeckillAddWrap .table1 {
  width: 100%;
  margin-top: 10px;
  border-collapse: collapse;
}
.SeckillAddWrap .table2 {
  margin-top: -2px;
  width: 100%;
  height: 400px;
  overflow: auto;
  border-collapse: collapse;
  border: 1px solid #eee;
  display: flex;
  flex-direction: column;
}
.SeckillAddWrap .table2::-webkit-scrollbar {
  width: 1px; /*滚动条宽度*/
}
.SeckillAddWrap .table tr {
  display: flex;
  height: 86px;
}
.SeckillAddWrap .table th,
td {
  flex: 1;
  text-align: center;
  border: 1px solid #eee;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.SeckillAddWrap .table .el-input {
  width: 100%;
  border: none;
}
.SeckillAddWrap .iscolspan {
  flex: 8;
  height: 100%;
  box-sizing: border-box;
  padding-left: 10px;
  text-align: left;
  padding-top: 10px;
  box-sizing: border-box;
}
.proTitle {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
