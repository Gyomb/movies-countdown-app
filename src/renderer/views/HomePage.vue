<template>
  <div class="section">
    <div class="container">
      <h1 class="title has-text-light">
        Movies Countdown
      </h1>
      <movie-grid />
    </div>
  </div>
</template>

<script>
import MovieGrid from '@/components/MovieGrid'

export default {
  name: 'home-page',
  components: { MovieGrid }
}
</script>
