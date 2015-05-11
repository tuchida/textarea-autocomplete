goog.require('goog.dom');
goog.require('goog.labs.net.xhr');
goog.require('goog.ui.ac.ArrayMatcher');
goog.require('goog.ui.ac.AutoComplete');
goog.require('my.ac.InputHandler');
goog.require('my.ac.Renderer');









goog.labs.net.xhr.getJson('/sandbox/dummy.json')
.then(function(userList) {
  userList = userList.map(function(user) {
    user.toString = function() {return this.id };
    return user;
  });
  createAutoComplete(document.getElementById('txtInput2'), userList);
});






function createAutoComplete(inputEl, data) {
  var inputHandler = new my.ac.InputHandler(null, null);
  var matcher = new goog.ui.ac.ArrayMatcher(data, true)
  var autoComplete = new goog.ui.ac.AutoComplete(
      matcher, new my.ac.Renderer(null, {renderRow: function(row, token, elem) {
        goog.dom.setTextContent(elem, row.data.id + ' - ' + row.data['名前']);
      }}), inputHandler);
  inputHandler.attachAutoComplete(autoComplete);
  inputHandler.attachInput(inputEl);
  return autoComplete;
}



// 
// goog.require('goog.array');
// goog.require('goog.dom.classlist');
// goog.require('goog.style');
// goog.require('wap.core.ui.Popover');
// goog.require('goog.ui.Popup');
// goog.require('goog.positioning.AnchoredViewportPosition');
// 
// 
// 
// var doc = document;
// 
// var $element = doc.querySelector('.timeline-secretary');
// var cards = goog.array.toArray($element.querySelectorAll('.timeline-secretary-card'));
// var $container = $element.querySelector('.timeline-secretary-container');
// 
// var currentIndex;
// var width = $container.offsetWidth;
// 
// $element.querySelector('.timeline-secretary-arrow--left').addEventListener('click', function(e) {
//   show(currentIndex = currentIndex <= 0 ? cards.length - 1 : currentIndex - 1);
// });
// $element.querySelector('.timeline-secretary-arrow--right').addEventListener('click', function(e) {
//   show(currentIndex = cards.length - 1 <= currentIndex ? 0 : currentIndex + 1);
// });
// 
// show(currentIndex = 0);
// 
// // To make developer notice if the JavaScript runs in a browser, comment out deferring logic
// // setTimeout(function() {
//   goog.dom.classlist.add($container, 'timeline-secretary-container--transitionable');
// // }, 50);
// 
// function show(index) {
//   cards.forEach(function(card, i) {
//     if (i < index) {
//       goog.style.setStyle(card, {
//         'transform': 'translateX(' + (-width / 3) + 'px)',
//         'opacity': 0
//       });
//     } else if (index < i) {
//       goog.style.setStyle(card, {
//         'transform': 'translateX(' + width + 'px)',
//         'opacity': '1'
//       });
//     } else {
//       goog.style.setStyle(card, {
//         'transform': 'translateX(' + 0 + 'px)',
//         'opacity': '1'
//       });
//     }
//   });
// }
// 
// 
// 
// 
// 
// var cog = doc.querySelector('.timeline-secretary-card-head-action.wap-icon-cog');
// var popupEl = document.querySelector('.popover');
// var popup = new goog.ui.Popup(popupEl);
// popup.setHideOnEscape(true);
// popup.setAutoHide(true);
// popup.setMargin(-100, 0, 0, 0);
// 
// popup.setPosition(new goog.positioning.AnchoredViewportPosition(cog,
//     goog.positioning.Corner.BOTTOM_RIGHT));
// 
// cog.addEventListener('click', function() {
//   popup.setVisible(true);
// });
// 
// popupEl.addEventListener('click', function(e) {
//   var targetEl;
//   if (targetEl = goog.dom.getAncestorByTagNameAndClass(e.target, null, 'popover-row')) {
//     var isOpened = goog.dom.classes.has(targetEl, 'popover-row-open');
//     var subboxEl = goog.dom.getNextElementSibling(targetEl);
//     if (subboxEl) {
//       goog.dom.classlist.enable(targetEl, 'popover-row-open', !isOpened);
//       goog.dom.classlist.enable(subboxEl, 'popover-subbox-open', !isOpened);
//     }
//   } else if (targetEl = goog.dom.getAncestorByTagNameAndClass(e.target, null, 'close')) {
//     popup.setVisible(false);
//   }
// });
// 
// setTimeout(function() {
//   popup.setVisible(true);
// }, 400);
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// // var popoverComponent = new wap.core.ui.Popover({
// //   placement: 'right',
// //   trigger : 'click',
// //   contents : {
// //     title : '',
// //     content : '--------'
// //   },
// //   colorType : 'default',
// //   animation : true,
// //   selector : false,
// //   inside : false,
// //   content : '',
// //   title : '',
// //   delay : 0,
// //   usePopoverClass : false
// // });
// // popoverComponent.decorate(doc.querySelector('.popover'));
// // var cog = doc.querySelector('.timeline-secretary-card-head-action.wap-icon-cog');
// // cog.addEventListener('click', function() {
// //   console.log('xxx')
// //   popoverComponent.show();
// // });
