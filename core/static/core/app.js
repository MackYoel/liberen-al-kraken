const router = new VueRouter({
  routes: [
    { path: '/', component: HomeView, name: 'home' },
    { path: '/quiz/:id', component: TestView, name: 'test' },
    { path: '/new-quiz/', component: QuizAddView, name: 'quiz_add' }
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

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

Vue.http.interceptors.push(function (request, next) {
  request.headers.set('X-CSRFToken', getCookie('csrftoken'))
  next()
})
