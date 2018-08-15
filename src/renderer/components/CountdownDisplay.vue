<template>
  <div class="countdown-display tags has-addons">
    <span class="tag is-large is-warning" v-if="this.rweeks">{{this.rweeks}} week{{this.rweeks>1?'s':''}}</span>
    <span class="tag is-large is-warning" v-if="this.rdays">{{this.rdays}} day{{this.rdays>1?'s':''}}</span>
  </div>
</template>

<script>
export default {
  name: 'countdown-display',
  props: {
    enddate: String
  },
  computed: {
    rtime () {
      let today = new Date().getTime()
      let end = new Date(this.enddate).getTime()
      return today > end ? 0 : end - today
    },
    rweeks () {
      return Math.floor(this.rtime / (1000 * 60 * 60 * 24 * 7))
    },
    rdays () {
      return Math.floor(this.rtime / (1000 * 60 * 60 * 24)) % (this.rweeks * 7)
    }
  }
}
</script>

<style lang="scss">
  .tags.countdown-display {
    justify-content: center;
  }
</style>


