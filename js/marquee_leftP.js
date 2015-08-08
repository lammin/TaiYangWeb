    var demoR = document.getElementById("LPdemo");
    var demoR1 = document.getElementById("LPdemo1");
    var demoR2 = document.getElementById("LPdemo2");
    var speedR=30;    
    demoR2.innerHTML = demoR1.innerHTML    
    function MarqueeR(){
        if(demoR2.offsetWidth-demoR.scrollLeft<=0)  
            demoR.scrollLeft-=demoR1.offsetWidth    
        else{
            demoR.scrollLeft++
        }
    }
    var MyMarR = setInterval(MarqueeR,speedR);  
    demoR.onmouseover = function(){clearInterval(MyMarR)}    
    demoR.onmouseout = function(){MyMarR = setInterval(MarqueeR,speedR)}   