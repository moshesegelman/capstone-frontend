<template>
  <div class="subjects-index">
    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>
    <div class="form-group">
      <input class="form-control" v-model="nameFilter" list="titles" type="text" placeholder="Search">
    </div>
    <datalist id="titles">
      <option v-for="subject in subjects">{{subject.name }}</option>
    </datalist>
    <h1>{{ message }}</h1>
    <div v-for="subject in orderBy(filterBy(subjects, nameFilter), sortAttribute)" v-bind:key="subject.id">
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
import Vue2Filters from "vue2-filters";
export default {
  mixins: [Vue2Filters.mixin],
  data: function () {
    return {
      message: "Welcome to Subject Index",
      subjects: [],
      errors: [],
      nameFilter: "",
      sortAttribute: "name",
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