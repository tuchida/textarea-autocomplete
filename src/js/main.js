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
