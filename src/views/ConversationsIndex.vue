<template>
  <section>
    <div id="container">
      <!-- start clients section -->
      <section>
        <div class="container">
          <div class="stm_partners section-clients3">
            <div class="client-single" v-for="conversation in conversations">
              <div class="client-img">
                <img width="180" src="img/partners/client-01.png" alt="" />
              </div>
              <div class="client-desc">
                <div class="inner-title half">
                  <h5 class="client-title">
                    {{ conversation.partner.username }}
                  </h5>
                </div>
                <p>
                  {{ conversation.last_message.text }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- end clients section -->
    </div>
  </section>
  <!-- <div class="conversation-index">
    <div v-for="conversation in conversations">
      <h1>{{ conversation.partner.username }}: {{conversation.last_message.text}}  <router-link :to="`/conversations/${conversation.id}`">Click</router-link> <button class="btn btn-primary" v-on:click="destroyConversation(conversation)">Delete Conversation</button></h1>
    </div>
  </div> -->
</template>

<style></style>

<script>
import axios from "axios";
import ActionCable from "actioncable";
export default {
  data: function() {
    return {
      conversations: [],
    };
  },
  created: function() {
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
    destroyConversation: function(conversation) {
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
