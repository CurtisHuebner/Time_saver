// Saves options to chrome.storage
function save_options() {
  var textData = document.getElementById('data').value;
  var data = {"data":JSON.parse(textData)};
  chrome.storage.sync.set(data, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
  var bkp = chrome.extension.getBackgroundPage()
  bkp.updateData();
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get("data", function(data) {
    jsonString = JSON.stringify(data["data"],null,'\t');
    //console.log(jsonString);
    document.getElementById('data').value = jsonString;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
console.log("Options page loaded");
