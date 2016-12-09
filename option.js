/**
 * Created by LJW on 16/12/9.
 */
// Saves options to chrome.storage
function save_options() {
    console.log("save_option");
    var host = document.getElementById('host').value;
    var intercept = document.getElementById('intercept').checked;
    var splitString = document.getElementById('split-string').value;
    chrome.storage.sync.set({
        host: host,
        intercept: intercept,
        split: splitString
    }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get({
        host: '',
        intercept: true,
        split: ''
    }, function(items) {

        document.getElementById('intercept').checked = items.intercept;
        document.getElementById('host').value = items.host;
        document.getElementById('split-string').value = items.split;

        document.getElementById('curr-intercept').innerText = items.intercept;
        document.getElementById('curr-host').innerText = items.host;
    });
}


document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);