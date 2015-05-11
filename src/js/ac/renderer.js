goog.provide('my.ac.Renderer');

goog.require('goog.style');
goog.require('goog.ui.ac.Renderer');


/**
 * @constructor
 */
my.ac.Renderer = function(opt_parentNode, opt_customRenderer,
    opt_rightAlign, opt_useStandardHighlighting) {
  goog.base(this, opt_parentNode, opt_customRenderer,
      opt_rightAlign, opt_useStandardHighlighting);
};
goog.inherits(my.ac.Renderer, goog.ui.ac.Renderer);

/**
 * @param {goog.math.Coordinate}
 */
my.ac.Renderer.prototype.setPosition = function(pos) {
  this.pos_ = pos;
};

/** @override */
my.ac.Renderer.prototype.reposition = function() {
  if (this.pos_) {
    goog.style.setPosition(this.element_, this.pos_);
    this.element_.style.visibility = 'visible';
    this.pos_ = null;
  } else {
    goog.base(this, 'reposition');
  }
};
