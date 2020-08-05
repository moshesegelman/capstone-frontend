<template>
  <div class="conversation-index">
    <section
      class="page-title-section2 bg-img cover-background"
      data-overlay-dark="7"
      data-background="img/slider/elements/header_penpot.png"
      style='background-image: url("img/slider/elements/header_penpot.png");'
    >
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h1>Which Subject Are You Looking to Study?</h1>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div id="container">
        <!-- start clients section -->
        <div class="section-heading">
          <h3>Conversations</h3>
        </div>
        <div class="container">
          <div class="stm_partners section-clients3">
            <div class="client-single" v-for="conversation in conversations">
              <div
                class="client-desc border border-dark padding-15px-top padding-30px-left padding-15px-bottom"
              >
                <div class="inner-title half">
                  <h2 class="client-title">
                    <router-link :to="`/conversations/${conversation.id}`">{{
                      conversation.partner.username
                    }}</router-link>
                  </h2>
                </div>
                <p>
                  <router-link :to="`/conversations/${conversation.id}`"
                    >{{ conversation.last_message.text }} |
                    <button
                      class="butn small"
                      v-on:click="destroyConversation(conversation)"
                    >
                      <i class="fa fa-trash" aria-hidden="true"></i></button
                  ></router-link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <!-- end clients section -->
      </div>
    </section>
  </div>
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
            this.$router.push("/conversations");
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
