/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("327ciwg4kdb3eih")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fc3qdmd7",
    "name": "color",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("327ciwg4kdb3eih")

  // remove
  collection.schema.removeField("fc3qdmd7")

  return dao.saveCollection(collection)
})
