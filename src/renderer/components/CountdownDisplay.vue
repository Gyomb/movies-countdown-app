<template>
  <div class="countdown-display tags has-addons">
    <span class="tag is-large is-danger" v-if="this.isOut">{{this.isOut}}</span>
    <span class="tag is-large is-warning" v-if="this.rtime.months">{{this.rtime.months}} month{{this.rtime.months>1?'s':''}}</span>
    <span class="tag is-large is-warning" v-if="this.rtime.days">{{this.rtime.days}} day{{this.rtime.days>1?'s':''}}</span>
  </div>
</template>

<script>
export default {
  name: 'countdown-display',
  props: {
    enddate: String
  },
  computed: {
    end () {
      return new Date(this.enddate).getDate()
      // return new Date(this.enddate).getTime() / (1000 * 60 * 60 * 24)
    },
    now () {
      return new Date().getDate()
      // return new Date().getTime() / (1000 * 60 * 60 * 24)
    },
    rtime () {
      let today = new Date()
      let end = new Date(this.enddate)
      let remaining = {
        years: end.getFullYear() - today.getFullYear()
      }
      function diffDateParts (part, today, end) {
        switch (part) {
          case 'month': return end.getMonth() - today.getMonth()
          case 'day':
          default: return end.getDate() - today.getDate()
        }
      }
      function addDateParts (part, today, end) {
        switch (part) {
          case 'month': return 12 - today.getMonth() + end.getMonth()
          case 'day':
          default: return new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate() - today.getDate() + end.getDate()
        }
      }
      if (remaining.years >= 0) {
        if (remaining.years === 0) {
          remaining.months = diffDateParts('month', today, end)
        } else {
          remaining.years--
          remaining.months = addDateParts('month', today, end)
        }
        if (remaining.months >= 0) {
          if (remaining.months === 0) {
            remaining.days = diffDateParts('day', today, end)
          } else {
            remaining.months--
            remaining.days = addDateParts('day', today, end)
          }
          if (remaining.days >= 0) {
            return remaining.days === 0 ? 0 : remaining
          }
        }
      }
      return -1
    },
    isOut () {
      var msg = ''
      if (this.rtime <= 0) {
        msg = 'Released'
        msg += this.rtime === 0 ? ' TODAY!' : ''
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


