<template>
  <AppHeader @search="searchMovies" />
  <main>
    <CardsGrid :cards="cards" />
  </main>

  <AppFooter></AppFooter>
</template>
<script>
import axios from "axios";
import { apiKey, bearerToken } from "./config.js";
import { getFlag } from "./languages.js";
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";
import CardsGrid from "./components/CardsGrid.vue";

export default {
  components: { AppHeader, AppFooter, CardsGrid },

  data() {
    return {
      url: "https://api.themoviedb.org/3",
      cards: [],
    };
  },
  props: {
    searchText: String,
    searchMovies: Function,
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
          //console.log(response.data.results);
          this.cards = response.data.results;
          //console.log(this.cards);
        })
        .catch((err) => console.log(err));
    },
    getFlag,
    searchMovies(searchText) {
      if (searchText.trim() == "") {
        this.fetchMovies();
      }
      const movieSearchUrl = `${this.url}/search/movie?query=${searchText} && ${this.url}/search/tv?query=${searchText};`;
      const tvSearchUrl = `${this.url}/search/tv?query=${searchText}`;

      console.log(movieSearchUrl);
      console.log(searchText);
      Promise.all([
        axios.get(movieSearchUrl, {
          headers: { Authorization: `Bearer ${bearerToken}` },
        }),
        axios.get(tvSearchUrl, {
          headers: { Authorization: `Bearer ${bearerToken}` },
        }),
      ])
        .then(([movieResponse, tvResponse]) => {
          const movieResults = movieResponse.data.results;
          const tvResults = tvResponse.data.results;

          this.cards = [...movieResults, ...tvResults];
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

.bg-color-black {
  background-color: #333;
}

.brand-text {
  font-size: 18px;
}
</style>
