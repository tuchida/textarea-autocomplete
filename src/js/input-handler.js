goog.provide('my.app.InputHandler');

goog.require('goog.ui.ac.InputHandler');
goog.require('goog.asserts');
goog.require('goog.events.EventHandler');
goog.require('goog.events.InputHandler');
goog.require('goog.events.InputHandler.EventType');
goog.require('goog.math.Coordinate');
goog.require('my.CaretPosition');

/**
 * @constructor
 * @extends {goog.ui.ac.InputHandler}
 */
my.app.InputHandler = function(opt_separators, opt_literals,
    opt_multi, opt_throttleTime) {
  goog.base(this, opt_separators, opt_literals,
      opt_multi, opt_throttleTime);

  this.eh = new goog.events.EventHandler(this);
};
goog.inherits(my.app.InputHandler, goog.ui.ac.InputHandler);

my.app.InputHandler.prototype.attachInput = function(target) {
  goog.base(this, 'attachInput', target);
  target.cp_ = new my.CaretPosition(target);
};

goog.ui.ac.InputHandler.prototype.detachInput = function(target) {
  target.cp_.dispose();
  target.cp_ = null;
  goog.base(this, 'detachInput', target);
}

my.app.InputHandler.prototype.parseToken = function() {
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
