goog.provide('wap.core.ui.timeline.TimelineTextarea.Hiliter');

goog.require('goog.Disposable');
goog.require('goog.dom');
goog.require('goog.style');



/**
 * @param {Element} $textarea a target textarea element
 * @constructor
 * @private
 */
wap.core.ui.timeline.TimelineTextarea.Hiliter = function($textarea) {
  goog.base(this);

  this.enabled = true;

  var offsetParent = goog.style.getOffsetParent($textarea);

  this.$textarea = $textarea;
  goog.style.setStyle(this.$textarea, 'position', 'relative');
  goog.style.setStyle(this.$textarea, 'background-color', 'transparent');

  this.$dummyTextarea = document.createElement('div');
  wap.core.ui.timeline.TimelineTextarea.Hiliter.copyStyle_(this.$dummyTextarea, $textarea);
  goog.style.setStyle(this.$dummyTextarea, 'visibility', 'hidden');
  goog.style.setStyle(this.$dummyTextarea, 'position', 'absolute');
  goog.style.setStyle(this.$dummyTextarea, 'left', '-9999px');
  document.body.appendChild(this.$dummyTextarea);

  this.$hiliteMarker = document.createElement('div');
  goog.style.setStyle(this.$hiliteMarker, 'position', 'absolute');
  goog.style.setStyle(this.$hiliteMarker, 'background-color', 'yellow');
  goog.style.showElement(this.$hiliteMarker, false);
  goog.dom.insertSiblingBefore(this.$hiliteMarker, $textarea);
};
goog.inherits(wap.core.ui.timeline.TimelineTextarea.Hiliter, goog.Disposable);

/**
 * @private
 * @param {string} html
 * @return {string} 
 */
wap.core.ui.timeline.TimelineTextarea.Hiliter.invalidateHTML_ = function(html) {
  return html
    .replace(/</g, '_')
    .replace(/>/g, '_')
    .replace(/"/g, '_')
    .replace(/\\/g, '_')
    .replace(/ /g, '&nbsp;'); // TODO
};

/**
 * @param {boolean} enable
 */
wap.core.ui.timeline.TimelineTextarea.Hiliter.prototype.enable = function(enable) {
  this.enabled = enable;
  this.redraw();
};

// /***/
// wap.core.ui.timeline.TimelineTextarea.Hiliter.prototype.redraw = function() {
//   if (this.lastEscaped_ || this.lastEmotionCandidate_) {
//     this.detectEmotion();
//   }
//   goog.style.setElementShown(this.$hiliteMarker, this.enabled && !!this.lastEmotionCandidate_);
//   if (!this.enabled || !this.lastEmotionCandidate_) {
//     return;
//   }
// 
//   this.$dummyTextarea.innerHTML = this.lastEscaped_.replace(new RegExp('(' + this.lastEmotionCandidate_ + ')'),
//     '<span class="hilited">$1</span>');
//   var $h = this.$dummyTextarea.querySelector('.hilited'); // TODO
//   wap.core.ui.timeline.TimelineTextarea.Hiliter.copyStyle_(this.$hiliteMarker, $h);
//   goog.style.setPosition(this.$hiliteMarker, goog.style.getPosition($h));
//   goog.style.setBorderBoxSize(this.$hiliteMarker, goog.style.getBorderBoxSize($h));
// };

/**
 * @private
 * @param {Element} to
 * @param {Element} from
 */
wap.core.ui.timeline.TimelineTextarea.Hiliter.copyStyle_ = function(to, from) {
  ['border',
    'box-sizing',
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
    'width'
  ].forEach(function(name) {
    var value = goog.style.getStyle(from, name) || goog.style.getComputedStyle(from, name);
    if (value) {
      goog.style.setStyle(to, name, value);
    }
  });
};





