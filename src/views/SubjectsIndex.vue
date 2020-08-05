<template>
  <div class="subject-index">
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
      <div class="container">
        <div class="section-heading">
          <h3>Subjects</h3>
        </div>

        <div class="row">
          <div
            class="col-lg-4 col-md-6 margin-40px-bottom sm-margin-35px-bottom"
            v-for="subject in orderBy(
              filterBy(subjects, nameFilter),
              sortAttribute
            )"
            v-bind:key="subject.id"
          >
            <article class="card blog-card">
              <div class="card-img">
                <img :src="subject.image_url" alt="" />
              </div>
              <div class="card-body">
                <div class="d-block text-muted margin-10px-bottom small">
                  <!-- April 10,
                        <script>
                          document.write(new Date().getFullYear());
                        </script>
                        2020 -->
                </div>
                <h3>
                  <a href="blog-post.html">{{ subject.name }}</a>
                </h3>
                <p>
                  Exercitation ullamco laboris nisi ut aliquip ex ea commodo.
                </p>
                <span class="read-more"
                  ><router-link :to="`/subjects/${subject.id}`"
                    >Channels</router-link
                  ></span
                >
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
  </div>
</template>

<style></style>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";
export default {
  mixins: [Vue2Filters.mixin],
  data: function() {
    return {
      subjects: [],
      errors: [],
      nameFilter: "",
      sortAttribute: "name",
      // $parent.pageTitle: "Subjects"
    };
  },
  created: function() {
    axios
      .get("/api/subjects")
      .then((response) => {
        localStorage.removeItem("subjectId");
        this.subjects = response.data;
        console.log(this.subjects);
      })
      .catch((error) => {
        console.log(error.response.data.errors);
        this.errors = error.response.data.errors;
      });
  },
  methods: {},
};
</script>
