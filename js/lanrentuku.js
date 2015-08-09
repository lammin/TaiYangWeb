//<![CDATA[
$(function(){
	(function(){
		var curr = 0;
		var length=$(".js img").length;
		//alert(length);
		$("#jsNav .trigger").each(function(i){
			$(this).click(function(){
				curr = i;
				$("#js img").eq(i).fadeIn("slow").siblings("img").hide();
				$(this).siblings(".trigger").removeClass("imgSelected").end().addClass("imgSelected");
				return false;
			});
		});
		
		var pg = function(flag){
			//flag:true&#6986;ýYßS&#51238;alse&#6986; úµ«
			if (flag) {
				if (curr == 0) {
					todo = 2;
				} else {
					todo = (curr - 1) % length;
				}
			} else {
				todo = (curr + 1) % length;
			}
			$("#jsNav .trigger").eq(todo).click();
		};
		
		//&#496;µ«
		$("#prev").click(function(){
			pg(true);
			return false;
		});
		
		//&#44279;&#54090;		$("#next").click(function(){
			pg(false);
			return false;
		});
		
		//&#1492;ÞA&#54090;		var timer = setInterval(function(){
			todo = (curr + 1) % length;
			$("#jsNav .trigger").eq(todo).click();
		},5000);
		
		//&#691;&#6800;&#50019;&#1306;&#18807;&#8631;&#591;&#689;&#867;&#1465;&#1492;ÞA&#54090;		$("#jsNav a").hover(function(){
				clearInterval(timer);
			},
			function(){
				timer = setInterval(function(){
					todo = (curr + 1) % length;
					$("#jsNav .trigger").eq(todo).click();
				},5000);			
			}
		);
	})();
});
//]]>

//&#523;&#892;&#63648;www.lanrentuku.com

