/******************************************************************************
* filename: Common.js
* Ajax Modul Scripting
* (C) MasterLi(masterlijf#hotmail.com),Oran Day(likecode#qq.com)
* (C) NSW(http://www.nsw88.com)
*******************************************************************************/
/********************
* 初始化頭部信息，如購物車產品總數，登錄狀態等
* 回應 : XML對像
********************/



function ShowNewPhotoId(id, _sid) {
    $.post("/ajax.ashx?action=ShowNewPhoto&t=" + Math.random(), {
        id: id,
        sid: _sid
    }, function (msg) {
        var sMsg = gav(msg, "msg");
        var sta = gav(msg, "state");
        if (sta == 1) {
            $j("csscontent").html(sMsg);
        }

    });
}


 var flag=false; 
function DrawImage(ImgD,wcc,hcc,showcc){ 
  var image=new Image(); 
  image.src=ImgD.src; 
  if(image.width>0 && image.height>0){ 
    flag=true; 
    if(image.width/image.height>= wcc/hcc){ 
       if(image.width>wcc){
        ImgD.width=wcc; 
        ImgD.height=(image.height*wcc)/image.width; 
       }else{ 
        ImgD.width=image.width;
        ImgD.height=image.height; 
       } 
  // ImgD.alt=image.width+"x"+image.height; 
   if(showcc==1)
   {
       if(hcc>ImgD.height&&wcc>ImgD.width)
       {
       ImgD.style.padding=(hcc-ImgD.height)/2+"px 0 0 "+(wcc-image.width)/2+"px";
       }
       else if(hcc>ImgD.height)
       {
        ImgD.style.padding=(hcc-ImgD.height)/2+"px 0 0 0";
       }
       else if(wcc>ImgD.width)
       {
       ImgD.style.padding="0 0 0 "+(wcc-ImgD.width)/2+"px";
       }
    
   }
   
  // ImgD.style.padding-top=(185-image.height)/2+"px";
  } 
  else{ 
   if(image.height>hcc){
    ImgD.height=hcc; 
    ImgD.width=(image.width*hcc)/image.height; 
   }else{ 
    ImgD.width=image.width;
    ImgD.height=image.height; 
   } 
   //ImgD.alt=image.width+"x"+image.height; 
    if(showcc==1)
   {
    if(hcc>ImgD.height&&wcc>ImgD.width)
       {
       ImgD.style.padding=(hcc-ImgD.height)/2+"px 0 0 "+(wcc-ImgD.width)/2+"px";
       }
       else if(hcc>ImgD.height)
       {
        ImgD.style.padding=(hcc-ImgD.height)/2+"px 0 0 0";
       }
       else if(wcc>ImgD.width)
       {
       ImgD.style.padding="0 0 0 "+(wcc-ImgD.width)/2+"px";
       }
   }
  } 
 }
}




function initCommonHeader() {
    $.get("/ajax.ashx?action=initcommonheader&t=" + Math.random(), function(rsp) {
       // $j("headerCartCount").html(gav(rsp, "prod_count"));
        var IM = gav(rsp, "showIM");
        showIM(IM);
        var username = gav(rsp, "username");
        if (username.length > 0) {
            $j("commonHeaderGuest").hide();
            $j("commonHeaderUsername").html(username);
            $j("commonHeaderUser").fadeIn(80);
        }
    });
}


//是否顯示在線客服
function showIM(res) {
    if ($("#bodd").html() != "") {
        if (res == "True") {
            $("#bodd").show();
            $("#kefubtn").hide();
            $("#divOranIm").show();
        }
        else {
            $("#bodd").hide();
            $("#kefubtn").show();
            $("#divOranIm").hide();
        }
    }
}


//初始化頭部熱門關鍵詞
function initCommonHeaderKeywords(_s) {
    if (_s == "") _s = "6";
    $.post("/ajax.ashx?action=initcommonheaderkeywords&t=" + Math.random(), {
        s: _s
    }, function(msg) {
        $j("commonHeaderkeywords").html(msg);
    });
}
/********************
* 添加產品到購物車
* src : 觸發事件的源對像
* _pid : 產品ID
* qutiElmId : 數量（重載：number購買數量、string數量的文本框元素ID）
* atts : 附加屬性
* reloadCartPage : (可選)是否詢問重新刷新購物車首頁
* redirectUrl : (可選)當產品添加成功後，跳轉到的頁面（優先權高）
* 回應 : XML對像
********************/
function addToCart(src, _pid, qutiElmId, _atts,_pidlist, reloadCartPage, redirectUrl) {
    showProc(src);
    if (reloadCartPage == null) {
        reloadCartPage = false;
    }
    _atts = $j(_atts).html();
    _pidlist = $j(_pidlist).val();
    var _quti;
    if (qutiElmId == null) {
        _quti = 1;
    } else if (typeof (qutiElmId) == "number") {
        _quti = qutiElmId;
    } else {
        _quti = $tv(qutiElmId);
    }
    if (_atts == null) {
        _atts = "";
    }
    if (_pidlist==null)
    {
        _pidlist = "";
    }
    $.post("/ajax.ashx?action=addtocart&t=" + Math.random(), {
        pid: _pid,
        quti: _quti,
        atts: _atts,
        pidlist: _pidlist
    }, function(msg) {
        var sMsg = gav(msg, "msg");
        var sCount = gav(msg, "count");
        var sta = gav(msg, "state");
        if (redirectUrl != null) {
            location.href = redirectUrl;
            return;
        }
        if (sta != "1") {
            $a(sMsg);
            showProc(src, false);
            return;
        }
        $confirm(sMsg, { title: "去結算", toDo: "http://www.kstyjz.com/paycenter/cart.aspx" }, { title: "再選購", toDo: function() {
            hideConfirm();
        }
        });
        $j("headerCartCount").html(sCount);
        if (reloadCartPage && (gav(msg, "state") == 1) && confirm("添加到購物車成功，是否馬上刷新頁面購物車頁面？\r\n\r\n是 - 刷新本頁面查看最新結果\r\n否 - 保留當前頁面狀態")) {
            location.href = "http://www.kstyjz.com/templets/qiye/JS/cart.aspx?t=" + Math.random();
            return;
        }
        showProc(src, false);
    });
}
/********************
* 清空購物車
* src : 觸發事件的源對像
* 回應 : string
*       1 - 成功
*       0 - 失敗
********************/
function emptyCart(src) {
    showBgProc();
    $.get("/ajax.ashx?action=emptycart&t=" + Math.random(), function(msg) {
        if (msg == "1") {
            $a("清空購物車成功，單擊確認返回產品中心。", 1, false, null, "消息", function() {
                location.href = "http://www.kstyjz.com/product";
            });
        } else {
            $a("清空購物車失敗，請稍候重試。");
        }
        showBgProc(false);
    });
}
/********************
* 清空購物車
* src : 觸發事件的源對像
* _pid : 產品ID
* 回應 : xml
********************/
function changeQuantity(src, _pid,_attrs) {
    var newVal = $(src).parent().find("input").attr("value");
    if (!/^\d+$/.test(newVal)) {
        $a("數量必須是一個整數。");
        return;
    }
    if (parseInt(newVal) == 0) {
        $a("數量必須大於0，若要刪商品，請點操作中的『刪除』。");
        return;
    }
    showBgProc();
    $.post("/ajax.ashx?action=addtocart&t=" + Math.random(), {
        pid: _pid,
        quti: newVal,
        atts: _attrs
    }, function(msg) {
        if (gav(msg, "state") == "1") {
            if (confirm("數量修改成功，是否馬上刷新頁面查看購物車結果？\n\n是 - 刷新頁面查看結果\n否 - 保留當前頁面狀態")) {
                location.href = "http://www.kstyjz.com/templets/qiye/JS/cart.aspx?t=" + Math.random();
            } else {
                showBgProc(false);
                $(src).hide();
            }
        } else {
            $a(msg);
            showBgProc(false);
        }
    });
}
function delCartProduct(src, _pid, _atts) {
    showBgProc();
    var _quti = 0;
    $.post("/ajax.ashx?action=addtocart&t=" + Math.random(), {
        pid: _pid,
        atts: _atts
    }, function(msg) {
        if (gav(msg, "state") == "1") {
            if (confirm("商品已刪除，是否馬上刷新頁面查看結果？\n\n\r\n是 - 刷新頁面查看結果\n否 - 保留當前頁面狀態")) {
                location.href = "http://www.kstyjz.com/templets/qiye/JS/cart.aspx?t=" + Math.random();
            }
        } else {
            $a(gav(msg, "msg"));
        }
        showBgProc(false);
    });
}
/********************
* 清空購物車
* src : 觸發事件的源對像
* _pid : 產品ID
* 回應 : xml
********************/
function changeQuantity(src, _pid) {
    var newVal = $(src).parent().find("input").attr("value");
    if (!/^\d+$/.test(newVal)) {
        $a("數量必須是一個整數。");
        return;
    }
    if (parseInt(newVal) == 0) {
        $a("數量必須大於0，若要刪商品，請點操作中的『刪除』。");
        return;
    }
    showBgProc();
    $.post("/ajax.ashx?action=addtocart&t=" + Math.random(), {
        pid: _pid,
        quti: newVal
    }, function(msg) {
        if (gav(msg, "state") == "1") {
            if (confirm("數量修改成功，是否馬上刷新頁面查看購物車結果？\n\n是 - 刷新頁面查看結果\n否 - 保留當前頁面狀態")) {
                location.href = "http://www.kstyjz.com/templets/qiye/JS/cart.aspx?t=" + Math.random();
            } else {
                showBgProc(false);
                $(src).hide();
            }
        } else {
            $a(msg);
            showBgProc(false);
        }
    });
}
function delCartProduct(src, _pid, _atts) {
    showBgProc();
    var _quti = 0;
    $.post("/ajax.ashx?action=addtocart&t=" + Math.random(), {
        pid: _pid,
        atts: _atts
    }, function(msg) {
        if (gav(msg, "state") == "1") {
            if (confirm("商品已刪除，是否馬上刷新頁面查看結果？\n\n\r\n是 - 刷新頁面查看結果\n否 - 保留當前頁面狀態")) {
                location.href = "http://www.kstyjz.com/templets/qiye/JS/cart.aspx?t=" + Math.random();
            }
        } else {
            $a(gav(msg, "msg"));
        }
        showBgProc(false);
    });
}

function cancelOrder(src, _orderNo) {
    showBgProc();
    $.post("/ajax.ashx?action=cancelorder&t=" + Math.random(), {
        no: _orderNo
    }, function(msg) {
        if (gav(msg, "state") == "1") {
            $(src).parent().parent().parent().find("td[name=orderstate]").html("已取消");
            $(src).hide();
        } else {
            $a("<p>取消訂單操作失敗。</p><p>非『待審核』狀態、已鎖定等訂單不可取消。</p>");
        }
        showBgProc(false);
    });
}
function delFavColumn(src, _oid) {
    showBgProc();
    $.post("/ajax.ashx?action=delfavfolumn&t=" + Math.random(), {
        oid: _oid
    }, function(msg) {
        if (gav(msg, "state") == "1") {
            $(src).parent().parent().fadeOut(80).remove();
        } else {
            $a("操作失敗，請稍候重試。");
        }
        showBgProc(false);
    });
}
function delMyWish(src, itemTabId) {
    var _ids = getCheckedVal(itemTabId);
    if (_ids.length == 0) {
        $a("無選中項。");
        return;
    }
    showBgProc();
    $.post("/ajax.ashx?action=delMyWishs&t=" + Math.random(), {
        ids: _ids
    }, function(msg) {
        if (gav(msg, "state") == "1") {
            var chks = $j(itemTabId).find("input[name=item]:checked");
            chks.each(function(i) {
                $(this).parent().parent().remove();
            });
        } else {
            $a(gav(msg, "msg"));
        }
        showBgProc(false);
    });
}

function delMyDownloads(src, itemTabId) {
    var _ids = getCheckedVal(itemTabId);
    if (_ids.length == 0) {
        $a("無選中項。");
        return;
    }
    showBgProc();
    $.post("/ajax.ashx?action=delMyDownloads&t=" + Math.random(), {
        ids: _ids
    }, function(msg) {
        if (gav(msg, "state") == "1") {
            var chks = $j(itemTabId).find("input[name=item]:checked");
            chks.each(function(i) {
                $(this).parent().parent().remove();
            });
        } else {
            $a(gav(msg, "msg"));
        }
        showBgProc(false);
    });
}

function addFav(src, _title, _url, _cat_id) {
    if (_url == null) {
        _url = location.pathname;
    }
    if (_title == null) {
        _title = document.title;
    }
    $.post("/ajax.ashx?action=fav&t=" + Math.random(), {
        url: _url,
        ptitle: _title,
        column_id: _cat_id
    }, function(msg) {
        var sta = gav(msg, "state");
        var sMsg = gav(msg, "msg");
        if (sta == "1") {
            closeTopLayer('div_fav_cntr');
        } else {
            top.$a(sMsg, "2");
            closeTopLayer('div_fav_cntr');
        }
    });
}
function delFav(src, itemTabId) {
    var _ids = getCheckedVal(itemTabId);
    if (_ids.length == 0) {
        $a("無選中項。");
        return;
    }
    showBgProc();
    $.post("/ajax.ashx?action=delfav&t=" + Math.random(), {
        ids: _ids
    }, function(msg) {
        if (gav(msg, "state") == "1") {
            var chks = $j(itemTabId).find("input[name=item]:checked");
            chks.each(function(i) {
                $(this).parent().parent().remove();
            });
        } else {
            $a(gav(msg, "msg"));
        }
        showBgProc(false);
    });
}
function hits(_oid, _mark) {
    $.post("/ajax.ashx?action=hits&t=" + Math.random(), {
        oid: _oid,
        mark: _mark
    })
}
function postComment(src, _oid, _mark) {
    showProc(src);
    var _content = $tv("txtCmtContent");
    var _verCode = $tv("txtCmtVerCode");
    if (_content == "") {
        $a("內容必填。");
        showProc(src, false);
        return;
    }
    if ($g("txtVerCode") != null && s_verCode == "") {
        $a("驗證碼不可空。");
        showProc(src, false);
        return;
    }
    $.post("/ajax.ashx?action=postcomment&t=" + Math.random(), {
        content: _content,
        oid: _oid,
        verCode: _verCode,
        mark: _mark
    }, function(msg) {
        var sta = gav(msg, "state");
        var sMsg = gav(msg, "msg");
        if (sta == "") {
            $a(msg, -1);
        } else if (sta == "2") {
            $a(sMsg, 1);
            emptyText('tbCmt');
        } else if (sta == "1") {
            var sTime = gav(msg, "time");
            var sUsername = gav(msg, "username");
            var sIp = gav(msg, "ip");
            var sComment = gav(msg, "comment");
            var sfeedback = gav(msg, "feedback");
            var num = gav(msg, "num");

  var htmlFmt = "<dl>"
						+ "<dd>{$username$}<span class='ip'>IP：{$ip$}</span>時間：{$time$}</dd>"
						+ "<dd class='c666 con mt8 mb10'>{$content$}</dd>"
						+ "<dd class='huifu'><h5>管理員回復：</h5><div>{$feedback$}</div></dd>"
					+ "</dl>";
            var sHtml = htmlFmt
                .replace("{$username$}", sUsername)
                .replace("{$ip$}", sIp)
                .replace("{$time$}", sTime)
                .replace("{$feedback$}", sfeedback)
                .replace("{$content$}", sComment);
            var oldComments=$j("divComments").html();
            if(oldComments=="暫無評論")
            {
                oldComments="";
            }
            $j("divComments").html(sHtml + oldComments);
            $j("spCommentCount").html(num);
            $a(sMsg, 1);
            emptyText('tbCmt')

        } else {
            $a(sMsg);
        }
        showProc(src, false);
    });
}
function writeComment(_oid, _mark) {
    $.post("/ajax.ashx?action=getcomment&t=" + Math.random(), {
        oid: _oid,
        mark: _mark
    }, function(msg) {
        var iCount = $(msg).find("count").text();
        $j("spCommentCount").html(iCount);
        var commtns = $(msg).find("comment");
        var sHtml = "";
        var htmlFmt = "<dl>"
						+ "<dd>{$username$}<span class='ip'>IP：{$ip$}</span>時間：{$time$}</dd>"
						+ "<dd class='c666 con mt8 mb10'>{$content$}</dd>"
						+ "<dd class='huifu'><h5>管理員回復：</h5><div>{$feedback$}</div></dd>"
					+ "</dl>";
        for (var i = 0; i < commtns.length; ++i) {
            var jCmt = $(commtns[i]);
            var sUsername = jCmt.find("username").text();
            var sContent = jCmt.find("content").text();
            var sIp = jCmt.find("ip").text();
            var sTime = jCmt.find("inputTime").text();
            var sfeedback = jCmt.find("feedback").text();
            sHtml += htmlFmt
                .replace("{$username$}", sUsername)
                .replace("{$ip$}", sIp)
                .replace("{$time$}", sTime)
                .replace("{$content$}", sContent)
                 .replace("{$feedback$}", sfeedback);
        }
        if (sHtml.length > 0) {
            $j("divComments").html(sHtml);
        } else {
            $j("divComments").html("暫無評論");
        }
    });
}
function addHistory(_oid, _mark) {
    $.get("/ajax.ashx?action=addhistory&t=" + Math.random(), {
        oid: _oid,
        mark: _mark
    });
}
function getAd(_keyname, cntrElmId) {
    $.post("http://www.kstyjz.com/ajax.ashx?action=getadd", {
        keyname: _keyname
    }, function(msg) {
        $j(cntrElmId).html(msg);
    });
}
function getVideo(_videoKey) {
    $.post("http://www.kstyjz.com/ajax.ashx?action=getvideo", {
        videoKey: _videoKey
    }, function(msg) {
        var jDiv = $j("divVideo");
        if (msg.length == 0) {
            jDiv.slideUp(80);
        } else {
            jDiv.html(msg);
            $(".prod_attrs").toggleClass("prod_attrs").toggleClass("prod_attrs_b");
        }
    });
}
function getOrderAnns() {
    $.get("http://www.kstyjz.com/ajax.ashx?action=getorderanns", function(msg) {
        $j("divOrderAnns").html(msg);
    });
}
function getEndingRemark() {
    $.get("http://www.kstyjz.com/ajax.ashx?action=getendingremark", function(msg) {
        $j("divEndingRemark").html(msg);
    });
}
function getHistory(_mark) {
 
    $.post("/ajax.ashx?action=gethistory&t=" + Math.random(), {
        mark: _mark
    }, function(msg) {
        if (msg.length == 0) {
            msg = "<li>&nbsp;&nbsp;無瀏覽歷史</li>";
        }
        $j("divHistoryCntr").html(msg+"<div class='clear'></div>");
    });
}
function getHits(_oid, _mark) {
    $.post("http://www.kstyjz.com/ajax.ashx?action=gethits", {
        mark: _mark,
        oid: _oid
    }, function(msg) {
        $j("cntrHits").html(msg);
    });
}
function getHelpStatic(_oid) {
    $.post("/ajax.ashx?action=helpsatisfaction&t=" + Math.random(), {
        oid: _oid
    }, function(msg) {
        var arrI = [parseInt(gav(msg, "1")), parseInt(gav(msg, "2")), parseInt(gav(msg, "3"))];
        var total = arrI[0] + arrI[1] + arrI[2];
        if (total == 0) {
            total = 1;
        }
        var maxHeight = 100;
        for (var i = 0; i < arrI.length; ++i) {
            var percent = (arrI[i] / total).toFixed(2);
            var h = maxHeight * percent;
            if (h == 0) {
                h = 1;
            }
            var sHtml = "<div class='static_graph' style='height:" + h + "px;'></div><div class='static_w'>"
                    + (percent * 100).toFixed(2) + "%</div>";
            $j("cntrStatic_" + i).html(sHtml);
        }
    });
}
function submitHelpUse(src, _oid) {
    showProc(src);
    var _notice = $("input[name=use]:checked").val();
    $.post("/ajax.ashx?action=helpuseful&t=" + Math.random(), {
        oid: _oid,
        notion: _notice
    }, function(msg) {
        if (gav(msg, "state") == "0") {
            $a(gav(msg, "msg"));
        } else {
            $a(gav(msg, "msg"), 1);
            getHelpStatic(_oid);
        }
        showProc(src, false);
    });
}
function getSimilarArticle(_sid) {
    $.post("/ajax.ashx?action=getsmilararticle&t=" + Math.random(), {
        sid: _sid
    }, function(msg) {
        $j("cntrSimilarArticle").html(msg);
    });
}
function getLastArticle() {
    $.post("http://www.kstyjz.com/ajax.ashx?action=getlastarticle", function(msg) {
        $j("cntrLastArticle").html(msg);
    });
}
function cleanHistory(_mark, key) {
    $.post("http://www.kstyjz.com/ajax.ashx?action=cleanhistory", {
        mark: _mark
    }, function(msg) {
       // $j("divHistoryCntr").html("<h4 class=\"t05\"><a class=\"clr\" onclick=\"cleanHistory('product','__oran__product_history')\" href=\"javascript:void(0)\">清除</a>最近瀏覽過的產品</h4><div id=\"divHistoryItems\" class=\"t05_con\">無瀏覽歷史<div class=\"clear\"/></div>");
        $j("divHistoryCntr").html("<li>&nbsp;&nbsp;無瀏覽歷史</li>");
    });
}
function subscription(src, elmId) {
    if (elmId == null) {
        elmId = "txtSubscriptionEmail";
    }
    var _email = $.trim($j(elmId).val());
    var ptn = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    if (_email.length == 0) {
        $a("E-Mail 不可為空");
        $j(elmId).focus();
        return false;
    }
    if (!ptn.test(_email)) {
        $a("E-Mail 格式錯誤。");
        $j(elmId).focus();
        return false;
    }
    showProc(src);
    $.post("/ajax.ashx?action=subscription&t=" + Math.random(), {
        email: _email
    }, function(msg) {
        var sta = gav(msg, "state");
        var sMsg = gav(msg, "msg");
        if (sta == "1") {
            $a(sMsg, 1);
        } else {
            $a(sMsg);
        }
        showProc(src, false);
    });
}
function userFeedback(src) {
    var _title = $tv("txtFdTitle");
    var _shortDesc = $tv("txtFdShortDesc");
    if (_title.length == 0 || _shortDesc.length == 0) {
        $a("內容或標題不可為空。");
        return false;
    }

    showBgProc(true, "正在提交...");
    $.post("/ajax.ashx?action=userfeedback&t=" + Math.random(), {
        title: _title,
        shortDesc: _shortDesc
    }, function(msg) {
        var sta = gav(msg, "state");
        var sMsg = gav(msg, "msg");
        if (sta == "1") {
            showMsgPage("<li>您的意見提交成功，感謝您的意見，有您的支持，我們會做得更好。</li>", 1, "http://www.kstyjz.com/user/faq.aspx", "意見/反饋", "http://www.kstyjz.com/user/faq.aspx");
            return;
        } else if (sMsg.length > 0) {
            $a(sMsg);
        } else {
            $a(msg);
        }
        showBgProc(false);
    });
}
function checkAuthority(_authIDs, _title) {
    $.post("/ajax.ashx?action=checkauthority&t=" + Math.random(), {
        authIDs: _authIDs
    }, function(msg) {
        if (msg == "1") {
            $j("div___________Perm").hide();
            document.oncontextmenu = function() { return true; };
            document.onselectstart = function() { return true; };
        } else {
            showMsgPage("您不具有查看 " + _title + " 的權限。");
            return;
        }
    });
}
function changeFavColumn(src, itemTabId) {
    var _ids = getCheckedVal(itemTabId);
    if (_ids.length == 0) {
        $a("無選中項。");
        return;
    }
    showProc(src);
    $.post("/ajax.ashx?action=changefavcolumn&t=" + Math.random(), {
        ids: _ids,
        targetId: src.value
    }, function(msg) {
        var sta = gav(msg, "state");
        var sMsg = gav(msg, "msg");
        if (sta == "1") {
            location.reload();
        } else {
            //alert(sMsg);
        }
    });
    showProc(src, false);
}
function getRecommentProductByHistory(_oid) {
    $.post("/ajax.ashx?action=GetRecommentProductByHistory&t=" + Math.random(), {
        oid: _oid
    }, function(msg) {
        var jO = $j("divHistoryRecommentCntr");
        if (msg.length == 0) {
            jO.remove();
        } else {
            jO.html(msg);
        }
    });
}

function getRecommentProjectByHistory(_oid) {
    $.post("/ajax.ashx?action=GetRecommentProjectByHistory&t=" + Math.random(), {
        oid: _oid
    }, function(msg) {
        var jO = $j("divHistoryRecommentCntr");
        if (msg.length == 0) {
            jO.remove();
        } else {
            jO.html(msg);
        }
    });
}


function getRelevantSales(_oid) {
    $.post("/ajax.ashx?action=GetRelevantSales&t=" + Math.random(), {
        oid: _oid
    }, function(msg) {
        var jO = $j("divRelevantSalesCntr");
        if (msg.length == 0) {
            jO.remove();
        } else {
            jO.html(msg);
        }
    });
}
function getRelevantViewed(_oid) {
    $.post("/ajax.ashx?action=GetRelevantViewed&t=" + Math.random(), {
        oid: _oid
    }, function(msg) {
        var jO = $j("divRelevantViewedCntr");
        if (msg.length == 0) {
            jO.remove();
        } else {
            jO.html(msg);
        }
    });
}
//瀏覽服務的歷史記錄
function getRelevantViewedProject(_oid) {
    $.post("/ajax.ashx?action=GetRelevantViewedProject&t=" + Math.random(), {
        oid: _oid
    }, function(msg) {
        var jO = $j("divRelevantViewedCntr");
        if (msg.length == 0) {
            jO.remove();
        } else {
            jO.html(msg);
        }
    });
}

//瀏覽下載的歷史記錄
function getRelevantViewedDownload(_oid) {
    $.post("/ajax.ashx?action=GetRelevantViewedDownload&t=" + Math.random(), {
        oid: _oid
    }, function(msg) {
        var jO = $j("divRelevantViewedCntr");
        if (msg.length == 0) {
            jO.remove();
        } else {
            jO.html(msg);
        }
    });
}

function delInitationlog(src, itemTabId) {
    var _ids = getCheckedVal(itemTabId);
    if (_ids.length == 0) {
        $a("無選中項。");
        return;
    }
    showBgProc();
    $.post("/ajax.ashx?action=DelInitationlog&t=" + Math.random(), {
        ids: _ids
    }, function(msg) {
        if (gav(msg, "state") == "1") {
            var chks = $j(itemTabId).find("input[name=item]:checked");
            chks.each(function(i) {
                $(this).parent().parent().remove();
            });
        } else {
            $a(gav(msg, "msg"));
        }
        showBgProc(false);
    });
}
function sendInvitation(src) {
    var jSrc = $j(src);
    var sEmail = $j("txtEmail").val();
    if (sEmail == null || sEmail.length == 0) {
        $a("電子郵箱地址不可為空。");
        return;
    }
    if (!PTN_EMAIL.test(sEmail)) {
        $a("電子郵箱地址格式不正確。");
        return;
    }
    showProc(src);
    $.post("/ajax.ashx?action=SendInvitation&t=" + Math.random(), {
        _email: sEmail
    }, function(msg) {
        var sta = gav(msg, "state");
        var sMsg = gav(msg, "msg");
        if (sta == "1") {
            showMsgPage(sMsg, 1, "http://www.kstyjz.com/user/InviteUserList.aspx", "邀請函列表", "http://www.kstyjz.com/user/InviteUserList.aspx");
        } else {
            $a(sMsg);
            showProc(src, false);
        }
    });
}
//填充報告分類
function fillReportCategories() {
    $.get("/ajax.ashx?action=GetReportCategories&t=" + Math.random(), function(msg) {
        var arrCat = msg.split("$$");
        var sOptHtml = "<option value=\"\">請選擇...</option>";
        for (var i = 0; i < arrCat.length; ++i) {
            sOptHtml += "<option value=\"" + arrCat[i] + "\">" + arrCat[i] + "</option>";
        }
        $j("RPT_tdCats").html("<select id=\"RPT_cats\">" + sOptHtml + "</select>");
    });
}
//填充留言分類
function fillLeavewordCategories() {
    $.get("/ajax.ashx?action=GetLeavewordCategories&t=" + Math.random(), function(msg) {
        var arrCat = msg.split("$$");
        var sOptHtml = "<option value=\"\">請選擇...</option>";
        for (var i = 0; i < arrCat.length; ++i) {
            sOptHtml += "<option value=\"" + arrCat[i] + "\">" + arrCat[i] + "</option>";
        }
        $j("LEAVEWORD_tdCats").html("<select id=\"LEAVEWORD_cats\">" + sOptHtml + "</select>");
    });
}
//發送留言
function sendLeaveword(src) {
    var sCat = $j("LEAVEWORD_cats").val();
    var sTitle = $v("LEAVEWORD_txtTitle");
    var sTel = $v("LEAVEWORD_txtTel");
    var sMobile = $v("LEAVEWORD_txtMobile");
    var sContact = $v("LEAVEWORD_txtContact");
    var sEmail = $v("LEAVEWORD_txtEmail");
    var sShortDesc = $v("LEAVEWORD_txtShortDesc");
    var err = "";
    if (sTitle == "") {
        err += "<li>標題不可為空</li>";
    }
    if (sContact == "") {
        err += "<li>聯繫人不可為空</li>";
    }
    if (sEmail == "") {
        err += "<li>電子郵箱地址不可為空</li>";
    }
    else if (!PTN_EMAIL.test(sEmail)) {
        err += "<li>電子郵箱地址格式錯誤</li>";
    }
    if (sCat == "") {
        err += "<li>留言類型必選</li>";
    }
    if (err.length > 0) {
        $a(err);
        return;
    }
    showProc(src);
    $.post("/ajax.ashx?action=SendLeaveword&t=" + Math.random(), {
        title: sTitle,
        cat: sCat,
        contact: sContact,
        email: sEmail,
        shortDesc: sShortDesc,
        tel: sTel,
        mobile: sMobile

    }, function(msg) {
        var sta = gav(msg, "state");
        var sMsg = gav(msg, "msg");
        if (sta == "1") {
            $a(sMsg, 1);
        } else {
            $a(sMsg);
        }
        showProc(src, false);
    });
}
//發送報告
function sendReprots(src) {
    var sCat = $j("RPT_cats").val();
    var sTitle = document.title;
    var sUrl = document.URL;
    var sContact = $v("RPT_txtContact");
    var sEmail = $v("RPT_txtEmail");
    var sShortDesc = $v("RPT_txtShortDesc");
    if (sCat.length == 0) {
        $a("請選擇報告分類。");
        return;
    }
    showProc(src);
    $.post("/ajax.ashx?action=SendReports&t=" + Math.random(), {
        title: sTitle,
        url: sUrl,
        cat: sCat,
        contact: sContact,
        email: sEmail,
        shortDesc: sShortDesc

    }, function(msg) {
        var sta = gav(msg, "state");
        var sMsg = gav(msg, "msg");
        if (sta == "1") {
            $a(sMsg, 1);
        } else {
            $a(sMsg);
        }
        showProc(src, false);
    });
}
//提交直接付款
function directPay(src) {
    var sPayer = $v("DIR_PAY_txtPayer");
    var sEmail = $v("DIR_PAY_txtEmail");
    var sTel = $v("DIR_PAY_txtTel");
    var sMobile = $v("DIR_PAY_txtMobile");
    var sSalesMan = $v("DIR_PAY_txtSalesManName");
    var sMoney = $v("DIR_PAY_txtMoney");
    var sUse = $v("DIR_PAY_txtUse");
    var sPayment = $v("DIR_PAY_ddlPayment");
    var err = "";
    if (sPayer.length == 0) {
        err += "<li>付款人不可為空。</li>"
    }
    if (sEmail == "") {
        err += "<li>電子郵箱地址不可為空</li>";
    }
    else if (!PTN_EMAIL.test(sEmail)) {
        err += "<li>電子郵箱地址格式錯誤</li>";
    }
    if (sMoney.length == 0) {
        err += "<li>付款金額不可為空。</li>";
    }
    else if (!PTN_FLOAT.test(sMoney)) {
        err += "<li>付款金額必須為數字，如89.00。</li>";
    }
    if (sUse.length == 0) {
        err += "<li>款項用途不可為空。</li>";
    }
    if (sPayment.length == 0) {
        err += "<li>請選擇付款方式。</li>";
    }
    if (err.length > 0) {
        $a(err);
        return;
    }
    showProc(src);
    $.post("/ajax.ashx?action=DirectPay&t=" + Math.random(), {
        payer: sPayer,
        email: sEmail,
        tel: sTel,
        mobile: sMobile,
        salesMan: sSalesMan,
        _money: sMoney,
        _use: sUse,
        payment: sPayment

    }, function(msg) {
        var sta = gav(msg, "state");
        var sMsg = gav(msg, "msg");
        if (sta == "1") {
            location.href = "http://www.kstyjz.com/Paycenter/PayDirectConfirm.aspx";
            return;
        } else {
            $a(sMsg);
        }
        showProc(src, false);
    });
}
function submitOrder(src, _oid) {
    showProc(src);
    var _contact = $j("txtContact").val();
    var _compName = $j("txtCompName").val();
    var _tel = $j("txtTel").val();
    var _mobile = $j("txtMobile").val();
    var _email = $j("txtEmail").val();
    var _addr = $j("txtAddr").val();
    var _content = $j("txtContent").val();
    var errorMsg = "";
    if (_contact.length == 0) {
        errorMsg += "<p>聯繫人不可為空</p>";
    }
    if (_mobile.length == 0) {
        errorMsg += "<p>手機不可為空</p>";
    }
    
    var ptns = /^\d{11,13}$/;
    if (_mobile.length > 0 && !ptns.test(_mobile)) {
        errorMsg += "<p>手機格式錯誤</p>";
    }
    
    var ptn = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    if (_email.length > 0 && !ptn.test(_email)) {
        errorMsg += "<p>E-Mail格式錯誤</p>";
    }
    
    if (_content.length == 0) {
        errorMsg += "<p>採購意向描述不可為空</p>";
    }
    if (errorMsg.length > 0) {
        $a(errorMsg);
        showProc(src, false);
        return;
    }
    $.post("/ajax.ashx?action=submitorder&t=" + Math.random(), {
        oid: _oid,
        contact: _contact,
        compName: _compName,
        tel: _tel,
        mobile: _mobile,
        email: _email,
        addr: _addr,
        content: _content
    }, function(msg) {
        var sta = gav(msg, "state");
        var sMsg = gav(msg, "msg");
        if (sta == "1") {
            $a(sMsg, 1);
            emptyText('tbForm1');
        } else {
            $a(msg);
            emptyText('tbForm1');
        }
    });
    showProc(src, false);
}
/********************************************* 代理加盟:start *********************************/
function getAgentHelpStatic(_oid) {
    $.post("/ajax.ashx?action=agenthelpsatisfaction&t=" + Math.random(), {
        oid: _oid
    }, function(msg) {
        var arrI = [parseInt(gav(msg, "1")), parseInt(gav(msg, "2")), parseInt(gav(msg, "3"))];
        var total = arrI[0] + arrI[1] + arrI[2];
        if (total == 0) {
            total = 1;
        }
        var maxHeight = 100;
        for (var i = 0; i < arrI.length; ++i) {
            var percent = (arrI[i] / total).toFixed(2);
            var h = maxHeight * percent;
            if (h == 0) {
                h = 1;
            }
            var sHtml = "<div class='static_graph' style='height:" + h + "px;'></div><div class='static_w'>"
                    + (percent * 100).toFixed(2) + "%</div>";
            $j("cntrStatic_" + i).html(sHtml);
        }
    });
}
function submitAgentHelpUse(src, _oid) {
    showProc(src);
    var _notice = $("input[name=use]:checked").val();
    $.post("/ajax.ashx?action=agenthelpuseful&t=" + Math.random(), {
        oid: _oid,
        notion: _notice
    }, function(msg) {
        if (gav(msg, "state") == "0") {
            $a(gav(msg, "msg"));
        } else {
            $a(gav(msg, "msg"), 1);
            getAgentHelpStatic(_oid);
        }
        showProc(src, false);
    });
}
/********************************************* 代理加盟:end *********************************/
/*顯示產品的簡介（一排四個的顯示模式）*/
function showProductInfo(src, _oid, _index) {
    var time1 = null;
    var time2 = null;
    var ID = null;
    var time = null;

    //鼠標移到圖片上的事件
    $(src).hover(function() { time1 = new Date(); showTime(); }, function() { window.clearInterval(ID); });

    //js定時器
    function showTime() {
        ID = window.setInterval(function() {
            time2 = new Date();
            time = time2 - time1;

            //時間差，停留200毫秒時觸發ajax請求
            if (time > 400) {
                if ($(src).parent().parent().next().attr("class") == "mesbook4" || $(src).parent().parent().next().attr("class") == "mesbook40") {
                    if ($(src).parent().parent().next().is(":visible")) {
                        return;
                    }
                    else {
                        $(src).parent().parent().next().show();
                    }
                }
                else {
                    $.post("/ajax.ashx?action=showProductInfo&t=" + Math.random(), {
                        oid: _oid,
                        index: _index
                    }, function(msg) {
                        if ($(src).parent().parent().next().attr("class") == "mesbook4" || $(src).parent().parent().next().attr("class") == "mesbook40") {
                            return;
                        }
                        else {
                            $(src).parent().parent().after(msg);
                            return;
                        }

                    });
                }
            }
        }, 450);
    }
}
/*顯示產品的簡介（豎排顯示模式）*/
function showProductInfos(src, _oid) {

    var time1 = null;
    var time2 = null;
    var ID = null;
    var time = null;

    //鼠標移到圖片上的事件
    $(src).hover(function() { time1 = new Date(); showTime(); }, function() { window.clearInterval(ID); });

    //js定時器
    function showTime() {
        ID = window.setInterval(function() {
            time2 = new Date();
            time = time2 - time1;

            //時間差，停留200毫秒時觸發ajax請求
            if (time > 400) {
                if ($(src).parent().parent().next().attr("class") == "mesbook44") {
                    if ($(src).parent().parent().next().is(":visible")) {
                        return;
                    }
                    else {
                        $(src).parent().parent().next().show();
                    }
                }
                else {
                    $.post("/ajax.ashx?action=showProductInfos&t=" + Math.random(), {
                        oid: _oid
                    }, function(msg) {
                        if ($(src).parent().parent().next().attr("class") == "mesbook44") {
                            return;
                        }
                        else {
                            $(src).parent().parent().after(msg);
                            return;
                        }

                    });
                }
            }
        }, 450);
    }

}


//隱藏產品預覽的層
function hideProductInfo(src) {

    if ($(src).parent().parent().next().attr("class") == "mesbook4" || $(src).parent().parent().next().attr("class") == "mesbook40" || $(src).parent().parent().next().attr("class") == "mesbook44") {
            // $(src).parent().parent().next().hide();
            $(src).parent().parent().next().mouseover(function() {
            $(src).parent().parent().next().show();
                return;
            });

            $(src).parent().parent().next().mouseout(function() {
                $(src).parent().parent().next().hide();
                return;
            });
            $(src).parent().parent().next().hide();
        }
}
//顯示購買小Tips
function showProductTips(oid) {
    var jLayer = $j("div_nsw_tips");
    if (jLayer.length == 0) {
        var sHtml = "<div class='mesbook5' id='div_nsw_tips'><h1><a href='javascript:void(0)' onclick=\"$(this).parent().parent().fadeOut(80);hideFullBg('div_nsw_tips_bg')\"><img src='" + SKIN_PATH + "img/ico9_close.gif' /></a>產品預定</h1>"
	            +"<h4>告訴我該產品的好消息</h4>"
                +"<div class='con'>您需要等待該產品的上架嗎？一旦該產品的價格降價之後，我們會第一時間把該商品的價格清單發送到您的電子郵件。</div>"
                +" <h5>如果打折則發送電子郵件給我</h5>"
                + "<div class='inp'><input id='rdoTip1' type='radio' name='rdoTips' value='0' checked='true' /><label for='rdoTip1'>僅僅當前該產品</label></div>"
                + "<div class='inp'><input id='rdoTip2' type='radio' name='rdoTips' value='1' /><label for='rdoTip2'>當前產品所屬分類</label></div>"
                + "<div class='inp'><input  id='rdoTip3' type='radio' name='rdoTips' value='2' /><label for='rdoTip3'>所有打折清單</label></div>"
                + "<div class='inp'><span>Email:</span><input type='text' id='txtEmail' name='txtEmail'  class='text' /><input id='txtHide' name='txtHide' type='hidden' value='" + oid + "' /></div>"
                + "<div class='inp'><span>簡述:</span><textarea id='txtContent' name='txtContent'class='textarea'></textarea></div>"
                +"<div class='mes_btn'>"
    	        + "<input type='button' class='b61' value='提  交' onclick=\"submitProductTips('txtHide','txtEmail','txtContent','rdoTips')\" />"
		        + "<input type='button' class='b62' value='取  消' onclick=\"$(this).parent().parent().fadeOut(80);hideFullBg('div_nsw_tips_bg')\" />"
                +"</div></div>";
        $(document.body).append(sHtml);
    }
    setCM("div_nsw_tips");
    showFullBg("div_nsw_tips_bg");
    relocation("div_nsw_tips");
    
}


//購買產品小Tips
function submitProductTips(_oid, _email, _content, _rdoTips) {
    var _oid = $j("txtHide").val();
    var _email = $j("txtEmail").val();
    var _content = $j("txtContent").val();
    var _state = $("input[name=rdoTips]:checked").val();
    if (_content.length > 500) {
        $a('簡述太長，不能超過500個字節，請填寫簡短描述');
    }
    var ptn = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    if (_email.length == 0) {
        $a('E-Mail 不可為空');
        return false;
    }
    if (!ptn.test(_email)) {
        $a('E-Mail 格式錯誤');
        return false;
    }
    $.post("/ajax.ashx?action=postProductTips&t=" + Math.random(), {
        oid: _oid,
        email: _email,
        content: _content,
        state: _state
    }, function(msg) {
        if (gav(msg, "state") == "1") {
            $a(gav(msg, "msg"),1);
        } else {
            $a(gav(msg, "msg"));
        }
    });
    $j("div_nsw_tips").hide();
    hideFullBg('div_nsw_tips_bg');
}


//產品預覽（願望夾）
function showMyWish(_oid) {
    var jLayer = $j("div_nsw_wishs");
    if (jLayer.length == 0) {
        var sHtml = "<div class=\"mesbook6\" id=\"div_nsw_wishs\"></div>";
        $(document.body).append(sHtml);
    }
    $.post("/ajax.ashx?action=showMyWish&t=" + Math.random(), {
        oid: _oid
    }, function(msg) {
        $j("div_nsw_wishs").html(msg);
    });
    setCM("div_nsw_wishs");
    showFullBg("div_nsw_wishs_bg");
    relocation("div_nsw_wishs");
}

//保存數據到願望夾
function submitProductWishs(_oid, _attr, _num) {
    var _oid = $j("txtHide").val();
    var _attr = $j("txtAttr").html();
    var _num = $j("txtNum").val();
    $.post("/ajax.ashx?action=postProductWishs&t=" + Math.random(), {
        oid: _oid,
        attr: _attr,
        num: _num
    }, function(msg) {
        if (gav(msg, "state") == "1") {
            $a(gav(msg, "msg"), 1);
        } else {
            $a(gav(msg, "msg"));
        }
    });
    $j("div_nsw_wishs").hide();
    hideFullBg('div_nsw_wishs_bg');
}

/*加盟商在線下單*/
function sendGetProductsNotify(src) {
    var _productColumn = $j("ddlProductsColumns").val();
    var _searchText = $j("txtSearch").val();
    if (_searchText == "關鍵詞") { _searchText = ""; }
    //showProc(src);
    $.post("/ajax.ashx?action=sendGetProductsByColumn&t=" + Math.random(), {
        columnID: _productColumn,
        searchText: _searchText
    }, function(msg) {

        //創建下拉表單
        InitDropdownlist(document.getElementById("PackageSelectList"), "請選擇關聯資訊", "0", msg);
    });
}

//設置產品數據源
function InitDropdownlist(sel, defaulttext, defaultvalue, arry) {
    //1\清除所有的數據源
    var len = sel.options.length;
    for (i = 0; i < len; i++) {
        sel.remove(0);
    }

    //2\設置一個默認值
    //sel.add(new Option(defaulttext, defaultvalue));

    //3\製作數據源，鍵值對中間用$$分開，||作為鍵值對之間的分割符

    var ary = arry.split("||");
    len = ary.length;
    if (len) {
        for (i = 0; i < len-1; i++) {
            text_value = ary[i].split("$$");
            text = text_value[1];
            value = text_value[0];
            sel.add(new Option(text, value));
        }
    }
}


   /**定單提交
   ********************/

function userorder(src) {

    var s_name = $tv("txtname");
    var s_title = $tv("txttitle");
    var s_email = $tv("txtemail");
    var s_tel = $tv("txttel");
    var s_content = $tv("txtcontent");
    var s_address = $tv("txtaddress");
    var s_enddate = $tv("txtenddate");
    var s_IDList = $("#PackagePickList").val();
    
    //alert(s_IDList);
    if (s_title == "") {
        $a("定單名稱不能為空", "txttitle");
        return;
    }
    if (s_name == "") {
        $a("下單人姓名不能為空", "txtname");
        return;
    }
    if (s_tel == "") {
        $a("聯繫電話不能為空", "txttel");
        return;
    }
    if (s_address == "") {
        $a("聯繫地址不能為空", "txtaddress");
        return;
    }
    if (s_enddate == "") {
        $a("到貨時間不能為空", "txtenddate");
        return;
    }
    if (s_content == "" || s_content.length > 1000) {
        $a("詳細描述不能為空或者大於1000字", "txtcontent");
        return;
    }
    else {
        var _email = $.trim($(src).attr("value"));
        var ptn = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if (!ptn.test(s_email)) {
            $a("E-Mail錯誤");
            return false;
        }
    }
    $.post("/ajax.ashx?action=agentorder&t=" + Math.random(), {
        s_name: s_name,
        s_title: s_title,
        s_email: s_email,
        s_tel: s_tel,
        s_content: s_content,
        s_address: s_address,
        s_enddate: s_enddate,
        s_IDList: s_IDList
    }, function(msg) {
        var sta = gav(msg, "state");
        var sMsg = gav(msg, "msg");
        if (sta == "1") {
            showMsgPage("<li>定單提交成功，我們會盡快與您聯繫，謝謝！</li>", 1, "http://www.kstyjz.com/User/UserOrder.aspx", "在線定單", "http://www.kstyjz.com/User/UserOrder.aspx");
            return;
        } else if (sMsg.length > 0) {
            $a(sMsg);
        } else {
            $a(msg);
        }
    });
}


/*招商加盟:刪除定單end*/
function delAgentOrder(src, itemTabId) {
    var _ids = getCheckedVal(itemTabId);
    if (_ids.length == 0) {
        $a("無選中項。");
        return;
    }
    showBgProc();
    $.post("/ajax.ashx?action=delAgentOrder&t=" + Math.random(), {
        ids: _ids
    }, function(msg) {
        if (gav(msg, "state") == "1") {
            var chks = $j(itemTabId).find("input[name=item]:checked");
            chks.each(function(i) {
                $(this).parent().parent().remove();
            });
             $a(gav(msg, "msg"),1);
        } else {
            $a(gav(msg, "msg"));
        }
        showBgProc(false);
    });
}

//填加友情連接
function AddApply(src) {
    var s_Type = document.getElementById("TxtType").selectedIndex;
    var s_Url = $tv("TxtUrl");
    var s_Name = $tv("TxtName");
    var s_PhotoPath = $tv("TxtPhotoPath");
    var s_Content = $tv("TxtMsg");
    var s_UserName = $tv("TxtUserName");
    var s_Phone = $tv("TxtTel");
    var s_Email = $tv("TxtEmail");
    var s_QQ = $tv("TxtQQ");

    if (s_Url == "" || s_Url == "http://") {
        $a("請輸入網址！", "TxtUrl");
        return;
    }
    if (s_Name == "") {
        $a("請輸入網站名稱！", "TxtName");
        return;
    }
    if (s_Content.length > 400) {
        $a("網站簡況不能大於400字！", "txtUsername");
        return;
    }
    $.post("/ajax.ashx?action=apply&t=" + Math.random(), {
        Type: s_Type,
        Url: s_Url,
        Name: s_Name,
        PhotoPath: s_PhotoPath,
        Content: s_Content,
        UserName: s_UserName,
        Phone: s_Phone,
        Email: s_Email,
        QQ: s_QQ
    },
       function(msg) {
           if (gav(msg, "state") == "1") {
               $a(gav(msg, "msg"));
               
           }
           else {
               $a(gav(msg, "msg"));
           }
           ;
       });
   }

//產品的對比車
   function AddCompare(src) {
       var _flag = false;
       if(src.checked)
       {
           _flag = true;
           $(src).next().next().next().show();
       }
       else
       {
           _flag = false;
           $(src).next().next().next().hide();
       }
       var _ids = $(src).val();

       $.post("/ajax.ashx?action=addCompare&t=" + Math.random(), {
           ids: _ids,
           flag: _flag
       }, function(msg) {
           if (gav(msg, "state") == "1") {
               var newcookie = gav(msg, "newcookie");
               var arr = new Array();
               arr = newcookie.split(',');
                  if (arr.length > 0) {
                      for (var i = 0; i < arr.length; i++) {
                        if (i == arr.length-1)
                        {
                            $(".pro_main").find("input[id=" + arr[i] + "]").show();
                        }
                        else
                        {
                            $(".pro_main").find("input[id=" + arr[i] + "]").hide();
                        }
                      }
                  }
           }
       });

   }

   //產品對比車，移除該產品
   function DelOneCompare(src) {
       var _ids = $(src).attr("id");
       $.post("/ajax.ashx?action=delOneCompare&t=" + Math.random(), {
           ids: _ids
       }, function(msg) {
           if (gav(msg, "state") == "1") {
               window.location = "http://www.kstyjz.com/product/Compare.aspx";

           }
           else {
               showMsgPage("<li>產品對比車中不存在對比的產品記錄，請選擇需要對比的產品</li>", 0, "/", "首頁", "/");
           }
       });
   }

   //產品對比車，移除該產品
   function DelAllCompare() {
       $.post("/ajax.ashx?action=delAllCompare&t=" + Math.random(), {
       }, function(msg) {
               showMsgPage("<li>產品對比車中所有產品已移除，您可以繼續挑選產品進行比較</li>", 1, "/", "首頁", "/");
       });
   }
   

//添加下載日誌
function addDownload(oid,url)
{
    //提交數據到數據庫記錄那個用戶下載了什麼資料
       $.post("/ajax.ashx?action=addDownload&t=" + Math.random(), {
           oid: oid
       }, function(msg) {
           if (gav(msg, "state") == "1") {
               window.location = url;
           }
           else {
               $a(gav(msg, "msg"));
           }
       });
}
   