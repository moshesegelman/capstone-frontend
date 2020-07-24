<template>
  <div class="subjects-index">
    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>
    <h1>{{ message }}</h1>
    <div v-for="subject in subjects">
      <h1>Subejct: {{ subject.name }}</h1>
      <img :src="subject.image_url" > <br>
      <router-link :to="`/subjects/${subject.id}`">click</router-link>
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
  data: function () {
    return {
      message: "Welcome to Subject Index",
      subjects: [],
      errors: [],
    };
  },
  created: function () {
    axios
      .get("/api/subjects")
      .then((response) => {
        localStorage.removeItem("subjectId");
        this.subjects = response.data;
        console.log(this.subjects);
      })
      .catch((error) => {
        console.log(error.response.data.errors);
        this.errors = error.response.data.errors;
      });
  },
  methods: {},
};
</script>