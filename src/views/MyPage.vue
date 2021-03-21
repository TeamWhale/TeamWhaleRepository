<template>
  <div class="home__bar">
    <div class="search_bar">
      <div>{{ user }}さんでログイン済み</div>
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
    <!-- 自分の投稿 -->
    <h2>{{ user }}さんの投稿</h2>
    <div v-if="allExpression" class="pickup_items">
      <div
        class="pickup_item"
        v-for="(all, index) in allRecipe"
        :key="index"
        :style="{
          backgroundImage: 'url(' + all.imageURL + ')',
          backgroundSize: 'cover',
        }"
      >
        <div class="pickup_description">
          <div class="pickup_name">{{ all.title }}</div>
          <div class="pickup_time">{{ all.selected }}</div>
        </div>
      </div>
    </div>

    <div v-if="RecipesExpression" class="pickup_items">
      <div
        class="pickup_item"
        v-for="(recipe, index) in Recipes"
        :key="index"
        :style="{
          backgroundImage: 'url(' + recipe.imageURL + ')',
          backgroundSize: 'cover',
        }"
      >
        <div class="pickup_description">
          <div class="pickup_name">{{ recipe.title }}</div>
          <div class="pickup_time">{{ recipe.selected }}</div>
        </div>
      </div>
    </div>

    <div v-if="PurchasesExpression" class="pickup_items">
      <div
        class="pickup_item"
        v-for="(purchase, index) in Purchases"
        :key="index"
        :style="{
          backgroundImage: 'url(' + purchase.imageURL + ')',
          backgroundSize: 'cover',
        }"
      >
        <div class="pickup_description">
          <div class="pickup_name">{{ purchase.title }}</div>
          <div class="pickup_time">{{ purchase.selected }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import "firebase/firestore";

export default {
  data() {
    return {
      search_keyword: "",
      recipes: [{ title: "", image: "", rank: "", time: "" }],
      allRecipe: [],
      Recipes: [],
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
    switchAll() {
      this.allExpression = true;
      this.RecipesExpression = false;
      this.PurchasesExpression = false;
    },
    switchRecipes() {
      this.allExpression = false;
      this.RecipesExpression = true;
      this.PurchasesExpression = false;
    },
    switchPurchases() {
      this.allExpression = false;
      this.RecipesExpression = false;
      this.PurchasesExpression = true;
    },
    signOut() {
      firebase.auth().signOut();
      this.$router.push("/");
    },
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        //すべてにpush
        firebase
          .firestore()
          .collection("recipe")
          .orderBy("createdAt", "desc")
          .get()
          .then((snapshot) => {
            snapshot.docs.forEach((doc) => {
              if (doc.data().uid === user.uid) {
                this.allRecipe.push({
                  ...doc.data(),
                });
              }
            });
          });
        //手作りにpush
        firebase
          .firestore()
          .collection("recipe")
          .orderBy("createdAt", "desc")
          .get()
          .then((snapshot) => {
            snapshot.docs.forEach((doc) => {
              if (doc.data().uid === user.uid) {
                if (doc.data().type === "手作り") {
                  this.Recipes.push({
                    ...doc.data(),
                  });
                }
              }
            });
          });
        //市販にpush
        firebase
          .firestore()
          .collection("recipe")
          .orderBy("createdAt", "desc")
          .get()
          .then((snapshot) => {
            snapshot.docs.forEach((doc) => {
              if (doc.data().uid === user.uid) {
                if (doc.data().type === "市販") {
                  this.Purchases.push({
                    ...doc.data(),
                  });
                }
              }
            });
          });
        this.user = user.displayName;
      }
    });
  },
};
</script>

<style>
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
  color: #3f1f1a;
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
.home__bar {
  height: 50px;
  justify-content: space-between;
  align-items: stretch;
  background-color: #fffacd;
}
</style>
