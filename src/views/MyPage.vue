<template>
  <div>
    <div class="all" v-for="(all, index) in allRecipe" :key="index">
      {{all.title}}
    </div>
    <div class="Recipe"></div>
    <div class="Purchase"></div>
  </div>
</template>

<script>

import firebase from "firebase"
import "firebase/firestore"

export default {
  data() {
    return {
      search_keyword: "",
      recipes: [{ title: "", image: "", rank: "", time: "" }],
      allRecipe: [],
      Recipes:[],
      Purchases: []
    };
  },
  methods: {
    // search() {
    //   alert("検索機能の実装調べます～byさき");
    // },
  },
  mounted(){
    firebase.firestore().collection("recipe").orderBy("createdAt", "desc").get()
    .then(snapshot =>{
      snapshot.docs.forEach(doc =>{
        console.log(doc.data())
        this.allRecipe.push({
          ...doc.data()
        })
      })
    })
  }
};
</script>

<style>
* {
  color: #3f1f1a;
}
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
h2 {
  margin-left: 3%;
  font-weight: normal;
}
.recom_items {
  display: flex;
  flex-wrap: wrap;
  margin-left: 3%;
  margin-right: 3%;
  margin-bottom: 25px;
}
.recom_item {
  width: 250px;
  height: 250px;
  border-radius: 8px;
  margin-left: 3%;
  margin-bottom: 20px;
  background-color: #c4c4c4;
  color: #000;
}
.recom_description {
  margin: 175px 0 15px 15px;
}
</style>
