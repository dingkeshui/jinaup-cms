<template>
  <div class="max pad10">
  	<div class="item flex pad10">
  		<div class="flex1">
  			描述：创建三级分类下的所有默认属性名和属性值
  		</div>
  		<div class="">
  			<el-button size="small" @click="attrNameOption" type="danger">确认</el-button>
  		</div>
  	</div>
    <div class="item flex pad10">
      <div class="flex1">
        描述：初始化产品和分类关系表
      </div>
      <div class="">
        <el-button size="small" @click="classInit" type="danger">确认</el-button>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'initiali',
  data(){
  	return {

  	}
  },
  methods:{
  	attrNameOption(){
  		this.$api.attrNameOption(data=>{
  			console.log('创建三级分类下的所有默认属性名和属性值',data)
  			if(data.data.res_code==1){
  				this.$message({
  					showClose:'true',
  					message:'创建三级分类下的所有默认属性名和属性值成功',
  					type:'success'
  				})
  			}else{
  				this.$message({
  					showClose:'true',
  					message:'创建三级分类下的所有默认属性名和属性值失败',
  					type:'error'
  				})
  			}
  		})
  	},
    classInit(){
      this.$api.classInit(data=>{
        console.log('描述：初始化产品和分类关系表',data)
        if(data.data.res_code==1){
          this.$message({
            showClose:'true',
            message:'初始化产品和分类关系表成功',
            type:'success'
          })
        }else{
          this.$message({
            showClose:'true',
            message:'初始化产品和分类关系表失败',
            type:'error'
          })
        }
      })
    }
  }
}
</script>

<style type="text/css" scoped>
.item{
	margin-bottom: 20px;
	border:1px solid #ccc;
	border-radius: 10px;
}
.item>div{
  line-height: 35px;
  height: 35px;
}
</style>
