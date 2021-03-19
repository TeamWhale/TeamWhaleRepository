import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import PostForm from "../views/PostForm.vue";
import MyPage from "../views/MyPage.vue";
import Search from "../views/Search.vue";
import firebase from "firebase";
import "firebase/auth";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/Search",
    name: "Search",
    component: Search,
  },
  {
    path: "/PostForm",
    name: "PostForm",
    component: PostForm,
    beforeEnter: (to, from, next) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          next();
        } else {
          window.alert("ログインが必要です");
        }
      });
    },
  },
  {
    path: "/MyPage",
    name: "MyPage",
    component: MyPage,
    beforeEnter: (to, from, next) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          next();
        } else {
          window.alert("ログインが必要です");
        }
      });
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
