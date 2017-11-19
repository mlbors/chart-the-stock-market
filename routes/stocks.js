/**
 * freeCodeCamp - Back End Development Certification - Dynamic Web Application Projects
 * Routes - Stocks
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
const router = express.Router()

const dbStocks = require('../db/stocks')
const quandleService = require('../services/quandle')

/************************************************************/
/************************************************************/

/****************/
/***** LIST *****/
/****************/

router.get('/', (req, res) => {
  dbStocks.findAll((err, results) => {

    let chartData, chartLabels

    if (typeof results !== 'undefined' && results !== null && results !== '') {
      chartData = results.map((d) => d.data)
      chartLabels = results.map((d) => d.name)
    }

    res.send({
      auth: req.isAuthenticated(),
      error: err,
      chartData: {
        datasets:[{
          data: chartData
        }],
        labels: chartLabels
      }
    })

  })
})

/************************************************************/
/************************************************************/

/***************/
/***** ADD *****/
/***************/

router.post('/add', (req, res) => {

  const stock = req.body.data.stock

  dbStocks.findByName(stock, (err, result) => {

    if (result !== null) {
      res.send({
        data: null,
        info: 'Stock already added',
        auth: req.isAuthenticated(),
        error: err
      })
    }

    quandleService.getData(stock).then((results) => {

      if (results !== null && results.data !== null) {
        dbStocks.addStock(stock, results.data, (err, result) => {
          res.send({
            data: results.data,
            info: results,
            auth: req.isAuthenticated(),
            error: err
          })
        })
      }

      res.send({
        data: null,
        info: 'Nothing to add',
        auth: req.isAuthenticated(),
        error: err
      })

    }).catch((err) => {
      res.send({
        data: null,
        info: null,
        auth: req.isAuthenticated(),
        error: err
      })
    })

  })

})

/************************************************************/
/************************************************************/

/******************/
/***** DELETE *****/
/******************/

router.delete('/delete', (req, res) => {

  dbStocks.findByName(stock, (err, result) => {
    dbStocks.deleteStock(req.body.data.stock, (err, info) => {
      res.send({
        data: result.data,
        info: info,
        auth: req.isAuthenticated(),
        error: err
      })
    })
  })
})

/************************************************************/
/************************************************************/

/*******************/
/***** EXPORTS *****/
/*******************/

module.exports = router;
