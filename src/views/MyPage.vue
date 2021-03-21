<template>
  <div class="home__bar">
    <div class="search_bar">
      <div>{{ user }}さんでログイン済み</div>
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
        <div v-on:click="signOut" class="nav__item nav__link">ログアウト</div>
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
    <!-- 自分の投稿 -->
    <h2>{{ user }}さんの投稿</h2>
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

export default {
  data() {
    return {
      search_keyword: "",
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
      user: "",
      keyword: "",
    };
  },
  methods: {
    searchTabchange() {
      // alert("検索機能、実装途中byさき");
      this.allExpression = false;
      this.RecipesExpression = false;
      this.PurchasesExpression = false;
      this.SearchCondition = true;
      this.isActive1 = false;
      this.isActive2 = false;
      this.isActive3 = false;
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
      this.isActive1 = false;
      this.isActive2 = false;
      this.isActive3 = true;
    },
    signOut() {
      firebase.auth().signOut();
      this.$router.push("/");
    },
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // 「すべて」を受け取る（検索用）
        firebase
          .firestore()
          .collection("recipe")
          .orderBy("createdAt", "desc")
          .get()
          .then((snapshot) => {
            snapshot.docs.forEach((doc) => {
              if (doc.data().uid === user.uid) {
                this.recipe.push({
                  ...doc.data(),
                });
              }
            });
          }),
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
    // 検索ぺージでfirebaseに登録されているレシピを表示
    firebase
      .firestore()
      .collection("recipe")
      .orderBy("createdAt", "desc")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          this.recipes.push({
            ...doc.data(),
          });
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
