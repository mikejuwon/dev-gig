const moment = require("moment");
const { Op } = require("sequelize");
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
        res.render("add", {
            errors: [],
            title: "",
            technologies: "",
            budget: "",
            description: null,
            contact_email: ""
        });
    } catch (err) {
        console.log(err);
    }
};

// Add Gig
const addGig = async (req, res) => {
    try {
        let { title, technologies, budget, description, contact_email } = req.body;
        let errors = [];

        // Validate Fields
        if (!title) {
            errors.push({ text: "Please add a title" });
        }
        if (!technologies) {
            errors.push({ text: "Please add some technologies" });
        }
        if (!description) {
            errors.push({ text: "Please add a description" });
        }
        if (!contact_email) {
            errors.push({ text: "Please add a contact email" });
        }

        // Check for errors
        if (errors.length > 0) {
            res.render("add", {
                errors,
                title,
                technologies,
                budget,
                description,
                contact_email
            });
        } else {
            if (!budget) {
                budget = "Unknown";
            } else {
                budget = `₦${budget}`;
            }

            // Make lowercase and remove space after comma
            technologies = technologies.toLowerCase().replace(/, /g, ",");

            // Insert into table
            await Gig.create({
                title,
                technologies,
                description,
                budget,
                contact_email
            });
            return res.redirect("/all-gigs/1");
        }
    } catch (err) {
        console.log(err);
    }
};

// Get gig list
const getGigs = async (req, res) => {
  try {
    // pagination
    const page = req.query.page || req.params.page || 1;
    const limit = req.query.limit || 3;
    const startIndex = (page - 1) * limit;
    const currentPage = page;
    // Get all gigs from database and sort by date in descending order
    const gigs = await Gig.findAll({
        order: [["createdAt", "DESC"]],
        offset: startIndex,
        limit: limit
    });

    // Get total number of gigs
    const totalGigs = await Gig.count();
    
    res.render("gigs", { gigs, moment, current: currentPage, pages: Math.ceil(totalGigs / limit), result: null, term: null });
  } catch (error) {
    console.log(error);
  }
};

const searchGigs = async (req, res) => {
    try {
        // pagination
        const page = req.query.page || req.params.page || 1;
        const limit = req.query.limit || 3;
        const startIndex = (page - 1) * limit;
        const currentPage = page;

        let { term } = req.query;
        term = term.toLowerCase();

        const gigs = await Gig.findAll({
            where: {
                technologies: {
                    [Op.like]: "%" + term + "%"
                }
            },
            order: [["createdAt", "DESC"]],
            offset: startIndex,
            limit: limit
        });

        const totalGigs = await Gig.count({
            where: {
                technologies: {
                    [Op.like]: "%" + term + "%"
                }
            }
        });
        console.log(totalGigs);
        res.render("gigs", { gigs, moment, current: currentPage, pages: Math.ceil(totalGigs / limit), term, result: totalGigs });
    } catch (err) {
        console.log(err);
    }
};

const updateGig = async (req, res) => {
    try {
        let { title, technologies, budget, description, contact_email } = req.body;
        let errors = [];

        // Validate Fields
        if (!title) {
            errors.push({ text: "Please add a title" });
        }
        if (!technologies) {
            errors.push({ text: "Please add some technologies" });
        }
        if (!description) {
            errors.push({ text: "Please add a description" });
        }
        if (!contact_email) {
            errors.push({ text: "Please add a contact email" });
        }

        // Check for errors
        if (errors.length > 0) {
            res.render("edit", {
                errors,
                title,
                technologies,
                budget,
                description,
                contact_email
            });
        } else {
            if (!budget) {
                budget = "Unknown";
            } else {
                budget = `₦${budget}`;
            }

            // Make lowercase and remove space after comma
            technologies = technologies.toLowerCase().replace(/, /g, ",");
            const gig = await Gig.findOne({ where: { id: req.params.id } });
            // Insert into table
            await gig.update({
                title,
                technologies,
                description,
                budget,
                contact_email
            });
            return res.redirect("/all-gigs/1");
        }
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    homePage,
    addGigPage,
    addGig,
    getGigs,
    searchGigs,
    updateGig
};