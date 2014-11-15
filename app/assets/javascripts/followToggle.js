$.FollowToggle = function (el, options) {
    this.$el = $(el);
    this.userId = this.$el.data("user-id") || options.userId;
    this.followState = this.$el.data("initial-follow-state") || options.followState;
    this.render();
    this.$el.on("click", this.handleClick.bind(this));
};

$.FollowToggle.prototype.render = function () {
    if (this.followState === "unfollowed") {
        this.$el.html("Follow!");
        this.$el.prop("disabled", false);
    } else if (this.followState === "followed") {
        this.$el.html("Unfollow!");
        this.$el.prop("disabled", false);
    } else {
        this.$el.prop("disabled", true);
    }
};
$.FollowToggle.prototype.handleClick = function (event) {
    event.preventDefault();
    if (this.followState === "unfollowed") {
        this.followState = "following";
        this.render();
        $.ajax({
            url: this.userId + "/follow",
            type: "POST",
            dataType: "json",
            success: function () {
                this.followState = "followed";
                this.render();
            }.bind(this)
        });
    } else if (this.followState === "followed") {
        this.followState = "unfollowing";
        this.render();
        $.ajax({
            url: this.userId + "/follow",
            type: "DELETE",
            dataType: "json",
            success: function () {
                this.followState = "unfollowed";
                this.render();
            }.bind(this)
        });
    }
};

$(function () {
    $("button.follow-toggle").followToggle();
});

$.fn.followToggle = function (options) {
    return this.each(function () {
        new $.FollowToggle(this, options);
    });
};