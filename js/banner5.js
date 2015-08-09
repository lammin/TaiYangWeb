function addEvent(o,e,f){
	if(window.attachEvent){o.attachEvent("on"+e,f)}else if(window.addEventListener){o.addEventListener(e,f,false);}else{o["on"+e]=f;}
}

function removeEvent(o,e,f){
	if(window.detachEvent){o.detachEvent("on"+e,f);}else if(window.removeEventListener){o.removeEventListener(e,f,false);}else{o["on"+e]=null;}
}

//�����s�������q�{�欰
function stopDefault(e){if(e&&e.preventDefault){e.preventDefault();}else{window.event.returnValue=false;}return false;}

function GetID(s){return document.getElementById(s);}

//�O�_�Ʋ�
function isArray(arr){return Object.prototype.toString.call(arr) === "[object Array]";}

function TransformView (n,tag,Txt){
	var TV=this,Banner=GetID(n),T='',i;
	Banner.innerHTML='<div class="AD_List">'+Banner.innerHTML+'</div><div class="clear"></div>';
	this.index=0;

	this.Step=3;		//�ư��ܤƲv
	this.timer=null;	//�w�ɾ�
	this.Up=true;		//�O�_�V�W(�_�h�V��)
	this.Auto=true;		//�O�_�۰��ഫ
	this.Pause=3000;	//���y�ɶ�(Auto��true�ɦ���)
	this.target=0;		//�ؼаѼ�
	
	this.slider=Banner.getElementsByTagName('ul')[0];
	this.Count=this.slider.getElementsByTagName('li').length;/*�����ƶq*/
	this.Width=this.slider.getElementsByTagName('li')[0].getElementsByTagName('img')[0].offsetWidth;
	this.Height=this.slider.getElementsByTagName('li')[0].getElementsByTagName('img')[0].offsetHeight;
	
    //alert(this.slider.getElementsByTagName('li')[0].innerHTML+'\n\n\n'+Banner.innerHTML);
	//��r�y�z�h
	if(Txt==1){
		//�I���h
		var div=document.createElement("div");div.className='AD_Text_BG';Banner.appendChild(div);
		//��r�h
		var div=document.createElement("div");div.innerHTML=this.GetTitle(0);div.className='AD_Text';this.AD_Text=Banner.appendChild(div);
	}
	
	var ul=this.slider.getElementsByTagName('li');
	for(i=0;i<this.Count;i++){
		ul[i].onmouseover=function(){
			if(TV.timer){clearTimeout(TV.timer);}
		}
		ul[i].onmouseout=function(){
			if(TV.Auto){TV.timer=setTimeout(function(){TV.index++;TV.nextAd();},TV.Pause);}
		}
	}
	
	//�ͦ�Label
	ul=document.createElement("ul");
	ul.className='ADNum';
	for(i=1;i<this.Count+1;i++){
		var CL=document.createElement("li");
		T=i;
		if(tag==1){T='<span></span><a>'+this.GetTitle(i-1)+'</a>';}
		else if(tag==2){T='<img src="'+this.GetSrc(i-1)+'" />';}
		CL.innerHTML=T;
		
		CL.onmouseover=(function(i,CL){return function(){
			CL.className='On';TV.index=i-1;TV.nextAd();
			if(TV.timer){clearTimeout(TV.timer);}
		}})(i,CL);
		CL.onmouseout=(function(i,CL){return function(){
			CL.className='';TV.index=i-1;TV.nextAd();
			if(TV.Auto){TV.timer=setTimeout(function(){TV.index++;TV.nextAd();},TV.Pause);}
		}})(i,CL);
		ul.appendChild(CL);
	}
	Banner.appendChild(ul);
	this.AdNum=Banner.getElementsByTagName('ul')[1].getElementsByTagName('li');
	TV.nextAd();
}

TransformView.prototype={
nextAd : function(){
	if(this.index<0){this.index=this.Count-1;}
	else if(this.index>=this.Count){this.index=0;}

	this.target=-1*(this.Up?this.Height:this.Width)*this.index;
	for(i=0;i<this.AdNum.length;i++){this.AdNum[i].className='';}
	//�����y�z��r
	if(this.AD_Text){this.AD_Text.innerHTML=(this.GetURL(this.index)=='')?this.GetTitle(this.index):'<a href="'+this.GetURL(this.index)+'" target="_blank">'+this.GetTitle(this.index)+'</a>';}
	this.AdNum[this.index].className='On';
	this.Move();
},
//����
Move: function() {
	if(this.timer){clearTimeout(this.timer);}
	var oThis=this,style=this.Up?"top":"left",iNow=parseInt(this.slider.style[style])||0,iStep=this.GetStep(this.target,iNow);
	
	if(iStep!=0){
		this.slider.style[style]=(iNow+iStep)+"px";
		setTimeout(function(){oThis.Move();},10);
	}else{
		this.slider.style[style]=this.target+"px";
		if(this.Auto){this.timer=setTimeout(function(){oThis.index++;oThis.nextAd();},this.Pause);}
	}
},
//����B��
GetStep: function(iTarget, iNow) {
	var iStep=(iTarget-iNow)/this.Step;
	if(iStep==0)return 0;
	if(Math.abs(iStep)<1) return (iStep>0?1:-1);
	return iStep;
},
//���alt[�����奻]
GetTitle: function(n){
	return this.slider.getElementsByTagName('li')[n].getElementsByTagName('img')[0].alt;
},
//���URL
GetURL: function(n){
	if(this.slider.getElementsByTagName('li')[n].getElementsByTagName('a')[0])
	{return this.slider.getElementsByTagName('li')[n].getElementsByTagName('a')[0].href;}
	else{return '';}
},
GetSrc: function(n){
	if(this.slider.getElementsByTagName('li')[n].getElementsByTagName('img')[0])
	{return this.slider.getElementsByTagName('li')[n].getElementsByTagName('img')[0].src;}
	else{return '';}
}
}

//�Ыؤ���
function creElm(o,pN,t){
	var tmp=document.createElement(t||'div'),p;
	for(p in o){tmp[p]=o[p];}
	return pN?pN.appendChild(tmp):document.body.appendChild(tmp);
}