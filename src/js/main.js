goog.require('goog.array');
goog.require('goog.dom');
goog.require('goog.ui.ac.AutoComplete');
goog.require('my.ac.InputHandler');
goog.require('my.ac.Matcher');
goog.require('my.ac.Renderer');

var dialogRootEl = document.getElementById('popup_field');

if (dialogRootEl) {
  var acMap = new WeakMap();

  new MutationObserver(function(mutations) {
    goog.array.forEach(mutations, function(m) {
      goog.array.forEach(m.addedNodes, function(node) {
        if (node.querySelectorAll) {
          goog.array.forEach(node.querySelectorAll('textarea'), function(textareaEl) {
            if (!acMap.has(textareaEl)) {
              acMap.set(textareaEl, createAutoComplete(textareaEl));
            }
          });
        }
      });
    });
  }).observe(dialogRootEl, {
    childList: true,
    subtree: true
  });
}

function createAutoComplete(inputEl) {
  var inputHandler = new my.ac.InputHandler(null, null);
  var matcher = new my.ac.Matcher(AQ_ATROOT + 'atroot/tool?exa=present-suggest&suggest_target=userboard&except_facility=1');
  var autoComplete = new goog.ui.ac.AutoComplete(
      matcher, new my.ac.Renderer(null, {
        renderRow: function(row, token, elem) {
          goog.dom.setTextContent(elem, row.data);
        }
      }), inputHandler);
  inputHandler.attachAutoComplete(autoComplete);
  inputHandler.attachInput(inputEl);
  return autoComplete;
}
