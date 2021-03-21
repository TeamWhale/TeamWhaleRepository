<template>
  <div class="nav__bar">
    <router-link to="/" class="nav__logo nav__link">レシピサイト</router-link>
    <div class="nav__items">
      <router-link to="/PostForm" v-if="user" class="nav__item nav__link nav__submit"
      >投稿</router-link>
      <router-link to="/MyPage" v-if="user" class="nav__item nav__link"
      >マイページ</router-link>
      <div v-on:click="signOut" v-if="user" class="nav__item nav__link">ログアウト</div>
      <div v-on:click="signIn" v-else class="nav__item nav__link login_button">ログイン</div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import "firebase/auth"

export default {
  data() {
    return {
      user: false,
    };
  },
  methods: {
    signIn() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider)
    },
    signOut(){
      firebase.auth().signOut()
      this.$router.push("/")
    },
  },
  mounted(){
    firebase.auth().onAuthStateChanged(user =>{
      if(user){
        this.user = true
      } else{
        this.user = false
      }
    })
  }
};
</script>

<style scoped>
.nav__bar {
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  background-color: #fff;
}
.nav__link {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #3f1f1a;
  text-decoration: none;
  font-size: 14px;
}
.nav__link:visited {
  color: #3f1f1a;
}
.nav__link:hover {
  font-weight: bold;
  border-bottom: 2px solid #f90;
  /* cursor: pointer; なぜbutton要素の「ログイン」にはcursor:pointer;が効かない？ */
}
.nav__submit {
  font-size: 18px;
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
  /*border-left: 1px solid #3f1f1a;  nav要素間の敷居*/
}
.login_button {
  border: none;
  background-color: #fff;
}
</style>
