/**
 * Created by LJW on 16/12/9.
 */



$(document).ready(function(){
    $("#intercept").change(function(){
        console.log("$");
        if($(this).is(':checked')){

            chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                console.log(JSON.stringify(tabs));
                chrome.tabs.sendMessage(tabs[0].id, {type:"intercept", intercept: "1"}, function (response) {
                });
            });
        } else {



        }

    });
});

//
//document.addEventListener('DOMContentLoaded', function () {
//    document.querySelector('#intercept').addEventListener('change', function changeHandler(){
//
//        if(document.querySelector('#intercept').checked){
//            console.log("checked");
//        }
//        else{
//            console.log("not checked");
//        }
//    });
//});