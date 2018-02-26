const TestView = Vue.component('TestView', {
  template: '#test-view',
  delimiters: ['[[', ']]'],
  data: function () {
  	return {
      answer: {},
      test: {},
      questions: [],
      errors: 0,
      questionsIndex: 0,
      loadingQuestions: true,
      isActive: false,
      finished: false
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

    nextQuestion: function () {
      if (this.isOver) {
        this.finished = true
        this.answer = {}
      } else {        
        this.questionsIndex += 1
        this.answer = {}
      }
    },

    checkResponse: function (answer) {
      if (!this.finished && !this.answerExists) {
        this.answer = answer
        if (!this.answer.is_right) { this.errors += 1 }
      }
    },

    resetData: function () {
      this.answer = {}
      this.errors = 0
      this.questionsIndex = 0
      this.isActive = true
      this.finished = false
    }
  },
  computed: {
    currentQuestion: function () {
      return this.questions[this.questionsIndex]
    },
    isOver: function () {
      return (this.questionsIndex + 1) >= this.questions.length
    },
    answerExists: function () {
      return Object.keys(this.answer).length !== 0
    }
  }

})
