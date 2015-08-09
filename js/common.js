var PTN_EMAIL = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
var PTN_FLOAT = /\d+(\.\d+)?/

/********************
* �ھ�ID���jQuery�ﹳ
* elmId : ����ID
********************/
function $j(elmId) { return $("#" + elmId); }

/********************
* ��������襤���A�]�_��ءB���ء^
* elmId : ����ID
********************/
function getChecked(elmId) { return $("#" + elmId).attr("checked"); }

/********************
* �q�e���d����ءA��value�Pval�۵��h�襤��
* val : ��
* cntrId : �e��ID
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
* ���äU�Ԯب��
* ����1 : �p�G���ǻ�cntrId�A�h�Hbody���e��
* cntrId : �e��ID
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
* ���äU�Ԯب��
********************/
function showDdl() {
    var arrTags = ["select", "iframe", "applet", "object"];
    for (var i = 0; i < arrTags.length; ++i) {
        $(arrTags[i]).css("visibility", "visible");
    }
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
function $g(elmId) { return document.getElementById(elmId); }

/********************
* �ھڤ����W����������ﹳ��(document.getElementsByName)
* nm : ����name
********************/
function $name(nm) { return document.getElementsByName(nm); }

/********************
* �ھڤ������ұq���w�e����������ﹳ��(document.getElementsByTagName)
* cntr : �e���A�i�H�O�����ﹳ�B����ID
* tagName : ���ҦW��
********************/
function $tag(cntr, tagName) {
    var o = cntr;
    if (o != Object) o = $g(cntr);
    return o.getElementsByTagName(tagName);
}

/********************
* ����奻�إu���J�Ʀr(�Ʀr��)
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
* �M�Ť奻�ؤ��e
* cntrId : �e��ID�A���ǻ��h�Hbody���e��
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
* ��j�r��
* el : ��j/�Y�p
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

//�����Y��
//�ѼơG�ѰV�Ѽ�
//		�Ѽƭ�
function GoToURL(FieldName, FieldValue) {
    var URL;
    URL = SetURLField(URL, FieldName, FieldValue)
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

//�Τ�n��
function LoginCheck(_username, _password) {
    var url = window.location;
    if (_username == undefined || _username.length == 0) {
        $a("�п�J�Τ�W", "���~����", "txtUserName");
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
