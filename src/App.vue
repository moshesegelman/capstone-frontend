<template>
  <div id="app">
    <header class="header-style2 fixedHeader">
      <div id="top-bar">
        <div class="container">
          <div class="row">
            <div class="col-md-9 col-xs-12">
              <div class="top-bar-info">
                <ul>
                  <li><i class="fas fa-mobile-alt"></i>(+123) 456 7890</li>
                  <li><i class="fas fa-envelope"></i>addyour@emailhere</li>
                </ul>
              </div>
            </div>
            <div class="col-xs-12 col-md-3 xs-display-none">
              <ul class="top-social-icon">
                <li>
                  <a href="#!"><i class="fab fa-facebook-f"></i></a>
                </li>
                <li>
                  <a href="#!"><i class="fab fa-twitter"></i></a>
                </li>
                <li>
                  <a href="#!"><i class="fab fa-instagram"></i></a>
                </li>
                <li>
                  <a href="#!"><i class="fab fa-linkedin-in"></i></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="navbar-default">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-12 col-lg-12">
              <div class="menu_area alt-font">
                <nav class="navbar navbar-expand-lg navbar-dark no-padding">
                  <div class="navbar-header navbar-header-custom">
                    <!-- start logo -->
                    <a href="/" class="navbar-brand "
                      ><img id="logo" src="/img/logos/studdybuddy.png" alt=""
                    /></a>
                    <!-- end logo -->
                  </div>

                  <div class="navbar-toggler"></div>

                  <!-- menu area -->
                  <div v-if="isLoggedIn()">
                    <ul class="navbar-nav ml-auto" id="nav" style="">
                      <li>
                        <router-link to="/subjects">Subjects</router-link>
                      </li>
                      <li>
                        <router-link to="/conversations">Messages</router-link>
                      </li>
                      <li>
                        <router-link to="/friends">Buddies</router-link>
                      </li>
                      <li>
                        <router-link :to="`/users/me`">Account</router-link>
                      </li>
                      <li>
                        <router-link to="/logout">Logout</router-link>
                      </li>
                    </ul>
                  </div>
                  <div v-if="!isLoggedIn()">
                    <ul class="navbar-nav ml-auto" id="nav" style="">
                      <li>
                        <router-link to="/signup">Signup</router-link>
                      </li>
                      <li>
                        <router-link to="/login">Login</router-link>
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
    
    </div> -->

    <router-view />

    <!-- <footer>
      <div class="container">
        <div class="row">
          <div class="col-lg-4 col-md-6 sm-margin-30px-bottom">
            <img alt="footer-logo" src="img/logos/logo-footer.png" />
            <p class="margin-20px-top">
              Nemo enim enim voluptatem quia voluptas sit aspernatur aut odit
              aut fugit, sed quia consequ magni dolores eos qui ratione
              voluptatem.
            </p>
            <div class="margin-25px-top footer-social-icons">
              <ul>
                <li>
                  <a href="#!"><i class="fab fa-facebook-f"></i></a>
                </li>
                <li>
                  <a href="#!"><i class="fab fa-twitter"></i></a>
                </li>
                <li>
                  <a href="#!"><i class="fab fa-instagram"></i></a>
                </li>
                <li>
                  <a href="#!"><i class="fab fa-youtube"></i></a>
                </li>
                <li>
                  <a href="#!"><i class="fab fa-linkedin-in"></i></a>
                </li>
              </ul>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 sm-margin-30px-bottom">
            <h3 class="footer-title-style2 text-theme-color">Quick Links</h3>
            <div class="row">
              <div class="col-md-6 no-padding-right xs-padding-15px-right">
                <ul class="footer-list xs-margin-5px-bottom">
                  <li><a href="#!">News</a></li>
                  <li><a href="#!">History</a></li>
                  <li><a href="#!">Community</a></li>
                  <li><a href="#!">Portfolio</a></li>
                  <li><a href="#!">Safety</a></li>
                </ul>
              </div>
              <div class="col-md-6 no-padding-right xs-padding-15px-right">
                <ul class="footer-list">
                  <li><a href="#!">Construction</a></li>
                  <li><a href="#!">Case studies</a></li>
                  <li><a href="#!">Blog detail</a></li>
                  <li><a href="#!">Sales Services</a></li>
                  <li><a href="#!">Services detail</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-md-6 offset-lg-1">
            <h3 class="footer-title-style2 text-theme-color">Get in Touch</h3>
            <ul class="footer-list">
              <li>
                <span class="d-inline-block vertical-align-top font-size18"
                  ><i class="fas fa-map-marker-alt text-theme-color"></i
                ></span>
                <span
                  class="d-inline-block width-85 vertical-align-top padding-10px-left"
                  >74 Norava Street 542B, Great North Town 51 MT.</span
                >
              </li>
              <li>
                <span class="d-inline-block vertical-align-top font-size18"
                  ><i class="fas fa-mobile-alt text-theme-color"></i
                ></span>
                <span
                  class="d-inline-block width-85 vertical-align-top padding-10px-left"
                  >(+44) 123 456 789</span
                >
              </li>
              <li>
                <span class="d-inline-block vertical-align-top font-size18"
                  ><i class="far fa-envelope text-theme-color"></i
                ></span>
                <span
                  class="d-inline-block width-85 vertical-align-top padding-10px-left"
                  >addyour@emailhere</span
                >
              </li>
              <li>
                <span class="d-inline-block vertical-align-top font-size18"
                  ><i class="fas fa-globe text-theme-color"></i
                ></span>
                <span
                  class="d-inline-block width-85 vertical-align-top padding-10px-left"
                  >www.yourwebsitehere.com</span
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="footer-bar xs-font-size13">
        <div class="container">
          <div class="row">
            <div class="col-md-6 text-left xs-text-center xs-margin-5px-bottom">
              <p>
                © Copyright Crizal
                <script>
                  document.write(new Date().getFullYear());
                </script>
                2020. All Rights Reserved.
              </p>
            </div>
            <div class="col-md-6 text-right xs-text-center">
              Design and Developed by: Chitrakoot Web
            </div>
          </div>
        </div>
      </div>
    </footer> -->
  </div>
</template>

<style></style>

<script>
export default {
  data: function() {
    return {
      currentPage: "",
      pageTitle: "Choose any Subject to Get Started!",
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
