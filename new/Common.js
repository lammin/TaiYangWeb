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
* �ھ�ID���jQuery�ﹳ
* elmId : ����ID
********************/
function $j(elmId) { return $("#" + elmId); }
/********************
* �ھ�ID����奻�ؤ��e
* ����1: �p�G�ǻ�val�ѼơA�h�ק�奻�ؤ��e
* elmId : ����ID
* val : �s���奻�ؤ��e
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


//���襤
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
* �ھ�ID����奻�ؤ��e�åh������Ů�
* elmId : ����ID
********************/
function $tv(elmId) { return $.trim($v(elmId)); };
/********************
* ��������襤���A�]�_��ءB���ء^
* elmId : ����ID
********************/
function getChecked(elmId) { return $("#" + elmId).attr("checked"); };
/********************
* �q�e���d����ءA��value�Pval�۵��h�襤��
* val : ��
* cntrId : �e��ID
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
* ���äU�Ԯب��
* ����1 : �p�G���ǻ�cntrId�A�h�Hbody���e��
* cntrId : �e��ID
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
* ���äU�Ԯب��
********************/
function showDdl() {
    var arrTags = ["select", "iframe", "applet", "object"];
    for (var i = 0; i < arrTags.length; ++i) {
        $(arrTags[i]).css("visibility", "visible");
    }
}
/********************
* ���m�@�Ӽh������~���󵡤f����m
* elmId : ����ID�Τ���
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
* �Y�񵡤f�Ω�ʺu�ʱ��ɡA�O���u�X�h�����ة󵡤f�~��
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
* ����$a(...)�A�Ω�b�A�Ⱥ���ܼu�X�h�����ءA�w��IE���ɤB
********************/
function oran_msg(sMsg, boxType, autoClose, focusElmId, sTitle, behavior) {
    window.onload = function() {
        $a(sMsg, boxType, autoClose, focusElmId, sTitle, behavior);
    }
}
/********************
* ���ܿ�ܹ�ܮ�
* msg : �������e�]���ǻ��Ѽơ^
* obj : ��ܮ��ݩ�
********************/
function $confirm(sMsg, yesObj, noObj) {
    hideDdl();
    var sTitle = "������ܮ�";
    var jMesbook1 = $j("mesbook1_c");
    if (jMesbook1.length == 0) {
        var sHtml = "<div id='mesbook1_c'>"
				+ "<div><img onclick='hideMsg()' id='mesbook1_cImgClose' src='" + SKIN_PATH + "Img/ico9_close.gif' alt='����' class='fr p vam' /><span id='mesbook1_cTitle'></span></div>"
				+ "<dl class='b1'>"
					+ "<dt><img id='mesbook1_cIcon' src='" + SKIN_PATH + "Img/message_ico_03.gif' alt='' title=''  /></dt>"
					+ "<dd class='l_25' id='mesbook1_cMsg'></dd>"
					+ "<dd class='b' style='visibility:hidden' id='mesbook1_cAutoClose'>�����f<span id='mesbook1_cDelay' style='margin:0 5px;'></span>������۰������C</dd>"
					+ "<dd id='mesbook1_cBtns'>"
						+ "<input type='button' class='b15' value='�T �w' />"
						+ "<input type='button' class='b15' value='�� ��' />"
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
    //�������e
    jMesbook1Msg.html(sMsg);
    //�ϼ�
    var iconPath = SKIN_PATH + "Img/ico_ques.gif";
    jMesbook1Icon.attr("src", iconPath);

    //�������s
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

    //���
    showFullBg();
    setCM("mesbook1_c");
    relocation("mesbook1_c");
    jMesbook1.fadeIn(80);
}
/********************
* ���î������ܼh
********************/
function hideConfirm() {
    showDdl();
    var jShadow = $j("mesbook1_c");
    hideFullBg();
    jShadow.fadeOut(80);
}
/********************
* ��ܮ������ܼh
* sMsg : �������e�]���ǻ��Ѽơ^
* boxType : �����������]ok - �T�{�Ainfo - �������ܡAyesno - �T�w�Ψ�����ܮءAerror - ���~ĵ�i �^
* autoClose : �۰����������ة���(��)�A�ǻ�null��ܤ��۰�����
* focusElmId : ���������ث�N��o�J�I��������ID�A�ǻ�null�h�����Ӿާ@
* sTitle : �����ؼ��D
* behavior : �ǻ��@�� Function ��H�A�����������ث�եθӨ��
********************/
function $a(sMsg, boxType, autoClose, focusElmId, sTitle, behavior) {
    if (boxType == null) {
        boxType = 2;
    }
    if (autoClose == null) {
        autoClose = -1;
    }
    //���D
    if (sTitle == null) {
        sTitle = "��������";
    }

    hideDdl();
    var jMesbook1 = $j("mesbook1");
    if (jMesbook1.length == 0) {
        var sHtml = "<div id='mesbook1'>"
				+ "<div><img style='float:right' onclick='hideMsg()' id='mesbook1ImgClose' src='" + SKIN_PATH + "Img/ico9_close.gif' alt='����' class='fr p vam ml5' /><span id='mesbook1Title'></span></div>"
				+ "<dl class='b1'>"
					+ "<dt><img id='mesbook1Icon' src='" + SKIN_PATH + "Img/message_ico_03.gif' alt='' title='' /></dt>"
					+ "<dd class='l_25' id='mesbook1Msg'></dd>"
					+ "<dd class='b' style='visibility:hidden' id='mesbook1AutoClose'>�����f<span id='mesbook1Delay' style='margin:0 5px;'></span>������۰������C</dd>"
					+ "<dd id='mesbook1Btns'>"
						+ "<input type='button' class='b15' value='�� ��' />"
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
    //�������e
    jMesbook1Msg.html(sMsg);
    //�ϼ�
    var iconPath = SKIN_PATH + "Img/";
    switch (boxType) {
        case 1: iconPath += "ico_ok.gif"/*tpa=http://www.kstyjz.com/templets/qiye/JS/ico_ok.gif*/; break;
        case 2: iconPath += "ico_info.gif"/*tpa=http://www.kstyjz.com/templets/qiye/JS/ico_info.gif*/; break;
        case 3: iconPath += "ioc_ques.gif"/*tpa=http://www.kstyjz.com/templets/qiye/JS/ioc_ques.gif*/; break;
        case -1: iconPath += "ico_error.gif"/*tpa=http://www.kstyjz.com/templets/qiye/JS/ico_error.gif*/; break;
        default: iconPath += "ico_normal.gif"/*tpa=http://www.kstyjz.com/templets/qiye/JS/ico_normal.gif*/; break;
    }
    jMesbook1Icon.attr("src", iconPath);

    //�������s
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

    //���
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
        btnTitle = "����";
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
* ���î������ܼh
********************/
function hideMsg() {
    showDdl();
    var jShadow = $j("mesbook1");
    hideFullBg();
    jShadow.fadeOut(80);
}
/********************
* �]�m�h����~���]�����A�����^setCenterMiddle
* elmId : ����ID�Τ���
* speed : (�i��)���ܶi�J���t��
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
* ��ܤ@�ӥ��̦ǫ׭I��
* elmId : ����ID�Τ���
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
* ���å��̦ǫ׭I��
* speed : (�i��)���ܮ��h���t��
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
//�����h
//cntrId : �hID
//bgId : �I���hID
function $closeLayer(cntrId, bgId) {
    $j(cntrId).fadeOut(80, function() { hideFullBg(bgId); });
}
/********************
* ����奻�ئr�Ū��סA�@�Ӥ������Ӫ��ס]�Ө�Ƥ@��Ω�h��奻�ء^
* src : Ĳ�o�ƥ󪺷�����
* �ϥΤ�k�p <textarea max="100" onkeyup="limitLength(this)"></textarea>
********************/
function limitLength(src) {
    var value = src.value;
    var byteLength = parseInt($(src).attr("max"));
    var attribute = src.id;
    var newvalue = value.replace(/[^\x00-\xff]/g, "**");
    var length = newvalue.length;

    //���g���r�`�Ƥp��]�m���r�`��
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
    var istar = newvalue.substr(byteLength * 1 - 1, 1); //�����I�O�_���u�ѡv

    //if ���I�O��; �P�_�b���I�����Ѭ������٬O�_�� 
    if (count % 2 == 0) {
        //�����Ʈ�
        size = count / 2 + (byteLength * 1 - count);
        limitvalue = value.substr(0, size);
    } else {
        //���_�Ʈ�
        size = (count - 1) / 2 + (byteLength * 1 - count);
        limitvalue = value.substr(0, size);
    }
    alert("�̤j��J" + byteLength + "�Ӧr�`�]�۷��" + byteLength / 2 + "�Ӻ~�r�^�I");
    document.getElementById(attribute).value = limitvalue;
    return;
}
/********************
* �ھڤ���ID��������ﹳ(document.getElementById)
* elmId : ����ID
********************/
function $g(elmId) { return document.getElementById(elmId); };
/********************
* �ھڤ����W����������ﹳ��(document.getElementsByName)
* nm : ����name
********************/
function $name(nm) { return document.getElementsByName(nm); };
/********************
* �ھڤ������ұq���w�e����������ﹳ��(document.getElementsByTagName)
* cntr : �e���A�i�H�O�����ﹳ�B����ID
* tagName : ���ҦW��
********************/
function $tag(cntr, tagName) {
    var o = cntr;
    if (o != Object){ o = $g(cntr);}
    return o.getElementsByTagName(tagName);
}
/********************
* ����奻�إu���J�Ʀr(�Ʀr��)
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
* ����奻�إu���J�Ʀr
* src : Ĳ�o�ƥ󪺷�����
* �ϥΤ�k�p <input onkeyup="digiOnly(this)" />
********************/
function digiOnly(src) {
    src.value = src.value.replace(/[^0-9]/g, '');
}
/********************
* ���}���f
* url : URL
* w : ���f�e�ס]���ǻ��h�q�{��300px�^
* h : ���f���ס]���ǻ��h�q�{��300px�^
* features : ���󵡤f����h�ݩʡ]�i���A���ǻ��ӰѼƩζǻ�null�h�q�{���L�u����B�L�����B�i���B���u�ʱ��B�a��Ь�0�^
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
* �M�Ť奻�ؤ��e
* cntrId : �e��ID�A���ǻ��h�Hbody���e��
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
* COOKIE�ާ@
* ����1 �u�ǻ�name : �ھ���W���cookie��
* ����2 �ǻ�name, value : �]�mcookie,�q�{�L���ɶ���9986400000
* ����3 �ǻ�name, value, expire : �]�mcookie�ë��w�L���ɶ�
* ����4 �ǻ�name, value(bool) : �ھ���W�R��cookie
* name : cookie ��W : 
* val : cookie��
* expire : cookie�L���ɶ�
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
* �d��URL�Ѽơ]�d�ߥ��ѫh��^�Ŧr�Ŧ�^
* paraNm : �ѼƦW
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
* ����_��ةΨ�������]�ھ�Ĳ�o�ƥ󪺷���H���襤���A�өw�^
* src : Ĳ�o�ƥ󪺷��ﹳ
* cntrId : �e��ID
********************/
function selectAll(src, cntrId) {
    var chks = $tag(cntrId, "input");
    for (var i = 0; i < chks.length; ++i) {
        chks[i].checked = src.checked;
    }
}
/********************
* �Ͽ�_���
* cntrId : �e��ID
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
* ���[�Ѽƨ�{URl
* name : �ѼƦW
* val : �Ѽƭ�
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
        if (args.length == 1) {//�S������ѼơA�u��?
            args += name + "=" + val;
        } else {
            args += "&" + name + "=" + val;
        }
        return path + args;
    }
};
/********************
* ���j/�p�A���X/�J�@�Ӥ���
* elmId : ����ID
* visibility : ��{������
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
* ���X/�J�@�Ӥ���(�����i���h�J�A�Ϥ��h�X)
* elmId : ����ID
* speed : �t��
********************/
function fadeToggle(elmId, speed) {
    if (speed == null) {speed = "fast"};
    if ($("#" + elmId).is(":visible")){ $("#" + elmId).fadeOut(speed)}
    else{ $("#" + elmId).fadeIn(speed)};
}
/********************
* ������o�J�I�ɡA���G���
* cntrId : �e��ID
* focusClass : ���G�ɪ��˦���
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
* �W�[����
* url : URL
* title : ���ö��ت����D
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

//�[�J����
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

//�[�J����
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
* �ھڭȿ襤�U�ԦC��
* ddlId : �U�ԦC����ID
* val : ��
********************/
function setSelectByValue(ddlId, val) {
    var ddl = $g(ddlId);
    for (var i = 0; i < ddl.options.length; ++i) {
        var opt = ddl.options[i];
        opt.selected = (opt.value == val);
    }
}
/********************
* ������ҽX
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
        jMsg.html("���b�[�����ҽX...");
        jMsg.show();
        jImg.html("<img src='http://www.kstyjz.com/Tools/ValidCode.aspx' style='display:none;' id='" + imgId + "' alt='���ҽX' />");
    }
    var jVerCode = $j(imgId);
    jVerCode.load(function() {
        jMsg.hide();
        jVerCode.show();
        jChgLnk.show();
    });
}
/********************
* �����ҽX
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
    jMsg.html("���b��s���ҽX...").show();
    jImg.attr({ src: "/Tools/ValidCode.aspx?x=" + Math.random(), alt: "���ҽX" });
    jImg.hide();
    jImg.load(function() {
        jMsg.hide();
        jImg.show();
    });
}
/********************
* ��ܥ��b�B�z���ϼ�
* src : Ĳ�o�ƥ󪺷��ﹳ
* show : ���/����
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
        $("<img src='" + SKIN_PATH + "img/processing.gif' id='imgProc' alt='���b�B�z' />").insertAfter(src);
    } else {
        $(src).show();
        oImg.remove();
    }
}
/********************
* ��j�r��
* el : ��j/�Y�p
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
* �_�����ܦ�
* el : ��j/�Y�p
* escapeRows : �����̭����
* tabName : ��ID
* odd : �_�檺�˦��μ˦����W
* even : ���檺�˦��μ˦����W
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
* ����e���̤w�襤�_��/�����s����
* cntrId : �e��ID
* escapeRows : �����̭����
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
//�ھڦr�q�C������d�߭������|�r�Ŧ�
//FieldList�榡�G����ID�W��,�d�ߦr�q�W��|����ID�W��1,�d�ߦr�q�W��1|.. 
function GetSearchURL(FieldList, URL) {
    //1\�w�q�ܶq
    if (URL == null) {
        URL = getIntactRawUrl();
    }

    //2\�`�����ܶq�C����X��,�զX��URL
    var TempFieldList = FieldList.split("|");
    for (var i = 0; i < TempFieldList.length; i++) {
        //1>�M�䱱��
        var control1 = TempFieldList[i].split(",");
        var controlname;
        var control = document.getElementById(control1[0]);
        if (control1.length == 2) { controlname = control1[1]; } else { controlname = control1[0]; }
        if (control != null) {
            //2>���X���󪺭�
            var controlvalue = control.value;
            //3>�]�mURL
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
    if(kwd=="�ж�g�����"||kwd=="�п�J�����")
    {
        $a("�z�٨S����J������A�ж�g��d�ߡC");
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

//�����Y��
//�ѼơG�ѰV�Ѽ�
//		�Ѽƭ�
function GoToURL(FieldName, FieldValue) {
    var URL;
    URL = SetURLField(URL, FieldName, FieldValue);
    location.href = URL;
}
//�����Y��
//�ѼơG�ѰV�Ѽ�
//		�Ѽƭ�
function GoToURLByGet(FieldName, FieldValue) {
    //1\�w�q�ܶq
    var URL;
    URL = location.href;

    //2\����a�}�Ѽ�
    URL = SetURLField(URL, "page", "1");
    URL = SetURLField(URL, FieldName, FieldValue);

    //3\����ƾ�
}
//�]�m�a�}�檺�Ѽ�
function SetURLField(URL, FieldName, FieldValue) {
    //1\���e���W�챵�a�}���X��
    var FindPlace;
    //2\�p�G�H���᭱�S���r�Ŧ�,�h�b?�᭱�K�[�d�ߪ��r�q 
    FindPlace = URL.indexOf("?");

    if (FindPlace == -1) {
        URL += "?" + FieldName + "=" + FieldValue;
    }
    else {
        //3\�p�G?�᭱���d�ߦr�Ŧ�,�h�˴����S���Ӧr�q�A�p�G���A�h���s�I��
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

//Ū���a�}�檺�Ѽƭ�
//�ѼơG�ѼƦW��
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
* ��@�Ӥ奻�زĤ@����o�J�I�ɲM�Ŧۤv���奻�A�Ӥ奻���q�{���@���ݩʩM�ƥ�Ghadfocused="0" onfocus="focusToRemoveText(this)"
* src : Ĳ�o�ƥ󪺷�����
********************/
function focusToRemoveText(src) {
    var jSrc = $(src);
    var hadFocused = (jSrc.attr("hadfocused") == "1");
    if (!hadFocused) {
        jSrc.val("");
        jSrc.attr("hadfocused", "1");
    }
}
//��X�ʺA���
//surObj : �벼�ﹳ
function SUR_ShowTable(surObj) {
    var sHtml = "";
    //�벼�Ҧ��]���/�_��^
    var inputType;
    switch (surObj.SelectionMode) {
        case 1: inputType = "radio"; break;
        case 2: inputType = "checkbox"; break;
    }
    //��X���e
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
                + "<input type=\"button\" value=\"����\" class=\"b15\" onclick=\"SUR_senddata(this," + surObj.ObjectName + ")\" />"
                + "<input type=\"button\" onclick=\"window.open('/tools/survey.aspx?oid=" + surObj.SubjectId + "')\" value=\"�d��\" class=\"b16\" />"
                + "</div>"
                + "</div>";
            break;
    } // end switch
    document.write(sHtml);
}

//����벼
//�ѼơGsrc : Ĳ�o��k�����ﹳ
//surObj : �벼�ﹳ
function SUR_senddata(src, subObj) {
    var msgElmId = "SUR_post_msg_" + subObj.SubjectId;
    var s = "<span id='" + msgElmId + "'>���b����,�еy��...</span>";
    var url = "/ajax.ashx?action=Survey&t=" + Math.random();
    var checkedVla = getCheckedVal("SUR_itemTab_" + subObj.SubjectId);
    if (checkedVla == null || checkedVla.length == 0) {
        $a("�z�ܤֻݭn�襤�@�ӧ벼���C");
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
            $confirm("�벼���\�A�P�±z���ѻP�C", { title: "�T�w", toDo: function() { hideConfirm(); } }, { title: "�d�ݵ��G", toDo: function() { window.open("/tools/survey.aspx?oid=" + subObj.SubjectId); hideConfirm(); } });
        } else {
            $a(sMsg);
        }
        $j(msgElmId).remove();
        $(src).show();
    });
}
//��X�d�����
//surObj : �ﹳID
function LEW_ShowTable() {
    var sHtml = "<div class=\"reports\" id=\"LEAVEWORD_cntr\" style=\"margin:0 auto 10px auto;\">"
            + "<h1>�d��</h1>"
            + "<table id=\"LEAVEWORD_tab\">"
            + "<tr>"
            + "<th>* ���D�G</th>"
            + "<td><input type=\"text\" size=\"40\" id=\"LEAVEWORD_txtTitle\" /></td>"
            + "</tr>"
            + "<tr>"
            + "<th>* �pô�H�G</th>"
            + "<td><input type=\"text\" size=\"10\" id=\"LEAVEWORD_txtContact\" /></td>"
            + "</tr>"
            + "<tr>"
            + "<th>�pô�q�ܡG</th>"
            + "<td><input type=\"text\" size=\"30\" id=\"LEAVEWORD_txtTel\" /></td>"
            + "</tr>"
            + "<tr>"
            + "<th>������X�G</th>"
            + "<td><input type=\"text\" size=\"30\" id=\"LEAVEWORD_txtMobile\" /></td>"
            + "</tr>"
            + "<tr>"
            + "<th>* �q�l�l�c�a�}�G</th>"
            + "<td><input type=\"text\" size=\"30\" id=\"LEAVEWORD_txtEmail\" /></td>"
            + "</tr>"
            + "<tr>"
            + "<th>* �d�������G</th>"
            + "<td id=\"LEAVEWORD_tdCats\"></td>"
            + "</tr>"
            + "<tr>"
            + "<th>�d�����e�G</th>"
            + "<td><textarea style=\"width:230px;height:80px;\" id=\"LEAVEWORD_txtShortDesc\"></textarea></td>"
            + "</tr>"
            + "<tr>"
            + "<th>&nbsp;</th>"
            + "<td>"
            + "<input type=\"button\"  value=\"����\" class=\"b15\" onclick=\"sendLeaveword(this)\" /> "
            + "</td>"
            + "</tr>"
            + "</table>"
            + "</div>";
    document.write(sHtml);
    fillLeavewordCategories();
    //    //��X���e
    //    switch (surObj.ShowMode) {
    //        case 1:
    //            sHtml = "<div class=\"survey_1\" style=\"width:" + surObj.Width + "px;\">"
    //                + "<div class=\"sur_tit\" style=\"width:" + (surObj.Width - 2) + "px;\">" + surObj.Title + "</div>"
    //                + "<table class=\"sur_tab\" id=\"SUR_itemTab_" + surObj.SubjectId + "\">";
    //                + LEW_GetFields(surObj.Fields)
    //                + "</table>"
    //                + "<div class=\"bot_btn2\">"
    //                + "<input type=\"button\"  value=\"����\" class=\"b18 fr\" onclick=\"$('#LEAVEWORD_cntr>h1>a').click()\" /> "
    //                + "<input type=\"button\" value=\"����\" class=\"b15\" onclick=\"sendLeaveword(this," + surObj.ObjectName + ")\" />"
    //                + "<input type=\"button\" onclick=\"window.open('/tools/survey.aspx?oid=" + surObj.SubjectId + "')\" value=\"�d��\" class=\"b16\" />"
    //                + "</div>"
    //                + "</div>";
    //            break;
    //    } // end switch
}
////����d��HTML
//function LEW_GetFields(fieldStr) {
//    var template = "<tr>"
//                + "<td>{$item_name$}�G</td>"
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
//        if (itemName != "�d�����e" && itemName != "�d������") {
//            rtnVal += "<tr>"
//                + "<td>" + itemReName + "�G</td>"
//                + "<td><input size=\"30\" type=\"text\" id=\"" + LEW_GetFieldId(itemName) + "\" /></td>"
//                + "</tr>";
//        } else if (itemName == "�d�����e") {
//            rtnVal += "<tr>"
//                + "<td>" + itemReName + "�G</td>"
//                + "<td><textarea style=\"width:230px;height:80px;\" id=\"" + LEW_GetFieldId(itemName) + "\"></textarea></td>"
//                + "</tr>";
//        } else if (itemName == "�d������") {
//            rtnVal += "<tr>"
//                + "<td>" + itemReName + "�G</td>"
//                + "<td id=\"LEAVEWORD_tdCats\"></td>"
//                + "</tr>";
//        } // end if
//    } // end for
//}
////�ھگd���r�q�W���������ID
//function LEW_GetFieldId(itemName) {
//    var rtnVal = "";
//    var prefix = "LEAVEWORD_";
//    switch (itemName) {
//        case "���D": rtnVal = prefix + "txtTitle"; break;
//        case "�pô�H": rtnVal = prefix + "txtContact"; break;
//        case "�pô�q��": rtnVal = prefix + "txtTel"; break;
//        case "������X": rtnVal = prefix + "txtMobile"; break;
//        case "�q�l�l�c�a�}": rtnVal = prefix + "txtEmail"; break;
//        case "�d������": rtnVal = prefix + "ddlCats"; break;
//        case "�d�����e": rtnVal = prefix + "txtShortDesc"; break;
//    }
//    return rtnVal;
//}
//��X�d�����
//surObj : �ﹳID
function PAY_ShowTable() {
    var sHtml = "<div class=\"reports\" id=\"DIR_PAY_cntr\" style=\"margin:0 auto 10px auto;\">"
        + "<h1>�I��</h1>"
        + "<table id=\"DIR_PAY_tab\" style=\"background:url(" + SKIN_PATH + "img/Pay_ico.gif) no-repeat right top;width:400px;\">"
        + "<tr>"
        + "<tr>"
        + "<th>* �I�ڤ覡�G</th>"
        + "<td><select id=\"DIR_PAY_ddlPayment\"><option value=\"\">�п��</option>"
        + "<option value=\"alipay\">��I�_</option>"
        + "<option value=\"99bill\">�ֿ�</option>"
        + "</select>"
        + "</td>"
        + "</tr>"
        + "<th>* �I�ڤH�G</th>"
        + "<td><input type=\"text\" size=\"20\" id=\"DIR_PAY_txtPayer\" /></td>"
        + "</tr>"
        + "<tr>"
        + "<th>* �q�l�l�c�a�}�G</th>"
        + "<td><input type=\"text\" size=\"20\" id=\"DIR_PAY_txtEmail\" /></td>"
        + "</tr>"
        + "<tr>"
        + "<th>�pô�q�ܡG</th>"
        + "<td><input type=\"text\" size=\"20\" id=\"DIR_PAY_txtTel\" /></td>"
        + "</tr>"
        + "<tr>"
        + "<th>������X�G</th>"
        + "<td><input type=\"text\" size=\"20\" id=\"DIR_PAY_txtMobile\" /></td>"
        + "</tr>"
        + "<tr>"
        + "<th>�ڤ��q�~�ȭ��m�W�G</th>"
        + "<td><input type=\"text\" size=\"20\" id=\"DIR_PAY_txtSalesManName\" /></td>"
        + "</tr>"
        + "<tr>"
        + "<th>* �I�ڪ��B�G</th>"
        + "<td><input type=\"text\" size=\"10\" id=\"DIR_PAY_txtMoney\" /></td>"
        + "</tr>"
        + "<tr>"
        + "<th>* �ڶ��γ~�G</th>"
        + "<td><input type=\"text\" size=\"40\" id=\"DIR_PAY_txtUse\" /></td>"
        + "</tr>"
        + "<tr>"
        + "<th>&nbsp;</th>"
        + "<td>"
        + "<input type=\"button\"  value=\"����\" class=\"b15\" onclick=\"directPay(this)\" /> "
        + "</td>"
        + "</tr>"
        + "</table>"
        + "</div>";
    document.write(sHtml);
}

//�Τ�n��
function LoginCheck(_username, _password) {

    var url = window.location;
    if (_username == undefined || _username.length == 0) {
        $a("�п�J�Τ�W", "���~����", "txtUsername");
        return;
    }
    if (_password == undefined || _password.length == 0) {
        $a("�п�J�K�X", "���~����", "txtPassword");
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
