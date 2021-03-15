<template>
  <div>
    <h1>投稿</h1>
    <div>
      <button @click="make">手作り</button>
      <button @click="made">市販</button>
    </div>
      <!-- 手作り投稿 -->
    <div v-if="cook">
      <h2>手作り</h2>
      <form @submit.prevent="makePostForm">
        <!-- 料理名 -->
      <div class="title">
        <input v-model="makeRecipe.title" type="text" placeholder="料理タイトル">
      </div>
      <!-- 調理時間 -->
      <div>
        <h2>調理時間</h2>
        <div>
          <select name="time" v-model="makeRecipe.selected">
            <option disabled value="">選択してください</option>
            <option v-for="option in options" :key="option.id">
             {{option.name}}
            </option>
          </select>
        </div>
      </div>
      <br>
      <!-- 写真 -->
      <div>
        <input type="file" accept="image/*" @change="onImageUploadedMake($event)">
        <img :src="makeRecipe.image" alt="料理の写真" width="300" height="200">
      </div>
      <!-- 紹介文 -->
      <div class="introduce">
        <textarea v-model="makeRecipe.introduce" id="" cols="30" rows="10" placeholder="紹介文"></textarea>
      </div>
      <!-- 材料 -->
      <div class="ingredients">
        <h2>材料</h2> 
        <div v-for="(newIngredient, index) in makeRecipe.newIngredients" :key="index">
          <input v-model="newIngredient.name" type="text" placeholder="玉ねぎ">
          <input v-model="newIngredient.amount" type="text" placeholder="一個">
          <button @click.prevent="removeIngredients(index)">削除</button>
        </div>
          <button @click.prevent="addIngredients">材料を追加する</button>
      </div>
      <!-- 作り方 -->
      <div class="howTo" >
        <h2>作り方</h2>
        <div v-for="(newHowTo, index) in makeRecipe.newHowTos" :key="index">
           {{index + 1}}
          <textarea v-model="newHowTo.text" cols="30" rows="5" placeholder="作り方"></textarea>
          <button @click.prevent="removeNewHowTos(index)">削除</button>
        </div>
          <button @click.prevent="addNewHowTos">作り方を追加する</button>
      </div>
      <!-- 投稿ボタン -->
      <div>
        <button type="submit" class="make-button">投稿</button>
      </div>
      </form>
    </div>

      <!-- 市販投稿 -->
    <div v-if="cooked">
      <h2>市販</h2>
      <form @submit.prevent="madePostForm">
        <!-- タイトル -->
        <div class="title">
          <input v-model="madeRecipe.title" type="text" placeholder="料理タイトル">
        </div>
        <!-- 写真 -->
        <div>
          <input type="file" accept="image/*" @change="onImageUploadedMade($event)">
          <img :src="madeRecipe.image" alt="料理の写真" width="300" height="200">
        </div>
        <!-- 紹介文 -->
        <div class="introduce">
          <textarea id="" cols="30" rows="10" placeholder="紹介文"></textarea>
        </div>
        <!-- 投稿ボタン -->
        <div>
          <button type="submit" class="make-button">投稿</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from "firebase"
import "firebase/firestore"
import "firebase/auth"
export default {
  data(){
    return{
      cook: false,
      cooked: false,
      makeRecipe: {
        title: "",
        selected: "",
        image: "",
        introduce: "",
        newIngredients: [
          {name: "", amount: ""}
        ],
        newHowTos: [
          {text: ""}
        ],
      },
      madeRecipe: {
        title: "",
        image: "",
        introduce: "",
      },
      options: [
        {id: 1, name: "５分以内"},
        {id: 2, name: "約１０分"},
        {id: 3, name: "約１５分"},
        {id: 4, name: "約３０分"},
        {id: 5, name: "約１時間"},
        {id: 6, name: "1時間以上"}
      ],
    }
  },
  methods:{
    make(){
      this.cook= true
      this.cooked = false
    },
    made(){
      this.cooked= true
      this.cook= false
    },
    addIngredients(){
      this.makeRecipe.newIngredients.push({
        name: "",
        amount: ""
      })
    },
    removeIngredients(index){
      this.makeRecipe.newIngredients.splice(index, 1)
    },
    addNewHowTos(){
      this.makeRecipe.newHowTos.push({
        text: ""
      })
    },
    removeNewHowTos(index){
      this.makeRecipe.newHowTos.splice(index, 1)
    },
    // makeの写真投稿メソッド
    onImageUploadedMake(e){
      const image = e.target.files[0]
      this.createImageMake(image)
    },
    createImageMake(image){
      const render = new FileReader()
      render.readAsDataURL(image)
      render.onload = () =>{
        this.makeRecipe.image = render.result
      }
    },
    // madeの写真投稿メソッド
    onImageUploadedMade(e){
      const image = e.target.files[0]
      this.createImageMade(image)
    },
    createImageMade(image){
      const render = new FileReader()
      render.readAsDataURL(image)
      render.onload = () =>{
        this.madeRecipe.image = render.result
      }
    },
    // firebaseに保存
    makePostForm(){
      firebase.firestore().collection("recipe").add({
        recipe: this.makeRecipe
      })
    }
  }
}
</script>

<style>

</style>