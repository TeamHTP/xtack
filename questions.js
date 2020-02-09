var questionsApp = new Vue({
  el: '#questions',
  data: {
    questions: []
  },
  created: function () {
    getApi('/question', '', function (data, status) {
      if (status === 200) {
        this.questions = JSON.parse(data);
      }
    });
  },
  filters: {
    convert: function (value) {
      return moment(value, 'x').fromNow();
    },
    trim: function (value) {
      return value.substring(0, 140) + '...';
    },
    url: function (value) {
      return 'question.html?q=' + value;
    }
  }
});
