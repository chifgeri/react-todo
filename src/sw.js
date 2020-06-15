/* eslint-disable */
import { precacheAndRoute } from "workbox-precaching";
import { openDB } from "idb";

precacheAndRoute(self.__WB_MANIFEST);

var db;

const configDB = async () => {
  db = await openDB("todoApp", 2, {
    upgrade(db) {
      db.createObjectStore("todoLists", {
        keyPath: "id",
      });
    },
  });
};

const getTodoLists = () => {
  var tx = db.transaction("todoLists", "readonly");
  var store = tx.objectStore("todoLists");
  return store.getAll();
};

const saveTodoList = async (todoList) => {
  var tx = db.transaction("todoLists", "readwrite");
  var store = tx.objectStore("todoLists");
  await store.put(todoList);
  return tx.complete;
};

var CACHE_NAME = "cache-v1";
var urlsToCache = ["/", "/build/static/css", "/build/static/js"];

self.addEventListener("install", function (event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", function (event) {
  console.log("activated");
  event.waitUntil(configDB());
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    fetch(event.request)
      .then(function (response) {
        // Check if we received a valid response
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }

        // IMPORTANT: Clone the response. A response is a stream
        // and because we want the browser to consume the response
        // as well as the cache consuming the response, we need
        // to clone it so we have two streams.
        var responseToCache = response.clone();

        caches.open(CACHE_NAME).then(function (cache) {
          cache.put(event.request, responseToCache);
        });

        return response;
      })
      .catch((error) => {
        // No internet conection, or server unavailable serve and save data from indexed db
        console.log(event.request);

        if (event.request.method === "GET") {
          return getTodoLists().then((data) => {
            var blob = new Blob([JSON.stringify({ data: data }, null, 2)], {
              type: "application/json",
            });
            return new Response(blob, { status: 200 });
          });
        }
        if (event.request.method === "POST" && event.request.url === "/todos") {
          const todoList = event.request.json();
          return saveTodoList(todoList).then(() => {
            var blob = new Blob([JSON.stringify({ data: todoList }, null, 2)], {
              type: "application/json",
            });
            return new Response(blob, { status: 200 });
          });
        }
      })
  );
});

self.addEventListener("sync", function (event) {});
