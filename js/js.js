$(document).ready(function() {
    $("#txtKeywords").keypress(function(event){
        if(event.keyCode == 13){
            CheckInput();
        }          
    });
});

//function Click(){ 
//    alert('歡迎您！'); 
//    window.event.returnValue=false; 
//} 
//document.oncontextmenu=Click;

//禁止鼠標右鍵
//document.oncontextmenu=new Function("event.returnValue=false"); 
//document.onselectstart=new Function("event.returnValue=false"); 
//document.oncontextmenu=function(e){            
//	return false;       
//}

//更換顯示樣式
function setTab(name,cursel,n){
    for(i=1;i<=n;i++){
        var menu=document.getElementById(name+i);
        var con=document.getElementById("con_"+name+"_"+i);
        menu.className=i==cursel?"hover":"";
        con.style.display=i==cursel?"block":"none";
    }
}

//字體大小轉換
function doZoom(size) { 
    document.getElementById('zoom').style.fontSize = size + 'px'; 
}

function doc(obj){
    return document.getElementById(obj);
}

function resize(h)
{
	doc("sendinquirybox").style.height=h;
}
