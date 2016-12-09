

// 设置监听
chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {

    console.log(msg);

    $("#divResBoardJson").html(msg);

    var options = {
        dom : '#divResBoardJson' //对应容器的css选择器
    };
    var jf = new JsonFormater(options); //创建对象
    jf.doFormat(msg); //格式化json

});
