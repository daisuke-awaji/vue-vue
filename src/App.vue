<template>
  <div id="app">
    <navigation-link/>
    <router-view/>
  </div>
</template>

<script>
import Test from './components/Test'
import Users from './components/Users'
import NavigationLink from './components/NavigationLink'

export default {
  name: 'App',
  components: {
    Test, Users, NavigationLink
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
