const router = require('express').Router();

const { homePage, addGigPage, addGig, getGigs } = require('../controllers/pageController');

router.get("/", homePage);
router.get("/add-gig", addGigPage);
router.post("/add-gig", addGig);
router.get("/all-gigs", getGigs);

module.exports = router;