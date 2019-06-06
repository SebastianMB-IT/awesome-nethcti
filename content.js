'use strict';

function setColor () {
    chrome.storage.sync.get(["firstColor"], function(result){
        var first = result.firstColor;
        chrome.storage.sync.get(["secondColor"], function(result){
            var second = result.secondColor;
            chrome.storage.sync.get(["thirdColor"], function(result){
                var third = result.thirdColor;
                var gradientDiv = "linear-gradient(to right, " + first + ", " + second + ", " + third + ")";
                var gradientText = "-webkit-linear-gradient(" + first + ", " + second + ", " + third + ")";
                var colorFixedBorderBottom = "2px solid " + third + ";";
                var colorIcon = third + " !important;";
                var selectorBar = "body > div.view-scaffold > div.ui.borderless.top.fixed.inverted.hidden.menu.blue.fix-height";
                var selectorSideBarHeader = "body > div.view-scaffold > div.ui.pushable.right.raised.sidebar.segments.short-action.overlay.visible.right-sidebar-container.right.toggle-right-sidebar-hide > div.ui.segment.right-sidebar-up > div > div.ui.top.right.pointing.content.dropdown.adjust-responsive-padding.speed-dropdown > h4";
                var selectorSideBarSec = "body > div.view-scaffold > div.ui.pushable.right.raised.sidebar.segments.short-action.overlay.visible.right-sidebar-container.right.toggle-right-sidebar-hide > div.ui.segment.right-sidebar-down > h4";
                var firstSideBarIcon = "#speedDialSettingsIcon";
                var secondSideBarIcon = "body > div.view-scaffold > div.ui.pushable.right.raised.sidebar.segments.short-action.overlay.visible.right-sidebar-container.right.toggle-right-sidebar-hide > div.ui.segment.right-sidebar-down > i";
                var chatSideBarSel = "#headerIdChat";
                var chatSideBarIcon = "#headerIdChat > i";

                // check elements exists
                var checkExist = setInterval(function() {
                    if ($(selectorBar).length && $(selectorSideBarHeader).length && $(selectorSideBarSec).length) {
                        // set div style
                        $(selectorBar).attr("style", "background: " + gradientDiv);

                        // set text right header style
                        $(selectorSideBarHeader + "," + selectorSideBarSec + "," + chatSideBarSel).attr("style", "background: " + gradientText + "; -webkit-background-clip: text; -webkit-text-fill-color: transparent;" + " border-bottom: " + colorFixedBorderBottom);

                        // set color icon
                        $(firstSideBarIcon + "," + secondSideBarIcon + "," + chatSideBarIcon).attr("style", "color: " + colorIcon + " -webkit-text-fill-color:" + colorIcon);

                       clearInterval(checkExist);
                    }
                 }, 100);
            });
        });
    });
}

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.action == "setColor") {
            setColor();
        }
    }
);

$( document ).ready(function() {
    setColor();
});