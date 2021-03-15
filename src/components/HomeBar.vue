<template>
  <div class="nav__bar">
    <div class="nav__items">
      <router-link to="/PostForm" class="nav__item nav__link">すべて</router-link>
      <router-link to="/PostForm" class="nav__item nav__link">手作り</router-link>
      <router-link to="/singUp" class="nav__item nav__link">市販</router-link>
    </div>
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
    <div class="recipes">
      <div class="tab_items">
        <div class="tab_item current"><a>すべて</a></div>
        <div class="tab_item"><a>手作り</a></div>
        <div class="tab_item"><a>市販</a></div>
      </div>
      <div class="recom">
        <h2>今日のおすすめ</h2>
        <div class="recom_items">
          <div class="recom_item">
            <div class="recom_description">
              <div class="recom_name">卵焼き</div>
              <div class="recom_easy">お手軽：★★★☆☆</div>
              <div class="recom_time">時間：10分</div>
            </div>
          </div>
          <div class="recom_item">
            <div class="recom_description">
              <div class="recom_name">カレーライス</div>
            </div>
          </div>
          <div class="recom_item">
            <div class="recom_description">
              <div class="recom_name">味の素「ザ★チャーハン」</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.nav__bar {
  height: 50px;
  display: flex;
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