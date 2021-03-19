<template>
  <div class="home__bar">
    <!-- 検索欄 -->
    <div class="search_bar">
      <div class="search_box">
        <input
          id="search_input"
          type="text"
          placeholder="キーワードを入力"
          v-model="keyword"
          required
        />
        <img
          v-on:click="search"
          id="search_icon"
          src="../assets/search_mark.png"
        />
      </div>
    </div>
    <!-- すべて／手作り／市販のnavbar(HomeBar) -->
    <div class="tab_items">
      <div class="tab_item current nav__link" @click="switchAll">すべて</div>
      <div class="tab_item current nav__link" @click="switchRecipes">手作り</div>
      <div class="tab_item current nav__link" @click="switchPurchases">市販</div>
      
    </div>
    <!-- ランダムで投稿を表示 -->
    <div class="recipes">
      <div class="recom">
        <h2>今日のおすすめ</h2>
        <div class="recom_items">
          <!-- リアルタイム検索結果（タイトルにキーワードを含む投稿を表示） -->
          <div
            v-for="recipe in searchedRecipe"
            :key="recipe.id"
            class="recom_item"
          >
            <ul class="recom_description">
              <li v-text="recipe.title" class="recom_name">
                {{ recipe.title }}
              </li>
              <li v-text="recipe.introduce" class="recom_easy">
                {{ recipe.introduce }}
              </li>
              <li v-text="recipe.createdAt" class="recom_time">
                {{ recipe.createdAt }}
              </li>
            </ul>
          </div>
          <!-- こんな感じに表示されたらいいな、のやつ -->
          <div class="recom_item ideal">
            <ul class="recom_description">
              <li class="recom_name">卵焼き</li>
              <li class="recom_easy">簡単：★★★☆☆</li>
              <li class="recom_time">時間：10分</li>
            </ul>
          </div>
    </div>
    <br>
  </div>
</template>

<script>
import firebase from "firebase";
import "firebase/firestore";

export default {
  name: "searchTrial",
  data() {
    return {
      text: "",
      keyword: "",
      db: null,
      recipes: [],
      recipe: {
        title: "",
        introduce: "",
      },
    };
  },
  created() {
    firebase
      .firestore()
      .collection("recipe")
      .orderBy("createdAt") //並べ替え
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          this.recipes.push({
            title: doc.data().title,
            introduce: doc.data().introduce,
            createdAt: doc.data().createdAt,
          });
        });
      });
  },
  methods: {
    search() {
      alert("検索機能、実装途中byさき");
    },
    submit() {
      //firebaseに投稿を登録
      firebase
        .firestore()
        .collection("recipe")
        .add({
          title: this.recipe.title,
          introduce: this.recipe.introduce,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then((docRef) => {
          docRef.get().then((docRef) => {
            this.recipe.push({
              id: docRef.id,
              title: docRef.data().title,
              introduce: docRef.data().introduce,
              createdAt: docRef.data().createdAt,
            });
          });
        });
      this.recipe.title = "";
      this.recipe.introduce = "";
    },
  },
  computed: {
    searchedRecipe: function() {
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

<style scoped>
.home__bar {
  height: 50px;
  justify-content: space-between;
  align-items: stretch;
  background-color: #fffacd;
}
.nav__link {
  display: flex;
  justify-content: center;
  padding-top: 0;
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
.ideal {
  background-color: #fac73c;
}
.from-firebase {
  background-color: #3164bb;
}
ul {
  list-style: none;
  padding-left: 0;
}
</style>
