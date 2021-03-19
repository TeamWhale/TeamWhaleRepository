<template>
  <div class="home__wrapper">
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
    <!-- すべて／手作り／市販の切り替えタブ.こっちの方がシンプルそう -->
    <div class="main__wrapper">
      <ul class="tab__items">
        <li
          v-on:click="tabChange('1')"
          v-bind:class="{ active: isActive === '1' }"
          class="tab__item"
        >
          すべて
        </li>
        <li
          v-on:click="tabChange('2')"
          v-bind:class="{ active: isActive === '2' }"
          class="tab__item"
        >
          手作り
        </li>
        <li
          v-on:click="tabChange('3')"
          v-bind:class="{ active: isActive === '3' }"
          class="tab__item"
        >
          市販
        </li>
      </ul>
      <h2>ピックアップ</h2>
      <div class="pickup__items">
        <div v-if="isActive === '1'">
          <!-- firebaseから受け取った投稿 3つ表示 -->
          <!-- ランダムにというのを盛り込みたい -->
          <div
            v-for="recipe of RecipesCount"
            :key="recipe.id"
            class="pickup__item from-firebase"
          >
            <ul class="pickup__description">
              <li v-text="recipe.title" class="pickup__name">
                {{ recipe.title }}
              </li>
              <li v-text="recipe.introduce" class="pickup__easy">
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
        type: "",
      },
      tablist: [
        { id: 1, tab__label: "すべて", tab__content: "すべての中から3つ" },
        { id: 2, tab__label: "手作り", tab__content: "手作りの中から3つ" },
        { id: 3, tab__label: "市販", tab__content: "市販の中から3つ" },
      ],
      isActive: "1",
      ary: [1, 2, 3, 4, 5],
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
            type: doc.data().type,
            // createdAt: doc.data().createdAt,
          });
        });
      });
  },
  methods: {
    search() {
      alert("検索機能、実装途中byさき");
      // 押したら検索画面に移動する
    },
    tabChange: function(num) {
      this.isActive = num;
    },
    submit() {
      //firebaseに投稿を登録
      firebase
        .firestore()
        .collection("recipe")
        .add({
          title: this.recipe.title,
          introduce: this.recipe.introduce,
          type: this.recipe.type,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then((docRef) => {
          docRef.get().then((docRef) => {
            this.recipe.push({
              id: docRef.id,
              title: docRef.data().title,
              introduce: docRef.data().introduce,
              type: docRef.data().type,
              createdAt: docRef.data().createdAt,
            });
          });
        });
      this.recipe.title = "";
      this.recipe.introduce = "";
      this.recipe.type = "";
    },
  },
  computed: {
    searchedRecipe: function() {
      // データを絞り込む
      const recipes = [];
      for (const i in this.recipes) {
        const recipe = this.recipes[i];
        if (recipe.title.indexOf(this.keyword) !== -1) {
          // !== ～ →「～と異なる」、-1は
          return this.recipes.slice(0, 3); //3つだけ表示
        }
      }
      return recipes;
    },
    // レシピ上から3つだけ表示
    RecipesCount: function() {
      // const rnd = Math.floor(Math.random() * this.ary.length);
      // return this.ary[rnd];
      return this.recipes.slice(0, 3);
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
.tab_items {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  background-color: #fcf5ea;
}
.tab_item {
  display: flex;
  width: 130px;
  height: 100%;
  padding-top: 2px;
  justify-content: center;
  align-items: center;
  color: #111;
  text-decoration: none;
  text-align: center;
  font-size: 16px;
}
.tab_item:visited {
  color: #111;
}
.tab_item:hover {
  font-weight: bold;
  color: #000;
  background-color: #ffdb99;
}
.tab__items {
  width: 100%;
  height: 50px;
  display: flex;
  padding-left: 0;
  list-style: none;
  align-items: center;
  background-color: #fcf5ea;
}
.tab__item {
  width: 130px;
  height: 100%;
  text-align: center;
  font-size: 16px;
  padding-top: 14px;
  cursor: pointer;
}
.tab__item:hover {
  align-items: stretch;
  font-weight: bold;
  color: #000;
  background-color: #ffdb99;
  cursor: pointer;
}
.active {
  background-color: #fce7c7;
}
/* navigation barのcurrent表示 */
.current {
  background-color: #fce7c7;
}
.pickup__items {
  display: flex;
  flex-wrap: wrap;
  margin-left: 3%;
  margin-right: 3%;
  margin-bottom: 25px;
}
.pickup__item {
  width: 250px;
  height: 250px;
  border-radius: 8px;
  margin-left: 3%;
  margin-bottom: 20px;
  background-color: #c4c4c4;
  color: #000;
}
.ideal {
  background-color: #fac73c;
}
.from-firebase {
  background-color: #3164bb;
}
.pickup__description {
  margin: 150px 0 15px 15px;
  list-style: none;
  padding-left: 0;
}
</style>
