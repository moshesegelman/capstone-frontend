<template>
  <div class="subjects-show">
    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>
    <div class="form-group">
      <input class="form-control" v-model="nameFilter" list="titles" type="text" placeholder="Search">
    </div>
    <datalist id="titles">
      <option v-for="channel in channels">{{channel.name }}</option>
    </datalist>
    <router-link to="/channels/new">Create a Channel</router-link>
    <form v-on:submit.prevent="createChannel()">
      <h1>New Channel</h1>
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
      nameFilter: "",
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
        subject_id: this.subject.id,
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