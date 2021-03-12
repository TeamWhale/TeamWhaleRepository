<template>
  <div class="nav__bar">
    <router-link to="/" class="nav__logo nav__link">レシピサイト</router-link>
    <div class="nav__items">
      <router-link to="/PostForm" class="nav__item nav__link">投稿</router-link>
      <router-link to="/singIn" class="nav__item nav__link"
        >ログイン</router-link
      >
      <router-link to="/singUp" class="nav__item nav__link"
        >新規登録</router-link
      >
    </div>
  </div>
</template>

<style scoped>
.nav__bar {
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  background-color: #fff;
}
.nav__link {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #3f1f1a;
  text-decoration: none;
}
.nav__link:visited {
  color: #3f1f1a;
}
.nav__link:hover {
  font-weight: bold;
  border-bottom: 2px solid #f90;
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
  /*border-left: 1px solid #3f1f1a;  nav要素間の敷居*/
}
</style>
