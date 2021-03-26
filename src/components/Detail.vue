<template>
  <div class="ViewModal">
    <div id="modal">
      <div>
        <img
          src="../assets/close-button.png"
          @click="close"
          class="close-button hover"
        />
      </div>
      <div class="modal-head">
        <!-- タイトル -->
        <h1>{{ detail.title }}</h1>
        <!-- 手作りか市販か， -->
        <div class="detail-type">{{ detail.type }}</div>
      </div>
      <!-- 紹介 -->
      <div class="detail-introduce">
        <img src="../assets/point-icon.png" class="point-icon" />
        <div>{{ detail.introduce }}</div>
      </div>
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
              {{ newIngredient.name }} ・・・
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
        <button v-on:click="editPost" class="edit-button hover">編集</button>
        <button v-on:click="deletePost" class="delete-button hover">
          削除
        </button>
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
  props: ["detail"],
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
        .update({ title: this.detail.title });
    },
    deletePost() {
      firebase
        .firestore()
        .collection("recipe")
        .doc(this.detail.id)
        .delete();
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
  height: auto;
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
.modal-head {
  display: flex;
}
.detail-type {
  margin-top: 57px;
  margin-left: 60px;
  font-size: 13px;
  color: #3f1f1a;
}
.detail-introduce {
  display: flex;
  height: 40px;
  border: solid;
  border-width: 1px;
  border-radius: 5px;
  border-color: #ff9900;
  align-items: center;
}
.point-icon {
  width: 20px;
  height: 20px;
  margin-left: 20px;
  margin-right: 20px;
}
.hover:hover {
  cursor: pointer;
}
.close-button {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 20px;
  height: 20px;
}
.edit-button {
  width: 70px;
  height: 35px;
  background-color: #fff;
  border-width: 1px;
  border-radius: 5px;
  border-color: #3662b8;
  margin-top: 25px;
  margin-bottom: 25px;
  color: #3662b8;
}
.delete-button {
  width: 70px;
  height: 35px;
  border-radius: 5px;
  background-color: #f03618;
  border: none;
  color: #fff;
  margin-left: 5px;
}
</style>
