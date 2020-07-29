<template>
  <div class="conversation-index">
    <div v-for="conversation in conversations">
      
      <h1>{{ conversation.partner.username }}: <div v-for="messages in conversations.messages">{{messages.text}}</div>  <router-link :to="`/conversations/${conversation.id}`">Click</router-link> </h1>
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
  },
  methods: {},
};
</script>