<template>
  <li class="movie" :class="{'add': !movieData}">
    <template v-if="movieData">
    <div class="movie-header">
      <div class="movie-controls">
        <div role="button" class="edit-btn" @click="editMovie">
          <fa-icon icon="pen" />
        </div>
        <div role="button" class="close-btn" @click="deleteMovie">
          <fa-icon icon="times-circle" />
        </div>
      </div>
      <h2 class="title is-5 has-text-light is-capitalized">{{movieData.title||'Title unknown'}}</h2>
      <p class="subtitle is-5 has-text-danger">{{movieData.releasedate||'No release date'}}</p>
    </div>
    <countdown-display :enddate="movieData.releasedate"/>
    </template>
    <router-link v-else
      :to="{name:'add-movie'}"
    >
       <fa-icon icon="plus-circle" size="6x" />
    </router-link>
  </li>
</template>

<script>
import countdownDisplay from './CountdownDisplay'
export default {
  name: 'movie-grid-element',
  components: {countdownDisplay},
  props: {
    movieData: {
      type: [Object, Boolean],
      default () {
        return false
      }
    },
    movieId: Number
  },
  methods: {
    deleteMovie () {
      this.$store.dispatch({
        type: 'MUTATE_AND_SAVE',
        mutation: 'DEL_MOVIE',
        data: this.movieId
      })
    },
    editMovie () {
      this.$router.push({name: 'edit-movie', params: {movieId: this.movieId}})
    }
  }
}
</script>

<style lang="scss">
  .movie{
    background-color: $dark;
    color: $light;
    text-align: center;
    padding: 1rem;
    border-radius: .5rem;
    min-height: 10rem;
    display: flex;
    flex-direction: column;
    justify-content:space-between;
    &.add{
      justify-content: center;
      align-items: center;
      cursor: pointer;
      background-color: $black-bis;
      a{
        color: $grey;
      }
      &:hover{
        background-color: $grey-dark;
        a {
          color: $warning;
        }
      }
      &:active{
        background-color: $dark;
      }
    }
  }
  .movie-header{
    text-align: right;
    margin-bottom: 1rem;
  }
  .movie-controls {
    display: flex;
    margin-top: -.5em;
    margin-bottom: .1em;
    justify-content: flex-end;
  }
  .close-btn, .edit-btn{
    display: inline-block;
    cursor: pointer;
    margin-left: .5em;
    color: $grey;
    &:hover{
      color: $danger;
    }
  }
  .edit-btn:hover{
    color: $info;
  }
</style>
