<template>
  <div class="home__wrapper"></div>
</template>

<script>
export default {
  name: "searchTrial",
  data() {
    return {
      text: "",
      keyword: "",
      recipes: [],
      recipe: {
        title: "",
        introduce: "",
        type: "",
      },
    };
  },
};
</script>

<style scoped></style>
