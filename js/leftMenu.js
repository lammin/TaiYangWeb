function SwitchMenu(obj){
	if(document.getElementById){
        var sub = document.getElementById("sub"+obj);
        var Usub = document.getElementById("Usub"+obj);
        var ul = document.getElementById("masterdiv").getElementsByTagName("ul");  
        var dl = document.getElementById("masterdiv").getElementsByTagName("dl"); 
        if(sub.style.display != "block"){  
	        for (var i=0; i<ul.length; i++){
		        if (ul[i].className=="submenu") ul[i].style.display = "none";   
	        }
	        sub.style.display = "block";
        }
        else{
	        sub.style.display = "none";
        }

        if(Usub.className != "menutitle") {
            for (var i=0; i<dl.length; i++){ 
		        dl[i].className = "menutitle";
            }
            Usub.className = "menutitle";   
        }
        else {
            for (var i=0; i<dl.length; i++){ 
		        dl[i].className = "menutitle";
            }
            Usub.className = "menutitleSub";
        }
    }
}

function SwitchLiMenu() {
    var BidClass=parseInt(document.getElementById("hiBidClass").value);
	var SubClass=parseInt(document.getElementById("hiSubClass").value);
	//alert(BidClass);
	//alert(SubClass);
    if(BidClass>0 && SubClass==0) {
        if(document.getElementById("Usub"+BidClass)) {
            var dl=document.getElementById("Usub"+BidClass);
            dl.className="menutitleSub";
        }
    }
    else if(BidClass>0 && SubClass>0) {
        if(document.getElementById("li"+BidClass+"_"+SubClass)) {
            var li=document.getElementById("li"+BidClass+"_"+SubClass);
            li.className="checkstyleSel";
        }
    }
}

function SwitchMenu2(obj){
	if(document.getElementById){
        var el = document.getElementById("sub"+obj);
        var icon = document.getElementById("Usub"+obj);
        var ar = document.getElementById("masterdiv").getElementsByTagName("ul");  
        if(el.style.display != "block"){  
	        for (var i=0; i<ar.length; i++){
		        if (ar[i].className=="submenu") ar[i].style.display = "none";
	        }
	        el.style.display = "block";
	        icon.className="menutitleSub";
        }
        else{
	        el.style.display = "none";
	        icon.className="menutitle";
        }
    }
}

function SwitchMenu3(obj){
	if(document.getElementById){
        var el = document.getElementById("sub"+obj);
        var ar = document.getElementById("masterdiv").getElementsByTagName("ul");  
        if(el.style.display != "block"){  
	        for (var i=0; i<ar.length; i++){
		        if (ar[i].className=="submenu")  
		        ar[i].style.display = "none";
	        }
	        el.style.display = "block";
        }
        else{
	        el.style.display = "none";
        }
    }
}
