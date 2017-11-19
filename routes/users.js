/**
 * freeCodeCamp - Back End Development Certification - Dynamic Web Application Projects
 * Routes - Users
 * 
 * @author MLBORS
 * @version 1.0.0.0
 * @since 2017.11.11
 * @for freeCodeCamp
 */

/*******************/
/***** IMPORTS *****/
/*******************/

var express = require('express');
var router = express.Router();

/************************************************************/
/************************************************************/

/****************/
/***** LIST *****/
/****************/

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/************************************************************/
/************************************************************/

/*******************/
/***** EXPORTS *****/
/*******************/

module.exports = router;
