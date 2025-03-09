/******/ (() => { // webpackBootstrap
/******/ 	"use strict";


self.fallback = async request => {
  // https://developer.mozilla.org/en-US/docs/Web/API/RequestDestination
  switch (request.destination) {
    case 'document':
      if (true) return caches.match("/~offline", {
        ignoreSearch: true
      });
    case 'image':
      if (true) return caches.match("/fallback.webp", {
        ignoreSearch: true
      });
    case 'audio':
      if (false) {}
    case 'video':
      if (false) {}
    case 'font':
      if (false) {}
    case '':
      if ( true && request.url.match(/\/_next\/data\/.+\/.+\.json$/i)) return caches.match("/_next/data/development/fallback.json", {
        ignoreSearch: true
      });
    default:
      return Response.error();
  }
};
/******/ })()
;