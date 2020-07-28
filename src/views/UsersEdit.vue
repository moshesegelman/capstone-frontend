<template>
  <div class="home">
      <form v-on:submit.prevent="editUser()">
      <h1>Edit User</h1>
      <ul>
        <li class="text-danger" v-for="error in errors">{{ error }}</li>
      </ul>
      <div class="form-group">
        <label>First Name:</label>
        <input type="text" class="form-control" v-model="user.first_name"/>
      </div>
      <div class="form-group">
        <label>Last Name:</label>
        <input type="text" class="form-control" v-model="user.last_name"/>
      </div>
      <div class="form-group">
        <label>Username:</label>
        <input type="text" class="form-control" v-model="user.username"/>
      </div>
      <div class="form-group">
        <label>Email:</label>
        <input type="text" class="form-control" v-model="user.email"/>
      </div>
      <input type="submit" class="btn btn-primary" value="Update"/>
    </form> <br>
    <button class="btn btn-primary" v-on:click="destroyUser()">Delete</button>
  </div>
</template>

<style>
</style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      errors: [],
      user: {},
    };
  },
  created: function () {
    axios.get(`/api/users/${this.$route.params.id}`).then((response) => {
      this.user = response.data;
    });
  },
  methods: {
    editUser: function () {
      var userData = {
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        username: this.user.username,
        email: this.user.email,
      };
      axios
        .patch(`/api/users/${this.$route.params.id}`, userData)
        .then((response) => {
          this.$router.push(`/users/${this.user.id}`);
        })
        .catch((error) => {
          console.log(error.response.data.errors);
          this.errors = error.response.data.errors;
        });
    },
    destroyUser: function () {
      if (confirm("Are you sure you want to delete your account?")) {
        axios
          .delete(`/api/users/${this.user.id}`)
          .then((response) => {
            console.log("Successfully destroyed", response.data);
            this.$router.push("/signup");
          })
          .catch((error) => {
            console.log(error.response.data.errors);
            this.errors = error.response.data.errors;
          });
      }
    },
  },
};
</script>