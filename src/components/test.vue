<template>
  <div class="test">
    <h1>{{ title }}</h1>
    <input type="text" v-model="title"><br />
    <!-- {{ preTitle }} -->
    <!-- html tag is used by v-html -->
    <!-- <span v-html="preTitle"></span> -->
    <p v-if="showName">{{ user.firstName }}</p>
    <p v-else>Nobody</p>
    <p v-test="user.firstName"></p>
    <ul>
      <li v-for="item in items" :key="item.id">{{ item.title }}</li>
    </ul>
    <button v-on:click="greet('hello world')">Say Greeting</button>
    <br />
    <input type="text" v-on:keyup="pressKey" v-on:keyup.enter="enterHit">
    <hr />
    <label>First Name: </label><input type="text" v-model="user.firstName">
    <br />
    <label>Last Name: </label><input type="text" v-model="user.lastName">
    <h3>{{ fullName }}</h3>
    <h2>{{ msg }}</h2>
  </div>
</template>

<script>
export default {
  name: 'test',
  props: {
    msg: {
      type: String, // String, Numbeer, function, object
      default: 'Foobar'
    }
  },
  data () {
    return {
      title: 'hello world',
      preTitle: '<h1>HELLO WORLD</h1>',
      user: {
        firstName: 'gee',
        lastName: 'awa'
      },
      showName: true,
      items: [
        {title: 'one'},
        {title: 'two'},
        {title: 'three'}
      ]
    }
  },
  methods: {
    greet: function (msg) {
      alert(msg)
    },
    pressKey: function (e) {
      console.log(e.target.value)
    },
    enterHit: function (e) {
      console.log('You hit enter.')
    }
  },
  computed: {
    fullName: function () {
      return this.user.firstName + ' ' + this.user.lastName
    }
  }
}
</script>

<style scoped>

</style>
