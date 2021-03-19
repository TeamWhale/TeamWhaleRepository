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
      <router-link to="/" class="tab_item current nav__link"
        >すべて</router-link
      >
      <router-link to="/HomeRecipe" class="tab_item nav__link"
        >手作り</router-link
      >
      <router-link to="/HomePurchase" class="tab_item nav__link"
        >市販</router-link
      >
    </div>
    <div class="recipes">
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

<script>
export default {};
</script>

<style></style>
