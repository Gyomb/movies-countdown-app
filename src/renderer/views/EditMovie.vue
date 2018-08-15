<template>
  <div class="section">
    <div class="container">
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
            :to="{name:'home-page'}"
          >
            Cancel
          </router-link>
        </div>
        <div class="control">
          <button class="button is-success" @click="editMovie">
            Edit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import flatPickr from 'vue-flatpickr-component'
export default {
  name: 'edit-movie',
  components: {flatPickr},
  data () {
    return {
      movietitle: '',
      moviedate: ''
    }
  },
  created () {
    this.movietitle = this.$store.state.movies.list[this.$route.params.movieId].title
    this.moviedate = this.$store.state.movies.list[this.$route.params.movieId].releasedate
  },
  methods: {
    editMovie () {
      this.$store.dispatch({
        type: 'MUTATE_AND_SAVE',
        mutation: 'EDIT_MOVIE',
        data: {id: this.$route.params.movieId, title: this.movietitle, releasedate: this.moviedate}
      })
      this.$router.push({name: 'home-page'})
    }
  }
}
</script>

<style lang="scss">
@import '~flatpickr/dist/flatpickr.css';
@import '~flatpickr/dist/themes/dark.css';

</style>
