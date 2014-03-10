
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
  search: function(){
    // if(window.location.pathname !== "/"){
      return window.location.pathname;
  //}
},

routes: {
  "": "index",
  ":search":"urlSearch(:search)"
},
index: function(){
  var view = new App.Views.Search();
  $("#container").html(view.render().el);
  console.log(App.autocompleter);
}
// urlSearch: function(param){

// }
});


// View for Search Bar
App.Views.Search = Backbone.View.extend({
  id: "search",
  events: {
    "keyup #search_bar" : "searchFunction",
  },

  render: function(){
    var source = "<form><input type='text' id='search_bar' value='" + this.search() + "'></form>";
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
  },
  search: function(){
    if(window.location.pathname !== "/"){
      return window.location.pathname.replace("/","");
    }else{
      return "";
    }
  },
  urlSearch: function(){
    console.log($("#search_bar").attr('value'));
  }
});




// View to show results
App.Views.Results = Backbone.View.extend({

  showResults: function(results){
    var resultsHTML = Handlebars.compile(results);
    $("#titles").html(resultsHTML);
  }
});
