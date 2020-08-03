<template>
  <section class="blogs">
    <div class="container">
      <div class="row">
        <!--  start blog left-->
        <div class="posts">
          <!--  start post-->

          <!--  start comment-->
          <div class="comments-area">
            <div class="line-title">
              <h3>{{ conversation.partner.username }}</h3>
            </div>
            <div v-for="message in messages">
              <div class="comment-box">
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
                        <i class="fa fa-reply" aria-hidden="true"></i>
                        Message
                      </a>
                      |
                      <a href="" v-on:click="createFriend(message)">
                        <i class="fa fa-reply" aria-hidden="true"></i>
                        Send Friend Request
                      </a>
                    </div>
                  </div>
                  <div v-if="isMessageUser(message)">
                    <div class="reply">
                      <a href="#!" v-on:click="destroyMessage(message)">
                        <i class="fa fa-reply" aria-hidden="true"></i>
                        Delete Message
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- end comment-->

          <!--  start form-->
          <div class="comment-form">
            <div class="line-title">
              <h3>Message</h3>
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
                <span>Send Message</span>
              </button>
            </form>
          </div>
          <!--  end form-->
        </div>
        <!--  end blog left-->
      </div>
    </div>
  </section>
  <!-- <div class="conversations-show">
    <h1>{{ partner.username }}</h1>
    <div v-for="message in messages">
      <h3>{{message.creator}}: {{message.text}}</h3>
        <div v-if="isMessageUser(message)">
          <button class="btn btn-primary" v-on:click="destroyMessage(message)">Delete</button>
        </div>  
    </div>
    Message: <input type="text" v-model="text"> 
    <button v-on:click="createMessage()">Send</button>
  </div> -->
</template>

<style></style>

<script>
import axios from "axios";
import ActionCable from "actioncable";
export default {
  data: function() {
    return {
      errors: [],
      conversation: {},
      partner: {},
      messages: [],
      text: "",
    };
  },
  created: function() {
    axios.get(`api/conversations/${this.$route.params.id}`).then((response) => {
      this.conversation = response.data;
      this.messages = this.conversation.messages;
      this.partner = this.conversation.partner;
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
        this.messages.push(data); // update the messages in real time
      },
    });
  },
  methods: {
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
            console.log(error.response.data.errors);
            this.errors = error.response.data.errors;
          });
      }
    },
    createMessage: function() {
      var messageData = {
        text: this.text,
        conversation_id: this.conversation.id,
      };
      axios
        .post("/api/messages", messageData)
        .then((response) => {
          // this.messages.push(response.data);
          this.text = "";
        })
        .catch((error) => {
          console.log(error.response.data.errors);
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
