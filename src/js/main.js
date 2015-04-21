
goog.require('goog.array');
goog.require('goog.dom.classlist');
goog.require('goog.style');



var doc = document;

var $element = doc.querySelector('.timeline-secretary');
var cards = goog.array.toArray($element.querySelectorAll('.timeline-secretary-card'));
var $container = $element.querySelector('.timeline-secretary-container');

var currentIndex;
var width = $container.offsetWidth;

$element.querySelector('.timeline-secretary-arrow--left').addEventListener('click', function(e) {
  show(currentIndex = currentIndex <= 0 ? cards.length - 1 : currentIndex - 1);
});
$element.querySelector('.timeline-secretary-arrow--right').addEventListener('click', function(e) {
  show(currentIndex = cards.length - 1 <= currentIndex ? 0 : currentIndex + 1);
});

show(currentIndex = 0);

setTimeout(function() {
  goog.dom.classlist.add($container, 'timeline-secretary-container--transitionable');
}, 50);

function show(index) {
  cards.forEach(function(card, i) {
    if (i < index) {
      goog.style.setStyle(card, {
        'transform': 'translateX(' + (-width / 3) + 'px)',
        'opacity': 0
      });
    } else if (index < i) {
      goog.style.setStyle(card, {
        'transform': 'translateX(' + width + 'px)',
        'opacity': '1'
      });
    } else {
      goog.style.setStyle(card, {
        'transform': 'translateX(' + 0 + 'px)',
        'opacity': '1'
      });
    }
  });
}
