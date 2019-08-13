<template>
  <div class="boxwrap">
    <!-- 秒杀列表 -->
    <div v-show="!showAddSeckill && !showEditSeckill" class="box2 flex2">
      <div class="top">
        <el-button style="margin-right:10px;" @click="handleAdd">+添加秒杀</el-button>
        <el-button style="margin-right:20px;" @click="setTimeShow">时间段设置</el-button>
        <!-- 日期选择 -->
        <el-date-picker
          style="margin-right:20px;"
          v-model="dateChose"
          value-format="yyyy-MM-dd"
          type="daterange"
          @change="handleDateChange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>

        <!-- <el-select v-model="period" :placeholder="times[0].periodValue" style="margin-right:20px;"> -->
        <!-- 场次选择 -->
        <el-select
          v-model="period"
          placeholder="请选择"
          style="margin-right:20px;"
          @change="handlePeriodChange"
          clearable
        >
          <el-option
            v-for="item in times"
            :key="item.periodValue"
            :label="item.periodValue"
            :value="item.period"
          ></el-option>
        </el-select>
        <!-- 上下架选项 -->
        <el-select
          v-model="saleChose"
          placeholder="请选择"
          style="margin-right:20px;"
          @change="handleChangeState"
          clearable
        >
          <el-option
            v-for="item in sales"
            :key="item.saleChose"
            :label="item.label"
            :value="item.saleChose"
          ></el-option>
        </el-select>
      </div>

      <div class="pages" style="margin:5px 0;color:rgba(72,72,72,1);font-size:13px;">
        共
        <span>{{listTotal}}</span> 条 当前第
        <span>{{pageIndex}}</span>页
      </div>
      <div class="table">
        <el-table
          :data="speckillList"
          border
          stripe
          max-height="700"
          style="width: 100%;text-align: center;"
        >
          <el-table-column type="index" fixed="left" width="80" label="排序"></el-table-column>
          <el-table-column prop="startTime1" label="秒杀开始日期"></el-table-column>
          <el-table-column prop="periodValue" label="场次"></el-table-column>
          <el-table-column prop="state" label="状态">
            <template slot-scope="scope">
              <div v-if="scope.row.state==1">
                <span>已上架|</span>
                <span style="color:#0177D5;" @click="handleState(scope.row)">下架</span>
              </div>
              <div v-else>
                <span>已下架|</span>
                <span style="color:#0177D5;" @click="handleState(scope.row)">上架</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="bottom">
        <el-pagination
          background
          :page-size="pagenum"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          layout="prev, pager, next,total, jumper"
          :total="listTotal"
        ></el-pagination>
      </div>

      <!-- 时间段设置模态框 -->
      <el-dialog title="时间段设置（可多选）" :visible.sync="setTimeDialogVisible" width="30%">
        <el-checkbox-group v-model="checkedCities">
          <el-checkbox
            max="24"
            v-for="(periodValue,period) in timeOptions"
            :label="periodValue"
            :key="period"
            @change="handleCheckedCitiesChange(period)"
          >{{periodValue}}</el-checkbox>
        </el-checkbox-group>
        <span slot="footer" class="dialog-footer">
          <el-button @click="setTimeDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="seckillSetPeriod">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 添加或编辑秒杀 -->
    <seckillAdd v-if="showAddSeckill" @addSure="handleAddSure" :isAdd="isAdd" :editId="editId"></seckillAdd>
    <!-- 编辑秒杀 -->
    <!-- <seckillEdit v-if="showEditSeckill" @editSure="handleEditSure"></seckillEdit> -->
  </div>
</template>

<script>
import seckillAdd from './seckillAdd'
import seckillEdit from './seckillEdit'
import {
  seckillList,
  seckillSetTime,
  updateSkeckill,
  seckillFindTime,
  seckillFind
} from '@/api/speckillApi'
const timeOptions = [
  '00:00',
  '01:00',
  '02:00',
  '03:00',
  '04:00',
  '05:00',
  '06:00',
  '07:00',
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
  '23:00'
]
export default {
  name: 'seckill',
  data() {
    return {
      pagenum: 20,
      speckillList: [], // 秒杀列表
      pageIndex: 1,
      showAddSeckill: false, // 添加秒杀页面是否展示
      showEditSeckill: false, // 修改秒杀页面是否展示
      setTimeDialogVisible: false, // 设置时间段模态框
      checkedCities: [], // 选中的时间段字段
      checkedCitiesIndex: [], // 选中的时间段下标
      timeOptions: timeOptions, // 所有的可选时间段列表
      dateChose: '', // 选择的日期筛选
      period: '', // 选择的秒杀时间段的场次筛选
      times: [], // 获取的所设置的时间段列表
      saleChose: '', // 选择的是否上架筛选
      sales: [
        // 上架与下架选项
        {
          saleChose: 1,
          label: '已上架'
        },
        {
          saleChose: 0,
          label: '已下架'
        }
      ],
      currentPage: 1, // 当前页
      listTotal: 0, // 秒杀列表数据总条数
      proState: null, // 商品状态
      isAdd: true, // 添加或编辑秒杀
      editId: '', // 编辑秒杀的id
      flag: true
    }
  },
  created() {
    this.getSeckillList()
    this.getSeckillFindTime()
  },
  watch: {
    // period(newVal,oldVal){
    //   let that = this
    //   console.log('监视场次选择的变化',newVal,oldVal)
    //   if (newVal) {
    //     that.period = newVal
    //     that.findSeckill()
    //   } else{
    //     that.getSeckillList()
    //   }
    // }
  },
  methods: {
    // 获取秒杀列表
    getSeckillList() {
      let that = this
      let formData = {
        pageIndex: this.pageIndex,
        startTime: this.dateChose ? this.dateChose[0] : '',
        endTime: this.dateChose ? this.dateChose[1] : '',
        period: this.period,
        state: this.saleChose
      }
      seckillList(formData).then(res => {
        if (res.data.res_code == 1) {
          // console.log('获取秒杀列表',res)
          res.data.result.map(val => {
            val.startTime1 = that.$utils.getTime(val.startTime, 'day', '-')
            // val.startTime1 = val.startTime
          })
          that.listTotal = res.data.total
          that.speckillList = res.data.result
          console.log('获取秒杀列表2', that.speckillList)
        } else {
          that.speckillList = []
          that.listTotal = 0
          that.$message({
            showClose: true,
            // message: res.data.message?res.data.message:'抱歉，获取失败！',
            message: '抱歉，无数据！',
            type: 'error'
          })
        }
      })
    },

    // 是否展示设置时间段弹出框
    setTimeShow() {
      this.setTimeDialogVisible = true
    },
    // 设置时间弹出框中段选中的时间段
    handleCheckedCitiesChange(value) {
      console.log('选中的时间段下标数组', value)
      let isExit = this.checkedCitiesIndex.some(val => {
        return val === value
      })
      if (isExit) {
        let index = this.checkedCitiesIndex.indexOf(value)
        this.checkedCitiesIndex.splice(index, 1)
      } else {
        this.checkedCitiesIndex.push(value)
      }

      this.checkedCitiesIndex = [...new Set(this.checkedCitiesIndex)]
      // console.log('选中的时间段字段',this.checkedCities)
      console.log('选中的时间段下标数组', this.checkedCitiesIndex)
    },
    // 点击确定把选中的时间段提交
    seckillSetPeriod() {
      let that = this
      let str = this.checkedCitiesIndex.join(',')
      console.log('str', str)
      seckillSetTime({ periods: str }).then(res => {
        console.log('选中的时间段提交', res)
        if (res.data.res_code == 1) {
          that.$message({
            showClose: true,
            // message: res.data.message?res.data.message:'抱歉，获取失败！',
            message: '提交成功！',
            type: 'success'
          })
          that.getSeckillFindTime() // 提交时间段成功之后重新获取保存提交的时间段
        } else {
          that.$message({
            showClose: true,
            // message: res.data.message?res.data.message:'抱歉，获取失败！',
            message: '抱歉，提交失败！',
            type: 'error'
          })
        }
        that.setTimeDialogVisible = false
      })
    },
    // 获取已保存的秒杀时间段
    getSeckillFindTime() {
      let that = this
      seckillFindTime().then(res => {
        console.log('获取已保存的秒杀时间段', res)
        if (res.data.res_code == 1) {
          that.times = res.data.result // 提交时间段成功之后重新获取保存提交的时间段
          that.checkedCities = res.data.result.map(val => {
            return val.periodValue
          })
          that.checkedCitiesIndex = res.data.result.map(val => {
            return val.period
          })
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

    // 选择日期筛选
    handleDateChange() {
      let that = this
      console.log('日期选择筛选', this.dateChose)
      if (this.dateChose) {
        that.pageIndex = 1
        // that.startTime = that.dateChose[0],
        // that.endTime = that.dateChose[1],
        that.getSeckillList()
      } else {
        that.getSeckillList()
      }
    },
    // 选择场次筛选
    handlePeriodChange(val) {
      console.log('选择场次变化', val)
      let that = this
      if (val) {
        that.pageIndex = 1
        that.period = val
        that.getSeckillList()
      } else {
        that.getSeckillList()
      }
    },
    // 根据状态筛选秒杀商品
    handleChangeState(item) {
      console.log('状态筛选', item)
      if (item == 0 || item == 1) {
        this.pageIndex = 1
        this.saleChose = item
        this.getSeckillList()
      } else {
        this.getSeckillList()
      }
    },

    // 显示添加秒杀
    handleAdd() {
      // this.$router.push({path: '/activity/seckillAdd'})
      this.showAddSeckill = true
      this.isAdd = true
    },
    // 监听添加秒杀完成
    handleAddSure(item) {
      if (item) {
        // 确认添加
        this.showAddSeckill = false
        this.getSeckillList()
      }
      // 取消添加
      this.showAddSeckill = false
    },
    // 显示编辑秒杀
    handleEdit(params) {
      // this.$router.push({path: '/activity/seckillEdit'})
      // this.showEditSeckill = true

      // console.log('编辑参数',params)
      // if (params.state === 0) {
      //   console.log('---------')
      //   this.$message({
      //     showClose: true,
      //     message: '抱歉，该场次已下架！',
      //     type: 'error'
      //   })
      //   return
      // }
      this.showAddSeckill = true
      this.isAdd = false
      this.editId = params.sesid
    },

    // 修改上架下架状态
    handleState(item) {
      let that = this
      console.log('上下架状态', item)
      if (!that.flag) return
      that.flag = false
      if (item.state == 1) {
        that
          .$confirm('确定下架吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(() => {
            updateSkeckill({
              state: 0,
              sesid: item.sesid
            }).then(res => {
              if (res.data.res_code == 1) {
                that.getSeckillList()
                that.$message({
                  type: 'success',
                  message: '下架成功!'
                })
              }
              that.flag = true
            })
          })
          .catch(() => {
            that.$message({
              type: 'info',
              message: '已取消下架'
            })
          })
      } else if (item.state == 0) {
        that
          .$confirm('确定上架吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(() => {
            updateSkeckill({
              state: 1,
              sesid: item.sesid
            }).then(res => {
              if (res.data.res_code == 1) {
                that.getSeckillList()
                that.$message({
                  type: 'success',
                  message: '上架成功!'
                })
              }
              that.flag = true
            })
          })
          .catch(() => {
            that.$message({
              type: 'info',
              message: '已取消上架'
            })
          })
      }

      // if (item.state == 1) {
      //   updateSkeckill({
      //     state: 0,
      //     sesid: item.sesid
      //   }).then(res => {
      //     if (res.data.res_code == 1) {
      //       that.getSeckillList()
      //     }
      //     that.flag = true
      //   })
      // } else if (item.state == 0) {
      //   updateSkeckill({
      //     state: 1,
      //     sesid: item.sesid
      //   }).then(res => {
      //     if (res.data.res_code == 1) {
      //       that.getSeckillList()
      //     }
      //     that.flag = true
      //   })
      // }
    },

    // 分页--页数改变
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    // 分页--当前页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.pageIndex = val
      this.getSeckillList()
    }
  },
  components: {
    seckillAdd,
    seckillEdit
  }
}
</script>

<style>
.boxwrap {
  padding: 10px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: #fff;
}
.boxwrap .box2 {
  width: 100%;
  height: 100%;
}
.boxwrap .top {
  /* display: flex; */
}
/* .boxwrap .top>el-button{
    width:112px;
    height:32px;
    border-radius:4px;
    font-size:14px;
  }
  .boxwrap .top el-select{
    width:100px;
    height:32px;
    border-radius:4px;
    border:1px solid rgba(51,214,197,1);
    color:rgba(51,214,197,1);
  } */
.boxwrap .box2 .table {
  height: 100%;
  width: 100%;
}
.boxwrap .bottom {
  margin: 20px auto;
}
</style>
