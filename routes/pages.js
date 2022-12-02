const router = require('express').Router();

const { homePage, addGigPage, addGig, getGigs, searchGigs } = require('../controllers/pageController');

router.get("/", homePage);
router.get("/add-gig", addGigPage);
router.post("/add-gig", addGig);
router.get("/all-gigs/:page", getGigs);
router.get("/search-gigs", searchGigs);

module.exports = router;