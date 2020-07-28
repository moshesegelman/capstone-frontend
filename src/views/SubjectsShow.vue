<template>
  <div class="subjects-show">
    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>
    <router-link to="/channels/new">Create a Channel</router-link>
    <div v-for="channel in channels">
      <h1>Name: {{ channel.name }}</h1>
      <h2>Details: {{ channel.details }}</h2>
      <router-link :to="`/channels/${channel.id}`">Click</router-link>
    </div>
  </div>
</template>

<style>
</style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      subject: {},
      channels: [],
      name: "",
      details: "",
      errors: [],
    };
  },
  created: function () {
    axios
      .get(`/api/subjects/${this.$route.params.id}`)
      .then((response) => {
        console.log("subject show");
        this.subject = response.data;
        localStorage.setItem("subjectId", response.data.id);
        this.channels = this.subject.channels;
        console.log(this.channels);
      })
      .catch((error) => {
        console.log(error.response.data.errors);
        this.errors = error.response.data.errors;
      });
  },
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
          this.channels.push(response.data);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>