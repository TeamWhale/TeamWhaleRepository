<template>
  <div class="home__wrapper">
    
    <div class="main__wrapper">
      
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
    </div>
    <br>
  </div>
</template>

<script>
import "firebase/firestore";

export default {
  name: "searchTrial",
  data() {
    return {
      text: "",
      keyword: "",
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
      ary: [1, 2, 3, 4, 5],
    };
  },
  created() {
    
  },
  methods: {
    search() {
      alert("検索機能、実装途中byさき");
      // 押したら検索画面に移動する
    },
    tabChange: function(num) {
      this.isActive = num;
    },
  },
  computed: {
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
.active {
  background-color: #fce7c7;
}
</style>
