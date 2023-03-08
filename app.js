const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://127.0.0.1:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./models");
const Role = db.role;

// NOTE: this true is forced since in development we need to re-sync the database often
db.sequelize.sync({ force: true })
    .then(() => {
        console.log("Synced db.");
        initial();
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

const initial = () => {
    Role.create({
        id: 1,
        name: "user"
    });

    Role.create({
        id: 2,
        name: "moderator"
    });

    Role.create({
        id: 3,
        name: "admin"
    });
}
// CRUD Operations example
require("./routes/desserts")(app);
// authentication and JWT
require('./routes/auth')(app);
require('./routes/user')(app);

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Pilot, this is default route." });
});

module.exports = app;