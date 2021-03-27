document.forms[0].onsubmit = function(e) {
    e.preventDefault(); // Prevent submission
    var message = document.getElementById('pass').value;
    document.getElementById("pass").innerHTML;
    chrome.runtime.getBackgroundPage(function(bgWindow) {
        bgWindow.setMsg(message);
        //window.close();     // Close dialog
    });
};