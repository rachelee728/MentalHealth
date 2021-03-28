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
  prev = 0.0;

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
    if(data.score < -0.5 && data.score < prev){
      prev = data.score;
      alert("I am sorry, how you can change something in your life to slowly get better? Talking to a friend helps wonders!");
    }
    else if(data.score < -0.5 && data.score > prev){
      prev = data.score;
      alert("I see you're doing better than before, keep going!");
    }
    else if(data.score < -0.5 && data.score === prev){
      prev = data.score;
      alert("Feeling the same as before? We all get in a rut sometimes... Even the smallest things can help boost your mood!");
    }
    else if(data.score > 0.5 && data.score>prev){
      prev = data.score;
      alert("Way to go! I also see that you are doing better than yesterday!");
    }
    else if(data.score > 0.5 && data.score < prev){
      prev = data.score;
      alert("Oh, you're doing worse than yesterday, it's alright! Be patient with yourself.");
    }
    else if(data.score > 0.5 && data.score === prev){
      prev = data.score;
      alert("Same good mood as yesterday I see! Right on!");
    }
    else{
      prev = data.score;
      alert("Do something that makes you happy, you deserve it!");
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });

};


