'use strict';

function setColorEventDispatch () {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "setColor"}, function(response) {
            // callback
        });
    });
}

$( document ).ready(function() {
    $('#firstColor').colorpicker();
    $('#secondColor').colorpicker();
    $('#thirdColor').colorpicker();

    chrome.storage.sync.get(["firstColor"], function(result){
        var first = result.firstColor;
        $("#firstColor").val(first);
        chrome.storage.sync.get(["secondColor"], function(result){
            var second = result.secondColor;
            $("#secondColor").val(second);
            chrome.storage.sync.get(["thirdColor"], function(result){
                var third = result.thirdColor;
                $("#thirdColor").val(third);
           });
        });
    });

    $(".defined-colors").click(function() {
        var colors = $( this ).attr("style").replace("(", "").replace(");", "").split(", ");
        var first = colors[1];
        var second = colors[2];
        var third = colors[3];
        chrome.storage.sync.set({
            "firstColor": first,
            "secondColor": second,
            "thirdColor": third
        });
        $("#firstColor").val(first);
        $("#secondColor").val(second);
        $("#thirdColor").val(third);
        setColorEventDispatch();
    });

    $("#buttonSave").click( function () {
        var first = $("#firstColor").val();
        var second = $("#secondColor").val();
        var third = $("#thirdColor").val();
        chrome.storage.sync.set({
            "firstColor": first,
            "secondColor": second,
            "thirdColor": third
        });
        setColorEventDispatch();
    });
});

