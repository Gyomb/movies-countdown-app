import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home-page',
      component: require('@/views/HomePage').default
    },
    {
      path: '/add-movie',
      name: 'add-movie',
      component: require('@/views/EditMovie').default
    },
    {
      path: '/edit-movie/:movieId',
      name: 'edit-movie',
      component: require('@/views/EditMovie').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
