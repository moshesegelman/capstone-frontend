<template>
  <div class="conversations-show">
    <h1>{{ conversation.partner.username }}</h1>
    <div v-for="message in messages">
      <h3>{{message.creator}}: {{message.text}}</h3>
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
      messages: [],
    };
  },
  created: function () {
    axios.get(`api/conversations/${this.$route.params.id}`).then((response) => {
      this.conversation = response.data;
      this.messages = this.conversation.messages;
    });
  },
  methods: {},
};
</script>