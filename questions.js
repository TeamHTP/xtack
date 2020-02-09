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
          getApi(`/account/${questionsApp.questions[i].author_uuid}`, '', function (data2, status) {
            for (var j = 0; j < questionsApp.questions.length; j++) {
              if (questionsApp.questions[j].author_uuid == JSON.parse(data2).uuid) {
                questionsApp.questions[j].author = JSON.parse(data2).username;
                questionsApp.$forceUpdate();
              }
            }
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
      return 'question.html#' + value;
    }
  }
});
