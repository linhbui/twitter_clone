$.UserSearch = function (el) {
    this.$el = $(el);
    this.$input = this.$el.children("input");
    this.$ul = this.$el.children("ul.users");
    this.$input.on('keyup', this.handleInput.bind(this));
};

$.UserSearch.prototype.handleInput = function(event) {
    $.ajax({
        url: "search",
        data: {"query": this.$input.val()},
        dataType: "json",
        type: "GET",
        success: this.renderResults.bind(this)
    });

};

$.UserSearch.prototype.renderResults = function (response) {
    var $ul = this.$ul;
    $ul.empty();
    $(response).each(function (idx, el) {
        var userLi = $('<li>').text(el.username + " ");
        var followState = el.followed ? "followed" : "unfollowed";
        var followButton = $('<button>').addClass('follow-toggle');           
        $ul.append(userLi);
        
        userLi.append(followButton);
        followButton.followToggle({"userId": el.id, "followState": followState});
    });
};

$(function () {
    $("div.users-search").userSearch();
});

$.fn.userSearch = function () {
    return this.each(function () {
        new $.UserSearch(this);
    });
};