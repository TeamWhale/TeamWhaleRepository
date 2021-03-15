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
        <input v-model="recipe.title" type="text" placeholder="料理タイトル">
      </div>
      <!-- 調理時間 -->
      <div>
        <h2>調理時間</h2>
      </div>
      <div>
        <select name="time" v-model="recipe.selected">
          <option disabled value="">選択してください</option>
          <option v-for="option in options" :key="option.id">
            {{option.name}}
          </option>
        </select>
      </div>
      <br>
      <!-- 写真 -->
      <div>
        <input type="file">
      </div>
      <!-- 紹介文 -->
      <div class="introduce">
        <textarea id="" cols="30" rows="10" placeholder="紹介文"></textarea>
      </div>
      <!-- 材料 -->
      <div class="ingredients">
        <h2>材料</h2>
        <div v-for="(ingredient, index) in recipe.ingredients" :key="index">
          {{index + 1}}  {{ingredient.name}} {{ingredient.amount}}
          <button @click.prevent="removeIngredients(index)">削除</button>
        </div>
        
        <div v-for="(newIngredient, index) in newIngredients" :key="index">
          <input v-model="newIngredient.name" type="text" placeholder="玉ねぎ">
          <input v-model="newIngredient.amount" type="text" placeholder="一個">
          <button @click.prevent="addIngredients">追加</button>
          <button @click.prevent="removeIngredients(index)">削除</button>
        </div>
      </div>
      <!-- 作り方 -->
      <div class="howTo" >
        <h2>作り方</h2>
        <div v-for="(howTo, index) in this.recipe.howTos" :key="index">
          {{index + 1}}  {{howTo.text}}
          <button @click.prevent="removeHowTos(index)">削除</button>
        </div>
        <div>
          <textarea v-model="newHowTo.text" cols="30" rows="5" placeholder="作り方"></textarea>
          <button @click.prevent="addHowTos">追加</button>
        </div>
      </div>
      <!-- 投稿ボタン -->
      <div>
        <button type="submit" class="make-button">投稿</button>
      </div>
      </form>
    </div>

    <div v-if="cooked">
      <h2>市販</h2>
      <form @submit.prevent="madePostForm">
        <div class="title">
        <input type="text" placeholder="料理タイトル">
        </div>
        <div>
        <input type="file">
        </div>
        <div class="introduce">
        <textarea id="" cols="30" rows="10" placeholder="紹介文"></textarea>
        </div>
        <div>
        <button type="submit" class="make-button">投稿</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
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
      options: [
        {id: 1, name: "５分以内"},
        {id: 2, name: "約１０分"},
        {id: 3, name: "約１５分"},
        {id: 4, name: "約３０分"},
        {id: 5, name: "約１時間"},
        {id: 6, name: "1時間以上"}
      ],
      newIngredients: [
        {name: "", amount: ""}
      ],
      newHowTo: {
        text: ""
      },
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
      this.newIngredients.push({
        name: "",
        amount: ""
      })
      this.newIngredient.name= ""
      this.newIngredient.amount= ""
    },
    removeIngredients(index){
      this.newIngredients.splice(index, 1)
    },
    addHowTos(){
      this.recipe.howTos.push({
        text: this.newHowTo.text
      })
      this.newHowTo.text= ""
    },
    removeHowTos(index){
      this.recipe.howTos.splice(index, 1)
    }
  }
}
</script>

<style>

</style>