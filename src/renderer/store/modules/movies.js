import { remote } from 'electron'
import fs from 'fs'
import path from 'path'

const userData = remote.app.getPath('userData')
const persitentFileName = ''
const persitentFilePath = path.join(userData, persitentFileName + '.json')

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
  EDIT_MOVIE (state, {title, releasedate, id}) {
    state.list[id].title = title
    state.list[id].releasedate = releasedate
  },
  REGISTER_APP_DATA (state, data) {
    state.list = data.list
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
  }
}

export default {
  state,
  mutations,
  actions
}
