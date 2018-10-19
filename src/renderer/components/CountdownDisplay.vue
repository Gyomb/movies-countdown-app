<template>
  <div class="countdown-display tags has-addons">
    <span class="tag is-large is-danger" v-if="this.isOut">{{this.isOut}}</span>
    <span class="tag is-large is-warning" v-if="this.rweeks">{{this.rweeks}} week{{this.rweeks>1?'s':''}}</span>
    <span class="tag is-large is-warning" v-if="this.rdays">{{this.rdays}} day{{this.rdays>1?'s':''}}</span>
    <span class="tag is-large is-warning" v-if="!this.rdays && this.rhours">{{this.rhours}} hour{{this.rhours>1?'s':''}}</span>
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
      return end - today
    },
    rweeks () {
      return this.rtime > 0 ? Math.floor(this.rtime / (1000 * 60 * 60 * 24 * 7)) : 0
    },
    rdays () {
      if (this.rtime < 0) {
        return 0
      }
      let days = Math.floor(this.rtime / (1000 * 60 * 60 * 24))
      if (this.rweeks > 0) {
        days = days % (this.rweeks * 7)
      }
      return days
    },
    rhours () {
      if (this.rtime < 0) {
        return 0
      }
      let hours = Math.floor(this.rtime / (1000 * 60 * 60))
      if (this.rdays > 0) {
        hours = hours % (this.rdays * 24)
      }
      return hours
    },
    isOut () {
      var msg = ''
      if (this.rtime <= 0) {
        msg = 'Out'
        msg += this.rtime >= -(1000 * 60 * 60 * 24) ? ' TODAY!' : ''
      }
      return msg
    }
  }
}
</script>

<style lang="scss">
  .tags.countdown-display {
    justify-content: center;
  }
</style>


