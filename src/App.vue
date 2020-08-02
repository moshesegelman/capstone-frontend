<template>
  <div id="app">
    <div id="nav">
      <div v-if="!isLoggedIn()">
        <router-link to="/signup">Signup</router-link> |
        <router-link to="/login">Login</router-link>
      </div>
       <div v-if="isLoggedIn()">
          <router-link to="/logout">Logout</router-link> |
          <router-link to="/subjects">Subject Index</router-link> |
          <router-link :to="`/users/${userId}`">users show</router-link> |
          <router-link to="/conversations">Conversations</router-link> |
          <router-link to="/friends">Friends</router-link> 
       </div>
    </div>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
export default {
  data: function () {
    return {
      flashMessage: "",
      userId: localStorage.getItem("userId"),
    };
  },
  methods: {
    isLoggedIn: function () {
      return localStorage.getItem("jwt");
    },
    getUserId: function () {
      return localStorage.getItem("userId");
    },
  },
};
</script>
