'use strict';

function setColor () {
    chrome.storage.sync.get(["colors"], function(result){
        let cArr = [];
        for (let r in result.colors) {
            cArr.push(result.colors[r]);
        }
        let gradientDiv = "linear-gradient(to right, " + cArr.join(",") + ")";
        let gradientText = "-webkit-linear-gradient(" + cArr.join(",") + ")";
        let colorFixedBorderBottom = "2px solid " + cArr[0] ? cArr[0] : '#2b85d0' + ";";
        let colorIcon = (cArr[2] ? cArr[2] : cArr[1] ? cArr[1] : cArr[0] ? cArr[0] : '#2b85d0') + " !important;";
        let selectorBar = "body > div.view-scaffold > div.ui.borderless.top.fixed.inverted.hidden.menu.blue.fix-height";
        let selectorSideBarHeader = "body > div.view-scaffold > div.ui.pushable.right.raised.sidebar.segments.short-action.overlay.visible.right-sidebar-container.right.toggle-right-sidebar-hide > div.ui.segment.right-sidebar-up > div > div.ui.top.right.pointing.content.dropdown.adjust-responsive-padding.speed-dropdown > h4";
        let selectorSideBarSec = "body > div.view-scaffold > div.ui.pushable.right.raised.sidebar.segments.short-action.overlay.visible.right-sidebar-container.right.toggle-right-sidebar-hide > div.ui.segment.right-sidebar-down > h4";
        let firstSideBarIcon = "#speedDialSettingsIcon";
        let secondSideBarIcon = "body > div.view-scaffold > div.ui.pushable.right.raised.sidebar.segments.short-action.overlay.visible.right-sidebar-container.right.toggle-right-sidebar-hide > div.ui.segment.right-sidebar-down > i";
        let chatSideBarSel = "#headerIdChat";
        let chatSideBarIcon = "#headerIdChat > i";
        // check elements exists
        let checkExist = setInterval(function() {
            if ($(selectorBar).length && $(selectorSideBarHeader).length && $(selectorSideBarSec).length) {
                // set div style
                $(selectorBar).attr("style", "background: " + gradientDiv);
                // set text right header style
                $(selectorSideBarHeader + "," + selectorSideBarSec + "," + chatSideBarSel).attr("style", "background: " + gradientText + "; -webkit-background-clip: text; -webkit-text-fill-color: transparent;" + " border-bottom-color: " + colorFixedBorderBottom);
                // set color icon
                $(firstSideBarIcon + "," + secondSideBarIcon + "," + chatSideBarIcon).attr("style", "color: " + colorIcon + " -webkit-text-fill-color:" + colorIcon);
               clearInterval(checkExist);
            }
        }, 100);
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