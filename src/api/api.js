/*这里是http请求的api*/
import axios from 'axios'
import qs from 'qs'

// api的配置文件
import apiConfig from '../config/apiConfig.js'

// 版本号
const version = apiConfig.version

// 项目使用的url
const url = apiConfig[apiConfig.url]
// 请求默认地址
if(location.href.indexOf('test')>=0){
  axios.defaults.baseURL = 'http://test.oauth.jinaup.com/'
}else{
  axios.defaults.baseURL = url
}
// axios.defaults.baseURL = 'http://192.168.1.173/'
// axios.defaults.timeout = 300000
// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
// axios.defaults.headers['Content-Type'] = 'multipart/form-data'
// 请求携带cookie
axios.defaults.withCredentials=true

//拦截器
// axios.interceptors.response.use(function(response){
//     // 请求成功处理回调
//     console.log('拦截器success',response)
// }, function(error){
//     // 请求失败、错误处理回调
//     console.log('拦截器error',data)
// })

// axios发送get请求
function axiosGet (urlString, cab, data) {
  axios.get(urlString, {
    params: data
  })
  .then(function (response) {
    cab(response)
  })
  .catch(function (error) {
    cab(error)
  });
}

// 处理data中含有数组的情况
function getArr (data) {
  let str = ""
  for (let i in data) {
    if(data[i] instanceof Array){
      if(str.indexOf('?')<0){
        str += "?"
      }
      for(let k in data[i]){
        str += i+'='+data[i][k]
        if(k != data[i].length-1){
          str += "&"
        }
      }
      delete data[i]
    }
  }
  return [data,str]
}

// axios发送post请求
function axiosPost (urlString, data, cab, config) {
  let postdata;
  if(config == "file"){
    // 说明上传的是formdata格式
    postdata=data
  }else{
    let newdata=getArr(data)
    urlString += newdata[1]
    postdata = qs.stringify(newdata[0])
  }
  axios.post(urlString, postdata)
  .then(function (response) {
  	console.log('post success')
    cab(response)
  })
  .catch(function (error) {
  	console.log('post error')
    console.log(error)
    cab(error)
  });
}
function axiosPost2 (urlString, data, cab, config) {
  axios.defaults.baseURL = 'http://192.168.110.55/'
  let postdata;
  if(config == "file"){
    // 说明上传的是formdata格式
    postdata=data
  }else{
    let newdata=getArr(data)
    urlString += newdata[1]
    postdata = qs.stringify(newdata[0])
  }
  axios.post(urlString, postdata)
  .then(function (response) {
    console.log('post success')
    cab(response)
  })
  .catch(function (error) {
    console.log('post error')
    console.log(error)
    cab(error)
  });
}


// axios发送文件下载
function axiosFileDown(urlString,data){
 return axios({method: 'post',url:urlString,params:data,responseType:'blob'})
}

// get请求
// 登陆时获取sessionid的get请求
function getSessionId (data, cab) {
	if (cab) {
		axiosGet('getSession', cab, data)
	} else {
		axiosGet('getSession', data)
	}
}
// 退出
function loginOut (cb) {
	axiosGet('oauth/loginout',cb)
}

// post请求
/**
*权限管理
*/
// 登陆成功后跳home页面根据track获取数据
function getToken (data, cab) {
	axiosPost('oauth/getToken', data, cab, true)
}
// 新增权限
function addAuth (data, cab) {
  axiosPost('api/open/cms/auth/add', data, cab)
}
// 删除权限
function delAuth (data, cab) {
  axiosPost('api/open/cms/auth/del', data, cab)
}
// 查询权限信息
function getListAuth (data, cab) {
  axiosPost('api/open/cms/auth/list', data, cab)
}
// 修改权限信息
function upDataAuth (data, cab) {
  axiosPost('api/open/cms/auth/update', data, cab)
}
// 新增角色
function addRole (data, cab) {
  axiosPost('api/open/cms/role/add', data, cab)
}
// 新增或删除角色权限信息
function changeRole (data, cab) {
  axiosPost('api/open/cms/role/auth/change', data, cab)
}
// 查询角色权限信息
function getAuthRole (data, cab) {
  axiosPost('api/open/cms/role/auth/list', data, cab)
}
// 查询角色权限信息树状图
function getAuthRoleAll (data, cab) {
  axiosPost('api/open/cms/role/auth/all', data, cab)
}
// 删除角色
function delRole (data, cab) {
  axiosPost('api/open/cms/role/del', data, cab)
}
// 查询角色信息
function getRoleList (data, cab) {
  axiosPost('api/open/cms/role/list', data, cab)
}
// 修改角色信息
function upDataRole (data, cab) {
  axiosPost('api/open/cms/role/update', data, cab)
}
// 新增用户
function addUser (data, cab) {
  axiosPost('api/open/cms/user/add', data, cab)
}
// 删除用户
function delUser (data, cab) {
  axiosPost('api/open/cms/user/del', data, cab)
}
// 查询用户信息
function getUser (data, cab) {
  axiosPost('api/open/cms/user/list', data, cab)
}
// 修改用户信息
function upDataUser (data, cab) {
  axiosPost('api/open/cms/user/update', data, cab)
}
/**
*产品api
**/
// 品牌增加
function brandAdd (data, cab) {
  axiosPost('api/open/brand/add', data, cab, 'file')
}
// 品牌删除
function brandDel (data, cab) {
  axiosPost('api/open/brand/del', data, cab)
}
// 品牌列表
function brandList (data, cab) {
  axiosPost('api/open/brand/list', data, cab)
}
// 单个品牌列表
function brandOne (data, cab) {
  axiosPost('api/open/brand/selectOne', data, cab)
}
// 品牌更新
function brandUpdate (data, cab) {
  axiosPost('api/open/brand/update', data, cab,'file')
}
// 分类添加
function categoryAdd (data, cab) {
  axiosPost('api/open/category/add', data, cab, 'file')
}
// 分类删除
function categoryDel (data, cab) {
  axiosPost('api/open/category/del', data, cab)
}
// 分类列表
function categoryList (data, cab) {
  axiosPost('api/open/category/list', data, cab)
}
// 单个分类列表
function categoryOne (data, cab) {
  axiosPost('api/open/category/selectOne', data, cab)
}
// 分类更新
function categoryUpdata (data, isFile, cab) {
  if(isFile){
    axiosPost('api/open/category/update', data, cab, 'file')
  } else {
    axiosPost('api/open/category/update', data, cab)
  }

}
// 首页数据添加
function pageHomeAdd(data,cab){
  axiosPost('api/open/page/home/add', data, cab, 'file')
}
// 首页数据删除
function pageHomeDel(data,cab){
  axiosPost('api/open/page/home/del', data, cab)
}
// 首页数据列表
function pageHomeList(data,cab){
  axiosPost('api/open/page/home/list', data, cab)
}
// 首页数据更新
function pageHomeUpdata(data, isFile, cab){
  if (isFile) {
    axiosPost('api/open/page/home/update', data, cab, 'file')
  } else{
    axiosPost('api/open/page/home/update', data, cab)
  }

}
// 银行信息添加
function banckInfoAdd (data,cab) {
  axiosPost('api/open/banck/info/add', data, cab, 'file')
}
// 银行信息删除
function banckInfoDel (data,cab) {
  axiosPost('api/open/banck/info/del', data, cab)
}
// 银行信息列表
function banckInfoList (data,cab) {
  axiosPost('api/open/banck/info/list', data, cab)
}
// 银行信息更新
function banckInfoUpdata (data, isFile, cab) {
  if (isFile) {
    axiosPost('api/open/banck/info/update', data, cab, 'file')
  } else {
    axiosPost('api/open/banck/info/update', data, cab)
  }
}
// 分类下的基础属性添加
function baseAttrNameAdd (data,cab) {
  axiosPost('api/open/base/product/attribute/name/add', data, cab)
}
// 分类下的基础属性删除
function baseAttrNameDel (data,cab) {
  axiosPost('api/open/base/product/attribute/name/del', data, cab)
}
// 分类下的基础属性列表
function baseAttrNameList (data,cab) {
  axiosPost('api/open/base/product/attribute/name/list', data, cab)
}
// 分类下的基础属性更新
function baseAttrNameUpdata (data,cab) {
  axiosPost('api/open/base/product/attribute/name/update', data, cab)
}
// 分类下的基础属性名及属性值列表
function baseAttrNameAll (data,cab) {
  axiosPost('api/open/base/product/attribute/name/all', data, cab)
}
// 分类下的基础属性值增加
function baseAttrValueAdd(data,cab) {
  axiosPost('api/open/base/product/attribute/value/add', data, cab)
}
// 分类下的基础属性值删除
function baseAttrValueDel (data,cab) {
  axiosPost('api/open/base/product/attribute/value/del', data, cab)
}
// 分类下的基础属性值列表
function baseAttrValueList (data,cab) {
  axiosPost('api/open/base/product/attribute/value/list', data, cab)
}
// 分类下的基础属性值更新
function baseAttrValueUpdata (data,cab) {
  axiosPost('api/open/base/product/attribute/value/update', data, cab)
}
// 产品标准库增加
function productInfoAdd (data, cab) {
  axiosPost('api/open/base/product/info/add', data, cab, 'file')
}
// 产品标准库删除
function productInfoDel (data, cab) {
  axiosPost('api/open/base/product/info/del', data, cab)
}
// 产品标准库列表
function productInfoList (data, cab) {
  axiosPost('api/open/base/product/info/list', data, cab)
}
// 产品标准库更新
function productInfoUpdata (data, isFile, cab) {
  if (isFile) {
    axiosPost('api/open/base/product/info/update', data, cab, 'file')
  } else {
    axiosPost('api/open/base/product/info/update', data, cab)
  }
}
// 产品标准库头图和详情图增加
function productPictureAdd (data, cab){
  axiosPost('api/open/base/product/picture/add', data, cab, 'file')
}
// 产品标准库头图和详情图删除
function productPictureDel (data, cab){
  axiosPost('api/open/base/product/picture/del', data, cab)
}
// 产品标准库头图和详情图列表
function productPictureList(data, cab){
  axiosPost('api/open/base/product/picture/list', data, cab)
}
// 分类税率增加
function productTaxAdd (data, cab){
  axiosPost('api/open/base/product/tax/add', data, cab)
}
// 分类税率列表
function productTaxList (data, cab){
  axiosPost('api/open/base/product/tax/list', data, cab)
}
// 分类税率更新
function productTaxUpdata (data, cab){
  axiosPost('api/open/base/product/tax/update', data, cab)
}
// 商学院信息增加
function collegeAdd (data, cab) {
  axiosPost('api/open/business/college/info/add', data, cab)
}
// 商学院信息删除
function collegeDel (data, cab) {
  axiosPost('api/open/business/college/info/del', data, cab)
}
// 商学院信息列表
function collegeList (data, cab) {
  axiosPost('api/open/business/college/info/list', data, cab)
}
// 商学院信息更新
function collegeUpdata (data, cab) {
  axiosPost('api/open/business/college/info/update', data, cab)
}
// 优惠券信息增加
function couponAdd (data, cab) {
  axiosPost('api/open/coupon/info/add', data, cab)
}
// 优惠券信息删除
function couponDel (data, cab) {
  axiosPost('api/open/coupon/info/del', data, cab)
}
// 优惠券信息列表
function couponList (data, cab) {
  axiosPost('api/open/coupon/info/list', data, cab)
}
// 帮助页增加
function helpAdd (data, cab) {
  axiosPost('api/open/help/info/add', data, cab)
}
// 帮助页删除
function helpDel (data, cab) {
  axiosPost('api/open/help/info/del', data, cab)
}
// 帮助页列表
function helpList (data, cab) {
  axiosPost('api/open/help/info/list', data, cab)
}
// 帮助页修改
function helpUpdata (data, cab) {
  axiosPost('api/open/help/info/update', data, cab)
}
// 区域增加
function htAdd (data, cab) {
  axiosPost('api/open/ht/location/add', data, cab)
}
// 区域删除
function htDel (data, cab) {
  axiosPost('api/open/ht/location/del', data, cab)
}
// 区域列表
function htList (data, cab) {
  axiosPost('api/open/ht/location/list', data, cab)
}
// 区域更新
function htUpdata (data, cab) {
  axiosPost('api/open/ht/location/update', data, cab)
}
// 首页广告增加
function homeadAdd (data, cab) {
  axiosPost('api/open/page/home/ad/add', data, cab, 'file')
}
// 首页广告删除
function homeadDel (data, cab) {
  axiosPost('api/open/page/home/ad/del', data, cab)
}
// 首页广告列表
function homeadList (data, cab) {
  axiosPost('api/open/page/home/ad/list', data, cab)
}
// 首页广告更新
function homeadUpdata (data, isFile, cab) {
  if(isFile){
    axiosPost('api/open/page/home/ad/update', data, cab, 'file')
  }else{
    axiosPost('api/open/page/home/ad/update', data, cab)
  }
}
// 首页元素增加
function homeinfoAdd (data, cab) {
  axiosPost('api/open/page/home/info/add', data, cab, 'file')
}
// 首页元素删除
function homeinfoDel (data, cab) {
  axiosPost('api/open/page/home/info/del', data, cab)
}
// 首页元素列表
function homeinfoList (data, cab) {
  axiosPost('api/open/page/home/info/list', data, cab)
}
// 首页元素更新
function homeinfoUpdata (data, cab) {
  axiosPost('api/open/page/home/info/update', data, cab, 'file')
}
// 首页产品增加
function homeproductAdd (data, cab) {
  axiosPost('api/open/page/home/product/add', data, cab)
}
// 首页产品删除
function homeproductDel (data, cab) {
  axiosPost('api/open/page/home/product/del', data, cab)
}
// 首页产品列表
function homeproductList (data, cab) {
  axiosPost('api/open/page/home/product/list', data, cab)
}
// 首页产品更新
function homeproductUpdata (data, cab) {
  axiosPost('api/open/page/home/product/update', data, cab)
}
// 分类产品关系增加
function relationAdd (data, cab) {
  axiosPost('api/open/product/category/relation/add', data, cab)
}
// 分类产品关系删除
function relationDel (data, cab) {
  axiosPost('api/open/product/category/relation/del', data, cab)
}
// 分类产品关系更新
function relationUpdata (data, cab) {
  axiosPost('api/open/product/category/relation/update', data, cab)
}
// 分类产品关系列表
function relationList (data, cab) {
  axiosPost('api/open/product/category/relation/list', data, cab)
}
// 产品评论列表
function commentsList (data, cab) {
  axiosPost('api/open/product/comments/list', data, cab)
}
// 产品列表
function infoList (data, cab) {
  axiosPost('api/open/product/info/list', data, cab)
}
// 产品详细列表
function infoDetail (data, cab) {
  axiosPost('api/open/product/info/detail', data, cab)
}
// 审核供货商产品信息
function infoReview (data, cab) {
  axiosPost('api/open/product/info/review', data, cab)
}
// 更改产品信息
function infoUpdata (data, isFile,cab) {
  if(isFile){
    axiosPost('api/open/product/info/update', data,cab,'file')
  }else{
    axiosPost('api/open/product/info/update', data,cab)
  }
}
// 店铺产品图片删除
function picDel (data, cab) {
  axiosPost('api/open/product/picture/del', data, cab)
}
// 店铺产品图片列表
function picList (data, cab) {
  axiosPost('api/open/product/picture/list', data, cab)
}
// 秒杀商品列表
function seckillGoodsList(data,cab){
  axiosPost('api/open/product/seckill/info/list', data, cab)
}
// 删除秒杀商品
function seckillGoodsDel(data,cab){
  axiosPost('api/open/product/seckill/info/del', data, cab)
}
// 秒杀商品排序
function seckillGoodsSort(data,cab){
  axiosPost('api/open/product/seckill/info/sort', data, cab)
}
// 秒杀sku属性增加
function seckillAdd (data, cab) {
  axiosPost('api/open/product/seckill/sku/info/add', data, cab)
}
// 秒杀sku属性删除
function seckillDel (data, cab) {
  axiosPost('api/open/product/seckill/sku/info/del', data, cab)
}
// 秒杀sku属性列表
function seckillList (data, cab) {
  axiosPost('api/open/product/seckill/sku/info/list', data, cab)
}
// 秒杀sku属性更新
function seckillUpdata (data, cab) {
  axiosPost('api/open/product/seckill/sku/info/update', data, cab)
}
// 产品sku删除
function skuDel (data, cab) {
  axiosPost('api/open/product/sku/del', data, cab)
}
// 产品sku列表
function skuList (data, cab) {
  axiosPost('api/open/product/sku/list', data, cab)
}
// 产品sku更新
function skuUpdata (data, cab) {
  axiosPost('api/open/product/sku/updata', data, cab)
}
// 会员专题增加
function topicAdd (data, cab) {
  axiosPost('api/open/topic/info/add', data, cab, 'file')
}
// 专题富文本编辑器内的图片增加
function topicHtmlImgAdd (data, cab) {
  axiosPost('api/open/topic/info/addHtmlImg', data, cab)
}
// 会员专题删除
function topicDel (data, cab) {
  axiosPost('api/open/topic/info/del', data, cab)
}
// 会员专题更新
function topicUpdata (data, isFile, cab) {
  if(isFile){
    axiosPost('api/open/topic/info/update', data, cab,'file')
  }else{
    axiosPost('api/open/topic/info/update', data, cab)
  }

}
// 会员专题ID查询
function spcialIdInfo(data,cab){
  axiosPost('api/open/topic/info/queryTopic',data,cab)
}
// 会员专题列表
function topicList (data, cab) {
  axiosPost('api/open/topic/info/list', data, cab)
}
// 会员专题产品增加
function topicProAdd (data, cab) {
  axiosPost('api/open/topic/product/relation/add', data, cab)
}
// 会员专题产品更新
function topicProUpdata (data, cab) {
  axiosPost('api/open/topic/product/relation/update', data, cab)
}
// 会员专题产品删除
function topicProDel (data, cab) {
  axiosPost('api/open/topic/product/relation/del', data, cab)
}
// 会员专题产品列表
function topicProList (data, cab) {
  axiosPost('api/open/topic/product/relation/list', data, cab)
}
// 普通专题增加
function spcialAdd(data, cab) {
  axiosPost('api/open/special/info/add', data, cab, 'file')
}
// 普通专题列表
function  spcialList(data, cab) {
  axiosPost('api/open/special/info/list', data, cab)
}
// 普通专题删除
function  spcialDel(data, cab) {
  axiosPost('api/open/special/info/del', data, cab)
}
// 普通专题更新
function  spcialUp(data, isFile, cab) {
  if(isFile){
    axiosPost('api/open/special/info/update', data, cab, 'file')
  }else{
    axiosPost('api/open/special/info/update', data, cab)
  }
}
// 普通专题描点增加
function  spcialAnAdd(data, cab) {
  axiosPost('api/open/special/anchor/add', data, cab)
}
// 普通专题描点列表
function  spcialAnList(data, cab) {
  axiosPost('api/open/special/anchor/list', data, cab)
}
// 普通专题描点删除
function  spcialAnDel(data, cab) {
  axiosPost('api/open/special/anchor/del', data, cab)
}
// 普通专题描点更新
function  spcialAnUp(data, cab) {
  axiosPost('api/open/special/anchor/update', data, cab)
}
// 普通专题描点详情
function  spcialAnDetail(data, cab) {
  axiosPost('api/open/special/anchor/detail', data, cab)
}
// 首页精选数据增加
function homeChoiceAdd(data,cab){
  axiosPost('api/open/page/home/choice/add',data,cab)
}
// 首页精选数据删除
function homeChoiceDel(data,cab){
  axiosPost('api/open/page/home/choice/del',data,cab)
}
// 首页精选数据列表
function homeChoiceList(data,cab){
  axiosPost('api/open/page/home/choice/list',data,cab)
}
// 首页精选数据更新
function homeChoiceUp(data,cab){
  axiosPost('api/open/page/home/choice/update',data,cab)
}
// 创建三级分类下的的所有默认属性名和属性值
function attrNameOption(cab){
  axiosPost('api/open/base/product/attribute/name/defaultCategorySpecification','',cab)
}
// 考拉品牌关系列表
function kaolaBrandList(data,cab){
  axiosPost('api/open/kaola/brand/list',data,cab)
}
// 考拉品牌关系更新
function kaolaBrandUp(data,cab){
  axiosPost('api/open/kaola/brand/update',data,cab)
}
// 考拉分类关系列表
function kaolaClassList(data,cab){
  axiosPost('api/open/kaola/category/list',data,cab)
}
// 考拉分类关系更新
function kaolaClassUp(data,cab){
  axiosPost('api/open/kaola/category/update',data,cab)
}
// 考拉分类关系更新
function getKaoLaImgUp(data,cab){
  axiosPost('api/open/kaola/retry/pull/pic',data,cab)
}
// 导出订单
function downOrder(data){
  return axiosFileDown('api/open/order/report/export',data)
}
// 财务订单导出
function financeDownOrder(data){
  return axiosFileDown('api/open/order/report/financeExport',data)
}
// 导出产品
function downGoods(data){
  return axiosFileDown('api/open/product/report/export',data)
}
// 导出下线商品
function downOfflineGoods(data){
  return axiosFileDown('/api/open/product/report/exportOfflineSku',data)
}
// 导出产品sku
function downGoodsSku(data){
  return axiosFileDown('api/open/product/report/exportSku',data)
}
// 批量导入产品sku
function upSkuFile (data,cab) {
  axiosPost('api/open/product/report/batchProductSku', data, cab,'file')
}
// 初始化产品和分类关系
function classInit (cab) {
  axiosPost('api/open/product/category/relation/init', '', cab)
}
// 更新产品图片
function changeGoodsImg (data,cab) {
  axiosPost('api/open/product/picture/updatePicture', data, cab,'file')
}
//分类销售额列表导出
function classOrderExport(data){
  return axiosFileDown('api/open/category/order/export',data)
}
//分类销售额列表
function classOrderList(data,cab){
  axiosPost('api/open/category/order/list',data,cab)
}
//每日佣金分配列表导出
function commissionDistributionExport(data){
  return axiosFileDown('api/open/commission/distribution/export',data)
}
//每日佣金分配列表
function commissionDistributionList(data,cab){
  axiosPost('api/open/commission/distribution/list',data,cab)
}
//日销售额列表导出
function dailySalesExport(data){
  return axiosFileDown('api/open/daily/sales/export',data)
}
//日销售额列表
function dailySalesList(data,cab){
  axiosPost('api/open/daily/sales/list',data,cab)
}
// 平台补贴运费
function subsidyFreight(data,cab) {
  axiosPost('api/open/order/item/info/update',data,cab)
}
// 描点导入商品
function batchSpecialAnchorProduct(data,cab) {
  axiosPost('api/open/product/report/batchSpecialAnchorProduct',data,cab,'file')
}
// 退款订单导出
function downOrderRefund (data) {
  return axiosFileDown('api/open/order/report/orderRefundExport',data)
}
// 自订单修改收货地址
function updateConsignee (data,cab) {
  axiosPost('api/open/order/item/info/updateConsignee',data,cab)
}
// 商品专题
function goodsSpecialList(data,cab) {
  axiosPost('api/open/product/single/select/list',data,cab)
}
// 商品专题查询
function oneGoodsSpecial(data,cab) {
  axiosPost('api/open/product/single/select/singlet',data,cab)
}
// 品牌导出
function downBrank (data) {
  return axiosFileDown('api/open/brand/exportBrand',data)
}
// 品牌导入
function upBrankFile (data,cab) {
  axiosPost('api/open/brand/batchAddBrandInfo', data, cab,'file')
}
// 品牌批量修改
function upBrank (data,cab) {
  axiosPost('api/open/brand/batchUpdateBrandInfo', data, cab,'file')
}

/**
*枚举api
*/
// 地址标签
function getAddressTag (cab){
  axiosGet('api/open/enums/address/tag', cab)
}
// 佣金类型
function getCommissionType (cab) {
  axiosGet('api/open/enums/commission/type', cab)
}
// 首页模块内容类型
function getContentType (cab) {
  axiosGet('api/open/enums/content/type', cab)
}
// 优惠券类型
function getCouponType (cab) {
  axiosGet('api/open/enums/coupon/type', cab)
}
// 帮助信息
function getHelpInfo (cab) {
  axiosGet('api/open/enums/help/info', cab)
}
// 图片目录
function getImageCatalog (cab) {
  axiosGet('api/open/enums/image/catalog', cab)
}
// 路由消息
function getMqTag (cab) {
  axiosGet('api/open/enums/mq/tag', cab)
}
// 首页模板
function getPageHome (cab) {
  axiosGet('api/open/enums/page/home', cab)
}
// 支付渠道
function getPayChannel (cab) {
  axiosGet('api/open/enums/pay/channel', cab)
}
// 平台
function getPlatform (cab) {
  axiosGet('api/open/enums/platform', cab)
}
// 产品类型
function getProductType (cab) {
  axiosGet('api/open/enums/product/type', cab)
}
// 税率单位
function getTaxUnit (cab) {
  axiosGet('api/open/enums/tax/unit', cab)
}
/**
*用户api
*/
// 用户收货地址列表
function getUserAdressList (data,cab) {
  axiosPost('api/open/user/address/list', data, cab)
}
// 用户体现申请列表
function getUserCashList (data,cab) {
  axiosPost('api/open/user/apply/cash/list', data, cab)
}
// 支付体现
function getUserCashPayWith (data,cab) {
  axiosPost('api/open/user/apply/cash/payWithdrawal', data, cab)
}
// 更新手续费和个人所得税
function getUserCashUpdata (data,cab) {
  axiosPost('api/open/user/apply/cash/update', data, cab)
}
// 更新提现状态
function getUserCashUpdataState (data,cab) {
  axiosPost('api/open/user/apply/cash/updateState', data, cab)
}
// 用户认证信息列表
function getUserAuthInfoList (data,cab) {
  axiosPost('api/open/user/auth/info/list', data, cab)
}
// 用户认证信息更新
function getUserAuthInfoUpdata (data,cab) {
  axiosPost('api/open/user/auth/info/update', data, cab)
}
// 用户收藏列表
function getUserCollectionList (data,cab) {
  axiosPost('api/open/user/collection/list', data, cab)
}
// 用户优惠券列表
function getUserCouponInfoList (data,cab) {
  axiosPost('api/open/user/coupon/info/list', data, cab)
}
// 用余额变更列表
function getUserExchangeList (data,cab) {
  axiosPost('api/open/user/exchange/balance/log/list', data, cab)
}
// 用户上级关系数据列表
function getUserHierarchyList (data,cab) {
  axiosPost('api/open/user/hierarchy/relation/list', data, cab)
}
// 用户实际收益列表
function getUserIncomeList (data,cab) {
  axiosPost('api/open/user/income/actual/list', data, cab)
}
// 用户估计收益列表
function getUserEstimateList (data,cab) {
  axiosPost('api/open/user/income/estimate/list', data, cab)
}
// 用户封禁
function userDel (data,cab) {
  axiosPost('api/open/user/info/del', data, cab)
}
// 用户列表
function userList (data,cab) {
  axiosPost('api/open/user/info/list', data, cab)
}
// 单个用户信息
function userSelect (data,cab) {
  axiosPost('api/open/user/info/select', data, cab)
}
// 用户购买力排行
function userPowerList (data,cab) {
  axiosPost('api/open/user/purchasing/power/list', data, cab)
}
// 推荐人增加
function userRecommenderAdd (data,cab) {
  axiosPost('api/open/user/recommender/add', data, cab)
}
// 推荐人删除
function userRecommenderDel (data,cab) {
  axiosPost('api/open/user/recommender/del', data, cab)
}
// 推荐人列表
function userRecommenderList (data,cab) {
  axiosPost('api/open/user/recommender/list', data, cab)
}
// 推荐人更新
function userRecommenderUpdata (data,cab) {
  axiosPost('api/open/user/recommender/update', data, cab)
}
// 店铺信息列表
function userStoreList (data,cab) {
  axiosPost('api/open/user/store/info/list', data, cab)
}
// 店铺信息更新
function userStoreUpdata (data,cab) {
  axiosPost('api/open/user/store/info/update', data, cab)
}
// 供应商信息列表
function userSupplierList (data,cab) {
  axiosPost('api/open/user/supplier/info/list', data, cab)
}
// 用户团队信息列表
function userTeamList (data,cab) {
  axiosPost('api/open/user/team/info/list', data, cab)
}
// 用户升级规则列表
function userUpgradeList (data,cab) {
  axiosPost('api/open/user/upgrade/rule/list', data, cab)
}
// 用户升级规则删除
function userUpgradeDel (data,cab) {
  axiosPost('api/open/user/upgrade/rule/del', data, cab)
}
// 用户升级规则更新
function userUpgradeUpdata (data,cab) {
  axiosPost('api/open/user/upgrade/rule/updata', data, cab)
}
// 用户升级规则增加
function userUpgradeAdd (data,cab) {
  axiosPost('api/open/user/upgrade/rule/add', data, cab)
}
// 供货商增加
function supplierAdd(data,cab){
  axiosPost('api/open/user/supplier/info/add', data, cab, 'file')
}
// 供货商更新密码
function supplierPwd(data,cab){
  axiosPost('api/open/user/supplier/info/resetPwd', data, cab)
}
// 供货商列表
function supplierList(data,cab){
  axiosPost('api/open/user/supplier/info/list', data, cab)
}
// 供货商更新
function supplierUpdate(data, isFile, cab){
  if(isFile){
    axiosPost('api/open/user/supplier/info/update', data, cab, 'file')
  }else{
    axiosPost('api/open/user/supplier/info/update', data, cab)
  }
}
// 新增权限
function supAuthAdd(data, cab) {
  axiosPost('api/open/user/supplier/authority/add', data, cab)
}
// 删除权限
function supAuthDel(data, cab) {
  axiosPost('api/open/user/supplier/authority/del', data, cab)
}
// 查询权限信息
function supAuthList(data, cab) {
  axiosPost('api/open/user/supplier/authority/list', data, cab)
}
// 修改权信息限
function supAuthUpdate(data, cab) {
  axiosPost('api/open/user/supplier/authority/update', data, cab)
}
// 新增角色
function supRoleAdd(data, cab) {
  axiosPost('api/open/user/supplier/role/add', data, cab)
}
// 删除角色
function supRoleDel(data, cab) {
  axiosPost('api/open/user/supplier/role/del', data, cab)
}
// 查询角色信息
function supRoleList(data, cab) {
  axiosPost('api/open/user/supplier/role/list', data, cab)
}
// 修改角色信息
function supRoleUpdate(data, cab) {
  axiosPost('api/open/user/supplier/role/update', data, cab)
}
// 查询角色权限
function supRoleAuthList(data, cab) {
  axiosPost('api/open/user/supplier/role/authority/list', data, cab)
}
// 新增或删除角色权限
function supRoleAuthChange(data, cab) {
  axiosPost('api/open/user/supplier/role/authority/change', data, cab)
}
// 海报增加
function posterAdd (data,cab) {
  axiosPost('api/open/user/poster/add',data,cab,'file')
}
// 海报列表
function posterList (data,cab) {
  axiosPost('api/open/user/poster/list',data,cab)
}
// 海报修改
function posterUp (data,cab) {
  axiosPost('api/open/user/poster/update',data,cab,'file')
}
// 工猫支付体现
function payWithdrawal(data,cab) {
  axiosPost('api/open/user/apply/cash/payWithdrawal',data,cab)
}
// 更新工猫手续费和个人手续费
function cashUp(data,cab) {
  axiosPost('api/open/user/apply/cash/update',data,cab)
}
// 给用户发券
function couponToUser(data,cab){
  axiosPost('api/open/user/coupon/info/couponToUser',data,cab)
}
// 修改用户为会员
function changeUserMenber(data,cab){
  axiosPost('api/open/user/info/editUserType',data,cab)
}
// 修改用户等级
function changeUserLevel(data,cab){
  axiosPost('api/open/user/info/editUserLevel',data,cab)
}
// 修改用户上级
function changeUserPar(data,cab){
  axiosPost('api/open/user/info/editUserParent',data,cab)
}
// 查询单个用户直属下级用户
function userSelectSub(data,cab){
  axiosPost('/api/open/user/info/selectSub',data,cab)
}
// 查询单个用户上级用户
function userSelectParent(data,cab){
  axiosPost('/api/open/user/info/selectParent',data,cab)
}
// 导出用户团队所有成员
function getUserTeam(data){
  return axiosFileDown('api/open/order/report/exportAllUserSub',data)
}
// 添加新用户优惠券
function addNewUserCoupon(data,cab){
  axiosPost('api/open/user/limited/time/coupon/add',data,cab)
}
// 新用户优惠券列表
function newUserCouponList(data,cab){
  axiosPost('api/open/user/limited/time/coupon/list',data,cab)
}
// 修改新用户优惠券
function changeNewUserCoupon(data,cab){
  axiosPost('api/open/user/limited/time/coupon/update',data,cab)
}
// 用户团队统计表
function userTeamInfoList(data,cab){
  axiosPost('api/open/user/team/statistics/list',data,cab)
}
// 用户团队统计导出表
function userTeamInfoDown(data){
  return axiosFileDown('api/open/user/team/statistics/exportList',data)
}
// 财务导出跑任务
function orderReportTaskFinanceExport(data,cab){
  axiosPost('api/open/order/report/taskFinanceExport',data,cab)
}
// 财务导出列表
function reportDownLoadList(data,cab){
  axiosPost('api/open/report/download/list',data,cab)
}
// 招商报名信息列表
function investmentRegistrationList(data,cab){
  axiosPost('/api/open/investment/registration/list',data,cab)
}
// app进审核
function appInitList(data,cab){
  axiosPost('/api/open/app/update/version/list',data,cab)
}
// 更新app升级
function appInitUp(data,cab){
  axiosPost('/api/open/app/update/version/update',data,cab)
}
// 小B服务商报名列表
function bServiceList(data,cab){
  axiosPost('/api/open/investment/registration/select/list',data,cab)
}
// 审核服务商小b
function bServiceUp(data,cab){
  axiosPost('/api/open/investment/registration/review',data,cab)
}


/**
*订单API
*/
// 订单分佣列表
function orderCommissionList (data,cab) {
  axiosPost('api/open/order/commission/list', data, cab)
}
// 主订单列表
function orderInfoList (data,cab) {
  axiosPost('api/open/order/info/list', data, cab)
}
// 子订单列表
function orderItemInfoList (data,cab) {
  axiosPost('api/open/order/item/info/list', data, cab)
}
// 商品订单列表
function orderItemProductList (data,cab) {
  axiosPost('api/open/order/item/product/info/list', data, cab)
}
// 退款订单列表
function orderRefundList (data,cab) {
  axiosPost('api/open/order/refund/list', data, cab)
}
// 退款订单详情
function orderRefundOne (data,cab) {
  axiosPost('api/open/order/refund/selectOne', data, cab)
}
// 确认退款
function sureRefund (data,cab) {
  axiosPost('api/open/order/item/product/info/sellerRefund', data, cab)
}
// 操作退款申请
function sureOrderRefund (data,cab) {
  axiosPost('api/open/order/item/product/info/sellerRefundOperate', data, cab)
}
// 会员商品退款申请
function sureApplyOrderRefund (data,cab) {
  axiosPost('api/open/order/refund/apply', data, cab)
}
// 工猫提现申请列表导出
function gmOrderDown (data) {
  return axiosFileDown('api/open/order/report/exportUserApplyCash', data)
}
// 区域
function adressByPid (data,cab) {
  axiosPost('/api/open/ht/location/listAll', data, cab)
}
// 批量导出产品pid
function weiniExportWeiniPid (data,cab) {
  return axiosFileDown('api/open/weini/exportWeiniPid', data)
}
// 批量导入数据进行唯妮product的品类，品牌的更新
function weiniImportWeiniBidCidData(data,cab){
  axiosPost('api/open/weini/importWeiniBidCidData', data, cab,'file')
}

/* 小B管理 */
// 小B店铺管理
function bShopList (data,cab) {
  axiosPost('api/open/store/list', data, cab)
}
// 城市区域
function bCityList (data,cab) {
  axiosPost('api/open/store/query/city', data, cab)
}
// 区列表
function bAreaList (data,cab) {
  axiosPost('api/open/store/query/citycode', data, cab)
}
// 审核
function bShopAudit (data,cab) {
  axiosPost('api/open/store/audit', data, cab)
}
// 编辑店铺图片
function bShopImgChange (data,cab) {
  axiosPost('api/open/store/editImage', data, cab,'file')
}
// 获取店铺
function getBshopInfo (data,cab) {
  axiosPost('api/open/store/info', data, cab)
}
// 订单列表
function bOrderList (data,cab) {
  axiosPost('api/open/microOorder/list', data, cab)
}
// 导出订单
function downBOrder(data){
  return axiosFileDown('api/open/microOorder/export',data)
}
// 分类销售额列表导出
function statCategoryExport(data){
  return axiosFileDown('api/open/order/product/stat/categoryExport',data)
}
// 销售额列表导出
function statSalesExport(data){
  return axiosFileDown('api/open/order/product/stat/salesExport',data)
}
// 订单详情
function bOrderInfo(data,cab){
  axiosPost('api/open/microOorder/info', data, cab)
}
// 商品列表
function bGoodsList(data,cab){
  axiosPost('api/open/product/micro/query/list', data, cab)
}
// 商品详情
function bGoodsInfo(data,cab){
  axiosPost('api/open/product/micro/query/detail', data, cab)
}
// 商品审核
function bGoodsCheck(data,cab){
  axiosPost('api/open/product/micro/update/check', data, cab)
}
// 商品上下架
function bGoodsUpdate(data,cab){
  axiosPost('api/open/product/micro/update/goods', data, cab)
}
// 获取服务商列表
function getServiceProvider(data,cab){
  axiosPost('api/open/serviceProvider/list', data, cab)
}
// 获取服务商详情
function getServiceProviderInfo(data,cab){
  axiosPost('api/open/serviceProvider/info', data, cab)
}
// 取消服务商
function removeServiceProvider(data,cab){
  axiosPost('api/open/serviceProvider/cancel', data, cab)
}
// 添加服务商
function addServiceProvider (data,cab) {
  axiosPost('api/open/user/info/editUserServiceType', data, cab)
}
// 服务商关联店铺
function addServiceProviderShop(data,cab){
  axiosPost('api/open/serviceProvider/relationStore', data, cab)
}
// 服务商取消关联店铺
function removeServiceProviderShop(data,cab){
  axiosPost('api/open/serviceProvider/cancelStoreServiceProvider', data, cab)
}
// 服务商可以关联店铺列表
function serviceProviderShopList(data,cab){
  axiosPost('api/open/serviceProvider/storelist', data, cab)
}
// 商品目录列表
function bClassList(data,cab){
  axiosPost('api/open/product/micro/category/query/list', data, cab)
}
// 商品目录详情
function bClassDetail(data,cab){
  axiosPost('api/open/product/micro/category/query/detail', data, cab)
}
// 商品目录添加
function bClassAdd(data,cab){
  axiosPost('api/open/product/micro/category/insert', data, cab,'file')
}
// 商品目录更新
function bClassUp(data,cab){
  axiosPost('api/open/product/micro/category/update', data, cab,'file')
}
// 小b结算账户详情
function bIncomeDetail(data,cab){
  axiosPost('api/open/income/bankCard/query/detail', data, cab)
}
// 导出小B结算列表
function downBIncomeList(data){
  return axiosFileDown('api/open/income/Withdraw/export',data)
}
// 导出小B结算订单列表
function downBIncomeOrderList(data){
  return axiosFileDown('api/open/income/Withdraw/order/export',data)
}
// 小B结算订单列表
function bIncomeOrderList(data,cab){
  axiosPost('api/open/income/Withdraw/order/query/list', data, cab)
}
// 小B结算列表
function bIncomeList(data,cab){
  axiosPost('api/open/income/Withdraw/query/list', data, cab)
}
// 小B结算状态更新
function bIncomeUp(data,cab){
  axiosPost('api/open/income/Withdraw/update', data, cab)
}
// 小B店铺更新
function storeEditStoreInfo(data,cab){
  axiosPost('api/open/store/editStoreInfo', data, cab)
}

/*测试登陆*/
function testLogin(data,cab){
  axiosGet('oauth/testLogin',cab,data)
}

// 输出的api
export default {
	getSessionId,
	loginOut,
	getToken,
  addAuth,
  delAuth,
  getListAuth,
  upDataAuth,
	addRole,
  changeRole,
  getAuthRole,
  getAuthRoleAll,
  delRole,
  getRoleList,
  upDataRole,
  addUser,
  delUser,
  getUser,
  upDataUser,
  brandAdd,
  brandDel,
  brandList,
  brandOne,
  brandUpdate,
  categoryAdd,
  categoryDel,
  categoryList,
  categoryOne,
  categoryUpdata,
  pageHomeAdd,
  pageHomeDel,
  pageHomeList,
  pageHomeUpdata,
  banckInfoAdd,
  banckInfoDel,
  banckInfoList,
  banckInfoUpdata,
  baseAttrNameAdd,
  baseAttrNameDel,
  baseAttrNameList,
  baseAttrNameUpdata,
  baseAttrNameAll,
  baseAttrValueAdd,
  baseAttrValueDel,
  baseAttrValueList,
  baseAttrValueUpdata,
  productInfoAdd,
  productInfoDel,
  productInfoList,
  productInfoUpdata,
  productPictureAdd,
  productPictureDel,
  productPictureList,
  productTaxAdd,
  productTaxList,
  productTaxUpdata,
  collegeAdd,
  collegeDel,
  collegeList,
  collegeUpdata,
  couponAdd,
  couponDel,
  couponList,
  helpAdd,
  helpDel,
  helpList,
  helpUpdata,
  htAdd,
  htList,
  htDel,
  htUpdata,
  homeadAdd,
  homeadList,
  homeadDel,
  homeadUpdata,
  homeinfoAdd,
  homeinfoDel,
  homeinfoList,
  homeinfoUpdata,
  homeproductAdd,
  homeproductDel,
  homeproductList,
  homeproductUpdata,
  relationAdd,
  relationDel,
  relationUpdata,
  relationList,
  commentsList,
  infoList,
  infoDetail,
  infoReview,
  infoUpdata,
  picDel,
  picList,
  seckillGoodsList,
  seckillGoodsDel,
  seckillGoodsSort,
  seckillAdd,
  seckillDel,
  seckillList,
  seckillUpdata,
  skuDel,
  skuList,
  skuUpdata,
  topicAdd,
  topicDel,
  topicUpdata,
  spcialIdInfo,
  topicList,
  topicProAdd,
  topicProUpdata,
  topicProDel,
  topicProList,
  spcialAdd,
  spcialList,
  spcialDel,
  spcialUp,
  spcialAnAdd,
  spcialAnList,
  spcialAnDel,
  spcialAnUp,
  spcialAnDetail,
  homeChoiceAdd,
  homeChoiceDel,
  homeChoiceList,
  homeChoiceUp,
  attrNameOption,
  kaolaBrandList,
  kaolaBrandUp,
  kaolaClassList,
  kaolaClassUp,
  downOrder,
  financeDownOrder,
  downGoods,
  downOfflineGoods,
  downGoodsSku,
  upSkuFile,
  classInit,
  changeGoodsImg,
  getAddressTag,
  getCommissionType,
  getContentType,
  getCouponType,
  getHelpInfo,
  getImageCatalog,
  getMqTag,
  getPageHome,
  getPayChannel,
  getPlatform,
  getProductType,
  getTaxUnit,
  getUserAdressList,
  getUserCashList,
  getUserCashPayWith,
  getUserCashUpdata,
  getUserCashUpdataState,
  getUserAuthInfoList,
  getUserAuthInfoUpdata,
  getUserCollectionList,
  getUserCouponInfoList,
  getUserExchangeList,
  getUserHierarchyList,
  getUserIncomeList,
  getUserEstimateList,
  userDel,
  userList,
  userSelect,
  userPowerList,
  userRecommenderAdd,
  userRecommenderDel,
  userRecommenderList,
  userRecommenderUpdata,
  userStoreList,
  userStoreUpdata,
  userSupplierList,
  userTeamList,
  userUpgradeList,
  userUpgradeDel,
  userUpgradeUpdata,
  userUpgradeAdd,
  supplierAdd,
  supplierPwd,
  supplierList,
  supplierUpdate,
  supAuthAdd,
  supAuthDel,
  supAuthList,
  supAuthUpdate,
  supRoleAdd,
  supRoleDel,
  supRoleList,
  supRoleUpdate,
  supRoleAuthList,
  supRoleAuthChange,
  posterAdd,
  posterList,
  posterUp,
  payWithdrawal,
  cashUp,
  couponToUser,
  changeUserMenber,
  changeUserLevel,
  changeUserPar,
  userSelectSub,
  userSelectParent,
  orderCommissionList,
  orderInfoList,
  orderItemInfoList,
  orderItemProductList,
  orderRefundOne,
  orderRefundList,
  sureRefund,
  sureOrderRefund,
  sureApplyOrderRefund,
  getUserTeam,
  gmOrderDown,
  addNewUserCoupon,
  newUserCouponList,
  changeNewUserCoupon,
  userTeamInfoList,
  userTeamInfoDown,
  classOrderExport,
  classOrderList,
  commissionDistributionExport,
  commissionDistributionList,
  dailySalesExport,
  dailySalesList,
  subsidyFreight,
  batchSpecialAnchorProduct,
  downOrderRefund,
  updateConsignee,
  bShopList,
  bShopAudit,
  bShopImgChange,
  getBshopInfo,
  bCityList,
  bAreaList,
  bOrderList,
  downBOrder,
  bOrderInfo,
  orderReportTaskFinanceExport,
  reportDownLoadList,
  bGoodsList,
  bGoodsCheck,
  bGoodsInfo,
  bGoodsUpdate,
  getServiceProvider,
  getServiceProviderInfo,
  removeServiceProvider,
  addServiceProvider,
  bClassList,
  bClassDetail,
  bClassAdd,
  bClassUp,
  addServiceProviderShop,
  removeServiceProviderShop,
  serviceProviderShopList,
  bIncomeDetail,
  downBIncomeList,
  downBIncomeOrderList,
  bIncomeOrderList,
  bIncomeList,
  bIncomeUp,
  investmentRegistrationList,
  adressByPid,
  getKaoLaImgUp,
  storeEditStoreInfo,
  testLogin,
  weiniExportWeiniPid,
  weiniImportWeiniBidCidData,
  appInitList,
  appInitUp,
  bServiceList,
  bServiceUp,
  statCategoryExport,
  statSalesExport,
  goodsSpecialList,
  oneGoodsSpecial,
  downBrank,
  upBrankFile,
  upBrank
}
