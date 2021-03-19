<template>
  <div class="home">
    <HomeBar />
  </div>
</template>

<script>
import HomeBar from "@/components/HomeBar.vue";

export default {
  name: "Home",
  components: {
    HomeBar,
  },
};
</script>

<style>
* {
  color: #3f1f1a;
}
.search_bar {
  display: flex;
  width: 100%;
  height: 54px;
  background-color: #ff9900;
  justify-content: center;
}
.search_box {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 500px;
  background-color: #f8f5f4;
  border-radius: 4px;
  margin-top: 7px;
  padding: 5px;
}
#search_input {
  font-size: 16px;
  width: 100%;
  background-color: #f8f5f4;
  border: none;
  outline: none;
  box-sizing: border-box;
}
#searchInput:focus {
  border: #f8f5f4;
}
#search_icon {
  height: 30px;
  width: 30px;
  padding: 5px 5px;
}
#search_icon:hover {
  cursor: pointer;
}

h2 {
  margin-left: 3%;
  font-weight: normal;
}
</style>
