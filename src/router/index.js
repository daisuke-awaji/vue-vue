import Vue from 'vue'
import Router from 'vue-router'
import Recognition from '../components/Recognition'
import Users from '../components/Users'
import Test from '../components/Test'

Vue.use(Router)

Vue.directive('Test', Test)
Vue.directive('Users', Users)

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: Recognition },
    { path: '/users', component: Users },
    { path: '/test', component: Test }
  ]
})
