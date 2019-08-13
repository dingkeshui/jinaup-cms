<template>
  <div class="box flex2">
  		<div class="pad10 flex">
  			<div class="flex1">
          <el-button @click="addnewfun" type="primary" size="mini">添加数据内容</el-button>   
        </div>
  			<div class="flex flexcenter">
  				<el-button type="primary" size="mini" @click="closepage">返回</el-button>
  			</div>
  		</div>
  		<div class="flex1" style="position:relative;">
        <div class="tablebox">
  			  <el-table
	          :data="list"
	          border
	          stripe
	          height="100%"
	          style="width: 100%">
	          <el-table-column
  	          fixed="left"
  		        type="index"
  		        width="50">
		        </el-table-column>
            <el-table-column
              prop="pid"
              label="元素ID">
            </el-table-column>
	          <el-table-column
	            prop="title"
	            label="标题">
	          </el-table-column>
            <el-table-column
              prop="pageName"
              label="数据类型"
              width="110">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.contentType==1">商品</el-tag>
                <el-tag v-if="scope.row.contentType==2" type="success">专题</el-tag>
                <el-tag v-if="scope.row.contentType==3" type="primary">分类</el-tag>
                <el-tag v-if="scope.row.contentType==4" type="warning">品牌</el-tag>
                <el-tag v-if="scope.row.contentType==7" type="warning">单品专题</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="contentValue"
              label="数据值">
            </el-table-column>
            <el-table-column
              label="图片"
              width="100">
              <template slot-scope="scope">
                <div class="imgbox">
                  <img :src="scope.row.imgUrl">
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="uiType"
              label="uiType">
            </el-table-column>
            <el-table-column
              prop="sortId"
              label="排序位置">
            </el-table-column>
	           <el-table-column
	            label="状态"
	            width="100">
	            <template slot-scope="scope">
                <el-tag v-if="scope.row.state==1">上线中</el-tag>
                <el-tag v-else type="danger">下线中</el-tag>
	            </template>
	          </el-table-column>
	          <el-table-column
	            fixed="right"
	            label="操作"
	            width="100">
	            <template slot-scope="scope">
	              <div class="mgb10"><el-button type="primary" class="minbut" @click="changeBank(scope.row)" size="small">修改</el-button></div>
	              <div v-if="scope.row.state==1"><el-button type="warning" class="minbut" @click="delAd(scope.row)" size="small">下线</el-button></div>
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
          :total="page.num"
	        layout="total, prev, pager, next, jumper">
	      </el-pagination>
    	</div>
      <el-dialog
        title="添加内容"
        :visible.sync="dialogVisible"
        fullscreen="true"
        :before-close="handleClose">
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item label="标题">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <template v-if="showimg">
            <el-form-item v-if="itemdata.pageValue!='spikeProduct'" label="数据类型">
              <el-select v-model="form.contentType" clearable placeholder="请选择数据类型">
                <el-option
                  v-for="item in pagelist"
                  :key="item.contentType"
                  :label="item.contentName"
                  :value="item.contentType">
                </el-option>
              </el-select>
            </el-form-item>
          </template>
          <el-form-item v-if="itemdata.pageValue=='spikeProduct'" label="秒杀商品">
            <div><el-button size="small" @click="choosetype('f')" type="primary">选择秒杀商品</el-button></div>
            <div v-if="skillitem">
              <table cellspacing="0" class="tab">
                  <tr>
                    <td>秒杀商品ID</td>
                    <td class="flex1">秒杀商品昵称</td>
                    <td>秒杀时间</td>
                    <td>秒杀商品图片</td>
                  </tr>
                  <tr>
                    <td>{{skillitem.pid}}</td>
                    <td class="flex1">{{skillitem.title}}</td>
                    <td>{{skillitem.shortTitle}}</td>
                    <td><img :src="skillitem.mainImgUrl"></td>
                  </tr>
              </table>
            </div>
          </el-form-item>
          <template v-else>
          <el-form-item v-if="form.contentType=='1'" label="选择商品">
            <div><el-button size="small" @click="choosetype('a')" type="primary">选择商品</el-button></div>
            <div v-if="goodsitem">
              <table cellspacing="0" class="tab">
                  <tr>
                    <td>商品ID</td>
                    <td class="flex1">商品昵称</td>
                    <td>商品图片</td>
                  </tr>
                  <tr>
                    <td>{{goodsitem.pid}}</td>
                    <td class="flex1">{{goodsitem.title}}</td>
                    <td><img :src="goodsitem.mainImgUrl"></td>
                  </tr>
              </table>
            </div>
          </el-form-item>
          <el-form-item v-if="form.contentType=='2'" label="选择专题">
            <div>
              <el-button size="small" @click="choosetype('c')" type="primary">选择会员专题</el-button>
              <el-button size="small" @click="choosetype('cb')" type="primary">选择普通专题</el-button>
            </div>
              <div v-if="comspecialitem">
                <table cellspacing="0" class="tab">
                    <tr>
                      <td>普通专题ID</td>
                      <td class="flex1">普通专题昵称</td>
                      <td>普通专题图片</td>
                    </tr>
                    <tr>
                      <td>{{comspecialitem.siid}}</td>
                      <td class="flex1">{{comspecialitem.specialName}}</td>
                      <td><img :src="comspecialitem.specialImg"></td>
                    </tr>
                </table>
              </div>
              <div v-if="specialitem">
                <table cellspacing="0" class="tab">
                    <tr>
                      <td>专题ID</td>
                      <td class="flex1">专题昵称</td>
                      <td>专题图片</td>
                    </tr>
                    <tr>
                      <td>{{specialitem.tid}}</td>
                      <td class="flex1">{{specialitem.title}}</td>
                      <td><img :src="specialitem.imgUrl"></td>
                    </tr>
                </table>
              </div>
          </el-form-item>
          <el-form-item v-if="form.contentType=='3'" label="选择分类">
            <div><el-button size="small" @click="choosetype('e')" type="primary">选择分类</el-button></div>
            <div v-if="classitem">
                <table cellspacing="0" class="tab">
                  <tr>
                    <td>分类ID</td>
                    <td class="flex1">分类昵称</td>
                    <td>分类图片</td>
                  </tr>
                  <tr>
                    <td>{{classitem.cid}}</td>
                    <td class="flex1">{{classitem.cname}}</td>
                    <td><img v-if="imgUrl" :src="classitem.imgUrl"><span class="colaaa" v-else>暂无图片</span></td>
                  </tr>
                </table>
            </div>
          </el-form-item>
          <el-form-item v-if="form.contentType=='4'" label="选择品牌">
            <div><el-button size="small" @click="choosetype('d')" type="primary">选择品牌</el-button></div>
            <div v-if="brankitem">
                <table cellspacing="0" class="tab">
                  <tr>
                    <td>品牌ID</td>
                    <td class="flex1">品牌昵称</td>
                    <td>品牌图片</td>
                  </tr>
                  <tr>
                    <td>{{brankitem.bid}}</td>
                    <td class="flex1">{{brankitem.chineseName}}</td>
                    <td><img :src="brankitem.logoImgUrl"></td>
                  </tr>
                </table>
            </div>
          </el-form-item>
          <el-form-item v-if="form.contentType=='7'" label="选择单品专题">
            <div><el-button size="small" @click="choosetype('g')" type="primary">选择单品专题</el-button></div>
            <div v-if="goodsspecialitem">
                <table cellspacing="0" class="tab">
                  <tr>
                    <td>专题昵称</td>
                    <td class="flex1">专题商品昵称</td>
                    <td>专题商品ID</td>
                  </tr>
                  <tr>
                    <td>{{goodsspecialitem.id}}</td>
                    <td class="flex1">{{goodsspecialitem.productName}}</td>
                    <td>{{goodsspecialitem.pid}}</td>
                  </tr>
                </table>
            </div>
          </el-form-item>
          </template>
          <el-form-item v-if="showimg" label="数据图片">
            <div style="overflow: hidden">
              <div class="avatardiv">
                <input accept="image/*" ref="pcimg" @change="chooseimg" type="file" class="headimginp">
                <img v-if="imgUrl" :src="imgUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </div>
            </div>
            <p class="fs12 colccc mg-15">注:图片大小不得大于10M</p>
          </el-form-item>
          <el-form-item label="排序位置">
            <el-input placeholder="请输入排序ID" v-model="form.sortId"></el-input>
          </el-form-item>
          <el-form-item label="模板状态">
            <el-radio v-model="form.state" label="1">上线</el-radio>
            <el-radio v-model="form.state" label="0">下线</el-radio>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button v-if="changDialogVisible" type="primary" @click="changeform">保 存</el-button>
          <el-button v-else type="primary" @click="sureAdd">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        :title="dialogtitle"
        :visible.sync="dialogVisible2"
        width="80%"
        class="mg5vh"
        @close="clospageCom"
        :before-close="handleClose">
        <goods v-if="showcom=='a'" @closepage="clospageCom"  v-model="goodsitem" itemdata="choose"></goods>
        <special v-if="showcom=='c'" @closepage="clospageCom" v-model="specialitem" itemdata="choose"></special>
        <comspecial v-if="showcom=='cb'" @closepage="clospageCom" v-model="comspecialitem" itemdata="choose"></comspecial>
        <brank v-if="showcom=='d'" @closepage="clospageCom" v-model="brankitem" itemdata="choose"></brank>
        <classlist v-if="showcom=='e'" @closepage="clospageCom" v-model="classitem" itemdata="choose"></classlist>
        <skillgoods v-if="showcom=='f'" @closepage="clospageCom" v-model="skillitem" itemdata="choose"></skillgoods>
        <goodsspecial v-if="showcom=='g'" @closepage="clospageCom" v-model="goodsspecialitem" itemdata="choose"></goodsspecial>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
import brank from '@/components/brank/branklist.vue'
import special from '@/components/special/speciallist.vue'
import classlist from '@/components/goods/classlist.vue'
import comspecial from '@/components/special/comspeciallist.vue'
import goods from '@/components/goods/goodslist.vue'
import skillgoods from '@/components/goods/spikeinfo.vue'
import goodsspecial from '@/components/special/goodsspecial.vue'

export default {
  name: 'apphomeinfomain',
  props:['itemdata','pagelist'],
  components:{
    brank,
    special,
    classlist,
    comspecial,
    goods,
    skillgoods,
    goodsspecial
  },
  data () {
  	return {
      // 选择的品牌信息
      brankitem:'',
      // 选择的会员专题信息
      specialitem:'',
      // 选择的普通专题
      comspecialitem:'',
      // 选择的分类信息
      classitem:'',
      // 选择的商品信息
      goodsitem:'',
      // 选择的单品专题
      goodsspecialitem:'',
      // 秒杀信息
      skillitem:'',
      postData:{
        pageIndex:1
      },
      list:'',
      page:{
        num:''
      },
      // 显示添加内容
      dialogVisible:false,
      changDialogVisible:false,
      // 选择商品分类品牌
      dialogVisible2:false,
      form:{
        state:'1',
        uiType:'1'
      },
      imgUrl:'',
      imgFile:'',
      showcom:'',
      dialogtitle:'',
      // 要编辑的数据
      onItem:'',
      // 显示图片
      showimg:false
  	}
  },
  created(){
    console.log('模板内容',this.itemdata)
    this.postData.phid = this.itemdata.phid
    this.form.phid = this.itemdata.phid
    this.form.pageType = this.itemdata.pageType
    if(this.itemdata.pageValue == "carouselImg"){
      console.log('轮播图')
      this.showimg = true
    } else if(this.itemdata.pageValue == "specialColumn") {
      console.log('五专栏')
      this.showimg = true
    } else if(this.itemdata.pageValue == "adOne") {
      console.log('广告一图')
      this.showimg = true
    } else if(this.itemdata.pageValue == "adThree") {
      console.log('长方三图')
      this.showimg = true
    } else if(this.itemdata.pageValue == "adFour") {
      console.log('正方四图')
      this.showimg = true
    } else if(this.itemdata.pageValue == "carouselProduct") {
      console.log("轮播产品")
      this.showimg = false
    } else if(this.itemdata.pageValue == "sixProduct") {
      this.showimg = false
      console.log("好物6产品")
    } else if(this.itemdata.pageValue == "spikeProduct") {
      this.showimg = false
      console.log("秒杀产品")
    } else if(this.itemdata.pageValue == "selected") {
      this.showimg = false
      console.log("为你精选")
    }
  	this.homeinfoList()
  },
  methods:{
    sureAdd(){
      console.log('添加',this.form,this.imgFile)
      this.form.uiType = 1
      this.form.phid = this.itemdata.phid
      this.form.pageType = this.itemdata.pageType
      if(this.form.contentType==1){
        if(this.itemdata.pageValue == "spikeProduct"){
          this.form.contentValue = this.skillitem.pid
          this.form.imgUrl = this.skillitem.mainImgUrl
          if(this.skillitem.mainImgHeight){
            this.form.imgHeight = this.skillitem.mainImgHeight
            this.form.imgWidth = this.skillitem.mainImgWidth
          }
        }else{
          this.form.contentValue = this.goodsitem.pid
          if(this.imgFile){
            this.form.pictImg = this.imgFile
          }else{
            if(this.goodsitem.mainImgHeight){
              this.form.imgHeight = this.goodsitem.mainImgHeight
              this.form.imgWidth = this.goodsitem.mainImgWidth
            }
            this.form.imgUrl = this.goodsitem.mainImgUrl
          }
        }
      }else if(this.form.contentType==2) {
        if(this.comspecialitem){
          this.form.uiType = 1
          console.log('comspecialitem',this.comspecialitem)
          this.form.contentValue = this.comspecialitem.siid
          if(this.imgFile){
            this.form.pictImg = this.imgFile
          }else{
            this.form.imgUrl = this.comspecialitem.specialImg
            if(this.comspecialitem.imgHeight){
              this.form.imgHeight = this.comspecialitem.imgHeight
              this.form.imgWidth = this.comspecialitem.imgWidth
            }
          }
        }else{
          console.log('specialitem==',this.specialitem)
          this.form.uiType = 2
          this.form.contentValue = this.specialitem.tid
          if(this.specialitem.topicType==4){
            this.form.uiType = 3
          }
          if(this.imgFile){
            this.form.pictImg = this.imgFile
          }else{
            this.form.imgUrl = this.specialitem.imgUrl
            if(this.specialitem.imgHeight){
              this.form.imgHeight = this.specialitem.imgHeight
              this.form.imgWidth = this.specialitem.imgWidth
            }
          }
        }
      }else if(this.form.contentType==3) {
        console.log(1)
          this.form.contentValue = this.classitem.cid
          if(this.imgFile){
            console.log(2)
            this.form.pictImg = this.imgFile
          }else{
            console.log(3)
            this.form.imgUrl = this.classitem.imgUrl
            if(this.classitem.imgHeight){
              this.form.imgHeight = this.classitem.imgHeight
              this.form.imgWidth = this.classitem.imgWidth
            }
          }
      }else if(this.form.contentType==4) {
          this.form.contentValue = this.brankitem.bid
          if(this.imgFile){
            this.form.pictImg = this.imgFile
          }else{
            this.form.imgUrl = this.brankitem.imgUrl
            if(this.brankitem.imgHeight){
              this.form.imgHeight = this.brankitem.imgHeight
              this.form.imgWidth = this.brankitem.imgWidth
            }
          }
      }else if(this.form.contentType==6) {
          this.form.contentValue = ''
          console.log('跳转到秒杀列表')
          if(this.imgFile){
            this.form.pictImg = this.imgFile
          }
      }else if(this.form.contentType==7) {
          this.form.contentValue = this.goodsspecialitem.id
          console.log('跳转到秒杀列表')
          if(this.imgFile){
            this.form.pictImg = this.imgFile
          }
      }
      if(!this.form.imgHeight){
        delete this.form.imgHeight
        delete this.form.imgWidth
      }
      let formdata = new FormData()
      for(let i in this.form){
        formdata.append(i,this.form[i])
      }
      this.$api.homeinfoAdd(formdata,(data)=>{
        console.log(data)
        if(data.data.res_code==1){
          this.$message({
            showClose:true,
            message:'模板内容添成功',
            type:'success'
          })
          this.dialogVisible = false
          this.homeinfoList()
        } else {
          this.$message({
            showClose:true,
            message:'模板内容添加失败',
            type:'error'
          })
        }
      })
    },
    // 保存
    changeform(){
      console.log('编辑内容',this.form)
      this.form.pid = this.onItem.pid
      this.form.phid = this.itemdata.phid
      this.form.pageType = this.itemdata.pageType
      if(this.form.contentType==1){
        this.form.contentValue = this.goodsitem.pid
        if (this.showimg) {
          if (this.imgFile) {
            this.form.pictImg = this.imgFile
          } else {
            this.form.imgUrl = this.onItem.imgUrl
            if(this.onItem.imgHeight){
              this.form.imgHeight = this.onItem.imgHeight
              this.form.imgWidth = this.onItem.imgWidth
            }
          }
        } else {
            this.form.imgUrl = this.goodsitem.mainImgUrl
            if(this.goodsitem.mainImgHeight){
              this.form.imgHeight = this.goodsitem.mainImgHeight
              this.form.imgWidth = this.goodsitem.mainImgWidth
            }
        }
          
      }else if(this.form.contentType==2) {
        if (this.comspecialitem) {
          this.form.uiType = 1
          console.log('comspecialitem',this.comspecialitem)
          this.form.contentValue = this.comspecialitem.siid
          if (this.showimg) {
            if (this.imgFile) {
              this.form.pictImg = this.imgFile
            } else {
              this.form.imgUrl = this.onItem.imgUrl
              if(this.onItem.imgHeight){
                this.form.imgHeight = this.onItem.imgHeight
                this.form.imgWidth = this.onItem.imgWidth
              }
            }
          } else {
            this.form.imgUrl = this.comspecialitem.specialImg
            if(this.comspecialitem.imgHeight){
              this.form.imgHeight = this.comspecialitem.imgHeight
              this.form.imgWidth = this.comspecialitem.imgWidth
            }
          }
        } else {
          this.form.uiType = 2
          if(this.specialitem.topicType==4){
            this.form.uiType = 3
          }
          this.form.contentValue = this.specialitem.tid
          if(this.showimg){
            if (this.imgFile) {
              this.form.pictImg = this.imgFile
            } else {
              this.form.imgUrl = this.onItem.imgUrl
              if (this.onItem.imgHeight) {
                this.form.imgHeight = this.onItem.imgHeight
                this.form.imgWidth = this.onItem.imgWidth
              }
            }
          } else {
            this.form.imgUrl = this.specialitem.imgUrl
            if(this.specialitem.imgHeight){
              this.form.imgHeight = this.specialitem.imgHeight
              this.form.imgWidth = this.specialitem.imgWidth
            }
          }
        }
      }else if(this.form.contentTypeName==3) {
          this.form.contentValue = this.classitem.cid
          if (this.showimg) {
            if (this.imgFile) {
              this.form.pictImg = this.imgFile
            } else {
              this.form.imgUrl = this.onItem.imgUrl
              if(this.onItem.imgHeight){
                this.form.imgHeight = this.onItem.imgHeight
                this.form.imgWidth = this.onItem.imgWidth
              }
            }
          } else {
            this.form.imgUrl = this.classitem.imgUrl
            if (this.classitem.imgHeight) {
                this.form.imgHeight = this.classitem.imgHeight
                this.form.imgWidth = this.classitem.imgWidth
            }
          }
      }else if(this.form.contentType==4) {
          this.form.contentValue = this.brankitem.bid
          if (this.showimg) {
            if (this.imgFile) {
              this.form.pictImg = this.imgFile
            } else {
              this.form.imgUrl = this.onItem.imgUrl
              if(this.onItem.imgHeight){
                this.form.imgHeight = this.onItem.imgHeight
                this.form.imgWidth = this.onItem.imgWidth
              }
            }
          } else {
            if(this.brankitem.imgHeight){
              this.form.imgHeight = this.brankitem.imgHeight
              this.form.imgWidth = this.brankitem.imgWidth
            }
            this.form.imgUrl = this.brankitem.imgUrl
          }
      }else if(this.form.contentType==6) {
          this.form.contentValue = ''
          console.log('跳转到秒杀列表')
          if (this.imgFile) {
            this.form.pictImg = this.imgFile
          } else {
            this.form.imgUrl = this.onItem.imgUrl
            if(this.onItem.imgHeight){
              this.form.imgHeight = this.onItem.imgHeight
              this.form.imgWidth = this.onItem.imgWidth
            }
          }
      }else if(this.form.contentType==7) {
          this.form.contentValue = this.goodsspecialitem.id
          console.log('跳转到秒杀列表')
          if(this.imgFile){
            this.form.pictImg = this.imgFile
          }
      }
      if(!this.form.imgHeight){
        delete this.form.imgHeight
        delete this.form.imgWidth
      }
      let formdata = new FormData()
      for(let i in this.form){
        formdata.append(i,this.form[i])
      }
      this.$api.homeinfoUpdata(formdata,(data)=>{
        console.log(data)
        if(data.data.res_code==1){
          this.$message({
            showClose:true,
            message:'模板内容编辑成功',
            type:'success'
          })
          this.dialogVisible = false
          this.homeinfoList()
        } else {
          this.$message({
            showClose:true,
            message:'模板内容编辑失败',
            type:'error'
          })
        }
      })
    },
    homeinfoList(){
      console.log('获取模板内容列表',this.postData)
      this.$api.homeinfoList(this.postData,(data)=>{
        console.log(data)
        if(data.status==200){
          if(data.data.res_code==1){
            this.list = data.data.result
          }else{
            this.list = ""
          }
          this.page.num = data.data.total
        }else{
          this.$message({
            showClose:true,
            message:'模板内容列表失败',
            type:'error'
          })
        }
      })
    },
    // 修改
    changeBank(item){
      console.log('修改',item)
      this.dialogVisible = true
      this.changDialogVisible = true
      this.imgFile = ""
      this.imgUrl = ""
      this.form = {
        title:item.title,
        contentType:item.contentType,
        uiType:item.uiType,
        state:item.state + '',
        sortId:item.sortId,
        pid:item.pid,
        contentValue:item.contentValue
      }
      this.imgUrl = item.imgUrl
      this.onItem = item
      if (item.contentType=='1') {
        console.log('商品')
        this.getOneGoods()
      } else if (item.contentType=='2') {
        console.log('专题')
        if(item.uiType==2){
          this.getOneSpec()
        }else if (item.uiType==1){
          this.getOneSpecCom()
        } else {
          this.getOneSpec(3)
        }
      } else if (item.contentType=='3') {
        console.log('分类')
        this.getOneClass()
      } else if (item.contentType=='4') {
        console.log('品牌')
        this.getOneBrand()
      } else if (item.contentType=='7') {
        console.log('单品')
        this.getOneGoodsSpecial()
      }
    },
    // 单品专题
    getOneGoodsSpecial(){
      console.log('this.onItem',this.onItem)
      this.$api.oneGoodsSpecial({id:this.onItem.contentValue},res=>{
        if(res.data.res_code==1){
          this.goodsspecialitem = res.data.result
        }else {
          this.$message({
            showClose:true,
            message:'信息获取失败',
            type:'error'
          })
        }
      })
    },
    // 获取某一品牌
    getOneBrand(){
      console.log('获取某一品牌')
      this.$api.brandOne({bid:this.onItem.contentValue},(data)=>{
        console.log(data)
        if (data.data.res_code==1) {
          this.brankitem = data.data.result
        } else {
          this.$message({
            showClose:true,
            message:'品牌信息获取失败',
            type:'error'
          })
        }
      })
    },
    // 获取某一分类
    getOneClass(){
      console.log('获取某一分类')
      this.$api.categoryOne({cid:this.onItem.contentValue},(data)=>{
        console.log(data)
        if (data.data.res_code==1) {
          this.classitem = data.data.result
        } else {
          this.$message({
            showClose:true,
            message:'分类信息获取失败',
            type:'error'
          })
        }
      })
    },
    // 获取会员专题
    getOneSpec(){
      console.log('获取会员专题')
      this.$api.spcialIdInfo({id:this.onItem.contentValue,uiType:2},(data)=>{
        console.log(data)
        if(data.data.res_code==1){
          this.specialitem = {
            tid:data.data.result.id,
            imgUrl:data.data.result.imgUrl,
            title:data.data.result.title
          }
        }else{
          this.$message({
            showClose:true,
            message:'会员专题信息获取失败',
            type:'error'
          })
        }
      })
    },
    // 获取普通专题
    getOneSpecCom(){
      console.log('获取普通专题')
      this.$api.spcialIdInfo({id:this.onItem.contentValue,uiType:1},(data)=>{
        console.log(data)
        if(data.data.res_code==1){
          this.comspecialitem = {
            siid:data.data.result.id,
            specialImg:data.data.result.imgUrl,
            specialName:data.data.result.title
          }
        }else{
          this.$message({
            showClose:true,
            message:'普通专题信息获取失败',
            type:'error'
          })
        }
      })
    },
    // 获取某一商品
    getOneGoods(){
      console.log('获取某一商品',this.onItem)
      this.$api.infoDetail({pid:this.onItem.contentValue},(data)=>{
        console.log('某一商品',data)
        if (data.data.res_code==1) {
          this.goodsitem = data.data.result
        } else {
          this.$message({
            showClose:true,
            message:'商品信息获取失败',
            type:'error'
          })
        }
      })
    },
    // 选择类型
    choosetype(item){
      if(item=='a'){
        this.dialogtitle = '选择商品'
      }else if(item=='b'){
        this.dialogtitle = '选择秒杀商品'
      }else if(item=='c'){
        this.dialogtitle = '选择会员专题'
      }else if(item=='cb'){
        this.dialogtitle = '选择普通专题'
      }else if(item=='d'){
        this.dialogtitle = '选择品牌'
      }else if(item=='e'){
        this.dialogtitle = '选择分类'
      }else if(item=='f'){
        this.dialogtitle = '选择秒杀'
      }else if(item=='g'){
        this.dialogtitle = '选择单品专题'
      }
      this.dialogVisible2 = true
      this.showcom = item
    },
    // 添加内容
    addnewfun(){
      this.dialogVisible = true
      this.changDialogVisible = false
      this.form = {
        state:'1',
        uiType:'1'
      }
      if(!this.showimg){
        this.form.contentType = '1'
      }
      this.imgFile = ""
      this.imgUrl = ""
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
      if (!isLt2M) {
        this.$message({
          message: '注意，图片大小不得大于10M',
          type: 'error'
        })
        return
      }      
      let reads = new FileReader()
      reads.readAsDataURL(headimginp)
      reads.onload = function (e) {
        that.imgFile = headimginp
        that.imgUrl = e.target.result
      }
    },
    // 跳页
    pageChange(item){
      this.postData.pageIndex = item
      this.homeinfoList()
    },
    // 关闭选择页面
    clospageCom(item){
      this.dialogVisible2 = false
    },
    // 关闭当前页面
    closepage(item){
      this.$emit('closepage',item)
    },
  	// 删除数据
  	delAd (item) {
  		console.log('删除数据')
  		console.log(item)
  		let that = this
  		that.$confirm('确定将 '+item.title +' 首页数据下线?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async ()=>{
        	that.$api.homeinfoDel({pid:item.pid}, (data)=>{
	  			console.log(data)
	  			if (data.data.res_code==1) {
	  				that.$message({
	  					showClose:true,
	  					message:'数据下线成功',
	  					type:'success'
	  				})
	  				that.homeinfoList()
	  			} else {
	  				that.$message({
	  					showClose:true,
	  					message:'数据下线失败',
	  					type:'error'
	  				})
	  			}
	  		})
        }).catch(()=>{
        	console.log('取消了确定删除')
        })
  	}
  },
  watch:{
    specialitem(val){
      if(val){
        this.comspecialitem = ""
        this.form.uiType = 2
      }else{
        this.form.uiType = 1
      }
    },
    comspecialitem(val){
      if(val){
        this.specialitem = ""
      }
    }
  },
  computed:{

  }
}
</script>

<style type="text/css" scoped>
.box{
	width: 100%;
	height: 100%;
	background-color: #fff;
}
.box1,.box2{
	width: 100%;
	height: 100%;
}
.imgbox{
	width: 100%;
	height: 100%;
}
.imgbox img{
	max-height: 100%;
	max-width: 100%;
}
</style>
