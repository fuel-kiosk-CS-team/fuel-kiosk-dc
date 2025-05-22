# Public Directory README.md

---
This directory partially contains files that are automatically generated (sw.js, swe-worker-\*.js, workbox-\*.js), and some that are hard coded like the png files and the manifest.json.

---

## PNG Files
These files are hardcoded and can be easily replaced (with the same name) with others by designing your own logos and/or application icons, we recommend using https://favicon.io/ as it is completely free and gives step by step walkthroughs (and theoretically will use the same filenames).

In the event that you want to change the filenames, simply go into the manifest.json and make sure you make the same changes there, otherwise no icon will be registered or used for the webapp.

## Manifest.json
The manifest.json is essentially the most basic information that we give the browser at the start, it gives the icons to use, titles for the website (shows on tab and on downloaded application), as well as keywords for the website (if searched for on google or any other major search engine). 

## Generated Files
For the most part, we recommend keeping away from these. They'll be regenerated with any clean build, so any changes you make won't stick, and the files are essentially unreadable anyway.

## App-worker.ts
This is basically the file for the service worker, if you don't know what you're doing then we would recommend keeping out of this file as well, though there may be room for change in terms of what page is served when offline; however, with how it is set up right now it will simply cache all the pages and actions that the user does when online, and will retain these in the event the user goes offline. At the very least, do not remove aspects of how it is currently setup unless you are absolutely certain (and know what you're doing).

This file uses serwist which has good documentation (https://serwist.pages.dev/). It is recommended you heavily look into this before making any changes.