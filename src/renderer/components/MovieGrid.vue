<template>
  <ul class="grid-container">
    <movie-grid-element 
      v-for="(movie, key) of $store.state.movies.list" :key="key" :movie-id="key"
      :movie-data="movie"
    />
    <movie-grid-element/>
  </ul>
</template>

<script>
import MovieGridElement from './MovieGridElement'

export default {
  name: 'movie-grid',
  components: {MovieGridElement}
}
</script>

<style lang="scss">
  .grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    @media screen and (max-width: 899px){
      grid-template-columns: repeat(2, 1fr);
    }
    @media screen and (max-width: 565px){
      grid-template-columns: repeat(1, 1fr);
    }
    grid-gap: 1rem;
  }
</style>

