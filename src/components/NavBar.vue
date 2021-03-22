<template>
  <div class="nav__bar">
    <router-link to="/" class="nav__logo">レシピサイト</router-link>
    <a>一人暮らしの食事を共有するサイト</a>
    <div class="nav__items">
      <router-link to="/PostForm" v-if="user" class="nav__item nav__submit"
        >投稿</router-link
      >
      <router-link to="/MyPage" v-if="user" class="nav__item "
        >マイページ</router-link
      >
      <div v-on:click="signOut" v-if="user" class="nav__item login_button">
        ログアウト
      </div>
      <div v-on:click="signIn" v-else class="nav__item login_button">
        ログイン
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import "firebase/auth";

export default {
  data() {
    return {
      user: false,
    };
  },
  methods: {
    signIn() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider);
    },
    signOut() {
      firebase.auth().signOut();
      this.$router.push("/");
    },
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = true;
      } else {
        this.user = false;
      }
    });
  },
};
</script>

<style scoped>
.nav__bar {
  width: 950px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  background-color: #fff;
  margin-right: auto;
  margin-left: auto;
}
.nav__items {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  font-size: 14px;
  display: flex;
}
.nav__item {
  width: 100px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #3f1f1a;
  text-decoration: none;
  font-size: 14px;
}
.nav__item:hover {
  font-weight: bold;
  border-bottom: 2px solid #f90;
  background-color: #ffdb99;
  cursor: pointer;
}
.nav__logo {
  width: 150px;
  height: 100%;
  display: flex;
  font-size: 140%;
  align-items: center;
  margin-left: 3%;
  color: #3f1f1a;
  text-decoration: none;
}
.nav__submit {
  font-size: 18px;
}
a {
  margin-top: 1px;
}
</style>
