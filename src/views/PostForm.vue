<template>
  <div>
    <h1>投稿</h1>
    <div>
      <button @click="make">手作り</button>
      <button @click="made">市販</button>
    </div>

    <div v-if="cook">
      <h2>手作り</h2>
      <form @submit.prevent="makePostForm">
        <!-- 料理名 -->
        <div class="title">
          <input
            v-model="recipe.title"
            type="text"
            placeholder="料理タイトル"
          />
        </div>
        <!-- 調理時間 -->
        <div>
          <h2>調理時間</h2>
        </div>
        <div>
          <select name="time" v-model="recipe.selected">
            <option disabled value="">選択してください</option>
            <option v-for="option in options" :key="option.id">
              {{ option.name }}
            </option>
          </select>
        </div>
        <br />
        <!-- 写真 -->
        <div>
          <input type="file" />
        </div>
        <!-- 紹介文 -->
        <div class="introduce">
          <textarea
            v-model="recipe.introduce"
            id=""
            cols="30"
            rows="10"
            placeholder="紹介文"
          ></textarea>
        </div>
        <!-- 材料 -->
        <div class="ingredients">
          <h2>材料</h2>
          <!-- this.newIngredients → this.recipe.ingredients -->
          <div
            v-for="(ingredient, index) in this.recipe.ingredients"
            :key="index"
          >
            <!-- "1. 玉ねぎ ・・・ 1個" 的な見た目-->
            {{ index + 1 }}. {{ ingredient.name }} ・・・
            {{ ingredient.amount }}
            <button @click.prevent="removeIngredients(index)">削除</button>
          </div>

          <!-- 変更 <div v-for="(newIngredient, index) in this.newIngredients" :key="index" /> -->
          <div>
            <input
              v-model="newIngredients.name"
              type="text"
              placeholder="玉ねぎ"
            />
            <input
              v-model="newIngredients.amount"
              type="text"
              placeholder="一個"
            />
            <button @click.prevent="addIngredients">追加</button>
          </div>
        </div>
        <!-- 作り方 -->
        <div class="howTo">
          <h2>作り方</h2>
          <div v-for="(howTo, index) in this.recipe.howTos" :key="index">
            {{ index + 1 }}. {{ howTo.text }}
            <button @click.prevent="removeHowTos(index)">削除</button>
          </div>
          <div>
            <textarea
              v-model="newHowTo.text"
              cols="30"
              rows="5"
              placeholder="作り方"
            ></textarea>
            <button @click.prevent="addHowTos">追加</button>
          </div>
        </div>
        <!-- 投稿ボタン -->
        <div>
          <button v-on:click="submitCook" type="submit" class="make-button">
            投稿
          </button>
        </div>
      </form>
    </div>

    <div v-if="cooked">
      <h2>市販</h2>
      <form @submit.prevent="madePostForm">
        <div class="title">
          <input
            v-model="purchase.title"
            type="text"
            placeholder="料理タイトル"
          />
        </div>
        <div>
          <input type="file" />
        </div>
        <div class="introduce">
          <textarea
            v-model="purchase.introduce"
            id=""
            cols="30"
            rows="10"
            placeholder="紹介文"
          ></textarea>
        </div>
        <div>
          <button v-on:click="submitCooked" type="submit" class="make-button">
            投稿
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      cook: false,
      cooked: false,
      recipe: {
        title: "",
        selected: "",
        file: "",
        introduce: "",
        ingredients: [
          // {name: "", amount: ""},
        ],
        howTos: [
          // {text: ""}
        ],
      },
      purchase: {
        title: "",
        file: "",
        introduce: "",
      },
      options: [
        { id: 1, name: "５分以内" },
        { id: 2, name: "約１０分" },
        { id: 3, name: "約１５分" },
        { id: 4, name: "約３０分" },
        { id: 5, name: "約１時間" },
        { id: 6, name: "1時間以上" },
      ],
      newIngredients: [{ name: "", amount: "" }],
      newHowTo: {
        text: "",
      },
    };
  },
  methods: {
    make() {
      this.cook = true;
      this.cooked = false;
    },
    made() {
      this.cooked = true;
      this.cook = false;
    },
    addIngredients() {
      // this.newIngredients.push → this.recipe.ingredients.push
      this.recipe.ingredients.push({
        name: this.newIngredients.name,
        amount: this.newIngredients.amount,
      });
      console.log(this.recipe.ingredients);
      this.newIngredients.name = "";
      this.newIngredients.amount = "";
    },
    removeIngredients(index) {
      // this.newIngredients → this.recipe.ingredients
      this.recipe.ingredients.splice(index, 1);
    },
    addHowTos() {
      this.recipe.howTos.push({
        text: this.newHowTo.text,
      });
      console.log(this.recipe.howTos);
      this.newHowTo.text = "";
    },
    removeHowTos(index) {
      this.recipe.howTos.splice(index, 1);
    },
    submitCook() {
      firebase
        .firestore()
        .collection("myCook")
        .add(this.recipe);
      this.cook = false;
      alert("投稿されました！！");
    },
    submitCooked() {
      firebase
        .firestore()
        .collection("myCooked")
        .add(this.purchase);
      this.cooked = false;
      alert("投稿されました！！");
    },
  },
};
</script>

<style></style>
