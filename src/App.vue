<template>
  <div id="app">
    <ul>
      <li><router-link to="/">Users</router-link></li>
      <li><router-link to="/test">Test</router-link></li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
import Test from './components/test'
import Users from './components/users'

export default {
  name: 'App',
  components: {
    Test, Users
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
