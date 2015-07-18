// index.js
// Backend for json-visualizer
// Dependencies: jquery

var colors = ['#FF5252', '#C2185B', '#536DFE', '#512DA8', '#1976D2', '#03A9F4', '#0097A7', '#009688', '#388E3C', '#FFA000', '#FF9800', '#E64A19', '#795548', '#616161', '#607D8B'];

var randomColor = function () {
  return colors[Math.floor(Math.random() * colors.length)];
};

var renderPill = function (key, value, parent) {
  var pill = document.createElement('div');
  $(pill).addClass('pill');
  $(pill).appendTo(parent);

  $(pill).html('<div class="btn-group" > <button type="button" class="btn btn-info" id="key" >'+key+'</button>  <button type="button" class="btn btn-default" id="value">'+value+'</button> </div>');
};

var renderObj = function (key, obj, parent, depth) {
  var pills = [];
  var objs = [];

  // The innermost div in the rendering of this object
  // The contents of this object will be drawn inside of here
  var newParent;

  // Draw things in here
  // This should contain newParent
  var container = document.createElement('div');

  // Create an "each"able function for rendering something
  var renderer = function (func) {
    return function (i, e) {
      depth = depth || 0;
      func(e, obj[e], newParent, depth + 1);
    };
  };


  $(container).appendTo(parent);

  // Draw stuff inside container
  $(container).html('<div class="panel panel-default zoomTarget"><div class="panel-heading"><h3 class="panel-title"></h3></div><div class="panel-body"></div></div>');
  
  $(container).find('h3').text(key);

  newParent = $(container).children('div.panel').children('div.panel-body');

  // Recursively draw contents
  $.each(obj, function (key, val) {
    if (val && typeof val === 'object') { // Object and not null
      objs.push(key);
    }
    else {
      pills.push(key);
    }
  });

  $.each(pills, renderer(renderPill));
  $.each(objs, renderer(renderObj));
};

var sampleObj = {"foo":"bar","glossary":{"title":"example glossary","GlossDiv":{"title":"S","GlossList":{"GlossEntry":{"ID":"SGML","SortAs":"SGML","GlossTerm":"Standard Generalized Markup Language","Acronym":"SGML","Abbrev":"ISO 8879:1986","GlossDef":{"para":"A meta-markup language, used to create markup languages such as DocBook.","GlossSeeAlso":["GML","XML"]},"GlossSee":"markup"}}}}, baz: "bat"};

renderObj('root', sampleObj, document.body);

// $( "div.panel" ).effect("scale", { percent: 50,origin:'center'}, 100);