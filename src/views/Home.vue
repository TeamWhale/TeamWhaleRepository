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
        </div>
      </div>
    </div>
    <Detail v-if="detailFlg" v-bind:detail="Contents" />
    <!-- おすすめ表示 -->
    <div class="recom_wrapper">
      <div class="recom_title_left">
        <h2 class="recom_title">Meal for One とは</h2>
        <div class="recom_title_description">
          「自炊をしてみたいけどハードルが高い...」<br />「自炊のレパートリーを増やしたい！」<br />「今夜何を食べよう？」
          <br />という一人暮らしさんのために<br />一人暮らしさんのリアルな食事を共有し合うサイトです
        </div>
      </div>
      <carousel
        :autoplay="true"
        :loop="true"
        :speed="2000"
        :autoplayTimeout="5000"
        paginationColor="#d1c9c8"
        paginationActiveColor="#a9a4a4"
        :perPage="1"
        :centerMode="true"
        :scrollPerPage="false"
      >
        <slide
          v-for="recomPost in recomPosts.slice(0, 6)"
          :key="recomPost.id"
          :style="{
            backgroundImage: 'url(' + recomPost.imageURL + ')',
            backgroundSize: 'cover',
          }"
          class="recom_item"
        >
          <div @click="detailWindow(recomPost)" class="pickup_description">
            <div class="pickup_name">
              {{ recomPost.title }}
            </div>
            <div class="pickup_time">
              {{ recomPost.selected }}
            </div>
            <div class="star">
              お手軽さ
              <star-rating
                :item-size="15"
                :read-only="true"
                :show-rating="false"
                v-model="recomPost.rating"
              ></star-rating>
            </div>
          </div>
        </slide>
      </carousel>
    </div>
    <!-- 検索結果表示 -->
    <div v-if="SearchCondition" class="body_wrapper">
      <h2>検索結果</h2>
      <div class="pickup_items">
        <div
          @click="detailWindow(recipe)"
          v-for="recipe in searchFunction"
          :key="recipe.id"
          :style="{
            backgroundImage: 'url(' + recipe.imageURL + ')',
            backgroundSize: 'cover',
          }"
          class="pickup_item"
        >
          <div class="pickup_description">
            <div class="pickup_name">
              {{ recipe.title }}
            </div>
            <div class="pickup_time">
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
    <!-- 新着投稿表示 -->
    <!-- 「すべて」タブが押されているとき -->
    <div class="body_wrapper" v-if="allExpression">
      <h2>新着投稿</h2>
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
      <h2>新着投稿</h2>
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
      <h2>新着投稿</h2>
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
import Footer from "../components/Footer.vue";
import Detail from "@/components/Detail.vue";
import { StarRating } from "vue-rate-it";
import { Carousel, Slide } from "vue-carousel";

export default {
  components: {
    Detail,
    StarRating,
    Footer,
    Carousel,
    Slide,
  },
  data() {
    return {
      recomPosts: [],
      recipes: [],
      allRecipe: [],
      Recipes: [],
      Purchases: [],
      Contents: "",
      allExpression: true,
      RecipesExpression: false,
      PurchasesExpression: false,
      SearchCondition: false,
      isActive1: true,
      isActive2: false,
      isActive3: false,
      text: "",
      keyword: "",
      detailFlg: false,
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
      this.keyword = "";
    },
    switchRecipes() {
      this.allExpression = false;
      this.RecipesExpression = true;
      this.PurchasesExpression = false;
      this.SearchCondition = false;
      this.isActive1 = false;
      this.isActive2 = true;
      this.isActive3 = false;
      this.keyword = "";
    },
    switchPurchases() {
      this.allExpression = false;
      this.RecipesExpression = false;
      this.PurchasesExpression = true;
      this.SearchCondition = false;
      this.isActive1 = false;
      this.isActive2 = false;
      this.isActive3 = true;
      this.keyword = "";
    },
    detailWindow(Cont) {
      this.Contents = Cont;
      this.Contents.fromMyPage = false;
      this.detailFlg = true;
    },
  },
  mounted() {
    // 「おすすめ」を受け取る
    firebase
      .firestore()
      .collection("recipe")
      .orderBy("createdAt", "desc")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          this.recomPosts.push({
            ...doc.data(),
            id: doc.id,
          });
        });
      }),
      // 「すべて」を受け取る（検索用）
      firebase
        .firestore()
        .collection("recipe")
        .orderBy("createdAt", "desc")
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            this.recipes.push({
              ...doc.data(),
              id: doc.id,
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
              id: doc.id,
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
                id: doc.id,
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
                id: doc.id,
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
          recipes.push(recipe);
        }
      }
      return recipes;
    },
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
.search_wrapper {
  display: flex;
  width: 100%;
  min-width: 1000px;
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
  margin: 7px auto 7px auto;
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
.tab_wrapper {
  width: 100%;
  min-width: 1000px;
  background-color: #fcf5ea;
}
.tab_mini-wrapper {
  margin-left: 4%;
}
.tab_items {
  display: flex;
  width: 1000px;
  height: 55px;
  color: #3f1f1a;
  margin-right: auto;
  margin-left: auto;
}
.tab_item {
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
.active {
  background-color: #fce7c7;
  font-weight: bold;
}
.recom_wrapper {
  width: 1000px;
  display: flex;
  margin: 50px auto 0 auto;
  color: #3f1f1a;
}
.recom_title_left {
  width: 550px;
  margin-left: 3%;
}
.recom_title {
  margin-left: 3%;
}
.recom_title_description {
  line-height: 28px;
  margin-left: 10%;
  font-size: 13px;
}
.VueCarousel {
  width: calc((1000px - 3 * 3%) / 3);
  height: 320px;
}
.VueCarousel-wrapper,
.VueCarousel-inner,
.VueCarousel-slide {
  width: 100%;
  height: 100% !important;
  border-radius: 8px;
}
.VueCarousel-slide .slider-inner {
  height: 100%;
  display: flex;
}
.recom_item {
  width: 100%;
  height: 250px;
}
.recom_item:hover {
  cursor: pointer;
  opacity: 0.7;
  transition-duration: 0.3s;
}

.body_wrapper {
  width: 1000px;
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
  width: calc((1000px - 3 * 3%) / 3);
  height: 250px;
  border-radius: 8px;
  margin-left: 3%;
  margin-bottom: 20px;
  background-color: #c4c4c4;
}
.pickup_item:hover {
  cursor: pointer;
  opacity: 0.7;
  transition-duration: 0.3s;
}
.pickup_description {
  display: inline-block;
  font-size: 15px;
  color: #3f1f1a;
  font-weight: bold;
  text-shadow: 2px 2px 10px #f8f3f1, -2px 2px 10px #f8f3f1,
    2px -2px 10px #f8f3f1, -2px -2px 10px #f8f3f1;
  margin: 175px 0 15px 15px;
}
.star {
  display: flex;
}
</style>
