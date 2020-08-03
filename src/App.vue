<template>
  <div id="app">
    <header class="header-style3 fixedHeader">
      <div class="navbar-default">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-12 col-lg-12">
              <div class="menu_area alt-font">
                <nav class="navbar navbar-expand-lg navbar-light no-padding">
                  <div class="navbar-header navbar-header-custom">
                    <!-- start logo -->
                    <a href="index.html" class="navbar-brand logowhite"
                      ><img id="logo" src="img/logos/logo-white.png" alt="logo"
                    /></a>
                    <!-- end logo -->
                  </div>

                  <div class="navbar-toggler"></div>

                  <!-- menu area -->
                  <div v-if="isLoggedIn()">
                    <ul class="navbar-nav ml-auto" id="nav" style="">
                      <li>
                        <router-link to="/subjects">Subject Index</router-link>
                      </li>
                      <li>
                        <router-link :to="`/users/:id`">users show</router-link>
                      </li>
                      <li>
                        <router-link to="/conversations"
                          >Conversations</router-link
                        >
                      </li>
                      <li>
                        <router-link to="/friends">Friends</router-link>
                      </li>
                      <li>
                        <router-link to="/logout">Logout</router-link>
                      </li>
                    </ul>
                  </div>
                  <!-- end menu area -->
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    <!-- <div id="nav">
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
    </div> -->
    <router-view />
  </div>
</template>

<style></style>

<script>
export default {
  data: function() {
    return {
      flashMessage: "",
      userId: localStorage.getItem("userId"),
    };
  },
  methods: {
    isLoggedIn: function() {
      return localStorage.getItem("jwt");
    },
    getUserId: function() {
      return localStorage.getItem("userId");
    },
  },
};
</script>
