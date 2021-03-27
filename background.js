chrome.runtime.onMessage.addListener(function(request) {
  if (request.type === 'request_msg') {
      chrome.tabs.create({
          url: chrome.extension.getURL('dialog.html'),
          active: true
      }, function(tab) {
          // After the tab has been created, open a window to inject the tab
          chrome.windows.create({
              tabId: tab.id,
              type: 'popup',
              focused: true,
              height: 300,
              width: 400,
              left : 475,
              top: 450
              // incognito, top, left, ...
          });
      });
  }
});
function setMsg(message) {
  //console.log(message);
  chrome.storage.sync.set({key: message}, function() {
    console.log('Value is set to ' + message);
  });
  chrome.storage.sync.get(['key'], function(result) {
    console.log('Value currently is ' + result.key);
  });
  //get advice
  alert("Believe");

};


