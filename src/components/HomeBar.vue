<template>
  <div class="home__bar">
    <div class="search_bar">
      <div class="search_box">
        <input
          id="search_input"
          type="text"
          placeholder="キーワードを入力"
          v-model="search_keyword"
          required
        />
        <img
          v-on:click="search"
          id="search_icon"
          src="../assets/search_mark.png"
        />
      </div>
    </div>
    <div class="tab_items">
      <div class="tab_item current nav__link" @click="switchAll">すべて</div>
      <div class="tab_item current nav__link" @click="switchRecipes">手作り</div>
      <div class="tab_item current nav__link" @click="switchPurchases">市販</div>
    </div>
    <br>
  </div>
</template>

<style scoped>
.home__bar {
  height: 50px;
  justify-content: space-between;
  align-items: stretch;
  background-color: #fffacd;
}
.nav__link {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #111;
  text-decoration: none;
}
.nav__link:visited {
  color: #111;
}
.nav__link:hover {
  font-weight: bold;
  color: #000;
  background-color: #ffdb99;
}
.nav__logo {
  font-size: 140%;
  /*width: 15%;  横幅*/
  margin-left: 3%;
}
.nav__items {
  display: flex;
}
.nav__item {
  width: 100px;
  /*border-left: 1px solid #111;  nav要素間の敷居*/
}
</style>
