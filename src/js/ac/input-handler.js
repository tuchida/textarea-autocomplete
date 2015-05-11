goog.provide('my.ac.InputHandler');

goog.require('goog.asserts');
goog.require('goog.events.EventHandler');
goog.require('goog.math.Coordinate');
goog.require('goog.ui.ac.InputHandler');
goog.require('my.ac.CaretPosition');

/**
 * @constructor
 * @extends {goog.ui.ac.InputHandler}
 */
my.ac.InputHandler = function(opt_separators, opt_literals,
    opt_throttleTime) {
  goog.base(this, opt_separators, opt_literals,
      true/* Always true */, opt_throttleTime);

  this.eh = new goog.events.EventHandler(this);
};
goog.inherits(my.ac.InputHandler, goog.ui.ac.InputHandler);

my.ac.InputHandler.SEPARATOR = ' ';

my.ac.InputHandler.TOKEN_PREFIX = '@';

my.ac.InputHandler.prototype.attachInput = function(target) {
  goog.base(this, 'attachInput', target);
  target.cp_ = new my.ac.CaretPosition(target);
};

goog.ui.ac.InputHandler.prototype.detachInput = function(target) {
  target.cp_.dispose();
  target.cp_ = null;
  goog.base(this, 'detachInput', target);
}

my.ac.InputHandler.prototype.parseToken = function() {
  var target = this.getActiveElement();
  goog.asserts.assert(target.cp_);
  var text = this.getValue();
  var caret = this.getCursorPosition();

  var start = this.getTokenIndex(text, caret);
  if (start >= 0) {
    var end = this.getReplaceEndIndex_(text, caret);
    var token = text.slice(my.ac.InputHandler.SEPARATOR.length + start, end + 1);

    var rect = target.cp_.getPosition(start);
    this.ac_.getRenderer().setPosition(
        new goog.math.Coordinate(rect.left, rect.top + rect.height));
    return token;
  }
  return null;
};

my.ac.InputHandler.prototype.setTokenText = function(tokenText, opt_multi) {
  var target = this.getActiveElement();
  var text = this.getValue();
  var caret = this.getCursorPosition();

  var start = this.getTokenIndex(text, caret);
  var end = this.getReplaceEndIndex_(text, caret);

  target.value = text.slice(0, start) + my.ac.InputHandler.TOKEN_PREFIX +
      tokenText + text.slice(end) + my.ac.InputHandler.SEPARATOR;
};

my.ac.InputHandler.prototype.getTokenIndex = function(text, caret) {
  for (var i = caret - 1; i >= 0; i--) {
    switch(text[i]) {
      case my.ac.InputHandler.SEPARATOR:
        return -1;
      case my.ac.InputHandler.TOKEN_PREFIX:
        if (i === 0 || text[i - 1] === my.ac.InputHandler.SEPARATOR) {
          return i;
        }
    }
  }
  return -1;
};

my.ac.InputHandler.prototype.getReplaceEndIndex_ = function(text, caret) {
  for (var i = caret; i < text.length; i++) {
    switch(text[i]) {
      case my.ac.InputHandler.SEPARATOR:
        return i;
    }
  }
  return text.length;
};
