<template>
  <section>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-10 col-lg-7 col-xl-6">
          <div class="common-block">
            <div class="line-title">
              <h3>Login</h3>
            </div>

            <form method="post">
              <div class="row">
                <div class="col-sm-12 margin-10px-bottom">
                  <div class="form-group">
                    <label>Email</label>
                    <input type="email" class="form-control" v-model="email" />
                  </div>
                </div>

                <div class="col-sm-12 margin-10px-bottom">
                  <div class="form-group">
                    <label>Password </label>
                    <input
                      type="password"
                      class="form-control"
                      v-model="password"
                    />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-sm-6 margin-10px-bottom">
                  <div class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="login-remember"
                    />
                    <label class="custom-control-label" for="login-remember"
                      >Keep me signed in</label
                    >
                  </div>
                </div>
                <!-- <div class="col-sm-6 text-left text-sm-right">
                  <a href="forgot-password.html" class="m-link-muted"
                    >Forgot password?</a
                  >
                </div> -->
              </div>

              <button
                type="button"
                class="butn theme btn-block margin-20px-top"
                v-on:click="submit()"
              >
                <span>Login</span>
              </button>
              <div class="text-center text-small margin-20px-top">
                <span
                  >Don't have an account yet?
                  <router-link to="/signup">Signup</router-link></span
                >
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      email: "",
      password: "",
      errors: [],
    };
  },
  methods: {
    submit: function() {
      var params = {
        email: this.email,
        password: this.password,
      };
      axios
        .post("/api/sessions", params)
        .then((response) => {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          console.log(response.data);
          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("userId", response.data.user_id);
          this.$router.push("/subjects");
        })
        .catch((error) => {
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    },
  },
};
</script>
