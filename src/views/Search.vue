<template>
  <div class="search_bar">
    <div class="search_box">
      <input
        id="search_input"
        type="text"
        placeholder="キーワードを入力"
        v-model="keyword"
        v-on:click="searchRecipe"
        v-on:keyup.enter="searchRecipe"
        required
      />
      <img
        v-on:click="searchRecipe"
        id="search_icon"
        src="../assets/search_mark.png"
      />
    </div>
  </div>
</template>

<script>
// import firebase from "firebase";
import "firebase/firestore";

export default {
  data() {
    return {
      text: "",
      keyword: "",
      recipes: [],
    };
  },
  methods: {
    search() {
      alert("検索機能、実装途中byさき");
      // 押したら検索画面に移動する
    },
  },
};
</script>

<style></style>
