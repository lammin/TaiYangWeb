var tdTemp = document.getElementById("TopMenu").getElementsByTagName("li");
var temp = 0;
if (document.getElementById("temp")) {
    temp = document.getElementById("temp").value;
}
var elements = [];
for (var i = 0; i < tdTemp.length; i++) {
    elements.push(tdTemp[i]);
}
for (var i = 0; i < elements.length; i++) {
    if(temp!=i) {
        elements[i].onmouseover = function() {
            for (var j = 0; j < elements.length; j++) {
                if(temp==j) elements[j].className = "select";
                else  elements[j].className = "";
            }
            this.className = "select";   
        }
        elements[i].onmouseout = function() {
            for (var j = 0; j < elements.length; j++) {
                if(temp==j) elements[j].className = "select";
                else elements[j].className = "";
            }
        }
    }
    else {
        elements[i].className = "select";
    }
}
