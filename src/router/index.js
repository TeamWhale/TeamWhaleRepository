import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import PostForm from "../components/PostForm.vue";
import HomeRecipe from "../components/HomeRecipe.vue";
import HomePurchase from "../components/HomePurchase.vue";

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
