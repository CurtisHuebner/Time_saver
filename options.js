// Saves options to chrome.storage
function save_options() {
    var textData = document.getElementById('data').value;
    var status = document.getElementById('status');
    try {
        var data = {"data":JSON.parse(textData)};
    }
    catch(err){
        //Notify the user that the entered JSON is invalid
        status.textContent = 'Invalid JSON!';
    }
    chrome.storage.sync.set(data, function() {
        // Update status to let user know options were saved.
        status.textContent = 'Options saved.';
    });
    setTimeout(function() {
        status.textContent = '';
    }, 1150);
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
