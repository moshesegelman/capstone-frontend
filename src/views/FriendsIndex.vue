<template>
  <div class="friends-index">
    <h1>Friends</h1>
    <div v-for="friend in friends">
      <h3>{{ friend.user.username }}</h3>
       <button  v-on:click="createConversation(friend)">Message</button>
       <button  v-on:click="deleteFriend(friend)">unfriend</button>
    </div>
    <h1>Friend Requests</h1>
    <div v-for="friend in pendingFriends">
        <h3>{{ friend.user.username}}</h3>
      <div v-if="!isRequestUser(friend)">
        <button v-on:click="friendsUpdate(friend)">Accept</button>
        <button v-on:click="deleteFriend(friend)">Decline</button>
      </div>
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
      all_friends: [],
      friends: [],
      pendingFriends: [],
      senderId: 0,
    };
  },
  created: function () {
    axios.get("/api/friends").then((response) => {
      this.all_friends = response.data;
      console.log(this.all_friends);
      this.friends = this.all_friends.friends;
      console.log(this.friends);
      this.pendingFriends = this.all_friends.pending_friends;
      console.log(this.pendingFriends);
    });
    // var cable = ActionCable.createConsumer("ws://localhost:3000/cable");
    // cable.subscriptions.create("FriendsChannel", {
    //   connected: () => {
    //     // Called when the subscription is ready for use on the server
    //     console.log("Connected to FriendsChannel");
    //   },
    //   disconnected: () => {
    //     // Called when the subscription has been terminated by the server
    //   },
    //   received: (data) => {
    //     // Called when there's incoming data on the websocket for this channel
    //     console.log("Data from FriendsChannel:", data);
    //     console.log(data);
    //     this.all_friends.push(data); // update the messages in real time
    //     this.friends = this.all_friends.friends;
    //     this.pendingFriends = this.all_friends.pending_friends;
    //   },
    // });
  },
  methods: {
    friendsUpdate: function (friend) {
      console.log(friend.user.id);
      axios.patch(`/api/friends/${friend.id}`).then((response) => {
        console.log(response.data);
      });
    },
    isRequestUser: function (friend) {
      // eslint-disable-next-line eqeqeq
      return localStorage.getItem("userId") == friend.sender_id;
    },
    createConversation: function (friend) {
      var conversationData = {
        recipient_id: friend.user.id,
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
    deleteFriend: function (friend) {
      if (confirm("Are you sure you want to decline this friend request?")) {
        axios
          .delete(`/api/friends/${friend.id}`)
          .then((response) => {
            console.log("Successfully destroyed", response.data);
          })
          .catch((error) => {
            this.errors = error.response.data.errors;
          });
      }
    },
  },
};
</script>