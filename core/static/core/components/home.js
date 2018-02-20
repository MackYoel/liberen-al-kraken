const HomeView = Vue.component('HomeView', {
  template: '#home-view',
  delimiters: ['[[', ']]'],
  data: function () {
  	return {
  		tests: []
  	}
  },
  mounted: function () {
  	this.fetchTests()
  },

  methods: {
  	fetchTests: function () {
  		const APIUrl = '/tests/api/tests/'
  		this.$http.get(APIUrl).then(function (response) {
  			this.tests = response.body
  		})
  	}
  }

})
