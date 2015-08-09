function strlen(str)
{
     var len;
     var i;
     len = 0;
     for (i=0;i<str.length;i++)
     {
         if (str.charCodeAt(i)>255) len+=2; else len++;
     }
     return len;
}  

function checkNewsReview() 
{ 
    var content = document.getElementById("txtContent").value;
    var reg = /\s/g; 
    var id = 0;
    var title = "";
    var ip = "";
    var face = $("input[name='RadioButtonList2']:checked").val();
    var evaluation = $("input[name='RadioButtonList1']:checked").val();
    content = content.replace(reg, "");
    if(content=="") {
        alert("請輸入評論內容！");
        document.getElementById("txtContent").focus();
        return false;
    }
    else if(strlen(document.getElementById("txtContent").value)>200)
    {
        alert("最多不超過200個字符");
        document.getElementById("txtContent").focus();
        return false;
    }
    else if(content=="請輸入評論內容(200字以內)") 
    {
        alert("請輸入評論內容！");
        document.getElementById("txtContent").focus();
        return false;
    }  
    else if(document.getElementById("ChkCode").value=="")
    {
        alert("請輸入驗證碼");
        document.getElementById("ChkCode").focus();
        return false;
    } 
    if(document.getElementById("Hidden1")) {
        id = document.getElementById("Hidden1").value;
    }
    if(document.getElementById("Hidden2")) {
        title = document.getElementById("Hidden2").value;
    }
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/WebService/Common.asmx/AddNewsReview",
        data: "{id:'" + id + "',title:'" + title + "',content:'" + $("#txtContent").val() + 
        "',face:'" + face + "',evaluation:'" + evaluation + "',checkcode:'" + $("#ChkCode").val() + "',ip:'" + ip + "'}",
        dataType: 'json',
        success: function(re) {
            if(re.d=="0")
            {
                alert("驗證碼錯誤！！");
                document.getElementById("ChkCode").focus();
            }
            else if(re.d=="-2")
            {
                alert("評論失敗！");
                document.getElementById("txtContent").focus();
            }
            else
            {
                document.getElementById("txtContent").value="";
                document.getElementById("ChkCode").value="";
                $("#imgCode").click();
                alert("評論成功！"); 
                
                var html="";
                var list = eval(re.d);
	            $("#LatestReview").empty();
                $.each(list,function(entryIndex,entry){
                    html += "<table width='100%' cellpadding='0' cellspacing='0' style='table-layout:fixed;'><tr><td rowspan='2' valign='top' width='60' style='padding-top:10px;'>"+
                        "<img src='../images/FacePic/bodyface.gif'/*tpa=http://www.taiyangjx.com/images/FacePic/bodyface.gif*/ alt='' /></td><td width='30%' align='left'>"+entry[0]+"</td><td align='left'>"+entry[1]+
                        "&nbsp;&nbsp;評價：<span style='color:#333333;'>"+entry[2]+"</span>&nbsp;&nbsp;<img src='"+entry[3]+
                        "' alt='' />"+"</td></tr><tr><td colspan='2' align='left' valign='top' style='padding-right: 5px;word-break:break-all;'>"+entry[4]+
                        "</td></tr><tr><td height='3' colspan='3'></td></tr><tr><td height='1' colspan='3' background='../images/line4.gif'/*tpa=http://www.taiyangjx.com/images/line4.gif*/></td></tr></table>";
                });
                $('#LatestReview').append(html);
            }     
        }     
    })
}

function checkNewsReviewEn() 
{ 
    var content = document.getElementById("txtContent").value;
    var reg = /\s/g; 
    var id = 0;
    var title = "";
    var ip = "";
    var face = $("input[name='RadioButtonList2']:checked").val();
    var evaluation = $("input[name='RadioButtonList1']:checked").val();
    //content = content.replace(reg, "");
    if(content=="") {
        alert("Please enter a comment");
        document.getElementById("txtContent").focus();
        return false;
    }
    else if(strlen(document.getElementById("txtContent").value)>200)
    {
        alert("No more than 200 characters");
        document.getElementById("txtContent").focus();
        return false;
    }
    else if(content=="Please enter a comment") 
    {
        alert("Please enter a comment");
        document.getElementById("txtContent").focus();
        return false;
    }  
    else if(document.getElementById("ChkCode").value=="")
    {
        alert("Please enter the verification code");
        document.getElementById("ChkCode").focus();
        return false;
    } 
    if(document.getElementById("Hidden1")) {
        id = document.getElementById("Hidden1").value;
    }
    if(document.getElementById("Hidden2")) {
        title = document.getElementById("Hidden2").value;
    }
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/WebService/Common.asmx/AddNewsReviewEn",
        data: "{id:'" + id + "',title:'" + title + "',content:'" + $("#txtContent").val() + 
        "',face:'" + face + "',evaluation:'" + evaluation + "',checkcode:'" + $("#ChkCode").val() + "',ip:'" + ip + "'}",
        dataType: 'json',
        success: function(re) {
            if(re.d=="0")
            {
                alert("Verification code error");
                document.getElementById("ChkCode").focus();
            }
            else if(re.d=="-2")
            {
                alert("Fail");
                document.getElementById("txtContent").focus();
            }
            else
            {
                document.getElementById("txtContent").value="";
                document.getElementById("ChkCode").value="";
                $("#imgCode").click();
                alert("Success"); 
                
                var html="";
                var list = eval(re.d);
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
        }     
    })
}

function checkProductReview() 
{ 
    var content = document.getElementById("txtContent").value;
    var reg = /\s/g; 
    var id = 0;
    var title = "";
    var ip = "";
    var face = $("input[name='RadioButtonList2']:checked").val();
    var evaluation = $("input[name='RadioButtonList1']:checked").val();
    content = content.replace(reg, "");
    if(content=="") {
        alert("請輸入評論內容！");
        document.getElementById("txtContent").focus();
        return false;
    }
    else if(strlen(document.getElementById("txtContent").value)>200)
    {
        alert("最多不超過200個字符");
        document.getElementById("txtContent").focus();
        return false;
    }
    else if(content=="請輸入評論內容(200字以內)") 
    {
        alert("請輸入評論內容！");
        document.getElementById("txtContent").focus();
        return false;
    }  
    else if(document.getElementById("ChkCode").value=="")
    {
        alert("請輸入驗證碼");
        document.getElementById("ChkCode").focus();
        return false;
    } 
    if(document.getElementById("Hidden1")) {
        id = document.getElementById("Hidden1").value;
    }
    if(document.getElementById("Hidden2")) {
        title = document.getElementById("Hidden2").value;
    }
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/WebService/Common.asmx/AddProductReview",
        data: "{id:'" + id + "',title:'" + title + "',content:'" + $("#txtContent").val() + 
        "',face:'" + face + "',evaluation:'" + evaluation + "',checkcode:'" + $("#ChkCode").val() + "',ip:'" + ip + "'}",
        dataType: 'json',
        success: function(re) {
            if(re.d=="0")
            {
                alert("驗證碼錯誤！！");
                document.getElementById("ChkCode").focus();
            }
            else if(re.d=="-2")
            {
                alert("評論失敗！");
                document.getElementById("txtContent").focus();
            }
            else
            {
                document.getElementById("txtContent").value="";
                document.getElementById("ChkCode").value="";
                $("#imgCode").click();
                alert("評論成功！"); 
                
                var html="";
                var list = eval(re.d);
	            $("#LatestReview").empty();
                $.each(list,function(entryIndex,entry){
                    html += "<table width='100%' cellpadding='0' cellspacing='0' style='table-layout:fixed;'><tr><td rowspan='2' valign='top' width='60' style='padding-top:10px;'>"+
                        "<img src='../images/FacePic/bodyface.gif'/*tpa=http://www.taiyangjx.com/images/FacePic/bodyface.gif*/ alt='' /></td><td width='30%' align='left'>"+entry[0]+"</td><td align='left'>"+entry[1]+
                        "&nbsp;&nbsp;評價：<span style='color:#333333;'>"+entry[2]+"</span>&nbsp;&nbsp;<img src='"+entry[3]+
                        "' alt='' />"+"</td></tr><tr><td colspan='2' align='left' valign='top' style='padding-right: 5px;word-break:break-all;'>"+entry[4]+
                        "</td></tr><tr><td height='3' colspan='3'></td></tr><tr><td height='1' colspan='3' background='../images/line4.gif'/*tpa=http://www.taiyangjx.com/images/line4.gif*/></td></tr></table>";
                });
                $('#LatestReview').append(html);
            }     
        }     
    })
}

function checkProductReviewEn() 
{ 
    var content = document.getElementById("txtContent").value;
    var reg = /\s/g; 
    var id = 0;
    var title = "";
    var ip = "";
    var face = $("input[name='RadioButtonList2']:checked").val();
    var evaluation = $("input[name='RadioButtonList1']:checked").val();
    //content = content.replace(reg, "");
    if(content=="") {
        alert("Please enter a comment");
        document.getElementById("txtContent").focus();
        return false;
    }
    else if(strlen(document.getElementById("txtContent").value)>200)
    {
        alert("No more than 200 characters");
        document.getElementById("txtContent").focus();
        return false;
    }
    else if(content=="Please enter a comment") 
    {
        alert("Please enter a comment");
        document.getElementById("txtContent").focus();
        return false;
    }  
    else if(document.getElementById("ChkCode").value=="")
    {
        alert("Please enter the verification code");
        document.getElementById("ChkCode").focus();
        return false;
    } 
    if(document.getElementById("Hidden1")) {
        id = document.getElementById("Hidden1").value;
    }
    if(document.getElementById("Hidden2")) {
        title = document.getElementById("Hidden2").value;
    }
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/WebService/Common.asmx/AddProductReviewEn",
        data: "{id:'" + id + "',title:'" + title + "',content:'" + $("#txtContent").val() + 
        "',face:'" + face + "',evaluation:'" + evaluation + "',checkcode:'" + $("#ChkCode").val() + "',ip:'" + ip + "'}",
        dataType: 'json',
        success: function(re) {
            if(re.d=="0")
            {
                alert("Verification code error");
                document.getElementById("ChkCode").focus();
            }
            else if(re.d=="-2")
            {
                alert("Fail");
                document.getElementById("txtContent").focus();
            }
            else
            {
                document.getElementById("txtContent").value="";
                document.getElementById("ChkCode").value="";
                $("#imgCode").click();
                alert("Success"); 
                
                var html="";
                var list = eval(re.d);
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
        }     
    })
}

function SendMess()
{
    var reg1 = /^1\d{10}$/;
    var ip = "";
    var address="";
    if(document.getElementById("txtTitle").value=="")
    {
        alert("請輸入留言主題");
        document.getElementById("txtTitle").focus();
        return false;
    }
    else if(document.getElementById("txtMobile").value=="")
    {
        alert("請輸入手機號碼");
        document.getElementById("txtMobile").focus();
        return false;
    }
    else if(!reg1.test(document.getElementById("txtMobile").value))
    {
        alert("手機號碼格式不正確");
        document.getElementById("txtMobile").focus();
        document.getElementById("txtMobile").select();
        return false;
    }
    else if(document.getElementById("txtContent").value=="")
    {
        alert("請輸入留言內容");
        document.getElementById("txtContent").focus();
        return false;
    }
    else if(strlen(document.getElementById("txtContent").value)>500)
    {
        alert("最多不超過500個字符");
        document.getElementById("txtContent").focus();
        return false;
    }
    else if(document.getElementById("ChkCode").value=="")
    {
        alert("請輸入驗證碼");
        document.getElementById("ChkCode").focus();
        return false;
    } 
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/WebService/Common.asmx/AddMessageShare",
        data: "{title:'" + $("#txtTitle").val() + "',username:'" + $("#txtUserName").val() + "',company:'" + $("#txtCompany").val() + 
        "',tel:'" + $("#txtTel").val() + "',mobile:'" + $("#txtMobile").val() + "',fax:'" + "" + "',zip:'" + "" + "',email:'" + $("#txtEmail").val() + 
        "',qq:'" + $("#txtQQ").val() + "',address:'" + address + "',content:'" + $("#txtContent").val() + "',url:'" + "" + "',industry:'" + "" + 
        "',province:'" + "" + "',city:'" + "" + "',county:'" + "" + "',post:'" + "" + "',type:'1" + "',hasValiCode:'" + "1" + 
        "',checkcode:'" + $("#ChkCode").val() + "',ip:'" + ip + "'}",
        dataType: 'json',
        success: function(re) {
            if(re.d=="0")
            {
                alert("驗證碼錯誤！！");
                document.getElementById("ChkCode").focus();
            }
            else
            {
                $("#imgCode").click();
                alert(re.d); 
                emptyText('tbForm1');
                //window.location.href="../html/MessageOnline.html"; 
            }     
        }     
    })
}

function SendMess1() {
    var reg1 = /^1\d{10}$/;
    var ip = "";
    var address = "";
    if (document.getElementById("txtCompany").value =="") {
        alert("請輸入公司姓名");
        document.getElementById("txtCompany").focus();
        return false;
    }
    else if (document.getElementById("txtMobile").value =="") {
        alert("請輸入手機號碼");
        document.getElementById("txtMobile").focus();
        return false;
    }
    else if (!reg1.test(document.getElementById("txtMobile").value)) {
        alert("手機號碼格式不正確");
        document.getElementById("txtMobile").focus();
        document.getElementById("txtMobile").select();
        return false;
    }
    else if (document.getElementById("txtaddress").value =="") {
        alert("請輸入公司所在地");
        document.getElementById("txtaddress").focus();
        return false;
    }
    else if (document.getElementById("txtTel").value =="") {
        alert("請輸入座機");
        document.getElementById("txtTel").focus();
        return false;
    }
    else if (document.getElementById("txtUsername").value == "") {
        alert("請輸入聯繫人名稱");
        document.getElementById("txtUsername").focus();
        return false;
    }
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/WebService/Common.asmx/AddMessageShare",
        data: "{title:'" +"在線留言"+ "',username:'" + $("#txtUserName").val() + "',company:'" + $("#txtCompany").val() +
        "',tel:'" + $("#txtTel").val() + "',mobile:'" + $("#txtMobile").val() + "',fax:'" + "" + "',zip:'" + "" + "',email:'" +"" +
        "',qq:'" + "" + "',address:'" + $("#txtaddress").val() + "',content:'" + "" + "',url:'" + "" + "',industry:'" + "" +
        "',province:'" + "" + "',city:'" + "" + "',county:'" + "" + "',post:'" + "" + "',type:'1" + "',hasValiCode:'" + "0" +
        "',checkcode:'" + "" + "',ip:'" + ip + "'}",
        dataType: 'json',
        success: function(re) {
                alert(re.d);
        }
    })
} 

function SendMessEn()
{
    var reg1 = /^1\d{10}$/;
    var ip = "";
    var address="";
    if(document.getElementById("txtTitle").value=="")
    {
        alert("Please enter the message topic");
        document.getElementById("txtTitle").focus();
        return false;
    }
    else if(document.getElementById("txtMobile").value=="")
    {
        alert("Please enter the mobile number");
        document.getElementById("txtMobile").focus();
        return false;
    }
    else if(!reg1.test(document.getElementById("txtMobile").value))
    {
        alert("Format is incorrect");
        document.getElementById("txtMobile").focus();
        return false;
    }
    else if(document.getElementById("txtContent").value=="")
    {
        alert("Please enter the message content");
        document.getElementById("txtContent").focus();
        return false;
    }
    else if(strlen(document.getElementById("txtContent").value)>500)
    {
        alert("No more than 500 characters");
        document.getElementById("txtContent").focus();
        return false;
    }
    else if(document.getElementById("ChkCode").value=="")
    {
        alert("Please enter the verification code");
        document.getElementById("ChkCode").focus();
        return false;
    } 
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/WebService/Common.asmx/AddMessageShareEn",
        data: "{title:'" + $("#txtTitle").val() + "',username:'" + $("#txtUserName").val() + "',company:'" + $("#txtCompany").val() + 
        "',tel:'" + $("#txtTel").val() + "',mobile:'" + $("#txtMobile").val() + "',fax:'" + "" + "',zip:'" + "" + "',email:'" + $("#txtEmail").val() + 
        "',qq:'" + $("#txtQQ").val() + "',address:'" + address + "',content:'" + $("#txtContent").val() + "',url:'" + "" + "',industry:'" + "" + 
        "',province:'" + "" + "',city:'" + "" + "',county:'" + "" + "',post:'" + "" + "',type:'1" + "',hasValiCode:'" + "1" + 
        "',checkcode:'" + $("#ChkCode").val() + "',ip:'" + ip + "'}",
        dataType: 'json',
        success: function(re) {
            if(re.d=="0")
            {
                alert("Verification code error");
                document.getElementById("ChkCode").focus();
            }
            else
            {
                $("#imgCode").click();
                alert(re.d); 
                emptyText('tbForm1');
                //window.location.href="../html/MessageOnline.html";  
            }       
        }
    })      
} 

function SendMess2()
{
    var reg1 = /^1\d{10}$/;
    var ip = "";
    if(document.getElementById("txtUserName").value=="")
    {
        alert("請輸入姓名");
        document.getElementById("txtUserName").focus();
        return false;
    }
    else if(document.getElementById("txtMobile").value=="")
    {
        alert("請輸入手機號碼");
        document.getElementById("txtMobile").focus();
        return false;
    }
    else if(!reg1.test(document.getElementById("txtMobile").value))
    {
        alert("手機號碼格式不正確");
        document.getElementById("txtMobile").focus();
        document.getElementById("txtMobile").select();
        return false;
    }
    else if(document.getElementById("txtCompany").value=="")
    {
        alert("請輸入公司名稱");
        document.getElementById("txtCompany").focus();
        return false;
    }
    var title="客戶填寫資料獲取優惠券";
    var tel="";
    var qq="";
    var post="";
    var content="客戶填寫資料獲取優惠券";
    var picture="";
    var picturesmall="";
    var checkcode="";
    var ip="";
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/WebService/Common.asmx/AddMessageShare",
        data: "{title:'" + title + "',username:'" + $("#txtUserName").val() + "',company:'" + $("#txtCompany").val() + 
        "',tel:'" + tel + "',mobile:'" + $("#txtMobile").val() + "',fax:'" + "" + "',zip:'" + "" + "',email:'" + $("#txtEmail").val() + 
        "',qq:'" + qq + "',address:'" + "" + "',content:'" + content + "',url:'" + "" + "',industry:'" + "" + "',province:'" + "" + 
        "',city:'" + "" + "',county:'" + "" + "',post:'" + "" + "',type:'1" + "',hasValiCode:'" + "0" + "',checkcode:'" + checkcode + "',ip:'" + ip + "'}",
        dataType: 'json',
        success: function(re) {
            document.getElementById("txtUserName").value="";
            document.getElementById("txtMobile").value="";
            document.getElementById("txtCompany").value="";
            if(re.d=="0")
            {
                alert("驗證碼錯誤！！");
            }
            else
            { 
                alert("提交成功！謝謝您對我們的信任！"); 
            }     
        }     
    })      
} 

function SendMess2En()
{
    var reg1 = /^1\d{10}$/;
    var ip = "";
    if(document.getElementById("txtUserName").value=="")
    {
        alert("Please enter your name");
        document.getElementById("txtUserName").focus();
        return false;
    }
    else if(document.getElementById("txtMobile").value=="")
    {
        alert("Please enter your mobile");
        document.getElementById("txtMobile").focus();
        return false;
    }
    else if(!reg1.test(document.getElementById("txtMobile").value))
    {
        alert("Format is incorrect");
        document.getElementById("txtMobile").focus();
        return false;
    }
    else if(document.getElementById("txtCompany").value=="")
    {
        alert("Please enter your company name");
        document.getElementById("txtCompany").focus();
        return false;
    }
    else if(document.getElementById("txtEmail").value=="")
    {
        alert("Please enter your email");
        document.getElementById("txtEmail").focus();
        return false;
    }
    var title="Customers fill out the information to get coupons";
    var tel="";
    var qq="";
    var post="";
    var content="Customers fill out the information to get coupons";
    var picture="";
    var picturesmall="";
    var checkcode="";
    var ip="";
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/WebService/Common.asmx/AddMessageShareEn",
        data: "{title:'" + title + "',username:'" + $("#txtUserName").val() + "',company:'" + $("#txtCompany").val() + 
        "',tel:'" + tel + "',mobile:'" + $("#txtMobile").val() + "',fax:'" + "" + "',zip:'" + "" + "',email:'" + $("#txtEmail").val() + 
        "',qq:'" + qq + "',address:'" + "" + "',content:'" + content + "',url:'" + "" + "',industry:'" + "" + "',province:'" + "" + 
        "',city:'" + "" + "',county:'" + "" + "',post:'" + "" + "',type:'1" + "',hasValiCode:'" + "0" + "',checkcode:'" + checkcode + "',ip:'" + ip + "'}",
        dataType: 'json',
        success: function(re) {
            document.getElementById("txtUserName").value="";
            document.getElementById("txtMobile").value="";
            document.getElementById("txtCompany").value="";
            document.getElementById("txtEmail").value="";
            if(re.d=="0")
            {
                alert("Verification code error");
            }
            else
            { 
                alert("Success！Thank you for your trust to us"); 
            }     
        }     
    })      
}  

function BuyProduct()
{
    var reg1 = /^1\d{10}$/;
    var ip = "";
    var qq ="";
    var title ="採購產品："+document.getElementById("Hidden3").value;
    if(document.getElementById("txtUserName").value=="")
    {
        alert("請輸入您的真實姓名");
        document.getElementById("txtUserName").focus();
        return false;
    }
    else if(document.getElementById("txtMobile").value=="")
    {
        alert("請輸入您的手機號碼");
        document.getElementById("txtMobile").focus();
        return false;
    }
    else if(!reg1.test(document.getElementById("txtMobile").value))
    {
        alert("手機號碼格式不正確");
        document.getElementById("txtMobile").focus();
        return false;
    }
    else if(document.getElementById("txtConten").value=="")
    {
        alert("請輸入採購意向");
        document.getElementById("txtConten").focus();
        return false;
    }
    else if(strlen(document.getElementById("txtConten").value)>500)
    {
        alert("最多不超過500個字符");
        document.getElementById("txtConten").focus();
        return false;
    }
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/WebService/Common.asmx/AddMessageShare",
        data: "{title:'" + title + "',username:'" + $("#txtUserName").val() + "',company:'" + $("#txtCompany").val() + 
        "',tel:'" + $("#txtTel").val() + "',mobile:'" + $("#txtMobile").val() + "',fax:'" + "" + "',zip:'" + "" + "',email:'" + $("#txtEmail").val() + 
        "',qq:'" + qq + "',address:'" + $("#txtAddress").val() + "',content:'" + $("#txtConten").val() + "',url:'" + "" + "',industry:'" + "" + "',province:'" + "" + 
        "',city:'" + "" + "',county:'" + "" + "',post:'" + "" + "',type:'2" + "',hasValiCode:'" + "0" + "',checkcode:'" + "" + "',ip:'" + ip + "'}",
        dataType: 'json',
        success: function(re) {
            if(re.d=="0")
            {
                alert("驗證碼錯誤！！");
                document.getElementById("ChkCode").focus();
            }
            else
            {
                alert(re.d); 
                emptyText('tbForm1');
            }     
        }     
    })      
}

function BuyProductEn()
{
    var reg1 = /^1\d{10}$/;
    var ip = "";
    var qq ="";
    var title ="Buy："+document.getElementById("Hidden3").value;
    if(document.getElementById("txtUserName").value=="")
    {
        alert("Please enter your real name");
        document.getElementById("txtUserName").focus();
        return false;
    }
    else if(document.getElementById("txtMobile").value=="")
    {
        alert("Please enter your moblie");
        document.getElementById("txtMobile").focus();
        return false;
    }
    else if(!reg1.test(document.getElementById("txtMobile").value))
    {
        alert("Format is incorrect");
        document.getElementById("txtMobile").focus();
        return false;
    }
    else if(document.getElementById("txtConten").value=="")
    {
        alert("Please enter your description");
        document.getElementById("txtConten").focus();
        return false;
    }
    else if(strlen(document.getElementById("txtConten").value)>500)
    {
        alert("No more than 500 characters");
        document.getElementById("txtConten").focus();
        return false;
    }
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/WebService/Common.asmx/AddMessageShareEn",
        data: "{title:'" + title + "',username:'" + $("#txtUserName").val() + "',company:'" + $("#txtCompany").val() + 
        "',tel:'" + $("#txtTel").val() + "',mobile:'" + $("#txtMobile").val() + "',fax:'" + "" + "',zip:'" + "" + "',email:'" + $("#txtEmail").val() + 
        "',qq:'" + qq + "',address:'" + $("#txtAddress").val() + "',content:'" + $("#txtConten").val() + "',url:'" + "" + "',industry:'" + "" + "',province:'" + "" + 
        "',city:'" + "" + "',county:'" + "" + "',post:'" + "" + "',type:'2" + "',hasValiCode:'" + "0" + "',checkcode:'" + "" + "',ip:'" + ip + "'}",
        dataType: 'json',
        success: function(re) {
            if(re.d=="0")
            {
                alert("Verification code error");
                document.getElementById("ChkCode").focus();
            }
            else
            {
                alert(re.d); 
                emptyText('tbForm1');
            }     
        }     
    })      
}

function CheckName()
{
    var reg2= /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if(document.getElementById("txtLoginName").value=="")
    {
        alert("請輸入登錄名");
        document.getElementById("txtLoginName").focus();
        return false;
    }
    else if(document.getElementById("txtPassword").value=="")
    {
        alert("請輸入密碼");
        document.getElementById("txtPassword").focus();
        return false;
    }
    else if(document.getElementById("ChkCode").value=="")
    {
        alert("請輸入驗證碼");
        document.getElementById("ChkCode").focus();
        return false;
    }

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/WebService/Common.asmx/Login",
        data: "{LoginName:'" + $("#txtLoginName").val() + "',Password:'" + $("#txtPassword").val() + "',CheckCode:'" + $("#ChkCode").val() + "'}",
        dataType: 'json',
        success: function(re) {
            if(re.d=="0")
            {
                alert("驗證碼錯誤！！");
                document.getElementById("ChkCode").focus();
            }
            else if(re.d=="-1")
            {
                alert("登錄名或密碼錯誤！！");
                document.getElementById("txtLoginName").value="";
                document.getElementById("txtPassword").value="";
                document.getElementById("txtLoginName").focus();
            }
            else if(re.d=="-2")
            {
                alert("該會員未經管理員審核，請待審核通過後再登錄！！");
                document.getElementById("txtLoginName").value="";
                document.getElementById("txtPassword").value="";
                document.getElementById("txtLoginName").focus();
            }
            else
            {
                alert("登錄成功！"); 
                window.location.href="http://www.taiyangjx.com/Member"; 
            }       
        }
    })   
}

function CheckNameEn()
{
    var reg2= /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if(document.getElementById("txtLoginName").value=="")
    {
        alert("Please enter the login name");
        document.getElementById("txtLoginName").focus();
        return false;
    }
    else if(document.getElementById("txtPassword").value=="")
    {
        alert("Please enter the password");
        document.getElementById("txtPassword").focus();
        return false;
    }
    else if(document.getElementById("ChkCode").value=="")
    {
        alert("Please enter the verification code");
        document.getElementById("ChkCode").focus();
        return false;
    }

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/WebService/Common.asmx/LoginEn",
        data: "{LoginName:'" + $("#txtLoginName").val() + "',Password:'" + $("#txtPassword").val() + "',CheckCode:'" + $("#ChkCode").val() + "'}",
        dataType: 'json',
        success: function(re) {
            if(re.d=="0")
            {
                alert("Verification code error");
                document.getElementById("ChkCode").focus();
            }
            else if(re.d=="-1")
            {
                alert("Login name or password is incorrect");
                document.getElementById("txtLoginName").value="";
                document.getElementById("txtPassword").value="";
                document.getElementById("txtLoginName").focus();
            }
            else if(re.d=="-2")
            {
                alert("Login failed");
                document.getElementById("txtLoginName").value="";
                document.getElementById("txtPassword").value="";
                document.getElementById("txtLoginName").focus();
            }
            else
            {
                alert("Login successful"); 
                window.location.href="http://www.taiyangjx.com/En/Member"; 
            }       
        }
    })   
}

function CheckName2()
{
    var reg2= /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if(document.getElementById("txtLoginName").value=="")
    {
        alert("請輸入登錄名");
        document.getElementById("txtLoginName").focus();
        return false;
    }
    else if(document.getElementById("txtPassword").value=="")
    {
        alert("請輸入密碼");
        document.getElementById("txtPassword").focus();
        return false;
    }

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/WebService/Common.asmx/Login",
        data: "{LoginName:'" + $("#txtLoginName").val() + "',Password:'" + $("#txtPassword").val() + "',CheckCode:'" + "0" + "'}",
        dataType: 'json',
        success: function(re) {
            if(re.d=="0")
            {
                alert("驗證碼錯誤！！");
                document.getElementById("ChkCode").focus();
            }
            else if(re.d=="-1")
            {
                alert("登錄名或密碼錯誤！！");
                document.getElementById("txtLoginName").value="";
                document.getElementById("txtPassword").value="";
                document.getElementById("txtLoginName").focus();
            }
            else if(re.d=="-2")
            {
                alert("該會員未經管理員審核，請待審核通過後再登錄！！");
                document.getElementById("txtLoginName").focus();
            }
            else
            {
                document.getElementById("divLoginNo").style.display="none";
                document.getElementById("divLoginYes").style.display="block";
                document.getElementById("loginName").innerHTML=re.d;
            }       
        }
    })   
}

function CheckName2En()
{
    var reg2= /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if(document.getElementById("txtLoginName").value=="")
    {
        alert("Please enter the login name");
        document.getElementById("txtLoginName").focus();
        return false;
    }
    else if(document.getElementById("txtPassword").value=="")
    {
        alert("Please enter the password");
        document.getElementById("txtPassword").focus();
        return false;
    }

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/WebService/Common.asmx/LoginEn",
        data: "{LoginName:'" + $("#txtLoginName").val() + "',Password:'" + $("#txtPassword").val() + "',CheckCode:'" + "0" + "'}",
        dataType: 'json',
        success: function(re) {
            if(re.d=="0")
            {
                alert("Verification code error");
                document.getElementById("ChkCode").focus();
            }
            else if(re.d=="-1")
            {
                alert("Login name or password is incorrect");
                document.getElementById("txtLoginName").value="";
                document.getElementById("txtPassword").value="";
                document.getElementById("txtLoginName").focus();
            }
            else if(re.d=="-2")
            {
                alert("Login failed");
                document.getElementById("txtLoginName").focus();
            }
            else
            {
                document.getElementById("divLoginNo").style.display="none";
                document.getElementById("divLoginYes").style.display="block";
                document.getElementById("loginName").innerHTML=re.d;
            }       
        }
    })   
}

function CheckNameCart()
{
    var reg2= /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if(document.getElementById("txtLoginName").value=="")
    {
        alert("請輸入登錄名");
        document.getElementById("txtLoginName").focus();
        return false;
    }
    else if(document.getElementById("txtPassword").value=="")
    {
        alert("請輸入密碼");
        document.getElementById("txtPassword").focus();
        return false;
    }
    else if(document.getElementById("ChkCode").value=="")
    {
        alert("請輸入驗證碼");
        document.getElementById("ChkCode").focus();
        return false;
    }

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/WebService/Common.asmx/Login",
        data: "{LoginName:'" + $("#txtLoginName").val() + "',Password:'" + $("#txtPassword").val() + "',CheckCode:'" + $("#ChkCode").val() + "'}",
        dataType: 'json',
        success: function(re) {
            if(re.d=="0")
            {
                alert("驗證碼錯誤！！");
                document.getElementById("ChkCode").focus();
            }
            else if(re.d=="-1")
            {
                alert("登錄名或密碼錯誤！！");
                document.getElementById("txtLoginName").value="";
                document.getElementById("txtPassword").value="";
                document.getElementById("txtLoginName").focus();
            }
            else if(re.d=="-2")
            {
                alert("該會員未經管理員審核，請待審核通過後再登錄！！");
                document.getElementById("txtLoginName").value="";
                document.getElementById("txtPassword").value="";
                document.getElementById("txtLoginName").focus();
            }
            else
            {
                //alert("登錄成功！"); 
                window.location.href="../flash/Error.html-aspxerrorpath=-js-Cart.aspx.htm"/*tpa=http://www.taiyangjx.com/js/Cart.aspx*/; 
            }       
        }
    })   
}

function OrderProduct()
{
    var reg1 = /^1\d{10}$/;
    var reg2 = /^\d{1,9}$/;
    var ip = "";
    if(document.getElementById("txtProductName").value=="")
    {
        alert("請輸入產品名稱");
        document.getElementById("txtProductName").focus();
        return false;
    }
    else if(document.getElementById("txtNumber").value=="")
    {
        alert("請輸入訂購數量");
        document.getElementById("txtNumber").focus();
        return false;
    }
    else if(!reg2.test(document.getElementById("txtNumber").value))
    {
        alert("訂購數量格式不正確");
        document.getElementById("txtNumber").focus();
        return false;
    }
    else if(document.getElementById("txtCompany").value=="")
    {
        alert("請輸入公司名稱");
        document.getElementById("txtCompany").focus();
        return false;
    }
    else if(document.getElementById("txtName").value=="")
    {
        alert("請輸入姓名");
        document.getElementById("txtName").focus();
        return false;
    }
    else if(document.getElementById("txtPhone").value=="")
    {
        alert("請輸入電話號碼");
        document.getElementById("txtPhone").focus();
        return false;
    }
    else if(document.getElementById("txtAddress").value=="")
    {
        alert("請輸入詳細地址");
        document.getElementById("txtAddress").focus();
        return false;
    }
    else if(document.getElementById("ChkCode").value=="")
    {
        alert("請輸入驗證碼");
        document.getElementById("ChkCode").focus();
        return false;
    } 
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/WebService/Common.asmx/AddOrder",
        data: "{productname:'" + $("#txtProductName").val() + "',number:'" + $("#txtNumber").val() + "',description:'" + $("#txtDescription").val() +
        "',company:'" + $("#txtCompany").val() + "',web:'" + $("#txtWeb").val() + "',name:'" + $("#txtName").val() + "',phone:'" + $("#txtPhone").val() +
        "',mobile:'" + $("#txtMobile").val() + "',email:'" + $("#txtEmail").val() + "',fax:'" + $("#txtFax").val() + "',zip:'" + $("#txtZip").val() +
        "',address:'" + $("#txtAddress").val() + "',checkcode:'" + $("#ChkCode").val() + "',ip:'" + ip + "'}",
        dataType: 'json',
        success: function(re) {
            if(re.d=="0")
            {
                alert("驗證碼錯誤！！");
                document.getElementById("ChkCode").focus();
            }
            else if(re.d=="-1")
            {
                alert("您輸入的產品不存在！！");
                document.getElementById("txtProductName").focus();
            }
            else
            {
                $("#imgCode").click();
                alert(re.d); 
                emptyText('tbForm1');
                //window.location.href="../html/OrderOnline.html";
            }               
        }
    })      
} 

function OrderProductEn()
{
    var reg1 = /^1\d{10}$/;
    var reg2 = /^\d{1,9}$/;
    var ip = "";
    if(document.getElementById("txtProductName").value=="")
    {
        alert("Please enter the product name");
        document.getElementById("txtProductName").focus();
        return false;
    }
    else if(document.getElementById("txtNumber").value=="")
    {
        alert("Please enter the order quantity");
        document.getElementById("txtNumber").focus();
        return false;
    }
    else if(!reg2.test(document.getElementById("txtNumber").value))
    {
        alert("Order number format is incorrect");
        document.getElementById("txtNumber").focus();
        return false;
    }
    else if(document.getElementById("txtCompany").value=="")
    {
        alert("Please enter the company name");
        document.getElementById("txtCompany").focus();
        return false;
    }
    else if(document.getElementById("txtName").value=="")
    {
        alert("Please enter your name");
        document.getElementById("txtName").focus();
        return false;
    }
    else if(document.getElementById("txtPhone").value=="")
    {
        alert("Please enter your telephone");
        document.getElementById("txtPhone").focus();
        return false;
    }
    else if(document.getElementById("txtAddress").value=="")
    {
        alert("Please enter your address");
        document.getElementById("txtAddress").focus();
        return false;
    }
    else if(document.getElementById("ChkCode").value=="")
    {
        alert("Please enter the verification code");
        document.getElementById("ChkCode").focus();
        return false;
    } 
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/WebService/Common.asmx/AddOrderEn",
        data: "{productname:'" + $("#txtProductName").val() + "',number:'" + $("#txtNumber").val() + "',description:'" + $("#txtDescription").val() +
        "',company:'" + $("#txtCompany").val() + "',web:'" + $("#txtWeb").val() + "',name:'" + $("#txtName").val() + "',phone:'" + $("#txtPhone").val() +
        "',mobile:'" + $("#txtMobile").val() + "',email:'" + $("#txtEmail").val() + "',fax:'" + $("#txtFax").val() + "',zip:'" + $("#txtZip").val() +
        "',address:'" + $("#txtAddress").val() + "',checkcode:'" + $("#ChkCode").val() + "',ip:'" + ip + "'}",
        dataType: 'json',
        success: function(re) {
            if(re.d=="0")
            {
                alert("Verification code error");
                document.getElementById("ChkCode").focus();
            }
            else if(re.d=="-1")
            {
                alert("The product does not exist");
                document.getElementById("txtProductName").focus();
            }
            else
            {
                $("#imgCode").click();
                alert(re.d); 
                emptyText('tbForm1');
                //window.location.href="../html/OrderOnline.html";  
            }         
        }
    })      
} 

function OrderProduct2()
{
    var reg1 = /^1[3,5,8]\d{9}$/;
    var reg2 = /^\d{1,9}$/;
    if(document.getElementById("txtCompany").value=="")
    {
        alert("請輸入公司名稱");
        document.getElementById("txtCompany").focus();
        return false;
    }
    else if(document.getElementById("txtPhone").value=="")
    {
        alert("請輸入聯繫電話");
        document.getElementById("txtPhone").focus();
        return false;
    }
    else if(document.getElementById("ChkCode").value=="")
    {
        alert("請輸入驗證碼");
        document.getElementById("ChkCode").focus();
        return false;
    } 
    var productname="";
    var number="1";
    var web="";
    var fax="";
    var zip="";
    var ip="";
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/WebService/Common.asmx/AddOrder",
        data: "{productname:'" + productname + "',number:'" + number + "',description:'" + $("#txtDescription").val() +
        "',company:'" + $("#txtCompany").val() + "',web:'" + web + "',name:'" + $("#txtName").val() + "',phone:'" + $("#txtPhone").val() + 
        "',mobile:'" + $("#txtMobile").val() + "',email:'" + $("#txtEmailOrder").val() + "',fax:'" + fax +"',zip:'" + zip +
        "',address:'" + $("#txtAddress").val() + "',checkcode:'" + $("#ChkCode").val() + "',ip:'" + ip + "'}",
        dataType: 'json',
        success: function(re) {
            if(re.d=="0")
            {
                alert("驗證碼錯誤！！");
                document.getElementById("ChkCode").focus();
            }
            else if(re.d=="-1")
            {
                alert("您輸入的產品不存在！！");
                document.getElementById("txtProductName").focus();
            }
            else
            {
                alert(re.d); 
                emptyText('tbForm1');
            }               
        }
    })      
} 

function OrderProduct2En()
{
    var reg1 = /^1[3,5,8]\d{9}$/;
    var reg2 = /^\d{1,9}$/;
    if(document.getElementById("txtCompany").value=="")
    {
        alert("Please enter the company name");
        document.getElementById("txtCompany").focus();
        return false;
    }
    else if(document.getElementById("txtPhone").value=="")
    {
        alert("Please enter your telephone");
        document.getElementById("txtPhone").focus();
        return false;
    }
    else if(document.getElementById("ChkCode").value=="")
    {
        alert("Please enter the verification code");
        document.getElementById("ChkCode").focus();
        return false;
    } 
    var productname="";
    var number="1";
    var web="";
    var fax="";
    var zip="";
    var ip="";
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/WebService/Common.asmx/AddOrderEn",
        data: "{productname:'" + productname + "',number:'" + number + "',description:'" + $("#txtDescription").val() +
        "',company:'" + $("#txtCompany").val() + "',web:'" + web + "',name:'" + $("#txtName").val() + "',phone:'" + $("#txtPhone").val() +
        "',mobile:'" + $("#txtMobile").val() + "',email:'" + $("#txtEmailOrder").val() + "',fax:'" + fax + "',zip:'" + zip +
        "',address:'" + $("#txtAddress").val() + "',checkcode:'" + $("#ChkCode").val() + "',ip:'" + ip + "'}",
        dataType: 'json',
        success: function(re) {
            if(re.d=="0")
            {
                alert("Verification code error");
                document.getElementById("ChkCode").focus();
            }
            else if(re.d=="-1")
            {
                alert("The product does not exist");
                document.getElementById("txtProductName").focus();
            }
            else
            {
                alert(re.d); 
                emptyText('tbForm1');
            }         
        }
    })      
} 

function AddFriendLink()
{
    var reg1 = /^[1-9]\d{4,15}$/;
    var reg2 = /(http[s]?|ftp):\/\/[^\/\.]+?\..+\w$/i;
    var ip = "";
    var selType = $('input[name="rdoState"]:checked').val();
    if(document.getElementById("txtName").value=="")
    {
        alert("請輸入網站名稱");
        document.getElementById("txtName").focus();
        return false;
    }
    else if(document.getElementById("txtUrl").value=="")
    {
        alert("請輸入網站地址");
        document.getElementById("txtUrl").focus();
        return false;
    }
    else if(!reg2.test(document.getElementById("txtUrl").value.replace(/\ /g,"")))
    {
        alert("格式不正確");
        document.getElementById("txtUrl").focus();
        return false;
    }
    else if(!reg2.test(document.getElementById("txtLogo").value) && document.getElementById("txtLogo").value!="")
    {
        alert("格式不正確");
        document.getElementById("txtLogo").focus();
        return false;
    }
    else if(document.getElementById("txtQQ").value=="")
    {
        alert("請輸入QQ號碼");
        document.getElementById("txtQQ").focus();
        return false;
    }
    else if(!reg1.test(document.getElementById("txtQQ").value))
    {
        alert("格式不正確");
        document.getElementById("txtQQ").focus();
        return false;
    }
    else if(document.getElementById("ChkCode").value=="")
    {
        alert("請輸入驗證碼");
        document.getElementById("ChkCode").focus();
        return false;
    } 
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/WebService/Common.asmx/AddFriendLink",
        data: "{name:'" + $("#txtName").val() + "',url:'" + $("#txtUrl").val().replace(/\ /g,"") + "',logo:'" + $("#txtLogo").val() + 
        "',type:'" + selType + "',remark:'" + $("#txtRemark").val() + "',qq:'" + $("#txtQQ").val() + 
        "',phone:'" + $("#txtPhone").val() + "',checkcode:'" + $("#ChkCode").val() + "',ip:'" + ip + "'}",
        dataType: 'json',
        success: function(re) {
            if(re.d=="0")
            {
                alert("驗證碼錯誤！！");
                document.getElementById("ChkCode").focus();
            }
            else
            {
                $("#imgCode").click();
                alert(re.d);
                emptyText('tbForm1');
                //window.location.href="../html/FriendLinkAdd.html";
            }        
        }
    })      
} 

function AddFriendLinkEn()
{
    var reg1 = /^[1-9]\d{4,15}$/;
    var reg2 = /(http[s]?|ftp):\/\/[^\/\.]+?\..+\w$/i;
    var ip = "";
    var selType = $('input[name="rdoState"]:checked').val();
    if(document.getElementById("txtName").value=="")
    {
        alert("Please enter the name of the site");
        document.getElementById("txtName").focus();
        return false;
    }
    else if(document.getElementById("txtUrl").value=="")
    {
        alert("Please enter the site url");
        document.getElementById("txtUrl").focus();
        return false;
    }
    else if(!reg2.test(document.getElementById("txtUrl").value.replace(/\ /g,"")))
    {
        alert("Incorrect format");
        document.getElementById("txtUrl").focus();
        return false;
    }
    else if(!reg2.test(document.getElementById("txtLogo").value) && document.getElementById("txtLogo").value!="")
    {
        alert("Incorrect format");
        document.getElementById("txtLogo").focus();
        return false;
    }
    else if(document.getElementById("txtQQ").value=="")
    {
        alert("Please enter your QQ number");
        document.getElementById("txtQQ").focus();
        return false;
    }
    else if(!reg1.test(document.getElementById("txtQQ").value))
    {
        alert("Incorrect format");
        document.getElementById("txtQQ").focus();
        return false;
    }
    else if(document.getElementById("ChkCode").value=="")
    {
        alert("Please enter the verification code");
        document.getElementById("ChkCode").focus();
        return false;
    } 
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/WebService/Common.asmx/AddFriendLinkEn",
        data: "{name:'" + $("#txtName").val() + "',url:'" + $("#txtUrl").val().replace(/\ /g,"") + "',logo:'" + $("#txtLogo").val() +
        "',type:'" + selType + "',remark:'" + $("#txtRemark").val() + "',qq:'" + $("#txtQQ").val() +
        "',phone:'" + $("#txtPhone").val() + "',checkcode:'" + $("#ChkCode").val() + "',ip:'" + ip + "'}",
        dataType: 'json',
        success: function(re) {
            if(re.d=="0")
            {
                alert("Verification code error");
                document.getElementById("ChkCode").focus();
            }
            else
            {
                $("#imgCode").click();
                alert(re.d);
                emptyText('tbForm1');
                //window.location.href="../html/FriendLinkAdd.html";
            }            
        }
    })      
} 

function SendJob()
{
    var reg1 = /^1\d{10}$/;
    var ip = "";
    if(document.getElementById("txtName").value=="")
    {
        alert("請輸入姓名");
        document.getElementById("txtName").focus();
        return false;
    }
    else if(document.getElementById("txtBirthday").value=="")
    {
        alert("請輸入出生日期");
        document.getElementById("txtBirthday").focus();
        return false;
    }
    else if(document.getElementById("txtTelephone").value=="")
    {
        alert("請輸入聯繫電話");
        document.getElementById("txtTelephone").focus();
        return false;
    }
    else if(document.getElementById("txtResumes").value=="")
    {
        alert("請輸入個人簡歷");
        document.getElementById("txtResumes").focus();
        return false;
    }
    else if(document.getElementById("ChkCode").value=="")
    {
        alert("請輸入驗證碼");
        document.getElementById("ChkCode").focus();
        return false;
    } 
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/WebService/Common.asmx/AddJob",
        data: "{EmployId:'" + $("#hfId").val() + "',PostName:'" + $("#hfPostName").val() + "',Name:'" + $("#txtName").val() + 
        "',Sex:'" + $("#ddlSex").val() + "',Birthday:'" + $("#txtBirthday").val() + "',Telephone:'" + $("#txtTelephone").val() + 
        "',Email:'" + $("#txtEmail").val() + "',StudyDegree:'" + $("#txtStudyDegree").val() + "',Ability:'" + $("#txtAbility").val() + 
        "',Resumes:'" + $("#txtResumes").val() + "',CheckCode:'" + $("#ChkCode").val() + "'}",
        dataType: 'json',
        success: function(re) {
            if(re.d=="0")
            {
                alert("驗證碼錯誤！！");
                document.getElementById("ChkCode").focus();
            }
            else
            {
                alert(re.d);
                window.close();
                window.location.reload();  
            }            
        }
    }) 
} 

function SendJobEn()
{
    var reg1 = /^1\d{10}$/;
    var ip = "";
    if(document.getElementById("txtName").value=="")
    {
        alert("Please enter your name");
        document.getElementById("txtName").focus();
        return false;
    }
    else if(document.getElementById("txtBirthday").value=="")
    {
        alert("Please enter your birthday");
        document.getElementById("txtBirthday").focus();
        return false;
    }
    else if(document.getElementById("txtTelephone").value=="")
    {
        alert("Please enter your telephone");
        document.getElementById("txtTelephone").focus();
        return false;
    }
    else if(document.getElementById("txtResumes").value=="")
    {
        alert("Please enter your resume");
        document.getElementById("txtResumes").focus();
        return false;
    }
    else if(document.getElementById("ChkCode").value=="")
    {
        alert("Please enter the verification code");
        document.getElementById("ChkCode").focus();
        return false;
    } 
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/WebService/Common.asmx/AddJobEn",
        data: "{EmployId:'" + $("#hfId").val() + "',PostName:'" + $("#hfPostName").val() + "',Name:'" + $("#txtName").val() + 
        "',Sex:'" + $("#ddlSex").val() + "',Birthday:'" + $("#txtBirthday").val() + "',Telephone:'" + $("#txtTelephone").val() + 
        "',Email:'" + $("#txtEmail").val() + "',StudyDegree:'" + $("#txtStudyDegree").val() + "',Ability:'" + $("#txtAbility").val() + 
        "',Resumes:'" + $("#txtResumes").val() + "',CheckCode:'" + $("#ChkCode").val() + "'}",
        dataType: 'json',
        success: function(re) {
            if(re.d=="0")
            {
                alert("Verification code error");
                document.getElementById("ChkCode").focus();
            }
            else
            {
                alert(re.d);
                window.close();
                window.location.reload(); 
            }            
        }
    }) 
} 
