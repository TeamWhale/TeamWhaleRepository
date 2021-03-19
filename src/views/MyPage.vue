<template>
  <div class="home__bar">
    <div class="search_bar">
        <div>{{user}}さんでログイン済み</div>
      <div class="search_box">
        <input
          id="search_input"
          type="text"
          placeholder="キーワードを入力"
          v-model="search_keyword"
          required
        />
        <img
          v-on:click="search"
          id="search_icon"
          src="../assets/search_mark.png"
        />
      </div>
        <div v-on:click="signOut" class="nav__item nav__link">ログアウト</div>
    </div>
    <div class="tab_items">
      <div class="tab_item current nav__link" @click="switchAll">すべて</div>
      <div class="tab_item current nav__link" @click="switchRecipes">手作り</div>
      <div class="tab_item current nav__link" @click="switchPurchases">市販</div>
    </div>
    <br>
    <div v-if="allExpression" class="recom_items">
      <div class="recom_item" v-for="(all, index) in allRecipe" :key="index" :style="{ backgroundImage: 'url(' + all.imageURL + ')', backgroundSize: 'cover'}">
        <div class="recom_description">
          <div class="recom_name">{{all.title}}</div>
          <div class="recom_time">{{all.selected}}</div>
        </div>
      </div>   
    </div>

    <div v-if="RecipesExpression" class="recom_items">
      <div class="recom_item" v-for="(recipe, index) in Recipes" :key="index" :style="{ backgroundImage: 'url(' + recipe.imageURL + ')', backgroundSize: 'cover'}">
        <div class="recom_description">
          <div class="recom_name">{{recipe.title}}</div>
          <div class="recom_time">{{recipe.selected}}</div>
        </div>
      </div>   
    </div>

    <div v-if="PurchasesExpression" class="recom_items">
      <div class="recom_item" v-for="(purchase, index) in Purchases" :key="index" :style="{ backgroundImage: 'url(' + purchase.imageURL + ')',            backgroundSize: 'cover'}">
        <div class="recom_description">
          <div class="recom_name">{{purchase.title}}</div>
          <div class="recom_time">{{purchase.selected}}</div>
        </div>
      </div>   
    </div>
  </div>
</template>

<script>

import firebase from "firebase"
import "firebase/firestore"

export default {
  data() {
    return {
      search_keyword: "",
      recipes: [{ title: "", image: "", rank: "", time: "" }],
      allRecipe: [],
      Recipes:[],
      Purchases: [],
      allExpression: true,
      RecipesExpression: false,
      PurchasesExpression: false,
      user: "",
    };
  },
  methods: {
    search() {
      // alert("検索機能の実装調べます～byさき");
      
    },
    switchAll(){
      this.allExpression = true
      this.RecipesExpression = false
      this.PurchasesExpression = false
    },
    switchRecipes(){
      this.allExpression = false
      this.RecipesExpression = true
      this.PurchasesExpression = false
    },
    switchPurchases(){
      this.allExpression = false
      this.RecipesExpression = false
      this.PurchasesExpression = true
    },
    signOut(){
      firebase.auth().signOut()
      this.$router.push("/")
    },
  },
  mounted(){
    firebase.auth().onAuthStateChanged(user =>{
      if(user){
        //すべてにpush
        firebase.firestore().collection("recipe").orderBy("createdAt", "desc").get()
        .then(snapshot =>{
          snapshot.docs.forEach(doc =>{
            if(doc.data().uid === user.uid){
              this.allRecipe.push({
                ...doc.data()
              })
            }
          })
        })
        //手作りにpush
        firebase.firestore().collection("recipe").orderBy("createdAt", "desc").get()
        .then(snapshot =>{
          snapshot.docs.forEach(doc =>{
            if(doc.data().uid === user.uid){
              if(doc.data().type === "手作り"){
                this.Recipes.push({
                  ...doc.data()
                })
              }
            }
          })
        })
        //市販にpush
        firebase.firestore().collection("recipe").orderBy("createdAt", "desc").get()
        .then(snapshot =>{
          snapshot.docs.forEach(doc =>{
            if(doc.data().uid === user.uid){
              if(doc.data().type === "市販"){
                this.Purchases.push({
                  ...doc.data()
                })
              }
            }
          })
        })
        this.user = user.displayName
      }
    })
  },
};
</script>

<style>
* {
  color: #3f1f1a;
}
.search_bar {
  display: flex;
  width: 100%;
  height: 54px;
  background-color: #ff9900;
  justify-content: center;
}
.search_box {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 500px;
  background-color: #f8f5f4;
  border-radius: 4px;
  margin-top: 7px;
  padding: 5px;
}
#search_input {
  font-size: 16px;
  width: 100%;
  background-color: #f8f5f4;
  border: none;
  outline: none;
  box-sizing: border-box;
}
#searchInput:focus {
  border: #f8f5f4;
}
#search_icon {
  height: 30px;
  width: 30px;
  padding: 5px 5px;
}
#search_icon:hover {
  cursor: pointer;
}
.tab_items {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  background-color: #fcf5ea;
}
.tab_item {
  width: 130px;
  height: 100%;
  text-align: center;
  font-size: 16px;
  padding-top: 13px;
}
.current {
  background-color: #fce7c7;
}
h2 {
  margin-left: 3%;
  font-weight: normal;
}
.recom_items {
  display: flex;
  flex-wrap: wrap;
  margin-left: 3%;
  margin-right: 3%;
  margin-bottom: 25px;
}
.recom_item {
  width: 250px;
  height: 250px;
  border-radius: 8px;
  margin-left: 3%;
  margin-bottom: 20px;
  background-color: #c4c4c4;
  color: #000;
}
.recom_description {
  margin: 175px 0 15px 15px;
}
.home__bar {
  height: 50px;
  justify-content: space-between;
  align-items: stretch;
  background-color: #fffacd;
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
  background-color: #ffdb99;
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
