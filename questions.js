var questionsApp = new Vue({
  el: '#questions',
  data: {
    questions: [],
    loaded: false
  },
  created: function () {
    getApi('/question/list', '', function (data, status) {
      if (status === 200) {
        questionsApp.questions = JSON.parse(data);
        for (var i = 0; i < questionsApp.questions.length; i++) {
          /*getApi(`/account/${questionsApp.questions[i].author_uuid}`, '', function (data2, status) {
            for (var j = 0; j < questionsApp.questions.length; j++) {
              if (questionsApp.questions[j].author_uuid == JSON.parse(data2).uuid) {
                questionsApp.questions[j].author = JSON.parse(data2).username;
                questionsApp.$forceUpdate();
              }
            }
          });*/
          var question = questionsApp.questions[i];
          queryAccountsCache(question.author_uuid, function (account) {
            for (var j = 0; j < questionsApp.questions.length; j++) {
              if (questionsApp.questions[j].author_uuid == account.uuid) {
                questionsApp.questions[j].author = account.username;
                questionsApp.$forceUpdate();
              }
            }
          });
        }
        questionsApp.loaded = true;
      }
    });
  },
  filters: {
    convert: function (value) {
      return moment(value, 'x').fromNow();
    },
    trim: function (value) {
      return value.length > 140 ? value.substring(0, 137) + '...' : value;
    },
    url: function (value) {
      return 'question.html#' + value;
    }
  }
});
