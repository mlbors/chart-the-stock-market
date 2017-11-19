/**
 * freeCodeCamp - Back End Development Certification - Dynamic Web Application Projects
 * Db - Stocks
 * 
 * @author MLBORS
 * @version 1.0.0.0
 * @since 2017.11.11
 * @for freeCodeCamp
 */

/*******************/
/***** IMPORTS *****/
/*******************/

const mongodb = require('mongodb')
const shortid = require('shortid')

const dbInfo = require('./db')

/************************************************************/
/************************************************************/

/********************/
/***** DATABASE *****/
/********************/

const MongoClient = mongodb.MongoClient
const dbUrl = dbInfo.info.url

/************************************************************/
/************************************************************/

const self = module.exports = {

  /********************/
  /***** FIND ALL *****/
  /********************/

  /*
   * @var Function callback a callback function
   * @return Array
   */

  findAll: (callback) => {
    
    MongoClient.connect(dbUrl, (err, db) => {
    
      if (err) return callback(err)
      
      db.collection('stocks')
      .find({})
      .sort({'date': -1})
      .toArray((err, result) => {
        if (err) return callback(err)
        db.close()
        return callback(null, result)
      })

    })

  },

  /************************************************************/
  /************************************************************/

  /**********************/
  /***** FIND BY ID *****/
  /**********************/

  /*
   * @var String id user's id
   * @var Function callback a callback function
   */

  findById: (id, callback) => {
    
    MongoClient.connect(dbUrl, (err, db) => {

      if (err) {
        return callback(err)
      } 
      
      db.collection('stocks').findOne({
        _id: id
      }, (err, result) => {
        
        if (err) {
          return callback(err)
        }

        db.close()
        return callback(null, result)
      })

    })

  },

  /************************************************************/
  /************************************************************/

  /************************/
  /***** FIND BY NAME *****/
  /************************/

  /*
   * @var String name stock's name
   * @var Function callback a callback function
   */

  findByName: (name, callback) => {
    
    MongoClient.connect(dbUrl, (err, db) => {

      if (err) {
        return callback(err)
      } 
      
      db.collection('stocks').findOne({
        name: name
      }, (err, result) => {
        
        if (err) {
          return callback(err)
        }

        db.close()
        return callback(null, result)
      })

    })

  },

  /************************************************************/
  /************************************************************/

  /*********************/
  /***** ADD STOCK *****/
  /*********************/

  /*
   * @var String name stock's name
   * @var Object data
   * @var Function callback a callback function
   */

  addStock: (name, data, callback) => {

    MongoClient.connect(dbUrl, (err, db) => {
      
      if (err) return callback(err)
      
      db.collection('stocks').insertOne({
        _id: shortid.generate(),
        date: new Date(),
        name: name,
        data: data
      },
      (err, res) => {
        db.close()
        return callback(err, res)
      })

    })

  },

  /************************************************************/
  /************************************************************/

  /************************/
  /***** DELETE STOCK *****/
  /************************/

  /*
   * @var String name stock's name
   * @var Function callback a callback function
   */

  deleteStock: (name, callback) => {
    
    MongoClient.connect(dbUrl, (err, db) => {

      if (err) {
        return callback(err)
      } 
      
      db.collection('stocks').deleteOne({
        name: name
      }, (err, result) => {
        
        if (err) {
          return callback(err)
        }

        db.close()
        return callback(null, result)
      })

    })

  },

  /************************************************************/
  /************************************************************/

  /**********************/
  /***** DELETE ALL *****/
  /**********************/

  /*
   * @var Function callback a callback function
   */

  deleteAll: (callback) => {
    
    MongoClient.connect(dbUrl, (err, db) => {

      if (err) {
        return callback(err)
      } 
      
      db.collection('stocks').deleteMany({}, (err, result) => {
        
        if (err) {
          return callback(err)
        }

        db.close()
        return callback(null, result)
      })

    })

  }

}