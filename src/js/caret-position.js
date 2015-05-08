goog.provide('my.CaretPosition');

goog.require('goog.Disposable');
goog.require('goog.dom');
goog.require('goog.dom.forms');
goog.require('goog.math.Rect');
goog.require('goog.style');

/**
 * @constructor
 * @extends {goog.Disposable}
 * @param {Element} target input[type="text"] or textarea
 */
my.CaretPosition = function(target) {
  var doc = goog.dom.getDocument();
  this.target_ = target;
  var div = this.container_ = doc.createElement('div');
  [
    'border-style',
    'border-bottom-width',
    'border-left-width',
    'border-right-width',
    'border-top-width',
    'font-family',
    'font-size',
    'font-style',
    'font-variant',
    'font-weight',
    'height',
    'letter-spacing',
    'word-spacing',
    'line-height',
    'padding-bottom',
    'padding-left',
    'padding-right',
    'padding-top',
    'text-decoration',
    'width'].forEach(function(name) {
    var value = goog.style.getStyle(target, name) || goog.style.getComputedStyle(target, name);
    if (value) {
      goog.style.setStyle(div, name, value);
    }
  });
  goog.style.setPosition(div, goog.style.getPosition(target));
  goog.style.setStyle(div, {
    'position': 'absolute',
    'visibility': 'hidden',
    'z-index': '-9999'
  });
  goog.dom.insertSiblingBefore(div, target);
  this.caret_ = doc.createElement('span');
  this.caret_.innerHTML = '&nbsp;';
};
goog.inherits(my.CaretPosition, goog.Disposable);

my.CaretPosition.SEPARATOR = ' ';

my.CaretPosition.PREFIX = '@';

/**
 * @return {string?}
 */
my.CaretPosition.prototype.detectHotTokenData = function() {
  var selectStart = this.target_.selectionStart;
  var value = goog.dom.forms.getValue(this.target_);
  var slicedLeft = value.slice(0, selectStart);
  for (var i = slicedLeft.length - 1; i >= 0; i--) {
    switch(slicedLeft[i]) {
      case my.CaretPosition.SEPARATOR:
        return null;
      case my.CaretPosition.PREFIX:
        if (i === 0 || slicedLeft[i - 1] === my.CaretPosition.SEPARATOR) {
          var slicedRight = value.slice(selectStart);
          var start = i;
          var end;
          if (slicedRight) {
            var j;
            if ((j = slicedRight.indexOf(my.CaretPosition.SEPARATOR)) >= 0) {
              end = selectStart + j;
            } else {
              end = value.length;
            }
          } else {
            end = selectStart;
          }
          var tokenWithPrefix = value.slice(start, end);
          var token = tokenWithPrefix.slice(my.CaretPosition.PREFIX.length);
          goog.dom.setTextContent(this.container_, value.slice(0, start));
          goog.dom.setTextContent(this.caret_, tokenWithPrefix);
          this.container_.appendChild(this.caret_);
          var pos = goog.style.getClientPosition(this.caret_);
          return {
            token: token,
            rect: new goog.math.Rect(pos.x, pos.y,
                this.caret_.offsetWidth, this.caret_.offsetHeight)
          };
        }
    }
  }
  return null;
};

/**
 * @return {!goog.math.Coordinate} The position.
 */
my.CaretPosition.prototype.getPosition = function() {
  goog.dom.setTextContent(this.container_, this.getSlicedValue_());
  this.container_.appendChild(this.caret_);
  var pos = goog.style.getClientPosition(this.caret_);
  pos.y -= this.target_.scrollTop;
  return pos;
};

my.CaretPosition.prototype.getSlicedValue_ = function() {
  var value = goog.dom.forms.getValue(this.target_);
  return value.slice(0, this.target_.selectStart);
};
