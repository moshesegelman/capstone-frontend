<template>
  <div class="conversation-index">
    <div v-for="conversation in conversations">
      <h1>{{ conversation.partner.username }}: {{conversation.last_message.text}}  <router-link :to="`/conversations/${conversation.id}`">Click</router-link> <button class="btn btn-primary" v-on:click="destroyConversation(conversation)">Delete Conversation</button></h1>
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
      conversations: [],
    };
  },
  created: function () {
    axios.get("api/conversations").then((response) => {
      console.log(response.data);
      this.conversations = response.data;
    });
    // var cable = ActionCable.createConsumer("ws://localhost:3000/cable");
    // cable.subscriptions.create("ConversationsChannel", {
    //   connected: () => {
    //     // Called when the subscription is ready for use on the server
    //     console.log("Connected to ConversationsChannel");
    //   },
    //   disconnected: () => {
    //     // Called when the subscription has been terminated by the server
    //   },
    //   received: (data) => {
    //     // Called when there's incoming data on the websocket for this channel
    //     console.log("Data from ConversationsChannel:", data);
    //     console.log(data);
    //     this.conversations.push(data); // update the messages in real time
    //   },
    // });
  },
  methods: {
    destroyConversation: function (conversation) {
      if (confirm("Are you sure you want to delete this conversation?")) {
        axios
          .delete(`/api/conversations/${conversation.id}`)
          .then((response) => {
            console.log("Successfully destroyed", response.data);
            var index = this.conversations.indexOf(conversation);
            this.conversations.splice(index, 1);
          })
          .catch((error) => {
            console.log(error.response.data.errors);
            this.errors = error.response.data.errors;
          });
      }
    },
  },
};
</script>