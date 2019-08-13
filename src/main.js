// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill"
import Vue from 'vue'
// 引入vuex
import vuex from 'vuex'
import store from './store/index'
import App from './App'
// 引入路由
import router from './router'
import { asyncRouterMap, routerMatch} from './router'
// 引入elementUi
import elementui from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入全局css
import './common/css/common.css'
// 引入自定义icon的scss
import './common/icon/myicon.scss'

// 导入echarts插件
import ECharts from 'vue-echarts/components/ECharts'
// 按需导入
import 'echarts/lib/chart/radar'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
// 导入工具部分
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title';
// register component to use
import 'echarts/lib/component/legendScroll';
// register component to use
import 'echarts/lib/component/dataZoom';
import 'echarts/lib/component/markPoint';
import 'echarts/lib/component/markLine';
import 'echarts/lib/component/markArea';
import 'echarts/lib/component/dataZoom';

// 引入api
import $api from './api/api.js'
// 引入全局使用的工具js
import $utils from './utils/utils/utils.js'

console.log($api)
Vue.prototype.$api = $api
Vue.prototype.$utils = $utils

Vue.component('chart', ECharts)

Vue.config.productionTip = false

Vue.use(elementui)
Vue.use(vuex)

console.log(store)
let testIsToken = false
//路由拦截
router.beforeEach((to, fromObj, next) => {
  console.log('进入路由拦截')
  console.log(to)
  console.log(fromObj)
  console.log('href',location.href)
  if (location.href.indexOf('test')>=0) {
    console.log('测试环境')
    if (store.state.testToken) {
      console.log('测试环境有token')
      if(fromObj.path=="/login"&&!testIsToken){
        routerMatch([{caUrl:'all'}],asyncRouterMap).then(res2=>{
          console.log('res2',res2)
          // 添加路由文件
          testIsToken = true
          router.addRoutes(res2)
          console.log('最终路由',router)
          next({path:to.path})
        })
      } else {
        next()
      }
    } else {
      console.log('测试环境无token')
      if(to.path === '/login'){
        next()
      }else{
        next({ path: 'login'})
      }
    }
  } else {
    if (store.state.token) {
      console.log('have token')
      next()
    } else {
      console.log('dont have token')
      if (to.path === '/login' || to.path === '/noauth') {
        console.log('dont token  go login')
        next()
      } else if (to.path === '/home') {
        console.log('dont token go home')
        console.log(to)
        if(to.query.track){
          // 有track
          console.log('有track')
          console.log(to.query.track)
          $api.getToken({'track':to.query.track}, (data) => {
            console.log('track请求参数返回值')
            console.log(data)
            if(data.data.res_code==1){
              console.log('请求用户信息成功')
              let result = data.data.result
              console.log(result)
              console.log(result.cmsTrackID)
              let mydata = {
                'CmsTrackID': result.cmsTrackID,
                'cuaid': result.cuaid,
                'headimgurl': result.headImgUrl,
                'nickname': result.nickName,
                'unionId': result.unionId,
                'roleId':result.roleId
              }
              store.commit('setUserInfo', mydata)
              store.commit('token',mydata.CmsTrackID)
              sessionStorage.setItem('CmsTrackID', result.cmsTrackID)
              sessionStorage.setItem('cuaid', result.cuaid)
              sessionStorage.setItem('headimgurl', result.headImgUrl)
              sessionStorage.setItem('nickname', result.nickName)
              sessionStorage.setItem('unionId', result.unionId)
              sessionStorage.setItem('roleId', result.roleId)
              $api.getAuthRoleAll('', res=>{
                console.log('查询角色权限信息',res)
                if (res.data.res_code==1) {
                  routerMatch(res.data.result,asyncRouterMap).then(res2=>{
                    console.log('res2',res2)
                    // 添加路由文件
                    router.addRoutes(res2)
                    console.log('最终路由',router)
                    next({path:to.path})
                  })
                }else{
                  console.log('该角色无权限')
                  next({path:'/noauth'})
                }
              })
              console.log(store.state)
            } else {
              console.log('请求用户信息失败')
              next({path:'/noauth'})
            }
          })
        }else{
          console.log('go home dont have track')
          next({ path: 'login'})
        }
      } else {
        let CmsTrackID = sessionStorage.getItem('CmsTrackID')
        console.log(CmsTrackID)
        if(CmsTrackID){
          console.log('CmsTrackID in sessionStorage')
          let mydata = {
            'CmsTrackID': CmsTrackID,
            'cuaid': sessionStorage.getItem('cuaid'),
            'headimgurl': sessionStorage.getItem('headimgurl'),
            'nickname': sessionStorage.getItem('nickname'),
            'unionId': sessionStorage.getItem('unionId'),
            'roleId': sessionStorage.getItem('roleId')
          }
          store.commit('token',CmsTrackID)
          store.commit('setUserInfo',mydata)
          $api.getAuthRoleAll('', res=>{
            console.log('查询角色权限信息',res)
            if (res.data.res_code==1) {
              routerMatch(res.data.result,asyncRouterMap).then(res2=>{
                console.log('res2',res2)
                // 添加路由文件
                router.addRoutes(res2)
                console.log('最终路由',router)
                next({path:to.path})
              })
            }else{
              console.log('该角色无权限')
              next({path:'/noauth'})
            }
          })
        }else{
          console.log('dont token must go login')
          next({ path: '/login' })
        }
      }
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
