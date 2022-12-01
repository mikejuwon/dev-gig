require("dotenv").config();
const express = require("express");
const readdirSync = require("fs").readdirSync;
const cors = require("cors");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const LRU = require("lru-cache");
const path = require("path");


const app = express();

ejs.cache = new LRU({
    max: 100,
    ttl: 1000 * 60 * 60 * 24 * 7
});

// Database
const db = require("./config/database");

// Test DB
db.authenticate()
    .then(() => console.log("🚀 Database connection successful!"))
    .catch(err => console.log("Error: " + err));

// Init Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// View Engine
app.engine("ejs", ejs.renderFile);
app.set("view engine", "ejs");
app.use(express.static("public"));
app.set("views", path.join(__dirname, "views"));

// Routes
readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});