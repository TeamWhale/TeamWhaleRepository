<template>
  <div class="ViewModal">
    <div id="modal" class="border-color">
      <!-- 「編集」タイトル -->
      <div class="page__title">
        <img src="../assets/edit-hammer.png" class="hammer-icon" />編集
      </div>
      <!-- 右上ボタンズ（編集完了と変更取り消し） -->
      <div class="edit__cont">
        <div>
          <button class="edit__button" v-on:click="editPost">完了</button>
          <button class="cancel__button" v-on:click="discard">
            キャンセル
          </button>
        </div>
      </div>
      <!-- 手作りか市販か， -->
      <div class="det__type">{{ editDet.type }}</div>
      <div class="det__head">
        <div class="edit__head-left">
          <!-- タイトル -->
          <input
            v-model="title"
            type="text"
            placeholder="料理タイトル"
            class="edit__title"
            required
          />
          <hr />
          <!-- お手軽さ，時間 -->
          <div class="edit__star">
            <!-- ☆ほし☆ -->
            お手軽さ
            <star-rating
              :item-size="15"
              :show-rating="false"
              v-model="rating"
            ></star-rating>
          </div>
          <!-- 調理時間 -->
          <div class="edit__time" v-if="editDet.selected">
            調理時間
            <select name="time" v-model="selected" required>
              <option disabled value="">選択してください</option>
              <option v-for="option in options" :key="option.id">
                {{ option.name }}
              </option>
            </select>
          </div>
          <!-- 紹介 -->
          <div class="edit__intro">
            <textarea
              v-model="introduce"
              id=""
              cols="30"
              rows="5"
              placeholder="キャッチコピーや料理の際のコツ・ポイントを入力"
              class="input_rec"
              required
            ></textarea>
          </div>
        </div>
        <!-- 写真 -->
        <div class="form__pic">
          <input
            type="file"
            accept="image/*"
            @change="onImageUploadedMake($event)"
            class="pic__upload"
            required
          />
          <img :src="imageURL" alt="料理の写真" class="edit__pic" />
        </div>
      </div>
      <!-- 材料 -->
      <div v-if="editDet.newIngredients" class="ingredient">
        <h3 class="ingred__top">材料(1人分)</h3>
        <div v-for="(newIngredient, index) in newIngredients" :key="index">
          <div class="form_horizontal">
            <input
              v-model="newIngredient.name"
              type="text"
              placeholder="（例）玉ねぎ"
              class="input_rec edit_zairyo"
            />
            <input
              v-model="newIngredient.amount"
              type="text"
              placeholder="（例）一個"
              class="input_rec edit_amount"
            />
            <img
              src="../assets/delete-button.png"
              @click.prevent="removeIngredients(index)"
              class="form_delete"
            />
          </div>
        </div>
        <button @click.prevent="addIngredients" class="add_input">
          材料を追加する
        </button>
      </div>
      <!-- 作り方 -->
      <div v-if="editDet.newHowTo" class="howTo">
        <h3 class="howTo__top">作り方</h3>
        <div
          v-for="(newHowTo, index) in newHowTos"
          :key="index"
          class="form_horizontal"
        >
          {{ index + 1 }}.
          <textarea
            v-model="newHowTo.text"
            cols="25"
            rows="2"
            placeholder="作り方を入力"
            class="input_rec"
            required
          ></textarea>
          <img
            src="../assets/delete-button.png"
            @click.prevent="removeNewHowTos(index)"
            class="form_delete"
          />
        </div>
        <button @click.prevent="addNewHowTos" class="add_input">
          作り方を追加する
        </button>
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
  props: ["editDet"],
  data() {
    return {
      title: "",
      selected: "",
      imageName: "",
      imageURL: "",
      introduce: "",
      newIngredients: "",
      newHowTos: "",
      rating: 0,
      options: [
        { id: 1, name: "５分以内" },
        { id: 2, name: "約１０分" },
        { id: 3, name: "約１５分" },
        { id: 4, name: "約３０分" },
        { id: 5, name: "約１時間" },
        { id: 6, name: "1時間以上" },
      ],
    };
  },
  methods: {
    // makeの写真投稿メソッド
    onImageUploadedMake(e) {
      const image = e.target.files[0];
      this.createImageMake(image);
    },
    createImageMake(image) {
      //storage
      const storageRef = firebase.storage().ref();
      const createdAt = new Date();
      const timestamp = createdAt.getTime();
      const uniqueFileName = timestamp + "_" + image.name;
      const fileRef = storageRef.child("images/" + uniqueFileName);
      fileRef.put(image).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((url) => {
          this.imageURL = url;
          this.imageName = image.name;
        });
      });
    },
    // madeの写真投稿メソッド
    onImageUploadedMade(e) {
      const image = e.target.files[0];
      this.createImageMade(image);
    },
    createImageMade(image) {
      //storage
      const storageRef = firebase.storage().ref();
      const createdAt = new Date();
      const timestamp = createdAt.getTime();
      const uniqueFileName = timestamp + "_" + image.name;
      const fileRef = storageRef.child("images/" + uniqueFileName);
      fileRef.put(image).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((url) => {
          console.log(url);
          console.log(image.name);
          this.imageURL = url;
          this.imageName = image.name;
        });
      });
    },
    addIngredients() {
      this.newIngredients.push({
        name: "",
        amount: "",
      });
    },
    removeIngredients(index) {
      this.newIngredients.splice(index, 1);
    },
    addNewHowTos() {
      this.newHowTos.push({
        text: "",
      });
    },
    removeNewHowTos(index) {
      this.newHowTos.splice(index, 1);
    },
    editPost() {
      // ログインしているユーザーの uidを取得
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          //firestoreのrecipeにdataと取得したuidを保存
          firebase
            .firestore()
            .collection("recipe")
            .doc(this.editDet.id)
            .update({
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
              imageName: this.imageName,
              imageURL: this.imageURL,
              title: this.title,
              selected: this.selected,
              introduce: this.introduce,
              newIngredients: this.newIngredients,
              newHowTo: this.newHowTos,
              rating: this.rating,
            })
            .then(() => {
              window.alert("投稿完了");
              this.$router.go({
                path: this.$router.currentRoute.path,
                force: true,
              });
            })
            .catch(() => {
              window.alert("変更されませんでした");
            });
        }
      });
    },
    discard() {
      this.$parent.$data["detailFlg"] = true;
      this.$parent.$data["editFlg"] = false;
      window.alert("変更を破棄しました");
    },
  },
  mounted() {
    // 編集前の値
    (this.title = this.editDet.title),
      (this.selected = this.editDet.selected),
      (this.imageName = this.editDet.imageName),
      (this.imageURL = this.editDet.imageURL),
      (this.introduce = this.editDet.introduce),
      (this.newIngredients = this.editDet.newIngredients),
      (this.newHowTos = this.editDet.newHowTo),
      (this.rating = this.editDet.rating);
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
  max-height: 80%;
  overflow: scroll;
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
.edit__head-left {
  margin-right: 15px;
}
/* 写真 */
.edit__pic {
  width: 300px;
  height: 200px;
  object-fit: cover;
  /* フレームと影 */
  padding: 5px;
  background-color: #fff;
  box-shadow: 4px 4px 10px #777;
  border-radius: 10px;
  margin-right: 15px;
}
/* "編集画面"の文字 */
.hammer-icon {
  width: 36px;
  height: 36px;
}
.page__title {
  /* margin-left: 20%; */
  font-size: 26pt;
  color: #3f1f1a;
}
hr {
  border-width: 5px 0 0 0;
  border-style: solid;
  border-color: rgb(255, 186, 115);
  margin: 0 5px 30px 0;
}
.edit__star {
  display: flex;
}
/* 料理名 */
.edit__title {
  border-style: solid;
  padding: 10px;
  font-family: inherit;
  border-color: #ececec;
  border-radius: 5px;
  border-width: 2px;
  font-size: 12pt;
}
.edit__time {
}
.icon {
  width: 20px;
  height: 20px;
  margin-right: 20px;
}
/* 紹介 */
.edit__intro {
  margin-top: 15px;
}
.intro__top {
  padding: 0.5em 0.75em;
  width: 80px;
  color: #3f1f1a;
}
.input_rec {
  border-style: solid;
  width: 100%;
  padding: 10px;
  font-family: inherit;
  border-color: #ececec;
  border-radius: 5px;
  border-width: 2px;
}
/* 材料 */
.ingredient {
  width: 40%;
}
.ingred__top {
  padding: 0.5em 0.75em;
  width: 144px;
  color: #3f1f1a;
  background-color: #fce7c7;
  box-shadow: 0 2px 6px #777;
}
.form_horizontal {
  display: flex;
}
.edit_zairyo {
  width: 121px;
  height: 25px;
  margin-right: 5px;
}
.edit_amount {
  width: 121px;
  height: 25px;
}
.form_delete {
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 3px;
  margin-top: 5px;
  margin-left: 5px;
}
.form_delete:hover {
  cursor: pointer;
}
.add_input {
  width: 150px;
  height: 30px;
  color: #ff9900;
  border-style: solid;
  background-color: #ffffff;
  border-color: #ff9900;
  border-radius: 3px;
  border-width: 1px;
  margin-top: 5px;
}

/* 作り方 */
.howTo {
}
.howTo__top {
  padding: 0.5em 0.75em;
  width: 100px;
  color: #3f1f1a;
  background-color: #fce7c7;
  box-shadow: 0 2px 6px #777;
}
.form_delete {
  width: 25px;
  height: 25px;
  border: none;
  border-radius: 3px;
  margin-top: 0px;
  margin-left: 5px;
}
.form_delete:hover {
  cursor: pointer;
}
.add_input {
  width: 150px;
  height: 30px;
  color: #ff9900;
  border-style: solid;
  background-color: #ffffff;
  border-color: #ff9900;
  border-radius: 3px;
  border-width: 1px;
  margin-top: 5px;
}
.image_wrapper {
  height: 360px;
  width: 360px;
  background-color: #ff9900;
  text-align: center;
}
/* 編集，消去，閉じる */
.edit__cont {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
}
.edit__button {
  width: 75px;
  height: 35px;
  background-color: #ff9900;
  border: none;
  border-radius: 5px;
  font-size: 13px;
  color: #ffffff;
}
.cancel__button {
  width: 85px;
  height: 35px;
  background-color: #fff;
  border-width: 1px;
  border-color: #ff9900;
  border-radius: 5px;
  font-size: 13px;
  color: #ff9900;
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
