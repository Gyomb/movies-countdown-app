<template>
  <div id="app">
    <router-view v-if="dataLoaded"></router-view>
  </div>
</template>

<script>
  export default {
    name: 'movie-countdown',
    data () {
      return {
        dataLoaded: false
      }
    },
    beforeCreate () {
      this.$store.dispatch('LOAD_PERSISTENT_DATA')
        .then(
          () => { this.dataLoaded = true },
          err => console.warn(err)
        )
    }
  }
</script>

<style lang="scss">
</style>
