$(document).ready(function () {
    $("input").focus(function (e) { 
        e.preventDefault();
       $(this).css("background-color", "#ddd"); 
    });

    $("input").blur(function (e) { 
        e.preventDefault();
       $(this).css("background-color", "white"); 
    });

    $("button.slideToggle").click(function (e) { 
        e.preventDefault();
        $("#dog").slideToggle(800);
    });

    $("button.animate").click(function () { 
        // e.preventDefault();
        $("#dog").animate({left: "100px", top: "50px"}, 1000);
    });

    $("button.fadeIn").click(function (e) { 
        e.preventDefault();
        $("#dog").fadeIn(1000);
    });

    $("button.fadeOut").click(function (e) { 
        e.preventDefault();
        $("#dog").fadeOut(1000);
    });
});

$(document).mouseover(function (e) { 
    $("#log").html("<h2>e.pageX : " + e.pageX + ", e.pageY : " + e.pageY + "</h2>");
    // console.dir(e);
});


