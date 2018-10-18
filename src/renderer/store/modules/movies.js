import Vue from 'vue'
import { remote } from 'electron'
import fs from 'fs'
import path from 'path'
import axios from 'axios'

axios.defaults.adapter = require('axios/lib/adapters/http')

const userData = remote.app.getPath('userData')
const persitentFileName = ''
const persitentFilePath = path.join(userData, persitentFileName + '.json')
const imagesUserFilePath = path.join(userData, 'images')
if (!fs.existsSync(imagesUserFilePath)) {
  fs.mkdirSync(imagesUserFilePath)
}

const state = {
  list: [
    // {
    //   title: 'my movie',
    //   releasedate: '2018-08-24'
    // },
    // {
    //   title: 'Fantastic beasts and where to find them: The Crimes of Grindelwald',
    //   releasedate: '2018-11-14'
    // },
    // {
    //   title: 'Captain Marvel',
    //   releasedate: '2019-03-06'
    // },
    // {}
  ]
}

const mutations = {
  ADD_MOVIE (state, {title, releasedate}) {
    state.list.push({title, releasedate})
  },
  DEL_MOVIE (state, id) {
    state.list.splice(id, 1)
  },
  EDIT_MOVIE (state, {id, title, releasedate, imagepath}) {
    if (state.list[id]) {
      if (title) Vue.set(state.list[id], 'title', title)
      if (releasedate) Vue.set(state.list[id], 'releasedate', releasedate)
      if (imagepath) Vue.set(state.list[id], 'imagepath', imagepath)
    } else {
      console.error(`Movie #${id} do not exist`)
    }
  },
  REGISTER_APP_DATA (state, data) {
    state.list = data.list
  },
  ERASE_IMAGE_REF (state, movieId) {
    if (state.list[movieId]) {
      Vue.set(state.list[movieId], 'imagepath', '')
    }
  }
}

const actions = {
  LOAD_PERSISTENT_DATA ({commit}) {
    return new Promise(function (resolve, reject) {
      return fs.readFile(persitentFilePath, 'utf-8', (err, data) => {
        if (err) {
          if (err.code === 'ENOENT') {
            resolve({})
          } else {
            reject(err)
          }
        } else {
          commit('REGISTER_APP_DATA', JSON.parse(data))
          resolve(JSON.parse(data))
        }
      })
    })
  },
  SAVE_PERSISTENT_DATA ({state}) {
    return new Promise(function (resolve, reject) {
      return fs.writeFile(persitentFilePath, JSON.stringify(state), (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  },
  MUTATE_AND_SAVE ({dispatch, commit}, {mutation, data}) {
    commit(mutation, data)
    dispatch({
      type: 'SAVE_PERSISTENT_DATA'
    })
  },
  SAVE_MOVIE ({state, dispatch, commit}, {id, title, releasedate, imagename, imagepath, isHttp}) {
    if (!state.list[id]) {
      commit('ADD_MOVIE', {title, releasedate})
      id = state.list.length - 1
    }
    if (imagepath) {
      if (!imagename) {
        imagename = imagepath.match(/[\w.*_-]+\.[\w-]{2,5}$/)
        if (imagename !== null) {
          imagename = imagename[0]
        }
      }
      var newImagepath = path.join(imagesUserFilePath, imagename)
      if (newImagepath !== imagepath) {
        if (isHttp) {
          axios({
            method: 'get',
            url: imagepath,
            responseType: 'stream'
          })
            .then(response => {
              response.data.pipe(fs.createWriteStream(newImagepath))
                .on('close', saveAndRegisterImage)
            })
        } else {
          fs.readFile(imagepath, (err, data) => {
            if (err) {
              alert('An error occurred reading the file :' + err.message)
              return
            }
            fs.writeFile(newImagepath, data, 'binary', (err) => {
              if (err) {
                return alert('An error occurred creating the file ' + err.message)
              }
              saveAndRegisterImage(data)
            })
          })
        }
      }
    }
    function saveAndRegisterImage () {
      dispatch({
        type: 'MUTATE_AND_SAVE',
        mutation: 'EDIT_MOVIE',
        data: {
          id,
          title,
          releasedate,
          imagepath: newImagepath
        }
      })
    }
  }
}

export default {
  state,
  mutations,
  actions
}
