/******************************************************************************
* filename: Common.js
* Include Modul Scripting
* (C) MasterLi(masterlijf#hotmail.com),Oran Day(likecode#qq.com)
* (C) NSW(http://www.nsw88.com)
*******************************************************************************/
/********************
* ���U���߸Բӭ��[���}��
********************/
function helpLoad() {
    hits(OBJ_ID, MARK);
    getHits(OBJ_ID, MARK);
    getHelpStatic(OBJ_ID);
    helpSelectCurrentPosition();
}
/********************
* �ھڷ�e���ID�A�����U���ߥ����ܹ���������
********************/
function helpSelectCurrentPosition() {
    var lis = $(".lnav").find("li");
    for (var i = 0; i < lis.length; ++i) {
        if ($(lis[i]).attr("obj_id") == OBJ_ID) {
            $(lis[i]).addClass("cur");
            break;
        }
    }
}
/********************
* ��T�Բӭ��[���}��
********************/
function newsLoad() {
    hits(OBJ_ID, MARK);
    getHits(OBJ_ID, MARK);
    writeComment(OBJ_ID, MARK);
    getLastArticle();
    getHistory(MARK);
    addHistory(OBJ_ID, MARK);
}
/********************
* �ھڷ�e�ШD������SID�A�ϸ�T���ߥ����ܹ���������
********************/
function newsSelectCurrentPosition() {
    var lis = $(".nr").find("li");
    for (var i = 0; i < lis.length; ++i) {
        if ($(lis[i]).attr("sid") == SID) {
            $(lis[i]).addClass("cur");
            break;
        }
    }
}
/********************
* ��T�Բӭ��[���}��
********************/
function productLoad() {
    productSelectCurrentPosition(SID);
    hits(ProductID, "product");
    writeComment(ProductID, MARK);
    addHistory(ProductID, MARK);
    initImages(ProductID);
    getVideo(VIDEO_KEY);
    getHistory("product");
    getRecommentProductByHistory(ProductID);
    getRelevantViewed(ProductID);
    for (var i = 0; i < ARR_AD_MARK.length; ++i) {
        getAd(ARR_AD_MARK[i], "cntrAd_" + i);
    }
    checkSize(); //�C��A�ؤo���
}


/********************
* ��T�Բӭ��[���}��
********************/
function downLoad() {
    hits(DownloadID, "download");
    writeComment(DownloadID, MARK);
    addHistory(DownloadID, MARK);
    getHistory("download");
    getRelevantViewedDownload(DownloadID);
}

/********************
* ��תA�ȸԲӭ��[���}��
********************/
function projectLoad() {
    productSelectCurrentPosition(SID);
    hits(ProjectID, "project");
    writeComment(ProjectID, MARK);
    addHistory(ProjectID, MARK);
    getVideo(VIDEO_KEY);
    getHistory("project");
    getRecommentProjectByHistory(ProjectID);
    getRelevantViewedProject(ProjectID);
    for (var i = 0; i < ARR_AD_MARK.length; ++i) {
        getAd(ARR_AD_MARK[i], "cntrAd_" + i);
    }
    checkSize(); //�C��A�ؤo���

}



/********************
* ���~�Բӭ��M�\������
********************/
function getTaoCanPrice(_IDList) {
    $.post("/ajax.ashx?action=getTaoCanPrice&t=" + Math.random(), {
        IDList: _IDList
    }, function(msg) {
        var OldPrice = gav(msg, "OldPrice");
        var NowPrice = gav(msg, "NowPrice");
        $j("OldPrice").html(OldPrice);
        $j("NowPrice").html(NowPrice);
    });
}

/********************
* ���~�Բӭ��M�\�����~���
********************/
function ShowTaoCanProduct() {
    $(document).ready(function() {
        $(".cbox").find("input").click(function() {
            var arr = new Array();
            arr = $("#txtIDList").attr("value").split(',');
            var newIDList = arr[0];
            if (!this.checked) {
                $(".tao_rt").find("a[id=" + this.value + "]").hide();
                $(".tao_rt").find("a[id=" + this.value + "]").prev().hide();
                for (var i = 0; i < arr.length; i++) {
                    if (this.value != arr[i] && arr[i] != arr[0] && this.value != arr[i]) {
                        newIDList = newIDList + "," + arr[i];
                    }
                }
            }
            else {
                $(".tao_rt").find("a[id=" + this.value + "]").show();
                $(".tao_rt").find("a[id=" + this.value + "]").prev().show();
                newIDList = $("#txtIDList").attr("value") + "," + this.value;
            }
            $("#txtIDList").val(newIDList);
            $("#TCount").html($("#txtIDList").attr("value").split(',').length);
            getTaoCanPrice(newIDList);
        });
    });
}


function initCommonHeader() {
    $.get("/ajax.ashx?action=initcommonheader&t=" + Math.random(), function(rsp) {
        var username = gav(rsp, "username");
        var usermenu = gav(rsp, "usermenu");
        var myphoto = gav(rsp, "myphoto");
        if (username.length > 0) {
            $j("commonHeaderGuest").hide();
            $j("commonHeaderUsername").html(username);
            $j("commonHeaderUsermenu").html(usermenu);
            $j("commonHeaderUserPhoto").attr("src", myphoto);
            $j("commonHeaderUser").fadeIn(80);
        }
    });
}

/********************
* ���~�Բӭ���ܲ��~���C��A�ؤo��
********************/
function checkSize() {
    $(document).ready(function() {
        $(".pro_kuang").find("li").click(function() {
            $(this).parent().find("a").removeClass();
            $(this).find("a").addClass("img");

        });
    });
}


/********************
* ���~�Բӭ���ܲ��~���C��A�ؤo��(�@�槨)
********************/
function checkWishSize(src) {
    $(src).parent().find("a").removeClass();
    $(src).addClass("clicked");
    if ($("#txtAttr").html() == "") {
        $("#txtAttr").append($(src).attr("title"));
    }
    else {
        var arr = new Array();
        arr = $("#txtAttr").html().split(',');
        for (var i = 0; i < arr.length; i++) {
            var oldkey = arr[i].split(":")[0];
            var newkey = $(src).attr("title").split(':')[0];
            var newvalue = $(src).attr("title").split(':')[1];
            var newarr = oldkey + ":" + newvalue;
            if (oldkey == newkey) {
                $("#txtAttr").html($("#txtAttr").html().replace(arr[i], newarr));
                return;
            }
        }
        $("#txtAttr").append("," + $(src).attr("title"));
    }
}

/********************
* ���~�Բӭ���ܲ��~���ݩʮɡA��ܬ������Ϥ�
********************/
function getAttrValesPhotos(_oid) {
  //  alert(_oid);
    $.post("/ajax.ashx?action=attrValuesPhotos&t=" + Math.random(), {
        oid: _oid
    }, function(msg) {
        //alert(msg);
       // var sta = gav(msg, "state");
       // var s = gav(msg, "msg");
       $j("img_list").html(msg);
    });
}



/********************
* ���~�Բӭ������y�������~�z�A�y�����ʶR���~�z�A�y�����s�����z�ﶵ�d
* src : Ĳ�o�ƥ󪺷�
********************/
function switchProdTab(src) {
    var jSrc = $(src);
    var targetId = jSrc.attr("target_id");
    var selectedElm = jSrc.parent().find("a[class=cr]");
    if (selectedElm.attr("target_id") == targetId) {
        return;
    }

    selectedElm.removeClass("cr");
    jSrc.addClass("cr");
    $j("cntrRelevantProd>div").hide();
    $j(targetId).show();
}
/********************************************* �N�z�[��:start *********************************/
/********************
* �N�z�[���Բӭ��[���}��
********************/
function agentLoad() {
    hits(OBJ_ID, MARK);
    getHits(OBJ_ID, MARK);
    getAgentHelpStatic(OBJ_ID);
    getAd(MARK, "cntrAd");
}
/********************************************* �N�z�[��:end *********************************/
/********************
* �O�s�Τ�W
********************/
function keepUsername(keep, emailElmId) {
    var sName = $j(emailElmId).attr("value");
    if (keep != null && sName != undefined) {
        if (keep){ $cookie("__oran__k_username", sName, 99999999999)}
        else {$cookie("__oran__k_username", false)};
        return;
    }
    if (!$j("chkKeep").attr("checked")){return};
    if (sName != undefined){$cookie("__oran__k_username", sName, 99999999999)};
}
/********************
* �ھ�ID����奻�ؤ��e�åh������Ů�
* src : Ĳ�o�ƥ󪺷��ﹳ
********************/
function toggleJobDetail(src, _skinPath) {
    var detail = $(src).parent().next();
    var jH = $(src).parent();
    if (detail.is(":visible")) {
        detail.slideUp(80);
        jH.css({ "background": "url(" + _skinPath + "img/ico14.gif) no-repeat 0 5px" });
    } else {
        detail.slideDown(80);
        jH.css({ "background": "url(" + _skinPath + "img/ico13.gif) no-repeat 0 5px" });
    }
}
/********************
* ��ܩҦ����~����
* showBg : (�i��)�O�_��ܦǫ׭I���A�q�{���
********************/
function showAllColumns(showBg) {
    if (showBg == null){
        showBg = true;
    }
    if (showBg){
        showFullBg();
    }
    setCM("prod_all_columns");
    relocation("prod_all_columns");
}
/********************
* ���éҦ����~����
* showBg : (�i��)�O�_���æǫ׭I���A�q�{����
********************/
function hideAllColumns(showBg) {
    if (showBg == null){
        showBg = true;
    }
    if (showBg){
        hideFullBg();
    }
    $j("prod_all_columns").fadeOut(80);
}
/********************
* ��ܥ��b�B�z���ʵe�A�I����
* show : (�i��)��ܩ����áA�q�{���
********************/
function showBgProc(show, msg) {
    if (msg == null) {
        msg = "���b�B�z...";
    }
    var sElmId = "oran_div_processing";
    var oImg = $j(sElmId);
    if (oImg.length == 0) {
        $(document.body).append("<div id='" + sElmId + "'><p><img src='" + SKIN_PATH + "img/processing_2.gif' id='imgProc' alt='" + msg + "' /></p>"
        + "<p class='mt10'>" + msg + "</p></div>");
    }
    oImg = $j(sElmId);
    if (show == null) {
        show = true;
    }
    if (show) {
        showFullBg("oran_full_bg_2");
        setCM(sElmId);
        relocation(sElmId);
        oImg.fadeIn(80);
    } else {
        oImg.fadeOut(80);
        hideFullBg("oran_full_bg_2");
    }
}
/********************
* �ھ�key��� ajax�ﹳ�`�I��getAjaxVal
* xMsg : xml�ﹳ
* key : �`�I���ݩ�key
********************/
function gav(xMsg, key) {
    var jMsg = $(xMsg);
    var s = $(jMsg.find("node[key=" + key + "]")).text();
    return s;
}
/********************
* �]�m��H���˦��WSetClass
* jObj : jQuery�ﹳ
* className : �˦����W
********************/
function sc(jObj, className) {
    jObj.attr("class", className);
}
function ddlSecQus_Changed(src, elmId) {
    if (elmId == null){
        elmId = "txtSecQus";
    }
    var jTxt = $j(elmId);
    if (src.value == "") {
        jTxt.show();
        jTxt.attr("value", "").focus();
    } else {
        jTxt.hide();
    }
    jTxt.attr("value", src.value);
}
/********************
* �u�X�ڪ����f�a�}�h
* showBg : (�i��)�O�_��ܦǫ׭I���A�q�{���
********************/
function showMyAddress(showBg) {
    if (showBg == null){
        showBg = true;
    }
    if (showBg){
        showFullBg("oran_full_bg", false);
    }
    var jFrm = $("#divCartMyAddr > iframe");
    jFrm.attr("src", "http://www.kstyjz.com/templets/qiye/JS/layer/MyAddress.aspx");
    setCM("divCartMyAddr");
    //relocation("divCartMyAddr");
}
/********************
* ���çڪ����f�a�}�h
********************/
function hideMyAddress() {
    top.window.hideFullBg("oran_full_bg");
    $(top.window.document).find("#divCartMyAddr").fadeOut(80);
}
/********************
* �]�m�ڪ����f�a�}�h
* src : Ĳ�o�ƥ󪺷��ﹳ
********************/
function setMyAddr(src) {
    var jCntr = $(src).parent().parent().parent();
    var chnName = jCntr.find("span[name=chnName]").html();
    var province = jCntr.find("span[name=province]").html();
    var city = jCntr.find("span[name=city]").html();
    var address = jCntr.find("span[name=address]").html();
    var zipCode = jCntr.find("span[name=zipCode]").html();
    var tel = jCntr.find("span[name=tel]").html();
    var mobile = jCntr.find("span[name=mobile]").html();
    var email = jCntr.find("span[name=email]").html();
    var jTopDoc = $(top.window.document);
    jTopDoc.find("#txtAddrName").val(chnName);
    jTopDoc.find("#txtInvoiceTitle").val(chnName);
    jTopDoc.find("#txtEmail").val(email);
    jTopDoc.find("#txtAddrAddr").val(address);
    jTopDoc.find("#txtAddrZip").val(zipCode);
    jTopDoc.find("#txtAddrTel").val(tel);
    jTopDoc.find("#txtAddrMobile").val(mobile);

    $(top.window.document).find("#regionAddr_hdnPrtRegion").val(province);
    $(top.window.document).find("#regionAddr_hdnChdRegion").val(city);
    top.window.regionAddr_initSelectedItems();

    hideMyAddress();
}
function checkPinForm() {
    var newPin = $j("txtNewPin").val();
    var newSecAsr = $j("txtSecAsr").val();
    var newEmail = $j("txtNewEmail").val();
    if (newPin.length == 0 && newSecAsr == 0 && newEmail.length == 0) {
        $a("��������קﶵ", 2);
        return false;
    } else {
        return true;
    }
}
/********************
* �����q��ﶵ�d
********************/
function switchOrderTab(src) {
    var jUl = $j("ulOrderTypeTabs");
    jUl.find("a").removeClass("cur b cblack f14");
    $(src).addClass("cur b cblack f14").blur();

}
/********************
* �j���q��
********************/
function searchOrder() {
    var orderNo = $tv("txOrderNo");
    var startDate = $tv("txtStartDate");
    var endDate = $tv("txtEndDate");
    var orderState = $tv("ddlOrderStates");
    var orderType = $("#ulOrderTypeTabs").find(".cur").attr("ordertype");
    if (orderNo.length == 0 && startDate.length == 0 && endDate.length == 0 && orderState.length == 0) {
        $a("�ܤֻݭn�@�Ӭd�߱���C");
        return;
    }
    var flag = false;
    var url = "orderlist.aspx?";
    if (orderNo.length > 0) {
        url += "no=" + orderNo;
        flag = true;
    }
    if (startDate.length > 0) {
        if (flag) {
            url += "&";
        }
        url += "start=" + startDate;
        flag = true;
    }
    if (endDate.length > 0) {
        if (flag) {
            url += "&";
        }
        url += "end=" + endDate;
        flag = true;
    }
    if (orderState.length > 0) {
        if (flag) {
            url += "&";
        }
        url += "state=" + orderState;
        flag = true;
    }
    if (orderType != undefined && orderType.length > 0) {
        if (flag) {
            url += "&";
        }
        url += "type=" + orderType;
        flag = true;
    }
    location.href = url;
}
function searchFav() {
    var kwd = $tv("txtFavKwd");
    var clnId = $tv("ddlFavClns");
    var flag = false;
    var url = "MyFavorites.aspx?";
    if (kwd.length > 0) {
        url += "kwd=" + encodeURI(kwd);
        flag = true;
    }
    if (clnId.length > 0) {
        if (flag) {
            url += "&";
        }
        url += "oid=" + clnId;
        flag = true;
    }
    location.href = url;
}
function customizePriceRange(src) {
    var jLower = $(src).parent().find("input:eq(0)");
    var jUpper = $(src).parent().find("input:eq(1)");
    var lower = parseInt(jLower.val());
    var upper = parseInt(jUpper.val());
    var url = "/product/list.aspx?";
    if (!lower) {
        lower = 0;
    }
    if (!upper) {
        upper = 0;
    }
    if (lower == 0 && upper == 0) {
        $a("�ܤֻݭn�@�ӻ���d��C");
        jLower.focus();
        return;
    }
    if (lower > 0 && upper > 0) {
        url += "PriceLower=" + lower + "&PriceUpper=" + upper;
    } else if (lower > 0) {
        url += "PriceUpper=" + lower;
    } else if (upper > 0) {
        url += "PriceLower=" + upper;
    }
    location.href = url;
}
function copyUrl(_mark) {
    var jLayer = $j("div_nsw_copy_url");
    var s = location.href;

    if (jLayer.length == 0) {
        var sHtml = "<div id='div_nsw_copy_url'>"
                + "<h1><a href='javascript:void(0)' onclick=\"$(this).parent().parent().fadeOut(80);hideFullBg('div_nsw_copy_url_bg')\"><img src='" + SKIN_PATH + "img/ico9_close.gif' /></a>�����챵�a�}</h1>"
                + "<div class='cont'>"
                + "<div>������URL�q�z���իȩΪ̺����챵�쥻" + (_mark == "product" ? "���~" : "�峹") + "</div>"
                + "<textarea>" + s + "</textarea>"
                + "<div><input type='button' value='�����a�}' onclick='copyArticleUrl()' class='b13' /></div>"
                + "</div>"
                + "</div>";
        $(document.body).append(sHtml);
    }
    setCM("div_nsw_copy_url");
    relocation("div_nsw_copy_url");
    showFullBg("div_nsw_copy_url_bg");
}
function copyArticleUrl() {
    var s = $("#div_nsw_copy_url .cont textarea").val();
    window.clipboardData.setData("Text", s);
    $a("�������a�}�w�ƻs���ߩ��O�C", 1);
}

 																
																	
function initImages(oid) { 
    var fmt = "<li {$co$}><a   href={$path$} target=\"_blank\"><img longdesc={$path$} src={$path$}  width=\"60\" height=\"60\"></a></li>";
    var oHtml = "";
    for (var i = 0; i < ARR_IMG_PATH.length; ++i) {
    if(i==0)
    {
        oHtml = fmt.replace(/\{\$co\$\}/ig, "class=now").replace(/\{\$path\$\}/ig, ARR_IMG_PATH[i]);
         
    }
    else
    {
        oHtml += fmt.replace(/\{\$path\$\}/ig, ARR_IMG_PATH[i]);
        }
    }
    $("#img_list").html(oHtml);
}

																	
				
//function initImages(oid) {
//    var fmt = "<a href=\"{$path$}\" rel=\"zoom1\" rev=\"{$path$}\" title=\"\">"
//        + "<img src=\"http://www.kstyjz.com/tools/photo.aspx?p={$path$}&t=0&w=60&h=60\"  class=\"blackborder\" rel=\"zoom1\"  rel=\"thumb-change: mouseover\" rev=\"http://www.kstyjz.com/tools/photo.aspx?p={$path$}&t=0&w=60&h=60\" /></a>";
//    var oHtml = "";
//    for (var i = 0; i < ARR_IMG_PATH.length; ++i) {
//        oHtml += fmt.replace(/\{\$path\$\}/ig, ARR_IMG_PATH[i]);
//    }
//    $("#img_list").html(oHtml);
//}
function setSelectedImg(src) {
    $(src).parent().find("a").removeClass("cur");
    $(src).addClass("cur");
}
function viewBigImage(oid) {
    var curPath = window.location.host;
    var url = "/product/gallery.aspx?oid=" + oid;
    if (curPath != "undefined") {
        url += "&selectedpath=http://" + curPath;
    }
    window.open(url);
}
function switchImage(src) {
    var jImgA = $(".MagicZoom");
    var jMainImg = jImgA.find("img:eq(0)");
    var jMainImg2 = $(".MagicZoomBigImageCont img");
    var targetPath = $(src).find("img").attr("srcimg");
    jImgA.attr("href", targetPath);
    jMainImg.attr("src", targetPath);

    jMainImg2.attr("src", targetPath);
    // alert(targetPath);


    //    $("#ulImgs>li>a").removeClass("cur");
    //    $(src).addClass("cur").blur();
    $j("btnShowOrgiImg").click(function() {
        window.open(targetPath, "orgiImg");
    });
}
function initViewPhoto() {
    $j("imgBig").attr("src", $("#ulPhotos>li>a>img").attr("src"));
    $("#ulPhotos>li>a:eq(0)").addClass("cur");
    resetNextPrevious($("#ulPhotos>li>a:eq(0)").get());
}
function viewPhoto(src) {
    $j("imgBig").attr("src", $(src).find("img").attr("src"));
    $("#ulPhotos>li>a").removeClass("cur");
    $(src).addClass("cur").blur();
    resetNextPrevious(src);
}
function resetNextPrevious(curObj) {
    var jPre = $(curObj).parent().prev();
    if (jPre.length == 0) {
        jPre = $("#ulPhotos>li:last");
    }
    var jNext = $(curObj).parent().next();
    if (jNext.length == 0) {
        jNext = $("#ulPhotos>li:first");
    }

    $j("btnPrev").removeAttr("onclick").click(function() {
        viewPhoto(jPre.find("a").get());
    });
    $j("btnNext").removeAttr("onclick").click(function() {
        viewPhoto(jNext.find("a").get());
    });
}
function mailArticle(objType, oid) {
    var jCntr = $j("mailArticle");
    if (jCntr.length == 0) {
        var sHtml = "<div id='mailArticle'><iframe src='/private/SendNewsToYourFriends.aspx?oid=" + oid + "' frameborder='0'></iframe></div>";
        $(document.body).append(sHtml);
    }
    setCM('mailArticle');
    showFullBg("mailArticle_bg", null, null, null, null, null, function() { $("#mailArticle iframe").css("visibility", "visible"); });
    relocation("mailArticle");
}
function mailProduct(objType, oid) {
    $j("mailArticle").html("<iframe src='/private/SendProductToYourFriends.aspx?oid=" + oid + "' frameborder='0'></iframe>");
    setCM('mailArticle');
    showFullBg("mailArticle_bg", null, null, null, null, null, function() { $("#mailArticle iframe").css("visibility", "visible"); });
    relocation("mailArticle");
}

function mailDownload(objType, oid) {
    $j("mailArticle").html("<iframe src='/private/SendDownloadToYourFriends.aspx?oid=" + oid + "' frameborder='0'></iframe>");
    setCM('mailArticle');
    showFullBg("mailArticle_bg", null, null, null, null, null, function() { $("#mailArticle iframe").css("visibility", "visible"); });
    relocation("mailArticle");
}

function hideMailAtricle() {
    $(top.document.getElementById("mailArticle")).fadeOut(80);
    $(top.document.getElementById("mailArticle_bg")).fadeOut(80);
    top.showDdl();
}
function contractExtend(src, skinPath) {
    var jSrc = $(src);
    var jDiv = jSrc.parent().next();
    var alt;
    var icon;
    if (jSrc.attr("alt") == "���Y") {
        alt = "�i�}";
        icon = "ico15_.gif"/*tpa=http://www.kstyjz.com/templets/qiye/JS/img/ico15_.gif*/;
        jDiv.slideUp(80);
    } else {
        alt = "���Y";
        icon = "ico15-1.gif"/*tpa=http://www.kstyjz.com/templets/qiye/JS/img/ico15.gif*/;
        jDiv.slideDown(80);
    }
    jSrc.attr({ src: skinPath + icon, alt: alt });
}
function showLayer(elmId, bgElmId, behavior) {
    setCM(elmId);
    relocation(elmId);
    showFullBg(bgElmId, null, null, null, null, null, behavior);
}
function hideLayer(elmId, bgElmId) {
    $j(elmId).fadeOut(80);
    hideFullBg(bgElmId);
}
//function showAdvanNewsSearch() {
//    $j("div_nsw_news_advan_cntr").find("iframe").attr("src", "http://www.kstyjz.com/news/AdvanSearch.aspx");
//    showLayer('div_nsw_news_advan_cntr', 'div_nsw_news_advan_bg', function() { $j("div_nsw_news_advan_cntr").find("iframe").css("visibility", "visible"); });
//}
function hideAdvanNewsSearch() {
    $(top.document).find("#div_nsw_news_advan_cntr").fadeOut(80);
    $(top.document).find("#div_nsw_news_advan_bg").fadeOut(80);
    top.showDdl();
}
function advanNewsSearch() {
    var url = "http://www.kstyjz.com/search/news.aspx?type=";
    url += $g("rdoFuzzy").checked ? "1" : "2";
    top.location.href = SearchObjectByGet("ddlFields,tg|ddlNewsColumns2,sid|txtKwd,kwd|txtStartDate,start|txtEndDate,end", url, true);
}
function contractExtendProdColumn(src, _skin) {
    var jSrc = $(src);
    var jDiv = jSrc.parent().parent().next();
    var alt;
    var icon;
    if (jSrc.attr("alt") == "���Y") {
        alt = "�i�}";
        icon = "ico14.gif"/*tpa=http://www.kstyjz.com/templets/qiye/JS/img/ico14.gif*/;
        jDiv.slideUp(80);
    } else {
        alt = "���Y";
        icon = "ico13-1.gif"/*tpa=http://www.kstyjz.com/templets/qiye/JS/img/ico13.gif*/;
        jDiv.slideDown(80);
    }
    jSrc.attr({ src: _skin + icon, alt: alt });
}
function resetOrderList(urlPara) {
    var pos = urlPara.lastIndexOf('/');
    urlPara = urlPara.substring(pos + 1);
    var opts = $j("ddlOrderBy").find("option");
    opts.each(function(i) {
        if ($(opts[i]).attr("value") == urlPara) {
            $(opts[i]).attr("selected", "selected");
        }
    });
}
function initNextPre() {
    var jA = $j("pagerMain").find("a[class=oran_pg_pp]");
    if (jA.length == 0) {
        $j("btnPrePage").click(function() { $a("�o�w�O�Ĥ@���C"); });

    } else {
        var sHref = jA.attr("href");
        $j("btnPrePage").click(function() {
            location.href = sHref;
        });
    }
    var jA_2 = $j("pagerMain").find("a[class=oran_pg_np]");
    if (jA_2.length == 0) {
        $j("btnNextPage").click(function() { $a("�o�w�O�̫�@���C"); });

    } else {
        var sHref_2 = jA_2.attr("href");
        $j("btnNextPage").click(function() {
            location.href = sHref_2;
        });
    }
}
function increaseScroll(elmId) {
    var i = 1;
    var intVal1 = setInterval(function() { if (i > 320) window.clearInterval(intVal1); $g("img_list").scrollLeft += 14; i += 14; }, 1);
}
function decreaseScroll(elmId) {
    var i = 1;
    var intVal1 = setInterval(function() { if (i > 320) window.clearInterval(intVal1); $g("img_list").scrollLeft -= 14; i += 14; }, 1);
}
function payadScroll(hiddenId, shownId, maxId) {
    var jShown = $j("payad_" + shownId);
    var jHdden = $j("payad_" + hiddenId);
    if (jShown.length == 0) {
        jShown = $j("payad_" + maxId);
    }
    jHdden.fadeOut("80", function() {
        jShown.show();
    });
}
//��ܳ��i��ܮ�
function showReport(src) {
    var jCnrt = $j("RPT_cntr");
    if (jCnrt.length == 0) {
        var sHtml = "<div class=\"reports\" id=\"RPT_cntr\">"
                + "<h1><a href=\"javascript:void(0)\" onclick=\"$closeLayer('RPT_cntr','RPT____BG')\" class=\"close2\"><img src=\"" + SKIN_PATH + "img/close2.gif\" alt=\"����\" title=\"����\" /></a>���i/�ȿ�/�|��</h1>"
                + "<table id=\"RPT_tab\">"
                + "<tr>"
                + "<th>�Q���i�������D�G</th>"
                + "<td><input type=\"text\" size=\"40\" disabled=\"disabled\" value=\"" + document.title + "\" /></td>"
                + "</tr>"
                + "<tr>"
                + "<th>�Q���i���}�G</th>"
                + "<td><input type=\"text\" size=\"40\" disabled=\"disabled\" value=\"" + document.URL + "\" /></td>"
                + "</tr>"
                + "<tr>"
                + "<th>* ���i�����G</th>"
                + "<td id=\"RPT_tdCats\"></td>"
                + "</tr>"
                + "<tr>"
                + "<th>�pô�H�G</th>"
                + "<td><input type=\"text\" size=\"10\" id=\"RPT_txtContact\" /></td>"
                + "</tr>"
                + "<tr>"
                + "<th>�q�l�l�c�a�}�G</th>"
                + "<td><input type=\"text\" size=\"30\" id=\"RPT_txtEmail\" /></td>"
                + "</tr>"
                + "<tr>"
                + "<th>���i���e²�n�y�z�G</th>"
                + "<td><textarea style=\"width:230px;height:80px;\" id=\"RPT_txtShortDesc\"></textarea></td>"
                + "</tr>"
                + "<tr>"
                + "<th>&nbsp;</th>"
                + "<td>"
                + "<input type=\"button\"  value=\"����\" class=\"b18 fr\" onclick=\"$('#RPT_cntr>h1>a').click()\" /> "
                + "<input type=\"button\"  value=\"����\" class=\"b15\" onclick=\"sendReprots(this)\" /> "
                + "</td>"
                + "</tr>"
                + "</table>"
                + "</div>";
        $(document.body).append(sHtml);
        fillReportCategories();
    } //end if
    jCnrt.show();
    showFullBg("RPT____BG", null, null, null, null, null, function() { $j("RPT_cats").css("visibility", "visible"); });
    setCM("RPT_cntr");
    relocation("RPT_cntr");
}
//��ܯd����ܮ�
function showLeaveword(src) {
    var jCnrt = $j("LEAVEWORD_cntr");
    if (jCnrt.length == 0) {
        var sHtml = "<div class=\"reports\" id=\"LEAVEWORD_cntr\">"
                + "<h1><a href=\"javascript:void(0)\" onclick=\"$closeLayer('LEAVEWORD_cntr','LEAVEWORD____BG')\" class=\"close2\"><img src=\"" + SKIN_PATH + "img/close2.gif\" alt=\"����\" title=\"����\" /></a>�d��</h1>"
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
                + "<input type=\"button\"  value=\"����\" class=\"b18 fr\" onclick=\"$('#LEAVEWORD_cntr>h1>a').click()\" /> "
                + "<input type=\"button\"  value=\"����\" class=\"b15\" onclick=\"sendLeaveword(this)\" /> "

                + "</td>"
                + "</tr>"
                + "</table>"
                + "</div>";
        $(document.body).append(sHtml);
        fillLeavewordCategories();
    } //end if
    jCnrt.show();
    showFullBg("LEAVEWORD____BG", null, null, null, null, null, function() { $j("LEAVEWORD_cats").css("visibility", "visible"); });
    setCM("LEAVEWORD_cntr");
    relocation("LEAVEWORD_cntr");
}
//��ܪ����I�ڹ�ܮ�
function showDirectPay(src) {
    var jCnrt = $j("DIR_PAY_cntr");
    if (jCnrt.length == 0) {
        var sHtml = "<div class=\"reports\" id=\"DIR_PAY_cntr\">"
                + "<h1><a href=\"javascript:void(0)\" onclick=\"$closeLayer('DIR_PAY_cntr','DIR_PAY____BG')\" class=\"close2\"><img src=\"" + SKIN_PATH + "img/close2.gif\" alt=\"����\" title=\"����\" /></a>�I��</h1>"
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
                + "<input type=\"button\"  value=\"����\" class=\"b18 fr\" onclick=\"$('#DIR_PAY_cntr>h1>a').click()\" /> "
                + "<input type=\"button\"  value=\"����\" class=\"b15\" onclick=\"directPay(this)\" /> "
                + "</td>"
                + "</tr>"
                + "</table>"
                + "</div>";
        $(document.body).append(sHtml);
    } //end if
    jCnrt.show();
    showFullBg("DIR_PAY____BG", null, null, null, null, null, function() { $j("DIR_PAY_ddlPayment").css("visibility", "visible"); });
    setCM("DIR_PAY_cntr");
    relocation("DIR_PAY_cntr");
}
//�u�X���ù�ܮ�
function showFav(src, title, url) {
/*�����������x�ק�᪺����*/
    if (url == null) {
        url = location.pathname;
    }
    var cntrId = "div_fav_cntr";
    var newFrameSrc = "/private/favorite.aspx?url=" + url + "&title=" + title;
    newFrameSrc = newFrameSrc.toLowerCase();
    var jCntr = $j(cntrId);
    if (jCntr.length != 0) {
        jCntr.remove();
    }
    var sHtml = "<div style=\"z-index:99;position:absolute;\" id=\"" + cntrId + "\"><iframe src=\"" + newFrameSrc + "\" frameborder='0'></iframe></div>";
    $(document.body).append(sHtml);
    jCntr = $j(cntrId);
    var offset = getObjectOffset(src);
    jCntr.css({ top: offset.bottom - 130, left: offset.right - 200 });
/*���������p������*/
//    $.post("/ajax.ashx?action=fav&t=" + Math.random(), {
//    }, function(msg) {
//        var sta = gav(msg, "state");
//        var sMsg = gav(msg, "msg");
//        if (sta == "1") {
//            var cntrId = "div_fav_cntr";
//            var newFrameSrc = "/private/favorite.aspx?url=" + url + "&title=" + title;
//            newFrameSrc = newFrameSrc.toLowerCase();
//            var jCntr = $j(cntrId);
//            if (jCntr.length != 0) {
//                jCntr.remove();
//            }
//            var sHtml = "<div style=\"z-index:99;position:absolute;\" id=\"" + cntrId + "\"><iframe src=\"" + newFrameSrc + "\" frameborder='0'></iframe></div>";
//            $(document.body).append(sHtml);
//            jCntr = $j(cntrId);
//            var offset = getObjectOffset(src);
//            jCntr.css({ top: offset.bottom - 122, left: offset.right - 252 });
//        } else {
//            top.$a(sMsg, "2");
//        }
//    });
    
}
//�btop�ﹳ�������h
function closeTopLayer(layerId) {
    var j = $(top.document).find("#" + layerId);
    j.fadeOut();
    top.hideFullBg();
}
function getObjectOffset(src) {
    var jSrc = $(src);
    var offset = jSrc.offset();
    var obj = { top: offset.top, left: offset.left, bottom: offset.top + jSrc.height(), right: offset.left + jSrc.width() };
    return obj;
}
/********************
* �ھڷ�e���ID�A�ϲ��~���ߥ����ܹ���������
********************/
function productSelectCurrentPosition(sid) {
    var lis = $(".nr").find("li");
    for (var i = 0; i < lis.length; ++i) {
        if ($(lis[i]).attr("sid") == sid) {
            $(lis[i]).addClass("cur");
            break;
        }
    }
}

//������U�H��
function ShowHelp(_test) {
    var jLayer = $j("div_nsw_show_help");
    if (jLayer.length == 0) {
        var sHtml = "<div id='div_nsw_show_help'>"
                + "<h1><a href='javascript:void(0)' onclick=\"$(this).parent().parent().fadeOut(80);hideFullBg('div_nsw_show_help_bg')\"><img src='" + SKIN_PATH + "img/ico9_close.gif' /></a>���U����</h1>"
                + "<div class='cont'>"
                + "<textarea>" + _test + "</textarea>"
                + "</div>"
                + "</div>";
        $(document.body).append(sHtml);
    }
    setCM("div_nsw_show_help");
    relocation("div_nsw_show_help");
    showFullBg("div_nsw_show_help_bg");
}

//���~�����ݩʿ�w�ƥ�
function onclPrReAtts(attid, value, atttitle) {
    //var objatt = document.getElementById(attid);
    var kos = false;
    //objatt.innerHTML = value;
    $("#" + attid).html(value);
    if (atts == null || atts == "") {
        atts = atttitle + "," + value;
    }
    else {
        var stra = new Array();
        stra = atts.split("$");
        if (stra.length <= 0) {
            atts = atts + "$" + atttitle + "," + value;
        } else {
            atts = "";
            for (var i = 0; i < stra.length; i++) {
                var val = "";
                var strb = stra[i].split(",");
                if (strb.length == 2) {
                    val = strb[1];
                    if (strb[0] == atttitle) {
                        val = value; kos = true;
                    }
                    if (atts == null || atts == "") {
                        atts = strb[0] + "," + val;
                    } else { atts = atts + "$" + strb[0] + "," + val; }
                }
            }
            if (kos == false) {
                if (atts == null || atts == "") {
                    atts = atttitle + "," + value;
                } else {
                    atts = atts + "$" + atttitle + "," + value;
                }
            }
        }
    }
}
//�������~�Բӭ��ﶵ�d
function switchAttrTab(src) {
    var jSrc = $(src);
    if (jSrc.attr("class") == "cur") {
        return;
    }
    var targetItem = jSrc.attr("item_name");
    $j("div__detail").hide();
    $j("div__attr").hide();
    $j("div__" + targetItem).show();
    $(".prod_tab").find("a").removeClass("cur");
    jSrc.addClass("cur");
}

//�������~�Բӭ��X�i���ҿﶵ�d
function switchExtendAttrTab(src,n) {
    var jSrc = src;
    var temp = src.substring(src.length - 1, src.length);
    for (var i = 0; i < n; i++) {
        var tab = "detailvalue" + i;
        var ttab = "detail"+i;
        if (temp==i)
        {
            $j(tab).show();
            $j(ttab).addClass("cur");
        }
        else
        {
            $j(tab).hide();
            $j(ttab).removeClass();
        }
        
    }
}

//�������~���Ҥ��e����
function switchExtendContentTab(src, n,m) {
    var jSrc = src;
    var temp = src.substring(src.length - 1, src.length);
    for (var i = 0; i < n; i++) {
        var tab = "contentvalue" + m + i;
        var ttab = "content" + m + i;
        if (temp == i) {
            $j(tab).show();
            $j(ttab).addClass("cur");
        }
        else {
            $j(tab).hide();
            $j(ttab).removeClass();
        }

    }
}