goog.provide('my.ac.Renderer');

goog.require('goog.positioning');
goog.require('goog.positioning.Overflow');
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
 * @param {Element}
 */
my.ac.Renderer.prototype.setNextPositionTarget = function(el) {
  this.nextPositionTarget_ = el;
};

/** @override */
my.ac.Renderer.prototype.reposition = function() {
  if (this.nextPositionTarget_) {
    var anchorElement = this.nextPositionTarget_;
    var anchorCorner = this.getAnchorCorner();
    var overflowMode = goog.positioning.Overflow.ADJUST_X_EXCEPT_OFFSCREEN;
    if (this.showScrollbarsIfTooLarge_) {
      this.element_.style.height = '';
      overflowMode |= goog.positioning.Overflow.RESIZE_HEIGHT;
    }
    goog.positioning.positionAtAnchor(
        anchorElement, anchorCorner,
        this.element_, goog.positioning.flipCornerVertical(anchorCorner),
        null, null, overflowMode);
    this.element_.style.visibility = 'visible';
    this.nextPositionTarget_ = null;
  } else {
    goog.base(this, 'reposition');
  }
};
