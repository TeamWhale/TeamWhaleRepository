<template>
  <div class="home__wrapper">
    <Search />
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
    <br />
    <!-- ピックアップ表示 -->
    <h2>ピックアップ</h2>
    <!-- 「すべて」タブが押されているとき -->
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
    <!-- 「手作り」タブが押されているとき -->
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
    <!-- 「市販」タブが押されているとき -->
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
import Search from "../views/Search.vue";

export default {
  data() {
    return {
      allRecipe: [],
      Recipes: [],
      Purchases: [],
      allExpression: true,
      RecipesExpression: false,
      PurchasesExpression: false,
      isActive1: true,
      isActive2: false,
      isActive3: false,
    };
  },
  components: {
    Search,
  },
  methods: {
    search() {
      // alert("検索機能の実装調べます～byさき");
    },
    tabChange: function(num) {
      this.isActive = num;
    },
    switchAll() {
      this.allExpression = true;
      this.RecipesExpression = false;
      this.PurchasesExpression = false;
      this.isActive1 = true;
      this.isActive2 = false;
      this.isActive3 = false;
    },
    switchRecipes() {
      this.allExpression = false;
      this.RecipesExpression = true;
      this.PurchasesExpression = false;
      this.isActive1 = false;
      this.isActive2 = true;
      this.isActive3 = false;
    },
    switchPurchases() {
      this.allExpression = false;
      this.RecipesExpression = false;
      this.PurchasesExpression = true;
      this.isActive1 = false;
      this.isActive2 = false;
      this.isActive3 = true;
    },
  },
  mounted() {
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
.home__wrapper {
  height: 50px;
  justify-content: space-between;
  align-items: stretch;
  background-color: #fffacd;
}
.tab_items {
  align-items: center;
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
  margin: 175px 0 15px 15px;
}
</style>
