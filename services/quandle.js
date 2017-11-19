/**
 * freeCodeCamp - Back End Development Certification - Dynamic Web Application Projects
 * Services - Quandle
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

require('dotenv').config()

/************************************************************/
/************************************************************/

/****************/
/***** INIT *****/
/****************/

const quandleApi = {
  api_key: process.env.QUANDLE_API_KEY,
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

      const url = quandleApi.api_url + stock + 'data.json?api_key=' + quandleApi.api_key

      request(url, (error, response, body) => {

        if (!error && response.statusCode == 200) {
          const data = JSON.parse(body)
          resolve(data)
          return
        }

        reject({
          error: error,
          status: response.statusCode,
          response: response
        })
        return

      })

    })
  }

}