<template>
  <div class="users-show">
    <!-- Modal -->
    <div
      class="modal fade"
      id="editUserModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Edit Account</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <!-- start contact section -->

            <div class="container">
              <div class="row">
                <div class="col-lg-12">
                  <!-- start form here -->

                  <form
                    class="quform"
                    action="quform/getin-touch-one.php"
                    method="post"
                    enctype="multipart/form-data"
                    onclick=""
                  >
                    <div class="quform-elements">
                      <div class="row">
                        <!-- Begin Text input element -->
                        <div class="col-md-6">
                          <div class="quform-element form-group">
                            <div class="quform-input">
                              First Name
                              <input
                                id="name"
                                type="text"
                                name="name"
                                v-model="user.first_name"
                              />
                            </div>
                          </div>
                        </div>
                        <!-- End Text input element -->
                        <!-- Begin Text input element -->
                        <div class="col-md-6">
                          <div class="quform-element form-group">
                            <div class="quform-input">
                              Last Name
                              <input
                                id="name"
                                type="text"
                                name="name"
                                v-model="user.last_name"
                              />
                            </div>
                          </div>
                        </div>
                        <!-- End Text input element -->
                        <!-- Begin Text input element -->
                        <div class="col-md-6">
                          <div class="quform-element form-group">
                            <div class="quform-input">
                              User Name
                              <input
                                id="name"
                                type="text"
                                name="name"
                                v-model="user.username"
                              />
                            </div>
                          </div>
                        </div>
                        <!-- End Text input element -->

                        <!-- Begin Text input element -->
                        <div class="col-md-6">
                          <div class="quform-element form-group">
                            <div class="quform-input">
                              email
                              <input
                                id="email"
                                type="text"
                                name="email"
                                v-model="user.email"
                              />
                            </div>
                          </div>
                        </div>
                        <!-- End Text input element -->
                      </div>
                    </div>
                  </form>

                  <!-- end form here -->
                </div>
              </div>
            </div>

            <!-- end contact section -->
          </div>
          <div class="modal-footer">
            <button type="button" class="butn" data-dismiss="modal">
              Close
            </button>
            <button
              type="button"
              class="butn theme"
              data-dismiss="modal"
              v-on:click="editUser()"
            >
              Save changes
            </button>
            <button
              type="button"
              class="butn"
              data-dismiss="modal"
              v-on:click="destroyUser()"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>

    <section
      class="page-title-section2 bg-img cover-background"
      data-overlay-dark="7"
      data-background="/img/slider/elements/header_flowerpot.png"
      style='background-image: url("/img/slider/elements/header_flowerpot.png");'
    >
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h1>Welcome {{ user.first_name }} {{ user.last_name }}!</h1>
            <br />
            <button
              type="button"
              class="butn theme"
              data-toggle="modal"
              data-target="#editUserModal"
            >
              Edit Account
            </button>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div id="container">
        <div class="container">
          <div class="section-heading">
            <h3>{{ user.username }}s Channels</h3>
          </div>
          <div class="row">
            <div
              class="col-lg-4 col-md-6 margin-40px-bottom sm-margin-35px-bottom"
              v-for="channel in channels"
              v-bind:key="channel.id"
            >
              <article class="card blog-card">
                <div class="card-body">
                  <h3>Channel: {{ channel.name }}</h3>
                  <p>
                    {{ channel.details }}
                  </p>
                </div>
                <div class="card-footer">
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <div class="d-flex align-items-center">
                      <div class="margin-15px-left">
                        <span class="font-size14"
                          ><span class="font-weight-bold"
                            ><button
                              type="button"
                              class="butn theme"
                              data-toggle="modal"
                              data-target="#editChannelModal"
                              v-on:click="defineChannel(channel)"
                            >
                              <i class="fas fa-edit"></i>
                            </button>
                            |
                            <button
                              v-on:click="destroyChannel(channel)"
                              class="butn"
                            >
                              <i class="fas fa-trash"></i>
                            </button>
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal fade"
        id="editChannelModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-body">
              <!-- start request form -->
              <section
                class="parallax"
                data-overlay-dark="7"
                data-background="img/bg/bg1.jpg"
              >
                <div class="container">
                  <div class="section-heading white">
                    <h3>Edit Channel</h3>
                  </div>

                  <div class="row">
                    <div class="col-lg-10 center-col">
                      <div class="contact-form-box">
                        <!-- start form here -->

                        <form
                          class="quform"
                          action="quform/request-call.php"
                          method="post"
                          enctype="multipart/form-data"
                          onclick=""
                        >
                          <div class="quform-elements">
                            <div class="row">
                              <!-- Begin Text input element -->
                              <div class="col-md-6">
                                <div class="quform-element form-group">
                                  <div class="quform-input">
                                    <input
                                      id="name"
                                      type="text"
                                      name="name"
                                      v-model="channelName"
                                    />
                                  </div>
                                </div>
                              </div>
                              <!-- End Text input element -->

                              <!-- Begin Text input element -->
                              <div class="col-md-6">
                                <div class="quform-element form-group">
                                  <div class="quform-input">
                                    <input
                                      id="details"
                                      type="text"
                                      name="details"
                                      v-model="channelDetails"
                                    />
                                  </div>
                                </div>
                              </div>
                              <!-- End Text input element -->
                            </div>
                          </div>
                        </form>

                        <!-- end form here -->
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <!-- end request form -->
            </div>
            <div class="modal-footer">
              <button type="button" class="butn theme" data-dismiss="modal">
                Close
              </button>
              <button
                type="button"
                class="butn"
                data-dismiss="modal"
                v-on:click="editChannel()"
              >
                Edit Channel
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  <!-- <div class="users-show">
    <h1>{{ user.first_name }} {{ user.last_name }}</h1>
    <router-link :to="`/users/${user.id}/edit`">Edit User</router-link> <br />
    Channels
    <div v-for="channel in channels">
      <h3>{{ channel.name }}</h3>
      <router-link :to="`/channels/${channel.id}/edit`"
        >Edit Channel</router-link
      >
      |
      <button v-on:click="destroyChannel(channel)">Delete Channel</button>
    </div>
  </div> -->
</template>

<style></style>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      eroors: [],
      user: {},
      channels: [],
      channelId: 0,
      channelName: "",
      channelDetails: "",
      userId: localStorage.getItem("userId"),
    };
  },
  created: function() {
    axios.get(`/api/users/${this.userId}`).then((response) => {
      this.user = response.data;
      this.channels = this.user.channels;
    });
  },
  methods: {
    destroyChannel: function(channel) {
      if (confirm("Are you sure you want to delete this channel?")) {
        axios
          .delete(`/api/channels/${channel.id}`)
          .then((response) => {
            console.log("Successfully destroyed", response.data);
            var index = this.channels.indexOf(channel);
            this.channels.splice(index, 1);
          })
          .catch((error) => {
            console.log(error.response.data.errors);
            this.errors = error.response.data.errors;
          });
      }
    },
    editUser: function() {
      var userData = {
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        username: this.user.username,
        email: this.user.email,
      };
      axios
        .patch(`/api/users/${this.$route.params.id}`, userData)
        .then((response) => {
          this.$router.push(`/users/${this.user.id}`);
        })
        .catch((error) => {
          console.log(error.response.data.errors);
          this.errors = error.response.data.errors;
        });
    },
    destroyUser: function() {
      if (confirm("Are you sure you want to delete your account?")) {
        axios
          .delete(`/api/users/${this.user.id}`)
          .then((response) => {
            console.log("Successfully destroyed", response.data);
            delete axios.defaults.headers.common["Authorization"];
            localStorage.removeItem("jwt");
            this.$router.push("/signup");
            // this.$router.push("/signup");
          })
          .catch((error) => {
            console.log(error.response.data.errors);
            this.errors = error.response.data.errors;
          });
      }
    },
    editChannel: function() {
      var channelData = {
        name: this.channelName,
        details: this.channelDetails,
      };
      axios
        .patch(`/api/channels/${this.channelId}`, channelData)
        .then((response) => {
          console.log("channel uodated");
        })
        .catch((error) => {
          console.log(error.response.data.errors);
          this.errors = error.response.data.errors;
        });
    },
    defineChannel: function(channel) {
      this.channelId = channel.id;
      this.channelName = channel.name;
      this.channelDetails = channel.details;
    },
  },
};
</script>
