<template>
  <div>
    <NavBar />
    <router-view />
  </div>
</template>

<script>
import firebase from "firebase";
import NavBar from "@/components/NavBar.vue";

export default {
  data() {
    return {
      user: null,
    };
  },
  components: {
    NavBar,
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => (this.user = user));
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}
body {
  margin: 0;
}
</style>
