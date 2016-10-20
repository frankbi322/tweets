class FollowToggle {
  constructor ($el) {
    this.userId = $el.data("user-id");
    this.followState = $el.data("initial-follow-state");
    this.$el = $el;
    this.$el.on("click", e => {
      this.handleClick(e);
    });
    this.render();
  }

  render() {
    this.$el.prop("disabled", false);
    if (this.followState === "followed") {
      this.$el.text("Unfollow!");
    }
    else if (this.followState === "unfollowed") {
      this.$el.text("Follow!");
    }
    else {
      this.$el.prop("disabled", true);
    }
  }

  handleClick (e) {
    e.preventDefault();
    if (this.followState === "unfollowed") {
      this.followState = "following";
      this.followState = "unfollowing";
      this.render();
      $.ajax ({
        url: `/users/${this.userId}/follow`,
        datatype: "json",
        type: "POST",
        success: function () {
          this.followState = "followed";
          this.render();
          }.bind(this)
        });
    } else {
        this.followState = "unfollowing";
        this.render();
      $.ajax ({
        url: `/users/${this.userId}/follow.json`,
        datatype: "json",
        type: "DELETE",
        success: function () {
          this.followState = "unfollowed";
          this.render();
        }.bind(this)
      });
    }
  }
}

module.exports = FollowToggle;
