/*这里是http请求的api*/
import axios from 'axios'
import qs from 'qs'

// api的配置文件
import apiConfig from '../config/apiConfig.js'

// 版本号
const version = apiConfig.version

// 项目使用的url
const url = apiConfig[apiConfig.url]
console.log(url)
const service = axios.create()
const serviceFile = axios.create()
    // 请求默认地址
service.defaults.baseURL = 'http://oauth.jinaup.com'
serviceFile.defaults.baseURL = 'http://oauth.jinaup.com'
// service.defaults.baseURL = 'http://192.168.110.136:8090'
// serviceFile.defaults.baseURL = 'http://192.168.110.136:8090'
    // axios.defaults.timeout = 300000
service.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
    // axios.defaults.headers['Content-Type'] = 'multipart/form-data'
    // 请求携带cookie
service.defaults.withCredentials = true
serviceFile.defaults.withCredentials = true

//请求拦截器
service.interceptors.request.use(function(request) {
        // 请求成功处理回调
        if (request.method === 'post') {
            request.data = qs.stringify(request.data)
        }
        // console.log('请求拦截器success',request)
        return request
    }, function(error) {
        // 请求失败、错误处理回调
        console.log('拦截器error', request)
    })
    //响应拦截器
    // axios.interceptors.response.use(function(response){
    //     // 请求成功处理回调
    //     console.log('响应拦截器success',response)
    // }, function(error){
    //     // 请求失败、错误处理回调
    //     console.log('拦截器error',response)
    // })

// 秒杀api
// 秒杀列表
export let seckillList = params => {
        // return axios.post('/api/open/product/info/productForSeckillList?pageIndex=1',params)
        return service.post('/api/open/seckillPeriod/info/list', params)
    }
    // 秒杀时间段设置
export let seckillSetTime = params => {
        return service.post('/api/open/seckillSetPeriod/info/add', params)
    }
    // 查询已保存的秒杀时间段
export let seckillFindTime = params => {
        return service.post('/api/open/seckillSetPeriod/info/list', params)
    }
    // 根据场次和开始时间获取秒杀商品
export let seckillFind = params => {
        return service.post('/api/open/SeckillProduct/info/getSeckillProductByPeriodAndStartTime', params)
    }
    // 修改秒杀场次及上下架
export let updateSkeckill = params => {
    return service.post('/api/open/seckillPeriod/info/update', params)
}


// 秒杀获取产品列表
export let productForSeckillList = params => {
    return service.post('/api/open/product/info/productForSeckillList', params)
}

// 获取已保存的秒杀商品
export let getSaveSeckillPro = params => {
    return service.post('/api/open/SeckillProduct/info/getSavedSeckillProductInfo', params)
}

// 添加或修改秒杀商品
export let addOrUpdateSeckillPro = params => {
        return serviceFile.post('/api/open/SeckillProduct/info/addOrUpdate', params)
}
    // 删除已存在得秒杀商品
export let delSeckillProductByPsiid = params => {
    return service.post('/api/open/SeckillProduct/info/delSeckillProductByPsiid', params)
}