/**
 * freeCodeCamp - Back End Development Certification - Dynamic Web Application Projects
 * Routes - Logout
 * 
 * @author MLBORS
 * @version 1.0.0.0
 * @since 2017.11.11
 * @for freeCodeCamp
 */

/*******************/
/***** IMPORTS *****/
/*******************/

const express = require('express')
const passport = require('passport')
const router = express.Router()

/************************************************************/
/************************************************************/

/******************/
/***** ROUTES *****/
/******************/

/*****/
/***** LOGIN *****/
/*****/

router.get('/', (req, res) => {
	req.logout()
	res.redirect('/')
})

/************************************************************/
/************************************************************/

/*******************/
/***** EXPORTS *****/
/*******************/

module.exports = router