<template>
  <div class="channel-show">
    <section
      class="page-title-section2 bg-img cover-background"
      data-overlay-dark="7"
      data-background="/img/slider/elements/header_penpot.png"
      style='background-image: url("/img/slider/elements/header_penpot.png");'
    >
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h1>Channel Name: {{ channel.name }}</h1>
            <h1>Details: {{ channel.details }}</h1>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="container">
        <div class="blogs">
          <div class="row">
            <!--  start blog left-->
            <div class="posts">
              <!--  start post-->

              <div class="line-title">
                <h3>Messages | Channel Owner: {{ channel.creator }}</h3>
              </div>

              <!--  start comment-->
              <div
                class="comments-area  padding-20px-top padding-30px-right padding-10px-left"
              >
                <div v-for="message in messages">
                  <div class="comment-box ">
                    <div class="author-thumb"></div>
                    <div class="comment-info">
                      <h6>
                        <a>{{ message.creator }}</a>
                      </h6>
                      <p>
                        {{ message.text }}
                      </p>
                      <div v-if="!isMessageUser(message)">
                        <div class="reply">
                          <a href="#!" v-on:click="createConversation(message)">
                            Message
                            <i class="fa fa-paper-plane" aria-hidden="true"></i>
                          </a>
                          |
                          <a href="#!" v-on:click="createFriend(message)">
                            Send Friend Request
                            <i
                              class="fa fa-user-friends"
                              aria-hidden="true"
                            ></i>
                          </a>
                        </div>
                      </div>
                      <div v-if="isMessageUser(message)">
                        <div class="reply">
                          <a href="#!" v-on:click="destroyMessage(message)">
                            Delete Message
                            <i class="fa fa-trash" aria-hidden="true"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- end comment-->

              <!--  start form-->
              <div
                class="comment-form border border-dark margin-15px-top padding-30px-top padding-30px-left padding-30px-right padding-30px-bottom"
              >
                <div class="line-title">
                  <h3>Send Message</h3>
                </div>

                <form method="post">
                  <div class="row">
                    <div class="col-sm-12">
                      <div class="form-group">
                        <textarea
                          id="message"
                          name="message"
                          rows="1"
                          v-model="text"
                          placeholder="Tell us a few words"
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    class="butn theme"
                    v-on:click="createMessage()"
                  >
                    <span>Send</span>
                  </button>
                </form>
              </div>
              <!--  end form-->
            </div>
            <!--  end blog left-->
          </div>
        </div>
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
      errors: [],
      ownerId: 0,
      conversations: [],
      channel: {},
      messages: [],
      text: "",
    };
  },
  created: function() {
    axios.get(`/api/channels/${this.$route.params.id}`).then((response) => {
      console.log("channels show");
      this.channel = response.data;
      console.log(this.channel);
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
    isChannelUser: function() {
      // eslint-disable-next-line eqeqeq
      return localStorage.getItem("userId") == this.channel.user_id;
    },
    isMessageUser: function(message) {
      // eslint-disable-next-line eqeqeq
      return localStorage.getItem("userId") == message.user_id;
    },
    destroyMessage: function(message) {
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
    createMessage: function() {
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
    createConversation: function(message) {
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
    createFriend: function(message) {
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
