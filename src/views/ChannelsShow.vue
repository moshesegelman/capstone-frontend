<template>
  <div class="channel-show">
    <h1>Channel: {{ channel.name }}</h1>
    <h2> Creator: {{ channel.creator }}</h2>
    Messages
    <div v-for="message in messages">
        <h3>{{message.creator}}: {{ message.text }}</h3>
    </div>
    <div v-if="isCurrentUser()">
      <router-link :to="`/channels/${channel.id}/edit`">Edit Channel</router-link> |
      <button class="btn btn-primary" v-on:click="destroyChannel()">Delete</button>
    </div>
    
    <p>{{channel.user_id}}</p>
    
  </div>
</template>

<style>
</style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      channel: {},
      messages: {},
    };
  },
  created: function () {
    axios.get(`/api/channels/${this.$route.params.id}`).then((response) => {
      console.log("channels show");
      this.channel = response.data;
      this.messages = this.channel.messages;
      console.log(response.data);
    });
  },
  methods: {
    isCurrentUser: function () {
      // eslint-disable-next-line eqeqeq
      return localStorage.getItem("userId") == this.channel.user_id;
    },
    destroyChannel: function () {
      if (confirm("Are you sure you want to delete this recipe?")) {
        axios.delete(`/api/channels/${this.channel.id}`).then((response) => {
          console.log("Successfully destroyed", response.data);
          this.$router.push(
            `/api/subjects/${localStorage.getItem("subjectId")}`
          );
        });
      }
    },
  },
};
</script>