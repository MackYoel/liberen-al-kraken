const router = new VueRouter({
  routes: [
    { path: '/', component: HomeView, name: 'home' },
    { path: '/test/:id', component: TestView, name: 'test' }
  ]
})

const app = new Vue({
	router,
  el: '#app',
  delimiters: ['[[', ']]'],
  data: {
    some: 'data'
  }
})