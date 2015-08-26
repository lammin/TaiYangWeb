/******************************************************************************
* filename: Common.js
* Common Modul Scripting(Basic, Utilities)
* (C) MasterLi(masterlijf#hotmail.com),Oran Day(likecode#qq.com)
* (C) NSW(http://www.nsw88.com)
*******************************************************************************/
var PTN_EMAIL = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
var PTN_FLOAT = /\d+(\.\d+)?/;
function $nsw() { }
/********************
* 根據ID獲取jQuery對像
* elmId : 元素ID
********************/
function $j(elmId) { return $("#" + elmId); }
/********************
* 根據ID獲取文本框內容
* 重載1: 如果傳遞val參數，則修改文本框內容
* elmId : 元素ID
* val : 新的文本框內容
********************/
function $v(elmId, val) {
    if (val == null) {
        var o = $j(elmId).attr("value");
        if (o == null || o == undefined){
            return "";
        }
        return o;
    } else {
        return $j(elmId).attr("value", val);
    }
}


//菜單選中
function muneCur() {
    var htmlName = location.href.substring(location.href.lastIndexOf("/") + 1);

    if (htmlName == "") {
        htmlName = MARK;
    }
    var i = 0;
    switch (htmlName) {
        case "gaoyachilunbeng.shtml":
            i = 1;
            break;
        case "liuliangkongzhifa.shtml":
            i = 2;
            break;
        case "yalijidianqi.shtml":
            i = 3;
            break;
        case "yeyayuanjianxilie.shtml":
            i = 4;
            break;
        case "hezuohuoban.shtml":
            i = 5;
            break;
        case "jishuzhichi.shtml":
            i = 6;
            break;
        case "photo-0001,0037.shtml":
            i = 7;
            break;
        case "jufengxinwen.shtml":
            i = 8;
            break;
        case "http://www.kstyjz.com/templets/qiye/JS/lianxijufeng.html":
            i = 9;
            break;
        default:
            i = 0;
            break;

    }
    var h = 0;
    $("#menulist>li").each(function () {

        if (h == i) {
            $(this).addClass("cur");
        } else {
            $(this).removeClass("cur");
        }
        h++;
    });
}

/********************
* 根據ID獲取文本框內容並去除兩邊空格
* elmId : 元素ID
********************/
function $tv(elmId) { return $.trim($v(elmId)); };
/********************
* 獲取元素選中狀態（復選框、單選框）
* elmId : 元素ID
********************/
function getChecked(elmId) { return $("#" + elmId).attr("checked"); };
/********************
* 從容器查找單選框，當value與val相等則選中之
* val : 值
* cntrId : 容器ID
********************/
function checkRadio(val, cntrId) {
    var rdos;
    if (cntrId == null){
        rdos = $(document.body).find("input[type=radio]");
    }else{
        rdos = $j(cntrId).find("input[type=radio]");
    }
    rdos.each(function(i) {
        var jT = $(this);
        jT.attr("checked", jT.attr("value") == val);
    });
}
function getSelectedText(ddlElmId) {
    var opts = $("#" + ddlElmId + ">option");
    var rtnVal = "";
    opts.each(function(i) {
        if (this.selected) {
            rtnVal = this.text;
        }
    });
    return rtnVal;
}
/********************
* 隱藏下拉框函數
* 重載1 : 如果不傳遞cntrId，則以body為容器
* cntrId : 容器ID
********************/
function hideDdl(cntrId) {
    var arrTags = ["select", "iframe", "applet", "object"];
    var jCntr;
    if (cntrId != null){
        jCntr = $j(cntrId);
    }else{
        jCntr = $(document.body);
    }
    for (var i = 0; i < arrTags.length; ++i) {
        jCntr.find(arrTags[i]).css("visibility", "hidden");
    } 
    //    if (behavior != null) {
    //        behavior();
    //    }
}
/********************
* 隱藏下拉框函數
********************/
function showDdl() {
    var arrTags = ["select", "iframe", "applet", "object"];
    for (var i = 0; i < arrTags.length; ++i) {
        $(arrTags[i]).css("visibility", "visible");
    }
}
/********************
* 重置一個層為絕對居中於窗口的位置
* elmId : 元素ID或元素
********************/
function relocation(elmId) {
    var jElm;
    if (typeof (elmId).toString().toLowerCase() == "string") {
        jElm = $j(elmId);
    } else {
        jElm = $(elmId);
    }
    if (jElm.length == 0) {
        return;
    }

    var dd = document.documentElement;
    var t = (dd.scrollTop - (jElm.height() / 2) + "px");
    jElm.css({ "margin-top": t/*, "left": l */ });
}
/********************
* 縮放窗口或拖動滾動條時，保持彈出層消息框於窗口居中
********************/
$(function() {
    //--
    $(window).resize(function() {
        relocation("mesbook1");
        relocation("mesbook1_c");
    });
    $(window).scroll(function() {
        relocation("mesbook1");
        relocation("mesbook1_c");
    });
    //--
});
/********************
* 對應$a(...)，用於在服務端顯示彈出層消息框，針對IE的補丁
********************/
function oran_msg(sMsg, boxType, autoClose, focusElmId, sTitle, behavior) {
    window.onload = function() {
        $a(sMsg, boxType, autoClose, focusElmId, sTitle, behavior);
    }
}
/********************
* 提示選擇對話框
* msg : 消息內容（必傳遞參數）
* obj : 對話框屬性
********************/
function $confirm(sMsg, yesObj, noObj) {
    hideDdl();
    var sTitle = "消息對話框";
    var jMesbook1 = $j("mesbook1_c");
    if (jMesbook1.length == 0) {
        var sHtml = "<div id='mesbook1_c'>"
				+ "<div><img onclick='hideMsg()' id='mesbook1_cImgClose' src='" + SKIN_PATH + "Img/ico9_close.gif' alt='關閉' class='fr p vam' /><span id='mesbook1_cTitle'></span></div>"
				+ "<dl class='b1'>"
					+ "<dt><img id='mesbook1_cIcon' src='" + SKIN_PATH + "Img/message_ico_03.gif' alt='' title=''  /></dt>"
					+ "<dd class='l_25' id='mesbook1_cMsg'></dd>"
					+ "<dd class='b' style='visibility:hidden' id='mesbook1_cAutoClose'>此窗口<span id='mesbook1_cDelay' style='margin:0 5px;'></span>秒鐘後自動關閉。</dd>"
					+ "<dd id='mesbook1_cBtns'>"
						+ "<input type='button' class='b15' value='確 定' />"
						+ "<input type='button' class='b15' value='取 消' />"
					+ "</dd>"
				+ "</dl>"
			+ "</div>";
        $(document.body).append(sHtml);
    }
    var jMesbook1 = $j("mesbook1_c");
    var jMesbook1ImgClose = $j("mesbook1_cImgClose");
    var jMesbook1Icon = $j("mesbook1_cIcon");
    var jMesbook1Msg = $j("mesbook1_cMsg");
    var jMesbook1AutoClose = $j("mesbook1_cAutoClose");
    var jMesbook1Delay = $j("mesbook1_cDelay");
    var jMesbook1Title = $j("mesbook1_cTitle");
    var jMesbook1Btns = $j("mesbook1_cBtns");

    jMesbook1Title.html(sTitle);
    //消息內容
    jMesbook1Msg.html(sMsg);
    //圖標
    var iconPath = SKIN_PATH + "Img/ico_ques.gif";
    jMesbook1Icon.attr("src", iconPath);

    //關閉按鈕
    var yesBtn = jMesbook1Btns.find("input:eq(0)");
    var noBtn = jMesbook1Btns.find("input:eq(1)");
    yesBtn.removeAttr("onclick");
    noBtn.removeAttr("onclick");
    //yes
    if (yesObj.title != null) {
        yesBtn.val(yesObj.title);
    }
    if (typeof (yesObj.toDo) == "string") {
        yesBtn.click(function() {
            location.href = yesObj.toDo;
        });
    } else {
        yesBtn.click(function() {
            yesObj.toDo();
        })
    }
    //no
    if (noObj.title != null) {
        noBtn.val(noObj.title);
    }

    if (typeof (noObj.toDo) == "string") {
        noBtn.click(function() {
            location.href = noObj.toDo;
        });
    } else {
        noBtn.click(function() {
            noObj.toDo();
        })
    }
    jMesbook1ImgClose.removeAttr("onclick");
    jMesbook1ImgClose.click(function() {
        hideConfirm();
    });

    //顯示
    showFullBg();
    setCM("mesbook1_c");
    relocation("mesbook1_c");
    jMesbook1.fadeIn(80);
}
/********************
* 隱藏消息提示層
********************/
function hideConfirm() {
    showDdl();
    var jShadow = $j("mesbook1_c");
    hideFullBg();
    jShadow.fadeOut(80);
}
/********************
* 顯示消息提示層
* sMsg : 消息內容（必傳遞參數）
* boxType : 消息框類型（ok - 確認，info - 消息提示，yesno - 確定或取消對話框，error - 錯誤警告 ）
* autoClose : 自動關閉消息框延時(秒)，傳遞null表示不自動關閉
* focusElmId : 關閉消息框後將獲得焦點的元素的ID，傳遞null則取消該操作
* sTitle : 消息框標題
* behavior : 傳遞一個 Function 對象，當關閉消息框後調用該函數
********************/
function $a(sMsg, boxType, autoClose, focusElmId, sTitle, behavior) {
    if (boxType == null) {
        boxType = 2;
    }
    if (autoClose == null) {
        autoClose = -1;
    }
    //標題
    if (sTitle == null) {
        sTitle = "消息提示";
    }

    hideDdl();
    var jMesbook1 = $j("mesbook1");
    if (jMesbook1.length == 0) {
        var sHtml = "<div id='mesbook1'>"
				+ "<div><img style='float:right' onclick='hideMsg()' id='mesbook1ImgClose' src='" + SKIN_PATH + "Img/ico9_close.gif' alt='關閉' class='fr p vam ml5' /><span id='mesbook1Title'></span></div>"
				+ "<dl class='b1'>"
					+ "<dt><img id='mesbook1Icon' src='" + SKIN_PATH + "Img/message_ico_03.gif' alt='' title='' /></dt>"
					+ "<dd class='l_25' id='mesbook1Msg'></dd>"
					+ "<dd class='b' style='visibility:hidden' id='mesbook1AutoClose'>此窗口<span id='mesbook1Delay' style='margin:0 5px;'></span>秒鐘後自動關閉。</dd>"
					+ "<dd id='mesbook1Btns'>"
						+ "<input type='button' class='b15' value='關 閉' />"
					+ "</dd>"
				+ "</dl>"
			+ "</div>";
        $(document.body).append(sHtml);
    }
    var jMesbook1 = $j("mesbook1");
    var jMesbook1ImgClose = $j("mesbook1ImgClose");
    var jMesbook1Icon = $j("mesbook1Icon");
    var jMesbook1Msg = $j("mesbook1Msg");
    var jMesbook1AutoClose = $j("mesbook1AutoClose");
    var jMesbook1Delay = $j("mesbook1Delay");
    var jMesbook1Title = $j("mesbook1Title");
    var jMesbook1Btns = $j("mesbook1Btns");

    jMesbook1Title.html(sTitle);
    //消息內容
    jMesbook1Msg.html(sMsg);
    //圖標
    var iconPath = SKIN_PATH + "Img/";
    switch (boxType) {
        case 1: iconPath += "ico_ok.gif"/*tpa=http://www.kstyjz.com/templets/qiye/JS/ico_ok.gif*/; break;
        case 2: iconPath += "ico_info.gif"/*tpa=http://www.kstyjz.com/templets/qiye/JS/ico_info.gif*/; break;
        case 3: iconPath += "ioc_ques.gif"/*tpa=http://www.kstyjz.com/templets/qiye/JS/ioc_ques.gif*/; break;
        case -1: iconPath += "ico_error.gif"/*tpa=http://www.kstyjz.com/templets/qiye/JS/ico_error.gif*/; break;
        default: iconPath += "ico_normal.gif"/*tpa=http://www.kstyjz.com/templets/qiye/JS/ico_normal.gif*/; break;
    }
    jMesbook1Icon.attr("src", iconPath);

    //關閉按鈕
    var okBtn = jMesbook1Btns.find("input");
    okBtn.removeAttr("onclick");
    okBtn.click(function() {
        hideMsg();
        if (focusElmId != null)
            $j(focusElmId).focus();
        if (behavior != null) {
            behavior();
        }
    });
    jMesbook1ImgClose.removeAttr("onclick");
    jMesbook1ImgClose.click(function() {
        hideMsg();
        if (focusElmId != null)
            $j(focusElmId).focus();
        if (behavior != null) {
            behavior();
        }
    });
    okBtn.focus();

    //顯示
    showFullBg();
    setCM("mesbook1");
    relocation("mesbook1");
    jMesbook1.fadeIn(80);
}
function showMsgPage(msg, msgType, btnHref, btnTitle, defaultHref, delay) {
    if (msgType == null) {
        msgType = "Information";
    } else {
        switch (msgType) {
            case 1: msgType = "Successful"; break;
            case 2: msgType = "Information"; break;
            case 3: msgType = "Question"; break;
            case -1: msgType = "Failed"; break;
            default: msgType = "Information"; break;
        }
    }
    if (btnHref == null) {
        btnHref = "index.htm"/*tpa=http://www.kstyjz.com/*/;
    }
    if (btnTitle == null) {
        btnTitle = "首頁";
    }
    if (defaultHref == null) {
        defaultHref = "index.htm"/*tpa=http://www.kstyjz.com/*/;
    }
    if (delay == null) {
        delay = 9;
    }

    msg = msg.replace("/<script>/g", "").replace("/</script>/g", "").replace("/</sCript>/g", "");
    btnHref = btnHref.replace("/<script>/g", "").replace("/</script>/g", "").replace("/</sCript>/g", "").replace("http://", "").replace("https://", "");
    btnTitle = btnTitle.replace("/<script>/g", "").replace("/</script>/g", "").replace("/</sCript>/g", "");
    defaultHref = defaultHref.replace("/<script>/g", "").replace("/</script>/g", "").replace("/</sCript>/g", "").replace("http://", "").replace("https://", "");
    var url = "/Tools/Message.aspx?result=" + msgType
    + "&btntitle=" + encodeURIComponent(btnTitle) + "&btnhref=" + encodeURIComponent(btnHref) + "&defaulthref=" + encodeURIComponent(defaultHref)
    + "&delay=" + delay + "&msg=" + encodeURIComponent(msg);
    location.href = url;
}
/********************
* 隱藏消息提示層
********************/
function hideMsg() {
    showDdl();
    var jShadow = $j("mesbook1");
    hideFullBg();
    jShadow.fadeOut(80);
}
/********************
* 設置層絕對居中（水平，垂直）setCenterMiddle
* elmId : 元素ID或元素
* speed : (可選)漸變進入的速度
********************/
function setCM(elmId, speed) {
    var jElm;
    if (typeof (elmId).toString().toLowerCase() == "string") {
        jElm = $j(elmId);
    } else {
        jElm = $(elmId);
    }
    if (speed == null) {
        speed = 80;
    }
    var h = jElm.height() / 2;
    var w = jElm.width() / 2;
    jElm.css({ "top": "50%", "margin-top": "-" + h + "px", "left": "50%", "margin-left": "-" + w + "px" });
    jElm.css({ "position": "absolute", "z-index": "999" });
    jElm.fadeIn(speed);
}

function setCMS(elmId, speed) {
    var jElm;
    if (typeof (elmId).toString().toLowerCase() == "string") {
        jElm = $j(elmId);
    } else {
        jElm = $(elmId);
    }
    if (speed == null) {
        speed = 80;
    }
    var h = jElm.height() / 2;
    var w = jElm.width() / 2;
    var height=document.documentElement.scrollTop;
    if(height>100)
    {
        jElm.css({ "top": "50%", "margin-top": "-" + h + "px", "left": "50%", "margin-left": "-" + w + "px" });
    }
    else
    {
        h=200;
        jElm.css({ "margin-top": "-" + h + "px", "left": "50%", "margin-left": "-" + w + "px" });
    }

    jElm.css({ "position": "absolute", "z-index": "999" });
    jElm.fadeIn(speed);
}

/********************
* 顯示一個全屏灰度背景
* elmId : 元素ID或元素
********************/
function showFullBg(elmId, isHideDdl, opacity, bgColor, zIndex, speed, behavior) {
    if (elmId == null) {
        elmId = "oran_full_bg";
    }
    var jElm = $j(elmId);
    if (jElm.length == 0) {
        var sHtml = "<div style='position:absolute;top:0;left:0;display:none;' id='" + elmId + "'></div>";
        $(document.body).append(sHtml);
    }
    if (opacity == null) {
        opacity = 0.75;
    }
    if (bgColor == null) {
        bgColor = "#777";
    }
    if (zIndex == null) {
        zIndex = "9";
    }
    if (speed == null) {
        speed = 80;
    }
    if (isHideDdl == null) {
        isHideDdl = true;
    }
    var jElm = $j(elmId);
    var dd = document.documentElement;
    var sWidth = dd.scrollWidth;
    var sHeight = dd.scrollHeight;
    var cH = dd.clientHeight;
    var cW = dd.clientWidth;
    if (sHeight < cH){
        sHeight = cH;
    }
    if (sWidth < cW){
        sWidth = cW;
    }
    jElm.css({ "z-index": zIndex, "background": bgColor, "opacity": opacity, "filter": "progid:DXImageTransform.Microsoft.Alpha(opacity=" + opacity * 100 + ")" });
    jElm.css({ "height": sHeight, "width": sWidth });
    if (isHideDdl) {
        hideDdl(null, behavior);
    }
    jElm.fadeIn(speed);
    if (behavior != null) {
        behavior();
    }
}
/********************
* 隱藏全屏灰度背景
* speed : (可選)漸變消退的速度
********************/
function hideFullBg(elmId, speed) {
    if (elmId == null) {
        elmId = "oran_full_bg";
    }
    if (speed == null) {
        speed = 80;
    }
    var jElm = $j(elmId);
    jElm.fadeOut(speed);
    showDdl();
}
//關閉層
//cntrId : 層ID
//bgId : 背景層ID
function $closeLayer(cntrId, bgId) {
    $j(cntrId).fadeOut(80, function() { hideFullBg(bgId); });
}
/********************
* 限制文本框字符長度，一個中文佔兩個長度（該函數一般用於多行文本框）
* src : 觸發事件的源元素
* 使用方法如 <textarea max="100" onkeyup="limitLength(this)"></textarea>
********************/
function limitLength(src) {
    var value = src.value;
    var byteLength = parseInt($(src).attr("max"));
    var attribute = src.id;
    var newvalue = value.replace(/[^\x00-\xff]/g, "**");
    var length = newvalue.length;

    //當填寫的字節數小於設置的字節數
    if (length * 1 <= byteLength * 1) {
        return;
    }
    var limitDate = newvalue.substr(0, byteLength);
    var count = 0;
    var limitvalue = "";
    for (var i = 0; i < limitDate.length; i++) {
        var flat = limitDate.substr(i, 1);
        if (flat == "*") {
            count++;
        }
    }
    var size = 0;
    var istar = newvalue.substr(byteLength * 1 - 1, 1); //校驗點是否為「×」

    //if 基點是×; 判斷在基點內有×為偶數還是奇數 
    if (count % 2 == 0) {
        //當為偶數時
        size = count / 2 + (byteLength * 1 - count);
        limitvalue = value.substr(0, size);
    } else {
        //當為奇數時
        size = (count - 1) / 2 + (byteLength * 1 - count);
        limitvalue = value.substr(0, size);
    }
    alert("最大輸入" + byteLength + "個字節（相當於" + byteLength / 2 + "個漢字）！");
    document.getElementById(attribute).value = limitvalue;
    return;
}
/********************
* 根據元素ID獲取元素對像(document.getElementById)
* elmId : 元素ID
********************/
function $g(elmId) { return document.getElementById(elmId); };
/********************
* 根據元素名稱獲取元素對像集(document.getElementsByName)
* nm : 元素name
********************/
function $name(nm) { return document.getElementsByName(nm); };
/********************
* 根據元素標籤從指定容器獲取元素對像集(document.getElementsByTagName)
* cntr : 容器，可以是元素對像、元素ID
* tagName : 標籤名稱
********************/
function $tag(cntr, tagName) {
    var o = cntr;
    if (o != Object){ o = $g(cntr);}
    return o.getElementsByTagName(tagName);
}
/********************
* 限制文本框只能輸入數字(數字鍵)
* e : event
********************/
function digiKeyOnly(e) {
    var key = window.event ? event.keyCode : e.which;
    if (key < 27 || key > 128){
        return true;
    }else if (key >= 48 && key <= 57){
        return true;
    }else{
        return false;
    }
}
/********************
* 限制文本框只能輸入數字
* src : 觸發事件的源元素
* 使用方法如 <input onkeyup="digiOnly(this)" />
********************/
function digiOnly(src) {
    src.value = src.value.replace(/[^0-9]/g, '');
}
/********************
* 打開窗口
* url : URL
* w : 窗口寬度（不傳遞則默認為300px）
* h : 窗口高度（不傳遞則默認為300px）
* features : 關於窗口的更多屬性（可先，不傳遞該參數或傳遞null則默認為無工具欄、無菜單欄、可拖放、有滾動條、縱橫坐標為0）
********************/
function $o(url, w, h, features) {
    if (url == null || url == ""){
        return;
    }
    if (w == null){
        w = "300";
    }
    if (h == null){
        h = "300";
    }
    if (features == null){
        features = "location=0,menubar=0,resizable=1,scrollbars=1,status=0,toolbar=0;top=0,left=0";
    }
    if (w){
        features += ",width=" + w;
    }
    if (h){
        features += ",height=" + h;
    }
    window.open(url, "", features, false);
}
/********************
* 清空文本框內容
* cntrId : 容器ID，不傳遞則以body為容器
********************/
function emptyText(cntrId) {
    var jTxts;
    if (cntrId == null){
        jTxts = $("body").find("input[type=text]");
    }else{
        jTxts = $j(cntrId).find("input[type=text]");
    }
    var jTxtss;
    if (cntrId == null){
        jTxtss = $("body").find("input[type=password]");
    }else{
        jTxtss = $j(cntrId).find("input[type=password]");
    }
    jTxts.each(function() {
        $(this).attr("value", "");
    });
    jTxtss.each(function() {
        $(this).attr("value", "");
    });
    if (cntrId == null)
        jTxts = $("body").find("textarea");
    else
        jTxts = $j(cntrId).find("textarea");
    jTxts.each(function() {
        $(this).attr("value", "");
    });
}
/********************
* COOKIE操作
* 重載1 只傳遞name : 根據鍵名獲取cookie值
* 重載2 傳遞name, value : 設置cookie,默認過期時間為9986400000
* 重載3 傳遞name, value, expire : 設置cookie並指定過期時間
* 重載4 傳遞name, value(bool) : 根據鍵名刪除cookie
* name : cookie 鍵名 : 
* val : cookie值
* expire : cookie過期時間
********************/
$cookie = function(name, val, expire) {
    if (val == null && expire == null) {
        var search = name + "=";
        begin = document.cookie.indexOf(search);
        if (begin != -1) {
            begin += search.length;
            end = document.cookie.indexOf(";", begin);
            if (end == -1) end = document.cookie.length;
            return document.cookie.substring(begin, end);
        }
        return null;
    } else if (typeof (val) == "boolean") {
        $cookie(name, "", -999999);

    } else {
        if (expire == null){ expire = 9986400000;}
        var today = new Date();
        var expireDay = new Date();
        var msPerMonth = expire;
        expireDay.setTime(today.getTime() + msPerMonth);
        document.cookie = name + "=" + val + ";expires=" + expireDay.toGMTString();
    }
};
/********************
* 查詢URL參數（查詢失敗則返回空字符串）
* paraNm : 參數名
********************/
function $qs(paraNm) {
    var args = new Object();
    var query = location.search.substring(1);
    var pairs = query.split("&");
    for (var i = 0; i < pairs.length; ++i) {
        var pos = pairs[i].indexOf('=');
        if (!pos) continue;
        var paraNm2 = pairs[i].substring(0, pos);
        var vlu = pairs[i].substring(pos + 1);
        vlu = decodeURIComponent(vlu);
        args[paraNm2] = vlu;
    }
    return args[paraNm] == null ? "" : args[paraNm];
}
/********************
* 全選復選框或取消全選（根據觸發事件的源對象的選中狀態而定）
* src : 觸發事件的源對像
* cntrId : 容器ID
********************/
function selectAll(src, cntrId) {
    var chks = $tag(cntrId, "input");
    for (var i = 0; i < chks.length; ++i) {
        chks[i].checked = src.checked;
    }
}
/********************
* 反選復選框
* cntrId : 容器ID
********************/
function invertSelect(cntrId) {
    var chks = $tag(cntrId, "input");
    for (var i = 0; i < chks.length; ++i) {
        chks[i].checked = !chks[i].checked;
    }
}
function getPageFilename() {
    var path = location.pathname;
    var pos = path.lastIndexOf('/') + 1;
    var filename = path.substring(pos, path.length);
    return filename;
}
function getRawUrl() {
    var path = location.href;
    var pos = path.lastIndexOf('/') + 1;
    var filename = path.substring(pos, path.length);
    pos = filename.lastIndexOf('#');
    filename = filename.substring(0, pos);
    return filename;
}
function getIntactRawUrl() {
    var path = location.href;
    var pos;
    pos = path.lastIndexOf('#');
    path = path.substring(0, pos);
    return path;
}
/********************
* 附加參數到現URl
* name : 參數名
* val : 參數值
********************/
function toggleArg(name, val) {
    var url = $$.intactRawUrl();
    var pos = url.indexOf('?');
    if (pos == -1) {
        return url + "?" + name + "=" + val;
    } else {
        var args = url.substring(pos);
        var path = url.substring(0, pos);
        var patten = new RegExp("&?" + name + "=?\\w*\\[?\\w*\\]?\\|?\\d?", "i");
        args = args.replace(patten, "");
        if (args.length == 1) {//沒有任何參數，只有?
            args += name + "=" + val;
        } else {
            args += "&" + name + "=" + val;
        }
        return path + args;
    }
};
/********************
* 漸大/小，漸出/入一個元素
* elmId : 元素ID
* visibility : 顯現或隱藏
********************/
function increase(elmId, visibility) {
    if (visibility == null){
        visibility = "show";
     }
    var jO = $j(elmId);
    jO.animate({
        height: visibility,
        width: visibility,
        opacity: visibility
    }, "fast");
}
/********************
* 漸出/入一個元素(當元素可見則入，反之則出)
* elmId : 元素ID
* speed : 速度
********************/
function fadeToggle(elmId, speed) {
    if (speed == null) {speed = "fast"};
    if ($("#" + elmId).is(":visible")){ $("#" + elmId).fadeOut(speed)}
    else{ $("#" + elmId).fadeIn(speed)};
}
/********************
* 當元素獲得焦點時，高亮顯示
* cntrId : 容器ID
* focusClass : 高亮時的樣式我
********************/
function clearAllElms(cntrId, focusClass) {
    clearDdls(cntrId, focusClass);
    clearTextBoxes(cntrId, focusClass);
    clearRdos(cntrId, focusClass);
    clearChks(cntrId, focusClass);
}
function clearRdos(cntrId, focusClass) {
    if (focusClass == null){
        focusClass = "tfocus";
    }
    var txts = $j(cntrId).find("input[type=radio]");
    txts.focus(function() { $(this).addClass(focusClass); });
    txts.blur(function() { $(this).removeClass(focusClass); });
}
function clearChks(cntrId, focusClass) {
    if (focusClass == null){
        focusClass = "tfocus";
    }
    var txts = $j(cntrId).find("input[type=checkbox]");
    txts.focus(function() { $(this).addClass(focusClass); });
    txts.blur(function() { $(this).removeClass(focusClass); });
}
function clearDdls(cntrId, focusClass) {
    if (focusClass == null){
        focusClass = "tfocus";
    }
    var txts = $j(cntrId).find("select");
    txts.focus(function() { $(this).addClass(focusClass); });
    txts.blur(function() { $(this).removeClass(focusClass); });
}
function clearTextBoxes(cntrId, focusClass) {
    if (focusClass == null){
        focusClass = "tfocus";
    }
    var txts = $j(cntrId).find("input[type=text]");
    txts.focus(function() { $(this).addClass(focusClass); });
    txts.blur(function() { $(this).removeClass(focusClass); });
    var txts = $j(cntrId).find("input[type=password]");
    txts.focus(function() { $(this).addClass(focusClass); });
    txts.blur(function() { $(this).removeClass(focusClass); });
    txts = $j(cntrId).find("textarea");
    txts.focus(function() { $(this).addClass(focusClass); });
    txts.blur(function() { $(this).removeClass(focusClass); });
}
/********************
* 增加書籤
* url : URL
* title : 收藏項目的標題
********************/
function addBookmark(url, title) {
    if (window.sidebar) {
        window.sidebar.addPanel(title, url, "");
    } else if (document.all) {
        window.external.AddFavorite(url, title);
    } else if (window.opera && window.print) {
        return true;
    }
}

//加入收藏
function addBookmark() {
    var _title = document.title;
    var url = document.URL;
    if (window.sidebar) {
        window.sidebar.addPanel(_title, url, "");
    }
    else
        if (window.opera && window.print) {
        var __mbm = document.createElement('a');
        __mbm.setAttribute('rel', 'sidebar');
        __mbm.setAttribute('href', url);
        __mbm.setAttribute('title', _title);
        __mbm.click();
    }
    else
        if (document.all) {
        window.external.AddFavorite(url, _title);
    }
}

//加入收藏
function BookMarkit() {
    var url = "http://" + window.location.host;
    var title = document.title;
    if (document.all) {
        window.external.addFavorite(url, title);
    }
    else if (window.sidebar) {
        window.sidebar.addPanel(title, url, "");
    }
}

/********************
* 根據值選中下拉列表項
* ddlId : 下拉列表元素ID
* val : 值
********************/
function setSelectByValue(ddlId, val) {
    var ddl = $g(ddlId);
    for (var i = 0; i < ddl.options.length; ++i) {
        var opt = ddl.options[i];
        opt.selected = (opt.value == val);
    }
}
/********************
* 顯示驗證碼
********************/
function showVerifyCode(elmId, msgElmId, imgId, chgLnkId) {
    if (elmId == null){
        elmId = "spVerCode";
     }
    if (msgElmId == null){
        msgElmId = "spVerCodeMsg";
     }
    if (imgId == null){
        imgId = "imgVerCode";
    }
    if (chgLnkId == null){
        chgLnkId = "spChgVerCode";
     }
    var jImg = $j(elmId);
    var jMsg = $j(msgElmId);
    var jChgLnk = $j(chgLnkId);
    if (jImg.html() == "") {
        jMsg.html("正在加載驗證碼...");
        jMsg.show();
        jImg.html("<img src='http://www.kstyjz.com/Tools/ValidCode.aspx' style='display:none;' id='" + imgId + "' alt='驗證碼' />");
    }
    var jVerCode = $j(imgId);
    jVerCode.load(function() {
        jMsg.hide();
        jVerCode.show();
        jChgLnk.show();
    });
}
/********************
* 更換驗證碼
********************/
function changeVerCode(elmId, msgElmId) {
    if (elmId == null){
        elmId = "imgVerCode";
    }
    if (msgElmId == null){
        msgElmId = "spVerCodeMsg";
    }
    var jImg = $j(elmId);
    var jMsg = $j(msgElmId);
    jMsg.html("正在刷新驗證碼...").show();
    jImg.attr({ src: "/Tools/ValidCode.aspx?x=" + Math.random(), alt: "驗證碼" });
    jImg.hide();
    jImg.load(function() {
        jMsg.hide();
        jImg.show();
    });
}
/********************
* 顯示正在處理的圖標
* src : 觸發事件的源對像
* show : 顯示/隱藏
********************/
function showProc(src, show) {
    var oImg = $j("imgProc");
    if (show == null){
        show = true;
     }
    if (show) {
        $(src).hide();
        if (oImg.length > 0){
            oImg.remove();
        }
        $("<img src='" + SKIN_PATH + "img/processing.gif' id='imgProc' alt='正在處理' />").insertAfter(src);
    } else {
        $(src).show();
        oImg.remove();
    }
}
/********************
* 放大字體
* el : 放大/縮小
********************/
function enlarge(el, elmId) {
    if (el == null){
        el = true;
    }
    if (elmId == null) {
        elmId = "Content";
    }
    var o = $j(elmId);
    var fontSize = parseInt(o.css("font-size"));
    var newFontSize = (el ? fontSize * 1.2 : fontSize / 1.2);
    o.css("font-size", newFontSize + "px");
}
/********************
* 奇偶行變色
* el : 放大/縮小
* escapeRows : 忽略最首行數
* tabName : 表ID
* odd : 奇行的樣式或樣式類名
* even : 偶行的樣式或樣式類名
********************/
function altRow(escapeRows, tabName, odd, even) {
    var rows = $tag(tabName, "tr");
    for (var i = escapeRows; i < rows.length; ++i) {
        var argSty;
        if (i % 2 == 0) argSty = even;
        else argSty = odd;
        if (typeof (argSty) == "object") {
            for (var sty in argSty) {
                rows[i].style[sty] = argSty[sty];
            }
        } else {
            rows[i].className = argSty;
        }
    }
}
/********************
* 獲取容器裡已選中復選/單選按鈕的值
* cntrId : 容器ID
* escapeRows : 忽略最首行數
********************/
function getCheckedVal(cntrId, escapeRows) {
    if (escapeRows == null) {
        escapeRows = -1;
    }
    var chks = $j(cntrId).find("input:checked");
    var rtnVal = "";
    var flag = false;
    chks.each(function(i) {
        if (i > escapeRows) {
            if (flag) {
                rtnVal += ",";
            }
            rtnVal += $(this).val();
            flag = true;
        }
    });
    return rtnVal;
}
function checkAll(src, cntrId) {
    var chks = $j(cntrId).find("input[type=checkbox]");
    chks.each(function(i) {
        this.checked = src.checked;
    });
}
//根據字段列表獲取查詢頁面路徑字符串
//FieldList格式：控件ID名稱,查詢字段名稱|控件ID名稱1,查詢字段名稱1|.. 
function GetSearchURL(FieldList, URL) {
    //1\定義變量
    if (URL == null) {
        URL = getIntactRawUrl();
    }

    //2\循環把變量列表取出來,組合成URL
    var TempFieldList = FieldList.split("|");
    for (var i = 0; i < TempFieldList.length; i++) {
        //1>尋找控件
        var control1 = TempFieldList[i].split(",");
        var controlname;
        var control = document.getElementById(control1[0]);
        if (control1.length == 2) { controlname = control1[1]; } else { controlname = control1[0]; }
        if (control != null) {
            //2>取出控件的值
            var controlvalue = control.value;
            //3>設置URL
            if (controlvalue != null) {
                URL += "&" + controlname + "=" + encodeURIComponent(controlvalue);
            }
        }
    }
    return URL;
}
function SearchObjectByGet(FieldList, url, getUrlOnly) {
    if (getUrlOnly == null) {
        getUrlOnly = false;
    }
    var newUrl = GetSearchURL(FieldList, url);
    if (getUrlOnly) {
        return newUrl;
    }
    window.location.href = newUrl;
}


function SearchObjects(kwd, objtype) {
    if(kwd=="請填寫關鍵詞"||kwd=="請輸入關鍵詞")
    {
        $a("您還沒有輸入關鍵詞，請填寫後查詢。");
        return;
    }
    if (objtype == "product") {
        var URL = "/Search/Index.aspx?objtype=product&kwd=" + escape(kwd);
        window.location.href = URL;
    }
    else {
        var URL = "/Search/News.aspx?objtype=news&kwd=" + escape(kwd);
        window.location.href = URL;
    }

}

//跳轉到某頁
//參數：參訓參數
//		參數值
function GoToURL(FieldName, FieldValue) {
    var URL;
    URL = SetURLField(URL, FieldName, FieldValue);
    location.href = URL;
}
//跳轉到某頁
//參數：參訓參數
//		參數值
function GoToURLByGet(FieldName, FieldValue) {
    //1\定義變量
    var URL;
    URL = location.href;

    //2\獲取地址參數
    URL = SetURLField(URL, "page", "1");
    URL = SetURLField(URL, FieldName, FieldValue);

    //3\遞交數據
}
//設置地址欄的參數
function SetURLField(URL, FieldName, FieldValue) {
    //1\把當前的超鏈接地址取出來
    var FindPlace;
    //2\如果？號後面沒有字符串,則在?後面添加查詢的字段 
    FindPlace = URL.indexOf("?");

    if (FindPlace == -1) {
        URL += "?" + FieldName + "=" + FieldValue;
    }
    else {
        //3\如果?後面有查詢字符串,則檢測有沒有該字段，如果有，則重新付值
        var search = FieldName + "=";
        var offset = URL.indexOf(search);
        if (offset != -1) {
            offset += search.length;
            end = URL.indexOf("&", offset);
            if (end == -1) {
                URL = URL.substring(0, offset) + FieldValue;
            }
            else {
                URL = URL.substring(0, offset) + FieldValue + URL.substring(end);
            }
        }
        else {
            URL = URL + "&" + FieldName + "=" + FieldValue;
        }
    }
    return URL;

}

//讀取地址欄的參數值
//參數：參數名稱
function readURLParameter(FieldName) {
    var search = FieldName + "=";
    var FieldValue = "";
    var URL = location.href;
    var offset = URL.indexOf(search);
    if (offset != -1) {
        offset += search.length;
        end = URL.indexOf("&", offset);
        if (end == -1) {
            FieldValue = URL.substring(offset);
        }
        else {
            FieldValue = URL.substring(offset, end);
        }
    }
    return FieldValue;
}
/********************
* 當一個文本框第一次獲得焦點時清空自己的文本，該文本框默認有一個屬性和事件：hadfocused="0" onfocus="focusToRemoveText(this)"
* src : 觸發事件的源元素
********************/
function focusToRemoveText(src) {
    var jSrc = $(src);
    var hadFocused = (jSrc.attr("hadfocused") == "1");
    if (!hadFocused) {
        jSrc.val("");
        jSrc.attr("hadfocused", "1");
    }
}
//輸出動態表單
//surObj : 投票對像
function SUR_ShowTable(surObj) {
    var sHtml = "";
    //投票模式（單選/復選）
    var inputType;
    switch (surObj.SelectionMode) {
        case 1: inputType = "radio"; break;
        case 2: inputType = "checkbox"; break;
    }
    //輸出內容
    switch (surObj.ShowMode) {
        case 1:
            sHtml = "<div class=\"survey_1\" style=\"width:" + surObj.Width + "px;\">"
                + "<div class=\"sur_tit\" style=\"width:" + (surObj.Width - 2) + "px;\">" + surObj.Title + "</div>"
                + "<table class=\"sur_tab\" id=\"SUR_itemTab_" + surObj.SubjectId + "\">";
            for (var i = 0; i < surObj.Items.length; ++i) {
                var obj = surObj.Items[i];
                var inputId = "SUR_item_" + surObj.SubjectId + i;
                sHtml += "<tr>"
                + "<td><input name=\"SUR_item" + surObj.SubjectId + "\" type=\"" + inputType + "\" value=\"" + obj.id + "\" id=\"" + inputId + "\" /></td>"
                + "<td><label for=\"" + inputId + "\">" + obj.title + "</label></td>"
                + "</tr>";
            } // end for
            sHtml += "</table>"
                + "<div class=\"bot_btn2\">"
                + "<input type=\"button\" value=\"提交\" class=\"b15\" onclick=\"SUR_senddata(this," + surObj.ObjectName + ")\" />"
                + "<input type=\"button\" onclick=\"window.open('/tools/survey.aspx?oid=" + surObj.SubjectId + "')\" value=\"查看\" class=\"b16\" />"
                + "</div>"
                + "</div>";
            break;
    } // end switch
    document.write(sHtml);
}

//提交投票
//參數：src : 觸發方法的源對像
//surObj : 投票對像
function SUR_senddata(src, subObj) {
    var msgElmId = "SUR_post_msg_" + subObj.SubjectId;
    var s = "<span id='" + msgElmId + "'>正在提交,請稍後...</span>";
    var url = "/ajax.ashx?action=Survey&t=" + Math.random();
    var checkedVla = getCheckedVal("SUR_itemTab_" + subObj.SubjectId);
    if (checkedVla == null || checkedVla.length == 0) {
        $a("您至少需要選中一個投票項。");
        return;
    }
    $(src).after(s).hide();
    $.post(url, {
        _SUR_SubjectID: subObj.SubjectId,
        _CheckedItems: checkedVla
    }, function(rsp) {
        var sta = gav(rsp, "state");
        var sMsg = gav(rsp, "msg");
        if (sta == "1") {
            $confirm("投票成功，感謝您的參與。", { title: "確定", toDo: function() { hideConfirm(); } }, { title: "查看結果", toDo: function() { window.open("/tools/survey.aspx?oid=" + subObj.SubjectId); hideConfirm(); } });
        } else {
            $a(sMsg);
        }
        $j(msgElmId).remove();
        $(src).show();
    });
}
//輸出留言表單
//surObj : 對像ID
function LEW_ShowTable() {
    var sHtml = "<div class=\"reports\" id=\"LEAVEWORD_cntr\" style=\"margin:0 auto 10px auto;\">"
            + "<h1>留言</h1>"
            + "<table id=\"LEAVEWORD_tab\">"
            + "<tr>"
            + "<th>* 標題：</th>"
            + "<td><input type=\"text\" size=\"40\" id=\"LEAVEWORD_txtTitle\" /></td>"
            + "</tr>"
            + "<tr>"
            + "<th>* 聯繫人：</th>"
            + "<td><input type=\"text\" size=\"10\" id=\"LEAVEWORD_txtContact\" /></td>"
            + "</tr>"
            + "<tr>"
            + "<th>聯繫電話：</th>"
            + "<td><input type=\"text\" size=\"30\" id=\"LEAVEWORD_txtTel\" /></td>"
            + "</tr>"
            + "<tr>"
            + "<th>手機號碼：</th>"
            + "<td><input type=\"text\" size=\"30\" id=\"LEAVEWORD_txtMobile\" /></td>"
            + "</tr>"
            + "<tr>"
            + "<th>* 電子郵箱地址：</th>"
            + "<td><input type=\"text\" size=\"30\" id=\"LEAVEWORD_txtEmail\" /></td>"
            + "</tr>"
            + "<tr>"
            + "<th>* 留言分類：</th>"
            + "<td id=\"LEAVEWORD_tdCats\"></td>"
            + "</tr>"
            + "<tr>"
            + "<th>留言內容：</th>"
            + "<td><textarea style=\"width:230px;height:80px;\" id=\"LEAVEWORD_txtShortDesc\"></textarea></td>"
            + "</tr>"
            + "<tr>"
            + "<th>&nbsp;</th>"
            + "<td>"
            + "<input type=\"button\"  value=\"提交\" class=\"b15\" onclick=\"sendLeaveword(this)\" /> "
            + "</td>"
            + "</tr>"
            + "</table>"
            + "</div>";
    document.write(sHtml);
    fillLeavewordCategories();
    //    //輸出內容
    //    switch (surObj.ShowMode) {
    //        case 1:
    //            sHtml = "<div class=\"survey_1\" style=\"width:" + surObj.Width + "px;\">"
    //                + "<div class=\"sur_tit\" style=\"width:" + (surObj.Width - 2) + "px;\">" + surObj.Title + "</div>"
    //                + "<table class=\"sur_tab\" id=\"SUR_itemTab_" + surObj.SubjectId + "\">";
    //                + LEW_GetFields(surObj.Fields)
    //                + "</table>"
    //                + "<div class=\"bot_btn2\">"
    //                + "<input type=\"button\"  value=\"關閉\" class=\"b18 fr\" onclick=\"$('#LEAVEWORD_cntr>h1>a').click()\" /> "
    //                + "<input type=\"button\" value=\"提交\" class=\"b15\" onclick=\"sendLeaveword(this," + surObj.ObjectName + ")\" />"
    //                + "<input type=\"button\" onclick=\"window.open('/tools/survey.aspx?oid=" + surObj.SubjectId + "')\" value=\"查看\" class=\"b16\" />"
    //                + "</div>"
    //                + "</div>";
    //            break;
    //    } // end switch
}
////獲取留言HTML
//function LEW_GetFields(fieldStr) {
//    var template = "<tr>"
//                + "<td>{$item_name$}：</td>"
//                + "<td><input type=\"" + inputType + "\" id=\"" + inputId + "\" /></td>"
//                + "</tr>";
//    var rtnVal = "";
//    var fieldsCrumb = fieldStr.split("||");
//    for (var i = 0; i < fieldsCrumb.length; ++i) {
//        var itemNameCrumb = fieldsCrumb[i].spalit("$$");
//        var itemName;
//        var itemReName;
//        if (itemNameCrumb.length == 2) {
//            itemName = itemNameCrumb[0];
//            itemReName = itemNameCrumb[1];
//        } else {
//            itemName = itemNameCrumb[0];
//            itemReName = itemNameCrumb[0];
//        } // end if
//        if (itemName != "留言內容" && itemName != "留言分類") {
//            rtnVal += "<tr>"
//                + "<td>" + itemReName + "：</td>"
//                + "<td><input size=\"30\" type=\"text\" id=\"" + LEW_GetFieldId(itemName) + "\" /></td>"
//                + "</tr>";
//        } else if (itemName == "留言內容") {
//            rtnVal += "<tr>"
//                + "<td>" + itemReName + "：</td>"
//                + "<td><textarea style=\"width:230px;height:80px;\" id=\"" + LEW_GetFieldId(itemName) + "\"></textarea></td>"
//                + "</tr>";
//        } else if (itemName == "留言分類") {
//            rtnVal += "<tr>"
//                + "<td>" + itemReName + "：</td>"
//                + "<td id=\"LEAVEWORD_tdCats\"></td>"
//                + "</tr>";
//        } // end if
//    } // end for
//}
////根據留言字段名稱獲取元素ID
//function LEW_GetFieldId(itemName) {
//    var rtnVal = "";
//    var prefix = "LEAVEWORD_";
//    switch (itemName) {
//        case "標題": rtnVal = prefix + "txtTitle"; break;
//        case "聯繫人": rtnVal = prefix + "txtContact"; break;
//        case "聯繫電話": rtnVal = prefix + "txtTel"; break;
//        case "手機號碼": rtnVal = prefix + "txtMobile"; break;
//        case "電子郵箱地址": rtnVal = prefix + "txtEmail"; break;
//        case "留言分類": rtnVal = prefix + "ddlCats"; break;
//        case "留言內容": rtnVal = prefix + "txtShortDesc"; break;
//    }
//    return rtnVal;
//}
//輸出留言表單
//surObj : 對像ID
function PAY_ShowTable() {
    var sHtml = "<div class=\"reports\" id=\"DIR_PAY_cntr\" style=\"margin:0 auto 10px auto;\">"
        + "<h1>付款</h1>"
        + "<table id=\"DIR_PAY_tab\" style=\"background:url(" + SKIN_PATH + "img/Pay_ico.gif) no-repeat right top;width:400px;\">"
        + "<tr>"
        + "<tr>"
        + "<th>* 付款方式：</th>"
        + "<td><select id=\"DIR_PAY_ddlPayment\"><option value=\"\">請選擇</option>"
        + "<option value=\"alipay\">支付寶</option>"
        + "<option value=\"99bill\">快錢</option>"
        + "</select>"
        + "</td>"
        + "</tr>"
        + "<th>* 付款人：</th>"
        + "<td><input type=\"text\" size=\"20\" id=\"DIR_PAY_txtPayer\" /></td>"
        + "</tr>"
        + "<tr>"
        + "<th>* 電子郵箱地址：</th>"
        + "<td><input type=\"text\" size=\"20\" id=\"DIR_PAY_txtEmail\" /></td>"
        + "</tr>"
        + "<tr>"
        + "<th>聯繫電話：</th>"
        + "<td><input type=\"text\" size=\"20\" id=\"DIR_PAY_txtTel\" /></td>"
        + "</tr>"
        + "<tr>"
        + "<th>手機號碼：</th>"
        + "<td><input type=\"text\" size=\"20\" id=\"DIR_PAY_txtMobile\" /></td>"
        + "</tr>"
        + "<tr>"
        + "<th>我公司業務員姓名：</th>"
        + "<td><input type=\"text\" size=\"20\" id=\"DIR_PAY_txtSalesManName\" /></td>"
        + "</tr>"
        + "<tr>"
        + "<th>* 付款金額：</th>"
        + "<td><input type=\"text\" size=\"10\" id=\"DIR_PAY_txtMoney\" /></td>"
        + "</tr>"
        + "<tr>"
        + "<th>* 款項用途：</th>"
        + "<td><input type=\"text\" size=\"40\" id=\"DIR_PAY_txtUse\" /></td>"
        + "</tr>"
        + "<tr>"
        + "<th>&nbsp;</th>"
        + "<td>"
        + "<input type=\"button\"  value=\"提交\" class=\"b15\" onclick=\"directPay(this)\" /> "
        + "</td>"
        + "</tr>"
        + "</table>"
        + "</div>";
    document.write(sHtml);
}

//用戶登陸
function LoginCheck(_username, _password) {

    var url = window.location;
    if (_username == undefined || _username.length == 0) {
        $a("請輸入用戶名", "錯誤提示", "txtUsername");
        return;
    }
    if (_password == undefined || _password.length == 0) {
        $a("請輸入密碼", "錯誤提示", "txtPassword");
        return;
    }
    $.post("/ajax.ashx?action=logincheck&t=" + Math.random(), {
        username: _username,
        password: _password
    },
       function(msg) {
           if (gav(msg, "state") == "1") {
               $a(gav(msg, "msg"));
               window.location.href = url;
           }
           else {
               $a(gav(msg, "msg"));
           }
           ;
       });
}
