import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import MyPage from "../components/MyPage.vue";
import PostForm from "../components/PostForm.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/MyPage",
    name: "MyPage",
    component: MyPage,
  },
  {
    path: "/PostForm",
    name: "PostForm",
    component: PostForm,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
