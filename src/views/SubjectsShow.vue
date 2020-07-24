<template>
  <div class="subjects-show">
     <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>
    <h1>{{ message }}</h1>
    <div v-for="channel in channels">
      <h1>Name: {{ channel.name }}</h1>
      <h2>Details: {{ channel.details }}</h2>
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
      message: "Welcome to Subject Show!",
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
        this.channels = this.subject.channels;
        console.log(this.subject);
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