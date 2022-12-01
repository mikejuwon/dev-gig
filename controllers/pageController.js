const db = require("../config/database");
const Gig = require("../models/Gig");


// Home Page
const homePage = async (req, res) => {
    try {
        res.render("home");
    } catch (err) {
        console.log(err);
    }
};

// Add Gig Page
const addGigPage = async (req, res) => {
    try {
        res.render("add");
    } catch (err) {
        console.log(err);
    }
};

// Add Gig
const addGig = async (req, res) => {
    try {
        const { title, technologies, budget, description, contact_email } = req.body;
        await Gig.create({
            title,
            technologies,
            description,
            budget,
            contact_email
        });
        return res.redirect("/all-gigs");
    } catch (err) {
        console.log(err);
    }
};

// Get gig list
const getGigs = async (req, res) => {
  try {
    // Get all gigs from database and sort by date in descending order
    const gigs = await Gig.findAll({
        order:  [["id", "ASC"]]
    });
    res.render("gigs", { gigs });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
    homePage,
    addGigPage,
    addGig,
    getGigs
};