const QuizAddView = Vue.component('QuizAddView', {
  template: '#quiz-add-view',
  delimiters: ['[[', ']]'],

  data: function () {
  	return {
      quiz: {},
      errors: '',
  		questions: [],
      newQuestion: { answers: [], newAnswer: {} },
      saving: false
  	}
  },

  watch: {
    '$route.name' () {
      if (this.$route.name) {
        this.resetData()
      }
    }
  },

  mounted: function () {
    this.resetData()
  },

  methods: {
    resetData: function () {
      Object.assign(this.$data, this.$options.data())
    },

    addQuestion: function () {
      if (!this.newQuestion.title) { return }
      this.questions.push(this.newQuestion)
      this.newQuestion = { answers: [], newAnswer: {} }
    },

    addAnswer: function (question) {
      if (!question.newAnswer.content) { return }
      question.answers.push(question.newAnswer)
      question.newAnswer = {}
    },
    saveQuiz: function () {
      this.saving = true
      this.quiz.questions = this.questions

      const APIUrl = '/tests/api/new-quiz/'
      this.$http.post(APIUrl, this.quiz).then(function (response) {
        this.$router.push('/')
      }, err => {
        this.saving = false
        this.errors = err.body
        console.log('this.errors:', this.errors)
      })
    },

    removeQuestion: function (index) {
      this.questions.splice(index, 1)
    }
  }

})
