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
  const data = { "text": message };

  fetch('http://35.212.98.63:8080/', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    console.log(data.score);
    console.log(typeof(data.score));
    if(data.score < -0.5){
      alert("I am sorry, please call 1800-273-8255 or talk to a friend.");
    }
    else if(data.score > 0.5){
      alert("Way to go!");
    }
    else{
      alert("Do something that makes you happy, you deserve it!")
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });

};


