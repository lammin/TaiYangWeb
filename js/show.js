$(function(){
	function setCookie(c_name, value, expiredays)
	{
		var exdate = new Date();
		exdate.setDate(exdate.getDate() + expiredays);
		document.cookie = c_name + "=" + escape(value) + ((expiredays==null) ? "" : ";expires=" + exdate.toGMTString()) + "path = / ;";
	}
	
	function getCookie(name)
	{
	    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
	    if(arr != null) return unescape(arr[2]); return null;
	}
	
	function delCookie(name)
	{
	    var exp = new Date();
	    exp.setTime(exp.getTime() - 1);
	    var cval=getCookie(name);
	    if(cval!=null) document.cookie=name +"="+cval+";expires="+exp.toGMTString();
	}

    $("#view_gallery").click(function(){
		$(".prodes").hide();
		$(".protext").each(function(i){$(this).before($(".proimg").eq(i))});
		$(".proboxlist").removeClass("proboxlist").addClass("probox");
		this.src="../images/viewlist.gif"/*tpa=http://www.taiyangjx.com/images/viewlist.gif*/;
		$("#view_list").attr("src","../images/viewgallery2.gif"/*tpa=http://www.taiyangjx.com/images/viewgallery2.gif*/);
		if(getCookie("tradett")!=1)  setCookie("tradett",1,1)
	})
   
    $("#view_list").click(function(){
		$(".prodes").show();
		$(".protext").each(function(i){$(this).after($(".proimg").eq(i))});
		$(".probox").removeClass("probox").addClass("proboxlist");
		this.src="../images/viewlist.gif"/*tpa=http://www.taiyangjx.com/images/viewlist.gif*/;
		$("#view_gallery").attr("src","../images/viewgallery2.gif"/*tpa=http://www.taiyangjx.com/images/viewgallery2.gif*/);
		if(getCookie("tradett")!=0)  setCookie("tradett",0,1)
	})
	
	if(getCookie("tradett")=="")
	    setCookie("tradett",0,1);
	else if(getCookie("tradett")==1)
        $("#view_gallery").click();
    else if(getCookie("tradett")==0)
        $("#view_list").click();
})