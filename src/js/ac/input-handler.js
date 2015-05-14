goog.provide('my.ac.InputHandler');

goog.require('goog.asserts');
goog.require('goog.events.KeyCodes');
goog.require('goog.ui.ac.InputHandler');
goog.require('goog.userAgent');
goog.require('my.ac.CaretPosition');

/**
 * @constructor
 * @extends {goog.ui.ac.InputHandler}
 */
my.ac.InputHandler = function(opt_literals,
    opt_throttleTime) {
  goog.base(this, null, opt_literals,
      true/* Always true */, opt_throttleTime);
  this.setSeparators(''); // We don't use this

  /**
   * RegExp to test token separator
   * @type {RegExp}
   * @private
   */
  this.separatorRegex_ = new RegExp('[ ,.\\n]');
};
goog.inherits(my.ac.InputHandler, goog.ui.ac.InputHandler);

/** @type {string} */
my.ac.InputHandler.TOKEN_PREFIX = '@';

/** @override */
my.ac.InputHandler.prototype.handleKeyEvent = function(e) {
  switch (e.keyCode) {
    case goog.events.KeyCodes.LEFT:
    case goog.events.KeyCodes.RIGHT:
      if (this.ac_.isOpen()) {
        this.update(true);
        return false;
      }
  }
  goog.base(this, 'handleKeyEvent', e);
};

/** @override */
my.ac.InputHandler.prototype.attachInput = function(target) {
  goog.base(this, 'attachInput', target);
  target.cp_ = new my.ac.CaretPosition(target);
};

/** @override */
goog.ui.ac.InputHandler.prototype.detachInput = function(target) {
  if (target.cp_) {
    target.cp_.dispose();
    target.cp_ = null;
  }
  goog.base(this, 'detachInput', target);
}

/** @override */
my.ac.InputHandler.prototype.parseToken = function() {
  var target = this.getActiveElement();
  goog.asserts.assert(target.cp_);
  var text = this.getValue();
  var caret = this.getCursorPosition();
  var start = this.getTokenIndexWithPrefix_(text, caret);
  if (start >= 0) {
    var end = this.getTokenReplaceEndIndex_(text, caret);
    var token = text.slice(my.ac.InputHandler.TOKEN_PREFIX.length + start, end);
    var el = target.cp_.getPositionTarget(start, end);
    this.ac_.getRenderer().setNextPositionTarget(el);
    return token;
  }
  return null;
};

/** @override */
my.ac.InputHandler.prototype.setTokenText = function(tokenText, opt_multi) {
  var target = this.getActiveElement();
  var text = this.getValue();
  var caret = this.getCursorPosition();

  var start = this.getTokenIndexWithPrefix_(text, caret);
  var end = this.getTokenReplaceEndIndex_(text, caret);

  var head = text.slice(0, start) + tokenText;
  var tail = text.slice(end);

  if (goog.userAgent.GECKO ||
      (goog.userAgent.IE && goog.userAgent.isVersionOrHigher('9'))) {
    target.blur();
  }
  target.value = head + tail;
  target.focus();

  this.setCursorPosition(head.length + 1);
};

/**
 * @param {string} text string to parse.
 * @param {number} caret Position of cursor in string.
 * @return {number} Index of token.
 * @private
 */
my.ac.InputHandler.prototype.getTokenIndexWithPrefix_ = function(text, caret) {
  for (var i = caret - 1; i >= 0; i--) {
    if (text[i] === my.ac.InputHandler.TOKEN_PREFIX) {
      if (i === 0 || this.separatorRegex_.test(text[i - 1])) {
        return i;
      }
    } else if (this.separatorRegex_.test(text[i])) {
      return -1;
    }
  }
  return -1;
};

/**
 * @param {string} text string to parse.
 * @param {number} caret Position of cursor in string.
 * @return {number} Index of token.
 * @private
 */
my.ac.InputHandler.prototype.getTokenReplaceEndIndex_ = function(text, caret) {
  for (var i = caret; i < text.length; i++) {
    if (this.separatorRegex_.test(text[i])) {
      return i;
    }
  }
  return text.length;
};
