class TweetCompose {
  constructor($el){
    this.$el = $el;
    this.$input = $el.find(":input");
    this.$el.on("submit", e => {
      this.submit(e);
      this.$el.prop("disabled", true);
    });
  }

  submit(e) {
    let input = this.$el.serialize();

    $.ajax ({
      url: `/tweets.json`,
      data: input,
      datatype: "json",
      type: "POST",
      success: function () {
        this.handleSuccess();
        this.clearInput();
        this.$el.prop("disabled", false);
        }.bind(this)
      });
  }

  clearInput(){
    this.$input.empty();
  }

  handleSuccess() {

  }


}
module.exports = TweetCompose;
