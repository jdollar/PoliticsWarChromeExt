'use strict'

chrome.browserAction.onClicked.addListener(function(activeTab)
{
    var newURL = 'pwEnhanced.html'
    chrome.tabs.create({ url: newURL })
})
