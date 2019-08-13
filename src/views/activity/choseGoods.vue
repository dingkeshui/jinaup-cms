<template>
  <!-- 选择商品 -->
  <el-dialog title="选择商品" :visible.sync="isShowChoseGoods" width="70%">
    <div class="top">
      <div class="search">
        <el-input
          placeholder="商品名称或ID"
          style="border-radius:4px 0px 0px 4px; width:235px;"
          v-model="searchId"
          clearable
          @clear="clearSearchId"
        ></el-input>
        <el-button style="background:#33D6C5;color:#fff;" @click="handleSearch">搜索</el-button>
      </div>
      <!-- <el-select v-model="state" placeholder="商品状态" @change="changeState" clearable>
        <el-option
          v-for="item in proState"
          :key="item.state"
          :label="item.label"
          :value="item.state"
        ></el-option>
      </el-select>-->
      <!-- <el-select v-model="authState" placeholder="审核状态" @change="changeAuthState" clearable>
        <el-option
          v-for="item in examineState"
          :key="item.authState"
          :label="item.label"
          :value="item.authState"
        ></el-option>
      </el-select>-->
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width:100%;margin-top:20px;"
      border
      height="500"
      @selection-change="handleSelectionChange"
    >
      <!-- <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column> -->
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="pid" label="ID"></el-table-column>
      <el-table-column prop="mainImgUrl" label="主图">
        <template slot-scope="scope">
          <img :src="scope.row.mainImgUrl" alt style="width:44px;height:44px;" />
        </template>
      </el-table-column>
      <el-table-column prop="title" label="商品名称" show-overflow-tooltip></el-table-column>
      <el-table-column prop="cName" label="三级分类" show-overflow-tooltip></el-table-column>
      <el-table-column prop="productType" label="商品类型" show-overflow-tooltip>
        <template slot-scope="scope">
          <span v-if="scope.row.productType==0">普通商品</span>
          <span v-if="scope.row.productType==1">升级会员商品</span>
          <span v-if="scope.row.productType==2">秒杀商品</span>
          <span v-if="scope.row.productType==3">拼团商品</span>
        </template>
      </el-table-column>
      <el-table-column prop="bName" label="店铺名称" show-overflow-tooltip></el-table-column>
      <el-table-column prop="supplyPrice" label="成本价" show-overflow-tooltip></el-table-column>
      <el-table-column prop="salesPrice" label="销售价" show-overflow-tooltip></el-table-column>
      <el-table-column prop="state" label="商品状态" show-overflow-tooltip>
        <template slot-scope="scope">
          <span v-if="scope.row.state==0">已下架</span>
          <span v-if="scope.row.state==1">上线中</span>
        </template>
      </el-table-column>
      <el-table-column prop="authState" label="审核状态" show-overflow-tooltip>
        <template slot-scope="scope">
          <span v-if="scope.row.authState==0">待审核</span>
          <span v-if="scope.row.authState==1">已通过</span>
          <span v-if="scope.row.authState==2">已拒绝</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        background
        :page-size="pagenum"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        layout="prev, pager, next,total, jumper"
        :total="listTotal"
      ></el-pagination>
    </div>

    <div class="btn">
      <el-button
        style="margin-right:20px;background:rgba(51,214,197,1);color:rgba(255,255,255,1);"
        @click="enSure"
      >确定</el-button>
      <el-button style="color:rgba(51,214,197,1);" @click="cancel">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { productForSeckillList } from '@/api/speckillApi'
export default {
  name: 'choseGoods',
  data() {
    return {
      pagenum: 20,
      searchId: '',
      pageIndex: 1,
      isShowChoseGoods: false,
      tableData: [], //商品列表
      multipleSelection: [], // 选中的商品
      multipleSelection1: [],
      proState: [
        // 商品状态
        {
          state: 1,
          label: '上架'
        },
        {
          state: 0,
          label: '下架'
        }
      ],
      state: '', // 选择的商品状态
      examineState: [
        // 审核状态
        {
          authState: 1,
          label: '已通过'
        },
        {
          authState: 2,
          label: '已拒绝'
        },
        {
          authState: 0,
          label: '待审核'
        }
      ],
      authState: '', // 选择的审核状态
      currentPage: 1,
      listTotal: 0
    }
  },
  created() {
    // this.multipleSelection = []
  },
  methods: {
    // 获取商品列表
    getProList() {
      let that = this
      let formData = {
        pageIndex: this.pageIndex,
        title: this.searchId,
        // state: this.state,
        authState: this.authState
      }
      productForSeckillList(formData).then(res => {
        console.log('获取商品列表', res)
        if (res.data.res_code == 1) {
          that.tableData = res.data.result
          this.listTotal = res.data.total
        } else {
          that.$message({
            showClose: true,
            // message: res.data.message?res.data.message:'抱歉，获取失败！',
            message: '抱歉，无数据！',
            type: 'error'
          })
        }
      })
    },
    // 搜索筛选
    handleSearch() {
      let that = this
      if (that.searchId.trim().length) {
        that.pageIndex = 1
        that.state = ''
        that.authState = ''
        that.getProList()
      }
    },
    // 清空搜索筛选
    clearSearchId() {
      this.pageIndex = 1
      this.searchId = ''
      this.getProList()
    },
    // 商品状态筛选
    changeState(item) {
      console.log('商品状态筛选', item)
      this.pageIndex = 1
      this.state = item
      this.getProList()
    },
    // 审核状态筛选
    changeAuthState(item) {
      console.log('审核状态筛选', item)
      this.pageIndex = 1
      this.authState = item
      this.getProList()
    },
    // 展示选择商品弹框
    showChoseGoods() {
      this.isShowChoseGoods = true
      this.multipleSelection1 = []
    },
    // 选中的商品
    handleSelectionChange(params) {
      console.log('选中', params)
      let that = this
      if (params.length) {
        params.forEach(val => {
          if (
            !val.supplierProductSkuVoList ||
            val.supplierProductSkuVoList.length == 0
          ) {
            that.$message({
              showClose: true,
              message: '无SKU的商品不能添加为秒杀商品！',
              type: 'warning'
            })
            that.multipleSelection = params.filter(val1 => {
              return (
                val1.supplierProductSkuVoList &&
                val1.supplierProductSkuVoList.length !== 0
              )
            })
          } else {
            // let isStore = val.supplierProductSkuVoList.some(item => {
            //   return item.store == 0
            // })

            // if (isStore) {
            //   that.$message({
            //     showClose: true,
            //     message: '抱歉，该商品库存为0,不能添加为秒杀商品！',
            //     type: 'error'
            //   })
            //   return
            // }
            // that.multipleSelection = params
            that.multipleSelection = params.filter(val1 => {
              return val1.supplierProductSkuVoList.length !== 0
            })
          }
        })
      } else {
        that.multipleSelection = []
      }

      // that.multipleSelection = params;
      // console.log(111111)
      console.log('选中的秒杀商品', that.multipleSelection)
    },
    // 确定按钮
    enSure() {
      // if (!this.multipleSelection) {
      //   return
      // }
      this.multipleSelection1.push(...this.multipleSelection)
      this.multipleSelection1 = [...new Set(this.multipleSelection1)]
      this.$emit('isSureChose', this.multipleSelection1)
      this.isShowChoseGoods = false
    },
    // 取消按钮
    cancel() {
      this.$emit('isSureChose', [])
      this.isShowChoseGoods = false
    },
    // 分页--当前页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.pageIndex = val
      this.getProList()
      let arr = this.multipleSelection
      this.multipleSelection1.push(...arr)
      this.multipleSelection1 = [...new Set(this.multipleSelection1)]
    }
  }
}
</script>

<style scoped type="text/css">
.top {
  display: flex;
}
.top .search {
  display: flex;
}
.el-select {
  margin-left: 20px;
}
.pagination {
  margin-top: 20px;
}
.el-dialog .btn {
  margin: 20px auto 0;
  display: flex;
}
.btn .el-button {
  width: 237px;
  height: 50px;
  border-radius: 5px;
}
</style>
