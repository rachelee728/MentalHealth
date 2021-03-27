if (confirm('Write something nice about yourself! We promise it will help'))
    chrome.runtime.sendMessage({type:'request_msg'});