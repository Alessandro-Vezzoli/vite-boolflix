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

  <main v-for="card in cards">
    Titolo film: {{ card.title || card.name }} <br />
    Titolo originale film: ({{
      card.original_title || card.original_name
    }})<br />
    Lingua: {{ getFlag(card.original_language) }}
    <br />
    <div>
      Voto::
      <template v-for="star in getStars(card.vote_average)">
        <span class="star">&#9733;</span>
      </template>
    </div>
    <br /><br />
  </main>

  <footer class="bg-color-black">
    <p>CREATO DA VEZZO</p>
  </footer>
</template>
<script>
import axios from "axios";
import { apiKey, bearerToken } from "./config.js";
import { getFlag } from "./assets/languages.js";
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
          console.log(this.cards);
        })
        .catch((err) => console.log(err));
    },
    getFlag,
    searchMovies() {
      if (this.searchText.trim() === "") {
        this.fetchMovies();
        return;
      }

      const searchUrl = `${this.url}/search/movie?query=${this.searchText} && ${this.url}/search/tv?query=${this.searchText};`;
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
    getStars(voto) {
      const votoArrotondato = Math.round(voto);
      const votoMappato = Math.min(Math.max(votoArrotondato, 1), 10);
      const stelle = Math.ceil(votoMappato / 2);

      return stelle;
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
.star {
  color: #ffc107;
  font-size: 18px;
}
</style>
