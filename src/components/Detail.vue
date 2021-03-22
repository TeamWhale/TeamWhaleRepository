<template>
  <div class="ViewModal">
    <div
      id="modal"
    >
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
        <div>時間：{{ detail.selected }}</div>
        <br />
        <!-- 材料 -->
        <div class="ingredient">
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
        <div class="howTo">
          <h3>作り方</h3>
          <div v-for="(newHoTo, index) in detail.newHoTo" :key="index">
            <div>{{ index + 1 }}. {{ newHoTo.text }}</div>
          </div>
        </div>
      </div>
      <div>
        <button @click="close">閉じる</button>
      </div>
    </div>
    <div id="overlay"></div>
  </div>
</template>

<script>
export default {
  props: {
    detail: [],
  },
  methods: {
    close() {
      this.$parent.$data["detailFlg"] = false;
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
  background-color: rgba(0, 0, 0, 0.65);
}
#modal {
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 2;
  transform: translate(-50%, -50%);
  width: 750px;
  height: 550px;
  max-width: 80%;
  max-height: 80%;
  box-sizing: border-box;
  padding: 32px;
  border-radius: 8px;
  background-color: #fff;
}
</style>
