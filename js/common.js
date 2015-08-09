var PTN_EMAIL = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
var PTN_FLOAT = /\d+(\.\d+)?/

/********************
* 根據ID獲取jQuery對像
* elmId : 元素ID
********************/
function $j(elmId) { return $("#" + elmId); }

/********************
* 獲取元素選中狀態（復選框、單選框）
* elmId : 元素ID
********************/
function getChecked(elmId) { return $("#" + elmId).attr("checked"); }

/********************
* 從容器查找單選框，當value與val相等則選中之
* val : 值
* cntrId : 容器ID
********************/
function checkRadio(val, cntrId) {
    var rdos;
    if (cntrId == null)
        rdos = $(document.body).find("input[type=radio]");
    else
        rdos = $j(cntrId).find("input[type=radio]");
    rdos.each(function(i) {
        var jT = $(this)
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
    if (cntrId != null)
        jCntr = $j(cntrId);
    else
        jCntr = $(document.body);
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
function $g(elmId) { return document.getElementById(elmId); }

/********************
* 根據元素名稱獲取元素對像集(document.getElementsByName)
* nm : 元素name
********************/
function $name(nm) { return document.getElementsByName(nm); }

/********************
* 根據元素標籤從指定容器獲取元素對像集(document.getElementsByTagName)
* cntr : 容器，可以是元素對像、元素ID
* tagName : 標籤名稱
********************/
function $tag(cntr, tagName) {
    var o = cntr;
    if (o != Object) o = $g(cntr);
    return o.getElementsByTagName(tagName);
}

/********************
* 限制文本框只能輸入數字(數字鍵)
* e : event
********************/
function digiKeyOnly(e) {
    var key = window.event ? event.keyCode : e.which;
    if (key < 27 || key > 128)
        return true;
    else if (key >= 48 && key <= 57)
        return true;
    else
        return false;
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
function $open(url, w, h, features) {
    if (url == null || url == "")
        return;
    if (w == null)
        w = "300";
    if (h == null)
        h = "300";
    if (features == null)
        features = "location=0,menubar=0,resizable=1,scrollbars=1,status=0,toolbar=0;top=0,left=0";
    if (w)
        features += ",width=" + w;
    if (h)
        features += ",height=" + h;
    window.open(url, "", features, false);
}

/********************
* 清空文本框內容
* cntrId : 容器ID，不傳遞則以body為容器
********************/
function emptyText(cntrId) {
    var jTxts;
    if (cntrId == null)
        jTxts = $("body").find("input[type=text]");
    else
        jTxts = $j(cntrId).find("input[type=text]");
    var jTxtss;
    if (cntrId == null)
        jTxtss = $("body").find("input[type=password]");
    else
        jTxtss = $j(cntrId).find("input[type=password]");
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
* 放大字體
* el : 放大/縮小
********************/
function enlarge(el, elmId) {
    if (el == null)
        el = true;
    if (elmId == null) {
        elmId = "Content";
    }
    var o = $j(elmId);
    var fontSize = parseInt(o.css("font-size"));
    var newFontSize = (el ? fontSize * 1.2 : fontSize / 1.2);
    o.css("font-size", newFontSize + "px");
}

//跳轉到某頁
//參數：參訓參數
//		參數值
function GoToURL(FieldName, FieldValue) {
    var URL;
    URL = SetURLField(URL, FieldName, FieldValue)
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

//用戶登陸
function LoginCheck(_username, _password) {
    var url = window.location;
    if (_username == undefined || _username.length == 0) {
        $a("請輸入用戶名", "錯誤提示", "txtUserName");
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
