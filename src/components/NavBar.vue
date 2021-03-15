<template>
  <div class="nav__bar">
    <router-link to="/" class="nav__logo nav__link">レシピサイト</router-link>
    <div class="nav__items">
      <router-link to="/MyPage" class="nav__item nav__link">マイページ</router-link>
      <router-link to="/PostForm" class="nav__item nav__link">投稿</router-link>
      <button v-on:click="signIn" class="nav__item nav__link">ログイン</button>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      user: null,
    };
  },
  methods: {
    signIn() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithRedirect(provider)
    },
  },
};
</script>

<style scoped>
.nav__bar {
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  background-color: #fff;
  border-bottom: 2px solid #fffacd;
}
.nav__link {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #111;
  text-decoration: none;
}
.nav__link:visited {
  color: #111;
}
.nav__link:hover {
  font-weight: bold;
  color: #000;
  border-bottom: 2px solid #f90;
}
.nav__logo {
  font-size: 140%;
  /*width: 15%;  横幅*/
  margin-left: 3%;
}
.nav__items {
  display: flex;
}
.nav__item {
  width: 100px;
  /*border-left: 1px solid #111;  nav要素間の敷居*/
}
</style>
