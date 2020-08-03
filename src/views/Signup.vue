<template>
  <section>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-11 col-lg-8 col-xl-7">
          <div class="common-block">
            <div class="line-title">
              <h3>Register</h3>
            </div>

            <form method="post">
              <div class="row">
                <div class="col-sm-6 margin-10px-bottom">
                  <div class="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="firstName"
                    />
                  </div>
                </div>

                <div class="col-sm-6 margin-10px-bottom">
                  <div class="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="lastName"
                    />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-sm-6 margin-10px-bottom">
                  <div class="form-group">
                    <label>Email Address</label>
                    <input type="email" class="form-control" v-model="email" />
                  </div>
                </div>

                <div class="col-sm-6 margin-10px-bottom">
                  <div class="form-group">
                    <label>Username</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="userName"
                    />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-sm-6 margin-10px-bottom">
                  <div class="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      class="form-control"
                      v-model="password"
                    />
                  </div>
                </div>

                <div class="col-sm-6 margin-10px-bottom">
                  <div class="form-group">
                    <label>Re-Password</label>
                    <input
                      type="password"
                      class="form-control"
                      v-model="passwordConfirmation"
                    />
                  </div>
                </div>
              </div>

              <button
                type="button"
                class="butn theme btn-block margin-20px-top"
                v-on:click="submit()"
              >
                <span>Register</span>
              </button>
              <div class="text-center text-small margin-20px-top">
                <span
                  >Already have an account?
                  <router-link to="/login">Login</router-link></span
                >
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- <div class="signup">
    <form v-on:submit.prevent="submit()">
      <h1>Signup</h1>
      <ul>
        <li class="text-danger" v-for="error in errors">{{ error }}</li>
      </ul>
      <div class="form-group">
        <label>First Name:</label> 
        <input type="text" class="form-control" v-model="firstName">
      </div>
      <div class="form-group">
        <label>Last Name:</label> 
        <input type="text" class="form-control" v-model="lastName">
      </div>
      <div class="form-group">
        <label>Username:</label> 
        <input type="text" class="form-control" v-model="userName">
      </div>
      <div class="form-group">
        <label>Email:</label>
        <input type="email" class="form-control" v-model="email">
      </div>
      <div class="form-group">
        <label>Password:</label>
        <input type="password" class="form-control" v-model="password">
      </div>
      <div class="form-group">
        <label>Password confirmation:</label>
        <input type="password" class="form-control" v-model="passwordConfirmation">
      </div>
      <input type="submit" class="btn btn-primary" value="Submit">
    </form>
  </div> -->
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      errors: [],
    };
  },
  methods: {
    submit: function() {
      var params = {
        first_name: this.firstName,
        last_name: this.lastName,
        username: this.userName,
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation,
      };
      axios
        .post("/api/users", params)
        .then((response) => {
          this.$router.push("/login");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
