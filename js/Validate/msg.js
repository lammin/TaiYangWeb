//�i�H�۰�����������
function jsAutoMsg(msgtitle, url) {
    $("#btnSave").attr("disabled", "disabled");
    var str = "<div id=\"jsAutoMsg\" class=\"pcent correct\">" + msgtitle + "</div>";
    $("body").append(str);
    $("#jsAutoMsg").show();
    //3���M������
    setTimeout(function() {
        $("#jsAutoMsg").remove();
        if (url == "back") {
            history.back(-1);
        } else if (url != "") {
            location.href = url;
        }
    }, 3000);
}
//�B�n���ܵ��f
function jsLayMsg(w, h, options) {
    $("#jsLayMsg").remove();
    var cssname = "";
    //���ܵ��f���˦�
    switch (options.mscss) {
        case "Success":
            cssname = "icon-01";
            break;
        case "Error":
            cssname = "icon-02";
            break;
        default:
            cssname = "icon-03";
            break;
    }
    //�V�������J�аO
    var str = "<div id='jsLayMsg' title='" + options.title + "'><p class='" + cssname + "'>" + options.msbox + "</p></div>";
    $("body").append(str);
    $("#jsLayMsg").dialog({
        //title: null,
        //show: null,
        bgiframe: true,
        autoOpen: false,
        width: w,
        //height: h,
        resizable: false,
        closeOnEscape: false,
        draggable:false,
        buttons: { "�T�w": function() { $(this).dialog("close"); }},
        close: function() {
            if (options.url == "back") {
                history.back(-1);
            } else if (options.url != "") {
                location.href = options.url;
            }
        },
        modal: true
    });
    $("#jsLayMsg").dialog("open");
}