<template>
  <header class="p-4 bg-color-black">
    <div class="logo pr-3">
      <img src="/Netflix-Symbol.png" alt="Logo" />
    </div>
    <div class="brand-text pl-3">BOOLFLIX</div>
  </header>
  <!-- Aggiunta della barra di ricerca -->
  <div class="search-bar p-3 bg-color-black">
    <input type="text" placeholder="Cerca film..." v-model="searchText" />
    <button @click="searchMovies">Cerca</button>
  </div>
  <flag iso="it" />
  <flag iso="it" />

  <main v-for="card in cards">
    Titolo film: {{ card.title }}<br />
    Titolo originale film: ({{ card.original_title }})<br />
    Lingua: {{ card.original_language }}
    <flag-icon :iso="getCountryCode(card.original_language)" />
    <br />

    Voto: {{ card.vote_average }} <br /><br />
  </main>

  <footer class="bg-color-black">
    <p>CREATO DA VEZZO</p>
  </footer>
</template>
<script>
import axios from "axios";
import { apiKey, bearerToken } from "./config.js";

export default {
  data() {
    return {
      url: "https://api.themoviedb.org/3",
      cards: [],
      searchText: "",
    };
  },
  mounted() {
    this.fetchMovies();
  },
  methods: {
    fetchMovies() {
      const listPopular = `${this.url}/movie/popular`;

      axios
        .get(listPopular, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        })
        .then((response) => {
          console.log(response.data.results);
          this.cards = response.data.results;
        })
        .catch((err) => console.log(err));
    },
    searchMovies() {
      if (this.searchText.trim() === "") {
        this.fetchMovies();
        return;
      }
      const searchUrl = `${this.url}/search/movie?query=${this.searchText}`;
      console.log(searchUrl);

      axios
        .get(searchUrl, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        })
        .then((response) => {
          console.log(response.data.results);
          this.cards = response.data.results;
        })
        .catch((err) => console.log(err));
    },
    getCountryCode(languageCode) {
      const country = languageCodes.getAlpha2Code(languageCode);
      console.log("Language Code:", languageCode);
      console.log("Country Code:", country);
      return country || "unknown";
    },
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
.search-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-bar input {
  width: 70%;
  padding: 8px;
}

.search-bar button {
  background-color: #fff;
  color: #333;
  padding: 8px 16px;
  border: none;
  cursor: pointer;
}
</style>
