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
const quandlService = require('../services/quandl')

/************************************************************/
/************************************************************/

/****************/
/***** LIST *****/
/****************/

router.get('/', (req, res) => {
  dbStocks.findAll((err, results) => {

    let chartData, chartLabels

    if (typeof results !== 'undefined' && results !== null && results !== '') {
      chartData = results.map((d) => {
        const itemData = d.data.map((i) => {
          return {
            x: i[0],
            y: i[1]
          }
        })
        return itemData
      })
      chartLabels = results.map((d) => d.name)
    }

    res.send({
      auth: req.isAuthenticated(),
      error: err,
      chartData: {
        datasets: chartData,
        labels: chartLabels
      },
      stocks: chartLabels
    })

  })
})

/************************************************************/
/************************************************************/

/***************/
/***** ADD *****/
/***************/

router.post('/add', (req, res) => {

  const data = JSON.parse(req.body.data)
  const stock = data.stock

  if (typeof stock === 'undefined' || stock === null || stock === '') {
    res.send({
      data: null,
      info: "Can't add empty stock",
      auth: req.isAuthenticated(),
      error: null
    })
    return
  }

  dbStocks.findByName(stock, (err, result) => {

    if (result !== null) {
      res.send({
        stock: stock,
        data: null,
        info: 'Stock already added',
        auth: req.isAuthenticated(),
        error: err
      })
      return
    }

    quandlService.getData(stock).then((results) => {

      if (results !== null && results.data !== null) {
        dbStocks.addStock(stock, results.data, (err, result) => {

          const chartData = results.data.map((d) => {
            return {
              x: d[0],
              y: d[1]
            }
          })

          res.send({
            stock: stock,
            data: chartData,
            info: null,
            auth: req.isAuthenticated(),
            error: err
          })
        })
      } else {
        res.send({
          stock: stock,
          data: null,
          info: 'Nothing to add',
          auth: req.isAuthenticated(),
          error: err
        })
      }

    }).catch((err) => {
      res.send({
        stock: stock,
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

  const data = JSON.parse(req.body.data)
  const stock = data.stock

  dbStocks.findByName(stock, (err, result) => {
    dbStocks.deleteStock(stock, (err, info) => {
      res.send({
        stock: stock,
        data: result.data,
        info: null,
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
