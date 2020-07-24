<template>
  <div class="channels-new">
    <form v-on:submit.prevent="createChannel()">
      <h1>New Channel</h1>
      <ul>
        <li class="text-danger" v-for="error in errors">{{ error }}</li>
      </ul>
      <div class="form-group">
        <label>Name:</label>
        <input type="text" class="form-control" v-model="name" />
      </div>
      <div class="form-group">
        <label>Details:</label>
        <input type="text" class="form-control" v-model="details" />
      </div>
      <input type="submit" class="btn btn-primary" value="Create"/>
    </form>
  </div>
</template>

<style>
</style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      message: "Welcome to Vue.js!",
      name: "",
      details: "",
      errors: [],
    };
  },
  created: function () {},
  methods: {
    createChannel: function () {
      var channelData = {
        name: this.name,
        details: this.details,
        subject_id: localStorage.getItem("subjectId"),
      };
      axios
        .post("api/channels", channelData)
        .then((response) => {
          this.$router.push(`/channels/${response.data.id}`);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>