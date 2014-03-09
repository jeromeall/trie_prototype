
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
      App.autocompleter.add(m.data); 
    };

  }
};

$(document).ready(function(){
  App.initialize();
});


App.Routers.Main = Backbone.Router.extend({
  routes: {
    "": "index",
  },
  index: function(){
    var view = new App.Views.Search();
    $("#container").html(view.render().el);
  }
});

App.Views.Search = Backbone.View.extend({
  id: "search_bar",
  events: {
    "keypress search_bar" : "searchFunction"
  },
  template: function(){ return "<form> <input type='text' id='search_bar'></form>";},
  render: function(){
    this.$el.html(this.template());
    return this;
  },
  searchFunction: function(){

  }

});




App.Views.Results = Backbone.View.extend({
  id: "results",
  template: function(){return "<>";}
});