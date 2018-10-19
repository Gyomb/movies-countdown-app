<template>
  <div class="section">
    <div class="container">
      <h1 class="title has-text-light">
        {{newMovie ? 'Add a  movie' : 'Edit'}}
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
      <drop class="box" @drop="readAndDisplay">
        <span v-if="!loadedImageSrc">
          Drag an image here from your disk<br>or paste its path in the field bellow
        </span>
        <div v-else class="image-cropped">
          <figure>
            <img :src="loadedImageSrc">
          </figure>
          <div role="button" class="close-btn top-corner" @click="eraseImage">
            <fa-icon icon="times-circle" />
          </div>
        </div>
        <div class="control">
          <input type="text" class="input" placeholder="/" v-model="loadedImagePath">
        </div>
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
      newMovie: false,
      movietitle: '',
      moviedate: '',
      loadedImagePath: '',
      loadedImageName: '',
      imageEmptied: false
    }
  },
  created () {
    if (this.$store.state.movies.list[this.movieId]) {
      this.movietitle = this.$store.state.movies.list[this.movieId].title
      this.moviedate = this.$store.state.movies.list[this.movieId].releasedate
    }
  },
  computed: {
    loadedImageSrc () {
      let fileprotocol = 'file://'
      if (this.loadedImagePath) {
        return (this.imageIsHttp ? '' : fileprotocol) + this.loadedImagePath
      }
      if (!this.imageEmptied &&
      this.$store.state.movies.list[this.movieId] &&
      this.$store.state.movies.list[this.movieId].imagepath) {
        return fileprotocol + this.$store.state.movies.list[this.movieId].imagepath
      }
      return false
    },
    movieId () {
      if (this.$store.state.movies.list[this.$route.params.movieId]) {
        return this.$route.params.movieId
      } else {
        this.newMovie = true
        return this.$store.state.movies.list.length
      }
    },
    imageIsHttp () {
      return /^https?:\/\//.test(this.loadedImagePath)
    }
  },
  methods: {
    editMovie () {
      if (this.imageEmptied) {
        this.$store.commit('ERASE_IMAGE_REF', this.movieId)
      }
      this.$store.dispatch({
        type: 'SAVE_MOVIE',
        id: this.movieId,
        title: this.movietitle,
        releasedate: this.moviedate,
        imagename: this.loadedImageName,
        imagepath: this.loadedImagePath,
        isHttp: this.imageIsHttp
      }).then(this.$router.push({name: 'home-page'}))
    },
    eraseImage () {
      this.loadedImagePath = ''
      this.loadedImageName = ''
      this.imageEmptied = true
    },
    readAndDisplay (data, event) {
      event.preventDefault()
      const files = event.dataTransfer.files
      const filenames = []
      for (let i = 0; i < files.length; i++) {
        filenames.push(files.item(i).name)
      }
      if (files[0]) {
        this.loadedImagePath = files[0].path
        this.loadedImageName = files[0].name
        this.imageEmptied = false
      } else {
        console.log(data)
        console.log(event)
      }
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
  img {
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
  }
}

.close-btn{
  display: inline-block;
  cursor: pointer;
  margin-left: .5em;
  &:hover{
    color: $danger;
  }
}
.top-corner {
  position: absolute;
  top: 0;
  right: 5px;
}

</style>
