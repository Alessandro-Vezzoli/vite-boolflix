<template>
  <header class="p-4 bg-color-black">
    <div class="logo pr-3">
      <img src="/Netflix-Symbol.png" alt="Logo" />
    </div>
    <div class="brand-text pl-3">BOOLFLIX</div>
  </header>
  <main v-for="card in cards">
    {{ card.original_title }}
  </main>

  <footer class="bg-color-black">
    <p>CREATO DA VEZZO</p>
  </footer>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      url: "https://api.themoviedb.org/3/search/movie?query=simpson&api_key=99c41b3e6bab796d423dcb20a0127b84",
      cards: [],
    };
  },
  mounted() {
    axios.get(this.url).then((response) => {
      console.log("ciao");
      console.log(response.data.results);
      this.cards = response.data.results;
    });
  },
};
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

header {
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
}

footer {
  color: #fff;
  text-align: center;
  position: fixed;
  bottom: 0;
  width: 105%;
  height: 50px;
  margin-left: -10px;
}

.bg-color-black {
  background-color: #333;
}
.logo {
  width: 50px;
}

.logo img {
  width: 50px;
}
.brand-text {
  font-size: 18px;
}
</style>
