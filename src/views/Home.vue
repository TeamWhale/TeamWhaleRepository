<template>
  <div class="home__wrapper">
    <!-- 検索欄（アイコンクリックで結果表示） -->
    <div class="search_wrapper">
      <div class="search_box">
        <input
          id="search_input"
          type="text"
          placeholder="キーワードを入力"
          v-model="keyword"
          v-on:keyup.enter="searchTabchange"
          required
        />
        <img
          v-on:click="searchTabchange"
          id="search_icon"
          src="../assets/search_mark.png"
        />
      </div>
    </div>
    <!-- すべて／手作り／市販 切り替えタブ -->
    <div class="tab_items">
      <div
        @click="switchAll"
        class="tab_item"
        v-bind:class="{ active: isActive1 }"
      >
        すべて
      </div>
      <div
        @click="switchRecipes"
        class="tab_item"
        v-bind:class="{ active: isActive2 }"
      >
        手作り
      </div>
      <div
        @click="switchPurchases"
        class="tab_item"
        v-bind:class="{ active: isActive3 }"
      >
        市販
      </div>
    </div>
    <!-- 検索結果表示 -->
    <div v-if="SearchCondition" class="body_wrapper">
      <h2>検索結果</h2>
      <div class="pickup_items">
        <div
          v-for="recipe in searchFunction"
          :key="recipe.id"
          :style="{
            backgroundImage: 'url(' + recipe.imageURL + ')',
            backgroundSize: 'cover',
          }"
          class="pickup_item"
        >
          <div class="pickup_description">
            <div v-text="recipe.title" class="pickup_name">
              {{ recipe.title }}
            </div>
            <div v-text="recipe.selected" class="pickup_time">
              {{ recipe.selected }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- ピックアップ表示 -->
    <!-- 「すべて」タブが押されているとき -->
    <div class="body_wrapper" v-if="allExpression">
      <h2>ピックアップ</h2>
      <div class="pickup_items">
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
    </div>
    <!-- 「手作り」タブが押されているとき -->
    <div class="body_wrapper" v-if="RecipesExpression">
      <h2>ピックアップ</h2>
      <div class="pickup_items">
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
    </div>
    <!-- 「市販」タブが押されているとき -->
    <div class="body_wrapper" v-if="PurchasesExpression">
      <h2>ピックアップ</h2>
      <div class="pickup_items">
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
  </div>
</template>

<script>
import firebase from "firebase";
import "firebase/firestore";
// import Search from "../views/Search.vue";

export default {
  data() {
    return {
      recipes: [],
      allRecipe: [],
      Recipes: [],
      Purchases: [],
      allExpression: true,
      RecipesExpression: false,
      PurchasesExpression: false,
      SearchCondition: false,
      isActive1: true,
      isActive2: false,
      isActive3: false,
      text: "",
      keyword: "",
    };
  },
  components: {
    // Search,
  },
  methods: {
    // アイコンクリックで検索表示する関数
    searchTabchange() {
      // alert("検索機能、実装途中byさき");
      this.allExpression = false;
      this.RecipesExpression = false;
      this.PurchasesExpression = false;
      this.isActive1 = false;
      this.isActive2 = false;
      this.isActive3 = false;
      this.SearchCondition = true;
    },
    // すべて／手作り／市販のスタイルを変える関数
    tabChange: function(num) {
      this.isActive = num;
    },
    switchAll() {
      this.allExpression = true;
      this.RecipesExpression = false;
      this.PurchasesExpression = false;
      this.SearchCondition = false;
      this.isActive1 = true;
      this.isActive2 = false;
      this.isActive3 = false;
    },
    switchRecipes() {
      this.allExpression = false;
      this.RecipesExpression = true;
      this.PurchasesExpression = false;
      this.SearchCondition = false;
      this.isActive1 = false;
      this.isActive2 = true;
      this.isActive3 = false;
    },
    switchPurchases() {
      this.allExpression = false;
      this.RecipesExpression = false;
      this.PurchasesExpression = true;
      this.SearchCondition = false;
      this.isActive1 = false;
      this.isActive2 = false;
      this.isActive3 = true;
    },
  },
  mounted() {
    // 「すべて」を受け取る
    firebase
      .firestore()
      .collection("recipe")
      .orderBy("createdAt", "desc")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          this.recipe.push({
            ...doc.data(),
          });
        });
      }),
      // 「すべて」を受け取る
      firebase
        .firestore()
        .collection("recipe")
        .orderBy("createdAt", "desc")
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            this.allRecipe.push({
              ...doc.data(),
            });
          });
        }),
      // 「手作り」を受け取る
      firebase
        .firestore()
        .collection("recipe")
        .orderBy("createdAt", "desc")
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            if (doc.data().type === "手作り") {
              this.Recipes.push({
                ...doc.data(),
              });
            }
          });
        }),
      // 「市販」を受け取る
      firebase
        .firestore()
        .collection("recipe")
        .orderBy("createdAt", "desc")
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            if (doc.data().type === "市販") {
              this.Purchases.push({
                ...doc.data(),
              });
            }
          });
        });
  },
  computed: {
    searchFunction: function() {
      // データを絞り込む
      const recipes = [];
      for (const i in this.recipes) {
        const recipe = this.recipes[i];
        if (recipe.title.indexOf(this.keyword) !== -1) {
          // !== ～ →「～と異なる」、-1は
          recipes.push(recipe);
          // return this.recipe.slice(0, 3); //3つだけ表示
        }
      }
      return recipes;
    },
  },
  created() {
    // 検索のやつページが読み込まれたらすぐにfirebaseに登録されているレシピを表示
    firebase
      .firestore()
      .collection("recipe")
      .orderBy("createdAt", "desc")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          if (doc.data().title !== "手作り") {
            this.recipes.push({
              ...doc.data(),
            });
          }
        });
      });
  },
};
</script>

<style>
.home__wrapper {
  height: 50px;
  justify-content: space-between;
  align-items: stretch;
  background-color: #fffacd;
}
.tab_items {
  align-items: center;
  color: #3f1f1a;
}
.tab_item {
  display: flex;
  justify-content: center;
  height: 100%;
  text-decoration: none;
}
.tab_item:hover {
  font-weight: bold;
  background-color: #fce7c7;
  cursor: pointer;
}
.active {
  background-color: #fce7c7;
  font-weight: bold;
}
h2 {
  margin-left: 3%;
  font-weight: normal;
}
.pickup_items {
  display: flex;
  flex-wrap: wrap;
  margin-left: 3%;
  margin-right: 3%;
  margin-bottom: 25px;
}
.pickup_item {
  width: 250px;
  height: 250px;
  border-radius: 8px;
  margin-left: 3%;
  margin-bottom: 20px;
  background-color: #c4c4c4;
}
.pickup_description {
  display: inline-block;
  font-size: 15px;
  /* font-weight: bold; */
  /* 白文字黒シャドー */
  /* color: #fff;
  text-shadow: 2px 2px 10px #777, -2px 2px 10px #777, 2px -2px 10px #777,
    -2px -2px 10px #777; */
  /* 白文字黒シャドー */
  color: #3f1f1a;
  font-weight: bold;
  text-shadow: 2px 2px 10px #f8f3f1, -2px 2px 10px #f8f3f1,
    2px -2px 10px #f8f3f1, -2px -2px 10px #f8f3f1;
  margin: 175px 0 15px 15px;
}
</style>
