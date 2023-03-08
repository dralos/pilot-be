module.exports = app => {
    const desserts = require("../controllers/desserts");

    var router = require("express").Router();

    // Create a new Dessert
    router.post("/", desserts.create);

    // Retrieve all Desserts
    router.get("/", desserts.findAll);

    // Retrieve all published Desserts
    router.get("/published", desserts.findAllPublished);

    // Retrieve a single Dessert with id
    router.get("/:id", desserts.findOne);

    // Update a Dessert with id
    router.put("/:id", desserts.update);

    // Delete a Dessert with id
    router.delete("/:id", desserts.delete);

    // Delete all Desserts
    router.delete("/", desserts.deleteAll);

    app.use('/api/desserts', router);
};