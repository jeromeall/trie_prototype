window.App = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},  
  initialize: function() {
    this.router = new this.Routers.Main();
    Backbone.history.start({pushState: true});

    App.autocompleter = new Autocompleter();
    var ws = new WebSocket('ws://' + window.location.host + window.location.pathname);
    ws.onmessage = function(m) { 
      autocompleter.add(m.data); 
    };

  }
};
$(document).ready(function(){
  App.initialize();
});


App.Routers.Main = Backbone.Routers.Extend({
  routes: {
    "": "index",
  },
  index: function(){
    var view = new App.Views.Index();
    $("#container").html(view.render().el);
  }
});

App.Views.Search = Backbone.View.extend({
  id: "search_bar",

  render: function(){
    $(this.el).append();
  }

});