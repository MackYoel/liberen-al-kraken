const TestView = Vue.component('TestView', {
  template: '#test-view',
  delimiters: ['[[', ']]'],
  data: function () {
  	return {
      test: {},
      response: {},
      questions: [],
      userAnswers: [],
      isActive: false,
      isRight: null,
      finished: false,
      questionsIndex: 0,
      loadingQuestions: true,
      errors: 0
  	}
  },
  mounted: function () {
  	this.fetchTest()
  },

  methods: {
  	fetchTest: function () {
  		const APIUrl = `/tests/api/tests/${this.$route.params.id}/`
  		this.$http.get(APIUrl).then(function (response) {
  			this.test = response.body
  		})

      this.fetchQuestions()
  	},

    fetchQuestions: function () {
      const APIUrl = `/tests/api/tests/${this.$route.params.id}/questions/`
      this.$http.get(APIUrl).then(function (response) {
        this.questions = response.body
        this.loadingQuestions = false
      })
    },

    checkResponse: function (response) {
      this.isRight = response.is_right
      const _this = this
      setTimeout(() => {
        if ((this.questionsIndex + 1) >= this.questions.length) {
          this.finished = true
          this.isRight = null
          if (!response.is_right) {
            this.errors += 1
          }
          return
        }

        this.isRight = null
        this.questionsIndex += 1
        if (!response.is_right) {
          this.errors += 1
        }


      }, 1000)
    }
  },
  computed: {
    currentQuestion: function () {
      return this.questions[this.questionsIndex]
    }

  }

})
