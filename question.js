var question = new Vue({
  el: '#question',
  data: {
    question: {}
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
        getApi('', '', function (data, status) {
          if (status === 200) {

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
