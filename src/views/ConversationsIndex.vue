<template>
  <div class="conversation-index">
    <div v-for="conversation in conversations">
      <h1>{{ conversation.partner.username }}: <router-link :to="`/conversations/${conversation.id}`">Click</router-link> </h1>
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
      conversations: [],
    };
  },
  created: function () {
    axios.get("api/conversations").then((response) => {
      this.conversations = response.data;
      console.log(this.conversations[1].messages);
    });
  },
  methods: {},
};
</script>