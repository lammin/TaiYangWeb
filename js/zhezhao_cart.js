(function() {
    $.extend($.fn, {
        mask: function(msg, maskDivClass) {

            // 參數 
            var op = {
                opacity: 0.8,
                z: 10000,
                bgcolor: '#ccc'
            };
            var original = $(document.body);
            var position = {
                top: 0,
                left: 0
            };
            if (this[0] && this[0] !== window.document) {
                original = this;
                position = original.position();
            }
            // 創建一個 Mask 層，追加到對像中 
            var maskDiv = $('<div class="maskdivgen"> </div>');
            maskDiv.appendTo(original);
            var maskWidth = original.clientWidth;

            if (!maskWidth) {
                maskWidth = original.width();
            }
            var maskHeight = original.clientHeight;
            if (!maskHeight) {
                maskHeight = original.height();
            }

            maskDiv.css({
                position: 'absolute',
                top: position.top,
                left: position.left,
                'z-index': op.z,
                width: maskWidth,
                height: maskHeight,
                'background-color': op.bgcolor,
                opacity: 0
            });
            if (maskDivClass) {
                maskDiv.addClass(maskDivClass);
            }
            if (msg) {
                var msgDiv = $('<div style="position:absolute;border:#6593cf 1px solid; padding:2px;background:#ccca"><div style="line-height:24px;border:#a3bad9 1px solid;background:white;padding:2px 10px 2px 10px">' + msg + '</div></div>');
                msgDiv.appendTo(maskDiv);
                var widthspace = (maskDiv.width() - msgDiv.width());
                var heightspace = (maskDiv.height() - msgDiv.height());
                msgDiv.css({
                    cursor: 'wait',
                    top: (heightspace / 2 - 2),
                    left: (widthspace / 2 - 2)
                });
            }
            maskDiv.fadeIn('fast', function() {
                // 淡入淡出效果
                $(this).fadeTo('fast', op.opacity);
            })
            return maskDiv;
        },
        unmask: function() {
            var original = $(document.body);
            if (this[0] && this[0] !== window.document) {
                original = $(this[0]);
            }
            original.find("> div.maskdivgen").fadeOut('fast', 0, function() {
                $(this).remove();
            });
        }
    });
})();

function GetSession2()
{
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/WebService/Common.asmx/GetUserSession",
        data: "{UserName:'" + "0" + "',UserId:'" + "0" + "',Sum:'" + "0" + "',CheckCode:'" + "0" + "'}",
        dataType: 'json',
        success: function(re) {
           var r = eval("("+re.d+")");
           var s1=r.UserId;
           var s2=decodeURIComponent(r.UserName);
           var s3=r.Sum;
           if (s3=="0")
           {
               alert("您的購物車中沒有商品！！");
               return;
           }
           if (s2 != "0" && s2 != "undefined")
           {
               window.location.href="../aspx/Step1.aspx.htm"/*tpa=http://www.taiyangjx.com/aspx/Step1.aspx*/; 
           }
           else
           {
               DisplayLoginMsgBox();
           }
        }
    })
}

function DisplayLoginMsgBox() {
    $(document).mask(''); //全屏幕遮罩
//    if(event.keyCode==13)
//    {
//       document.getElementById("btn1").click;
//    }
    var xScroll;
    var yScroll;
    if (self.pageYOffset) {
        yScroll = self.pageYOffset;
        xScroll = self.pageXOffset;
    }
    else
        if (document.documentElement && document.documentElement.scrollTop) { // Explorer 6 Strict   
        yScroll = document.documentElement.scrollTop;
        xScroll = document.documentElement.scrollLeft;
    }
    else
        if (document.body) {// all other Explorers   
        yScroll = document.body.scrollTop;
        xScroll = document.body.scrollLeft;
    }

    var windowWidth = document.documentElement.clientWidth;
    var windowHeight = document.documentElement.clientHeight;
    var popupHeight = $("#popupContact").height();
    var popupWidth = $("#popupContact").width();
    //centering
    $("#msgboxLogin").css({
        "position": "absolute",

        "top": (windowHeight / 2 - popupHeight / 2 - 190 + yScroll) + "px",
        "left": (windowWidth / 2 - popupWidth / 2 - 200) + "px"
    });
    $("#msgboxLogin").show();
}

function CloseDiv() {
    $(document).unmask();
    document.getElementById("txtLoginName").value = "";
    document.getElementById("txtPassword").value = "";
    document.getElementById("ChkCode").value = "";
    $("#msgboxLogin").hide();
}

function setTab(name,cursel,n){
    for(i=1;i<=n;i++){
        var menu=document.getElementById(name+i);
        var con=document.getElementById("con_"+name+"_"+i);
        menu.className=i==cursel?"hover":"";
        con.style.display=i==cursel?"block":"none";
    }
}
