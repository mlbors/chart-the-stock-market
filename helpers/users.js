/**
 * freeCodeCamp - Back End Development Certification - Dynamic Web Application Projects
 * Helpers - Users
 * 
 * @author MLBORS
 * @version 1.0.0.0
 * @since 2017.11.11
 * @for freeCodeCamp
 */

/*******************/
/***** IMPORTS *****/
/*******************/

const usersDb = require('../db/users')

/************************************************************/
/************************************************************/

const self = module.exports = {

  /**************************/
  /***** GET USERS DATA *****/
  /**************************/

  /*
   * @var String id
   * @return Promise
   */

  getUserData: (id) => {
    return new Promise((resolve, reject) => {

      if (typeof id !== 'undefined' && id !== null && id) {
        usersDb.findById(id, (err, data) => {
          if (err) reject(err)
          resolve(data)
        })  
      } else {
        resolve(null)
      }

    })
  }

}