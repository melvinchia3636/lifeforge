/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "327ciwg4kdb3eih",
    "created": "2023-11-24 11:32:03.543Z",
    "updated": "2023-11-24 11:32:03.543Z",
    "name": "todo_category",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "y8zommga",
        "name": "name",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "8cakr2ge",
        "name": "icon",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("327ciwg4kdb3eih");

  return dao.deleteCollection(collection);
})
