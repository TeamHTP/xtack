var question = new Vue({
  el: '#question',
  data: {
    question: {}
  },
  created: function () {
    getApi(`/question/${location.hash.substring(1)}`, '', function (data, status) {
      if (status === 200) {
        question.question = JSON.parse(data);
        getApi(`/account/${question.question.author_uuid}`, '', function (data, status) {
          question.question.author = JSON.parse(data).username;
          question.$forceUpdate();
        });
        var opUpdateInterval = setInterval(function () {
          if (menuApp.account_uuid.length > 0) {
            comment.isOp = question.question.author_uuid == menuApp.account_uuid;
            commentsApp.isOp = question.question.author_uuid == menuApp.account_uuid;
            clearInterval(opUpdateInterval);
          }
        }, 500);
        if (menuApp.account_uuid.length > 0) {
          comment.isOp = question.question.author_uuid == menuApp.account_uuid;
          commentsApp.isOp = question.question.author_uuid == menuApp.account_uuid;
          clearInterval(opUpdateInterval);
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

var comment = new Vue({
  el: '#comment',
  data: {
    text: '',
    isOp: true
  },
  methods: {
    submit: function () {
      if (comment.text && comment.text.length !== 0) {
        postApi(`/question/${location.hash.substring(1)}/answer`, `body=${comment.text}`, function (data, status) {
          if (status === 200) {
            location.reload();
          }
        });
      }
    }
  }
});

var commentsApp = new Vue({
  el: '#commentsApp',
  data: {
    commentsList: [],
    isOp: true
  },
  created: function () {
    getApi(`/question/${location.hash.substring(1)}/answers`, '', function (data, status) {
      if (status === 200) {
        commentsApp.commentsList = JSON.parse(data);
        for (var i = 0; i < commentsApp.commentsList.length; i++) {
          getApi(`/account/${commentsApp.commentsList[i].author_uuid}`, '', function (data2, status) {
            for (var j = 0; j < commentsApp.commentsList.length; j++) {
              if (commentsApp.commentsList[j].author_uuid == JSON.parse(data2).uuid) {
                commentsApp.commentsList[j].author = JSON.parse(data2).username;
                commentsApp.$forceUpdate();
              }
            }
          });
        }
        commentsApp.$forceUpdate();
      }
    });
  },
  methods: {
    solution: function(answerUuid) {
      getApi(`/questions/${question.question.uuid}/answer/${answerUuid}/accept`, '', function (data, status) {
        console.log(data);
      });
    }
  },
  filters: {
    convert: function (value) {
      return moment(value, 'x').fromNow();
    }
  }
});
