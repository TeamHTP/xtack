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
        });
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

var comments = new Vue({
  el: '#comments',
  data: {
    comments: []
  },
  created: function () {
    getApi('', '', function (data, status) {
      if (status === 200) {
        
      }
    });
  },
  filters: {
    convert: function (value) {
      return moment(value, 'x').fromNow();
    }
  }
});
