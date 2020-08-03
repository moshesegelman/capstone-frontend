<template>
  <section>
    <div class="container">
      <div class="section-heading">
        <h3>Channels</h3>
        <!-- Button trigger modal -->
        <button
          type="button"
          class="btn btn-primary"
          data-toggle="modal"
          data-target="#channelNewModal"
        >
          Create Channel
        </button>

        <!-- Modal -->
        <div
          class="modal fade"
          id="channelNewModal"
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
                  data-overlay-dark="8"
                  data-background="img/bg/bg1.jpg"
                >
                  <div class="container">
                    <div class="section-heading white">
                      <h3>New Channel</h3>
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
                                        v-model="name"
                                        placeholder="Channel Name"
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
                                        v-model="details"
                                        placeholder="Channel Details "
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
                  v-on:click="createChannel()"
                >
                  Create Channel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div
          class="col-lg-4 col-md-6 margin-40px-bottom sm-margin-35px-bottom"
          v-for="channel in filterBy(channels, nameFilter)"
          v-bind:key="channel.id"
        >
          <article class="card blog-card">
            <div class="card-body">
              <div class="d-block text-muted margin-10px-bottom small">
                <!-- April 10,
                <script>
                  document.write(new Date().getFullYear());
                </script>
                2020 -->
              </div>
              <h3>
                <a href="blog-post.html">{{ channel.name }}</a>
              </h3>
              <p>{{ channel.details }}</p>
              <span class="read-more"
                ><router-link :to="`/channels/${channel.id}`"
                  >Go to Channel</router-link
                ></span
              >
            </div>
            <div class="card-footer">
              <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-center">
                  <div class="margin-15px-left">
                    <span class="font-size14"
                      ><span class="font-weight-bold">Created By: </span
                      >{{ channel.creator }}</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>

      <div class="row margin-50px-top sm-margin-35px-top">
        <div class="col-12 no-padding sm-padding-15px-lr">
          <div
            class="pagination text-small text-uppercase text-extra-dark-gray"
          >
            <ul>
              <li>
                <a href="#!"
                  ><i
                    class="fas fa-long-arrow-alt-left margin-5px-right xs-display-none"
                  ></i>
                  Prev</a
                >
              </li>
              <li class="active"><a href="#!">1</a></li>
              <li><a href="#!">2</a></li>
              <li><a href="#!">3</a></li>
              <li>
                <a href="#!"
                  >Next
                  <i
                    class="fas fa-long-arrow-alt-right margin-5px-left xs-display-none"
                  ></i
                ></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- <div class="subjects-show">
    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>
    <div class="form-group">
      <input class="form-control" v-model="nameFilter" list="titles" type="text" placeholder="Search">
    </div>
    <datalist id="titles">
      <option v-for="channel in channels">{{ channel.name }}</option>
    </datalist>
    <router-link to="/channels/new">Create a Channel</router-link>
    <form v-on:submit.prevent="createChannel()">
      <h1>New Channel</h1>
      <div class="form-group">
        <label>Name:</label>
        <input type="text" class="form-control" v-model="name" />
      </div>
      <div class="form-group">
        <label>Details:</label>
        <input type="text" class="form-control" v-model="details" />
      </div>
      <input type="submit" class="btn btn-primary" value="Create"/>
    </form>
    <div v-for="channel in filterBy(channels, nameFilter)" v-bind:key="channel.id">
      <h1>Name: {{ channel.name }}</h1>
      <h2>Details: {{ channel.details }}</h2>
      <router-link :to="`/channels/${channel.id}`">Click</router-link>
    </div>
  </div> -->
</template>

<style></style>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";
import ActionCable from "actioncable";
export default {
  mixins: [Vue2Filters.mixin],
  data: function() {
    return {
      subject: {},
      channels: [],
      name: "",
      details: "",
      errors: [],
      nameFilter: "",
    };
  },
  created: function() {
    axios
      .get(`/api/subjects/${this.$route.params.id}`)
      .then((response) => {
        console.log("subject show");
        this.subject = response.data;
        localStorage.setItem("subjectId", response.data.id);
        this.channels = this.subject.channels;
        console.log(this.channels);
      })
      .catch((error) => {
        console.log(error.response.data.errors);
        this.errors = error.response.data.errors;
      });
    // var cable = ActionCable.createConsumer("ws://localhost:3000/cable");
    // cable.subscriptions.create("ChannelsChannel", {
    //   connected: () => {
    //     // Called when the subscription is ready for use on the server
    //     console.log("Connected to ChannelsChannel");
    //   },
    //   disconnected: () => {
    //     // Called when the subscription has been terminated by the server
    //   },
    //   received: (data) => {
    //     // Called when there's incoming data on the websocket for this channel
    //     console.log("Data from ChannelsChannel:", data);
    //     this.channels.push(data); // update the messages in real time
    //   },
    // });
  },
  methods: {
    createChannel: function() {
      var channelData = {
        name: this.name,
        details: this.details,
        subject_id: this.subject.id,
      };
      axios
        .post("api/channels", channelData)
        .then((response) => {
          // this.channels.push(response.data);
          this.name = "";
          this.details = "";
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
