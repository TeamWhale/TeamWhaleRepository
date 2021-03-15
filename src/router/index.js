import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import PostForm from "../views/PostForm.vue";
import MyPage from "../views/MyPage.vue";
import HomeRecipe from "../views/HomeRecipe.vue";
import HomePurchase from "../views/HomePurchase.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/PostForm",
    name: "PostForm",
    component: PostForm,
  },
  {
    path: "/MyPage",
    name: "MyPage",
    component: MyPage,
  },
  {
    path: "/HomeRecipe",
    name: "HomeRecipe",
    component: HomeRecipe,
  },
  {
    path: "/HomePurchase",
    name: "HomePurchase",
    component: HomePurchase,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
