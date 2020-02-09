var questionsApp = new Vue({
  el: '#questions',
  data: {
    questions: []
  },
  created: function () {
    getApi('/question/list', '', function (data, status) {
      if (status === 200) {
        questionsApp.questions = JSON.parse(data);
        for (var i = 0; i < questionsApp.questions.length; i++) {
          getApi(`/account/${questionsApp.questions[i].author_uuid}`, '', function (data, status) {
            questionsApp.questions[i].author = JSON.parse(data).username;
          });
        }
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
