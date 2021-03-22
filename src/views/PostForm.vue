<template>
  <div class="body__wrapper">
    <div class="post__wrapper">
      <h1>投稿</h1>
      <div class="post__box">
        <div class="form-switchtabs">
          <div
            @click="make"
            class="form-switchtab"
            v-bind:class="{ form_active: isActiveA }"
          >
            手作り
          </div>
          <div
            @click="made"
            class="form-switchtab"
            v-bind:class="{ form_active: isActiveB }"
          >
            市販
          </div>
        </div>
        <!-- 手作り投稿 -->
        <div v-if="cook">
          <form @submit.prevent="makePostForm">
            <!-- 料理名 -->
            <div class="form_title form_item">
              <h3>レシピのタイトル</h3>
              <input
                v-model="title"
                type="text"
                placeholder="料理タイトル"
                class="input_rec"
                required
              />
            </div>
            <!-- 2nd block -->
            <div class="form_2 form_item">
              <!-- 2nd block left -->
              <!-- 写真 -->
              <div class="form__pic">
                <input
                  type="file"
                  accept="image/*"
                  @change="onImageUploadedMake($event)"
                  class="pic__upload"
                  required
                />
                <img
                  :src="imageURL"
                  alt="料理の写真"
                  width="300"
                  height="200"
                />
              </div>
              <!-- 2nd block right -->
              <div class="form_2right">
                <!-- 調理時間 -->
                <div class="form_time">
                  <h3>調理時間</h3>
                  <div>
                    <select
                      name="time"
                      v-model="selected"
                      class="form_time_choice"
                      required
                    >
                      <option disabled value="">選択してください</option>
                      <option v-for="option in options" :key="option.id">
                        {{ option.name }}
                      </option>
                    </select>
                  </div>
                </div>
                <!-- 星レビュー -->
                <div class="star">
                  お手軽さ 星{{ rating }}
                  <star-rating
                    :item-size="20"
                    :show-rating="false"
                    v-model="rating"
                  ></star-rating>
                </div>
                <!-- 紹介文 -->
                <div class="introduce">
                  <h3>紹介文</h3>
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
            </div>
            <!-- 材料 -->
            <div class="ingredients form_item">
              <h3>材料</h3>
              <div
                v-for="(newIngredient, index) in newIngredients"
                :key="index"
              >
                <div class="form_horizontal">
                  <input
                    v-model="newIngredient.name"
                    type="text"
                    placeholder="（例）玉ねぎ"
                    class="input_rec input_zairyo"
                  />
                  <input
                    v-model="newIngredient.amount"
                    type="text"
                    placeholder="（例）一個"
                    class="input_rec input_amount"
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
            <div class="form_item">
              <h3>作り方</h3>

              <div
                v-for="(newHowTo, index) in newHowTos"
                :key="index"
                class="form_horizontal"
              >
                <div class="howto_num">{{ index + 1 }}</div>
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
            <!-- 投稿ボタン -->
            <div>
              <button type="submit" class="make-button">投稿</button>
            </div>
          </form>
        </div>
        <!-- 市販投稿 -->
        <div v-if="cooked">
          <form @submit.prevent="madePostForm" class="form_wrapper">
            <!-- タイトル -->
            <div class="form_title form_item">
              <h3>レシピのタイトル</h3>
              <input
                v-model="title"
                type="text"
                placeholder="料理タイトル"
                class="input_rec"
                required
              />
            </div>
            <!-- 星レビュー -->
            <div class="star form_item">
              お手軽さ 星{{ rating }}
              <star-rating
                :item-size="20"
                :show-rating="false"
                v-model="rating"
              ></star-rating>
            </div>
            <!-- 写真 -->
            <div class="form_pic">
              <input
                type="file"
                accept="image/*"
                @change="onImageUploadedMade($event)"
                class="pic__upload"
              />
              <img :src="imageURL" alt="料理の写真" width="300" height="200" />
            </div>
            <!-- 紹介文 -->
            <div class="introduce form_item">
              <h3>紹介文</h3>
              <textarea
                v-model="introduce"
                cols="30"
                rows="10"
                placeholder="紹介文"
                class="input_rec"
                required
              ></textarea>
            </div>
            <!-- 投稿ボタン -->
            <div>
              <button type="submit" class="make-button">投稿</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import { StarRating } from "vue-rate-it";
import Footer from "../components/Footer.vue";

export default {
  components: {
    StarRating,
    Footer,
  },
  data() {
    return {
      cook: true,
      cooked: false,
      title: "",
      selected: "",
      imageName: "",
      imageURL: "",
      introduce: "",
      newIngredients: [{ name: "", amount: "" }],
      newHowTos: [{ text: "" }],
      rating: 0,
      options: [
        { id: 1, name: "５分以内" },
        { id: 2, name: "約１０分" },
        { id: 3, name: "約１５分" },
        { id: 4, name: "約３０分" },
        { id: 5, name: "約１時間" },
        { id: 6, name: "1時間以上" },
      ],
      isActiveA: true,
      isActiveB: false,
    };
  },
  methods: {
    make() {
      this.cook = true;
      this.cooked = false;
      this.isActiveA = true;
      this.isActiveB = false;
    },
    made() {
      this.cooked = true;
      this.cook = false;
      this.isActiveA = false;
      this.isActiveB = true;
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
    // makeの写真投稿メソッド
    onImageUploadedMake(e) {
      const image = e.target.files[0];
      this.createImageMake(image);
    },
    createImageMake(image) {
      // const render = new FileReader()
      // render.readAsDataURL(image)
      // render.onload = () =>{
      //   this.image = render.result
      // }
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
    // madeの写真投稿メソッド
    onImageUploadedMade(e) {
      const image = e.target.files[0];
      this.createImageMade(image);
    },
    createImageMade(image) {
      // const render = new FileReader()
      // render.readAsDataURL(image)
      // render.onload = () =>{
      //   this.image = render.result
      // }
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
    // firebaseに保存
    makePostForm() {
      // ログインしているユーザーの uidを取得
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          //firestoreのrecipeにdataと取得したuidを保存
          firebase
            .firestore()
            .collection("recipe")
            .add({
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
              type: "手作り",
              title: this.title,
              selected: this.selected,
              imageName: this.imageName,
              imageURL: this.imageURL,
              introduce: this.introduce,
              newIngredients: this.newIngredients,
              newHowTo: this.newHowTos,
              uid: user.uid,
              rating: this.rating,
            })
            .then(() => {
              window.alert("投稿完了");
              this.$router.push("/MyPage");
            })
            .catch(() => {
              window.alert("投稿できませんでした");
            });
        }
      });
    },
    madePostForm() {
      // ログインしているユーザーの uidを取得
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          //firestoreのrecipeにdataと取得したuidを保存
          firebase
            .firestore()
            .collection("recipe")
            .add({
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
              type: "市販",
              title: this.title,
              imageName: this.imageName,
              imageURL: this.imageURL,
              introduce: this.introduce,
              uid: user.uid,
              rating: this.rating,
            })
            .then(() => {
              window.alert("投稿完了");
              this.$router.push("/MyPage");
            })
            .catch(() => {
              window.alert("投稿できませんでした");
            });
        }
      });
    },
  },
};
</script>

<style>
.body__wrapper {
  height: auto;
  text-align: center;
  background-color: #f6f6f6;
}
.post__wrapper {
  padding-bottom: 100px;
}
h1 {
  padding-top: 45px;
  margin-top: 0;
  margin-bottom: 30px;
}
.post__box {
  width: 850px;
  height: auto;
  background-color: #fff;
  margin-right: auto;
  margin-left: auto;
}
.form-switchtabs {
  display: flex;
}
.form-switchtab {
  width: 425px;
  height: 50px;
  padding-top: 13px;
  border: none;
  background-color: #fafafa;
}
.form_active {
  background-color: #fff;
}
.form-switchtab:hover {
  cursor: pointer;
}
.form_item {
  margin-left: 45px;
  margin-right: 45px;
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
.input_rec:focus {
  border-style: none;
  /* なんか効かない... */
}
textarea {
  resize: none;
}
.form_title {
  width: 400px;
  margin-top: 30px;
}
button:hover {
  cursor: pointer;
}
h3 {
  text-align: left;
  font-size: 18px;
  margin-top: 10px;
  margin-bottom: 5px;
}
.form_2 {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.form__pic {
  display: flex;
  flex-direction: column;
  margin-top: 15px;
}
.pic__upload {
  width: 270px;
}
.form_2right {
  margin-right: 45px;
}
.form_time {
  display: flex;
  margin-top: 10px;
  margin-bottom: 20px;
}
.form_horizontal {
  display: flex;
}
.form_time_choice {
  margin-top: 12px;
  margin-left: 20px;
}
.input_zairyo {
  width: 500px;
  margin-right: 5px;
}
.input_amount {
  width: 310px;
}
.howto_num {
  font-size: 20px;
  margin-right: 10px;
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
  opacity: 0.6;
  transition-duration: 0.3s;
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
.make-button {
  width: 400px;
  height: 48px;
  margin-top: 20px;
  margin-bottom: 80px;
  font-size: 16px;
  color: #ffffff;
  background-color: #ff9900;
  border: none;
  border-radius: 4px;
}
.make-button:hover {
  opacity: 0.8;
  transition-duration: 0.3s;
}
</style>
