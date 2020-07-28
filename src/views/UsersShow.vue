<template>
  <div class="users-show">
    <h1>{{ user.first_name }} {{ user.last_name }}</h1> 
    <router-link :to="`/users/${user.id}/edit`">Edit User</router-link> <br>
    Channels
    <div v-for="channel in channels">
      <h3>{{channel.name}}</h3>
      <router-link :to="`/channels/${channel.id}/edit`">Edit Channel</router-link> |
      <button class="btn btn-primary" v-on:click="destroyChannel(channel)">Delete Channel</button>
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
      channels: [],
      userId: localStorage.getItem("userId"),
    };
  },
  created: function () {
    axios.get(`/api/users/${this.userId}`).then((response) => {
      this.user = response.data;
      this.channels = this.user.channels;
    });
  },
  methods: {
    destroyChannel: function (channel) {
      if (confirm("Are you sure you want to delete this channel?")) {
        axios.delete(`/api/channels/${channel.id}`).then((response) => {
          console.log("Successfully destroyed", response.data);
          var index = this.channels.indexOf(channel);
          this.channels.splice(index, 1);
        });
      }
    },
  },
};
</script>