<template>
  <div class="channels-edit">
    <form v-on:submit.prevent="editChannel()">
      <h1>editChannel</h1>
      <ul>
        <li class="text-danger" v-for="error in errors">{{ error }}</li>
      </ul>
      <div class="form-group">
        <label>Name:</label>
        <input type="text" class="form-control" v-model="channel.name" />
      </div>
      <div class="form-group">
        <label>Details:</label>
        <input type="text" class="form-control" v-model="channel.details" />
      </div>
      <input type="submit" class="btn btn-primary" value="Update"/>
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
      channel: {},
      errors: [],
    };
  },
  created: function () {
    axios.get(`/api/channels/${this.$route.params.id}`).then((response) => {
      this.channel = response.data;
    });
  },
  methods: {
    editChannel: function () {
      var channelData = {
        name: this.channel.name,
        details: this.channel.details,
      };
      axios
        .patch(`/api/channels/${this.$route.params.id}`, channelData)
        .then((response) => {
          this.$router.push(`/channels/${response.data.id}`);
        })
        .catch((error) => {
          console.log(error.response.data.errors);
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>