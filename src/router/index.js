import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login/login'
import store from '../store/index'

Vue.use(Router)

// 无需权限的路由
const constantRouterMap = [
  { path: '/login', component: Login },
  { path: '/noauth', component: ()=> import('@/views/noauth/noauth') },
  {
    path: '/',
    // component: () => import('@/views/index/index'),
    name: '/',
    redirect:'/home'
  }
]

export default new Router({
  mode: 'history',
  routes: constantRouterMap
})

// 新异步挂载的路由
const asyncRouterMap = [
  // 首页
  {
    path: '/',
    component: () => import('@/views/index/index'),
    redirect:'/home',
    meta:{
      name:'后台首页',
      icon:''
    },
    children:[
      {
        path: '/home',
        component: () => import('@/views/home/home'),
        name: 'home'
      }
    ]
  },
  // 订单管理
  {
    path: '/order',
    component: () => import('@/views/index/index'),
    redirect:'/order/orderList',
    name: 'order',
    meta:{
      icon:'el-icon-tickets',
      name:'订单管理'
    },
    children:[
      // 订单列表
      {
        path: '/order/orderList',
        component: () => import('@/views/order/orderList'),
        name: 'orderList',
        meta:{
          name:'主订单列表'
        }
      },
      // 子订单列表
      {
        path: '/order/orderChildren',
        component: () => import('@/views/order/orderChildren'),
        name: 'orderChildren',
        meta:{
          name:'子订单列表'
        }
      },
      // 详细订单列表
      {
        path: '/order/orderInfo',
        component: () => import('@/views/order/orderInfo'),
        name: 'orderInfo',
        meta:{
          name:'商品订单列表'
        }
      },
      // 订单列表
      {
        path: '/order/orderItem',
        component: () => import('@/views/order/orderItem'),
        name: 'orderItem',
        meta:{
          name:'订单列表'
        }
      },
      // 订单列表
      {
        path: '/order/orderRefund',
        component: () => import('@/views/order/orderRefund'),
        name: 'orderRefund',
        meta:{
          name:'退款订单列表'
        }
      }
    ]
  },
  // 专题管理
  {
    path: '/special',
    component: () => import('@/views/index/index'),
    redirect:'/special/memSpecialList',
    name: 'special',
    meta:{
      icon:'myicon-zhuanti',
      name:'专题管理'
    },
    children:[
      // 新增会员专题
      {
        path: '/special/memSpecialAdd',
        component: () => import('@/views/special/special'),
        name: 'memSpecialAdd',
        meta:{
          name:'新增会员专题'
        }
      },
      // 会员专题列表
      {
        path: '/special/memSpecialList',
        component: () => import('@/views/special/specialList'),
        name: 'memSpecialList',
        meta:{
          name:'会员专题列表'
        }
      },
      // 新增普通专题
      {
        path: '/special/comSpecialAdd',
        component: () => import('@/views/special/comSpecialAdd'),
        name: 'comSpecialAdd',
        meta:{
          name:'新增普通专题'
        }
      },
      // 普通专题列表
      {
        path: '/special/comSpecialList',
        component: () => import('@/views/special/comSpecialList'),
        name: 'comSpecialList',
        meta:{
          name:'普通专题列表'
        }
      }
    ]
  },
  // 商品管理
  {
    path: '/goods',
    component: () => import('@/views/index/index'),
    redirect:'/goods/goodsList',
    name: 'goods',
    meta:{
      icon:'el-icon-goods',
      name:'商品管理'
    },
    children:[
      // 商品列表
      {
        path: '/goods/goodsList',
        component: () => import('@/views/goods/goodsList'),
        name: 'goodsList',
        meta:{
          name:'商品列表'
        }
      },
      // 产品列表
      {
        path: '/goods/productList',
        component: () => import('@/views/goods/productList'),
        name: 'productList',
        meta:{
          name:'产品库列表'
        }
      },
      // 秒杀列表
      {
        path: '/goods/spikeList',
        component: () => import('@/views/goods/spikeList'),
        name: 'spikeList',
        meta:{
          name:'秒杀列表'
        }
      },
      // 为你精选
      {
        path: '/goods/chooseForYou',
        component: () => import('@/views/goods/chooseForYou'),
        name: 'chooseForYou',
        meta:{
          name:'为你精选'
        }
      },
      // 品牌管理
      {
        path: '/goods/brand',
        component: () => import('@/views/goods/brand'),
        name: 'brand',
        meta:{
          name:'品牌管理'
        }
      },
      // 上传产品
      {
        path: '/goods/productAdd',
        component: () => import('@/views/goods/productAdd'),
        name: 'productAdd',
        meta:{
          name:'上传产品库'
        }
      },
      // 商品分类
      {
        path: '/goods/goodsClass',
        component: () => import('@/views/goods/goodsClass'),
        name: 'goodsClass',
        meta:{
          name:'商品分类'
        }
      },
      // 商品评价
      // {
      //   path: '/goods/goodsEvaluate',
      //   component: () => import('@/views/goods/goodsEvaluate'),
      //   name: 'goodsEvaluate',
      //   meta:{
      //     name:'商品评价'
      //   }
      // }
    ]
  },
  // 用户列表
  {
    path: '/user',
    component: () => import('@/views/index/index'),
    redirect:'/user/userList',
    name: 'user',
    meta:{
      icon:'myicon-yonghu',
      name:'用户管理'
    },
    children:[
      // 用户列表
      {
        path: '/user/userList',
        component: () => import('@/views/user/userList'),
        name: 'userList',
        meta:{
          name:'用户列表'
        }
      },
       // 用户收货地址列表
      {
        path: '/user/userAdressList',
        component: () => import('@/views/user/userAdressList'),
        name: 'userAdressList',
        meta:{
          name:'用户收货地址列表'
        }
      },
      // 用户提现列表
      {
        path: '/user/userCashList',
        component: () => import('@/views/user/userCashList'),
        name: 'userCashList',
        meta:{
          name:'用户提现列表'
        }
      },
      // 用户认证列表
      {
        path: '/user/userAuth',
        component: () => import('@/views/user/userAuth'),
        name: 'userAuth',
        meta:{
          name:'用户认证列表'
        }
      },
      // 用户收藏列表
      {
        path: '/user/userCollection',
        component: () => import('@/views/user/userCollection'),
        name: 'userCollection',
        meta:{
          name:'用户收藏列表'
        }
      },
      // 用户优惠券列表
      {
        path: '/user/userCoupon',
        component: () => import('@/views/user/userCoupon'),
        name: 'userCoupon',
        meta:{
          name:'用户优惠券列表'
        }
      },
      // 用户余额变更列表
      {
        path: '/user/userBalance',
        component: () => import('@/views/user/userBalance'),
        name: 'userBalance',
        meta:{
          name:'用户余额变更列表'
        }
      },
      // 用户上级关系列表
      {
        path: '/user/userHierarchy',
        component: () => import('@/views/user/userHierarchy'),
        name: 'userHierarchy',
        meta:{
          name:'用户关系列表'
        }
      },
      // 用户收益列表
      {
        path: '/user/userIncom',
        component: () => import('@/views/user/userIncom'),
        name: 'userIncom',
        meta:{
          name:'用户收益列表'
        }
      },
      // 用户购买力列表
      {
        path: '/user/userPower',
        component: () => import('@/views/user/userPower'),
        name: 'userPower',
        meta:{
          name:'用户购买力列表'
        }
      },
      // 用户推荐人列表
      {
        path: '/user/userRecommender',
        component: () => import('@/views/user/userRecommender'),
        name: 'userRecommender',
        meta:{
          name:'用户推荐人列表'
        }
      },
      // 用户团队列表
      {
        path: '/user/userTeam',
        component: () => import('@/views/user/userTeam'),
        name: 'userTeam',
        meta:{
          name:'用户团队列表'
        }
      },
      // 用户关系表查询
      {
        path: '/user/userFormSearch',
        component: () => import('@/views/user/userFormSearch'),
        name: 'userFormSearch',
        meta:{
          name:'用户关系查询'
        }
      },
      // 用户团队统计
      {
        path: '/user/userTeamInfo',
        component: () => import('@/views/user/userTeamInfo'),
        name: 'userFormSearch',
        meta:{
          name:'用户团队统计'
        }
      },
      // 用户升级规则
      // {
      //   path: '/user/userRule',
      //   component: () => import('@/views/user/userRule'),
      //   name: 'userRule',
      //   meta:{
      //     name:'用户升级规则'
      //   }
      // }
    ]
  },
  // 商家列表
  {
    path: '/shop',
    component: () => import('@/views/index/index'),
    redirect:'/shop/shopList',
    name: 'shop',
    meta:{
      icon:'myicon-gonghuo',
      name:'商家管理'
    },
    children:[
      // 商家列表
      {
        path: '/shop/shopshopList',
        component: () => import('@/views/shop/shopList'),
        name: 'shopList',
        meta:{
          name:'店铺列表'
        }
      },
      // 供货商列表
      {
        path: '/shop/shopsupplier',
        component: () => import('@/views/shop/supplier'),
        name: 'supplier',
        meta:{
          name:'供货商列表'
        }
      },
      // 商家权限列表
      {
        path: '/shop/shopshopAuthList',
        component: () => import('@/views/shop/shopAuthList'),
        name: 'shopAuthList',
        meta:{
          name:'商家权限列表'
        }
      },
      // 商家角色列表
      {
        path: '/shop/shopshopRoleList',
        component: () => import('@/views/shop/shopRoleList'),
        name: 'shopRoleList',
        meta:{
          name:'商家角色列表'
        }
      }
    ]
  },
  {
    path: '/auth',
    component: () => import('@/views/index/index'),
    redirect:'/auth/listUser',
    name: 'auth',
    meta:{
      icon:'el-icon-view',
      name:'权限管理'
    },
    children:[
      // 新增权限
      {
        path: '/auth/addAuth',
        component: () => import('@/views/admin/auth/addAuth'),
        name: 'addAuth',
        meta:{
          name:'新增权限'
        }
      },
      // 权限列表
      {
        path: '/auth/listAuth',
        component: () => import('@/views/admin/auth/listAuth'),
        name: 'listAuth',
        meta:{
          name:'权限列表'
        }
      },
      // 角色列表
      {
        path: '/auth/listRole',
        component: () => import('@/views/admin/role/listRole'),
        name: 'listRole',
        meta:{
          name:'角色列表'
        }
      },
      // 新增角色
      {
        path: '/auth/addRole',
        component: () => import('@/views/admin/role/addRole'),
        name: 'addRole',
        meta:{
          name:'新增角色'
        }
      },
      // 新增用户
      {
        path: '/auth/addUser',
        component: () => import('@/views/admin/user/addUser'),
        name: 'addUser',
        meta:{
          name:'新增用户'
        }
      },
      // 用户列表
      {
        path: '/auth/listUser',
        component: () => import('@/views/admin/user/listUser'),
        name: 'listUser',
        meta:{
          name:'用户列表'
        }
      }
    ]
  },
  // 数据管理
  {
    path: '/data',
    component: () => import('@/views/index/index'),
    redirect:'/data/dailySales',
    name: 'data',
    meta:{
      icon:'el-icon-document',
      name:'数据管理'
    },
    children:[
      // 日销售额
      {
        path: '/data/dailySales',
        component: () => import('@/views/data/dailySales'),
        name: 'dailySales',
        meta:{
          name:'日销售额'
        }
      },
      // 分类销售额
      {
        path: '/data/classOrder',
        component: () => import('@/views/data/classOrder'),
        name: 'classOrder',
         meta:{
          name:'分类销售额'
        }
      },
      // 每日佣金分配
      {
        path: '/data/commissionDay',
        component: () => import('@/views/data/commissionDay'),
        name: 'commissionDay',
         meta:{
          name:'每日佣金分配'
        }
      }
    ]
  },
  // 优惠券管理
  {
    path: '/coupon',
    component: () => import('@/views/index/index'),
    redirect:'/coupon/couponList',
    name: 'coupon',
    meta:{
      icon:'myicon-youhui',
      name:'优惠券管理'
    },
    children:[
      // 新增优惠券
      {
        path: '/coupon/ouponAdd',
        component: () => import('@/views/coupon/couponAdd'),
        name: 'couponAdd',
        meta:{
          name:'新增优惠券'
        }
      },
      // 优惠券列表
      {
        path: '/coupon/couponList',
        component: () => import('@/views/coupon/couponList'),
        name: 'couponList',
         meta:{
          name:'优惠券列表'
        }
      },
      // 新用户优惠券列表
      {
        path: '/coupon/couponNewUserList',
        component: () => import('@/views/coupon/couponNewUserList'),
        name: 'couponList',
         meta:{
          name:'新用户优惠券'
        }
      }
    ]
  },
  // 小B管理
  {
    path: '/b',
    component: () => import('@/views/index/index'),
    redirect:'/b/bGoods',
    name: 'b',
    meta:{
      icon:'myicon-dianpu',
      name:'纳小店管理'
    },
    children:[
      // 小B店铺管理
      {
        path:'/b/bShop',
        component: () => import('@/views/b/bShop'),
        name: 'bShop',
        meta:{
          name:'纳小店店铺管理'
        }
      },
      // 小B商品管理
      {
        path:'/b/bGoods',
        component: () => import('@/views/b/bGoods'),
        name: 'bGoods',
        meta:{
          name:'纳小店商品管理'
        }
      },
      // 小B订单管理
      {
        path:'/b/bOrder',
        component: () => import('@/views/b/bOrder'),
        name: 'bOrder',
        meta:{
          name:'纳小店订单管理'
        }
      },
      // 小B分类管理
      {
        path:'/b/bClass',
        component: () => import('@/views/b/bClass'),
        name: 'bClass',
        meta:{
          name:'纳小店分类管理'
        }
      },
      // 小B经营项目管理
      {
        path:'/b/bBusinessProjects',
        component: () => import('@/views/b/bBusinessProjects'),
        name: 'bBusinessProjects',
        meta:{
          name:'经营项目管理'
        }
      },
      // 小B海报管理
      {
        path:'/b/bPoster',
        component: () => import('@/views/b/bPoster'),
        name: 'bPoster',
        meta:{
          name:'纳小店海报管理'
        }
      },
      // 小B货款结算管理
      {
        path:'/b/bPayment',
        component: () => import('@/views/b/bPayment'),
        name: 'bPayment',
        meta:{
          name:'货款结算管理'
        }
      },
      // 小B服务商管理
      {
        path:'/b/bSp',
        component: () => import('@/views/b/bSp'),
        name: 'bSp',
        meta:{
          name:'服务商管理'
        }
      }
    ]
  },
  // 配置管理
  {
    path: '/option',
    component: () => import('@/views/index/index'),
    redirect:'/option/bank',
    name: 'option',
    meta:{
      icon:'myicon-guanggao',
      name:'配置管理'
    },
    children:[
      // 财务报表
      {
        path: '/option/financialStatements',
        component: () => import('@/views/option/financialStatements'),
        name: 'financialStatements',
        meta:{
          name:'财务报表'
        }
      },
      // 服务商报名列表
      {
        path: '/option/serviceSignUp',
        component: () => import('@/views/option/serviceSignUp'),
        name: 'serviceSignUp',
        meta:{
          name:'服务商H5报名列表'
        }
      },
      // 小B服务商报名列表
      {
        path: '/option/bService',
        component: () => import('@/views/option/bService'),
        name: 'bService',
        meta:{
          name:'服务商App报名列表'
        }
      },
      // 银行
      {
        path: '/option/bank',
        component: () => import('@/views/option/bank'),
        name: 'bank',
        meta:{
          name:'银行管理'
        }
      },
      // 分类税率管理
      {
        path: '/option/productTax',
        component: () => import('@/views/option/productTax'),
        name: 'productTax',
        meta:{
          name:'分类税率管理'
        }
      },
      // 帮助页面管理
      {
        path: '/option/help',
        component: () => import('@/views/option/help'),
        name: 'help',
        meta:{
          name:'帮助页面管理'
        }
      },
       // 首页数据管理
      {
        path: '/option/apphomeinfo',
        component: () => import('@/views/option/appHomeInfo'),
        name: 'apphomeinfo',
        meta:{
          name:'首页数据管理'
        }
      },
      // 分享海报管理
      {
        path: '/option/poster',
        component: () => import('@/views/option/poster'),
        name: 'poster',
        meta:{
          name:'分享海报管理'
        }
      },
      // 初始化管理
      {
        path: '/option/initiali',
        component: () => import('@/views/option/initiali'),
        name: 'initiali',
        meta:{
          name:'初始化管理'
        }
      },
      // 考拉品牌管理
      {
        path: '/option/kaolaBrand',
        component: () => import('@/views/option/kaolaBrand'),
        name: 'kaolaBrand',
        meta:{
          name:'考拉品牌管理'
        }
      },
      // 考拉分类管理
      {
        path: '/option/kaolaClass',
        component: () => import('@/views/option/kaolaClass'),
        name: 'kaolaClass',
        meta:{
          name:'考拉分类管理'
        }
      },
      // 区域管理
      {
        path: '/option/location',
        component: () => import('@/views/option/location'),
        name: 'location',
        meta:{
          name:'区域管理'
        }
      },
      // 商学院管理
      {
        path: '/option/business',
        component: () => import('@/views/option/business'),
        name: 'business',
        meta:{
          name:'商学院管理'
        }
      },
      // 商学院管理
      {
        path: '/option/appInit',
        component: () => import('@/views/option/appInit'),
        name: 'appInit',
        meta:{
          name:'app审核管理'
        }
      }
    ]
  },
  // 活动管理
  {
    path: '/activity',
    component: () => import('@/views/index/index'),
    redirect:'/activity/seckill',
    name: 'activity',
    meta:{
      icon:'myicon-zhuanti',
      name:'活动管理'
    },
    children:[
      // 秒杀列表
      {
        path: '/activity/seckill',
        component: () => import('@/views/activity/seckill'),
        name: 'seckill',
        meta:{
          name:'秒杀列表'
        }
      },
      // // 添加秒杀
      // {
      //   path: '/activity/seckillAdd',
      //   component: () => import('@/views/activity/seckillAdd'),
      //   name: 'seckillAdd',
      //   meta:{
      //     name:'添加秒杀'
      //   }
      // },
      // // 编辑秒杀
      // {
      //   path: '/activity/seckillEdit',
      //   component: () => import('@/views/activity/seckillEdit'),
      //   name: 'seckillEdit',
      //   meta:{
      //     name:'编辑秒杀'
      //   }
      // }
    ]
  },
  // 404
  {
    path: '*',
    component: () => import('@/views/undefind/undefind'),
    name: 'undefindpage'
  }
]


function  routerMatch(permission,asyncRouterMap) {
  return new Promise((resolve) => {
    let newRouter = []
    // 创建路由
    function createdRouter(arrList,routerList) {
      // 根据匹配到的路由添加到routers
      let arr = []
      console.log('permission', arrList,routerList)
      arrList.map((item)=>{
        let path = item.caUrl
        routerList.find((s) => {
          if (s.path == "/" && path == "/home"){
            arr.push(s)
          } else if (s.path == path) {
            console.log('path==',path)
            if (item.subCmsAuthorityVo && item.subCmsAuthorityVo.length) {
              s.children = createdRouter(item.subCmsAuthorityVo,s.children)
            }
            arr.push(s)
          }
        })
      })
      console.log('arr',arr)
      return arr
    }
    if (permission.length == 1 && permission[0].caUrl == 'all') {
      console.log('白名单')
      store.commit('setLeftRouter',asyncRouterMap)
      // store.commit('setLeftRouter','all')
      newRouter = asyncRouterMap
    } else {
      console.log('非白名单')
      // vuex缓存左面菜单的路由
      newRouter = createdRouter(permission,asyncRouterMap)
      console.log('非白名单处理结束',newRouter)
      store.commit('setLeftRouter',newRouter)
      newRouter.push(asyncRouterMap[asyncRouterMap.length-1])
    }
    console.log('newRouter',newRouter)
    resolve(newRouter)
  })
}

export { routerMatch, asyncRouterMap }
