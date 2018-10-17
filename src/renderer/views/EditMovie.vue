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
      <drop class="box" @drop="readAndDisplay">
        <span v-if="!loadedImageSrc">
          drag an image here
        </span>
        <figure v-else class="image-cropped">
          <img :src="loadedImageSrc">
        </figure>
      </drop>
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
      moviedate: '',
      loadedImagePath: '',
      loadedImageName: ''
    }
  },
  created () {
    this.movietitle = this.$store.state.movies.list[this.$route.params.movieId].title
    this.moviedate = this.$store.state.movies.list[this.$route.params.movieId].releasedate
  },
  computed: {
    loadedImageSrc () {
      let protocol = 'file://'
      if (this.loadedImagePath) return protocol + this.loadedImagePath
      if (this.$store.state.movies.list[this.$route.params.movieId].imagepath) return protocol + this.$store.state.movies.list[this.$route.params.movieId].imagepath
      return false
    }
  },
  methods: {
    editMovie () {
      this.$store.dispatch({
        type: 'SAVE_MOVIE',
        id: this.$route.params.movieId,
        title: this.movietitle,
        releasedate: this.moviedate,
        imagename: this.loadedImageName,
        imagepath: this.loadedImagePath
      })
      this.$router.push({name: 'home-page'})
    },
    readAndDisplay (data, event) {
      event.preventDefault()
      const files = event.dataTransfer.files
      const filenames = []
      for (let i = 0; i < files.length; i++) {
        filenames.push(files.item(i).name)
      }
      this.loadedImagePath = files[0].path
      this.loadedImageName = files[0].name
    }
  }
}
</script>

<style lang="scss">
@import '~flatpickr/dist/flatpickr.css';
@import '~flatpickr/dist/themes/dark.css';

.image-cropped {
  display: block;
  position: relative;
  margin: 0;
  padding: 0;
  padding-top: 56.25%;
  overflow: hidden;
  > img {
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
  }
}

</style>
