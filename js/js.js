$(document).ready(function() {
    $("#txtKeywords").keypress(function(event){
        if(event.keyCode == 13){
            CheckInput();
        }          
    });
});

//function Click(){ 
//    alert('�w��z�I'); 
//    window.event.returnValue=false; 
//} 
//document.oncontextmenu=Click;

//�T��Хk��
//document.oncontextmenu=new Function("event.returnValue=false"); 
//document.onselectstart=new Function("event.returnValue=false"); 
//document.oncontextmenu=function(e){            
//	return false;       
//}

//����ܼ˦�
function setTab(name,cursel,n){
    for(i=1;i<=n;i++){
        var menu=document.getElementById(name+i);
        var con=document.getElementById("con_"+name+"_"+i);
        menu.className=i==cursel?"hover":"";
        con.style.display=i==cursel?"block":"none";
    }
}

//�r��j�p�ഫ
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
