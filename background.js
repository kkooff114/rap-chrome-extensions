/**
 * Created by LJW on 16/12/7.
 */

//var isIntercept;  //1 打开, 0 关闭
//var host;




//监听所有请求
chrome.webRequest.onBeforeRequest.addListener(
    function (details) {

        console.log("details url -> " + JSON.stringify(details));



        chrome.tabs.query({active: true}, function (tab) {

            var url = details.url;  // 原请求url
            var method = details.method;    // 原请求方法类型

            var actualUrl = decodeURIComponent(url.split("\.do\?url=")[1]);
            //if (actualUrl.indexOf("https") != -1) {
            //    actualUrl = actualUrl.substring(7, actualUrl.length - 1);
            //}
            console.log("actualUrl: " + actualUrl);


            chrome.storage.sync.get({
                host: '',
                intercept: true,
                split: ''

            }, function(items) {

                // 获取数据库的option参数
                var intercept = items.intercept;
                var host = items.host;
                var splitString  = items.split;

                if(!intercept){
                    console.log("return");
                    return;
                }

                var requestUrl = host + actualUrl.split(splitString)[1];
                console.log("requestUrl: " + requestUrl);

                // 发送跨域请求
                sendCrossOrigin(requestUrl, method, function (responseText) {
                    console.log(responseText);
                    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {

                        chrome.tabs.sendMessage(tabs[0].id, responseText, function (response) {
                        });
                    });

                })
            });


        });

        return {cancel: true};

    },

    //  http://10.208.39.59:8111/mock/requestOnServer.do?  只拦截test请求的url
    {urls: ["*://*/mock/requestOnServer.do?*"]},  //监听页面请求,你也可以通过*来匹配。  允许通过不同的方式限制为哪些请求产生事件
    ["blocking"]
);


// 发送跨域请求
function sendCrossOrigin(url, type, success) {
    var xhr = new XMLHttpRequest();
    xhr.open(type, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {

            success(xhr.responseText);
        }
    }
    xhr.send();
}


chrome.extension.onMessage.addListener(function (msg, sender, sendResponse) {
    console.log("background.js onMessage");
    if (msg.type === "intercept") {
        console.log(msg.intercept);
    }
});