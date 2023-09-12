// ==UserScript==
// @name         Nexus Mods Last DL Highlighter
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Highlight the "Last DL" column if it's older than the "Updated" column on Nexus Mods page
// @author       pmcb
// @include      https://*.nexusmods.com/*?tab=download+history
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Wait for the table to load
    var checkExist = setInterval(function() {
        var table = $('table.datatable');

        if (table.length) {
            clearInterval(checkExist);

            // Get the index of the "Last DL" and "Updated" columns
            var lastDLIndex = table.find('th:contains("Last DL")').index();
            var updatedIndex = table.find('th:contains("Updated")').index();

            // Loop through each row in the table
            table.find('tbody tr').each(function() {
                var row = $(this);
                var lastDLCell = row.find('td:eq(' + lastDLIndex + ')');
                var updatedCell = row.find('td:eq(' + updatedIndex + ')');

                // Parse the date and time strings
                var lastDLDate = new Date(lastDLCell.text());
                var updatedDate = new Date(updatedCell.text());

                // Compare dates and highlight if necessary
                if (lastDLDate < updatedDate) {
                    lastDLCell.css('background-color', 'rgba(120, 0, 0, 1.0)');
                }
            });
        }
    }, 2000); // Check every 3 seconds for the table
})();
