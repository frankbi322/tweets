const FollowToggle = require("./follow_toggle");

class UsersSearch {
  constructor($el) {
  this.$el = $el;
  this.$input = $el.find("input");
  this.ul = $el.find("ul.users");

  this.$el.on("input", e => {
    this.handleInput(e);
  });
  }

  renderResults(data){
    this.ul.empty();
    // let userData = jQuery.parseJSONdata);
    for (var i = 0; i < data.length; i++) {
      let followState = data[i].followed ? "followed" : "unfollowed";
      let $follow = $("<button>");
        $follow.addClass("follow-toggle");
        $follow.data("user-id",data[i].id);
        $follow.data("initial-follow-state",followState);

      let $li = $(`<li>`);
      let $a = $("<a>");
      $a.href = `/users/${data[i].id}`;
      $a.text(data[i].username + " ");
      new FollowToggle($follow);
      $li.append($a);
      $li.append($follow);
      this.ul.append($li);
    }

  }

  handleInput(e) {
    $.ajax ({
      url: `/users/search.json`,
      data: {'query': this.$input.val()},
      datatype: "json",
      type: "GET",
      success: function (data) {
        this.renderResults(data);
      }.bind(this)
    });

  }
}

module.exports = UsersSearch;
