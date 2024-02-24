<template>
  <div class="cards-grid">
    <div v-for="card in cards" :key="card.id" class="card">
      <div class="card-content">
        <div class="card-image">
          <img
            :src="`${url_img}${card.backdrop_path || card.poster_path}`"
            alt="IMG"
          />
        </div>
        <div class="card-title">{{ card.title || card.name }}</div>
        <div class="card-original-title">
          ({{ card.original_title || card.original_name }})
        </div>
        <div class="card-language">
          {{ getFlag(card.original_language) }}
        </div>
        <div class="card-stars">
          Voto:
          <template v-for="star in getStars(card.vote_average)">
            <span class="star">&#9733;</span>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getFlag } from "../languages.js";

export default {
  props: {
    cards: Array,
  },
  data() {
    return {
      url_img: "https://image.tmdb.org/t/p/original",
    };
  },
  methods: {
    getFlag,

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
.cards-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.card {
  width: 200px;
  margin: 20px;
  background-color: #141414;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
}

.card:hover {
  transform: scale(1.05);
}

.card-content {
  padding: 16px;
  color: #fff;
}

.card-title {
  padding-top: 10px;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
}

.card-original-title {
  font-size: 14px;
  opacity: 0.8;
  margin-bottom: 8px;
}

.card-language {
  font-size: 20px;
  margin-bottom: 8px;
}

.card-stars {
  font-size: 14px;
}

.card-image {
  position: relative;
  overflow: hidden;
  height: 200px;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.star {
  color: #ffc107;
  font-size: 18px;
}
</style>
