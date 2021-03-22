<template>
  <div class="ViewModal">
    <div id="modal">
        {{detail.id}}
      <!-- タイトル -->
      <h1>{{ detail.title }}</h1>
      <!-- 手作りか市販か， -->
      <div>{{ detail.type }}</div>
      <!-- 紹介 -->
      <div>{{ detail.introduce }}</div>
      <br />
      <!-- 詳細，手作りの場合のみ表示 -->
      <div id="detail">
        <!-- 調理時間 -->
        <div v-if="detail.selected">時間：{{ detail.selected }}</div>
        <br />
        <!-- 材料 -->
        <div v-if="detail.newIngredients" class="ingredient">
          <h3>材料(1人分)</h3>
          <div
            v-for="(newIngredient, index) in detail.newIngredients"
            :key="index"
          >
            <div>
              {{ index + 1 }}. {{ newIngredient.name }} ・・・
              {{ newIngredient.amount }}
            </div>
          </div>
        </div>
        <br />
        <!-- 作り方 -->
        <div v-if="detail.newHoTo" class="howTo">
          <h3>作り方</h3>
          <div v-for="(newHoTo, index) in detail.newHoTo" :key="index">
            <div>{{ index + 1 }}. {{ newHoTo.text }}</div>
          </div>
        </div>
      </div>

      <!-- My投稿の編集と削除 -->
      <div v-if="user">
        <button v-on:click="editPost">編集</button>
        <button v-on:click="deletePost">削除</button>
      </div>

      <div>
        <button @click="close">閉じる</button>
      </div>
    </div>
    <div id="overlay"></div>
  </div>
</template>

<script>
import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

export default {
  props: {
    detail: [],
  },
  data() {
    return {
      user: false,
    };
  },
  methods: {
    editPost() {
      firebase
        .firestore()
        .collection("recipe")
        .doc(this.detail.id)
        .update({title: this.detail.title})
    },
    deletePost() {
      firebase
        .firestore()
        .collection("recipe")
        .doc(this.detail.id)
        .delete()
    },
    close() {
      this.$parent.$data["detailFlg"] = false;
    },
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user.uid === this.detail.uid) {
        this.user = true;
      } else {
        this.user = false;
      }
    });
    console.log(this.detail);
  },
};
</script>

<style>
#overlay {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.65);
}
#modal {
  position: fixed;
  /* position: absolute; */
  left: 50%;
  top: 50%;
  z-index: 2;
  transform: translate(-50%, -50%);
  width: 750px;
  height: 550px;
  max-width: 80%;
  max-height: 120%;
  box-sizing: border-box;
  padding: 32px;
  border-radius: 8px;
  background-color: #fff;
}
/* #modal {
  display: flex;
  flex-wrap: wrap;
} */
</style>
