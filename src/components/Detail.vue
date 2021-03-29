<template>
  <div class="ViewModal">
    <div id="modal">
      <div class="det__buttons">
        <!-- My投稿の編集と削除 -->
        <div v-if="detail.fromMyPage">
          <button class="edit-button" v-on:click="editPost">編集</button>
          <button class="delete-button" v-on:click="deletePost">削除</button>
        </div>
        <!-- 閉じるボタン -->
        <img
          src="../assets/close-button.png"
          @click="close"
          class="close-button hover"
        />
      </div>
      <!-- 手作りか市販か， -->
      <div class="det__type">{{ detail.type }}</div>
      <div class="det__head">
        <div class="det__head-left">
          <!-- タイトル -->
          <div class="det__title">{{ detail.title }}</div>
          <hr />
          <!-- お手軽さ，時間 -->
          <div class="det__star">
            <!-- ☆ほし☆ -->
            お手軽さ
            <star-rating
              :item-size="15"
              :read-only="true"
              :show-rating="false"
              v-model="detail.rating"
            ></star-rating>
          </div>
          <!-- 調理時間 -->
          <div class="det__time" v-if="detail.selected">
            <img src="../assets/clock-icon.png" class="icon" />
            <div>{{ detail.selected }}</div>
          </div>
          <!-- 紹介 -->
          <div class="det__intro">
            <img src="../assets/point-icon.png" class="icon" />
            <div>{{ detail.introduce }}</div>
          </div>
        </div>
        <!-- 写真 -->
        <div>
          <img :src="detail.imageURL" alt="料理の写真" class="det__pic" />
        </div>
      </div>
      <div class="det__bottom">
        <!-- 材料 -->
        <div v-if="detail.newIngredients" class="ingred__wrapper">
          <h3 class="ingred__top">材料(1人分)</h3>
          <div class="ingred__conts">
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
        </div>
        <!-- 作り方 -->
        <div v-if="detail.newHowTo" class="howTo__box">
          <h3 class="howTo__top">作り方</h3>
          <div class="howTo__conts">
            <div v-for="(howTo, index) in detail.newHowTo" :key="index">
              <div>{{ index + 1 }}. {{ howTo.text }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- モーダルウィンドウ用 -->
    <div id="overlay"></div>
  </div>
</template>

<script>
import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import { StarRating } from "vue-rate-it";
export default {
  components: {
    StarRating,
  },
  props: ["detail"],
  data() {
    return {
      imageURL: "",
      imageName: "",
    };
  },
  methods: {
    editPost() {
      if (this.detail.type === "手作り") {
        this.$parent.$data["editFlg"] = true;
        this.$parent.$data["editCookedFlg"] = false;
        this.$parent.$data["detailFlg"] = false;
      } else {
        this.$parent.$data["editFlg"] = false;
        this.$parent.$data["editCookedFlg"] = true;
        this.$parent.$data["detailFlg"] = false;
      }
    },
    deletePost() {
      firebase
        .firestore()
        .collection("recipe")
        .doc(this.detail.id)
        .delete()
        .then(() => {
          window.alert("削除完了");
          this.$router.go({
            path: this.$router.currentRoute.path,
            force: true,
          });
        })
        .catch(() => {
          window.alert("削除できませんでした");
        });
    },
    close() {
      this.$parent.$data["detailFlg"] = false;
    },
  },
};
</script>

<style scoped>
#overlay {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.65);
}
#modal {
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 2;
  transform: translate(-50%, -50%);
  width: 740px;
  max-width: 80%;
  height: auto;
  max-width: 80%;
  padding: 32px;
  border-radius: 8px;
  color: #3f1f1a;
  background-image: repeating-linear-gradient(
      45deg,
      #fcf5ea 25%,
      transparent 25%,
      transparent 75%,
      #fcf5ea 75%,
      #fcf5ea
    ),
    repeating-linear-gradient(
      45deg,
      #fcf5ea 25%,
      #ffffff 25%,
      #ffffff 75%,
      #fcf5ea 75%,
      #fcf5ea
    );
  background-position: 0 0, 20px 20px;
  background-size: 40px 40px;
}
.det__type {
  color: #cd8c5c;
  font-size: 11pt;
}
.det__head {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
.det__head-left {
}
/* 料理名 */
.det__title {
  font-weight: bold;
  font-size: 25px;
}
hr {
  border-width: 5px 0 0 0;
  border-style: solid;
  border-color: rgb(255, 186, 115);
  margin: 0 5px 30px 0;
}
.det__star {
  display: flex;
  font-size: 13px;
}
.det__time {
  display: flex;
  font-size: 13px;
  align-items: center;
}
/* 紹介 */
.icon {
  width: 20px;
  height: 20px;
  margin-right: 20px;
}
.det__intro {
  font-size: 13px;
  display: flex;
  align-items: center;
  margin-top: 10px;
}
.intro__top {
  width: 80px;
}
/* 写真 */
.det__pic {
  width: 300px;
  height: 200px;
  border-radius: 10px;
  object-fit: cover;
  /* フレームと影 */
  padding: 5px;
  background-color: #fff;
  box-shadow: 4px 4px 10px #777;
}
.det__bottom {
  display: flex;
  margin-top: 20px;
}
/* 材料 */
.ingred__wrapper {
  width: 280px;
  margin-right: 30px;
}
.ingred__conts {
  font-size: 13px;
}
/* 作り方 */
.howTo__top {
  width: 100px;
}
.howTo__conts {
  font-size: 13px;
}
/* 編集，消去，閉じる */
.det__buttons {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
}
.edit-button {
  width: 70px;
  height: 35px;
  background-color: #fff;
  border-width: 1px;
  border-radius: 5px;
  border-color: #3f1f1a;
}
.delete-button {
  width: 70px;
  height: 35px;
  border-radius: 5px;
  background-color: #f03618;
  border: none;
  color: #fff;
  margin-left: 5px;
  margin-right: 15px;
}
.close-button {
  width: 20px;
  height: 20px;
}
.hover:hover {
  cursor: pointer;
}
</style>
