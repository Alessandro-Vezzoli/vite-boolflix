<template>
  <footer class="bg-color-black">
    <p class="projectBy">CREATO DA VEZZO</p>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      name: "AppFooter",
    };
  },
};
</script>

<style scoped>
footer {
  color: #fff;
  text-align: center;
  bottom: 0;
  width: 101%;
  height: 50px;
  margin-bottom: -10px;
  margin-left: -10px;
}
.projectBy {
  padding-top: 15px;
}
</style>
