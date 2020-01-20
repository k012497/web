// jq_remove
$(document).ready(function () {
    var pObject = $("p"),
    container = $(".container"); // 속도 개선을 위함 

    console.log(pObject, container);
    pObject.css("background-color", "yellow");
    container.css({
        "border": "1px solid gray",
        "height" : "80px"
    });

    $('#btnRemove').click(function () { 
        container.remove();
     });

    $('#btnEmpty').click(function () { 
        container.empty();
     });
});


// jq_width
$(document).ready(function () {
    var $modeWidth = 50,
    $div = $("div");

    $div.click(function () { 
        $(this).width($modeWidth).toggleClass("next");
        $modeWidth -= 5;
     });
});