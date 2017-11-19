/**
 * freeCodeCamp - Back End Development Certification - Dynamic Web Application Projects
 * Services - Quandl
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
const request = require('request')
const moment = require('moment')

require('dotenv').config()

/************************************************************/
/************************************************************/

/****************/
/***** INIT *****/
/****************/

const quandlApi = {
  api_key: process.env.QUANDL_API_KEY,
  api_url: 'https://www.quandl.com/api/v3/datasets/WIKI/'
}

/************************************************************/
/************************************************************/

const self = module.exports = {

  /********************/
  /***** GET DATA *****/
  /********************/

  /*
   * @var String stock
   * @return Promise
   */

  getData: (stock) => {
    return new Promise((resolve, reject) => {

      const startDate = moment().subtract(7, 'days').format('YYYY-MM-DD')
      const endDate = moment().format('YYYY-MM-DD')
      
      const url = quandlApi.api_url + stock + '/data.json?api_key=' + quandlApi.api_key + '&start_date=' + startDate + '&end_date=' + endDate

      request(url, (error, response, body) => {

        const data = JSON.parse(body)

        if (!error && response.statusCode == 200) {
          
          if (typeof data.quandl_error !== 'undefined' && data.quandl_error !== null) {
            reject({
              error: data.quandl_error.message,
              status: response.statusCode,
              response: response
            })
            return
          }

          console.log(data.dataset_data.data)

          if (typeof data.dataset_data === 'undefined' || data.dataset_data === null) {
            resolve({
              data: null,
              error: 'No data',
              status: response.statusCode,
              response: response
            })
            return
          }

          resolve({
            data: data.dataset_data.data,
            error: null,
            status: response.statusCode,
            response: response
          })
          return
        }

        reject({
          error: data.quandl_error.message,
          status: response.statusCode,
          response: response
        })
        return

      })

    })
  }

}