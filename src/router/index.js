import Vue from 'vue'
import Router from 'vue-router'
import Users from '../components/users'
import Test from '../components/test'

Vue.use(Router)

Vue.directive('Test', Test)
Vue.directive('Users', Users)

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: Users },
    { path: '/test', component: Test }
  ]
})
