import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import SubjectsIndex from "../views/SubjectsIndex.vue";
import SubjectsShow from "../views/SubjectsShow.vue";
import ChannelsShow from "../views/ChannelsShow.vue";
import ChannelsNew from "../views/ChannelsNew.vue";
import ChannelsEdit from "../views/ChannelsEdit.vue";
import UsersShow from "../views/UsersShow.vue";
import UsersEdit from "../views/UsersEdit.vue";
import ConversationsIndex from "../views/ConversationsIndex.vue";
import ConversationsShow from "../views/ConversationsShow.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/about", name: "about", component: About },
  { path: "/signup", name: "signup", component: Signup },
  { path: "/login", name: "login", component: Login },
  { path: "/logout", name: "logout", component: Logout },
  { path: "/subjects", name: "subjects-index", component: SubjectsIndex },
  { path: "/subjects/:id", name: "subjects-show", component: SubjectsShow },
  { path: "/channels/new", name: "channels-new", component: ChannelsNew },
  { path: "/channels/:id", name: "channels-show", component: ChannelsShow },
  { path: "/channels/:id/edit", name: "channels-edit", component: ChannelsEdit },
  { path: "/users/:id", name: "users-show", component: UsersShow },
  { path: "/users/:id/edit", name: "users-edit", component: UsersEdit },
  { path: "/conversations", name: "conversation-index", component: ConversationsIndex },
  { path: "/conversations/:id", name: "conversation-show", component: ConversationsShow },
];

// {
//   path: '/about',
//   name: 'About',
//   // route level code-splitting
//   // this generates a separate chunk (about.[hash].js) for this route
//   // which is lazy-loaded when the route is visited.
//   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
// }
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
