import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/views').default,
      redirect: '/search',
      children: [
        {
          path: 'search',
          name: 'search',
          component: () => import('../components/ContentView/index.vue')
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
