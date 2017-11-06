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
// @downloadURL     http://localhost:8000/SkelbiuUpdater.user.js
// @version         33
// @run-at          document-end
// @license         MIT
// ==/UserScript==

// @updateVersion   3
// @grant           none
// @run-at          document-start
// @updateURL       http://localhost:8000/SkelbiuUpdater.meta.js
