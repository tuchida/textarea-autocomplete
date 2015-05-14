goog.provide('my.ac.Matcher');

goog.require('goog.ui.ac.RemoteArrayMatcher');

/**
 * @constructor
 */
my.ac.Matcher = function(url) {
  goog.base(this, url);
};

goog.inherits(my.ac.Matcher, goog.ui.ac.RemoteArrayMatcher);

/** @override */
my.ac.Matcher.prototype.parseResponseText = function(responseText) {
  if (!responseText) {
    return [];
  }
  var data = JSON.parse(responseText);
  return data.list.map(function(d) {
    return d.title;
  });
};
