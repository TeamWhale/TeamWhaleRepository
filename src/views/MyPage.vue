<template>
  <div class="home_wrapper">
    <div class="search_wrapper">
      <!-- 検索欄（アイコンクリックで結果表示） -->
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
    <div class="tab_wrapper">
      <div class="tab_mini-wrapper">
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
          <div class=" current tab_user">{{ user }}さんでログイン済み</div>
        </div>
      </div>
    </div>
    <Detail v-if="detailFlg" v-bind:detail="Contents" />
    <Edit v-if="editFlg" v-bind:editDet="Contents" />
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
            <div class="star">
              お手軽さ
              <star-rating
                :item-size="15"
                :read-only="true"
                :show-rating="false"
                v-model="recipe.rating"
              ></star-rating>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 自分の投稿 -->
    <!-- 「すべて」タブが押されているとき -->
    <div class="body_wrapper" v-if="allExpression">
      <h2>自分の投稿</h2>
      <div class="pickup_items">
        <div
          class="pickup_item"
          @click="detailWindow(all)"
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
            <div class="star">
              お手軽さ
              <star-rating
                :item-size="15"
                :read-only="true"
                :show-rating="false"
                v-model="all.rating"
              ></star-rating>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 「手作り」タブが押されているとき -->
    <div class="body_wrapper" v-if="RecipesExpression">
      <h2>自分の投稿</h2>
      <div class="pickup_items">
        <div
          class="pickup_item"
          @click="detailWindow(recipe)"
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
            <div class="star">
              お手軽さ
              <star-rating
                :item-size="15"
                :read-only="true"
                :show-rating="false"
                v-model="recipe.rating"
              ></star-rating>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 「市販」タブが押されているとき -->
    <div class="body_wrapper" v-if="PurchasesExpression">
      <h2>自分の投稿</h2>
      <div class="pickup_items">
        <div
          class="pickup_item"
          @click="detailWindow(purchase)"
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
            <div class="star">
              お手軽さ
              <star-rating
                :item-size="15"
                :read-only="true"
                :show-rating="false"
                v-model="purchase.rating"
              ></star-rating>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import firebase from "firebase";
import "firebase/firestore";
import Detail from "@/components/Detail.vue";
import Edit from "@/components/Edit.vue";
import { StarRating } from "vue-rate-it";
import Footer from "../components/Footer.vue";

export default {
  components: {
    Detail,
    Edit,
    StarRating,
    Footer,
  },
  data() {
    return {
      keyword: "",
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
      detailFlg: false,
      editFlg: false,
      keyword: "",
    };
  },
  methods: {
    searchTabchange() {
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
    detailWindow(Cont) {
      this.Contents = Cont;
      this.Contents.fromMyPage = true;
      this.detailFlg = true;
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
                this.recipes.push({
                  ...doc.data(),
                  id: doc.id,
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
                    id: doc.id,
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
                    id: doc.id,
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
                    id: doc.id,
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
          recipes.push(recipe);
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
.home__wrapper {
  height: 50px;
  justify-content: space-between;
  align-items: stretch;
  background-color: #fffacd;
}
.tab_wrapper {
  width: 100%;
  min-width: 950px;
  background-color: #fcf5ea;
}
.tab_mini-wrapper {
  margin-left: 3%;
}
.tab_items {
  display: flex;
  width: 950px;
  height: 55px;
  color: #3f1f1a;
  margin-right: auto;
  margin-left: auto;
}
.tab_item {
  /* justify-content: center; */
  width: 140px;
  height: 100%;
  text-align: center;
  text-decoration: none;
  padding-top: 15px;
}
.tab_item:hover {
  font-weight: bold;
  background-color: #fce7c7;
  cursor: pointer;
}
.tab_user {
  width: auto;
  height: 100%;
  text-align: center;
  font-size: 16px;
  padding-top: 13px;
  padding-left: 20px;
  padding-right: 20px;
  margin-left: auto;
  color: #111;
  text-decoration: none;
}
.active {
  background-color: #fce7c7;
  font-weight: bold;
}
.body_wrapper {
  width: 950px;
  margin-right: auto;
  margin-left: auto;
}
h2 {
  margin-left: 3%;
  font-weight: normal;
}
.pickup_items {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 25px;
}
.pickup_item {
  width: calc((950px - 3 * 3%) / 3);
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
