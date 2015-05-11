goog.provide('my.ac.InputHandler');

goog.require('goog.ui.ac.InputHandler');
goog.require('goog.asserts');
goog.require('goog.events.EventHandler');
goog.require('goog.events.InputHandler');
goog.require('goog.events.InputHandler.EventType');
goog.require('goog.math.Coordinate');
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
  var tokenData = target.cp_.detectHotTokenData();
  if (tokenData) {
    this.ac_.getRenderer().setPosition(
        new goog.math.Coordinate(tokenData.rect.left, tokenData.rect.top + tokenData.rect.height));
    return tokenData.token;
  }
  return null;
};

// my.ac.InputHandler.prototype.setTokenText = function(tokenText, opt_multi) {
//   this.getActiveElement().cp
// };

my.ac.InputHandler.prototype.getTokenIndex = function(text, caret) {
  for (var i = caret; i >= 0; i--) {
    switch(text[i]) {
      case my.ac.CaretPosition.SEPARATOR:
        return -1;
      case my.ac.CaretPosition.PREFIX:
        if (i === 0 || text[i - 1] === my.ac.CaretPosition.SEPARATOR) {
          return i;
        }
    }
  }
  return -1;
};
