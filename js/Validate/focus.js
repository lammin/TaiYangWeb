$(function() {
    $(".input,.login_input,.textarea").focus(function() {
        $(this).addClass("focus");
    }).blur(function() {
        $(this).removeClass("focus");
    });

    //輸入框提示,獲取擁有HintTitle,HintInfo屬性的對象
    $("[HintTitle],[HintInfo]").focus(function(event) {
        $("*").stop(); //停止所有正在運行的動畫
		$("#HintMsg").remove(); //先清除，防止重複出錯
        var HintHtml = "<ul id=\"HintMsg\"><li class=\"HintTop\"></li><li class=\"HintInfo\"><b>" + $(this).attr("HintTitle") + "</b>" + $(this).attr("HintInfo") + "</li><li class=\"HintFooter\"></li></ul>"; //設置顯示的內容
        var offset = $(this).offset(); //取得事件對象的位置
        $("body").append(HintHtml); //添加節點
        $("#HintMsg").fadeTo(0, 0.85); //對象的透明度
        var HintHeight = $("#HintMsg").height(); //取得容器高度
        $("#HintMsg").css({ "top": offset.top - HintHeight + "px", "left": offset.left + "px" }).fadeIn(500);
    }).blur(function(event) {
        $("#HintMsg").remove(); //刪除UL
    });
});