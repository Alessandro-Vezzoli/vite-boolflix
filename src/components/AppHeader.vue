<template>
  <header class="p-4 bg-color-black">
    <!-- LOGO -->
    <div class="logo pr-3">
      <img src="/Netflix-Symbol.png" alt="Logo" />
    </div>

    <!-- RICERCA -->
    <div>
      <div class="search-bar p-3 bg-color-black">
        <input type="text" placeholder="Cerca film..." v-model="searchText" />
        <button @click="handleSearch">Cerca</button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      name: "AppHeader",
      searchText: "",
    };
  },
  methods: {
    handleSearch() {
      this.$emit("search", this.searchText);
    },
  },
};
</script>

<style scoped>
header {
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
}
.logo {
  width: 50px;
}

.logo img {
  width: 50px;
}

.search-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.search-bar input {
  width: 100%;
  padding: 10px;
  border-radius: 20px;
}

.search-bar button {
  background-color: #fff;
  color: #f70000;
  padding: 10px 16px;
  border: none;
  cursor: pointer;

  border-radius: 50px;
}
.search-bar :hover {
  background-color: red;
  color: white;
  border-radius: 0px;
}
</style>
