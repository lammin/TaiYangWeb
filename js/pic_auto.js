// �Ϥ�������Y��
var flag=false;
function DrawImage(ImgD,iwidth,iheight){
    //�Ѽ�(�Ϥ�,���\���e��,���\������)
    var image=new Image();
    image.src=ImgD.src;
    if(image.width>0 && image.height>0){
        flag=true;
        if(image.width/image.height>= iwidth/iheight){
            if(image.width>iwidth){  
                ImgD.width=iwidth;
                ImgD.height=(image.height*iwidth)/image.width;
            }else{
                ImgD.width=image.width;  
                ImgD.height=image.height;
            }
            //ImgD.alt=image.width+"��"+image.height;
        }
        else{
            if(image.height>iheight){  
                ImgD.height=iheight;
                ImgD.width=(image.width*iheight)/image.height;        
            }else{
                ImgD.width=image.width;  
                ImgD.height=image.height;
            }
            //ImgD.alt=image.width+"��"+image.height;
        }
    }
} 

// �Ϊk�G<img src='' alt='' onload="resizeimage(this)" />
function resizeimage(objImg)
{
    var w0=0;
    var w1=400;
    var h0=0;
    var h1=0;
    if (objImg.width>w1) {
	    w0=objImg.width;
	    h0=objImg.height;
	    h1=w1/w0*h0;
	    objImg.style.width=w1;
	    objImg.style.height=h1;
	}
} 