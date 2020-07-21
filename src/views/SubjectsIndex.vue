<template>
  <div class="subject-index">
    <h1>{{ message }}</h1>
    <div v-for="subject in subjects">
      <h1>Subejct: {{ subject.name }}</h1>
      <img :src="subject.image_url" >
    </div>
  </div>
</template>

<style>
img {
  width: 40em;
  height: 15em;
}
</style>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      message: "Welcome to Subject Index",
      subjects: []
    };
  },
  created: function() {
    axios.get("/api/subjects").then(response => {
      this.subjects = response.data;
      console.log(this.subjects);
    });
  },
  methods: {}
};
</script>