<template>
  <div class="subjects-show">
    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>
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
  methods: {},
};
</script>