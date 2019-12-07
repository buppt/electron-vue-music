import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/views').default,
      redirect: '/search/""',
      children: [
        {
          path: 'search/:searchText',
          name: 'search',
          component: () => import('../components/ContentView/index.vue')
        },
        {
          path: 'lyrics',
          name: 'lyrics',
          component: () => import('../components/Lyrics/index.vue')
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
