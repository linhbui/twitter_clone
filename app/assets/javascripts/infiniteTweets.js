$.InfiniteTweet = function (el, options) {
    this.$el = $(el);
    this.$el.find('a.fetch-more').on('click', this.fetchTweets.bind(this));
    this.lastCreatedAt = null;
	debugger
    this.$el.on("insert-tweet", this.insertTweet.bind(this));
};

$.InfiniteTweet.prototype.fetchTweets = function (event) {
    event.preventDefault();
    var options = {
        url: '../feed',
        type: "get",
        dataType: "json",
        success: function (response) {
            this.insertTweets(response);
            if (response.length < 20) {
                this.$el.find('a.fetch-more').empty().text('No more to fetch');
            }
        }.bind(this)
    };
    
    if (this.lastCreatedAt) {
      options.data = {
        max_created_at: this.lastCreatedAt
      };
    }
    $.ajax(options);
};

$.InfiniteTweet.prototype.insertTweets = function (response) {
    var $feed = this.$el.find('ul#feed');
    var templateCode = $("#tweet-template").html();
    var templateFn = _.template(templateCode);
    var renderedContent = templateFn({
        tweets: response
    })
    $("ul.tweets").append(renderedContent);
    this.lastCreatedAt = $(response).last()[0].created_at;
};

$.InfiniteTweet.prototype.insertTweet = function (event, data) {
    var $feed = this.$el.find('ul#feed');
    var templateCode = $("#tweet-template").html();
    var templateFn = _.template(templateCode);
    debugger
    var renderedContent = templateFn({
        tweets: [data]
    })
    $("ul.tweets").prepend(renderedContent);
    this.lastCreatedAt = $(data).last()[0].created_at;
}

$(function () {
    $("div.infinite-tweets").infiniteTweet();
});

$.fn.infiniteTweet = function () {
    return this.each(function () {
        new $.InfiniteTweet(this);
    });
};