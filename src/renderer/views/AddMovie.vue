<template>
  <div class="section">
    <div class="container">
      <h1 class="title has-text-light">
        Add a movie
      </h1>
      <div class="field">
        <label class="label has-text-light">Title</label>
        <div class="control">
          <input type="text" class="input" v-model="movietitle">
        </div>
      </div>
      <div class="field">
        <label class="label has-text-light">Release date</label>
        <div class="control">
          <flat-pickr 
            v-model="moviedate"
            class="input"
            :config="{inline: false, dateFormat: 'l d M Y', wrap: true}"
          />
        </div>
      </div>
      <div class="field is-grouped">
        <div class="control">
          <router-link
            class="button"
            to="home-page"
          >
            Cancel
          </router-link>
        </div>
        <div class="control">
          <button class="button is-success" @click="submitMovie">
            Add
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import flatPickr from 'vue-flatpickr-component'
export default {
  name: 'add-movie',
  components: {flatPickr},
  data () {
    return {
      movietitle: '',
      moviedate: ''
    }
  },
  methods: {
    submitMovie () {
      this.$store.dispatch({
        type: 'MUTATE_AND_SAVE',
        mutation: 'ADD_MOVIE',
        data: {title: this.movietitle, releasedate: this.moviedate}
      })
      this.$router.push('home-page')
    }
  }
}
</script>

<style lang="scss">
@import '~flatpickr/dist/flatpickr.css';
@import '~flatpickr/dist/themes/dark.css';

</style>
