<template>
  <div class="nav__bar">
    <router-link to="/" class="nav__logo"
      >レシピサイト
      <!-- <img src="../assets/service-name.png" width="500px" height="38px"/> -->
    </router-link>
    <div class="nav__items">
      <router-link to="/PostForm" v-if="user" class="nav__submit"
        ><img src="../assets/post-button.png" width="160px" height="48px"
      /></router-link>
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
  width: 1000px;
  height: 70px;
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
  justify-content: center;
  align-items: center;
  font-size: 18px;
  margin-right: 10px;
  padding-top: 9px;
}
.nav__submit:hover {
  cursor: pointer;
  opacity: 0.8;
  transition-duration: 0.3s;
}
</style>
