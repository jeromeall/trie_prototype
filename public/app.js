
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


// View for Search Bar
App.Views.Search = Backbone.View.extend({
  id: "search",
  events: {
    "keyup #search_bar" : "searchFunction"
  },

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
      list += '<li><a href="https://en.wikipedia.org/wiki/' +res+'">' + item + '</li>';
    });
    var resultsView = new App.Views.Results();
    resultsView.showResults(list);
  }

});




// View to show results
App.Views.Results = Backbone.View.extend({

  showResults: function(results){
    var resultsHTML = Handlebars.compile(results);
    $("#titles").html(resultsHTML);
  }
});
