const HomeView = Vue.component('HomeView', {
  template: '#home-view',
  delimiters: ['[[', ']]'],
  data: function () {
  	return {
  		tests: []
  	}
  },
  watch: {
    '$route.name' () {
      if (this.$route.name) {
        this.fetchTests()
      }
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
