$(function() {
    $(".input,.login_input,.textarea").focus(function() {
        $(this).addClass("focus");
    }).blur(function() {
        $(this).removeClass("focus");
    });

    //��J�ش���,����֦�HintTitle,HintInfo�ݩʪ���H
    $("[HintTitle],[HintInfo]").focus(function(event) {
        $("*").stop(); //����Ҧ����b�B�檺�ʵe
		$("#HintMsg").remove(); //���M���A����ƥX��
        var HintHtml = "<ul id=\"HintMsg\"><li class=\"HintTop\"></li><li class=\"HintInfo\"><b>" + $(this).attr("HintTitle") + "</b>" + $(this).attr("HintInfo") + "</li><li class=\"HintFooter\"></li></ul>"; //�]�m��ܪ����e
        var offset = $(this).offset(); //���o�ƥ��H����m
        $("body").append(HintHtml); //�K�[�`�I
        $("#HintMsg").fadeTo(0, 0.85); //��H���z����
        var HintHeight = $("#HintMsg").height(); //���o�e������
        $("#HintMsg").css({ "top": offset.top - HintHeight + "px", "left": offset.left + "px" }).fadeIn(500);
    }).blur(function(event) {
        $("#HintMsg").remove(); //�R��UL
    });
});