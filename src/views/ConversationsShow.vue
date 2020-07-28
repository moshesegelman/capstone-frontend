<template>
  <div class="conversations-show">
    <h1>{{ partner.username }}</h1>
    <div v-for="message in messages">
      <h3>{{message.creator}}: {{message.text}}</h3>
        <div v-if="isMessageUser(message)">
          <button class="btn btn-primary" v-on:click="destroyMessage(message)">Delete</button>
        </div>  
    </div>
    <div v-if="$parent.isLoggedIn()">
      Message: <input type="text" v-model="text"> 
      <button v-on:click="createMessage()">Send</button>
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
      conversation: {},
      partner: {},
      messages: [],
      text: "",
    };
  },
  created: function () {
    axios.get(`api/conversations/${this.$route.params.id}`).then((response) => {
      this.conversation = response.data;
      this.messages = this.conversation.messages;
      this.partner = this.conversation.partner;
    });
  },
  methods: {
    isMessageUser: function (message) {
      // eslint-disable-next-line eqeqeq
      return localStorage.getItem("userId") == message.user_id;
    },
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
      conversation_id: this.conversation.id,
      user_id: localStorage.getItem("userId"),
    };
    axios.post("/api/messages", messageData).then((response) => {
      this.$router.push(`/conversations/${this.conversation.id}`);
    });
  },
};
</script>