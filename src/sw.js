/* eslint-disable */
import { precacheAndRoute } from "workbox-precaching";
import { openDB } from "idb";
import { putTodoList } from "./network/todoQueries";

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
  await store.put(todoList.data);
  return tx.complete;
};

var CACHE_NAME = "cache-v1";
var urlsToCache = ["/", "/build/static/css", "/build/static/js"];

self.addEventListener("install", function (event) {});

self.addEventListener("activate", function (event) {
  console.log("activated");
  event.waitUntil(configDB());
});

self.addEventListener("fetch", function (event) {
  const req = event.request.clone();
  event.respondWith(
    fetch(event.request)
      .then(function (response) {
        return response;
      })
      .catch((error) => {
        // No internet conection, or server unavailable serve and save data from indexed db

        if (req.method === "GET") {
          return getTodoLists().then((data) => {
            var blob = new Blob([JSON.stringify({ data: data }, null, 2)], {
              type: "application/json",
            });
            return new Response(blob, { status: 200 });
          });
        }
        if (req.method === "POST" || req.method === "PUT") {
          return req
            .json()
            .then((data) => data)
            .then((data) => {
              return saveTodoList(data).then(() => {
                var blob = new Blob([JSON.stringify({ data }, null, 2)], {
                  type: "application/json",
                });
                return new Response(blob, { status: 200 });
              });
            });
        }
      })
  );
});

self.addEventListener("sync", function (event) {
  event.waitUntil(
    getTodoLists().then((data) => data.map((item) => putTodoList(item)))
  );
});
