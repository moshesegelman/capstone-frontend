<template>
  <div class="channel-show">
    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>
    <h1>Channel: {{ channel.name }}</h1>
    <h2> Creator: {{ channel.creator }}</h2>
    Messages
    <div v-for="message in messages">
      <div v-if="!isMessageUser(message)">
          <button class="btn btn-primary" v-on:click="createConversation(message)">Message</button>
      </div>
      <div v-if="!isMessageUser(message)">
        <button class="btn btn-primary" v-on:click="createFriend(message)">Friend Request</button>
      </div>
      <h3>{{ message.creator}}: {{ message.text }} 
      <div v-if="isMessageUser(message)">
        <button class="btn btn-primary" v-on:click="destroyMessage(message)">Delete</button>
      </div>  
     </h3>
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
import ActionCable from "actioncable";
export default {
  data: function () {
    return {
      errors: [],
      conversations: [],
      channel: {},
      messages: [],
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
      console.log(this.messages);
    });
    axios.get("api/conversations").then((response) => {
      console.log(response.data);
      this.conversations = response.data;
    });
    var cable = ActionCable.createConsumer("ws://localhost:3000/cable");
    cable.subscriptions.create("MessagesChannel", {
      connected: () => {
        // Called when the subscription is ready for use on the server
        console.log("Connected to MessagesChannel");
      },
      disconnected: () => {
        // Called when the subscription has been terminated by the server
      },
      received: (data) => {
        // Called when there's incoming data on the websocket for this channel
        console.log("Data from MessagesChannel:", data);
        console.log(data);
        this.messages.push(data); // update the messages in real time
      },
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
    destroyMessage: function (message) {
      if (confirm("Are you sure you want to delete this Message?")) {
        axios
          .delete(`/api/messages/${message.id}`)
          .then((response) => {
            console.log("Successfully destroyed", response.data);
            var index = this.messages.indexOf(message);
            this.messages.splice(index, 1);
          })
          .catch((error) => {
            this.errors = error.response.data.errors;
          });
      }
    },
    createMessage: function () {
      var messageData = {
        text: this.text,
        channel_id: this.channel.id,
      };
      axios
        .post("/api/messages", messageData)
        .then((response) => {
          console.log(response.data);
          // this.messages.push(response.data);
          this.text = "";
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    createConversation: function (message) {
      var conversationData = {
        recipient_id: message.user_id,
      };
      axios
        .post("/api/conversations", conversationData)
        .then((response) => {
          console.log(response.data);
          this.$router.push(`/conversations/${response.data.id}`);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    createFriend: function (message) {
      var friendData = {
        user2_id: message.user_id,
      };
      axios
        .post("/api/friends", friendData)
        .then((response) => {
          console.log(response.data);
          // put flash message to say request sent
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>