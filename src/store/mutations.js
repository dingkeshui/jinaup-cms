const mutations = {
  token (state, num) {
    state.token = num
    console.log(state, num)
  },
  testToken (state, num) {
    state.testToken = num
  },
  // 登出
  goout (state) {
    state.token = ''
    state.setUserInfo = {}
  },
  // 隐藏头部导航
  headerhidden (state, data) {
  	state.headerhidden = data
  },
  // 设置用户信息
  setUserInfo (state, string){
    console.log('进入setUserInfo')
    console.log(string)
    state.userInfo = string
    console.log(state.userInfo)
  },
  // 设置导航栏的路由
  setLeftRouter(state, data){
    console.log('设置导航栏的路由',data)
    state.leftRouter = data
  }
}

export default mutations
