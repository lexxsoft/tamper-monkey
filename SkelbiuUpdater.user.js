// ==UserScript==
// @id              SkelbiuUpdater
// @name            Skelbiu.lt updater
// @namespace       http://tampermonkey.net/
// @description     skelbiu.lt ads renewer
// @author          <lexxsoft@gmail.com>
// @domain          localhost
// @domain          localhost:8000
// @domain          skelbiu.lt
// @domain          www.skelbiu.lt
// @match           http://localhost:8000/play.html
// @match           http://localhost:8000/*
// @match           https://www.skelbiu.lt/mano-skelbimai/*
// @require         https://code.jquery.com/jquery-3.2.1.min.js
// @grant           GM_setValue
// @grant           GM_getValue
// @grant           window.focus
// @downloadURL     https://github.com/lexxsoft/tamper-monkey/raw/skelbiu/SkelbiuUpdater.user.js
// @version         41
// @run-at          document-end
// @license         MIT
// ==/UserScript==

// @updateVersion   3
// @grant           none
// @run-at          document-start
// @updateURL       https://github.com/lexxsoft/tamper-monkey/raw/skelbiu/SkelbiuUpdater.meta.js

(function() {
    'use strict';
    var movement;

    // refresh browser window every so often
    var movement = setTimeout(reload, 5*60*1000);
    $(document).on('mousemove', function(){
        if (movement)
            movement = clearTimeout(movement);
        movement = setTimeout(reload, 5*60*1000)
    });

    // gather products
    var renewables = [];
    $('a.renewedAd, a.renewLink').each(function(idx,element){
        // one item per table row
        var tr          = $(this).parents('tr');

        var item        = {};
        item.title      = tr.find('h2').text();
        item.views      = tr.find('stats-text').eq(0).find('span').text();
        item.click      = tr.find('stats-text').eq(1).find('span').text();
        item.updated    = $(this).attr('data-updated');
        item.fresh      = $(this).css('color') === 'rgb(0, 153, 0)';
        item.renewal    = this;

        console.debug('got link', item);
        renewables.push(item);
    });
    // console.log(hrefs);

    // filter only stale links and simulate mouse clicks
    renewables.filter(function(item){
        return item.fresh === false;
    }).forEach(function(item){
        console.debug('will be updating', item.title);

        triggerMouseEvent(item.renewal, 'mouseover');
        triggerMouseEvent(item.renewal, 'mousedown');
        triggerMouseEvent(item.renewal, 'mouseup');
        triggerMouseEvent(item.renewal, 'click');
    });


    function triggerMouseEvent(node, eventType)
    {
        var clickEvent = document.createEvent('MouseEvents');
        clickEvent.initEvent(eventType, true, true);
        node.dispatchEvent(clickEvent);
    }

    function reload()
    {
        console.debug('refreshing');
        window.document.location.reload(true);
    }
})();