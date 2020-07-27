<template>
  <div class="channel-show">
    <h1>Channel: {{ channel.name }}</h1>
    <h2> Creator: {{ channel.creator }}</h2>
    Messages
    <div v-for="message in messages">
      <button class="btn btn-primary" v-on:click="createConversation(message)">Meesage</button>
        <h3>{{message.creator}}: {{ message.text }} 
        <div v-if="isMessageUser(message)">
          <button class="btn btn-primary" v-on:click="destroyMessage(message)">Delete</button>
        </div>  
        </h3>
    </div>
    <div v-if="$parent.isLoggedIn()">
      Message: <input type="text" v-model="text"> 
      <button v-on:click="createMessage()">Send</button>
    </div>
    <div v-if="isChannelUser()">
      <router-link :to="`/channels/${channel.id}/edit`">Edit Channel</router-link> |
      <button class="btn btn-primary" v-on:click="destroyChannel()">Delete</button>
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
      channel: {},
      messages: {},
      text: "",
      subjectId: localStorage.getItem("subjectId"),
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
    isChannelUser: function () {
      // eslint-disable-next-line eqeqeq
      return localStorage.getItem("userId") == this.channel.user_id;
    },
    isMessageUser: function (message) {
      // eslint-disable-next-line eqeqeq
      return localStorage.getItem("userId") == message.user_id;
    },
    destroyChannel: function () {
      if (confirm("Are you sure you want to delete this channel?")) {
        axios.delete(`/api/channels/${this.channel.id}`).then((response) => {
          console.log("Successfully destroyed", response.data);
          this.$router.push(
            `/api/subjects/${localStorage.getItem("subjectId")}`
          );
        });
      }
    },
    destroyMessage: function (message) {
      if (confirm("Are you sure you want to delete this Message?")) {
        axios.delete(`/api/message/${message.id}`).then((response) => {
          console.log("Successfully destroyed", response.data);
          this.$router.push(`/api/channels/${this.channel.id}`);
        });
      }
    },
    createMessage: function () {
      var messageData = {
        text: this.text,
        channel_id: this.channel.id,
        user_id: localStorage.getItem("userId"),
      };
      axios.post("/api/messages", messageData).then((response) => {
        this.$router.push(`/subjects/${this.subjectId}`);
      });
    },
    createConversation: function (message) {
      var conversationData = {
        sender_id: localStorage.getItem("userId"),
        recipient_id: message.user_id,
      };
      axios.post("/api/conversation", conversationData).then((response) => {
        this.$router.push(`/conversations/${response.data.id}`);
      });
    },
  },
};
</script>