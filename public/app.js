
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
  id: "search",
  events: {
    "keyup #search_bar" : "searchFunction"
  },
  // template: function(){ return "<form> <input type='text' id='search_bar'></form>";},

  render: function(){
    var source = "<form><input type='text' id='search_bar'></form>";
    var template = Handlebars.compile(source);
    this.$el.html(template);
    return this;
  },
  searchFunction: function(){
    var word = $("#search_bar").val();
    var results = App.autocompleter.complete(word);
    var list = '';
    results.forEach(function(item){
      var res = item.replace(' ', '_');
      var context = {result: res, title: item};
      var source = "<li><a href=\"https://en.wikipedia.org/wiki/{{result}}\"> {{title}} </li>";
      list +=  Handlebars.compile(source, context);
    });
    $("#titles").html(list);
  }

});




// App.Views.Results = Backbone.View.extend({
//   id: "results",
//   template: function(){return "<>";}
// });