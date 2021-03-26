<template>
<!-- 
・detail.idを消去
・detail.fromMyPageの追加，
    myPageからアクセスした場合のみ，編集と削除が可能
・detail.fromMyPage の追加により，data の user を消去，mounted を消去
・モーダルウィンドウの見た目を変更
・編集，削除機能
-->
<!-- 
サイト名候補
・
 -->

  <div class="ViewModal">
    <div id="modal" class="border-color">
      <!-- 写真 -->
      <div class="det_picDeco">
        <img
          :src="detail.imageURL"
          alt="料理の写真"
          class="det__pic"
        />
      </div>
      <!-- 手作りか市販か， -->
      <div class="det__type">{{ detail.type }}</div>
      <!-- タイトル -->
      <h1 class="det__title">{{ detail.title }}</h1>
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
        <!-- 調理時間 -->
        <div class="det__time" v-if="detail.selected">
          ⏰{{ detail.selected }}
        </div>
      </div>

      <!-- 紹介 -->
      <div class="det__intro">
        <h3 class="intro__top">
          紹介
        </h3>
        {{ detail.introduce }}
      </div>
      <!-- 材料 -->
      <div v-if="detail.newIngredients" class="ingredient">
        <h3 class="ingred__top">材料(1人分)</h3>
        <div class="ingred__conts">
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
      </div>
      <!-- 作り方 -->
      <div v-if="detail.newHowTo" class="howTo">
        <h3 class="howTo__top">作り方</h3>
        <div class="howTo__conts">
          <div v-for="(howTo, index) in detail.newHowTo" :key="index">
            <div>{{ index + 1 }}. {{ howTo.text }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="det__cont">
      <!-- My投稿の編集と削除 -->
      <div v-if="detail.fromMyPage">
        <button class="det__button" v-on:click="editPost">編集</button>
        <button class="det__button" v-on:click="deletePost">削除</button>
      </div>
      <!-- 閉じる -->
      <div>
        <button class="det__button" @click="close">閉じる</button>
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
  props:['detail'],
  data() {
    return {
      imageURL: "",
      imageName: "",
      editFlg: false,
    };
  },
  methods: {
    editPost() {
      firebase
        .firestore()
        .collection("recipe")
        .doc(this.detail.id)
        .update({title: this.detail.title})
        .then(() => {
          window.alert("編集完了");
          this.$router.go({path: this.$router.currentRoute.path, force: true})
        })
        .catch(() => {
          window.alert("変更されませんでした");
        });
    },
    deletePost() {
      firebase
        .firestore()
        .collection("recipe")
        .doc(this.detail.id)
        .delete()
        .then(() => {
          window.alert("削除完了");
          this.$router.go({path: this.$router.currentRoute.path, force: true})
        })
        .catch(() => {
          window.alert("削除できませんでした");
        });
    },
    close() {
      this.$parent.$data["detailFlg"] = false;
      this.user = false;
    },
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
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.65);
}
#modal {
  position: fixed;
  /* position: absolute; */
  left: 50%;
  top: 50%;
  z-index: 2;
  transform: translate(-50%, -50%);
  width: 740px;
  height: 545px;
  max-width: 80%;
  max-height: 120%;
  box-sizing: border-box;
  padding: 32px;
  border-radius: 8px;
  overflow-y: scroll;
  min-height: 10%;
}
#modal{
  background-color: #f3fcfa;
  background-image: repeating-linear-gradient(45deg, #fcf5ea 25%, transparent 25%, transparent 75%, #fcf5ea 75%, #fcf5ea), repeating-linear-gradient(45deg, #fcf5ea 25%, #ffffff 25%, #ffffff 75%, #fcf5ea 75%, #fcf5ea);
  background-position: 0 0, 20px 20px;
  background-size: 40px 40px;
}
#modal::-webkit-scrollbar-track {
  border-radius: 10px;
  box-shadow: 0 0 4px #aaa inset;
}
/* スクロールのつまみ部分の設定 */
#modal::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background: #1959A8;
}
.border-color {
  border-top: solid 3px #ff9900;
  border-right: solid 3px #ff9900;
  border-bottom: solid 3px #ff9900;
  border-left: solid 3px #ff9900;
}

/* 写真 */
.det__pic {
  position: fixed;
  right: 4%;
  top: 12%;
  width: 300px;
  height: 200px;
  margin-top: 15px;
  border-radius: 10px;
  object-fit: cover;
}
.det__pic{
  /* フレームと影 */
  display: inline-block;
  padding: 5px;
  box-shadow: 4px 4px 10px #777;
  background-color: #FFF;
}

.det__type{
  position: fixed;
  top: 9%;
  left: 2%;
  -webkit-transform: rotate(-10deg);
  -moz-transform: rotate(-10deg);
  transform: rotate(-10deg);
  -o-transform: rotate(-10deg);
  -ms-transform:rotate(-10deg);
  color:#cd8c5c;
  font-size:16pt;
}

/* 料理名 */
.det__title {
  position: fixed;
  top: 7%;
}
.det__title:after {
  content: "";
  display: block;
  height: 4px;
  background: -webkit-linear-gradient(to right, rgb(255, 186, 115), #ffb2b2);
  background: linear-gradient(to right, rgb(255, 186, 115), #ffb2b2);
}
.det__star{
  display: flex;
  position: fixed;
  top: 26%;
}
.det__time{
  position: fixed;
  left: 30%;
}

/* 紹介 */
.det__intro{
  position: fixed;
  top: 31%;
  left: 5%;
  width: 45%;
}
.intro__top{
  padding: .5em .75em;
  width: 80px;
  color: #3f1f1a;
  background-color: #fce7c7;
  box-shadow: 0 2px 6px #777;
}

/* 材料 */
.ingredient{
  position: fixed;
  top: 53%;
  left: 5%;
  width: 40%;
}
.ingred__top{
  padding: .5em .75em;
  width: 144px;
  color: #3f1f1a;
  background-color: #fce7c7;
  box-shadow: 0 2px 6px #777;
}
.ingred__conts{
  margin-bottom: 70px;
}

/* 作り方 */
.howTo{
  position: fixed;
  top: 53%;
  left: 50%;
  width: 45%;
}
.howTo__top{
  padding: .5em .75em;
  width: 100px;
  color: #3f1f1a;
  background-color: #fce7c7;
  box-shadow: 0 2px 6px #777;
}
.howTo__conts{
  margin-bottom: 70px;
}

/* 編集，消去，閉じる */
.det__cont{
  display: flex;
  position:fixed;
  z-index: 2;
  bottom: 10%;
  right: 25%;
}
.det__button{
  width: 80px;
  height: 48px;
  margin-top: 20px;
  margin-bottom: 0px;
  margin-left: 10px;
  border-left: 0px;
  font-size: 16px;
  color: #ffffff;
  background-color: #ff9900;
  border: none;
  border-radius: 4px;
}
</style>
