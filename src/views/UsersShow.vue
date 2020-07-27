<template>
  <div class="users-show">
    <h1>{{ user.first_name }} {{ user.last_name }}</h1> 
    <router-link :to="`/users/${user.id}/edit`">Edit User</router-link> <br>
    Channels
    <div v-for="channel in channels">
      <h3>{{channel.name}}</h3>
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
      message: "Welcome to User Show",
      user: {},
      channels: {},
      userId: localStorage.getItem("userId"),
    };
  },
  created: function () {
    axios.get(`/api/users/${this.userId}`).then((response) => {
      this.user = response.data;
      this.channels = this.user.channels;
    });
  },
  methods: {},
};
</script>