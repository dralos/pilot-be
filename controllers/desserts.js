const db = require("../models")
const Desserts = db.desserts
const Op = db.Sequelize.Op


const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: desserts } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, desserts, totalPages, currentPage };
};

// Create and Save a new Dessert
exports.create = async (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Dessert
    const dessert = {
        name: req.body.name,
        calories: req.body.calories,
        published: req.body.published ? req.body.published : false
    };

    try {
        let data = await Desserts.create(dessert)

        res.send(data)

    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Dessert."
        });
    }
};

// Retrieve all Desserts from the database.
exports.findAll = async (req, res) => {
    const { page, size, name } = req.query;
    let condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
    const { limit, offset } = getPagination(page, size);
    try {
        let data = await Desserts.findAndCountAll({ where: condition, limit, offset })
        const response = getPagingData(data, page, limit);
        res.send(response);
    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving tutorials."
        });
    }
};

// Find a single Dessert with an id
exports.findOne = async (req, res) => {
    const id = req.params.id;
    try {
        let dessert = await Desserts.findByPk(id)
        if (dessert) {
            res.send(data);
        } else {
            res.status(500).send({
                message: "Error retrieving Dessert with id=" + id
            });
        }
    } catch (err) {
        res.status(404).send({
            message: `Cannot find Dessert with id=${id}.`
        });
    }
};

// Update a Dessert by the id in the request
exports.update = async (req, res) => {
    const id = req.params.id;
    try {
        let data = await Desserts.update(req.body, {
            where: { id: id }
        })
        if (data == 1) {
            res.send({
                message: "Dessert was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Desserts with id=${id}. Maybe Dessert was not found or req.body is empty!`
            });
        }

    } catch (err) {
        res.status(500).send({
            message: "Error updating Dessert with id=" + id
        });
    }
};

// Delete a Dessert with the specified id in the request
exports.delete = async (req, res) => {
    const id = req.params.id;

    try {
        let data = await Desserts.destroy({ where: { id: id } })
        if (data == 1) {
            res.send({
                message: "Dessert was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete Dessert with id=${id}. Maybe Dessert was not found!`
            });
        }
    } catch (err) {
        res.status(500).send({
            message: "Could not delete Dessert with id=" + id
        });
    }
};

// Delete all Desserts from the database.
exports.deleteAll = async (req, res) => {
    try {
        let data = await Desserts.destroy({ where: {}, truncate: false })
        res.send({ message: `${data} Desserts were deleted successfully!` });
    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while removing all Desserts."
        });
    }
};

// Find all published Desserts
exports.findAllPublished = async (req, res) => {
    try {
        const { page, size } = req.query;
        const { limit, offset } = getPagination(page, size);

        let data = await Desserts.findAll({ where: { published: true }, limit, offset })
        const response = getPagingData(data, page, limit);
        res.send(response);
    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving Desserts."
        });
    };
};