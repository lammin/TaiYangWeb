function chAll(tableid)
{
    var table = document.getElementById(tableid);   
    var ch = document.getElementById("chkAll");   
    var elems = table.getElementsByTagName("input");   
    for(var i=0;i<elems.length;i++){   
        if(elems[i].type == 'checkbox'){   
            elems[i].checked = ch.checked;              
        }   
    }   
}

function CheckAll(form) 
{
    for (var i=0;i<form.elements.length;i++)    
    {
        var e = form.elements[i];
        if (e.name != 'chkAll')   
        {
            e.checked = form.chkAll.checked; 
        }
    }
}

function GetSession()
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
           if (s2 != "0" && s2 != "undefined")
           {
                document.getElementById("login").innerHTML = "";
                document.getElementById("showinfo").innerHTML = "您好<span>"+ s2 + 
                "！</span>&nbsp;欢迎来到本网站！<a href='http://www.taiyangjx.com/Member'>[我的帐户]</a>&nbsp;"+"<a href='javascript:;' onclick='javascript:Quit2()'>[退出]</a>";
                document.getElementById("shopsum").innerHTML = "<a href='../aspx/Cart.aspx.htm'/*tpa=http://www.taiyangjx.com/aspx/Cart.aspx*/>"+s3+"</a>";
           }
           else
           {
                document.getElementById("login").innerHTML = "您好！欢迎来到本网站！<span><a href='http://www.taiyangjx.com/Member'>[请登录]</a>，新用户？<a href='http://www.taiyangjx.com/html/Register.html' class='link-regist'>[免费注册]</a></span>";
                document.getElementById("showinfo").innerHTML = "";
                document.getElementById("shopsum").innerHTML = "<a href='../aspx/Cart.aspx.htm'/*tpa=http://www.taiyangjx.com/aspx/Cart.aspx*/>"+s3+"</a>";
           }
        }
    })   
}

function GetSessionEn()
{
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/WebService/Common.asmx/GetUserSessionEn",
        data: "{UserName:'" + "0" + "',UserId:'" + "0" + "',Sum:'" + "0" + "',CheckCode:'" + "0" + "'}",
        dataType: 'json',
        success: function(re) {
           var r = eval("("+re.d+")");
           var s1=r.UserId;
           var s2=decodeURIComponent(r.UserName);
           var s3=r.Sum;
           if (s2 != "0" && s2 != "undefined")
           {
                document.getElementById("login").innerHTML = "";
                document.getElementById("showinfo").innerHTML = "Hello<span>"+ s2 + 
                "！</span>&nbsp;welcome to our website!<a href='http://www.taiyangjx.com/En/Member'>[My Account]</a>&nbsp;"+"<a href='javascript:;' onclick='javascript:Quit2()'>[Quit]</a>";
                document.getElementById("shopsum").innerHTML = "<a href='../flash/Error.html-aspxerrorpath=-En-aspx-Cart.aspx.htm'/*tpa=http://www.taiyangjx.com/En/aspx/Cart.aspx*/>"+s3+"</a>";
           }
           else
           {
                document.getElementById("login").innerHTML = "Hello!Welcome to our website！<span><a href='http://www.taiyangjx.com/En/Member'>[Login]</a>，New users？<a href='http://www.taiyangjx.com/En/html/Register.html' class='link-regist'>[Register]</a></span>";
                document.getElementById("showinfo").innerHTML = "";
                document.getElementById("shopsum").innerHTML = "<a href='../flash/Error.html-aspxerrorpath=-En-aspx-Cart.aspx.htm'/*tpa=http://www.taiyangjx.com/En/aspx/Cart.aspx*/>"+s3+"</a>";
           }
        }
    })   
}  

function LoginOrNo()
{
    var userName = getCookie("Users");
    if (userName && userName != "Guest") {
        userName = decodeURIComponent(GetCookie("NickName",""));
        document.getElementById("login").innerHTML = "";
        document.getElementById("showinfo").innerHTML = "<span style='font-weight:bold;'>"+ userName + 
        "</span>&nbsp;&nbsp;欢迎您！<a href='http://www.taiyangjx.com/Member'>[我的帐户]</a>&nbsp;&nbsp;<a href='javascript:;' onclick='javascript:Quit2()'>[退出]</a>"; 
    }
    else {
        document.getElementById("login").innerHTML = "您好，欢迎来到本网站！您还未登录！&nbsp;|&nbsp;<a href='http://www.taiyangjx.com/Member'>[登录]</a>"+
        "&nbsp;|&nbsp;<a href='http://www.taiyangjx.com/html/Register.html'>[注册]</a>";
        document.getElementById("showinfo").innerHTML = "";
    }
}

function LoginOrNoEn()
{
    var userName = getCookie("Users");
    if (userName && userName != "Guest") {
        userName = decodeURIComponent(GetCookie("NickName",""));
        document.getElementById("login").innerHTML = "";
        document.getElementById("showinfo").innerHTML = "<span style='font-weight:bold;'>"+ userName + 
        "</span>&nbsp;&nbsp;Welcome !<a href='http://www.taiyangjx.com/En/Member'>[My Account]</a>&nbsp;&nbsp;<a href='javascript:;' onclick='javascript:Quit2()'>[Quit]</a>"; 
    }
    else {
        document.getElementById("login").innerHTML = "Hello, welcome to our website! You are not logged in&nbsp;|&nbsp;<a href='http://www.taiyangjx.com/En/Member'>[Login]</a>"+
        "&nbsp;|&nbsp;<a href='http://www.taiyangjx.com/En/html/Register.html'>[Register]</a>";
        document.getElementById("showinfo").innerHTML = "";
    }
}

function GetViews()
{
    var id = 0;
    if(document.getElementById("Hidden1")) {
        id = document.getElementById("Hidden1").value;
    }
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/WebService/Common.asmx/GetNewsViews",
        data: "{Id:'" + id + "'}",
        dataType: 'json',
        success: function(data) {
            if(document.getElementById("spViews")) {
                document.getElementById("spViews").innerHTML=data.d;   
            }
        }     
    })
}

function GetViewsEn()
{
    var id = 0;
    if(document.getElementById("Hidden1")) {
        id = document.getElementById("Hidden1").value;
    }
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/WebService/Common.asmx/GetNewsViewsEn",
        data: "{Id:'" + id + "'}",
        dataType: 'json',
        success: function(data) {
            if(document.getElementById("spViews")) {
                document.getElementById("spViews").innerHTML=data.d;   
            }
        }     
    })
}

function GetFlashViews()
{
    var id = 0;
    if(document.getElementById("Hidden1")) {
        id = document.getElementById("Hidden1").value;
    }
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/WebService/Common.asmx/GetFlashViews",
        data: "{Id:'" + id + "'}",
        dataType: 'json',
        success: function(data) {
            if(document.getElementById("spViews")) {
                document.getElementById("spViews").innerHTML=data.d;   
            }
        }     
    })
}

function GetFlashViewsEn()
{
    var id = 0;
    if(document.getElementById("Hidden1")) {
        id = document.getElementById("Hidden1").value;
    }
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/WebService/Common.asmx/GetFlashViewsEn",
        data: "{Id:'" + id + "'}",
        dataType: 'json',
        success: function(data) {
            if(document.getElementById("spViews")) {
                document.getElementById("spViews").innerHTML=data.d;   
            }
        }     
    })
}

function GetDownloadViews()
{
    var userName = getCookie("Users");
    var id = 0;
    //if (userName && userName != "Guest")
    {
        if(document.getElementById("Hidden1")) {
            id = document.getElementById("Hidden1").value;
        }
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "/WebService/Common.asmx/GetDownloadViews",
            data: "{Id:'" + id + "'}",
            dataType: 'json',
            success: function(data) {
                if(document.getElementById("spViews")) {
                    document.getElementById("spViews").innerHTML=data.d;   
                }
            }     
        })
    }
//    else
//    {
//        alert("请先登录再下载！");
//        window.location.href="http://www.taiyangjx.com/Member";
//    }
}

function GetDownloadViewsEn()
{
    var userName = getCookie("Users");
    var id = 0;
    //if (userName && userName != "Guest")
    {
        if(document.getElementById("Hidden1")) {
            id = document.getElementById("Hidden1").value;
        }
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "/WebService/Common.asmx/GetDownloadViewsEn",
            data: "{Id:'" + id + "'}",
            dataType: 'json',
            success: function(data) {
                if(document.getElementById("spViews")) {
                    document.getElementById("spViews").innerHTML=data.d;   
                }
            }     
        })
    }
//    else
//    {
//        alert("Please login to download");
//        window.location.href="http://www.taiyangjx.com/En/Member";
//    }
}

function IsLoginOrNo_News()
{
    $("#loading").show();
    $("#spViews").hide();
    var userName = getCookie("Users");
    var id = 0;
    if(document.getElementById("divLoginNo") && document.getElementById("divLoginYes") && document.getElementById("loginName")) {
        if(userName && userName != "Guest") {
            userName = decodeURIComponent(GetCookie("NickName",""));
            document.getElementById("divLoginNo").style.display = "none";
            document.getElementById("divLoginYes").style.display = "block";
            document.getElementById("loginName").innerHTML=userName;
        }
        else {
            document.getElementById("divLoginNo").style.display = "block";
            document.getElementById("divLoginYes").style.display = "none";
        }
    }
    if(document.getElementById("Hidden1")) {
        id = document.getElementById("Hidden1").value;
    }
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/WebService/Common.asmx/GetNewsViews",
        data: "{Id:'" + id + "'}",
        dataType: 'json',
        success: function(data) {
            if(document.getElementById("spViews")) {
                document.getElementById("spViews").innerHTML=data.d;   
                $("#loading").hide();
                $("#spViews").show();
            }
        }    
    })
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/WebService/Common.asmx/GetNewsReview",
        data: "{Id:'" + id + "'}",
        dataType: 'json',
        success: function(data) {
            var html="";
            var list = eval(data.d);
            $("#LatestReview").empty();
            $.each(list,function(entryIndex,entry){
                html += "<table width='100%' cellpadding='0' cellspacing='0' style='table-layout:fixed;'><tr><td rowspan='2' valign='top' width='60' style='padding-top:10px;'>"+
                    "<img src='../images/FacePic/bodyface.gif'/*tpa=http://www.taiyangjx.com/images/FacePic/bodyface.gif*/ alt='' /></td><td width='30%' align='left'>"+entry[0]+"</td><td align='left'>"+entry[1]+
                    "&nbsp;&nbsp;评价：<span style='color:#333333;'>"+entry[2]+"</span>&nbsp;&nbsp;<img src='"+entry[3]+
                    "' alt='' />"+"</td></tr><tr><td colspan='2' align='left' valign='top' style='padding-right: 5px;word-break:break-all;'>"+entry[4]+
                    "</td></tr><tr><td height='3' colspan='3'></td></tr><tr><td height='1' colspan='3' background='../images/line4.gif'/*tpa=http://www.taiyangjx.com/images/line4.gif*/></td></tr></table>";
            });
            $('#LatestReview').append(html);    
        }     
    })
}

function IsLoginOrNo_NewsEn()
{
    $("#loading").show();
    $("#spViews").hide();
    var userName = getCookie("Users");
    var id = 0;
    if(document.getElementById("divLoginNo") && document.getElementById("divLoginYes") && document.getElementById("loginName")) {
        if(userName && userName != "Guest") {
            userName = decodeURIComponent(GetCookie("NickName",""));
            document.getElementById("divLoginNo").style.display = "none";
            document.getElementById("divLoginYes").style.display = "block";
            document.getElementById("loginName").innerHTML=userName;
        }
        else {
            document.getElementById("divLoginNo").style.display = "block";
            document.getElementById("divLoginYes").style.display = "none";
        }
    }
    if(document.getElementById("Hidden1")) {
        id = document.getElementById("Hidden1").value;
    }
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/WebService/Common.asmx/GetNewsViewsEn",
        data: "{Id:'" + id + "'}",
        dataType: 'json',
        success: function(data) {
            if(document.getElementById("spViews")) {
                document.getElementById("spViews").innerHTML=data.d;  
                $("#loading").hide();
                $("#spViews").show(); 
            }
        }     
    })
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/WebService/Common.asmx/GetNewsReviewEn",
        data: "{Id:'" + id + "'}",
        dataType: 'json',
        success: function(data) {
            var html="";
            var list = eval(data.d);
            $("#LatestReview").empty();
            $.each(list,function(entryIndex,entry){
                html += "<table width='100%' cellpadding='0' cellspacing='0' style='table-layout:fixed;'><tr><td rowspan='2' valign='top' width='60' style='padding-top:10px;'>"+
                    "<img src='../images/FacePic/bodyface.gif'/*tpa=http://www.taiyangjx.com/images/FacePic/bodyface.gif*/ alt='' /></td><td width='30%' align='left'>"+entry[0]+"</td><td align='left'>"+entry[1]+
                    "&nbsp;&nbsp;Evaluate：<span style='color:#333333;'>"+entry[2]+"</span>&nbsp;&nbsp;<img src='"+entry[3]+
                    "' alt='' />"+"</td></tr><tr><td colspan='2' align='left' valign='top' style='padding-right: 5px;word-break:break-all;'>"+entry[4]+
                    "</td></tr><tr><td height='3' colspan='3'></td></tr><tr><td height='1' colspan='3' background='../images/line4.gif'/*tpa=http://www.taiyangjx.com/images/line4.gif*/></td></tr></table>";
            });
            $('#LatestReview').append(html);    
        }     
    })
}

function IsLoginOrNo_Product()
{
    $("#loading").show();
    $("#spViews").hide();
    var userName = getCookie("Users");
    var id = 0;
    if(document.getElementById("divLoginNo") && document.getElementById("divLoginYes") && document.getElementById("loginName")) {
        if(userName && userName != "Guest") {
            userName = decodeURIComponent(GetCookie("NickName",""));
            document.getElementById("divLoginNo").style.display = "none";
            document.getElementById("divLoginYes").style.display = "block";
            document.getElementById("loginName").innerHTML=userName;
        }
        else {
            document.getElementById("divLoginNo").style.display = "block";
            document.getElementById("divLoginYes").style.display = "none";
        }
    }
    if(document.getElementById("Hidden1")) {
        id = document.getElementById("Hidden1").value;
    }
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/WebService/Common.asmx/GetProductViews",
        data: "{Id:'" + id + "'}",
        dataType: 'json',
        success: function(data) {
            if(document.getElementById("spViews")) {
                document.getElementById("spViews").innerHTML=data.d;   
                $("#loading").hide();
                $("#spViews").show(); 
            }
        }     
    })
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/WebService/Common.asmx/GetProductReview",
        data: "{Id:'" + id + "'}",
        dataType: 'json',
        success: function(data) {
            var html="";
            var list = eval(data.d);
            $("#LatestReview").empty();
            $.each(list,function(entryIndex,entry){
                html += "<table width='100%' cellpadding='0' cellspacing='0' style='table-layout:fixed;'><tr><td rowspan='2' valign='top' width='60' style='padding-top:10px;'>"+
                    "<img src='../images/FacePic/bodyface.gif'/*tpa=http://www.taiyangjx.com/images/FacePic/bodyface.gif*/ alt='' /></td><td width='30%' align='left'>"+entry[0]+"</td><td align='left'>"+entry[1]+
                    "&nbsp;&nbsp;评价：<span style='color:#333333;'>"+entry[2]+"</span>&nbsp;&nbsp;<img src='"+entry[3]+
                    "' alt='' />"+"</td></tr><tr><td colspan='2' align='left' valign='top' style='padding-right: 5px;word-break:break-all;'>"+entry[4]+
                    "</td></tr><tr><td height='3' colspan='3'></td></tr><tr><td height='1' colspan='3' background='../images/line4.gif'/*tpa=http://www.taiyangjx.com/images/line4.gif*/></td></tr></table>";
            });
            $('#LatestReview').append(html);    
        }     
    })
}

function IsLoginOrNo_ProductEn()
{
    $("#loading").show();
    $("#spViews").hide();
    var userName = getCookie("Users");
    var id = 0;
    if(document.getElementById("divLoginNo") && document.getElementById("divLoginYes") && document.getElementById("loginName")) {
        if(userName && userName != "Guest") {
            userName = decodeURIComponent(GetCookie("NickName",""));
            document.getElementById("divLoginNo").style.display = "none";
            document.getElementById("divLoginYes").style.display = "block";
            document.getElementById("loginName").innerHTML=userName;
        }
        else {
            document.getElementById("divLoginNo").style.display = "block";
            document.getElementById("divLoginYes").style.display = "none";
        }
    }
    if(document.getElementById("Hidden1")) {
        id = document.getElementById("Hidden1").value;
    }
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/WebService/Common.asmx/GetProductViewsEn",
        data: "{Id:'" + id + "'}",
        dataType: 'json',
        success: function(data) {
            if(document.getElementById("spViews")) {
                document.getElementById("spViews").innerHTML=data.d;   
                $("#loading").hide();
                $("#spViews").show(); 
            }
        }     
    })
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/WebService/Common.asmx/GetProductReviewEn",
        data: "{Id:'" + id + "'}",
        dataType: 'json',
        success: function(data) {
            var html="";
            var list = eval(data.d);
            $("#LatestReview").empty();
            $.each(list,function(entryIndex,entry){
                html += "<table width='100%' cellpadding='0' cellspacing='0' style='table-layout:fixed;'><tr><td rowspan='2' valign='top' width='60' style='padding-top:10px;'>"+
                    "<img src='../images/FacePic/bodyface.gif'/*tpa=http://www.taiyangjx.com/images/FacePic/bodyface.gif*/ alt='' /></td><td width='30%' align='left'>"+entry[0]+"</td><td align='left'>"+entry[1]+
                    "&nbsp;&nbsp;Evaluate：<span style='color:#333333;'>"+entry[2]+"</span>&nbsp;&nbsp;<img src='"+entry[3]+
                    "' alt='' />"+"</td></tr><tr><td colspan='2' align='left' valign='top' style='padding-right: 5px;word-break:break-all;'>"+entry[4]+
                    "</td></tr><tr><td height='3' colspan='3'></td></tr><tr><td height='1' colspan='3' background='../images/line4.gif'/*tpa=http://www.taiyangjx.com/images/line4.gif*/></td></tr></table>";
            });
            $('#LatestReview').append(html);    
        }     
    })
}

function GetWebViews()
{
    var id="1";
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/WebService/Common.asmx/GetWebViews",
        data: "{Id:'" + id + "'}",
        dataType: 'json',
        success: function(data) {
            if(document.getElementById("spW_views")) {
                document.getElementById("spW_views").innerHTML=data.d;   
            }
        }     
    })
}

function GetWebViewsEn()
{
    var id="1";
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/WebService/Common.asmx/GetWebViewsEn",
        data: "{Id:'" + id + "'}",
        dataType: 'json',
        success: function(data) {
            if(document.getElementById("spW_views")) {
                document.getElementById("spW_views").innerHTML=data.d;   
            }
        }     
    })
}

function SendEmail()
{
    var reg2= /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    var ip="";
    if(document.getElementById("txtEmailOrder").value==""){
        alert("请输入Email帐号");
        document.getElementById("txtEmailOrder").focus();
        return false;
    }
    else if(!reg2.test(document.getElementById("txtEmailOrder").value.replace(/\ /g,""))){
        alert("Email格式不正确");
        document.getElementById("txtEmailOrder").value="";
        document.getElementById("txtEmailOrder").focus();
        return false;
    }
    else if(document.getElementById("ChkCode").value==""){
        alert("请输入验证码");
        document.getElementById("ChkCode").focus();
        return false;
    } 
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/WebService/Common.asmx/AddEmail",
        data: "{email:'" + $("#txtEmailOrder").val().replace(/\ /g,"") + "',checkcode:'" + $("#ChkCode").val() + "',ip:'" + ip +"'}",
        dataType: 'json',
        success: function(re) {
            if(re.d=="-1") {
                alert("验证码错误！");
                document.getElementById("ChkCode").focus();
            }
            else if(re.d=="0") {
                alert("此Email已经订阅过了，不能重复订阅！");
            }
            else if(re.d=="1"){
                alert("订阅成功！");
            }
            else{
                alert(re.d); 
            }   
            document.getElementById("txtEmailOrder").value="";   
            document.getElementById("ChkCode").value="";    
        }     
    })
}

function SendEmailEn()
{
    var reg2= /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    var ip="";
    if(document.getElementById("txtEmailOrder").value==""){
        alert("Please enter your email");
        document.getElementById("txtEmailOrder").focus();
        return false;
    }
    else if(!reg2.test(document.getElementById("txtEmailOrder").value.replace(/\ /g,""))){
        alert("Format is incorrect");
        document.getElementById("txtEmailOrder").value="";
        document.getElementById("txtEmailOrder").focus();
        return false;
    }
    else if(document.getElementById("ChkCode").value==""){
        alert("Please enter the verification code");
        document.getElementById("ChkCode").focus();
        return false;
    } 
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/WebService/Common.asmx/AddEmailEn",
        data: "{email:'" + $("#txtEmailOrder").val().replace(/\ /g,"") + "',checkcode:'" + $("#ChkCode").val() + "',ip:'" + ip +"'}",
        dataType: 'json',
        success: function(re) {
            if(re.d=="-1") {
                alert("Verification code error");
                document.getElementById("ChkCode").focus();
            }
            else if(re.d=="0") {
                alert("This email has been used！");
            }
            else if(re.d=="1"){
                alert("Order successful！");
            }
            else{
                alert(re.d); 
            }   
            document.getElementById("txtEmailOrder").value="";   
            document.getElementById("ChkCode").value="";    
        }     
    })
}

function GetPwd() {
    var ip = "";
    if (document.getElementById("txt_user").value == "") {
        alert("请输入用户名！");
        document.getElementById("txt_user").focus();
        return false;
    }
    if (document.getElementById("txt_answer").value == "") {
        alert("请输入密码答案");
        document.getElementById("txt_answer").focus();
        return false;
    }
    else if (document.getElementById("txt_pass").value == "") {
        alert("请输入验证码");
        document.getElementById("txt_pass").focus();
        return false;
    }
    var selectQues = document.getElementById('spQuestion').innerHTML;

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/WebService/Common.asmx/GetPassword",
        data: "{LoginName:'" + $("#txt_user").val() + "',Question:'" + selectQues + "',Answer:'" + $("#txt_answer").val() + "',CheckCode:'" + $("#txt_pass").val() + "',Ip:'" + ip + "'}",
        dataType: 'json',
        success: function(re) {
            if (re.d == "0") {
                alert("验证码错误！！");
                document.getElementById("txt_user").value = "";
                document.getElementById("txt_answer").value = "";
                document.getElementById("txt_pass").value = "";
                document.getElementById("txt_pass").focus();
            }
            else if (re.d == "-1") {
                alert("回答错误！");
                document.getElementById("txt_user").value = "";
                document.getElementById("txt_answer").value = "";
                document.getElementById("txt_pass").value = "";
                document.getElementById("txt_user").focus();
            }
            else {
                //alert("密码找回成功！");
                document.getElementById("txt_answer").value = "";
                document.getElementById("txt_pass").value = "";
                document.getElementById("div1").style.display = "none";
                document.getElementById("div2").style.display = "block";
                document.getElementById("lblUser").innerHTML = document.getElementById("txt_user").value;
                document.getElementById("lblNewPwd").innerHTML = re.d;
            }
        }
    })
}

function GoRegister()
{
    window.location.href="http://www.taiyangjx.com/html/Register.html";
}

function GoRegisterEn()
{
    window.location.href="http://www.taiyangjx.com/En/html/Register.html";
}

function Quit()
{
    if(confirm("您确定要退出吗？")){
        document.getElementById("txtLoginName").value="";
        document.getElementById("txtPassword").value="";
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "/WebService/Common.asmx/Quit",
            data: "{CheckCode:'" + "0" + "'}",
            dataType: 'json',
            success: function(re) {
                 if(re.d=="0")
                 {
                    document.getElementById("divLoginNo").style.display = "block";
                    document.getElementById("divLoginYes").style.display = "none";
                 }     
            }
        })
    }
}

function QuitEn()
{
    if(confirm("Are you sure to exit ?")){
        document.getElementById("txtLoginName").value="";
        document.getElementById("txtPassword").value="";
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "/WebService/Common.asmx/Quit",
            data: "{CheckCode:'" + "0" + "'}",
            dataType: 'json',
            success: function(re) {
                 if(re.d=="0")
                 {
                    document.getElementById("divLoginNo").style.display = "block";
                    document.getElementById("divLoginYes").style.display = "none";
                 }     
            }
        })
    }
}

function Quit2()
{
    if(confirm("您确定要退出吗？")){
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "/WebService/Common.asmx/Quit",
            data: "{CheckCode:'" + "0" + "'}",
            dataType: 'json',
            success: function(re) {
                 if(re.d=="0")
                 {
                    document.getElementById("login").innerHTML = "您好，欢迎来到本网站！您还未登录！&nbsp;|&nbsp;<a href='http://www.taiyangjx.com/Member'>登录</a>"+
                        "&nbsp;|&nbsp;<a href='http://www.taiyangjx.com/html/Register.html'>注册</a>";
                    document.getElementById("showinfo").innerHTML = "";
                    window.location.href="../index.htm"/*tpa=http://www.taiyangjx.com/*/;
                 }     
            }
        })
    }
}

function Quit2En()
{
    if(confirm("Are you sure to exit ?")){
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "/WebService/Common.asmx/Quit",
            data: "{CheckCode:'" + "0" + "'}",
            dataType: 'json',
            success: function(re) {
                 if(re.d=="0")
                 {
                    document.getElementById("login").innerHTML = "Hello, welcome to our website! You are not logged in&nbsp;|&nbsp;<a href='http://www.taiyangjx.com/En/Member'>Login</a>"+
                        "&nbsp;|&nbsp;<a href='http://www.taiyangjx.com/En/html/Register.html'>Register</a>";
                    document.getElementById("showinfo").innerHTML = "";
                    window.location.href="http://www.taiyangjx.com/En/";
                 }     
            }
        })
    }
}

function Quit3()
{
    if(confirm("您确定要退出吗？")){
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "/WebService/Common.asmx/Quit",
            data: "{CheckCode:'" + "0" + "'}",
            dataType: 'json',
            success: function(re) {
                 if(re.d=="0")
                 {
                    top.location.href="../index.htm"/*tpa=http://www.taiyangjx.com/*/;
                 }     
            }
        })
    }
}

function checkLogin() 
{ 
    var name = document.getElementById("txtLoginName").value;
    var pass = document.getElementById("txtPassword").value;
    var reg = /\s/g; 
    name = name.replace(reg, "");
    if(name==""){
        alert("请输入登录名！");
        document.getElementById("txtLoginName").focus();
        return false;
    }
    else if(pass==""){
        alert("请输入密码！");
        document.getElementById("txtPassword").focus();
        return false;
    }
    else {
        return true;
    }
} 
 
function checkLoginEn() 
{ 
    var name = document.getElementById("txtLoginName").value;
    var pass = document.getElementById("txtPassword").value;
    var reg = /\s/g; 
    name = name.replace(reg, "");
    if(name==""){
        alert("Please enter the login name");
        document.getElementById("txtLoginName").focus();
        return false;
    }
    else if(pass==""){
        alert("Please enter the password");
        document.getElementById("txtPassword").focus();
        return false;
    }
    else {
        return true;
    }
} 

function CheckInput()
{
    var reg = /\s/g;
    var key = document.getElementById("txtKeywords").value;
    key = key.replace(reg, ""); 
    if(key=="" || key=="请输入关键字") {
        alert("请输入关键字");
        document.getElementById("txtKeywords").focus();
        return false;
    }
    else {  
        window.location.href="../aspx/SearchResult.aspx-key=.htm"/*tpa=http://www.taiyangjx.com/aspx/SearchResult.aspx?key=*/+escape(key);
    } 
}

function CheckInputEn()
{
    var reg = /\s/g;
    var key = document.getElementById("txtKeywordsEn").value;
    //key = key.replace(reg, ""); 
    if(key=="" || key=="Please enter a keyword") {
        alert("Please enter a keyword");
        document.getElementById("txtKeywordsEn").focus();
        return false;
    }
    else {  
        window.location.href="../flash/Error.html-aspxerrorpath=-En-aspx-SearchResult.aspx.htm"/*tpa=http://www.taiyangjx.com/En/aspx/SearchResult.aspx?key=*/+escape(key);
    } 
}

function showInfo(name, enty, count) {
    for (i = 1; i <= count; i++) {
        var tabnew = document.getElementById(name + i);
        var newcontent = document.getElementById(name + "_" + i);
        tabnew.className = i == enty ? "tabon" : "taboff";
        newcontent.style.display = i == enty ? "block" : "none";
    }
}

function showInfo1(name, enty, count) {
    for (i = 1; i <= count; i++) {
        var tabnew = document.getElementById(name + i);
        var newcontent = document.getElementById(name + "_" + i);
//        tabnew.className = i == enty ? "tabon" : "taboff";
        newcontent.style.display = i == enty ? "block" : "none";
    }
}

function changeItem(id,fname,s,i,n){
    for(x=s;x<=n;x++){
		if(x==i){
			document.getElementById(fname+x).src = "/images/"+fname+"_00"+x+"f.gif";
			document.getElementById(id+"Body"+i).className = "DisplayShow";
		}
		else{
			document.getElementById(fname+x).src = "/images/"+fname+"_00"+x+".gif";
			document.getElementById(id+"Body"+x).className = "DisplayNone";
		}
	}
}

function  AddFav() {   //加入收藏  
    var ua = navigator.userAgent.toLowerCase();
    var sURL = document.URL;
    var sTitle = document.title;
    if(ua.indexOf("msie 8")>-1){
        external.AddToFavoritesBar(sURL, sTitle,'');  //IE8
    }
    else{
        try{
            window.external.addFavorite(sURL, sTitle);
        }
        catch(e){
            try{
                window.sidebar.addPanel(sTitle, sURL, "");
            }
            catch(e){
                alert("加入收藏失败，请使用Ctrl+D进行添加");
            }
        }
   }
   return false;
}

function  AddFavEn() {   //加入收藏，英文版
    var ua = navigator.userAgent.toLowerCase();
    var sURL = document.URL;
    var sTitle = document.title;
    if(ua.indexOf("msie 8")>-1){
        external.AddToFavoritesBar(sURL, sTitle,'');  //IE8
    }
    else{
        try{
            window.external.addFavorite(sURL, sTitle);
        }
        catch(e){
            try{
                window.sidebar.addPanel(sTitle, sURL, "");
            }
            catch(e){
                alert("Favorite failed, press Ctrl + D to add");
            }
        }
   }
   return false;
}    
        
function SetHome(obj){    //设为首页  
    try{   
        obj.style.behavior='url(#default#homepage)';   
        obj.setHomePage(window.location.href);   
    }catch(e){   
        if(window.netscape){   
            try{   
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");   
            }
            catch(e){   
                alert("抱歉，此操作被浏览器拒绝！\n\n请在浏览器地址栏输入“about:config”并回车然后将[signed.applets.codebase_principal_support]设置为'true'");   
            }
        }
        else{   
            alert("抱歉，您所使用的浏览器无法完成此操作。\n\n您需要手动将该网站设置为首页。");   
        }
    } 
}

function SetHomeEn(obj){    //设为首页，英文版 
    try{   
        obj.style.behavior='url(#default#homepage)';   
        obj.setHomePage(window.location.href);   
    }catch(e){   
        if(window.netscape){   
            try{   
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");   
            }
            catch(e){   
                alert("Sorry, refused to operate\n\nPlease enter 'about:config' in url and press enter, and then set [signed.applets.codebase_principal_support] to 'true'");   
            }
        }
        else{   
            alert("Sorry, refused to operate\n\nYou need to manually this website be set to home");   
        }
    } 
}

function closeWindow()
{
	if(window.netscape)
	{
		try
		{
			netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
		}
		catch(e)
		{
			alert("被浏览器拒绝！\n请在浏览器地址栏输入'about:config'并回车\n然后将'dom.allow_scripts_to_close_windows'设置为'true'");
			return;
		}
	}
	window.opener=null;
	window.open('','_parent','');
	window.close();
}

function SetCookie(name,value)  //两个参数，一个是cookie的名子，一个是值
{
    var Days = 30;              //此cookie将被保存30天
    var exp  = new Date();      //new Date("December 31, 9998");
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

function setCookie(c_name, value, expiredays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + expiredays);
	document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}

function getCookie(name){
    var arr=document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
    if(arr!=null)
        return unescape(arr[2]);
    return null;
}

function GetCookie(cookie_name) {
	var results = document.cookie.match('(^|;) ?' + cookie_name + '=([^;]*)(;|$)');
	if (results)
		return (unescape(results[2]));
	else
		return null;
}

function GetCookie(cookie_name, key) {
	var results = document.cookie.match('(^|;) ?' + cookie_name + '=([^;]*)(;|$)');
	if (results)
		return ((results[2]));
	else
		return null;
}

function delCookie(name)    //删除cookie
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}

function IsDigit()
{
    return ((event.keyCode >= 48) && (event.keyCode <= 57));
}